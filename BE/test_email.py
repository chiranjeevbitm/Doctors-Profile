#!/usr/bin/env python3
"""
services/email_service.py
Async email notification service using aiosmtplib + Gmail SMTP
"""

import os
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import aiosmtplib
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# ── SMTP config from .env ────────────────────────────────────────────────────
SMTP_HOST     = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT     = int(os.getenv("SMTP_PORT", 587))          # 587 = STARTTLS (recommended)
SMTP_USER     = os.getenv("SMTP_USER")                    # deepakdmchthesis@gmail.com
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")                # Gmail App Password

# ── Who gets the notification ────────────────────────────────────────────────
NOTIFY_EMAIL  = os.getenv("NOTIFY_EMAIL", SMTP_USER)      # defaults to sender if not set


# ─────────────────────────────────────────────────────────────────────────────
# HTML email template
# ─────────────────────────────────────────────────────────────────────────────
def _build_html(appt: dict) -> str:
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        body      {{ font-family: Arial, sans-serif; background:#f4f4f4; margin:0; padding:0; }}
        .wrapper  {{ max-width:600px; margin:30px auto; background:#fff;
                     border-radius:8px; overflow:hidden;
                     box-shadow:0 2px 8px rgba(0,0,0,.12); }}
        .header   {{ background:#2563eb; color:#fff; padding:24px 32px; }}
        .header h1{{ margin:0; font-size:20px; }}
        .body     {{ padding:28px 32px; color:#333; }}
        .field    {{ margin-bottom:16px; }}
        .label    {{ font-size:12px; text-transform:uppercase; letter-spacing:.5px;
                     color:#6b7280; margin-bottom:4px; }}
        .value    {{ font-size:15px; font-weight:600; color:#111; }}
        .divider  {{ border:none; border-top:1px solid #e5e7eb; margin:20px 0; }}
        .footer   {{ background:#f9fafb; padding:16px 32px;
                     font-size:12px; color:#9ca3af; text-align:center; }}
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>📅 New Appointment Request</h1>
        </div>
        <div class="body">
          <p>A new appointment has been submitted. Details below:</p>
          <hr class="divider" />

          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">{appt.get("full_name", "N/A")}</div>
          </div>

          <div class="field">
            <div class="label">Phone</div>
            <div class="value">{appt.get("phone", "N/A")}</div>
          </div>

          <div class="field">
            <div class="label">Email</div>
            <div class="value">{appt.get("email", "N/A")}</div>
          </div>

          <hr class="divider" />

          <div class="field">
            <div class="label">Preferred Date</div>
            <div class="value">{appt.get("preferred_date", "N/A")}</div>
          </div>

          <div class="field">
            <div class="label">Time Slot</div>
            <div class="value">{appt.get("time_slot", "N/A")}</div>
          </div>

          <hr class="divider" />

          <div class="field">
            <div class="label">Medical Concern</div>
            <div class="value">{appt.get("medical_concern", "N/A")}</div>
          </div>

          <div class="field">
            <div class="label">Submitted At</div>
            <div class="value">{appt.get("submitted_at", "N/A")}</div>
          </div>
        </div>
        <div class="footer">
          This is an automated notification — please do not reply to this email.
        </div>
      </div>
    </body>
    </html>
    """


# ─────────────────────────────────────────────────────────────────────────────
# Plain-text fallback
# ─────────────────────────────────────────────────────────────────────────────
def _build_plain(appt: dict) -> str:
    return (
        f"New Appointment Request\n"
        f"{'='*40}\n"
        f"Full Name     : {appt.get('full_name', 'N/A')}\n"
        f"Phone         : {appt.get('phone', 'N/A')}\n"
        f"Email         : {appt.get('email', 'N/A')}\n"
        f"Preferred Date: {appt.get('preferred_date', 'N/A')}\n"
        f"Time Slot     : {appt.get('time_slot', 'N/A')}\n"
        f"Medical Concern: {appt.get('medical_concern', 'N/A')}\n"
        f"Submitted At  : {appt.get('submitted_at', 'N/A')}\n"
    )


# ─────────────────────────────────────────────────────────────────────────────
# Main send function
# ─────────────────────────────────────────────────────────────────────────────
async def send_appointment_notification(appointment: dict) -> None:
    """
    Send an appointment notification email.

    Args:
        appointment: dict with keys —
            full_name, phone, email, preferred_date,
            time_slot, medical_concern, submitted_at
    Raises:
        ValueError : if SMTP credentials are missing in .env
        Exception  : re-raises any SMTP / network error after logging
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        raise ValueError(
            "SMTP_USER and SMTP_PASSWORD must be set in your .env file."
        )

    patient_name = appointment.get("full_name", "Unknown")
    subject = f"New Appointment Request — {patient_name}"

    # ── Build MIME message ───────────────────────────────────────────────────
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = SMTP_USER
    msg["To"]      = NOTIFY_EMAIL

    msg.attach(MIMEText(_build_plain(appointment), "plain"))
    msg.attach(MIMEText(_build_html(appointment),  "html"))   # preferred part last

    # ── Send via SMTP ────────────────────────────────────────────────────────
    # port 465 = use_tls=True (SSL), port 587 = start_tls=True (STARTTLS)
    use_ssl = (SMTP_PORT == 465)
    
    # If Host is an IP, we need to provide server_hostname for TLS verification
    is_ip = SMTP_HOST.replace('.', '').isdigit()
    tls_hostname = "smtp.gmail.com" if is_ip else SMTP_HOST

    logger.info("Connecting to %s:%s (SSL: %s) …", SMTP_HOST, SMTP_PORT, use_ssl)
    
    smtp_client = aiosmtplib.SMTP(
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        use_tls=use_ssl,
        validate_certs=False,  # Bypass certificate mismatch due to IP-based host
        timeout=15,
    )

    try:
        await smtp_client.connect()
        
        if not use_ssl:
            await smtp_client.starttls(server_hostname=tls_hostname)
            
        await smtp_client.login(SMTP_USER, SMTP_PASSWORD)
        await smtp_client.send_message(msg)
        await smtp_client.quit()
            
        logger.info("✅ Notification email sent to %s (patient: %s)", NOTIFY_EMAIL, patient_name)

    except aiosmtplib.SMTPAuthenticationError as e:
        logger.error("❌ SMTP auth failed — check your Gmail App Password: %s", e)
        raise

    except aiosmtplib.SMTPConnectError as e:
        logger.error("❌ Could not connect to %s:%s — firewall / port blocked? %s", SMTP_HOST, SMTP_PORT, e)
        raise

    except aiosmtplib.SMTPException as e:
        logger.error("❌ SMTP error: %s", e)
        raise

    except Exception as e:
        logger.error("❌ Unexpected error while sending email: %s", e)
        raise

if __name__ == "__main__":
    import asyncio

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    test_appt = {
        "full_name": "Antigravity Test",
        "phone": "+91 9999999999",
        "email": "test@example.com",
        "preferred_date": "2026-04-15",
        "time_slot": "11:00 AM - 12:00 PM",
        "medical_concern": "Testing DNS and SMTP connectivity after code update.",
        "submitted_at": "2026-04-12 13:14:00"
    }

    async def run_test():
        print("\n🚀 Starting email test...")
        try:
            await send_appointment_notification(test_appt)
            print("\n✅ TEST SUCCESSFUL!")
        except Exception as e:
            print(f"\n❌ TEST FAILED: {e}")

    asyncio.run(run_test())