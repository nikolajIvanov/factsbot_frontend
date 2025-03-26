"""Crawling-Agent zum Abrufen von Webinhalten."""

from .base_agent import BaseAgent
from ..tools.web_crawler import WebCrawlerTool

class CrawlingAgent(BaseAgent):
    """Agent zum Crawlen von Webseiten und Extrahieren von Inhalten."""
    
    def __init__(self, verbose: bool = False):
        """
        Initialisiert den Crawling-Agenten.
        
        Args:
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        super().__init__(
            name="Crawling-Agent",
            role="Web Crawler und Datenextrahierer",
            goal="Abrufen und Aufbereiten von Webinhalten für die Analyse durch andere Agenten.",
            backstory="""Du bist ein spezialisierter Agent für das Abrufen und Verarbeiten von Webinhalten. 
            Deine Hauptaufgabe ist es, den Inhalt von Webseiten zu extrahieren, 
            den Text zu bereinigen und relevante Metadaten zu sammeln. 
            Du bist sehr effizient darin, die Struktur von Webseiten zu verstehen 
            und den relevanten Inhalt vom Rauschen zu trennen.""",
            model="gpt-4o",
            tools=[WebCrawlerTool()],
            verbose=verbose
        ) 