import { api } from './client.js'
export const register = (data) => api('/auth/register', { method: 'POST', body: JSON.stringify(data) })
export const login = (data) => api('/auth/login', { method: 'POST', body: JSON.stringify(data) })