// src/services/BusinessService.js
import { http, urlBase } from './http';

export const businessesActives = () => {
    return http().get(`${urlBase}/business/state-actives`);
};
export const businessesActivesDriver = () => {
    return http().get(`${urlBase}/business-driver/state-actives-driver`);
};
export const indexBusinesses = () => {
    return http().get(`${urlBase}/business`);
};

export const showBusiness = id => {
    return http().get(`${urlBase}/business/${id}`);
};

export const storeBusiness = data => {
    return http().post(`${urlBase}/business`, data);
};

export const updateBusiness = (id, data) => {
    return http().put(`${urlBase}/business/${id}`, data);
};

export const activateBusiness = id => {
    return http().post(`${urlBase}/business/${id}/activate`);
};

export const deactivateBusiness = id => {
    return http().post(`${urlBase}/business/${id}/desactivate`);
};
