# En: backend/app/main.py

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware # <--- 1. IMPORTAR
import pandas as pd
import io
from dotenv import find_dotenv, load_dotenv
from app.agent import create_agent

# Carga de Claves de API
env_file = find_dotenv()
if env_file:
    load_dotenv(env_file)
    print("✅ Claves de API cargadas.")
else:
    print("⚠️ Archivo .env no encontrado.")

app = FastAPI(
    title="🤖 Agente Inteligente de Análisis de Datos",
    description="Una API que recibe un archivo Excel y responde preguntas sobre él.",
    version="2.0.0",
)

# --- 2. AÑADIR LA CONFIGURACIÓN DE CORS ---
# Orígenes permitidos (tu frontend de React/Vite)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://tu-app.netlify.app",  # Tu frontend en Netlify
    "https://*.netlify.app",       # Para preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"], # Permitir todos los encabezados
)
# --------------------------------------------

# ... (El resto de tu código de los endpoints /ask y / se queda exactamente igual)

@app.post("/ask", summary="Analiza un archivo Excel y responde una pregunta")
async def ask_agent(
    model_name: str = Form(...),
    question: str = Form(...),
    file: UploadFile = File(...)
):
    if not file.filename.endswith('.xlsx'):
        raise HTTPException(status_code=400, detail="Error: El archivo debe ser un .xlsx")
    try:
        contents = await file.read()
        buffer = io.BytesIO(contents)
        dataframe = pd.read_excel(buffer)
        print(f"✅ DataFrame cargado desde el archivo subido: {file.filename}")
        try:
            agent_executor = create_agent(dataframe, model_name)
            respuesta = agent_executor.invoke({"input": question})
            return {
                "question": question,
                "model_used": model_name,
                "answer": respuesta["output"],
                "filename": file.filename
            }
        except Exception as e:
            print(f"--- ERROR DETALLADO DEL AGENTE ---")
            print(e)
            print(f"---------------------------------")
            raise HTTPException(status_code=500, detail=f"Ocurrió un error ejecutando el agente: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocurrió un error leyendo el archivo: {e}")

@app.get("/")
def read_root():
    return {"message": "API del Agente Inteligente de Análisis de Datos"}