import { Buffer } from 'buffer';

export const getToken = () => {
  const storedToken = localStorage.getItem('token');
  return storedToken ? Buffer.from(storedToken, 'base64').toString('ascii') : '';
};

export const getUserInfo = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Verificar expiración del token (si tu token JWT tiene exp)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};