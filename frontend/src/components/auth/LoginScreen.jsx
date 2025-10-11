import { useState } from 'react';
import { checkServerStatus } from '../../utils/api';

export default function LoginScreen({ onLoginSuccess }) {
  const [apiKey, setApiKey] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!apiKey.trim()) {
      setLoginError('Por favor ingresa una API Key válida');
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await checkServerStatus(apiKey);
      
      if (isValid) {
        sessionStorage.setItem('apiKey', apiKey);
        onLoginSuccess(apiKey);
      } else {
        setLoginError('API Key inválida. Por favor verifica tu clave.');
      }
    } catch (error) {
      setLoginError('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">
              Acceso Restringido
            </h1>
            <p className="text-gray-400">
              Agente DeepSeek R1 - ISA INTERCOLOMBIA
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                Clave de Acceso
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Ingresa tu API Key"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white placeholder-gray-500"
                autoFocus
                disabled={isLoading}
              />
            </div>

            {loginError && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {loginError}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
            >
              {isLoading ? '🔄 Verificando...' : '🚀 Acceder al Sistema'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              💡 Solicita tu clave al equipo de TI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}