<template>
    <div
        class="p-3 mt-4 transition-colors duration-200 border shadow-lg sm:p-4 lg:p-6 rounded-xl sm:mt-6"
        :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
    >
        <div class="flex flex-col items-center justify-between space-y-3 sm:flex-row sm:space-y-0">
            <!-- Información de paginación -->
            <div
                class="text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
            >
                Mostrando
                <span class="font-medium">{{ pagination.from }}</span>
                a
                <span class="font-medium">{{ pagination.to }}</span>
                de
                <span class="font-medium">{{ pagination.total }}</span>
                resultados
            </div>

            <!-- Controles de paginación -->
            <div class="flex items-center space-x-2">
                <!-- Botón anterior -->
                <button
                    @click="$emit('change-page', pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="p-2 transition-all duration-200 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation sm:p-2.5"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:bg-gray-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100'
                    "
                >
                    <ChevronLeftIcon class="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <!-- Números de página -->
                <div class="flex space-x-1 sm:space-x-2">
                    <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="$emit('change-page', page)"
                        class="px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 border rounded-lg touch-manipulation"
                        :class="
                            page === pagination.current_page
                                ? isDarkMode
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-500'
                                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-500'
                                : isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        {{ page }}
                    </button>
                </div>

                <!-- Botón siguiente -->
                <button
                    @click="$emit('change-page', pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.total_pages"
                    class="p-2 transition-all duration-200 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation sm:p-2.5"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:bg-gray-800'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100'
                    "
                >
                    <ChevronRightIcon class="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps({
    pagination: {
        type: Object,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['change-page']);

const visiblePages = computed(() => {
    const current = props.pagination.current_page;
    const total = props.pagination.total_pages;
    const delta = 2; // Páginas a mostrar antes/después de la actual
    const pages = [];

    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
        pages.push(i);
    }

    return pages;
});
</script>
