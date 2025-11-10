<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="$emit('close')"
    >
        <div
            class="w-full max-w-4xl flex flex-col transition-colors duration-200 border shadow-2xl rounded-xl max-h-[90vh]"
            :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            @click.stop
        >
            <!-- Header del Modal -->
            <div
                class="flex items-center justify-between flex-shrink-0 p-4 border-b sm:p-6"
                :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
            >
                <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
                        <UserIcon class="w-6 h-6 text-white" />
                    </div>
                    <h3
                        class="text-lg font-semibold transition-colors duration-200 sm:text-xl"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        {{ isEditMode ? 'Editar Usuario' : 'Nuevo Usuario' }}
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

            <!-- Body del Modal - Scrollable -->
            <div
                class="flex-1 p-4 overflow-y-auto sm:p-6"
                :class="isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'"
            >
                <form @submit.prevent="$emit('save')" id="user-form" class="space-y-6">
                    <!-- ==================== INFORMACIÓN DE CUENTA ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <ShieldCheckIcon class="w-5 h-5 text-yellow-500" />
                            Información de Cuenta
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Email *
                                </label>
                                <input
                                    v-model="formData.email"
                                    type="email"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="usuario@ejemplo.com"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado *
                                </label>
                                <select
                                    v-model="formData.estado"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option :value="1">Activo</option>
                                    <option :value="0">Inactivo</option>
                                </select>
                            </div>

                            <div v-if="!isEditMode">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Contraseña *
                                </label>
                                <input
                                    v-model="formData.password"
                                    type="password"
                                    :required="!isEditMode"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Mínimo 8 caracteres"
                                />
                            </div>

                            <div v-if="!isEditMode">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Confirmar Contraseña *
                                </label>
                                <input
                                    v-model="formData.password_confirmation"
                                    type="password"
                                    :required="!isEditMode"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Repite la contraseña"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- ==================== ROLES ==================== -->
                    <div>
                        <label
                            class="flex items-center gap-2 mb-3 text-sm font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <UsersIcon class="w-5 h-5 text-yellow-500" />
                            Roles *
                        </label>
                        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <label
                                v-for="role in roles"
                                :key="role.id"
                                class="flex items-center p-3 space-x-2 transition-all duration-200 border rounded-lg cursor-pointer"
                                :class="
                                    formData.roles.includes(role.name)
                                        ? isDarkMode
                                            ? 'bg-yellow-500/20 border-yellow-500'
                                            : 'bg-yellow-50 border-yellow-400'
                                        : isDarkMode
                                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                "
                            >
                                <input
                                    type="checkbox"
                                    :value="role.name"
                                    v-model="formData.roles"
                                    class="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400"
                                />
                                <span
                                    class="text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ role.name }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <!-- ==================== INFORMACIÓN PERSONAL ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <UserCircleIcon class="w-5 h-5 text-yellow-500" />
                            Información Personal
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Nombre *
                                </label>
                                <input
                                    v-model="formData.general_data.nombre"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ingresa el nombre"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Apellido *
                                </label>
                                <input
                                    v-model="formData.general_data.apellido"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ingresa el apellido"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Documento de Identidad *
                                </label>
                                <input
                                    v-model="formData.general_data.documento_identidad"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: 12345678"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Fecha de Nacimiento *
                                </label>
                                <input
                                    v-model="formData.general_data.nacimiento"
                                    type="date"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
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
                                    Género *
                                </label>
                                <select
                                    v-model="formData.general_data.genero"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Selecciona género</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Celular *
                                </label>
                                <input
                                    v-model="formData.general_data.celular"
                                    type="tel"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="+51 999 888 777"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- ==================== INFORMACIÓN DE UBICACIÓN ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <MapPinIcon class="w-5 h-5 text-yellow-500" />
                            Información de Ubicación
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div class="sm:col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Dirección *
                                </label>
                                <input
                                    v-model="formData.general_data.direccion"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: Av. Logística 123"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Ciudad *
                                </label>
                                <input
                                    v-model="formData.general_data.ciudad"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: Lima"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Departamento *
                                </label>
                                <input
                                    v-model="formData.general_data.departamento"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: Lima Metropolitana"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Código Postal
                                </label>
                                <input
                                    v-model="formData.general_data.codigo_postal"
                                    type="text"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: 15001"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- ==================== CONTACTO DE EMERGENCIA ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <PhoneIcon class="w-5 h-5 text-yellow-500" />
                            Contacto de Emergencia
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Nombre del Contacto
                                </label>
                                <input
                                    v-model="formData.general_data.contacto_emergencia_nombre"
                                    type="text"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ej: María García"
                                />
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Teléfono del Contacto
                                </label>
                                <input
                                    v-model="formData.general_data.contacto_emergencia_telefono"
                                    type="tel"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="+51 980 123 456"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- ==================== NOTAS ADICIONALES ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <FileTextIcon class="w-5 h-5 text-yellow-500" />
                            Notas Adicionales
                        </h4>
                        <div>
                            <label
                                class="block mb-2 text-sm font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                            >
                                Notas
                            </label>
                            <textarea
                                v-model="formData.general_data.notas"
                                rows="4"
                                class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                "
                                placeholder="Información adicional sobre el usuario..."
                            ></textarea>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Footer Sticky con Botones -->
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
                    form="user-form"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-bold text-black transition-all duration-200 transform rounded-lg shadow-lg sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl hover:scale-105"
                >
                    <CheckIcon v-if="!isLoading" class="w-5 h-5" />
                    <Loader2Icon v-else class="w-5 h-5 animate-spin" />
                    <span v-if="isLoading">Guardando...</span>
                    <span v-else>{{ isEditMode ? 'Actualizar Usuario' : 'Guardar Usuario' }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    CheckIcon,
    FileText as FileTextIcon,
    Loader2 as Loader2Icon,
    MapPin as MapPinIcon,
    Phone as PhoneIcon,
    ShieldCheck as ShieldCheckIcon,
    UserCircle as UserCircleIcon,
    UserIcon,
    Users as UsersIcon,
    XIcon,
} from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    formData: Object,
    roles: Array,
    isLoading: Boolean,
    isEditMode: Boolean,
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

<style scoped>
/* Estilos personalizados para scrollbar */
.scrollbar-light::-webkit-scrollbar {
    width: 8px;
}

.scrollbar-light::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.scrollbar-light::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 10px;
}

.scrollbar-light::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
}

.scrollbar-dark::-webkit-scrollbar {
    width: 8px;
}

.scrollbar-dark::-webkit-scrollbar-track {
    background: #2d3748;
    border-radius: 10px;
}

.scrollbar-dark::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 10px;
}

.scrollbar-dark::-webkit-scrollbar-thumb:hover {
    background: #718096;
}
</style>
