import { http, urlBase } from './http';

export const paymentMethodsActivesDriver = () => {
    return http().get(`${urlBase}/payment-method-driver/state-actives-driver`);
};
export const paymentMethodsActives = () => {
    return http().get(`${urlBase}/payment-method/actives`);
};
export const indexPaymentMethods = () => {
    return http().get(`${urlBase}/payment-method`);
};

export const showPaymentMethod = id => {
    return http().get(`${urlBase}/payment-method/${id}`);
};

export const storePaymentMethod = data => {
    return http().post(`${urlBase}/payment-method`, data);
};

export const updatePaymentMethod = (id, data) => {
    return http().put(`${urlBase}/payment-method/${id}`, data);
};

export const activatePaymentMethod = id => {
    return http().post(`${urlBase}/payment-method/${id}/activate`);
};

export const deactivatePaymentMethod = id => {
    return http().post(`${urlBase}/payment-method/${id}/desactivate`);
};
