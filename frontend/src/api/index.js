/**
 * Centralized Axios API client
 * All frontend API calls go through this module
 */
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-api-key': API_KEY }),
  },
});

// Request interceptor — attach the logged-in user's JWT, if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('siteguide_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error?.response?.data?.error?.message
      || error?.response?.data?.message
      || error.message
      || 'Network error';
    return Promise.reject(new Error(message));
  }
);

// ── Projects ───────────────────────────────────────────────────────────────
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  updateTaskStatus: (id, taskIndex, status) =>
    api.patch(`/projects/${id}/tasks/${taskIndex}`, { status }),
  delete: (id) => api.delete(`/projects/${id}`),
  estimate: (data) => api.post('/projects/estimate', data),
};

// ── AI ─────────────────────────────────────────────────────────────────────
export const aiApi = {
  chat: (prompt, context = null, history = []) =>
    api.post('/ai/chat', { prompt, context, history }),
  analyzeProject: (project) =>
    api.post('/ai/analyze-project', { project }),
};

// ── Scheduler ──────────────────────────────────────────────────────────────
export const schedulerApi = {
  getForProject: (projectId) => api.get(`/scheduler/${projectId}`),
  computeCustom: (tasks, startDate) =>
    api.post('/scheduler/compute', { tasks, startDate }),
};

// ── Analytics ──────────────────────────────────────────────────────────────
export const analyticsApi = {
  getSummary: () => api.get('/analytics/summary'),
};

// ── Health ─────────────────────────────────────────────────────────────────
export const healthApi = {
  check: () => api.get('/health'),
};

// ── Auth ───────────────────────────────────────────────────────────────────
export const authApi = {
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export default api;
