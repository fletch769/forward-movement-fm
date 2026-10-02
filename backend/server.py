from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import time
import uuid
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime, timezone
from html import escape
import resend
from resend.exceptions import ResendError

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

resend.api_key = os.environ["RESEND_API_KEY"]
RESEND_FROM_EMAIL = os.environ["RESEND_FROM_EMAIL"]
CONTACT_INBOX = os.environ["CONTACT_INBOX"]

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def send_contact_email(doc: dict) -> str | None:
    name = escape(doc["name"])
    email = escape(doc["email"])
    topic = escape(doc["topic"])
    message_html = escape(doc["message"]).replace("\n", "<br>")
    params: resend.Emails.SendParams = {
        "from": RESEND_FROM_EMAIL,
        "to": [CONTACT_INBOX],
        "reply_to": [doc["email"]],
        "subject": f"Website enquiry — {doc['topic']}",
        "html": (
            '<table role="presentation" width="100%"><tr><td style="padding:24px;'
            'font-family:Arial,sans-serif;color:#111111">'
            '<h2 style="margin:0 0 16px;font-size:20px">New enquiry via the Forward Movement website</h2>'
            f'<p><strong>Name:</strong> {name}</p>'
            f'<p><strong>Email:</strong> {email}</p>'
            f'<p><strong>Topic:</strong> {topic}</p>'
            '<p><strong>Message:</strong></p>'
            f'<p>{message_html}</p>'
            '<hr style="border:none;border-top:1px solid #dddddd;margin:24px 0"/>'
            '<p style="font-size:12px;color:#888888">Sent by the Forward Movement website '
            'contact form. We never ask for passwords or card details by email.</p>'
            '</td></tr></table>'
        ),
        "text": (
            f"New enquiry via the Forward Movement website\n\n"
            f"Name: {doc['name']}\nEmail: {doc['email']}\nTopic: {doc['topic']}\n\n"
            f"{doc['message']}"
        ),
        "tags": [{"name": "source", "value": "contact-form"}],
    }
    try:
        result = await resend.Emails.send_async(
            params, {"idempotency_key": f"contact-form/{doc['id']}"}
        )
        return result["id"]
    except ResendError as e:
        logger.error(f"Resend send failed: {e}")
        raise HTTPException(status_code=502, detail="Failed to send email")


ALLOWED_TOPICS = {
    "General enquiry", "Volunteering", "Partnerships",
    "Joining a programme", "Housing support", "Other",
}


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    topic: str = Field(default="General enquiry", max_length=80)
    message: str = Field(min_length=5, max_length=5000)


_RATE: dict = {}


def _rate_limit(key: str, limit: int = 5, window: int = 60):
    now = time.time()
    hits = [t for t in _RATE.get(key, []) if now - t < window]
    if len(hits) >= limit:
        raise HTTPException(status_code=429, detail="Too many messages. Please try again in a minute.")
    hits.append(now)
    _RATE[key] = hits


@api_router.get("/")
async def root():
    return {"message": "Forward Movement API"}


@api_router.post("/contact")
async def submit_contact(payload: ContactMessage, request: Request):
    _rate_limit(request.client.host if request.client else "unknown")
    topic = payload.topic if payload.topic in ALLOWED_TOPICS else "General enquiry"
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email,
        "topic": topic,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)
    email_id = await send_contact_email(doc)
    await db.contact_messages.update_one(
        {"id": doc["id"]}, {"$set": {"resend_id": email_id, "email_status": "accepted"}}
    )
    return {"status": "success", "id": doc["id"], "email_id": email_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
