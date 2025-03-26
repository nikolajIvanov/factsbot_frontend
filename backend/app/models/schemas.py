"""Datenmodelle für die API-Anfragen und -Antworten."""

from pydantic import BaseModel, Field, HttpUrl
from typing import Dict, List, Optional, Any
from enum import Enum

class AnalysisRequest(BaseModel):
    """Anfrage für die Textanalyse."""
    url: HttpUrl = Field(..., description="Die URL des zu analysierenden Artikels")
    
class SourceCredibilityLevel(str, Enum):
    """Bewertungsstufen für die Glaubwürdigkeit einer Quelle."""
    HOCH = "hoch"
    MITTEL = "mittel"
    NIEDRIG = "niedrig"
    UNBEKANNT = "unbekannt"

class FactCheckResult(str, Enum):
    """Ergebnis der Faktenprüfung."""
    KORREKT = "korrekt"
    TEILWEISE_KORREKT = "teilweise_korrekt"
    FALSCH = "falsch"
    NICHT_VERIFIZIERBAR = "nicht_verifizierbar"

class EmotionAnalysis(BaseModel):
    """Emotionsanalyse des Textes."""
    hauptemotion: str = Field(..., description="Die dominante Emotion im Text")
    emotionsstärke: float = Field(..., description="Stärke der Emotion (0-1)", ge=0, le=1)
    emotionsverteilung: Dict[str, float] = Field(..., description="Verteilung der Emotionen im Text")

class NarrativeAnalysis(BaseModel):
    """Analyse der Narrative im Text."""
    hauptnarrative: List[str] = Field(..., description="Hauptnarrative im Text")
    stilmittel: List[str] = Field(..., description="Verwendete stilistische Mittel")
    ton: str = Field(..., description="Allgemeiner Ton des Textes")

class FactExtraction(BaseModel):
    """Extrahierte Fakten aus dem Text."""
    aussage: str = Field(..., description="Die extrahierte faktische Aussage")
    kontext: str = Field(..., description="Kontext der Aussage im Text")
    bewertung: FactCheckResult = Field(..., description="Bewertung der Richtigkeit")
    erklaerung: Optional[str] = Field(None, description="Erklärung zur Bewertung")

class SourceCredibility(BaseModel):
    """Bewertung der Glaubwürdigkeit der Quelle."""
    level: SourceCredibilityLevel = Field(..., description="Stufe der Glaubwürdigkeit")
    begruendung: str = Field(..., description="Begründung für die Bewertung")
    faktoren: Dict[str, Any] = Field(..., description="Faktoren für die Bewertung")

class AnalysisSummary(BaseModel):
    """Zusammenfassung der Analyse."""
    kernpunkte: List[str] = Field(..., description="Wichtigste Punkte des Artikels")
    fazit: str = Field(..., description="Gesamtfazit zur Analyse")
    empfehlungen: Optional[List[str]] = Field(None, description="Empfehlungen für den Leser")

class AnalysisResponse(BaseModel):
    """Antwort mit den Ergebnissen der Textanalyse."""
    artikel_titel: str = Field(..., description="Titel des analysierten Artikels")
    artikel_quelle: str = Field(..., description="Quelle des Artikels")
    artikel_datum: Optional[str] = Field(None, description="Veröffentlichungsdatum des Artikels")
    emotions_analyse: EmotionAnalysis = Field(..., description="Analyse der Emotionen im Text")
    narrative_analyse: NarrativeAnalysis = Field(..., description="Analyse der Narrative im Text")
    fakten: List[FactExtraction] = Field(..., description="Extrahierte und überprüfte Fakten")
    quellen_bewertung: SourceCredibility = Field(..., description="Bewertung der Glaubwürdigkeit der Quelle")
    zusammenfassung: AnalysisSummary = Field(..., description="Zusammenfassung der Analyse")
    originaltext: Optional[str] = Field(None, description="Der Originaltext des Artikels") 