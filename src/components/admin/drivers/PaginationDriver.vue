<template>
    <div
        class="flex items-center justify-between px-4 py-3 mt-4 transition-colors duration-200 border shadow-lg sm:px-6 rounded-xl sm:mt-6"
        :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
    >
        <!-- Mobile pagination -->
        <div class="flex justify-between flex-1 sm:hidden">
            <button
                @click="$emit('change-page', pagination.current_page - 1)"
                :disabled="pagination.current_page === 1"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-black transition-all duration-200 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <button
                @click="$emit('change-page', pagination.current_page + 1)"
                :disabled="pagination.current_page === pagination.total_pages"
                class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-black transition-all duration-200 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>

        <!-- Desktop pagination -->
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p
                    class="text-sm transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Mostrando
                    <span class="font-medium">{{
                        (pagination.current_page - 1) * pagination.per_page + 1
                    }}</span>
                    a
                    <span class="font-medium">{{
                        Math.min(pagination.current_page * pagination.per_page, pagination.total)
                    }}</span>
                    de
                    <span class="font-medium">{{ pagination.total }}</span>
                    resultados
                </p>
            </div>
            <div>
                <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        @click="$emit('change-page', pagination.current_page - 1)"
                        :disabled="pagination.current_page === 1"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-black transition-all duration-200 rounded-l-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <span
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-white text-gray-700 border-t border-b border-gray-300'
                        "
                    >
                        Página {{ pagination.current_page }} de {{ pagination.total_pages }}
                    </span>
                    <button
                        @click="$emit('change-page', pagination.current_page + 1)"
                        :disabled="pagination.current_page === pagination.total_pages"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-black transition-all duration-200 rounded-r-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
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
</script>
