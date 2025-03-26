# FactsBot Backend

Dieses Backend enthält ein Multi-Agenten-System zur Analyse von Artikeln und Webseiten mit Fokus auf Faktencheck und Narrativanalyse.

## Systemarchitektur

Das System besteht aus neun spezialisierten Agenten:

1. **Orchestrator-Agent**: Zentrale Steuerung und Koordination des Systems
2. **Crawling-Agent**: Abrufen von Webinhalten und Extraktion von Text und Metadaten
3. **Narrativ-Agent**: Analyse von Narrativen und stilistischen Mitteln in Texten
4. **Emotion-Classifying-Agent**: Klassifizierung von Emotionen in Texten
5. **Fakten-Extraktions-Agent**: Extraktion von faktischen Aussagen aus Texten
6. **Faktenprüfungs-Agent**: Überprüfung der extrahierten Fakten
7. **Quellenbewertungs-Agent**: Bewertung der Glaubwürdigkeit von Quellen
8. **Zusammenfassungs-Agent**: Erstellung von Zusammenfassungen der Analysen
9. **Präsentations-Agent**: Benutzerfreundliche Aufbereitung der Ergebnisse

## Installation

1. Python 3.9+ installieren
2. Abhängigkeiten installieren:
   ```bash
   pip install -r requirements.txt
   ```
3. `.env.example` nach `.env` kopieren und die API-Schlüssel für die KI-Dienste eintragen:
   ```bash
   cp .env.example .env
   ```

## Konfiguration

Erforderliche API-Schlüssel:
- OpenAI API-Schlüssel für GPT-4o
- Anthropic API-Schlüssel für Claude Sonnet 3.5
- Perplexity API-Schlüssel 

## Verwendung

### Starten des Servers

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### API-Endpunkte

Die API bietet folgende Endpunkte:

- `POST /api/analyze`: Startet eine Analyse einer URL
  - Anfrage-Body: `{"url": "https://example.com/article"}`
  - Gibt eine Analyse-ID zurück, mit der der Status abgefragt werden kann

- `GET /api/analysis/{analysis_id}`: Ruft den Status oder das Ergebnis einer Analyse ab
  - Gibt den Status der Analyse und (falls abgeschlossen) das Ergebnis zurück

### Beispiel mit Postman

1. Starte eine Analyse:
   - POST `http://localhost:8000/api/analyze`
   - Body: `{"url": "https://example.com/article"}`
   - Notiere die zurückgegebene `analysis_id`

2. Rufe den Status ab:
   - GET `http://localhost:8000/api/analysis/{analysis_id}`
   - Das Ergebnis enthält den Status und (falls abgeschlossen) das Analyseergebnis

## Docker

Das Projekt kann auch mit Docker ausgeführt werden:

```bash
docker build -t factsbot-backend .
docker run -p 8000:8000 --env-file .env factsbot-backend
```

## API-Dokumentation

Nach dem Start ist die automatisch generierte API-Dokumentation verfügbar unter:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 