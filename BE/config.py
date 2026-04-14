"""
config.py — Centralised configuration loaded from .env
Appointment emails are handled client-side via EmailJS — no SMTP/DB config needed.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Add any future server-side config here

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
