import { ref } from 'vue';

/**
 * Composable para gestionar los filtros de búsqueda de conductores
 * Separación de responsabilidades: lógica de filtros
 */
export function useDriverFilters() {
    // ==================== STATE ====================
    const searchQuery = ref('');
    const selectedDriverStatus = ref('');
    const selectedLicenseStatus = ref('');

    // ==================== COMPUTED ====================

    /**
     * Construye el objeto de filtros solo con valores válidos
     * Evita enviar parámetros vacíos a la API
     */
    const getFilters = () => {
        const filters = {};

        // ✅ Solo agregar filtros con valores
        if (searchQuery.value) {
            filters.search = searchQuery.value;
        }

        if (selectedDriverStatus.value && selectedDriverStatus.value !== '') {
            filters.estado = selectedDriverStatus.value === 'activo' ? '1' : '0';
        }

        if (selectedLicenseStatus.value && selectedLicenseStatus.value !== '') {
            filters.estadolicencia = selectedLicenseStatus.value;
        }

        return filters;
    };

    // ==================== RETURN ====================
    return {
        // State
        searchQuery,
        selectedDriverStatus,
        selectedLicenseStatus,

        // Computed/Methods
        getFilters,
    };
}
