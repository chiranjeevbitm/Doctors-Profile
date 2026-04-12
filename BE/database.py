"""
database.py — Async SQLAlchemy engine and session factory
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from config import settings

# Strip query params (sslmode, channel_binding) — asyncpg uses connect_args for SSL
_raw_url = settings.DATABASE_URL.split("?")[0]
DATABASE_URL = _raw_url.replace("postgresql://", "postgresql+asyncpg://")

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    connect_args={
        "ssl": True,
        "command_timeout": 60,
        "server_settings": {
            "search_path": "public",
        },
        "statement_cache_size": 0,  # Required for Neon/PgBouncer pooler
    },
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db():
    """FastAPI dependency — yields an async DB session or None if disabled."""
    if not settings.ENABLE_DB:
        yield None
        return

    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
