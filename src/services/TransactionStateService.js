import { http, urlBase } from './http';

// Obtener estados de transacción activos
export const transactionStatesActives = () => {
    return http().get(`${urlBase}/transaction-states/actives`);
};
// Obtener todos los estados de transacción
export const indexTransactionStates = () => {
    return http().get(`${urlBase}/transaction-states-admin`);
};

// Obtener un estado de transacción específico
export const showTransactionState = id => {
    return http().get(`${urlBase}/transaction-states-admin/${id}`);
};

// Crear un nuevo estado de transacción
export const storeTransactionState = data => {
    return http().post(`${urlBase}/transaction-states-admin`, data);
};

// Actualizar un estado de transacción existente
export const updateTransactionState = (id, data) => {
    return http().put(`${urlBase}/transaction-states-admin/${id}`, data);
};

// Eliminar un estado de transacción
export const deleteTransactionState = id => {
    return http().delete(`${urlBase}/transaction-states-admin/${id}`);
};

// Activar un estado de transacción
export const activateTransactionState = id => {
    return http().put(`${urlBase}/transaction-states-admin/${id}/activate`);
};

// Desactivar un estado de transacción
export const deactivateTransactionState = id => {
    return http().put(`${urlBase}/transaction-states-admin/${id}/deactivate`);
};
