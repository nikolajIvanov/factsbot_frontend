"""Tool zum Abrufen und Verarbeiten von Webinhalten."""

import requests
from bs4 import BeautifulSoup
from crewai.tools import BaseTool
from typing import Dict, Any, Optional

class WebCrawlerTool(BaseTool):
    """Tool zum Crawlen von Webseiten und Extrahieren von Inhalten."""
    
    name: str = "Web Crawler Tool"
    description: str = "Ruft den Inhalt einer URL ab und extrahiert den Text sowie Metadaten."
    
    def _run(self, url: str) -> Dict[str, Any]:
        """
        Abrufen und Verarbeiten des Inhalts einer URL.
        
        Args:
            url: Die zu crawlende URL.
            
        Returns:
            Ein Dictionary mit dem Text, dem Titel und den Metadaten der Webseite.
        """
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Metadaten extrahieren
            metadata = {
                "title": self._get_title(soup),
                "author": self._get_metadata(soup, "author"),
                "description": self._get_metadata(soup, "description"),
                "published_date": self._get_metadata(soup, "published_time") or self._get_metadata(soup, "date"),
                "url": url
            }
            
            # Haupttextinhalt extrahieren
            main_content = self._extract_main_content(soup)
            
            return {
                "text": main_content,
                "metadata": metadata
            }
            
        except Exception as e:
            return {
                "error": f"Fehler beim Crawlen der URL: {str(e)}",
                "text": "",
                "metadata": {}
            }
    
    def _extract_main_content(self, soup: BeautifulSoup) -> str:
        """Extrahiert den Haupttextinhalt aus der Seite."""
        # Entferne unwichtige Elemente
        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()
            
        # Versuche, den Hauptinhalt zu finden
        article = soup.find("article") or soup.find(attrs={"class": ["content", "article", "post"]})
        if article:
            text = article.get_text(separator="\n", strip=True)
        else:
            # Fallback auf den Haupttext
            paragraphs = soup.find_all("p")
            text = "\n".join([p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 50])
            
        return text
    
    def _get_title(self, soup: BeautifulSoup) -> str:
        """Extrahiert den Titel der Seite."""
        title_tag = soup.find("title")
        if title_tag:
            return title_tag.get_text(strip=True)
        
        h1_tag = soup.find("h1")
        if h1_tag:
            return h1_tag.get_text(strip=True)
            
        return "Kein Titel gefunden"
    
    def _get_metadata(self, soup: BeautifulSoup, property_name: str) -> Optional[str]:
        """Extrahiert Metadaten aus Meta-Tags."""
        # Versuche verschiedene Meta-Tag-Formate
        meta = (
            soup.find("meta", property=f"og:{property_name}") or
            soup.find("meta", property=f"article:{property_name}") or
            soup.find("meta", attrs={"name": property_name})
        )
        
        if meta and meta.get("content"):
            return meta["content"]
            
        return None 