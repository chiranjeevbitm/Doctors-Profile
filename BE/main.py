"""
main.py — FastAPI application entry point
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import engine, Base
from routers import appointments

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s — %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Lifespan: create tables on startup
# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.ENABLE_DB:
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            logger.info("Database tables verified/created.")
        except Exception as e:
            logger.error(f"Failed to initialize database on startup: {e}")
            logger.info("Server starting anyway. DB-dependent features may fail.")
    else:
        logger.info("Database initialization skipped (ENABLE_DB=False).")
    yield
    await engine.dispose()
    logger.info("Database engine disposed.")


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Arogya Clinic — Backend API",
    description="Appointment management API for Dr. Deepak Kumar's Arogya Clinic, Muzaffarpur.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the Vite dev server and any local origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://doctors-profile-chi.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(appointments.router)


@app.get("/", tags=["Home"])
async def root():
    return {
        "message": "Welcome to the Arogya Clinic — Backend API",
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "clinic": "Arogya Clinic"}
