// En: src/App.jsx

import { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // La función handleSubmit SIN TypeScript
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
    formData.append('model_name', selectedModel);

    try {
      const response = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
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

  return (
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        <header className="text-center p-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-cyan-400">
            Prueba técnica – Analista de Datos de Mantenimiento
          </h1>
          <p className="text-gray-400 mt-2">
            Un agente inteligente para analizar datos de ISA INTERCOLOMBIA
          </p>
        </header>

        <main className="mt-8">
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-2">1. Selecciona el Modelo de IA</label>
                <select
                  id="model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                >
                  <option value="gemini">Gemini 1.5 Flash (Google)</option>
                  <option value="deepseek">DeepSeek (API)</option>
                  <option value="llama3">Llama 3 (Local)</option>
                </select>
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">2. Sube tu archivo Excel (.xlsx)</label>
                <input
                  type="file"
                  id="file"
                  accept=".xlsx"
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-300 mb-2">3. Escribe tu pregunta</label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ej: ¿Cuántos avisos hay en el área SUR?"
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
              {isLoading ? 'Pensando...' : 'Analizar y Preguntar'}
            </button>
          </form>
          {isLoading && (
             <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <p className="text-cyan-400 animate-pulse">Pensando...</p>
             </div>
          )}
          {answer && !isLoading && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Respuesta del Agente</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;