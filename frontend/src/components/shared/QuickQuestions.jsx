import { useState } from 'react';

export default function QuickQuestions({ onSelectQuestion, disabled }) {
  const [activeCategory, setActiveCategory] = useState('general');

  const questionCategories = {
    general: {
      title: '📊 Conteos Generales',
      questions: [
        '¿Cuántos avisos hay en total?',
        '¿Cuántas columnas tiene el archivo?',
        '¿Cuáles son todas las columnas disponibles?',
        'Muéstrame un resumen general de los datos',
        '¿Cuántos avisos únicos hay?'
      ]
    },
    area: {
      title: '📍 Por Área/Ubicación',
      questions: [
        '¿Cuántos avisos hay por área de empresa?',
        '¿Cuál es el área con más avisos?',
        '¿Cuál es el área con menos avisos?',
        '¿Cuántos avisos hay en el área NOR?',
        '¿Cuántos avisos hay en el área SUR?',
        '¿Cuántos avisos hay en el área CEN?',
        'Dame el top 3 de áreas con más avisos'
      ]
    },
    priority: {
      title: '⚠️ Por Prioridad',
      questions: [
        '¿Cuántos avisos hay de cada prioridad?',
        '¿Cuántos avisos hay de prioridad crítica (1-2)?',
        '¿Cuántos avisos hay de prioridad 5?',
        '¿Cuál es la prioridad más común?',
        '¿Cuántos avisos no tienen prioridad asignada?',
        'Agrupa los avisos por prioridad'
      ]
    },
    equipment: {
      title: '🔧 Por Equipo',
      questions: [
        '¿Cuál es el tipo de equipo más común?',
        '¿Cuántos tipos de equipo diferentes hay?',
        'Dame los 5 tipos de equipo con más avisos',
        '¿Cuántos avisos hay para transformadores?',
        '¿Cuántos avisos hay para reactores?',
        'Muéstrame la distribución por perfil de catálogo'
      ]
    },
    class: {
      title: '📋 Por Clase de Aviso',
      questions: [
        '¿Cuántas clases de aviso existen?',
        '¿Cuántos avisos hay de clase N4?',
        '¿Cuántos avisos hay de clase N2?',
        '¿Cuál es la clase de aviso más frecuente?',
        'Agrupa los avisos por clase'
      ]
    },
    dates: {
      title: '📅 Por Fechas',
      questions: [
        '¿Cuál es el aviso más antiguo?',
        '¿Cuál es el aviso más reciente?',
        '¿En qué año se crearon más avisos?',
        '¿Cuántos avisos fueron creados en 2011?',
        '¿Cuál es el rango de fechas de los avisos?'
      ]
    },
    combined: {
      title: '🎯 Consultas Combinadas',
      questions: [
        '¿Cuántos avisos de prioridad 5 hay en el área NOR?',
        'En el área SUR, ¿cuál es el tipo de equipo más común?',
        '¿Cuántos avisos de clase N2 tienen prioridad crítica?',
        'Dame avisos de transformadores con prioridad alta',
        '¿Qué área tiene más avisos de prioridad 1?'
      ]
    },
    search: {
      title: '🔍 Búsquedas Específicas',
      questions: [
        'Busca avisos relacionados con "fuga de aceite"',
        'Busca avisos que mencionen "buchholz"',
        'Muéstrame avisos sobre "válvulas"',
        '¿Cuántos avisos mencionan "silica"?',
        'Busca avisos relacionados con "corrosión"'
      ]
    }
  };

  const categories = Object.keys(questionCategories);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">⚡ Preguntas Rápidas</h3>
      
      {/* Tabs de Categorías */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeCategory === cat
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {questionCategories[cat].title}
          </button>
        ))}
      </div>

      {/* Lista de Preguntas */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {questionCategories[activeCategory].questions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelectQuestion(q)}
            disabled={disabled}
            className="w-full text-left text-xs bg-gray-700 hover:bg-cyan-600 text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          💡 {questionCategories[activeCategory].questions.length} preguntas en esta categoría
        </p>
      </div>
    </div>
  );
}