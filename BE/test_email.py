"""
BE/test_email.py — Manual test script for Resend API notification.
"""
import asyncio
import sys
import anyio
from config import settings
import resend

async def test_resend_notification():
    """
    Test the Resend notification logic.
    """
    if not settings.RESEND_API_KEY or "re_" not in settings.RESEND_API_KEY:
        print("\n❌ ERROR: RESEND_API_KEY is missing or invalid in .env")
        print("Please add: RESEND_API_KEY=re_your_key_here")
        return

    test_appt = {
        "full_name": "Test Patient (Resend)",
        "phone": "+91 99999 88888",
        "email": "patient@example.com",
        "preferred_date": "2026-04-20",
        "time_slot": "10:00 AM - 11:00 AM",
        "medical_concern": "Testing Resend API integration from Render migration.",
        "submitted_at": "2026-04-12 18:35:00"
    }

    print("\n🚀 Starting Resend API connection test...")
    try:
        from services.email_service import send_appointment_notification
        await send_appointment_notification(test_appt)
        print("\n✅ TEST SUCCESSFUL!")
        print(f"Check the Resend dashboard or target emails: {settings.NOTIFICATION_EMAILS}")
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_resend_notification())