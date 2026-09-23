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
    "Use the reference image only as a loose composition guide. Render a photorealistic photograph: "
    "real materials, natural daylight, realistic shadows and textures, shallow depth of field, "
    "shot on a full-frame camera with a 35mm lens, professional architectural photography. "
    "Wide landscape 16:9 composition. Absolutely no text, no words, no letters, no watermarks."
)

JOBS = [
    {
        "ref": "/app/scripts/new_gates.png",
        "out": "/app/scripts/photo_gates.png",
        "session": "gates-photo-1",
        "prompt": (
            "A photorealistic photograph of a modern automated sliding steel driveway gate at a contemporary "
            "tropical Philippine home entrance, gate partially open with a visible sliding gate motor and control box, "
            "a hand holding a smartphone opening the gate remotely, low concrete fence, gate pillars, lush tropical plants, "
            "bright midday tropical light. " + STYLE
        ),
    },
    {
        "ref": "/app/scripts/new_wiring.png",
        "out": "/app/scripts/photo_wiring.png",
        "session": "wiring-photo-1",
        "prompt": (
            "A photorealistic photograph of a professional electrician's completed residential electrical work: "
            "a modern open breaker panel with neatly organized color-coded wiring mounted on a clean interior wall, "
            "with conduit runs and junction boxes visible, a comfortable modern tropical home interior softly lit "
            "in the background. " + STYLE
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
