<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black bg-opacity-50"
        @click.self="$emit('close')"
    >
        <div
            class="w-full max-w-md transition-colors duration-200 border shadow-2xl rounded-xl"
            :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            @click.stop
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-4 border-b sm:p-6"
                :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
            >
                <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600">
                        <LockIcon class="w-6 h-6 text-white" />
                    </div>
                    <h3
                        class="text-lg font-semibold transition-colors duration-200 sm:text-xl"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        Cambiar Contraseña
                    </h3>
                </div>
                <button
                    @click="$emit('close')"
                    class="p-2 transition-all duration-200 rounded-lg"
                    :class="
                        isDarkMode
                            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    "
                >
                    <XIcon class="w-5 h-5" />
                </button>
            </div>

            <!-- Body -->
            <div class="p-4 sm:p-6">
                <form @submit.prevent="$emit('save')" class="space-y-4">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            Nueva Contraseña *
                        </label>
                        <input
                            v-model="formData.password"
                            type="password"
                            required
                            class="w-full px-4 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        />
                    </div>

                    <div>
                        <label
                            class="block mb-2 text-sm font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            Confirmar Contraseña *
                        </label>
                        <input
                            v-model="formData.password_confirmation"
                            type="password"
                            required
                            class="w-full px-4 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        />
                    </div>

                    <!-- Botones -->
                    <div
                        class="flex flex-col-reverse gap-3 pt-4 border-t sm:flex-row sm:justify-end"
                        :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                    >
                        <button
                            type="button"
                            @click="$emit('close')"
                            :disabled="isLoading"
                            class="w-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 border rounded-lg sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            "
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
                        >
                            <span v-if="isLoading">Actualizando...</span>
                            <span v-else>Actualizar Contraseña</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { LockIcon, XIcon } from 'lucide-vue-next';

defineProps({
    isOpen: Boolean,
    formData: Object,
    isLoading: Boolean,
    isDarkMode: Boolean,
});

defineEmits(['close', 'save']);
</script>
