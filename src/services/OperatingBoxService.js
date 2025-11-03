import { http, httpNotToken, urlBase } from './http';

/**
 * Listar todas las cajas operativas con filtros de fecha opcionales
 * @param {string} fechaInicio - Fecha de inicio (formato: YYYY-MM-DD)
 * @param {string} fechaFin - Fecha de fin (formato: YYYY-MM-DD)
 */
export const indexOperatingBoxes = (fechaInicio = null, fechaFin = null) => {
    let url = `${urlBase}/operating-boxes`;
    const params = [];

    if (fechaInicio) {
        params.push(`fecha_inicio=${fechaInicio}`);
    }

    if (fechaFin) {
        params.push(`fecha_fin=${fechaFin}`);
    }

    if (params.length > 0) {
        url += `?${params.join('&')}`;
    }

    return http().get(url);
};

export const storeOperatingBox = data => {
    return http().post(`${urlBase}/operating-boxes`, data);
};
export const showOperatingBox = id => {
    return http().get(`${urlBase}/operating-boxes/${id}`);
};
export const updateOperatingBox = (id, data) => {
    return http().put(`${urlBase}/operating-boxes/${id}`, data);
};
export const deactivateOperatingBox = id => {
    return http().delete(`${urlBase}/operating-boxes/${id}`);
};
export const activateOperatingBox = id => {
    return http().post(`${urlBase}/operating-boxes/${id}/activate`);
};

export const deletePermanentOperatingBox = id => {
    return http().delete(`${urlBase}/operating-boxes/${id}/delete-permanent`);
};
export const operatingBoxesActives = () => {
    return httpNotToken().get(`${urlBase}/operating-box/active`);
};
