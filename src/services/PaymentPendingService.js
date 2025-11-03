// No necesitas un servicio separado, ya que estamos usando el objeto api directamente
// Pero si prefieres tener un servicio dedicado, puedes crear:

import { http, urlBase } from './http';

export const getPendingPayments = (filters = {}) => {
    return http().get(`${urlBase}/pending-payments`, { params: filters });
};

export const processPendingPayment = paymentId => {
    return http().post(`${urlBase}/pending-payments/${paymentId}/process`);
};

export const cancelPendingPayment = paymentId => {
    return http().post(`${urlBase}/pending-payments/${paymentId}/cancel`);
};
