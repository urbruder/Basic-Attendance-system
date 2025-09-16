import axios from 'axios';

const api = axios.create({
  baseURL: 'https://basic-attendance-system-backend.vercel.app',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const startAttendanceSession = () => api.post('/attendance/start');
export const getAttendanceStatus = (sessionId) => api.get(`/attendance/status/${sessionId}`);