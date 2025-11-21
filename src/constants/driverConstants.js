// src/constants/driverConstants.js

/**
 * Constantes para el módulo de conductores
 * Centraliza valores constantes para facilitar el mantenimiento
 */

// ==================== LÍMITES DE ARCHIVOS ====================
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

// ==================== ESTADOS DE LICENCIA ====================
export const LICENSE_STATUSES = {
    VIGENTE: 'vigente',
    SUSPENDIDA: 'suspendida',
    VENCIDA: 'vencida',
};

export const LICENSE_STATUS_OPTIONS = [
    { value: '', label: 'Todos los estados de licencia' },
    { value: LICENSE_STATUSES.VIGENTE, label: 'Vigente' },
    { value: LICENSE_STATUSES.SUSPENDIDA, label: 'Suspendida' },
    { value: LICENSE_STATUSES.VENCIDA, label: 'Vencida' },
];

// ==================== CLASES DE LICENCIA CDL ====================
export const CDL_CLASSES = {
    A: 'A',
    B: 'B',
    C: 'C',
};

export const CDL_CLASS_OPTIONS = [
    { value: '', label: 'Seleccione una opción' },
    { value: CDL_CLASSES.A, label: 'Clase A' },
    { value: CDL_CLASSES.B, label: 'Clase B' },
    { value: CDL_CLASSES.C, label: 'Clase C' },
];

// ==================== TIPOS DE LICENCIA ====================
export const LICENSE_TYPES = {
    PARTICULAR: 'particular',
    PROFESIONAL: 'profesional',
};

export const LICENSE_TYPE_OPTIONS = [
    { value: '', label: 'Seleccione un tipo de licencia' },
    { value: LICENSE_TYPES.PARTICULAR, label: 'Particular' },
    { value: LICENSE_TYPES.PROFESIONAL, label: 'Profesional' },
];

// ==================== CATEGORÍAS DE LICENCIA ====================
export const LICENSE_CATEGORIES = {
    PRIMERA: 'primera',
    SEGUNDA: 'segunda',
    TERCERA: 'tercera',
};

export const LICENSE_CATEGORY_OPTIONS = [
    { value: '', label: 'Seleccione una categoría' },
    { value: LICENSE_CATEGORIES.PRIMERA, label: 'Primera' },
    { value: LICENSE_CATEGORIES.SEGUNDA, label: 'Segunda' },
    { value: LICENSE_CATEGORIES.TERCERA, label: 'Tercera' },
];

// ==================== ESTADOS DEL CONDUCTOR ====================
export const DRIVER_STATUSES = {
    ACTIVE: 1,
    INACTIVE: 0,
};

export const DRIVER_STATUS_OPTIONS = [
    { value: '', label: 'Todos los estados' },
    { value: 'activo', label: 'Activos' },
    { value: 'inactivo', label: 'Inactivos' },
];

// ==================== PAGINACIÓN ====================
export const PAGINATION_DEFAULTS = {
    PER_PAGE: 15,
    CURRENT_PAGE: 1,
};

// ==================== MENSAJES ====================
export const MESSAGES = {
    SUCCESS: {
        CREATE: 'Conductor creado correctamente.',
        UPDATE: 'Conductor actualizado correctamente.',
        DELETE: 'Conductor eliminado correctamente.',
        ACTIVATE: 'Conductor activado correctamente.',
        DEACTIVATE: 'Conductor desactivado correctamente.',
        PASSWORD_UPDATE: 'Contraseña actualizada correctamente.',
    },
    ERROR: {
        LOAD_DRIVERS: 'No se pudo cargar la lista de conductores.',
        LOAD_USERS: 'No se pudo cargar la lista de usuarios.',
        LOAD_DRIVER: 'No se pudo cargar la información del conductor.',
        SAVE: 'No se pudo guardar el conductor.',
        DELETE: 'No se pudo eliminar el conductor.',
        ACTIVATE: 'No se pudo activar el conductor.',
        DEACTIVATE: 'No se pudo desactivar el conductor.',
        PASSWORD_UPDATE: 'No se pudo actualizar la contraseña.',
        VALIDATION: 'Por favor, corrige los errores en el formulario.',
        FORM_DATA: 'Error al preparar los datos del formulario.',
        NO_PHONE: 'El conductor no tiene un número de teléfono registrado.',
        FILE_SIZE: 'La imagen no debe superar los 2 MB.',
        FILE_TYPE: 'Formato de imagen no válido. Use JPEG, PNG o GIF.',
    },
    CONFIRM: {
        DELETE: driverName => `¿Estás seguro de que deseas eliminar al conductor ${driverName}?`,
    },
};

// ==================== VALIDACIONES ====================
export const VALIDATION_RULES = {
    PASSWORD_MIN_LENGTH: 8,
    REQUIRED_FIELDS: [
        'user_id', // ⚠️ Cambiado
        'numero_licencia', // ⚠️ Cambiado
        'vencimiento_licencia', // ⚠️ Cambiado
        'estado_licencia', // ⚠️ Cambiado
        'clase_cdl', // ⚠️ Cambiado
        'tipo_licencia', // ⚠️ Cambiado
        'categoria',
    ],
};
