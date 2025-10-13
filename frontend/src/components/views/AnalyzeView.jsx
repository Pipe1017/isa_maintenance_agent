import { useState } from 'react';
import FileUpload from '../shared/FileUpload';
import ChatInterface from '../shared/ChatInterface';
import QuickQuestions from '../shared/QuickQuestions';
import { askAgent } from '../../utils/api';

export default function AnalyzeView({ apiKey }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      {/* Panel Izquierdo: Carga, Resumen y Preguntas */}
      <div className="lg:col-span-1 space-y-6">
        <FileUpload 
          selectedFile={selectedFile}
          fileInfo={fileInfo}
          onFileChange={handleFileChange}
        />

        {/* Preguntas Rápidas Organizadas */}
        <QuickQuestions
          onSelectQuestion={setQuestion}
          disabled={!selectedFile || isLoading}
        />
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