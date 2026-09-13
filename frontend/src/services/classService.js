import api from './api';

export const getClasses = () => api.get('/classes').then((r) => r.data);
