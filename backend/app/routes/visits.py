"""
Visits route — tracks profile visit count.
"""
from fastapi import APIRouter
from app.utils import read_json, write_json

router = APIRouter(prefix="/api", tags=["visits"])

VISITS_FILE = "visits.json"


@router.get("/visits")
def get_visits():
    return read_json(VISITS_FILE, {"total_visits": 0})


@router.post("/visits")
def increment_visits():
    data = read_json(VISITS_FILE, {"total_visits": 0})
    data["total_visits"] += 1
    write_json(VISITS_FILE, data)
    return data
