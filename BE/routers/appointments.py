"""
routers/appointments.py — POST /api/appointments endpoint
"""
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
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
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    """
    1. Validates the incoming form data.
    2. Persists a new Appointment row in the Neon PostgreSQL DB.
    3. Sends an HTML notification email to all configured recipients.
    4. Returns the saved appointment record.
    """
    # --- 1. Persist to database (if enabled) ---
    appointment_id = 0
    submitted_at = datetime.now(timezone.utc)
    
    if db is not None:
        appointment = Appointment(
            full_name=payload.full_name,
            phone=payload.phone,
            email=payload.email,
            preferred_date=payload.preferred_date,
            time_slot=payload.time_slot,
            medical_concern=payload.medical_concern,
            submitted_at=submitted_at,
        )
        db.add(appointment)
        await db.commit()
        await db.refresh(appointment)
        appointment_id = appointment.id
        submitted_at = appointment.submitted_at
        logger.info(f"New appointment saved: id={appointment_id} name={appointment.full_name}")
    else:
        logger.info(f"Database persistence skipped for {payload.full_name} (ENABLE_DB=False)")

    # --- 2. Send email notification IN BACKGROUND (non-blocking) ---
    appointment_data = {
        "full_name": payload.full_name,
        "phone": payload.phone,
        "email": payload.email,
        "preferred_date": payload.preferred_date,
        "time_slot": payload.time_slot,
        "medical_concern": payload.medical_concern,
        "submitted_at": submitted_at.strftime("%Y-%m-%d %H:%M:%S UTC"),
    }
    background_tasks.add_task(send_appointment_notification, appointment_data)
    logger.info(f"Email queued in background for {payload.full_name}")

    # Create response object
    return AppointmentResponse(
        id=appointment_id,
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        preferred_date=payload.preferred_date,
        time_slot=payload.time_slot,
        medical_concern=payload.medical_concern,
        submitted_at=submitted_at
    )
