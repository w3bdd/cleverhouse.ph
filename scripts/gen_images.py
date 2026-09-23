import asyncio
import base64
import os
import sys
from dotenv import load_dotenv

sys.path.insert(0, "/app/backend")
load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

API_KEY = os.getenv("EMERGENT_LLM_KEY", "sk-emergent-dE7F9D28e60795fF65")

STYLE = (
    "Match the exact flat vector illustration style of the reference image: clean modern infographic look, "
    "deep slate blue and sky blue palette with warm amber accents, soft daylight, subtle gradients, "
    "crisp edges, high-tech but warm and human. Wide landscape 16:9 composition. Absolutely no text, no words, no letters, no labels."
)

JOBS = [
    {
        "ref": "/app/scripts/ref_gates.png",
        "out": "/app/scripts/new_gates.png",
        "session": "gates-gen-1",
        "prompt": (
            "Create a new illustration in the same style: a modern automated sliding steel driveway gate at a contemporary "
            "tropical Philippine home entrance, shown mid-slide with a visible gate motor, control box, and a phone sending "
            "a wireless open signal. Include a low fence, gate pillars, and a few tropical plants. " + STYLE
        ),
    },
    {
        "ref": "/app/scripts/ref_wiring.png",
        "out": "/app/scripts/new_wiring.png",
        "session": "wiring-gen-1",
        "prompt": (
            "Create a new illustration in the same style: an isometric cutaway of a modern two-storey tropical home showing "
            "its electrical system — a breaker panel by the entrance, circuits running neatly through the walls to ceiling "
            "lights, wall outlets, a kitchen, and an outdoor security camera, with a utility cable feeding the house. " + STYLE
        ),
    },
]


async def gen(job):
    with open(job["ref"], "rb") as f:
        ref_b64 = base64.b64encode(f.read()).decode("utf-8")
    chat = LlmChat(api_key=API_KEY, session_id=job["session"], system_message="You are a helpful AI assistant")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=job["prompt"], file_contents=[ImageContent(ref_b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    if images:
        with open(job["out"], "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"{job['out']} saved, {len(images)} image(s)")
    else:
        print(f"{job['out']} FAILED: no images returned. text={text[:120]}")


async def main():
    for job in JOBS:
        await gen(job)


asyncio.run(main())
