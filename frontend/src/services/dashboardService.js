import api from './api';

export const getAdminDashboard = () => api.get('/dashboard/admin').then((r) => r.data);

export const getFinanceDashboard = (params) => api.get('/dashboard/finance', { params }).then((r) => r.data);
