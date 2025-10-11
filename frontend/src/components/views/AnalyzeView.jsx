import { useState } from 'react';
import FileUpload from '../shared/FileUpload';
import ChatInterface from '../shared/ChatInterface';
import { askAgent } from '../../utils/api';

export default function AnalyzeView({ apiKey }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const exampleQuestions = [
    "¿Cuántos avisos hay en total?",
    "¿Cuántos avisos hay por área?",
    "¿Cuál es el tipo de equipo más común?"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setChatHistory([]);
      setFileInfo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !question.trim()) return;

    const userMessage = { type: 'user', content: question };
    setChatHistory(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    const currentQuestion = question;
    setQuestion('');

    try {
      const data = await askAgent(apiKey, selectedFile, currentQuestion);
      
      // Guardar info del archivo si es la primera consulta
      if (!fileInfo) {
        setFileInfo({
          filename: data.filename,
          rows: data.rows,
          columns: data.columns
        });
      }

      const botMessage = { 
        type: 'bot', 
        content: data.answer,
        model: data.model_used 
      };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (error) {
      const errorMessage = { 
        type: 'error', 
        content: `Error: ${error.message}` 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Panel Izquierdo: Carga y Resumen */}
      <div className="lg:col-span-1 space-y-6">
        <FileUpload 
          selectedFile={selectedFile}
          fileInfo={fileInfo}
          onFileChange={handleFileChange}
        />

        {/* Preguntas Rápidas */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-3">⚡ Preguntas Rápidas</h3>
          <div className="space-y-2">
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuestion(q)}
                disabled={!selectedFile || isLoading}
                className="w-full text-left text-xs bg-gray-700 hover:bg-cyan-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panel Derecho: Chat */}
      <div className="lg:col-span-2 h-full">
        <ChatInterface
          chatHistory={chatHistory}
          isLoading={isLoading}
          question={question}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
          selectedFile={selectedFile}
        />
      </div>
    </div>
  );
}