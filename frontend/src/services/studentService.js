import api from './api';

export const getStudents = (params) => api.get('/students', { params }).then((r) => r.data);

export const getStudent = (id) => api.get(`/students/${id}`).then((r) => r.data);

export const createStudent = (payload) => api.post('/students', payload).then((r) => r.data);

export const updateStudent = (id, payload) => api.put(`/students/${id}`, payload).then((r) => r.data);

export const deleteStudent = (id) => api.delete(`/students/${id}`).then((r) => r.data);
