<template>
    <div
        class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
        :class="
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        "
    >
        <div
            class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between"
        >
            <div class="flex items-center space-x-2 sm:space-x-4">
                <div
                    class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 sm:p-3"
                >
                    <UsersIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                </div>
                <div class="flex-1 min-w-0">
                    <h1
                        class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        Gestión de Conductores
                    </h1>
                    <p
                        class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Administra los conductores del sistema
                    </p>
                </div>
            </div>
            <button
                @click="$emit('create-driver')"
                class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                <UserPlusIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                <span>Nuevo Conductor</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { isDarkMode } from '@/composables/useDarkMode';
import { UserPlusIcon, UsersIcon } from 'lucide-vue-next';

defineEmits(['create-driver']);
</script>
