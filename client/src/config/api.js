// Konfigurasi API URL yang terpusat
const API_URL = 'http://localhost:3000/api';

// Endpoint untuk autentikasi
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_URL}/auth/register`,
  LOGIN: `${API_URL}/auth/login`,
  HEALTH: `${API_URL}/health`, // Endpoint untuk memeriksa status server
};

// Konfigurasi axios default
export const AXIOS_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
  withCredentials: false // Untuk menangani masalah CORS
};

export default {
  API_URL,
  AUTH_ENDPOINTS,
  AXIOS_CONFIG
};