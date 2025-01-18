const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '') + '/'

export async function apiRequest(endpoint, method, body) {
  try {
    const response = await fetch(API_URL + endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || 'Request failed');
      error.status = response.status;
      error.details = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    
    // Create a more informative error object
    const enhancedError = new Error(error.message || 'Network error');
    enhancedError.status = error.status || 500;
    enhancedError.details = error.details || { message: 'Please check your connection' };
    
    throw enhancedError;
  }
}
