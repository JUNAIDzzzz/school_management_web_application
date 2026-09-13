import api from './api';

export const getMonthlyReport = (params) => api.get('/reports/monthly', { params }).then((r) => r.data);
