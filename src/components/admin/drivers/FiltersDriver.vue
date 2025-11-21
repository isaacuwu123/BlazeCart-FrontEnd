<template>
    <div
        class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
        :class="
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        "
    >
        <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
            <!-- Búsqueda -->
            <div class="relative flex-1">
                <SearchIcon
                    class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                />
                <input
                    :value="search"
                    @input="$emit('update:search', $event.target.value)"
                    type="text"
                    placeholder="Buscar conductores..."
                    class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    "
                />
            </div>

            <!-- Estado del Conductor -->
            <select
                :value="driverStatus"
                @change="$emit('update:driver-status', $event.target.value)"
                class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                :class="
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                "
            >
                <option value="">Todos los estados</option>
                <option value="activo">Activos</option>
                <option value="inactivo">Inactivos</option>
            </select>

            <!-- Estado de Licencia -->
            <select
                :value="licenseStatus"
                @change="$emit('update:license-status', $event.target.value)"
                class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                :class="
                    isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                "
            >
                <option value="">Todos los estados de licencia</option>
                <option value="vigente">Vigente</option>
                <option value="suspendida">Suspendida</option>
                <option value="vencida">Vencida</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { isDarkMode } from '@/composables/useDarkMode';
import { SearchIcon } from 'lucide-vue-next';

defineProps({
    search: {
        type: String,
        default: '',
    },
    driverStatus: {
        type: String,
        default: '',
    },
    licenseStatus: {
        type: String,
        default: '',
    },
});

defineEmits(['update:search', 'update:driver-status', 'update:license-status']);
</script>
