export default function Header({ currentView }) {
  const titles = {
    analyze: {
      icon: '📊',
      title: 'Análisis de Datos',
      subtitle: 'Analiza tus datos de mantenimiento con IA'
    },
    instructions: {
      icon: '📖',
      title: 'Instrucciones de Uso',
      subtitle: 'Aprende a usar el sistema efectivamente'
    }
  };

  const current = titles[currentView] || titles.analyze;

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-white">
              {current.icon} {current.title}
            </h2>
            <span className="bg-cyan-900/30 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full border border-cyan-500/30">
              Prueba Técnica - Felipe Ruiz
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {current.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-cyan-900/20 px-4 py-2 rounded-lg">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-cyan-300">Sistema Activo</span>
          </div>
          <p className="text-xs text-gray-500">
            Analista de Datos de Mantenimiento - ISA
          </p>
        </div>
      </div>
    </header>
  );
}