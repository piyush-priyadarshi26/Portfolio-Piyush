"""
Contact route — receives contact form submissions, persists them, and sends an email notification.
"""
import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException

from app.models import ContactMessage
from app.utils import read_json, write_json

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api", tags=["contact"])

CONTACT_FILE = "contact_messages.json"

def send_email_notification(name: str, email: str, message: str):
    """Sends an email notification via Gmail SMTP."""
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASS")
    
    if not sender_email or not sender_password:
        print("[SMTP ERROR] Email credentials not found in environment variables.")
        return False

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = sender_email  # Sending to self
    msg['Subject'] = "New Portfolio Contact Message"

    body = f"""
    You have a new message from your portfolio website:

    Name: {name}
    Email: {email}

    Message:
    {message}

    ---
    Sent at: {datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")}
    """
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Gmail SMTP setup
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"[SMTP ERROR] {e}")
        return False

@router.post("/contact")
def submit_contact(msg: ContactMessage):
    try:
        # 1. Save to JSON file (existing logic)
        messages = read_json(CONTACT_FILE, [])
        messages.append({
            "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC"),
            "name": msg.name,
            "email": msg.email,
            "message": msg.message,
        })
        write_json(CONTACT_FILE, messages)
        
        # 2. Send Email Notification
        email_sent = send_email_notification(msg.name, msg.email, msg.message)
        
        if email_sent:
            return {"status": "success", "message": "Message sent and email notification delivered."}
        else:
            return {"status": "success", "message": "Message saved locally, but email notification failed."}

    except Exception as e:
        print(f"[Contact ERROR] {e}")
        return {"status": "error", "message": str(e)}
