export default function InstructionsView() {
  const exampleQuestions = [
    "¿Cuántos avisos hay en total?",
    "¿Cuántos avisos hay por área de empresa?",
    "¿Cuál es el área con más avisos?",
    "¿Cuántos avisos hay de prioridad 5?",
    "¿Cuál es el tipo de equipo más común?",
    "En el área SUR, ¿cuál es el equipo más frecuente?"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cómo Usar */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">🚀 Cómo Usar el Agente</h3>
        <div className="space-y-4 text-gray-300">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Sube tu archivo Excel</h4>
              <p className="text-sm text-gray-400">
                En la sección "Analizar Datos", carga tu archivo .xlsx con los datos de avisos de mantenimiento.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Revisa el resumen</h4>
              <p className="text-sm text-gray-400">
                El sistema te mostrará un resumen del archivo: nombre, número de filas y columnas.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Haz preguntas en lenguaje natural</h4>
              <p className="text-sm text-gray-400">
                Escribe tus preguntas como si hablaras con un colega. El agente las entenderá y responderá.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold">
              4
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Mantén la conversación</h4>
              <p className="text-sm text-gray-400">
                Puedes hacer preguntas de seguimiento. El historial se mantiene durante la sesión.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ejemplos de Preguntas */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">💡 Ejemplos de Preguntas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQuestions.map((q, i) => (
            <div key={i} className="bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors">
              <p className="text-sm text-gray-300">"{q}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mejores Prácticas */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-cyan-400 mb-4">✨ Mejores Prácticas</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-cyan-400">•</span>
            <span className="text-sm">Sé específico en tus preguntas para obtener respuestas más precisas</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">•</span>
            <span className="text-sm">Puedes hacer preguntas de seguimiento basadas en respuestas anteriores</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">•</span>
            <span className="text-sm">El agente puede filtrar, agrupar y contar datos automáticamente</span>
          </li>
          <li className="flex gap-3">
            <span className="text-cyan-400">•</span>
            <span className="text-sm">Si subes un nuevo archivo, el historial se reiniciará</span>
          </li>
        </ul>
      </div>

      {/* Info sobre DeepSeek */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-6 border border-cyan-500/30">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">⚡ Potenciado por DeepSeek R1</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          Este agente utiliza DeepSeek R1, un modelo de razonamiento avanzado que analiza tus datos
          de forma inteligente y precisa. Cada respuesta está basada en cálculos reales sobre tus datos.
          El tiempo de respuesta puede variar entre 10-60 segundos dependiendo de la complejidad de la pregunta.
        </p>
      </div>
    </div>
  );
}