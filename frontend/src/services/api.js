import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || { success: false, message: 'An unexpected error occurred' });
  }
);

export const getTasks = (params) => {
  return api.get('/tasks', { params });
};

export const getTaskStats = () => {
  return api.get('/tasks/stats');
};

export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

export const createTask = (data) => {
  return api.post('/tasks', data);
};

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export default api;
