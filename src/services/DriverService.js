import { http, httpAsset, urlBase } from './http';

export const indexDrivers = params2 => {
    return http().get(`${urlBase}/drivers`, { params: params2 });
};

export const getDriverInfo = id => {
    return http().get(`${urlBase}/drivers/${id}/info`);
};

export const showDriver = id => {
    return http().get(`${urlBase}/drivers/${id}`);
};

export const createDriver = data => {
    return httpAsset().post(`${urlBase}/drivers`, data);
};

export const updateDriver = (id, data) => {
    return httpAsset().post(`${urlBase}/drivers/${id}`, data);
};

export const createDriverWithUser = data => {
    return httpAsset().post(`${urlBase}/drivers/with-user`, data);
};

export const indexDriversActives = () => {
    return http().get(`${urlBase}/drivers/state-actives`);
};

export const deleteDriver = id => {
    return http().delete(`${urlBase}/drivers/${id}`);
};

export const updateDriverPassword = (userId, data) => {
    return http().put(`${urlBase}/users/${userId}/password`, data);
};
export const activateDriver = id => {
    return http().post(`${urlBase}/drivers/${id}/activate`);
};

export const deactivateDriver = id => {
    return http().post(`${urlBase}/drivers/${id}/desactivate`);
};
