"""
services/email_service.py — Sends formatted HTML notification emails via Gmail SMTP
"""
import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List
from config import settings


def _build_html_body(appointment_data: dict) -> str:
    """Render a professional HTML email body from appointment data."""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fa; margin: 0; padding: 20px; }}
        .card {{ background: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }}
        .header {{ background: linear-gradient(135deg, #1a5276, #2e86c1); padding: 32px 40px; color: white; }}
        .header h1 {{ margin: 0 0 4px; font-size: 22px; letter-spacing: 0.5px; }}
        .header p {{ margin: 0; font-size: 13px; opacity: 0.85; }}
        .body {{ padding: 32px 40px; }}
        .label {{ font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #7f8c8d; margin-bottom: 4px; }}
        .value {{ font-size: 15px; color: #2c3e50; margin-bottom: 20px; }}
        .divider {{ height: 1px; background: #eaecee; margin: 4px 0 20px; }}
        .concern {{ background: #f8f9fa; border-left: 4px solid #2e86c1; padding: 14px 18px; border-radius: 4px; font-size: 14px; color: #2c3e50; line-height: 1.6; }}
        .footer {{ background: #f4f6fa; padding: 18px 40px; text-align: center; font-size: 12px; color: #95a5a6; }}
        .badge {{ display: inline-block; background: #eaf4fb; color: #2e86c1; border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 600; margin-top: 6px; }}
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🏥 New Appointment Request</h1>
          <p>Arogya Clinic — Dr. Deepak Kumar, MD</p>
        </div>
        <div class="body">
          <div class="label">Patient Name</div>
          <div class="value">{appointment_data.get('full_name', 'N/A')}</div>
          <div class="divider"></div>

          <div class="label">Phone Number</div>
          <div class="value">{appointment_data.get('phone', 'N/A')}</div>
          <div class="divider"></div>

          <div class="label">Email Address</div>
          <div class="value">{appointment_data.get('email') or 'Not provided'}</div>
          <div class="divider"></div>

          <div class="label">Preferred Date</div>
          <div class="value">{appointment_data.get('preferred_date') or 'Not specified'}</div>
          <div class="divider"></div>

          <div class="label">Time Slot</div>
          <div class="value">
            <span class="badge">{appointment_data.get('time_slot') or 'Not specified'}</span>
          </div>
          <div class="divider"></div>

          <div class="label">Medical Concern</div>
          <div class="concern">{appointment_data.get('medical_concern') or 'No description provided.'}</div>

          <p style="margin-top: 24px; font-size: 12px; color: #aab7b8;">
            Submitted at: {appointment_data.get('submitted_at', '')}
          </p>
        </div>
        <div class="footer">
          Arogya Clinic · Muzaffarpur, Bihar · +91 74888 78725 · deepakkumar21121995@gmail.com
        </div>
      </div>
    </body>
    </html>
    """


async def send_appointment_notification(appointment_data: dict) -> None:
    """
    Sends an HTML email notification to all configured recipients via Resend API.
    """
    resend.api_key = settings.RESEND_API_KEY
    patient_name = appointment_data.get("full_name", "Unknown")
    html_body = _build_html_body(appointment_data)

    params = {
        "from": settings.EMAIL_FROM,
        "to": settings.notification_email_list,
        "subject": f"📋 New Appointment Request: {patient_name} — Arogya Clinic",
        "html": html_body,
    }

    # Resend Python SDK is synchronous; we use anyio to run it in a thread
    # to avoid blocking the FastAPI event loop.
    await anyio.to_thread.run_sync(resend.Emails.send, params)
