from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/telemedicine", tags=["Telemedicine"])

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class ConsultationRequest(BaseModel):
    patient_name: str
    concern: str
    amount_paid: int = 199
    # In reality, this would contain the payment screenshot URL from Supabase Storage
    payment_proof_url: Optional[str] = None

class ConsultationResponse(BaseModel):
    id: str
    patient_name: str
    concern: str
    amount_paid: int
    status: str
    created_at: str
    video_room_url: Optional[str] = None

class StatusUpdateRequest(BaseModel):
    status: str

# ---------------------------------------------------------------------------
# In-Memory DB (Mocking Supabase)
# ---------------------------------------------------------------------------
mock_db = []

@router.post("/requests", response_model=ConsultationResponse)
async def create_consultation_request(req: ConsultationRequest):
    """
    Patient submits a new telemedicine request with symptoms and payment proof.
    """
    new_request = ConsultationResponse(
        id=str(uuid.uuid4()),
        patient_name=req.patient_name,
        concern=req.concern,
        amount_paid=req.amount_paid,
        status="pending",
        created_at=datetime.utcnow().isoformat() + "Z"
    )
    mock_db.append(new_request)
    # Trigger Web Push Notification to Doctor here...
    return new_request

@router.get("/requests", response_model=List[ConsultationResponse])
async def get_all_requests():
    """
    Doctor Dashboard fetches all requests.
    """
    # Sort descending by creation date
    return sorted(mock_db, key=lambda x: x.created_at, reverse=True)

@router.put("/requests/{req_id}/status", response_model=ConsultationResponse)
async def update_status(req_id: str, update: StatusUpdateRequest):
    """
    Doctor approves the request and generates a video link.
    """
    for req in mock_db:
        if req.id == req_id:
            req.status = update.status
            if update.status == "approved":
                # In production, call Daily.co or 100ms API to generate a unique room URL
                req.video_room_url = f"https://arogya-clinic.daily.co/room_{req_id[:8]}"
            return req
            
    raise HTTPException(status_code=404, detail="Request not found")
