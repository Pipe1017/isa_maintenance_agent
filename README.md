# 🤖 Agente de Análisis de Datos - ISA INTERCOLOMBIA

**Prueba Técnica:** Analista de Datos de Mantenimiento  
**Candidato:** Felipe Ruiz  
**Fecha:** Octubre 2025

---

## 📋 Descripción

Agente conversacional que analiza datos de avisos de mantenimiento mediante preguntas en lenguaje natural. Utiliza DeepSeek R1 para interpretar preguntas y ejecutar análisis automático sobre archivos Excel.

**Demo:** https://isamaintenance.netlify.app/  
**API:** https://isa-maintenance-agent.onrender.com

---

## 🏗️ Arquitectura

```
┌─────────────────────┐
│   Usuario Final     │
│  (Navegador Web)    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐      ┌─────────────────────┐
│   Frontend (React)  │ ───► │  Backend (FastAPI)  │
│  Netlify (CDN)      │ ◄─── │    Render (Cloud)   │
└─────────────────────┘      └──────────┬──────────┘
                                        │
                                        ↓
                             ┌─────────────────────┐
                             │   DeepSeek R1 API   │
                             └─────────────────────┘
```

### Stack Tecnológico

**Frontend:** React 18 + Vite 5 + Tailwind CSS 4  
**Backend:** Python 3.13 + FastAPI 0.115 + Pandas 2.2  
**IA:** DeepSeek R1 + LangChain 0.3  
**Deploy:** Netlify + Render

---

## ✨ Características

- 🔐 Autenticación con API Keys
- 📁 Procesamiento de archivos Excel (.xlsx)
- 💬 Chat interactivo con historial
- 🧠 Análisis automático (filtros, agrupaciones, conteos)
- 📊 Resumen de archivos en tiempo real
- 📖 Documentación integrada

---

## 🚀 Instalación Local

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configurar .env
cp .env.example .env
# Añadir: DEEPSEEK_API_KEY y APP_API_KEY

uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install

# Configurar .env.local
echo "VITE_API_URL=http://127.0.0.1:8000" > .env.local
echo "VITE_API_KEY=tu_api_key" >> .env.local

npm run dev
```

---

## 🌐 Despliegue

### Render (Backend)

1. Conectar repositorio en render.com
2. Configurar:
   - **Build:** `pip install -r requirements.txt`
   - **Start:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Root:** `backend`
3. Variables de entorno:
   ```
   DEEPSEEK_API_KEY=sk-xxx
   APP_API_KEY=xxx
   PYTHON_VERSION=3.13
   ```

### Netlify (Frontend)

1. Conectar repositorio en netlify.com
2. Configurar:
   - **Build:** `npm run build`
   - **Publish:** `frontend/dist`
   - **Base:** `frontend`
3. Variables de entorno:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   VITE_API_KEY=xxx
   ```

---

## 📊 Resultados de Pruebas

**Archivo:** 543 avisos, 16 columnas (2011-2014)

| Pregunta | Resultado | Tiempo |
|----------|-----------|--------|
| ¿Cuántos avisos hay en total? | 543 | ~5s |
| ¿Cuántos avisos hay por área? | NOR: 351, SUR: 66... | ~10s |
| ¿Cuál es el área con más avisos? | NOR (Norte) | ~8s |
| Tipo de equipo más común | N-REACTO (120) | ~12s |

**Precisión:** 100% (15/15 preguntas validadas)

---

## 📂 Estructura del Proyecto

```
isa-maintenance-agent/
├── backend/
│   ├── app/
│   │   ├── main.py              # API FastAPI
│   │   └── agent.py             # Lógica del agente
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── utils/api.js         # Cliente API
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 💰 Costos

| Servicio | Costo/mes |
|----------|-----------|
| Render (Backend) | $0 (Free Tier) |
| Netlify (Frontend) | $0 (Free Tier) |
| DeepSeek R1 API | ~$5-20 |
| **Total** | **$5-20** |

---

## 🔒 Seguridad

- Autenticación con API Keys
- CORS configurado
- Variables sensibles en entorno
- Validación de archivos
- Sin almacenamiento persistente

---

## 📞 Contacto

**Felipe Ruiz**  
Email: [tu-email]  
LinkedIn: [tu-linkedin]  
GitHub: [tu-github]

---

*Desarrollado para ISA INTERCOLOMBIA - Octubre 2025*
