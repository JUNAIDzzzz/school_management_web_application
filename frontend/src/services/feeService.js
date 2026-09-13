import api from './api';

export const getFees = (params) => api.get('/fees', { params }).then((r) => r.data);

export const markFeePaid = (payload) => api.post('/fees/mark-paid', payload).then((r) => r.data);

export const updateFeeRecord = (id, payload) => api.patch(`/fees/${id}`, payload).then((r) => r.data);
