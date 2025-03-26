"""Faktenprüfungs-Agent zur Überprüfung von Fakten und Behauptungen."""

from .base_agent import BaseAgent

class FactCheckingAgent(BaseAgent):
    """Agent zur Überprüfung von Fakten und Behauptungen."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Faktenprüfungs-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Faktenprüfungs-Agent",
            role="Faktenprüfer",
            goal="Überprüfung der Richtigkeit von Fakten und Behauptungen.",
            backstory="""Du bist ein Experte für die Überprüfung von Fakten und Behauptungen. 
            Deine Aufgabe ist es, extrahierte Fakten mit verlässlichen Quellen und 
            Datenbanken zu vergleichen und ihre Genauigkeit zu bewerten. 
            Du bist sehr gründlich in deinen Recherchen und bewertest Behauptungen 
            stets auf Basis fundierter Informationen. Du gibst präzise Begründungen 
            für deine Bewertungen und sorgst für Transparenz im Überprüfungsprozess.""",
            model="perplexity",
            tools=[],
            verbose=verbose
        ) 