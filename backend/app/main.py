# En: backend/app/main.py

from fastapi import FastAPI

# 1. Crear una instancia de FastAPI
#    Esta variable 'app' es la que controlará toda nuestra API.
app = FastAPI()

# 2. Definir un "endpoint" o "ruta"
#    El decorador @app.get("/") le dice a FastAPI que cuando alguien
#    visite la dirección principal ("/"), debe ejecutar la función de abajo.
@app.get("/")
async def read_root():
    # 3. Devolver una respuesta
    #    FastAPI convierte automáticamente los diccionarios de Python a formato JSON.
    return {"message": "¡Hola, ISA INTERCOLOMBIA! La API está funcionando."}