import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function App() {
  // Estados para autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Estados para la aplicación
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función para verificar la API Key
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!apiKey.trim()) {
      setLoginError('Por favor ingresa una API Key válida');
      return;
    }

    // Intentar hacer una petición de prueba al backend para verificar la clave
    try {
      const response = await fetch(`${API_URL}/`, {
        headers: {
          'X-API-Key': apiKey,
        },
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        setLoginError('');
        // Guardar en sessionStorage para mantener la sesión
        sessionStorage.setItem('apiKey', apiKey);
      } else {
        setLoginError('API Key inválida. Por favor verifica tu clave.');
      }
    } catch (error) {
      setLoginError('Error al conectar con el servidor. Verifica que el backend esté corriendo.');
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey('');
    setAnswer('');
    setSelectedFile(null);
    setQuestion('');
    sessionStorage.removeItem('apiKey');
  };

  // Función para enviar pregunta
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !question) {
      alert('Por favor, selecciona un archivo y escribe una pregunta.');
      return;
    }

    setIsLoading(true);
    setAnswer('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('question', question);

    try {
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ocurrió un error en el servidor.');
      }

      const data = await response.json();
      setAnswer(data.answer);

    } catch (error) {
      alert(`Error al contactar la API: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Preguntas de ejemplo
  const exampleQuestions = [
    "¿Cuántos avisos hay en total?",
    "¿Cuántos avisos hay por área de empresa?",
    "¿Cuál es el área con más avisos?",
    "¿Cuántos avisos hay de prioridad 5?",
    "¿Cuál es el tipo de equipo más común?"
  ];

  // Recuperar sesión si existe
  useState(() => {
    const savedKey = sessionStorage.getItem('apiKey');
    if (savedKey) {
      setApiKey(savedKey);
      // Verificar que siga siendo válida
      fetch(`${API_URL}/`, {
        headers: { 'X-API-Key': savedKey }
      })
      .then(res => {
        if (res.ok) setIsAuthenticated(true);
        else sessionStorage.removeItem('apiKey');
      })
      .catch(() => sessionStorage.removeItem('apiKey'));
    }
  }, []);

  // Pantalla de Login
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔐</div>
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">
                Acceso Restringido
              </h1>
              <p className="text-gray-400">
                Agente DeepSeek R1 - ISA INTERCOLOMBIA
              </p>
            </div>

            {/* Formulario de Login */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Ingresa tu clave de acceso"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-gray-500"
                  autoFocus
                />
              </div>

              {loginError && (
                <div className="bg-red-900/30 border border-red-500 rounded-md p-3">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <span>⚠️</span>
                    {loginError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>🚀</span>
                Acceder
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-md">
              <p className="text-xs text-gray-400 text-center">
                💡 Solicita tu clave de acceso al equipo de TI de ISA INTERCOLOMBIA
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>Prueba técnica - Analista de Datos de Mantenimiento</p>
          </div>
        </div>
      </div>
    );
  }

  // Aplicación Principal (después del login)
  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        <header className="text-center p-6 border-b border-gray-700 relative">
          <h1 className="text-3xl font-bold text-cyan-400">
            🤖 Agente DeepSeek R1 - ISA INTERCOLOMBIA
          </h1>
          <p className="text-gray-400 mt-2">
            Análisis inteligente de datos de mantenimiento con DeepSeek R1
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="inline-block bg-cyan-900/30 px-4 py-2 rounded-full">
              <span className="text-cyan-300 text-sm font-medium">
                ⚡ Powered by DeepSeek R1
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-block bg-red-900/30 hover:bg-red-900/50 px-4 py-2 rounded-full transition-colors text-sm font-medium text-red-400"
            >
              🚪 Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="mt-8">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                1. Sube tu archivo Excel (.xlsx)
              </label>
              <input
                type="file"
                id="file"
                accept=".xlsx"
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition-colors"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-green-400">
                  ✓ Archivo seleccionado: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">
                2. Escribe tu pregunta
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ej: ¿Cuántos avisos hay en el área SUR?"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-gray-500"
              />
            </div>

            <div className="bg-gray-700/50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-300 mb-2">💡 Preguntas de ejemplo:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQuestions.map((q, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="text-xs bg-gray-700 hover:bg-cyan-600 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  DeepSeek R1 está pensando...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  Analizar con DeepSeek R1
                </>
              )}
            </button>
          </form>

          {isLoading && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-pulse text-4xl">🧠</div>
                <p className="text-cyan-400 animate-pulse text-lg font-medium">
                  DeepSeek R1 está razonando sobre tus datos...
                </p>
                <p className="text-gray-400 text-sm">
                  Esto puede tomar unos momentos mientras analiza la información
                </p>
              </div>
            </div>
          )}

          {answer && !isLoading && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h2 className="text-xl font-bold text-cyan-400">Respuesta de DeepSeek R1</h2>
              </div>
              <div className="bg-gray-900 p-4 rounded-md">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{answer}</p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm pb-6">
          <p>Prueba técnica - Analista de Datos de Mantenimiento</p>
          <p className="mt-1">ISA INTERCOLOMBIA © 2025</p>
        </footer>
      </div>
    </div>
  );
}

export default App;