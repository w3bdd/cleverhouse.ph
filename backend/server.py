from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

# ---- Email guardrail gate (G2/G3 structural checks) ----
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---- Inquiry models ----
PHONE_RE = re.compile(r"^\+?[0-9\s\-()]{7,20}$")


class InquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=25)
    service: Optional[str] = Field(default=None, max_length=80)
    message: Optional[str] = Field(default=None, max_length=2000)
    website: str = ""

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, v: str) -> str:
        if not PHONE_RE.match(v.strip()):
            raise ValueError("Invalid contact number")
        return v.strip()


class Inquiry(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    service: Optional[str] = None
    message: Optional[str] = None
    type: str = "consultation"
    created_at: str


@api_router.get("/")
async def root():
    return {"message": "Cleverhouse Philippines API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/inquiries")
async def create_inquiry(payload: InquiryCreate):
    if payload.website.strip():
        raise HTTPException(status_code=400, detail="Invalid submission")

    doc = {
        "id": str(uuid.uuid4()),
        "full_name": payload.full_name.strip(),
        "email": str(payload.email).strip().lower(),
        "phone": payload.phone,
        "service": (payload.service or "").strip() or None,
        "message": (payload.message or "").strip() or None,
        "type": "consultation",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)

    name = escape(doc["full_name"])
    email = escape(doc["email"])
    phone = escape(doc["phone"])
    service = escape(doc["service"] or "Not specified")
    message = escape(doc["message"] or "—")

    owner_html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
        '<tr><td style="padding:24px;font-family:Arial,sans-serif;color:#0F172A">'
        f'<h2 style="margin:0 0 16px">New consultation request</h2>'
        '<table role="presentation" cellpadding="6" cellspacing="0" style="font-size:14px">'
        f'<tr><td style="color:#64748B">Name</td><td><strong>{name}</strong></td></tr>'
        f'<tr><td style="color:#64748B">Email</td><td><a href="mailto:{email}">{email}</a></td></tr>'
        f'<tr><td style="color:#64748B">Phone</td><td><a href="tel:{phone}">{phone}</a></td></tr>'
        f'<tr><td style="color:#64748B">Service</td><td>{service}</td></tr>'
        f'<tr><td style="color:#64748B">Message</td><td>{message}</td></tr>'
        f'<tr><td style="color:#64748B">Received</td><td>{escape(doc["created_at"])}</td></tr>'
        '</table>'
        f'<p style="font-size:12px;color:#94A3B8;margin-top:20px">Sent by the {escape(EMAIL_FROM_NAME)} website. We never ask for passwords or payment details by email.</p>'
        '</td></tr></table>'
    )

    confirm_html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
        '<tr><td style="padding:24px;font-family:Arial,sans-serif;color:#0F172A">'
        f'<h2 style="margin:0 0 12px">Thank you, {name}.</h2>'
        '<p style="font-size:14px;line-height:1.6">We received your consultation request. '
        'A member of the Cleverhouse Philippines team will reach out within one business day.</p>'
        '<p style="font-size:14px;line-height:1.6">Prefer to talk now? Call us at '
        '<a href="tel:+639917242377">+63 991 724 2377</a> or reply to this email.</p>'
        f'<p style="font-size:12px;color:#94A3B8;margin-top:20px">{escape(EMAIL_FROM_NAME)} — Aurora &amp; Region 3. We never ask for passwords or payment details by email.</p>'
        '</td></tr></table>'
    )

    try:
        await send_email(to=OWNER_EMAIL, subject=f"New consultation request — {doc['full_name']}", html=owner_html)
    except Exception as e:
        logger.error(f"Owner notification failed for inquiry {doc['id']}: {e}")

    try:
        await send_email(to=doc["email"], subject="We received your consultation request — Cleverhouse Philippines", html=confirm_html)
    except Exception as e:
        logger.error(f"Confirmation email failed for inquiry {doc['id']}: {e}")

    return {"status": "success", "id": doc["id"]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
