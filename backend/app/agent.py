# En: backend/app/agent.py

import pandas as pd
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_deepseek import ChatDeepSeek
from langchain_community.llms import Ollama
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain_core.language_models.chat_models import BaseChatModel

def get_llm(model_name: str) -> BaseChatModel:
    """
    Basado en un nombre, inicializa y devuelve el Modelo de Lenguaje Grande (LLM) correspondiente.
    """
    if model_name == "gemini":
        print("✅ Seleccionando modelo: Gemini 1.5 Flash")
        # Asegúrate de que GOOGLE_API_KEY esté en tu .env
        return ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
    
    elif model_name == "deepseek":
        print("✅ Seleccionando modelo: DeepSeek API")
        # Asegúrate de que DEEPSEEK_API_KEY esté en tu .env
        return ChatDeepSeek(model="deepseek-chat", temperature=0)
    
    elif model_name == "llama3":
        print("✅ Seleccionando modelo: Llama 3 (Ollama Local)")
        # Asegúrate de tener Ollama corriendo con 'ollama serve'
        return Ollama(model="llama3")
        
    else:
        # Modelo por defecto si el nombre no es válido
        print(f"⚠️ Modelo '{model_name}' no reconocido. Usando Gemini por defecto.")
        return ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)

def create_agent(df: pd.DataFrame, model_name: str = "gemini"):
    """
    Crea un agente de Pandas usando el DataFrame y el nombre del modelo especificados.
    """
    llm = get_llm(model_name)
    agent = create_pandas_dataframe_agent(
        llm,
        df,
        verbose=True,
        allow_dangerous_code=True
        # La línea 'handle_parsing_errors=True' ha sido eliminada.
    )
    print(f"✅ Agente creado con el modelo: {model_name}")
    return agent
