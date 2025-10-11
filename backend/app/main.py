from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Security, Depends
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import os
from dotenv import find_dotenv, load_dotenv
from app.agent import create_agent

# Carga de Claves de API
env_file = find_dotenv()
if env_file:
    load_dotenv(env_file)
    print("✅ Claves de API cargadas.")
else:
    print("⚠️ Archivo .env no encontrado.")

# Configuración de seguridad
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Obtener la clave válida desde variables de entorno
VALID_API_KEY = os.getenv("APP_API_KEY")

if not VALID_API_KEY:
    print("⚠️ ADVERTENCIA: APP_API_KEY no está configurada. La API estará sin protección.")


async def verify_api_key(api_key: str = Security(api_key_header)):
    """
    Verifica que la API key proporcionada sea válida.
    """
    # Si no hay API key configurada, permitir acceso (desarrollo)
    if not VALID_API_KEY:
        return api_key
    
    if api_key is None:
        raise HTTPException(
            status_code=403,
            detail="API Key no proporcionada. Incluye el header 'X-API-Key' en tu solicitud."
        )
    
    if api_key != VALID_API_KEY:
        raise HTTPException(
            status_code=403,
            detail="API Key inválida. Acceso denegado."
        )
    
    return api_key


app = FastAPI(
    title="🤖 Agente DeepSeek R1 - ISA (Protegido)",
    description="API protegida que usa DeepSeek R1 para analizar datos de mantenimiento",
    version="3.1.0",
)

# Configuración de CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://*.netlify.app",
    # Añade aquí tu dominio de producción cuando lo tengas
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root(api_key: str = Security(api_key_header)):
    """
    Endpoint de verificación. Si se proporciona API Key, la valida.
    Si no se proporciona, devuelve info básica.
    """
    # Si hay API key configurada Y se proporciona una, verificarla
    if VALID_API_KEY and api_key:
        if api_key != VALID_API_KEY:
            raise HTTPException(
                status_code=403,
                detail="API Key inválida"
            )
        # API Key válida
        return {
            "message": "API del Agente DeepSeek R1 - ISA INTERCOLOMBIA",
            "status": "online",
            "authenticated": True,
            "model": "DeepSeek R1 (deepseek-reasoner)",
            "version": "3.1.0"
        }
    
    # Sin API key o sin validación requerida
    return {
        "message": "API del Agente DeepSeek R1 - ISA INTERCOLOMBIA",
        "status": "online",
        "authenticated": False,
        "protected": bool(VALID_API_KEY),
        "info": "Endpoint protegido. Requiere X-API-Key header para usar /ask"
    }


@app.get("/health")
def health_check():
    """Endpoint público de health check para servicios de despliegue"""
    return {"status": "healthy", "model": "deepseek-r1"}


@app.post("/ask", summary="Analiza un archivo Excel con DeepSeek R1 (Protegido)")
async def ask_agent(
    question: str = Form(...),
    file: UploadFile = File(...),
    api_key: str = Depends(verify_api_key)  # ✅ Protección aquí
):
    """
    Endpoint protegido que procesa un archivo Excel y responde preguntas usando DeepSeek R1.
    
    Requiere el header 'X-API-Key' con una clave válida.
    
    Args:
        question: Pregunta sobre los datos
        file: Archivo Excel (.xlsx)
        api_key: Clave de API (verificada automáticamente)
    
    Returns:
        JSON con la respuesta del agente
    """
    
    # Validar extensión del archivo
    if not file.filename.endswith('.xlsx'):
        raise HTTPException(
            status_code=400, 
            detail="Error: El archivo debe ser un .xlsx"
        )
    
    try:
        # Leer el archivo Excel
        contents = await file.read()
        buffer = io.BytesIO(contents)
        dataframe = pd.read_excel(buffer)
        
        print(f"✅ DataFrame cargado: {file.filename}")
        print(f"   Dimensiones: {dataframe.shape}")
        print(f"   Usuario autenticado: {api_key[:8]}...")
        
        # Validar que el DataFrame no esté vacío
        if dataframe.empty:
            raise HTTPException(
                status_code=400,
                detail="El archivo Excel está vacío"
            )
        
        # Crear y ejecutar el agente con DeepSeek R1
        try:
            agent_executor = create_agent(dataframe)
            
            print(f"🤖 Ejecutando pregunta con DeepSeek R1: {question}")
            respuesta = agent_executor.invoke({"input": question})
            
            return {
                "question": question,
                "model_used": "DeepSeek R1 (deepseek-reasoner)",
                "answer": respuesta["output"],
                "filename": file.filename,
                "rows": dataframe.shape[0],
                "columns": dataframe.shape[1]
            }
            
        except Exception as e:
            print(f"❌ ERROR DETALLADO DEL AGENTE:")
            print(f"   Tipo: {type(e).__name__}")
            print(f"   Mensaje: {str(e)}")
            raise HTTPException(
                status_code=500, 
                detail=f"Error ejecutando el agente: {str(e)}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ ERROR leyendo archivo: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error procesando el archivo: {str(e)}"
        )