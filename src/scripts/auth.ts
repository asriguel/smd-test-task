import { API_URL, AUTH_TOKEN_KEY, REDIRECT } from './constants';

export const authenticate = async (email: string, password: string): Promise<string> => {
  try {
    const getResponse = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${btoa(`${email}:${password}`)}`
      }
    });

    if (getResponse.ok) {
      const token = getResponse.headers.get('X-Token');
      if (!token) {
        throw new Error('Token not received');
      }
      return token;
    }

    const putResponse = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!putResponse.ok) {
      throw new Error('Authentication failed');
    }

    const token = putResponse.headers.get('X-Token');
    if (!token) {
      throw new Error('Token not received');
    }

    return token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const redirectToApp = (token: string): void => {
  window.location.href = `${REDIRECT.URL}${token}`;
}; 