// services/DashboardService.js
import { http, urlBase } from './http';

export const getDriverDashboardData = () => {
    return http().get(`${urlBase}/transaction-financial-driver/driver/dashboard`);
};
