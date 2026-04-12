"""
config.py — Centralised configuration loaded from .env
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # PostgreSQL (Neon)
    DATABASE_URL: str

    # Email Service (Resend)
    RESEND_API_KEY: str
    EMAIL_FROM: str = "onboarding@resend.dev"

    # Comma-separated notification recipients
    NOTIFICATION_EMAILS: str

    # Database Toggle
    ENABLE_DB: bool = False

    @property
    def notification_email_list(self) -> List[str]:
        return [e.strip() for e in self.NOTIFICATION_EMAILS.split(",")]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
