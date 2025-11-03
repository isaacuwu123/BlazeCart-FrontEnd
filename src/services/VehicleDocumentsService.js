import { http, httpAsset, httpDownload, urlBase } from './http';

// Obtener todos los documentos de vehículos
export const indexVehicleDocuments = () => {
    return http().get(`${urlBase}/vehicle-documents`);
};

// Obtener un documento específico por su ID
export const showVehicleDocument = id => {
    return http().get(`${urlBase}/vehicle-documents/${id}`);
};

// Obtener documentos de un vehículo específico por ID de vehículo
export const showVehicleDocumentsByVehicleId = vehicleId => {
    return http().get(`${urlBase}/vehicle-documents/vehicle/${vehicleId}`);
};

// Crear un nuevo documento de vehículo
export const createVehicleDocument = data => {
    return httpAsset().post(`${urlBase}/vehicle-documents`, data);
};

// Actualizar un documento existente
export const updateVehicleDocument = (id, data) => {
    return httpAsset().post(`${urlBase}/vehicle-documents/${id}`, data);
};

// Eliminar un documento
export const deleteVehicleDocument = id => {
    return http().delete(`${urlBase}/vehicle-documents/${id}`);
};

// Descargar un documento
export const downloadVehicleDocument = id => {
    return httpDownload().get(`${urlBase}/vehicle-documents/download/${id}`);
};
