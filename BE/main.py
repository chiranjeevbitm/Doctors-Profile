"""
main.py — FastAPI application entry point
Appointment emails are now handled client-side via EmailJS.
The BE provides health-check and any future server-side endpoints only.
"""
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import telemedicine

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
# App
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Arogya Clinic — Backend API",
    description="Backend API for Dr. Deepak Kumar's Arogya Clinic, Muzaffarpur.",
    version="2.0.0",
)

# CORS — allow the Vite dev server and the Vercel production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "https://doctors-profile-chi.vercel.app",
        "http://doctors-profile-chi.vercel.app",
        "https://doctors-profile-chi.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(telemedicine.router)


@app.get("/", tags=["Home"])
async def root():
    return {
        "message": "Welcome to the Arogya Clinic — Backend API",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "clinic": "Arogya Clinic"}
