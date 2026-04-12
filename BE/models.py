"""
models.py — SQLAlchemy ORM models
"""
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(200), nullable=True)
    preferred_date = Column(String(20), nullable=True)   # stored as string e.g. "2026-04-15"
    time_slot = Column(String(100), nullable=True)
    medical_concern = Column(Text, nullable=True)
    submitted_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    def __repr__(self):
        return f"<Appointment id={self.id} name={self.full_name}>"
