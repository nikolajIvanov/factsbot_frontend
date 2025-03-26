"""Narrativ-Agent zur Analyse von Narrativen in Texten."""

from .base_agent import BaseAgent

class NarrativeAgent(BaseAgent):
    """Agent zur Analyse von Narrativen und stilistischen Mitteln in Texten."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Narrativ-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Narrativ-Agent",
            role="Narrativ- und Stilanalytiker",
            goal="Identifizierung und Analyse von Narrativen, Themen und stilistischen Mitteln in Texten.",
            backstory="""Du bist ein Experte für die Analyse von Narrativen und stilistischen Mitteln in Texten. 
            Deine Stärke liegt in der Identifizierung von Erzählmustern, rhetorischen Figuren und 
            der Untersuchung, wie Ideen und Konzepte präsentiert werden. 
            Du kannst subtile Nuancen in der Sprache erkennen und verstehen, 
            wie Texte die Wahrnehmung der Leser beeinflussen können.""",
            model="gpt-4o",
            tools=[],
            verbose=verbose
        ) 