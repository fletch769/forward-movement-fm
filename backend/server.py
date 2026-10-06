from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
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


async def send_auto_reply(doc: dict) -> str | None:
    name = escape(doc["name"])
    message_html = escape(doc["message"]).replace("\n", "<br>")
    params: resend.Emails.SendParams = {
        "from": RESEND_FROM_EMAIL,
        "to": [doc["email"]],
        "reply_to": [CONTACT_INBOX],
        "subject": "Thanks for contacting Forward Movement",
        "html": (
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
            'style="background:#050505"><tr><td style="padding:24px 16px">'
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
            'style="max-width:560px;margin:0 auto;background:#ffffff">'
            '<tr><td style="background:#050505;padding:20px 24px">'
            '<span style="font-family:Arial,sans-serif;font-size:18px;font-weight:bold;'
            'letter-spacing:2px;color:#E0FF00;text-transform:uppercase">'
            'Forward Movement</span></td></tr>'
            '<tr><td style="height:6px;background:#E0FF00;font-size:0;line-height:0">&nbsp;</td></tr>'
            f'<tr><td style="padding:28px 24px;font-family:Arial,sans-serif;color:#111111">'
            f'<p style="font-size:16px;margin:0 0 16px">Hi {name},</p>'
            '<p style="font-size:15px;line-height:1.6;margin:0 0 16px">'
            'Thanks for getting in touch — your message has landed safely with the '
            'Forward Movement team. We aim to reply within a few working days.</p>'
            '<p style="font-size:15px;line-height:1.6;margin:0 0 8px"><strong>What you sent us:</strong></p>'
            f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">'
            f'<tr><td style="border-left:4px solid #E0FF00;background:#f5f5f5;'
            f'padding:14px 16px;font-size:14px;line-height:1.6;color:#333333">'
            f'{message_html}</td></tr></table>'
            '<p style="font-size:14px;line-height:1.6;margin:20px 0 0">'
            'Need to add anything? Just reply to this email and it will reach us.</p>'
            '</td></tr>'
            '<tr><td style="background:#050505;padding:16px 24px;font-family:Arial,sans-serif;'
            'font-size:12px;color:#a1a1aa">'
            'Forward Movement · Registered Charity No. 1191828 (England &amp; Wales)<br/>'
            'We never ask for passwords or card details by email.'
            '</td></tr>'
            '</table></td></tr></table>'
        ),
        "text": (
            f"Hi {doc['name']},\n\n"
            "Thanks for getting in touch — your message has landed safely with the "
            "Forward Movement team. We aim to reply within a few working days.\n\n"
            f"What you sent us:\n{doc['message']}\n\n"
            "Need to add anything? Just reply to this email and it will reach us.\n\n"
            "Forward Movement · Registered Charity No. 1191828 (England & Wales)"
        ),
        "tags": [{"name": "source", "value": "contact-form-autoreply"}],
    }
    try:
        result = await resend.Emails.send_async(
            params, {"idempotency_key": f"contact-autoreply/{doc['id']}"}
        )
        return result["id"]
    except ResendError as e:
        logger.error(f"Auto-reply failed for {doc['id']}: {e}")
        return None


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


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact")
async def submit_contact(payload: ContactMessage, request: Request):
    _rate_limit(request.client.host if request.client else "unknown")
    topic = payload.topic if payload.topic in ALLOWED_TOPICS else "General enquiry"
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": str(payload.email),
        "topic": topic,
        "message": payload.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    email_id = await send_contact_email(doc)
    auto_reply_id = await send_auto_reply(doc)
    return {
        "status": "success",
        "id": doc["id"],
        "email_id": email_id,
        "auto_reply_id": auto_reply_id,
        "auto_reply_status": "accepted" if auto_reply_id else "failed",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
