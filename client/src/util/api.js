export async function apiRequest(endpoint, method, body) {
  const url = 'http://localhost:3001/';
  try {
    const response = await fetch(url + endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}