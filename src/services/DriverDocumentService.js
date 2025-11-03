import { http, httpAsset, httpDownload, urlBase } from './http';

export const indexDriversDocuments = () => {
    return http().get(`${urlBase}/driver-documents`);
};

export const createDriverDocument = data => {
    return httpAsset().post(`${urlBase}/driver-documents`, data);
};

export const updateDriverDocument = (id, data) => {
    return httpAsset().post(`${urlBase}/driver-documents/${id}`, data);
};

export const deleteDriverDocument = id => {
    return http().delete(`${urlBase}/driver-documents/${id}`);
};

export const showDriverDocument = id => {
    return http().get(`${urlBase}/driver-documents/${id}`);
};

export const downloadDriverDocument = id => {
    return httpDownload().get(`${urlBase}/driver-documents/${id}/download`);
};
