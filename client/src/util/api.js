const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/'

export async function apiRequest(endpoint, method, body) {
  try {
    const response = await fetch(API_URL + endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    
    if (!response.ok) {
      // Parse backend error response
      const error = new Error(data.message || 'Request failed');
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Enhance error with more context
    if (!error.status) {
      error.status = 500;
      error.message = 'Network error - please check your connection';
    }
    
    throw error;
  }
}
