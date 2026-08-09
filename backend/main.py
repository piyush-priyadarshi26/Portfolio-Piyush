"""
Main FastAPI application entry point.
Run with: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.visits import router as visits_router
from app.routes.contact import router as contact_router

app = FastAPI(
    title="Piyush Priyadarshi — Portfolio API",
    description="Backend API for the portfolio website.",
    version="1.0.0",
)

# --- CORS ---
import os
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(visits_router)
app.include_router(contact_router)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
