export const API_BASE_URL = (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim() !== '')
    ? process.env.REACT_APP_API_URL.replace(/\/+$/, '')
    : 'https://frozenfeast.onrender.com';

export const API_VERSION_URL = `${API_BASE_URL}/api/v1`;

