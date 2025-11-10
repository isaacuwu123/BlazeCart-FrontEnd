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
        <UserHeader @create-user="openUserModal()" />

        <!-- Filtros (búsqueda, estado, rol) -->
        <UserFilters
            v-model:search="searchQuery"
            v-model:user-type="selectedUserType"
            v-model:role="selectedRole"
            :roles="roles"
        />

        <!-- Desktop Table (visible en lg) -->
        <UserTable
            :users="users"
            :is-dark-mode="isDarkMode"
            @view-info="openCompleteInfoModal"
            @send-whatsapp="sendByWhatsApp"
            @change-password="openPasswordModal"
            @edit="openUserModal"
            @delete="confirmDelete"
        />

        <!-- Mobile Cards (visible en sm, lg:hidden) -->
        <div class="space-y-3 sm:space-y-4 lg:hidden">
            <UserCard
                v-for="user in users"
                :key="user.id"
                :user="user"
                :is-dark-mode="isDarkMode"
                @view-info="openCompleteInfoModal"
                @send-whatsapp="sendByWhatsApp"
                @change-password="openPasswordModal"
                @edit="openUserModal"
                @delete="confirmDelete"
            />
        </div>

        <!-- Empty State (cuando no hay usuarios) -->
        <div v-if="users.length === 0" class="py-8 text-center sm:py-12">
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
                    No se encontraron usuarios
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
        <Pagination
            v-if="pagination.total_pages > 1"
            :pagination="pagination"
            :is-dark-mode="isDarkMode"
            @change-page="changePage"
        />

        <!-- Modal de Crear/Editar Usuario -->
        <UserModal
            v-if="isUserModalOpen"
            :is-open="isUserModalOpen"
            :form-data="formData"
            :roles="roles"
            :is-loading="isLoading"
            :is-edit-mode="!!posicion"
            :is-dark-mode="isDarkMode"
            @close="closeUserModal"
            @save="handleSaveUser"
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

        <!-- Modal de Información Completa -->
        <CompleteInfoModal
            v-if="isCompleteInfoModalOpen"
            :is-open="isCompleteInfoModalOpen"
            :user-data="completeUserData"
            :is-dark-mode="isDarkMode"
            @close="closeCompleteInfoModal"
        />
    </div>
</template>
<script setup>
import CompleteInfoModal from '@/components/admin/users/CompleteInfoModal.vue';
import Pagination from '@/components/admin/users/Pagination.vue';
import PasswordModal from '@/components/admin/users/PasswordModal.vue';
import UserCard from '@/components/admin/users/UserCard.vue';
import UserFilters from '@/components/admin/users/UserFilters.vue';
import UserHeader from '@/components/admin/users/UserHeader.vue';
import UserModal from '@/components/admin/users/UserModal.vue';
import UserTable from '@/components/admin/users/UserTable.vue';
import { useUserFilters } from '@/composables/admin/users/useUserFilters';
import { useUsers } from '@/composables/admin/users/useUsers';
import { useWhatsApp } from '@/composables/admin/users/useWhatsApp';
import { isDarkMode } from '@/composables/useDarkMode';
import { UsersIcon } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';

// ==================== COMPOSABLES ====================

/**
 * Composable de gestión de usuarios (CRUD)
 */
const {
    users,
    roles,
    pagination,
    formData,
    passwordFormData,
    completeUserData,
    isUserModalOpen,
    isPasswordModalOpen,
    isCompleteInfoModalOpen,
    isLoading,
    posicion,
    listUsers,
    listRoles,
    openUserModal,
    closeUserModal,
    openPasswordModal,
    closePasswordModal,
    openCompleteInfoModal,
    closeCompleteInfoModal,
    handleSaveUser,
    handleUpdatePassword,
    confirmDelete,
    changePage,
} = useUsers();

/**
 * Composable de gestión de filtros
 * ✅ IMPORTANTE: Extraer getFilters
 */
const {
    searchQuery,
    selectedUserType,
    selectedRole,
    getFilters, // ← Función que construye los filtros
} = useUserFilters();

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
 * 5. Llama listUsers(1, filtros) con la nueva página y filtros
 * 6. API recibe params y filtra la lista
 */
watch(
    [searchQuery, selectedUserType, selectedRole],
    () => {
        // ✅ Obtener filtros actuales (solo con valores)
        const filters = getFilters();

        // ✅ Debug: Verificar qué filtros se envían
        console.log('Filtros detectados:', filters);

        // ✅ Recargar lista en página 1 con los nuevos filtros
        listUsers(1, filters);
    },
    {
        // Opciones del watch
        deep: true, // Monitorear cambios profundos (util para objetos)
        immediate: false, // No ejecutar inmediatamente al montar
    }
);

// ==================== LIFECYCLE ====================

/**
 * Se ejecuta cuando el componente se monta
 * - Carga inicial de usuarios (sin filtros)
 * - Carga de roles para los dropdowns
 */
onMounted(() => {
    // Carga inicial sin filtros (todos los usuarios)
    listUsers();

    // Cargar roles del sistema
    listRoles();
});
</script>
