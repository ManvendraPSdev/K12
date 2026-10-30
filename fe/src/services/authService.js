import apiClient from './apiClient.js';

/**
 * Admin Authentication Service
 * Endpoints:
 * - POST /api/v1/auth/login
 * - GET  /api/v1/auth/me
 * - POST /api/v1/auth/logout
 */

export async function login({ email, password }) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
}

export async function getMe() {
  const response = await apiClient.get('/auth/me');
  return response.data;
}

export async function logout() {
  const response = await apiClient.post('/auth/logout');
  return response.data;
}

export default {
  login,
  getMe,
  logout,
};
