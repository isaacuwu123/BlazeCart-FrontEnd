// src/composables/useUserFilters.js

import { ref } from 'vue';

/**
 * Composable para gestionar filtros de búsqueda de usuarios
 *
 * Estado reactivo:
 * - searchQuery: término de búsqueda
 * - selectedUserType: estado del usuario (activo/inactivo)
 * - selectedRole: rol del usuario
 *
 * @returns {Object} Estado reactivo y funciones de filtros
 */
export function useUserFilters() {
    /**
     * Término de búsqueda (nombre, email, documento)
     * ✅ IMPORTANTE: Usar ref() para que sea reactivo
     * @type {Ref<String>}
     */
    const searchQuery = ref('');

    /**
     * Filtro por estado del usuario
     * Valores: '' (todos), '1' (activos), '0' (inactivos)
     * ✅ IMPORTANTE: String vacío para "todos" (coherente con opciones select)
     * @type {Ref<String>}
     */
    const selectedUserType = ref('');

    /**
     * Filtro por rol del usuario
     * Valores: '' (todos), 'admin', 'user', etc.
     * @type {Ref<String>}
     */
    const selectedRole = ref('');

    /**
     * Construye el objeto de filtros para enviar a la API
     * Solo incluye filtros con valores no vacíos
     *
     * Ejemplo:
     * - Input: searchQuery='juan', selectedUserType='1', selectedRole=''
     * - Output: { search: 'juan', estado: '1' }
     *
     * ✅ IMPORTANTE: Las claves deben coincidir con lo que espera el backend
     * (search, estado, rol)
     *
     * @returns {Object} Objeto con filtros activos
     */
    const getFilters = () => {
        const filters = {};

        // ✅ Solo agregar search si tiene valor
        if (searchQuery.value && searchQuery.value.trim() !== '') {
            filters.search = searchQuery.value.trim();
        }

        // ✅ Solo agregar estado si está seleccionado (no es vacío)
        if (selectedUserType.value !== '') {
            filters.estado = selectedUserType.value;
        }

        // ✅ Solo agregar rol si tiene valor
        if (selectedRole.value && selectedRole.value.trim() !== '') {
            filters.rol = selectedRole.value.trim();
        }

        // Debug: mostrar qué se construyó
        console.log('[useUserFilters] getFilters() retorna:', filters);

        return filters;
    };

    /**
     * Resetea todos los filtros a su estado inicial
     * Se ejecuta cuando el usuario hace clic en "Limpiar filtros"
     *
     * @returns {void}
     */
    const resetFilters = () => {
        searchQuery.value = '';
        selectedUserType.value = '';
        selectedRole.value = '';
        console.log('[useUserFilters] Filtros limpiados');
    };

    // Retornar estado y funciones
    return {
        // Estado reactivo (se pasan a los inputs)
        searchQuery,
        selectedUserType,
        selectedRole,

        // Funciones
        getFilters,
        resetFilters,
    };
}
