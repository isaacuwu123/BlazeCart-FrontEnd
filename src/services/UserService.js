import { http, urlBase } from './http';

export const infoUserComplete = id => {
    return http().get(`${urlBase}/users/${id}/complete`);
};

export const indexUsers = filtros => {
    return http().get(`${urlBase}/users`, { params: filtros });
};

export const showUsers = id => {
    return http().get(`${urlBase}/users/${id}`);
};

export const createUser = data => {
    return http().post(`${urlBase}/users`, data);
};

export const updateUser = (id, data) => {
    return http().put(`${urlBase}/users/${id}`, data);
};

export const updatePassword = (id, data) => {
    return http().put(`${urlBase}/users/${id}/password`, data);
};

export const usersActives = () => {
    return http().get(`${urlBase}/users/actives`);
};

// Nueva función para obtener usuario con contraseña
export const getUserWithPassword = id => {
    return http().get(`${urlBase}/users/${id}/with-password`);
};

export const getUserNotDriver = () => {
    return http().get(`${urlBase}/users/not-drivers`);
};
