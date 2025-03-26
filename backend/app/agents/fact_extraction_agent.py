"""Fakten-Extraktions-Agent zur Identifizierung faktischer Aussagen in Texten."""

from .base_agent import BaseAgent

class FactExtractionAgent(BaseAgent):
    """Agent zur Extraktion von Fakten aus Texten."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Fakten-Extraktions-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Fakten-Extraktions-Agent",
            role="Faktenextrahierer",
            goal="Identifizierung und Extraktion faktischer Aussagen aus Texten.",
            backstory="""Du bist ein Experte für die Identifizierung faktischer Aussagen in Texten. 
            Deine Aufgabe ist es, zwischen Meinungen, Behauptungen und überprüfbaren Fakten zu unterscheiden. 
            Du kannst wichtige Fakten aus komplexen Texten extrahieren und für die Überprüfung aufbereiten. 
            Du achtest auf Details und Kontext, um sicherzustellen, dass die extrahierten Fakten 
            genau erfasst werden.""",
            model="claude-sonnet-3.5",
            tools=[],
            verbose=verbose
        ) 