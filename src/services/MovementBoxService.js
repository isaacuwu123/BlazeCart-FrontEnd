// services/MovementBoxService.js
import { http, urlBase } from './http';

export const getMovements = (params = {}) => {
    return http().get(`${urlBase}/movements-boxes`, { params });
};

export const getMovementsByOperatingBox = (operatingBoxId, params = {}) => {
    return http().get(`${urlBase}/movements-boxes/por-caja-operativa`, {
        params: {
            operating_box_id: operatingBoxId,
            ...params,
        },
    });
};

export const getCategories = () => {
    return http().get(`${urlBase}/categories`);
};

export const getOperatingBoxes = () => {
    return http().get(`${urlBase}/operating-boxes`);
};

export const getUsers = () => {
    return http().get(`${urlBase}/users`);
};
