"""FactsBot-Crew zur Koordination der Agenten für die Faktenchecks."""

from crewai import Crew, Process, Task
from ..agents.orchestrator_agent import OrchestratorAgent
from ..agents.crawler_agent import CrawlingAgent
from ..agents.narrative_agent import NarrativeAgent
from ..agents.emotion_agent import EmotionClassifyingAgent
from ..agents.fact_extraction_agent import FactExtractionAgent
from ..agents.fact_checking_agent import FactCheckingAgent
from ..agents.source_evaluation_agent import SourceEvaluationAgent
from ..agents.summary_agent import SummaryAgent
from ..agents.presentation_agent import PresentationAgent
from typing import Dict, Any

class FactsBotCrew:
    """Crew zur Koordination aller Agenten für den FactsBot."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert die FactsBot-Crew.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        self.verbose = verbose
        self._initialize_agents()
        self.crew = self._create_crew()
    
    def _initialize_agents(self):
        """Initialisiert alle Agenten für die Crew."""
        self.orchestrator_agent = OrchestratorAgent(verbose=self.verbose).create()
        self.crawler_agent = CrawlingAgent(verbose=self.verbose).create()
        self.narrative_agent = NarrativeAgent(verbose=self.verbose).create()
        self.emotion_agent = EmotionClassifyingAgent(verbose=self.verbose).create()
        self.fact_extraction_agent = FactExtractionAgent(verbose=self.verbose).create()
        self.fact_checking_agent = FactCheckingAgent(verbose=self.verbose).create()
        self.source_evaluation_agent = SourceEvaluationAgent(verbose=self.verbose).create()
        self.summary_agent = SummaryAgent(verbose=self.verbose).create()
        self.presentation_agent = PresentationAgent(verbose=self.verbose).create()
        
    def _create_crew(self) -> Crew:
        """Erstellt die Crew mit allen Aufgaben und Agenten."""
        return Crew(
            agents=[
                self.orchestrator_agent,
                self.crawler_agent,
                self.narrative_agent, 
                self.emotion_agent,
                self.fact_extraction_agent,
                self.fact_checking_agent,
                self.source_evaluation_agent,
                self.summary_agent,
                self.presentation_agent
            ],
            tasks=self._create_tasks(),
            verbose=self.verbose,
            process=Process.sequential  # Sequentieller Prozess für eine bessere Steuerung
        )
    
    def _create_tasks(self) -> list:
        """Erstellt die Aufgaben für die Crew."""
        
        crawling_task = Task(
            description="""
            Crawle die angegebene URL und extrahiere den Inhalt der Webseite.
            Extrahiere den Text, den Titel und relevante Metadaten der Webseite.
            Achte darauf, den Hauptinhalt von Navigations- und Werbeelementen zu trennen.
            Strukturiere die Ergebnisse klar und übergib sie für die weitere Verarbeitung.
            """,
            agent=self.crawler_agent,
            expected_output="Extrahierter Webinhalt mit Text und Metadaten im JSON-Format."
        )
        
        narrative_task = Task(
            description="""
            Analysiere den extrahierten Text auf narrative Elemente und stilistische Mittel.
            Identifiziere die Hauptnarrative und Themen des Textes.
            Untersuche die rhetorischen Figuren und die Art der Präsentation.
            Bewerte, wie diese Narrative die Wahrnehmung der Leser beeinflussen könnten.
            Liefere eine detaillierte Analyse der narrativen Struktur und Stilmittel.
            Der Input ist: {crawler_result}
            """,
            agent=self.narrative_agent,
            expected_output="Detaillierte Analyse der Narrative und Stilmittel im Text im JSON-Format."
        )
        
        emotion_task = Task(
            description="""
            Analysiere den extrahierten Text auf emotionale Inhalte und Tonalität.
            Identifiziere die dominanten Emotionen in Überschriften und im Haupttext.
            Klassifiziere die erkannten Emotionen und berechne ihre relative Intensität.
            Bewerte, wie die emotionale Ausrichtung die Botschaft des Textes beeinflusst.
            Erstelle eine detaillierte Emotionsanalyse des gesamten Inhalts.
            Der Input ist: {crawler_result}
            """,
            agent=self.emotion_agent,
            expected_output="Detaillierte Emotionsanalyse des Textes im JSON-Format."
        )
        
        fact_extraction_task = Task(
            description="""
            Extrahiere alle faktischen Aussagen und Behauptungen aus dem Text.
            Unterscheide zwischen Meinungen, Wertungen und überprüfbaren Fakten.
            Extrahiere den Kontext jeder Faktenbehauptung.
            Strukturiere die extrahierten Fakten für die weitere Überprüfung.
            Der Input ist: {crawler_result}
            """,
            agent=self.fact_extraction_agent,
            expected_output="Liste extrahierter faktischer Aussagen mit Kontext im JSON-Format."
        )
        
        fact_checking_task = Task(
            description="""
            Überprüfe die extrahierten faktischen Aussagen auf ihre Richtigkeit.
            Recherchiere jede Behauptung mit verlässlichen Quellen.
            Bewerte den Wahrheitsgehalt jeder Aussage.
            Gib eine Begründung für jede Bewertung an.
            Die zu überprüfenden Fakten sind: {fact_extraction_result}
            """,
            agent=self.fact_checking_agent,
            expected_output="Detaillierte Faktenüberprüfung mit Bewertungen und Begründungen im JSON-Format."
        )
        
        source_evaluation_task = Task(
            description="""
            Bewerte die Glaubwürdigkeit und Vertrauenswürdigkeit der Quelle.
            Untersuche die Reputation, das Geschäftsmodell und frühere Faktengenauigkeit der Quelle.
            Bewerte die Transparenz und journalistische Standards der Quelle.
            Gib eine Gesamtbewertung der Quellenzuverlässigkeit mit Begründung.
            Die Informationen zur Quelle sind in: {crawler_result}
            """,
            agent=self.source_evaluation_agent,
            expected_output="Detaillierte Quellenbewertung mit Begründung im JSON-Format."
        )
        
        summary_task = Task(
            description="""
            Erstelle eine prägnante Zusammenfassung der gesamten Analyse.
            Berücksichtige alle wichtigen Erkenntnisse aus den Einzelanalysen.
            Fasse die Hauptpunkte der Narrativ-, Emotions- und Faktenanalyse zusammen.
            Formuliere ein Gesamtfazit zur Analyse des Artikels.
            Die Analyseergebnisse sind:
            - Narrativanalyse: {narrative_result}
            - Emotionsanalyse: {emotion_result}
            - Faktenüberprüfung: {fact_checking_result}
            - Quellenbewertung: {source_evaluation_result}
            """,
            agent=self.summary_agent,
            expected_output="Prägnante Zusammenfassung der Gesamtanalyse im JSON-Format."
        )
        
        presentation_task = Task(
            description="""
            Bereite die Analyseergebnisse für die Präsentation in einer benutzerfreundlichen Form auf.
            Strukturiere die Informationen klar und übersichtlich.
            Visualisiere die Glaubwürdigkeitsbewertung mit einem Ampelsystem.
            Stelle die wichtigsten Erkenntnisse heraus und sorge für eine ansprechende Darstellung.
            Berücksichtige alle Analyseergebnisse:
            - Zusammenfassung: {summary_result}
            - Originaltext und Metadaten: {crawler_result}
            """,
            agent=self.presentation_agent,
            expected_output="Benutzerfreundlich aufbereitete Präsentation der Analyseergebnisse im JSON-Format."
        )
        
        orchestration_task = Task(
            description="""
            Koordiniere den gesamten Analyseprozess und stelle sicher, dass alle Agenten ihre Aufgaben effizient erfüllen.
            Überwache die Ergebnisse der einzelnen Aufgaben und optimiere den Arbeitsablauf.
            Sorge für einen reibungslosen Datenfluss zwischen den Agenten.
            Stelle sicher, dass alle Teilanalysen in die Gesamtanalyse einfließen.
            """,
            agent=self.orchestrator_agent,
            expected_output="Statusbericht über den erfolgreichen Abschluss der Analyse."
        )
        
        return [
            crawling_task,
            narrative_task,
            emotion_task,
            fact_extraction_task,
            fact_checking_task,
            source_evaluation_task,
            summary_task,
            presentation_task,
            orchestration_task
        ]
    
    def analyze_url(self, url: str) -> Dict[str, Any]:
        """
        Führt eine vollständige Analyse der angegebenen URL durch.
        
        Args:
            url: Die zu analysierende URL.
            
        Returns:
            Die Ergebnisse der Analyse.
        """
        # Führe die Crew mit der URL als Eingabe aus
        result = self.crew.kickoff(inputs={"url": url})
        
        # Formatiere das Ergebnis
        return self._format_results(result)
    
    def _format_results(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """
        Formatiert die Ergebnisse der Analyse.
        
        Args:
            results: Die Rohergebnisse der Analyse.
            
        Returns:
            Die formatierten Ergebnisse.
        """
        # In einer realen Anwendung würde hier eine komplexere Ergebnisformatierung stattfinden
        return {
            "status": "success",
            "results": results
        } 