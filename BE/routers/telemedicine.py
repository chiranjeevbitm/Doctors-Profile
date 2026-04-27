from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/telemedicine", tags=["Telemedicine"])

class ConsultationLead(BaseModel):
    patient_name: str
    concern: str
    amount_paid: int = 199

class LeadResponse(ConsultationLead):
    id: str
    status: str
    created_at: str

# In-Memory DB (Replace with Neon DB later)
mock_leads_db = []

@router.post("/requests", response_model=LeadResponse)
async def log_telemedicine_lead(req: ConsultationLead):
    """
    Logs a patient's intent to consult before redirecting them to WhatsApp.
    Useful for analytics and tracking drop-offs.
    """
    new_lead = LeadResponse(
        id=str(uuid.uuid4()),
        patient_name=req.patient_name,
        concern=req.concern,
        amount_paid=req.amount_paid,
        status="redirected_to_whatsapp",
        created_at=datetime.utcnow().isoformat() + "Z"
    )
    mock_leads_db.append(new_lead)
    
    # Here you would insert the lead into Neon DB using SQLAlchemy
    
    return new_lead

@router.get("/requests", response_model=List[LeadResponse])
async def get_all_leads():
    """
    Fetch all telemedicine leads.
    """
    return sorted(mock_leads_db, key=lambda x: x.created_at, reverse=True)
