<template>
    <div class="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900">
        <div class="max-w-4xl p-6 mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
                <p class="mt-2 text-gray-600 dark:text-gray-400">
                    Gestiona tu información personal y configuraciones
                </p>
            </div>

            <!-- Profile Card -->
            <div
                class="overflow-hidden bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700"
            >
                <!-- Header with gradient -->
                <div
                    class="px-6 py-8 bg-gradient-to-r from-blazecart-yellow-400 to-blazecart-yellow-500"
                >
                    <div class="flex items-center space-x-4">
                        <div
                            class="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg dark:bg-gray-800"
                        >
                            <UserIcon class="w-10 h-10 text-blazecart-yellow-600" />
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-black">
                                {{
                                    profileData.general_data
                                        ? `${profileData.general_data.nombre} ${profileData.general_data.apellido}`
                                        : 'Usuario'
                                }}
                            </h2>
                            <p class="text-black/80">
                                {{ profileData.email }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="border-b border-gray-200 dark:border-gray-700">
                    <nav class="flex -mb-px">
                        <button
                            @click="activeTab = 'personal'"
                            :class="[
                                'py-4 px-6 text-center border-b-2 font-medium text-sm',
                                activeTab === 'personal'
                                    ? 'border-blazecart-yellow-400 text-blazecart-yellow-600 dark:text-blazecart-yellow-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                            ]"
                        >
                            Información Personal
                        </button>
                        <button
                            @click="activeTab = 'password'"
                            :class="[
                                'py-4 px-6 text-center border-b-2 font-medium text-sm',
                                activeTab === 'password'
                                    ? 'border-blazecart-yellow-400 text-blazecart-yellow-600 dark:text-blazecart-yellow-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                            ]"
                        >
                            Contraseña
                        </button>
                        <button
                            @click="activeTab = 'preferences'"
                            :class="[
                                'py-4 px-6 text-center border-b-2 font-medium text-sm',
                                activeTab === 'preferences'
                                    ? 'border-blazecart-yellow-400 text-blazecart-yellow-600 dark:text-blazecart-yellow-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                            ]"
                        >
                            Preferencias
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <div class="p-6">
                    <!-- Personal Information Tab -->
                    <div v-if="activeTab === 'personal'" class="space-y-6">
                        <form @submit.prevent="updateProfile">
                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <!-- Personal Information -->
                                <div class="space-y-4">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        Información Personal
                                    </h3>
                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Nombre *
                                            </label>
                                            <input
                                                v-model="formData.general_data.nombre"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Apellido *
                                            </label>
                                            <input
                                                v-model="formData.general_data.apellido"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Documento de Identidad *
                                            </label>
                                            <input
                                                v-model="formData.general_data.documento_identidad"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Fecha de Nacimiento
                                            </label>
                                            <input
                                                v-model="formData.general_data.nacimiento"
                                                type="date"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Género
                                            </label>
                                            <select
                                                v-model="formData.general_data.genero"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            >
                                                <option value="">Seleccionar</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- Contact Information -->
                                <div class="space-y-4">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        Información de Contacto
                                    </h3>
                                    <div class="space-y-3">
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Email *
                                            </label>
                                            <input
                                                v-model="formData.email"
                                                type="email"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Teléfono *
                                            </label>
                                            <input
                                                v-model="formData.general_data.celular"
                                                type="tel"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Dirección *
                                            </label>
                                            <input
                                                v-model="formData.general_data.direccion"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Ciudad *
                                            </label>
                                            <input
                                                v-model="formData.general_data.ciudad"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Departamento *
                                            </label>
                                            <input
                                                v-model="formData.general_data.departamento"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Código Postal
                                            </label>
                                            <input
                                                v-model="formData.general_data.codigo_postal"
                                                type="text"
                                                class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Emergency Contact -->
                            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Contacto de Emergencia
                                </h3>
                                <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            v-model="
                                                formData.general_data.contacto_emergencia_nombre
                                            "
                                            type="text"
                                            class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Teléfono
                                        </label>
                                        <input
                                            v-model="
                                                formData.general_data.contacto_emergencia_telefono
                                            "
                                            type="tel"
                                            class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <!-- Notes -->
                            <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Notas
                                </h3>
                                <div class="mt-4">
                                    <textarea
                                        v-model="formData.general_data.notas"
                                        rows="3"
                                        class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                        placeholder="Notas adicionales..."
                                    ></textarea>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex justify-end mt-8 space-x-3">
                                <button
                                    type="button"
                                    class="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    :disabled="isLoading"
                                    class="px-4 py-2 font-medium text-black transition-colors rounded-lg bg-blazecart-yellow-400 hover:bg-blazecart-yellow-500 disabled:opacity-50"
                                >
                                    <span v-if="isLoading">Guardando...</span>
                                    <span v-else>Guardar Cambios</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Password Tab -->
                    <div v-if="activeTab === 'password'" class="space-y-6">
                        <form @submit.prevent="handleChangePassword">
                            <div
                                class="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <h3
                                    class="mb-4 text-lg font-semibold text-gray-900 dark:text-white"
                                >
                                    Cambiar Contraseña
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label
                                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Contraseña Actual *
                                        </label>
                                        <input
                                            v-model="passwordForm.current_password"
                                            type="password"
                                            class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Nueva Contraseña *
                                        </label>
                                        <input
                                            v-model="passwordForm.password"
                                            type="password"
                                            class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Confirmar Nueva Contraseña *
                                        </label>
                                        <input
                                            v-model="passwordForm.password_confirmation"
                                            type="password"
                                            class="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div class="flex justify-end mt-6 space-x-3">
                                    <button
                                        type="button"
                                        class="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        :disabled="isLoadingPassword"
                                        class="px-4 py-2 font-medium text-black transition-colors rounded-lg bg-blazecart-yellow-400 hover:bg-blazecart-yellow-500 disabled:opacity-50"
                                    >
                                        <span v-if="isLoadingPassword">Actualizando...</span>
                                        <span v-else>Cambiar Contraseña</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Preferences Tab -->
                    <div v-if="activeTab === 'preferences'" class="space-y-6">
                        <div class="space-y-4">
                            <!-- Dark Mode Toggle -->
                            <div
                                class="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                            >
                                <div>
                                    <h4 class="font-medium text-gray-900 dark:text-white">
                                        Modo Oscuro
                                    </h4>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        Cambia entre tema claro y oscuro
                                    </p>
                                </div>
                                <button
                                    @click="toggleDarkMode"
                                    class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-blazecart-yellow-400 focus:ring-offset-2"
                                    :class="isDarkMode ? 'bg-blazecart-yellow-400' : 'bg-gray-200'"
                                >
                                    <span
                                        class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
                                        :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
                                    />
                                </button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex justify-end mt-8 space-x-3">
                            <button
                                type="button"
                                class="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                @click="savePreferences"
                                class="px-4 py-2 font-medium text-black transition-colors rounded-lg bg-blazecart-yellow-400 hover:bg-blazecart-yellow-500"
                            >
                                Guardar Preferencias
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { isDarkMode, toggleDarkMode } from '@/composables/useDarkMode';
import {
    changePassword as changePasswordAPI,
    getProfile,
    updateProfile as updateProfileAPI,
} from '@/services/ProfileService';
import { UserIcon } from 'lucide-vue-next';
import { onMounted, reactive, ref } from 'vue';

const { showSuccess, showError, showValidationErrors } = useAlert();

// State
const activeTab = ref('personal');
const isLoading = ref(false);
const isLoadingPassword = ref(false);
const profileData = ref({});
const formData = reactive({
    email: '',
    general_data: {
        nombre: '',
        apellido: '',
        documento_identidad: '',
        celular: '',
        nacimiento: '',
        genero: '',
        direccion: '',
        ciudad: '',
        departamento: '',
        codigo_postal: '',
        contacto_emergencia_nombre: '',
        contacto_emergencia_telefono: '',
        notas: '',
    },
});
const passwordForm = reactive({
    current_password: '',
    password: '',
    password_confirmation: '',
});
const selectedLanguage = ref('es');
const notificationSettings = reactive({
    email: true,
    push: true,
});

// Methods
const loadProfile = async () => {
    try {
        const { data } = await getProfile();
        profileData.value = data.data;

        // Cargar datos en el formulario
        formData.email = data.data.email;
        if (data.data.general_data) {
            Object.assign(formData.general_data, data.data.general_data);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        showError('Error', 'No se pudo cargar la información del perfil.');
    }
};

const updateProfile = async () => {
    try {
        isLoading.value = true;
        await updateProfileAPI(formData);
        await showSuccess('¡Éxito!', 'Tu perfil ha sido actualizado correctamente.');
    } catch (error) {
        if (error.response?.status === 422) {
            await showValidationErrors(error.response.data.errors);
        } else {
            await showError('Error', 'No se pudo actualizar tu perfil. Inténtalo de nuevo.');
        }
    } finally {
        isLoading.value = false;
    }
};

const handleChangePassword = async () => {
    try {
        isLoadingPassword.value = true;
        await changePasswordAPI(passwordForm);
        await showSuccess('¡Éxito!', 'Tu contraseña ha sido cambiada correctamente.');
        // Reset form
        passwordForm.current_password = '';
        passwordForm.password = '';
        passwordForm.password_confirmation = '';
    } catch (error) {
        if (error.response?.status === 422) {
            await showValidationErrors(error.response.data.errors);
        } else {
            await showError('Error', 'No se pudo cambiar tu contraseña. Inténtalo de nuevo.');
        }
    } finally {
        isLoadingPassword.value = false;
    }
};

const savePreferences = () => {
    // Aquí se guardarían las preferencias (idioma, notificaciones)
    // Por ahora solo mostramos un mensaje de éxito
    showSuccess('¡Éxito!', 'Tus preferencias han sido guardadas correctamente.');
};

// Lifecycle
onMounted(() => {
    loadProfile();
});
</script>
