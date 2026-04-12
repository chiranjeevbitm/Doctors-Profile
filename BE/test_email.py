#!/usr/bin/env python3
"""
test_email.py — Test script for Resend API notification service
"""
import asyncio
import logging
import sys
import os

# Add the current directory to sys.path so we can import 'services' and 'config'
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__))))

from services.email_service import send_appointment_notification

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

async def run_test():
    test_appt = {
        "full_name": "Resend Connection Test",
        "phone": "+91 0000000000",
        "email": "test@resend.com",
        "preferred_date": "2026-04-15",
        "time_slot": "10:00 AM - 11:00 AM",
        "medical_concern": "Verifying that the API connection through Resend is working in production.",
        "submitted_at": "2026-04-12 18:15:00"
    }

    print("\n🚀 Starting Resend API connection test...")
    try:
        await send_appointment_notification(test_appt)
        print("\n✅ TEST SUCCESSFUL! The request was accepted by Resend.")
        print("Note: If you are using a trial/onboarding key, the email will be sent to your verified Resend email address.")
    except Exception as e:
        print(f"\n❌ TEST FAILED: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(run_test())