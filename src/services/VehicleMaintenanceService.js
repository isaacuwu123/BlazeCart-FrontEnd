import { http, httpAsset, httpDownload, urlBase } from './http';

// Obtener todos los mantenimientos de vehículos
export const indexVehicleMaintenances = () => {
    return http().get(`${urlBase}/vehicle-maintenances`);
};

// Obtener mantenimientos de un vehículo específico
export const showVehicleMaintenancesByVehicleId = vehicleId => {
    return http().get(`${urlBase}/vehicle-maintenances/vehicle/${vehicleId}`);
};

// Obtener mantenimientos activos (pendientes o atrasados)
export const getActiveMaintenances = (params = {}) => {
    return http().get(`${urlBase}/vehicle-maintenances/active`, { params });
};

// Crear un nuevo mantenimiento
export const createVehicleMaintenance = data => {
    return httpAsset().post(`${urlBase}/vehicle-maintenances`, data);
};

// Actualizar un mantenimiento existente
export const updateVehicleMaintenance = (id, data) => {
    return httpAsset().post(`${urlBase}/vehicle-maintenances/${id}`, data);
};

// Eliminar un mantenimiento
export const deleteVehicleMaintenance = id => {
    return http().delete(`${urlBase}/vehicle-maintenances/${id}`);
};

// Descargar un documento de mantenimiento
export const downloadMaintenanceDocument = id => {
    return httpDownload().get(`${urlBase}/vehicle-maintenances/download/${id}`);
};

// Obtener un mantenimiento específico por ID
export const showMaintenance = id => {
    return http().get(`${urlBase}/vehicle-maintenances/${id}`);
};
