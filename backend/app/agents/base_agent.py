"""Basisklasse für alle Agenten im System."""

from crewai import Agent
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv

# Lade Umgebungsvariablen aus .env-Datei
load_dotenv()

class BaseAgent:
    """Basisklasse für alle Agenten im System."""
    
    def __init__(
        self,
        name: str,
        role: str,
        goal: str,
        backstory: str,
        model: str,
        tools: Optional[List[Any]] = None,
        verbose: bool = False
    ):
        """
        Initialisiert einen neuen Basisagenten.
        
        Args:
            name: Name des Agenten
            role: Rolle des Agenten
            goal: Ziel des Agenten
            backstory: Hintergrundgeschichte des Agenten
            model: Name des zu verwendenden KI-Modells
            tools: Liste der Tools, die der Agent verwenden kann
            verbose: Ob ausführliche Logging-Informationen angezeigt werden sollen
        """
        self.name = name
        self.role = role
        self.goal = goal
        self.backstory = backstory
        self.model = model
        self.tools = tools or []
        self.verbose = verbose
        
    def create(self) -> Agent:
        """
        Erstellt eine Instanz des Agenten mit CrewAI.
        
        Returns:
            Eine Instanz von CrewAI Agent.
        """
        return Agent(
            name=self.name,
            role=self.role,
            goal=self.goal,
            backstory=self.backstory,
            verbose=self.verbose,
            tools=self.tools,
            allow_delegation=False,
            llm=self._get_llm_config()
        )
    
    def _get_llm_config(self) -> Dict[str, Any]:
        """
        Gibt die Konfiguration für das LLM basierend auf dem Modellnamen zurück.
        
        Returns:
            Die Konfiguration für das LLM.
        """
        if "gpt-4" in self.model.lower():
            from langchain.chat_models import ChatOpenAI
            return ChatOpenAI(
                model_name=self.model,
                temperature=0.2,
                api_key=os.getenv("OPENAI_API_KEY")
            )
        elif "claude" in self.model.lower():
            from langchain.chat_models import ChatAnthropic
            return ChatAnthropic(
                model_name=self.model,
                temperature=0.2,
                api_key=os.getenv("ANTHROPIC_API_KEY")
            )
        elif "perplexity" in self.model.lower():
            from langchain.llms import Perplexity
            return Perplexity(
                model="mistral-7b-instruct",
                api_key=os.getenv("PERPLEXITY_API_KEY")
            )
        elif "deepseek" in self.model.lower():
            # Hier müsste eine entsprechende Konfiguration für DeepSeek R1 erfolgen
            # Da DeepSeek R1 nicht standardmäßig in langchain integriert ist, 
            # würde es eine benutzerdefinierte Integration erfordern
            from langchain.llms import OpenAI
            return OpenAI(
                model_name="text-davinci-003",  # Fallback
                temperature=0.2,
                api_key=os.getenv("OPENAI_API_KEY")
            )
        else:
            # Standardmäßig GPT-3.5 verwenden
            from langchain.chat_models import ChatOpenAI
            return ChatOpenAI(
                model_name="gpt-3.5-turbo",
                temperature=0.2,
                api_key=os.getenv("OPENAI_API_KEY")
            ) 