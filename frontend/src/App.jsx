import { useState, useEffect } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import InstructionsView from './components/views/InstructionsView';
import AnalyzeView from './components/views/AnalyzeView';
import { checkServerStatus } from './utils/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [currentView, setCurrentView] = useState('analyze');

  // Recuperar sesión si existe
  useEffect(() => {
    const savedKey = sessionStorage.getItem('apiKey');
    if (savedKey) {
      setApiKey(savedKey);
      checkServerStatus(savedKey)
        .then(isValid => {
          if (isValid) setIsAuthenticated(true);
          else sessionStorage.removeItem('apiKey');
        })
        .catch(() => sessionStorage.removeItem('apiKey'));
    }
  }, []);

  const handleLoginSuccess = (key) => {
    setApiKey(key);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey('');
    sessionStorage.removeItem('apiKey');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar 
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} />
        
        <div className="flex-1 overflow-auto p-8">
          {currentView === 'instructions' ? (
            <InstructionsView />
          ) : (
            <AnalyzeView apiKey={apiKey} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;