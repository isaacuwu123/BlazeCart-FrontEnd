import { http, httpAsset, urlBase } from './http';
export const indexVehicles = () => {
    return http().get(`${urlBase}/vehicles`);
};
export const storeVehicle = data => {
    return httpAsset().post(`${urlBase}/vehicles`, data);
};
export const showVehicle = id => {
    return http().get(`${urlBase}/vehicles/${id}`);
};

export const updateVehicle = (id, data) => {
    return http().put(`${urlBase}/vehicles/${id}`, data);
};

export const destroyVehicle = id => {
    return http().delete(`${urlBase}/vehicles/${id}`);
};
export const indexVehiclesActives = () => {
    return http().get(`${urlBase}/vehicles/estado-activos`);
};

export const vehiclesAuthUser = () => {
    return http().get(`${urlBase}/vehicles/autheticated/user`);
};

export const activateVehicle = id => {
    return http().post(`${urlBase}/vehicles/${id}/activate`);
};

export const deactivateVehicle = id => {
    return http().post(`${urlBase}/vehicles/${id}/desactivate`);
};
