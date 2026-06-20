import api from './axiosInstance';

export const registerUser = (data) => api.post('/api/users/register', data);
export const loginUser = (data) => api.post('/api/users/login', data);
export const getProfile = () => api.get('/api/users/profile');
