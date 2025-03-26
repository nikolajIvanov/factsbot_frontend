"""Emotions-Klassifizierungs-Agent zur Analyse von Emotionen in Texten."""

from .base_agent import BaseAgent

class EmotionClassifyingAgent(BaseAgent):
    """Agent zur Klassifizierung von Emotionen in Texten."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Emotions-Klassifizierungs-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Emotion-Classifying-Agent",
            role="Emotionsanalytiker",
            goal="Identifizierung und Analyse von Emotionen in Texten.",
            backstory="""Du bist ein Experte für die Analyse emotionaler Inhalte in Texten. 
            Deine Aufgabe ist es, die in Überschriften und Haupttext vorhandenen Emotionen zu erkennen 
            und zu klassifizieren. Du kannst subtile emotionale Untertöne identifizieren und 
            die emotionale Ausrichtung eines Textes präzise bewerten. 
            Du verstehst, wie Emotionen zur Beeinflussung von Lesern eingesetzt werden können.""",
            model="perplexity",
            tools=[],
            verbose=verbose
        ) 