"""
schemas.py — Pydantic request / response schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class AppointmentRequest(BaseModel):
    full_name: str
    phone: str
    email: Optional[str] = None
    preferred_date: Optional[str] = None   # ISO date string "YYYY-MM-DD"
    time_slot: Optional[str] = None
    medical_concern: Optional[str] = None


class AppointmentResponse(BaseModel):
    id: int
    full_name: str
    phone: str
    email: Optional[str]
    preferred_date: Optional[str]
    time_slot: Optional[str]
    medical_concern: Optional[str]
    submitted_at: datetime

    class Config:
        from_attributes = True
