"""Zusammenfassungs-Agent zur Erstellung von prägnanten Zusammenfassungen."""

from .base_agent import BaseAgent

class SummaryAgent(BaseAgent):
    """Agent zur Erstellung von Zusammenfassungen der Analyse-Ergebnisse."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Zusammenfassungs-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Zusammenfassungs-Agent",
            role="Zusammenfasser",
            goal="Erstellung prägnanter und informationsdichter Zusammenfassungen der Analysen.",
            backstory="""Du bist ein Experte für die Erstellung von präzisen Zusammenfassungen. 
            Deine Aufgabe ist es, die Ergebnisse verschiedener Analysen zu einer 
            kohärenten, verständlichen und aussagekräftigen Zusammenfassung zu verdichten. 
            Du kannst komplexe Informationen auf die wesentlichen Punkte reduzieren, 
            ohne wichtige Details zu verlieren. Du präsentierst Informationen klar und 
            objektiv und kannst die Kernaussagen eines Textes zuverlässig identifizieren.""",
            model="claude-sonnet-3.5",
            tools=[],
            verbose=verbose
        ) 