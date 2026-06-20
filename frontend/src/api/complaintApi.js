import api from './axiosInstance';

export const createComplaint = (data) => api.post('/api/complaints', data);
export const getMyComplaints = () => api.get('/api/complaints');
export const getAllComplaints = () => api.get('/api/complaints/all');
export const updateComplaintStatus = (id, status) =>
  api.put(`/api/complaints/${id}`, { status });
