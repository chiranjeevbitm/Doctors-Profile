"""
config.py — Centralised configuration loaded from .env
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # PostgreSQL (Neon)
    DATABASE_URL: str

    # SMTP (Gmail)
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str
    SMTP_PASSWORD: str

    # Comma-separated notification recipients
    NOTIFICATION_EMAILS: str

    @property
    def notification_email_list(self) -> List[str]:
        return [e.strip() for e in self.NOTIFICATION_EMAILS.split(",")]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
