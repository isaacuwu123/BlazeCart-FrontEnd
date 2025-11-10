// src/utils/formatters.js

/**
 * Formatea una fecha ISO a formato legible en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada con hora
 */
export const formatDate = dateString => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return 'Fecha inválida';

    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

/**
 * Formatea solo la fecha sin hora
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada sin hora
 */
export const formatDateShort = dateString => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Fecha inválida';

    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date);
};

/**
 * Obtiene el texto del estado del usuario
 * @param {number} estado - Estado del usuario (1 = Activo, 0 = Inactivo)
 * @returns {string} Texto del estado
 */
export const getStatusText = estado => {
    return estado === 1 ? 'Activo' : 'Inactivo';
};

/**
 * Obtiene las clases CSS para el badge de estado
 * @param {number} estado - Estado del usuario (1 = Activo, 0 = Inactivo)
 * @returns {string} Clases CSS de Tailwind
 */
export const getStatusClass = estado => {
    return estado === 1
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

/**
 * Calcula la edad a partir de una fecha de nacimiento
 * @param {string} birthDate - Fecha de nacimiento en formato ISO
 * @returns {number} Edad en años
 */
export const calculateAge = birthDate => {
    if (!birthDate) return 0;

    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

/**
 * Formatea un número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string} Teléfono formateado
 */
export const formatPhone = phone => {
    if (!phone) return 'N/A';
    return phone;
};

/**
 * Formatea un array de roles a string separado por comas
 * @param {Array} roles - Array de objetos de roles
 * @returns {string} Roles separados por comas
 */
export const formatRoles = roles => {
    if (!roles || roles.length === 0) return 'Sin roles';
    return roles.map(role => role.name).join(', ');
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima (default: 50)
 * @returns {string} Texto truncado con "..."
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = text => {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
