// src/constants/userFormDefaults.js

/**
 * Valores por defecto para el formulario de usuario
 *
 * ⚠️ IMPORTANTE: Al asignar esto a formData.value, SIEMPRE usar:
 * - structuredClone(DEFAULT_FORM_DATA)
 * - JSON.parse(JSON.stringify(DEFAULT_FORM_DATA))
 *
 * NUNCA usar spread operator ({ ...DEFAULT_FORM_DATA }) porque solo
 * copia el primer nivel y mantiene referencias en general_data y roles
 */
export const DEFAULT_FORM_DATA = {
    id: null,
    email: '',
    password: '',
    password_confirmation: '',
    estado: 1,
    roles: [],
    general_data: {
        nombre: '',
        apellido: '',
        documento_identidad: '',
        celular: '',
        nacimiento: '', // ✅ NUEVO
        genero: '', // ✅ NUEVO
        direccion: '',
        ciudad: '',
        departamento: '',
        codigo_postal: '', // ✅ NUEVO
        contacto_emergencia_nombre: '', // ✅ NUEVO
        contacto_emergencia_telefono: '', // ✅ NUEVO
        notas: '', // ✅ NUEVO
    },
};

/**
 * Valores por defecto para el formulario de cambio de contraseña
 */
export const DEFAULT_PASSWORD_FORM = {
    userId: null,
    password: '',
    password_confirmation: '',
};
