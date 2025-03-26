from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.api import router as api_router
import os
from dotenv import load_dotenv

# Lade Umgebungsvariablen
load_dotenv()

app = FastAPI(title="FactsBot API")

# CORS-Konfiguration für Cross-Origin-Anfragen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Im Produktivbetrieb auf spezifische Domains einschränken
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API-Routen einbinden
app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Willkommen zur FactsBot API"}

@app.get("/health")
async def health_check():
    return {"status": "gesund"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 