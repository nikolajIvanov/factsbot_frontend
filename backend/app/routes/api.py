"""API-Routen für das FactsBot-System."""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from ..models.schemas import AnalysisRequest, AnalysisResponse
from ..crew.factbot_crew import FactsBotCrew
from typing import Dict, Any
import logging
import time

# Logger-Konfiguration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["api"])

# Cache für laufende und abgeschlossene Analysen
analysis_cache: Dict[str, Dict[str, Any]] = {}

# CrewAI-Instanz
factbot_crew = FactsBotCrew(verbose=True)

@router.post("/analyze", response_model=Dict[str, Any])
async def analyze_url(request: AnalysisRequest, background_tasks: BackgroundTasks):
    """
    Startet eine Analyse einer URL.
    
    Args:
        request: Die Anfrage mit der zu analysierenden URL.
        background_tasks: Tasks, die im Hintergrund ausgeführt werden.
        
    Returns:
        Eine eindeutige ID für die Analyse und den Status.
    """
    # Generiere eine eindeutige ID für diese Analyse
    analysis_id = f"analysis_{int(time.time())}"
    
    # Initialisiere den Status im Cache
    analysis_cache[analysis_id] = {
        "status": "queued",
        "url": str(request.url),
        "created_at": time.time(),
        "result": None
    }
    
    # Starte die Analyse im Hintergrund
    background_tasks.add_task(
        run_analysis_in_background,
        analysis_id=analysis_id,
        url=str(request.url)
    )
    
    # Gib die ID zurück, damit der Client den Status abfragen kann
    return {
        "status": "queued",
        "message": "Analyse wurde in die Warteschlange eingereiht",
        "analysis_id": analysis_id
    }

@router.get("/analysis/{analysis_id}", response_model=Dict[str, Any])
async def get_analysis_status(analysis_id: str):
    """
    Ruft den Status oder das Ergebnis einer Analyse ab.
    
    Args:
        analysis_id: Die ID der Analyse.
        
    Returns:
        Den Status oder das Ergebnis der Analyse.
        
    Raises:
        HTTPException: Wenn die Analyse nicht gefunden wird.
    """
    if analysis_id not in analysis_cache:
        raise HTTPException(status_code=404, detail="Analyse nicht gefunden")
    
    analysis = analysis_cache[analysis_id]
    
    return {
        "status": analysis["status"],
        "url": analysis["url"],
        "created_at": analysis["created_at"],
        "result": analysis["result"]
    }

async def run_analysis_in_background(analysis_id: str, url: str):
    """
    Führt die Analyse im Hintergrund aus.
    
    Args:
        analysis_id: Die ID der Analyse.
        url: Die zu analysierende URL.
    """
    logger.info(f"Starte Analyse {analysis_id} für URL: {url}")
    
    # Aktualisiere den Status
    analysis_cache[analysis_id]["status"] = "processing"
    
    try:
        # Führe die Analyse durch
        result = factbot_crew.analyze_url(url)
        
        # Speichere das Ergebnis im Cache
        analysis_cache[analysis_id]["status"] = "completed"
        analysis_cache[analysis_id]["result"] = result
        
        logger.info(f"Analyse {analysis_id} erfolgreich abgeschlossen")
    except Exception as e:
        # Fehlerbehandlung
        logger.error(f"Fehler bei Analyse {analysis_id}: {str(e)}", exc_info=True)
        analysis_cache[analysis_id]["status"] = "failed"
        analysis_cache[analysis_id]["error"] = str(e) 