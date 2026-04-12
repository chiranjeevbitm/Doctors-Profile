"""
routers/appointments.py — POST /api/appointments endpoint
"""
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models import Appointment
from schemas import AppointmentRequest, AppointmentResponse
from services.email_service import send_appointment_notification

router = APIRouter(prefix="/api/appointments", tags=["Appointments"])
logger = logging.getLogger(__name__)


@router.post(
    "/",
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Submit a new appointment request",
)
async def create_appointment(
    payload: AppointmentRequest,
    db: AsyncSession = Depends(get_db),
):
    """
    1. Validates the incoming form data.
    2. Persists a new Appointment row in the Neon PostgreSQL DB.
    3. Sends an HTML notification email to all configured recipients.
    4. Returns the saved appointment record.
    """
    # --- 1. Persist to database ---
    appointment = Appointment(
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        preferred_date=payload.preferred_date,
        time_slot=payload.time_slot,
        medical_concern=payload.medical_concern,
        submitted_at=datetime.now(timezone.utc),
    )
    db.add(appointment)
    await db.commit()
    await db.refresh(appointment)
    logger.info(f"New appointment saved: id={appointment.id} name={appointment.full_name}")

    # --- 2. Send email notification (non-blocking on failure) ---
    try:
        appointment_data = {
            "full_name": appointment.full_name,
            "phone": appointment.phone,
            "email": appointment.email,
            "preferred_date": appointment.preferred_date,
            "time_slot": appointment.time_slot,
            "medical_concern": appointment.medical_concern,
            "submitted_at": appointment.submitted_at.strftime("%Y-%m-%d %H:%M:%S UTC"),
        }
        await send_appointment_notification(appointment_data)
        logger.info(f"Notification email sent for appointment id={appointment.id}")
    except Exception as exc:
        # Log the error but do NOT fail the API response
        logger.error(f"Email notification failed for appointment id={appointment.id}: {exc}")

    return appointment
