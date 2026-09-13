import api from './api';

export const getFinanceUsers = () => api.get('/finance-users').then((r) => r.data);

export const createFinanceUser = (payload) => api.post('/finance-users', payload).then((r) => r.data);

export const updateFinanceUser = (id, payload) => api.put(`/finance-users/${id}`, payload).then((r) => r.data);

export const deleteFinanceUser = (id) => api.delete(`/finance-users/${id}`).then((r) => r.data);
