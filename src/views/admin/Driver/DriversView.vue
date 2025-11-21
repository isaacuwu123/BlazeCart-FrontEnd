<template>
    <div
        class="w-full min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50'
        "
    >
        <!-- Header -->
        <HeaderDriver @create-driver="openDriverModal()" />

        <!-- Filtros (búsqueda, estado conductor, estado licencia) -->
        <FiltersDriver
            v-model:search="searchQuery"
            v-model:driver-status="selectedDriverStatus"
            v-model:license-status="selectedLicenseStatus"
        />

        <!-- Desktop Table (visible en lg) -->
        <TableDriver
            :drivers="drivers"
            :is-dark-mode="isDarkMode"
            @send-whatsapp="sendByWhatsApp"
            @change-password="openPasswordModal"
            @edit="openDriverModal"
            @activate="handleActivateDriver"
            @deactivate="handleDeactivateDriver"
            @delete="confirmDelete"
        />

        <!-- Mobile Cards (visible en sm, lg:hidden) -->
        <div class="space-y-3 sm:space-y-4 lg:hidden">
            <CardDriver
                v-for="driver in drivers"
                :key="driver.id"
                :driver="driver"
                :is-dark-mode="isDarkMode"
                @send-whatsapp="sendByWhatsApp"
                @change-password="openPasswordModal"
                @edit="openDriverModal"
                @activate="handleActivateDriver"
                @deactivate="handleDeactivateDriver"
                @delete="confirmDelete"
            />
        </div>

        <!-- Empty State (cuando no hay conductores) -->
        <div v-if="drivers.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <UsersIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron conductores
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>

        <!-- Paginación -->
        <PaginationDriver
            v-if="pagination.total_pages > 1"
            :pagination="pagination"
            :is-dark-mode="isDarkMode"
            @change-page="changePage"
        />

        <!-- Modal de Crear/Editar Conductor -->
        <ModalDriver
            v-if="isDriverModalOpen"
            :is-open="isDriverModalOpen"
            :form-data="formData"
            :users="users"
            :driver-documents="driverDocuments"
            :photo-preview="photoPreview"
            :is-loading="isLoading"
            :is-edit-mode="!!posicion"
            :is-dark-mode="isDarkMode"
            @close="closeDriverModal"
            @save="handleSaveDriver"
            @photo-upload="handlePhotoUpload"
        />

        <!-- Modal de Cambiar Contraseña -->
        <PasswordModal
            v-if="isPasswordModalOpen"
            :is-open="isPasswordModalOpen"
            :form-data="passwordFormData"
            :is-loading="isLoading"
            :is-dark-mode="isDarkMode"
            @close="closePasswordModal"
            @save="handleUpdatePassword"
        />
    </div>
</template>

<script setup>
import CardDriver from '@/components/admin/drivers/CardDriver.vue';
import FiltersDriver from '@/components/admin/drivers/FiltersDriver.vue';
import HeaderDriver from '@/components/admin/drivers/HeaderDriver.vue';
import ModalDriver from '@/components/admin/drivers/ModalDriver.vue';
import PaginationDriver from '@/components/admin/drivers/PaginationDriver.vue';
import PasswordModal from '@/components/admin/drivers/PasswordModal.vue';
import TableDriver from '@/components/admin/drivers/TableDriver.vue';
import { useDriverFilters } from '@/composables/admin/drivers/useDriverFilters';
import { useDrivers } from '@/composables/admin/drivers/useDrivers';
import { useWhatsApp } from '@/composables/admin/users/useWhatsApp';
import { isDarkMode } from '@/composables/useDarkMode';
import { UsersIcon } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';

// ==================== COMPOSABLES ====================

/**
 * Composable de gestión de conductores (CRUD)
 */
const {
    drivers,
    users,
    pagination,
    formData,
    passwordFormData,
    driverDocuments,
    photoPreview, // ← IMPORTANTE: Agregado
    isDriverModalOpen,
    isPasswordModalOpen,
    isLoading,
    posicion,
    listDrivers,
    listUsers,
    openDriverModal,
    closeDriverModal,
    openPasswordModal,
    closePasswordModal,
    handlePhotoUpload,
    handleSaveDriver,
    handleUpdatePassword,
    handleActivateDriver,
    handleDeactivateDriver,
    confirmDelete,
    changePage,
} = useDrivers();

/**
 * Composable de gestión de filtros
 * ✅ IMPORTANTE: Extraer getFilters
 */
const {
    searchQuery,
    selectedDriverStatus,
    selectedLicenseStatus,
    getFilters, // ← Función que construye los filtros
} = useDriverFilters();

/**
 * Composable para enviar mensajes por WhatsApp
 */
const { sendByWhatsApp } = useWhatsApp();

// ==================== WATCHERS ====================

/**
 * ✅ SOLUCIÓN: Monitorea TODAS las propiedades reactivas
 * Cuando cualquier filtro cambia, recalcula getFilters() y recarga la lista
 *
 * Flujo:
 * 1. Usuario escribe en searchQuery
 * 2. Vue reactivamente actualiza searchQuery.value
 * 3. Watch detecta el cambio
 * 4. Ejecuta getFilters() → retorna { search: 'juan' }
 * 5. Llama listDrivers(1, filtros) con la nueva página y filtros
 * 6. API recibe params y filtra la lista
 */
watch(
    [searchQuery, selectedDriverStatus, selectedLicenseStatus],
    () => {
        // ✅ Obtener filtros actuales (solo con valores)
        const filters = getFilters();

        // ✅ Debug: Verificar qué filtros se envían
        console.log('Filtros de conductores detectados:', filters);

        // ✅ Recargar lista en página 1 con los nuevos filtros
        listDrivers(1, filters);
    },
    {
        // Opciones del watch
        deep: true, // Monitorear cambios profundos (útil para objetos)
        immediate: false, // No ejecutar inmediatamente al montar
    }
);

// ==================== LIFECYCLE ====================

/**
 * Se ejecuta cuando el componente se monta
 * - Carga inicial de conductores (sin filtros)
 * - Carga de usuarios para los dropdowns
 */
onMounted(() => {
    // Carga inicial sin filtros (todos los conductores)
    listDrivers();

    // Cargar usuarios del sistema
    listUsers();
});
</script>
