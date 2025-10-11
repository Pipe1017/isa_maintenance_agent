export default function Sidebar({ currentView, onViewChange, onLogout }) {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h1 className="font-bold text-cyan-400">ISA Agent</h1>
            <p className="text-xs text-gray-400">DeepSeek R1</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => onViewChange('analyze')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === 'analyze'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="text-xl">📊</span>
            <span className="font-medium">Analizar Datos</span>
          </button>
          
          <button
            onClick={() => onViewChange('instructions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === 'instructions'
                ? 'bg-cyan-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="text-xl">📖</span>
            <span className="font-medium">Instrucciones</span>
          </button>
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium">Usuario</p>
              <p className="text-xs text-gray-400">Autenticado</p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full bg-red-900/30 hover:bg-red-900/50 text-red-400 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}