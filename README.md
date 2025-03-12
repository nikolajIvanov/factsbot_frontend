# FactsBot Frontend

Ein KI-gestütztes Fact-Checking-Frontend, das ähnlich wie Perplexity AI aufgebaut ist. Der Nutzer gibt eine URL ein, und das System zeigt Schritt für Schritt eine statische Analyse basierend auf Dummy-Daten an.

## Funktionen

- Eingabefeld für eine URL
- Simulation eines Schritt-für-Schritt-Reasonings
- Anzeige der finalen Vertrauensbewertung
- Anzeige geprüfter Fakten mit Quellenangaben
- Narrativ- und Emotionsanalyse als separate Abschnitte

## Technologie-Stack

- Frontend: React (TypeScript, Vite)
- UI-Bibliothek: TailwindCSS + ShadCN
- Datenquelle: Dummy-JSON
- Containerisierung: Docker, Docker Compose
- Deployment: Nginx als Webserver

## Installation und Start

### Mit Docker

1. Repository klonen:
   ```bash
   git clone https://github.com/yourusername/factsbot_frontend.git
   cd factsbot_frontend
   ```

2. Docker-Container starten:
   ```bash
   docker-compose up -d
   ```

3. Die Anwendung ist nun unter http://localhost:3000 verfügbar.

### Ohne Docker (Entwicklung)

1. Repository klonen:
   ```bash
   git clone https://github.com/yourusername/factsbot_frontend.git
   cd factsbot_frontend
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

4. Die Anwendung ist nun unter http://localhost:5173 verfügbar.

## Projektstruktur

```
factsbot_frontend/
├── public/             # Statische Dateien
├── src/                # Quellcode
│   ├── components/     # React-Komponenten
│   ├── data/           # Dummy-Daten
│   ├── App.tsx         # Hauptkomponente
│   └── main.tsx        # Einstiegspunkt
├── Dockerfile          # Docker-Konfiguration
├── docker-compose.yml  # Docker Compose-Konfiguration
└── README.md           # Projektdokumentation
```

## Hinweise

- Das Backend wird nicht implementiert – stattdessen werden statische JSON-Daten als Simulation verwendet.
- Die Anwendung ist als Proof of Concept gedacht und kann später mit einem echten Backend verbunden werden. 