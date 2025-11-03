// src/services/ProfileService.js
import { http, urlBase } from './http';

// Obtener perfil completo del usuario
export const getProfile = () => {
    return http().get(`${urlBase}/profile`);
};

// Obtener datos del formulario de perfil
export const getProfileFormData = () => {
    return http().get(`${urlBase}/profile/form-data`);
};

// Actualizar perfil
export const updateProfile = profileData => {
    return http().put(`${urlBase}/profile`, profileData);
};

// Cambiar contraseña
export const changePassword = passwordData => {
    return http().post(`${urlBase}/profile/change-password`, passwordData);
};
