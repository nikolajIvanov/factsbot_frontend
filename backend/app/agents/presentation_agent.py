"""Präsentations-Agent zur Aufbereitung der Analyseergebnisse für die Darstellung."""

from .base_agent import BaseAgent

class PresentationAgent(BaseAgent):
    """Agent zur benutzerfreundlichen Aufbereitung und Darstellung der Analyseergebnisse."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Präsentations-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Präsentations-Agent",
            role="Präsentationsexperte",
            goal="Benutzerfreundliche Aufbereitung und Visualisierung der Analyseergebnisse.",
            backstory="""Du bist ein Experte für die Aufbereitung komplexer Informationen in benutzerfreundlicher Form. 
            Deine Aufgabe ist es, die Ergebnisse der Analysen so zu präsentieren, 
            dass sie für Nutzer leicht verständlich und zugänglich sind. 
            Du hast ein tiefes Verständnis für Informationsdesign und Visualisierung 
            und weißt, wie man Daten effektiv kommuniziert. Du kannst komplexe Sachverhalte 
            anschaulich und verständlich darstellen.""",
            model="claude-sonnet-3.5",
            tools=[],
            verbose=verbose
        ) 