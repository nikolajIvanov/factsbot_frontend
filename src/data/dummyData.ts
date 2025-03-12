export interface Quelle {
  name: string;
  url: string;
  vertrauensscore: number;
}

export interface Fakt {
  titel: string;
  belegt: boolean;
  vertrauensbewertung: number;
  quellen: Quelle[];
}

export interface Schritt {
  stufe: string;
  beschreibung: string;
  status: string;
}

export interface NarrativAnalyse {
  ergebnis: string;
}

export interface EmotionaleAnalyse {
  intensität: string;
}

export interface Analyse {
  status: string;
  vertrauensbewertung: number;
  zusammenfassung: string;
  schritte: Schritt[];
  fakten: Fakt[];
  narrativanalyse: NarrativAnalyse;
  emotionale_analyse: EmotionaleAnalyse;
}

export interface DummyData {
  url: string;
  analyse: Analyse;
}

export const dummyData: DummyData = {
  "url": "https://example.com/news/klimawandel",
  "analyse": {
    "status": "abgeschlossen",
    "vertrauensbewertung": 80,
    "zusammenfassung": "Der Artikel behandelt den Klimawandel. Zwei Behauptungen sind durch zuverlässige Quellen belegt, eine Behauptung konnte nicht verifiziert werden.",
    "schritte": [
      {
        "stufe": "Inhaltsextraktion",
        "beschreibung": "Extraktion des Hauptinhalts und der Metadaten der Webseite.",
        "status": "erledigt"
      },
      {
        "stufe": "Faktenprüfung",
        "beschreibung": "Überprüfung jeder Behauptung anhand zuverlässiger Quellen.",
        "status": "erledigt"
      }
    ],
    "fakten": [
      {
        "titel": "Die globale Durchschnittstemperatur ist seit 1880 um 1,2°C gestiegen.",
        "belegt": true,
        "vertrauensbewertung": 95,
        "quellen": [
          {
            "name": "NASA Klimadaten",
            "url": "https://climate.nasa.gov/evidence",
            "vertrauensscore": 98
          }
        ]
      },
      {
        "titel": "Der Amazonas-Regenwald produziert 20% des weltweiten Sauerstoffs.",
        "belegt": false,
        "vertrauensbewertung": 50,
        "quellen": []
      }
    ],
    "narrativanalyse": {
      "ergebnis": "Neutral"
    },
    "emotionale_analyse": {
      "intensität": "Mittel"
    }
  }
} 