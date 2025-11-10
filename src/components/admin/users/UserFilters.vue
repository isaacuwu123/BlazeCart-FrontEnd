<template>
    <div
        class="p-3 mb-3 transition-colors duration-200 shadow-lg sm:p-4 lg:p-6 sm:mb-4 lg:mb-6 rounded-xl"
        :class="
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        "
    >
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            <!-- Búsqueda -->
            <div class="relative">
                <label
                    class="block mb-2 text-xs font-medium transition-colors duration-200 sm:text-sm"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Buscar usuario
                </label>
                <div class="relative">
                    <SearchIcon
                        class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:w-5 sm:h-5"
                    />
                    <input
                        :value="search"
                        @input="$emit('update:search', $event.target.value)"
                        type="text"
                        placeholder="Nombre, email o documento..."
                        class="w-full py-2 pl-10 pr-4 text-xs transition-colors duration-200 border rounded-lg sm:py-2.5 sm:pl-11 sm:text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
            </div>

            <!-- Filtro por tipo de usuario -->
            <div>
                <label
                    class="block mb-2 text-xs font-medium transition-colors duration-200 sm:text-sm"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Estado del usuario
                </label>
                <select
                    :value="userType"
                    @change="$emit('update:user-type', $event.target.value)"
                    class="w-full py-2 pl-3 pr-10 text-xs transition-colors duration-200 border rounded-lg sm:py-2.5 sm:text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="1">Activos</option>
                    <option value="0">Inactivos</option>
                </select>
            </div>

            <!-- Filtro por rol -->
            <div>
                <label
                    class="block mb-2 text-xs font-medium transition-colors duration-200 sm:text-sm"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Rol
                </label>
                <select
                    :value="role"
                    @change="$emit('update:role', $event.target.value)"
                    class="w-full py-2 pl-3 pr-10 text-xs transition-colors duration-200 border rounded-lg sm:py-2.5 sm:text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los roles</option>
                    <option v-for="r in roles" :key="r.id" :value="r.name">
                        {{ r.name }}
                    </option>
                </select>
            </div>

            <!-- Botón limpiar filtros -->
            <div class="flex items-end">
                <button
                    @click="clearFilters"
                    class="w-full px-4 py-2 text-xs font-semibold text-gray-700 transition-all duration-200 bg-gray-200 rounded-lg sm:py-2.5 sm:text-sm hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 touch-manipulation"
                >
                    <XIcon class="inline w-4 h-4 mr-2" />
                    Limpiar filtros
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isDarkMode } from '@/composables/useDarkMode';
import { SearchIcon, XIcon } from 'lucide-vue-next';

const props = defineProps({
    search: {
        type: String,
        default: '',
    },
    userType: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: '',
    },
    roles: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:search', 'update:user-type', 'update:role']);

/**
 * Limpia todos los filtros (emite valores vacíos)
 */
const clearFilters = () => {
    emit('update:search', '');
    emit('update:user-type', '');
    emit('update:role', '');
};
</script>
