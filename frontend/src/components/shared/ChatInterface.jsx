import { useEffect, useRef } from 'react';

export default function ChatInterface({ 
  chatHistory, 
  isLoading, 
  question, 
  onQuestionChange, 
  onSubmit, 
  selectedFile 
}) {
  const chatEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 flex flex-col h-full">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💬</span>
              </div>
              <p className="text-gray-400">Sube un archivo y comienza a hacer preguntas</p>
            </div>
          </div>
        ) : (
          <>
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl rounded-xl p-4 ${
                  msg.type === 'user' 
                    ? 'bg-cyan-600 text-white'
                    : msg.type === 'error'
                    ? 'bg-red-900/30 border border-red-500 text-red-400'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {msg.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🤖</span>
                      <span className="text-xs text-gray-400">{msg.model}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-sm text-gray-400 ml-2">DeepSeek R1 está pensando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            disabled={!selectedFile || isLoading}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!selectedFile || !question.trim() || isLoading}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold px-6 py-3 rounded-lg transition-all disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⚙️</span>
                <span className="hidden sm:inline">Pensando...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span className="hidden sm:inline">Enviar</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}