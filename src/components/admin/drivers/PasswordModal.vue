<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="$emit('close')"
    >
        <div
            class="flex flex-col w-full max-w-md transition-colors duration-200 border shadow-2xl rounded-xl"
            :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            @click.stop
        >
            <!-- Header del Modal -->
            <div
                class="flex items-center justify-between flex-shrink-0 p-4 border-b sm:p-6"
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

            <!-- Body del Modal -->
            <div class="p-4 sm:p-6">
                <form @submit.prevent="$emit('save')" id="password-form" class="space-y-4">
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
                            class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            "
                            placeholder="Mínimo 8 caracteres"
                        />
                    </div>

                    <div>
                        <label
                            class="block mb-2 text-sm font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            Confirmar Nueva Contraseña *
                        </label>
                        <input
                            v-model="formData.password_confirmation"
                            type="password"
                            required
                            class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            "
                            placeholder="Repite la contraseña"
                        />
                    </div>
                </form>
            </div>

            <!-- Footer con Botones -->
            <div
                class="flex flex-col-reverse flex-shrink-0 gap-3 p-4 border-t sm:flex-row sm:justify-end sm:p-6"
                :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'"
            >
                <button
                    type="button"
                    @click="$emit('close')"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-semibold transition-all duration-200 border rounded-lg sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                    "
                >
                    <XIcon class="w-5 h-5" />
                    <span>Cancelar</span>
                </button>
                <button
                    type="submit"
                    form="password-form"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-bold text-white transition-all duration-200 transform rounded-lg shadow-lg sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 hover:shadow-xl hover:scale-105"
                >
                    <CheckIcon v-if="!isLoading" class="w-5 h-5" />
                    <Loader2Icon v-else class="w-5 h-5 animate-spin" />
                    <span v-if="isLoading">Guardando...</span>
                    <span v-else>Actualizar Contraseña</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CheckIcon, Loader2 as Loader2Icon, LockIcon, XIcon } from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    formData: Object,
    isLoading: Boolean,
    isDarkMode: Boolean,
});

defineEmits(['close', 'save']);

// Prevenir scroll del body cuando el modal está abierto
watch(
    () => props.isOpen,
    newValue => {
        if (newValue) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
);
</script>
