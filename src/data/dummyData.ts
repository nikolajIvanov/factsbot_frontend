export interface Quelle {
  name: string;
  url: string;
}

export interface Fakt {
  titel: string;
  belegt: boolean;
  erklaerung: string;
  quellen: Quelle[];
}

export interface QuellenBewertung {
  domain: string;
  bewertung: string;
}

export interface Schritt {
  stufe: string;
  beschreibung: string;
  status: string;
}

export interface ReasoningSchritt {
  id: number;
  text: string;
  quellen?: number[];
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
  quellenbewertung: QuellenBewertung;
  narrativanalyse: NarrativAnalyse;
  emotionale_analyse: EmotionaleAnalyse;
  reasoning: ReasoningSchritt[];
}

export interface DummyData {
  url: string;
  analyse: Analyse;
}

// Beispiel für eine seriöse Nachrichtenquelle
const serioeseQuelle: DummyData = {
  "url": "https://tagesschau.de/news/klimawandel",
  "analyse": {
    "status": "abgeschlossen",
    "vertrauensbewertung": 90,
    "zusammenfassung": "Der Artikel behandelt den Klimawandel mit fundierten wissenschaftlichen Quellen und einer ausgewogenen Darstellung der Fakten.",
    "schritte": [
      {
        "stufe": "Fakten Extrahieren",
        "beschreibung": "Extraktion der Hauptaussagen und Behauptungen aus dem Artikel.",
        "status": "erledigt"
      },
      {
        "stufe": "Fakten Prüfen",
        "beschreibung": "Überprüfung jeder Behauptung anhand zuverlässiger Quellen.",
        "status": "erledigt"
      },
      {
        "stufe": "Narrativ Prüfen",
        "beschreibung": "Analyse der Erzählstruktur und des Framings im Artikel.",
        "status": "erledigt"
      },
      {
        "stufe": "Emotionen Prüfen",
        "beschreibung": "Bewertung der emotionalen Sprache und Tonalität.",
        "status": "erledigt"
      },
      {
        "stufe": "Quelle Bewerten",
        "beschreibung": "Einschätzung der Glaubwürdigkeit der Nachrichtenquelle.",
        "status": "erledigt"
      }
    ],
    "reasoning": [
      {
        "id": 1,
        "text": "Ich beginne mit der Analyse des Artikels von tagesschau.de zum Thema Klimawandel."
      },
      {
        "id": 2,
        "text": "Der Artikel stammt von einer öffentlich-rechtlichen Nachrichtenquelle, die für ihre hohen journalistischen Standards bekannt ist."
      },
      {
        "id": 3,
        "text": "Die Behauptungen im Artikel werden durchgehend mit wissenschaftlichen Quellen belegt, darunter Daten der NASA und des IPCC."
      },
      {
        "id": 4,
        "text": "Die Aussage zur globalen Temperaturerhöhung um 1,2°C seit 1880 wird durch mehrere unabhängige Forschungseinrichtungen bestätigt."
      },
      {
        "id": 5,
        "text": "Die Daten zum Anstieg des Meeresspiegels stammen aus zuverlässigen Quellen wie der NOAA."
      },
      {
        "id": 6,
        "text": "Der Artikel verwendet eine sachliche Sprache ohne emotionale Übertreibungen."
      },
      {
        "id": 7,
        "text": "Die Darstellung ist ausgewogen und berücksichtigt verschiedene Aspekte des Klimawandels."
      },
      {
        "id": 8,
        "text": "Basierend auf der Qualität der Quellen und der sachlichen Darstellung bewerte ich den Artikel als sehr vertrauenswürdig."
      }
    ],
    "fakten": [
      {
        "titel": "Die globale Durchschnittstemperatur ist seit 1880 um 1,2°C gestiegen.",
        "belegt": true,
        "erklaerung": "Diese Aussage wird durch wissenschaftliche Daten belegt. Mehrere unabhängige Forschungseinrichtungen haben die globale Temperaturentwicklung seit dem späten 19. Jahrhundert dokumentiert und kommen zu ähnlichen Ergebnissen.",
        "quellen": [
          {
            "name": "NASA Klimadaten",
            "url": "https://climate.nasa.gov/evidence"
          },
          {
            "name": "Weltklimarat IPCC",
            "url": "https://www.ipcc.ch/report/ar6/wg1/"
          }
        ]
      },
      {
        "titel": "Der Meeresspiegel ist im 20. Jahrhundert um etwa 20 cm gestiegen.",
        "belegt": true,
        "erklaerung": "Diese Aussage wird durch Langzeitmessungen und Satellitendaten bestätigt. Der Anstieg des Meeresspiegels ist eine direkte Folge der globalen Erwärmung durch das Schmelzen von Gletschern und Eisschilden sowie die thermische Ausdehnung des Meerwassers.",
        "quellen": [
          {
            "name": "NOAA Meeresspiegel-Daten",
            "url": "https://www.climate.gov/news-features/understanding-climate/climate-change-global-sea-level"
          }
        ]
      }
    ],
    "quellenbewertung": {
      "domain": "tagesschau.de",
      "bewertung": "Die Tagesschau ist ein öffentlich-rechtliches Nachrichtenformat mit hohen journalistischen Standards. Die Berichterstattung ist in der Regel faktisch korrekt, ausgewogen und gut recherchiert. Die Quelle gilt als sehr vertrauenswürdig."
    },
    "narrativanalyse": {
      "ergebnis": "Neutral"
    },
    "emotionale_analyse": {
      "intensität": "Niedrig"
    }
  }
};

// Beispiel für eine weniger vertrauenswürdige Nachrichtenquelle
const wenigerVertrauenswuerdigeQuelle: DummyData = {
  "url": "https://example-tabloid.com/news/klimawandel-sensation",
  "analyse": {
    "status": "abgeschlossen",
    "vertrauensbewertung": 40,
    "zusammenfassung": "Der Artikel enthält mehrere unbelegte Behauptungen zum Klimawandel und verwendet emotionale Sprache, um Aufmerksamkeit zu erregen.",
    "schritte": [
      {
        "stufe": "Fakten Extrahieren",
        "beschreibung": "Extraktion der Hauptaussagen und Behauptungen aus dem Artikel.",
        "status": "erledigt"
      },
      {
        "stufe": "Fakten Prüfen",
        "beschreibung": "Überprüfung jeder Behauptung anhand zuverlässiger Quellen.",
        "status": "erledigt"
      },
      {
        "stufe": "Narrativ Prüfen",
        "beschreibung": "Analyse der Erzählstruktur und des Framings im Artikel.",
        "status": "erledigt"
      },
      {
        "stufe": "Emotionen Prüfen",
        "beschreibung": "Bewertung der emotionalen Sprache und Tonalität.",
        "status": "erledigt"
      },
      {
        "stufe": "Quelle Bewerten",
        "beschreibung": "Einschätzung der Glaubwürdigkeit der Nachrichtenquelle.",
        "status": "erledigt"
      }
    ],
    "reasoning": [
      {
        "id": 1,
        "text": "Ich beginne mit der Suche nach Informationen über die Quelle example-tabloid.com."
      },
      {
        "id": 2,
        "text": "Die Recherche zeigt, dass diese Quelle für sensationalistische Berichterstattung bekannt ist und in der Vergangenheit mehrfach Falschinformationen verbreitet hat."
      },
      {
        "id": 3,
        "text": "Bei der Analyse des Artikels fällt auf, dass emotionale Sprache verwendet wird, um Aufmerksamkeit zu erregen."
      },
      {
        "id": 4,
        "text": "Der Artikel enthält einige korrekte Informationen, wie die Aussage zur globalen Temperaturerhöhung, die durch NASA-Daten belegt werden kann."
      },
      {
        "id": 5,
        "text": "Allerdings enthält der Artikel auch unbelegte Behauptungen, wie die Aussage, dass der Amazonas-Regenwald 20% des weltweiten Sauerstoffs produziert."
      },
      {
        "id": 6,
        "text": "Für diese Behauptung konnten keine verlässlichen wissenschaftlichen Quellen gefunden werden."
      },
      {
        "id": 7,
        "text": "Aktuelle Forschungen deuten darauf hin, dass der Beitrag des Amazonas zur globalen Sauerstoffproduktion deutlich geringer ist."
      },
      {
        "id": 8,
        "text": "Die meiste Sauerstoffproduktion erfolgt durch Phytoplankton in den Ozeanen, nicht durch Regenwälder."
      },
      {
        "id": 9,
        "text": "Die Narrativanalyse zeigt, dass der Artikel einen alarmistischen Ton verwendet."
      },
      {
        "id": 10,
        "text": "Die emotionale Intensität des Artikels ist hoch, was auf eine mögliche Absicht hindeutet, starke Reaktionen hervorzurufen."
      },
      {
        "id": 12,
        "text": "Basierend auf der Mischung aus korrekten und unkorrekten Informationen sowie der sensationalistischen Darstellung bewerte ich den Artikel als teilweise vertrauenswürdig."
      }
    ],
    "fakten": [
      {
        "titel": "Die globale Durchschnittstemperatur ist seit 1880 um 1,2°C gestiegen.",
        "belegt": true,
        "erklaerung": "Diese Aussage wird durch wissenschaftliche Daten belegt. Mehrere unabhängige Forschungseinrichtungen haben die globale Temperaturentwicklung seit dem späten 19. Jahrhundert dokumentiert und kommen zu ähnlichen Ergebnissen.",
        "quellen": [
          {
            "name": "NASA Klimadaten",
            "url": "https://climate.nasa.gov/evidence"
          }
        ]
      },
      {
        "titel": "Der Amazonas-Regenwald produziert 20% des weltweiten Sauerstoffs.",
        "belegt": false,
        "erklaerung": "Für diese Behauptung konnten keine verlässlichen wissenschaftlichen Quellen gefunden werden. Aktuelle Forschungen deuten darauf hin, dass der Beitrag des Amazonas zur globalen Sauerstoffproduktion deutlich geringer ist und die meiste Sauerstoffproduktion durch Phytoplankton in den Ozeanen erfolgt.",
        "quellen": []
      }
    ],
    "quellenbewertung": {
      "domain": "example-tabloid.com",
      "bewertung": "Diese Nachrichtenquelle ist für sensationalistische Berichterstattung bekannt. In der Vergangenheit wurden mehrfach Falschinformationen verbreitet, die später korrigiert werden mussten. Die Quelle sollte mit Vorsicht betrachtet werden, da sie häufig Fakten übertreibt oder aus dem Kontext reißt, um Aufmerksamkeit zu erregen."
    },
    "narrativanalyse": {
      "ergebnis": "Alarmistisch"
    },
    "emotionale_analyse": {
      "intensität": "Hoch"
    }
  }
};

// Standardmäßig verwenden wir die weniger vertrauenswürdige Quelle als Beispiel
export const dummyData: DummyData = wenigerVertrauenswuerdigeQuelle; 