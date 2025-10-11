// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Verificar el estado del servidor
export const checkServerStatus = async (apiKey) => {
  const headers = apiKey ? { 'X-API-Key': apiKey } : {};
  
  try {
    const response = await fetch(`${API_URL}/`, { headers });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Enviar pregunta al agente
export const askAgent = async (apiKey, file, question) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('question', question);

  const response = await fetch(`${API_URL}/ask`, {
    method: 'POST',
    headers: { 'X-API-Key': apiKey },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error en el servidor');
  }

  return response.json();
};