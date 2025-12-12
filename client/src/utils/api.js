import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/todos',
});

export const getTodos = () => api.get('/');
export const createTodo = (text) => api.post('/', { text });
export const updateTodo = (id, updates) => api.put(`/${id}`, updates);
export const deleteTodo = (id) => api.delete(`/${id}`);

export default api;
