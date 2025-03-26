"""Quellenbewertungs-Agent zur Bewertung der Glaubwürdigkeit von Quellen."""

from .base_agent import BaseAgent

class SourceEvaluationAgent(BaseAgent):
    """Agent zur Bewertung der Glaubwürdigkeit und Vertrauenswürdigkeit von Quellen."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Quellenbewertungs-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Quellenbewertungs-Agent",
            role="Quellenbewerter",
            goal="Bewertung der Glaubwürdigkeit und Vertrauenswürdigkeit von Informationsquellen.",
            backstory="""Du bist ein Experte für die Bewertung der Glaubwürdigkeit von Informationsquellen. 
            Deine Aufgabe ist es, die Vertrauenswürdigkeit von Quellen basierend auf 
            verschiedenen Faktoren wie Reputation, Geschäftsmodell, Transparenz und 
            frühere Genauigkeit zu bewerten. Du verstehst die Medienlandschaft gut und 
            kannst Bias und journalistische Standards in der Berichterstattung erkennen. 
            Du gibst objektive Einschätzungen zur Verlässlichkeit von Informationsquellen.""",
            model="gpt-4o",
            tools=[],
            verbose=verbose
        ) 