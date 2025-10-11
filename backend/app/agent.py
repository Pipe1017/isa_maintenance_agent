import os
import pandas as pd
from langchain_openai import ChatOpenAI
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent


def get_deepseek_llm():
    """
    Inicializa el modelo DeepSeek R1 usando la API compatible con OpenAI.
    """
    api_key = os.getenv("DEEPSEEK_API_KEY")
    
    if not api_key:
        raise ValueError("❌ DEEPSEEK_API_KEY no encontrada en el archivo .env")
    
    print("✅ Inicializando DeepSeek R1")
    
    # DeepSeek R1 usa una API compatible con OpenAI
    llm = ChatOpenAI(
        model="deepseek-reasoner",  # Modelo DeepSeek R1
        openai_api_key=api_key,
        openai_api_base="https://api.deepseek.com",  # Endpoint de DeepSeek
        temperature=0,
        max_tokens=8000
    )
    
    return llm


def create_agent(df: pd.DataFrame):
    """
    Crea un agente de Pandas usando DeepSeek R1 para analizar el DataFrame.
    
    Args:
        df: DataFrame de Pandas con los datos
    
    Returns:
        Agente configurado para analizar el DataFrame
    """
    llm = get_deepseek_llm()
    
    # Prompt del sistema optimizado para DeepSeek R1
    prefix = """
Eres un asistente experto en análisis de datos de mantenimiento de transformadores para ISA INTERCOLOMBIA.

Tienes acceso a un DataFrame de pandas con información de avisos de mantenimiento.

INSTRUCCIONES IMPORTANTES:
1. Analiza cuidadosamente los datos del DataFrame antes de responder
2. Usa código Python con pandas para calcular respuestas precisas
3. Presenta resultados de forma clara y profesional
4. Si necesitas contar, agrupar o filtrar datos, usa las funciones de pandas
5. Siempre verifica que tus cálculos sean correctos

Cuando te hagan una pregunta:
- Primero explora los datos relevantes
- Realiza los cálculos necesarios
- Presenta la respuesta con números exactos

Recuerda: Solo responde basándote en los datos disponibles en el DataFrame.
"""
    
    agent = create_pandas_dataframe_agent(
        llm,
        df,
        prefix=prefix,
        verbose=True,
        allow_dangerous_code=True,
        max_iterations=15,
        max_execution_time=120,
        agent_type="openai-tools"  # Mejor para modelos tipo OpenAI
    )
    
    print(f"✅ Agente creado con DeepSeek R1")
    print(f"   DataFrame shape: {df.shape}")
    print(f"   Columnas disponibles: {list(df.columns)}")
    
    return agent