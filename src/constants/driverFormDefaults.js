// src/constants/driverFormDefaults.js

/**
 * Valores por defecto para el formulario de conductor
 * ⚠️ ADAPTADO PARA SNAKE_CASE (backend Laravel)
 *
 * ⚠️ IMPORTANTE: Al asignar esto a formData.value, SIEMPRE usar:
 * - structuredClone(DEFAULT_DRIVER_FORM_DATA)
 * - JSON.parse(JSON.stringify(DEFAULT_DRIVER_FORM_DATA))
 *
 * NUNCA usar spread operator ({ ...DEFAULT_DRIVER_FORM_DATA }) porque solo
 * copia el primer nivel y mantiene referencias en objetos anidados
 */
export const DEFAULT_DRIVER_FORM_DATA = {
    id: null,
    user_id: '', // ⚠️ Cambiado de userid a user_id
    numero_licencia: '', // ⚠️ Cambiado de numerolicencia
    vencimiento_licencia: '', // ⚠️ Cambiado de vencimientolicencia
    estado_licencia: '', // ⚠️ Cambiado de estadolicencia
    clase_cdl: '', // ⚠️ Cambiado de clasecdl
    tipo_licencia: '', // ⚠️ Cambiado de tipolicencia
    restricciones: '',
    categoria: '',
    observaciones: '',
    foto: null,
    foto_url: null, // ⚠️ Cambiado de rutafoto a foto_url
};

/**
 * Valores por defecto para el formulario de cambio de contraseña del conductor
 */
export const DEFAULT_DRIVER_PASSWORD_FORM = {
    user_id: null, // ⚠️ Cambiado de userid a user_id
    password: '',
    password_confirmation: '',
};

/**
 * Estado inicial de documentos del conductor
 */
export const DEFAULT_DRIVER_DOCUMENTS = [];

/**
 * Estado inicial de errores del formulario
 */
export const DEFAULT_FORM_ERRORS = {
    user_id: '',
    numero_licencia: '',
    vencimiento_licencia: '',
    estado_licencia: '',
    clase_cdl: '',
    tipo_licencia: '',
    restricciones: '',
    categoria: '',
    observaciones: '',
    foto: '',
};

/**
 * Estado inicial de errores del formulario de contraseña
 */
export const DEFAULT_PASSWORD_FORM_ERRORS = {
    password: '',
    password_confirmation: '',
};

/**
 * Preview de foto (null cuando no hay foto)
 */
export const DEFAULT_PHOTO_PREVIEW = null;
