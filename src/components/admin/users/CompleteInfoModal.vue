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
            <!-- Header -->
            <div
                class="flex items-center justify-between flex-shrink-0 p-4 border-b sm:p-6"
                :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
            >
                <div class="flex items-center space-x-3">
                    <div class="p-2 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-600">
                        <InfoIcon class="w-6 h-6 text-white" />
                    </div>
                    <h3
                        class="text-lg font-semibold transition-colors duration-200 sm:text-xl"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        Información Completa del Usuario
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

            <!-- Body - Scrollable -->
            <div
                class="flex-1 p-4 overflow-y-auto sm:p-6"
                :class="isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'"
            >
                <div v-if="userData" class="space-y-6">
                    <!-- ==================== INFORMACIÓN DE CUENTA ==================== -->
                    <div
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700/30 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <ShieldCheckIcon class="w-5 h-5 text-indigo-500" />
                            Información de Cuenta
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Email
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <MailIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.email }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Estado
                                </span>
                                <span class="flex items-center gap-2 mt-1">
                                    <span
                                        class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full"
                                        :class="
                                            userData.estado === 1
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        "
                                    >
                                        <span
                                            class="w-1.5 h-1.5 rounded-full"
                                            :class="
                                                userData.estado === 1
                                                    ? 'bg-green-600'
                                                    : 'bg-red-600'
                                            "
                                        ></span>
                                        {{ getStatusText(userData.estado) }}
                                    </span>
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Fecha de Registro
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <CalendarIcon class="w-4 h-4 text-gray-400" />
                                    {{ formatDate(userData.created_at) }}
                                </span>
                            </div>

                            <div class="sm:col-span-2">
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Roles Asignados
                                </span>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <span
                                        v-for="role in userData.roles"
                                        :key="role.id"
                                        class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800"
                                    >
                                        <UsersIcon class="w-3.5 h-3.5" />
                                        {{ role.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== INFORMACIÓN PERSONAL ==================== -->
                    <div
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700/30 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <UserCircleIcon class="w-5 h-5 text-indigo-500" />
                            Información Personal
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Nombre Completo
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <UserIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.nombre }}
                                    {{ userData.general_data.apellido }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Documento de Identidad
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <CreditCardIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.documento_identidad }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Fecha de Nacimiento
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <CakeIcon class="w-4 h-4 text-gray-400" />
                                    {{ formatDate(userData.general_data.nacimiento) }}
                                    <span
                                        class="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800"
                                        v-if="userData.general_data.nacimiento"
                                    >
                                        {{ calculateAge(userData.general_data.nacimiento) }} años
                                    </span>
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Género
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <span class="capitalize">
                                        {{ userData.general_data.genero || 'No especificado' }}
                                    </span>
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Celular
                                </span>
                                <a
                                    :href="`tel:${userData.general_data.celular}`"
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200 hover:text-indigo-600"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <PhoneIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.celular }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== INFORMACIÓN DE UBICACIÓN ==================== -->
                    <div
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700/30 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <MapPinIcon class="w-5 h-5 text-indigo-500" />
                            Información de Ubicación
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div class="sm:col-span-2">
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Dirección Completa
                                </span>
                                <span
                                    class="flex items-start gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <HomeIcon class="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                                    {{ userData.general_data.direccion }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Ciudad
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <BuildingIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.ciudad }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Departamento
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <MapIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.departamento }}
                                </span>
                            </div>

                            <div v-if="userData.general_data.codigo_postal">
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Código Postal
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <HashIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.codigo_postal }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== CONTACTO DE EMERGENCIA ==================== -->
                    <div
                        v-if="
                            userData.general_data.contacto_emergencia_nombre ||
                            userData.general_data.contacto_emergencia_telefono
                        "
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <AlertCircleIcon class="w-5 h-5 text-red-500" />
                            Contacto de Emergencia
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div v-if="userData.general_data.contacto_emergencia_nombre">
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Nombre del Contacto
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <UserIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.general_data.contacto_emergencia_nombre }}
                                </span>
                            </div>

                            <div v-if="userData.general_data.contacto_emergencia_telefono">
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Teléfono de Contacto
                                </span>
                                <a
                                    :href="`tel:${userData.general_data.contacto_emergencia_telefono}`"
                                    class="flex items-center gap-2 mt-1 text-sm font-medium transition-colors duration-200 hover:text-red-600"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <PhoneCallIcon class="w-4 h-4 text-red-500" />
                                    {{ userData.general_data.contacto_emergencia_telefono }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== NOTAS ADICIONALES ==================== -->
                    <div
                        v-if="userData.general_data.notas"
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700/30 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <FileTextIcon class="w-5 h-5 text-indigo-500" />
                            Notas Adicionales
                        </h4>
                        <div
                            class="p-3 text-sm leading-relaxed rounded-md"
                            :class="
                                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                            "
                        >
                            {{ userData.general_data.notas }}
                        </div>
                    </div>

                    <!-- ==================== INFORMACIÓN DEL SISTEMA ==================== -->
                    <div
                        class="p-4 border rounded-lg"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700/30 border-gray-600'
                                : 'bg-gray-50 border-gray-200'
                        "
                    >
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <DatabaseIcon class="w-5 h-5 text-indigo-500" />
                            Información del Sistema
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    ID de Usuario
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 font-mono text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <HashIcon class="w-4 h-4 text-gray-400" />
                                    {{ userData.id }}
                                </span>
                            </div>

                            <div>
                                <span
                                    class="block text-xs font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Última Actualización
                                </span>
                                <span
                                    class="flex items-center gap-2 mt-1 text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    <ClockIcon class="w-4 h-4 text-gray-400" />
                                    {{ formatDate(userData.updated_at) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-else class="flex flex-col items-center justify-center py-12">
                    <Loader2Icon class="w-8 h-8 mb-3 text-indigo-500 animate-spin" />
                    <p
                        class="text-sm transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                    >
                        Cargando información del usuario...
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div
                class="flex justify-end flex-shrink-0 gap-3 p-4 border-t sm:p-6"
                :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'"
            >
                <button
                    @click="$emit('close')"
                    class="flex items-center gap-2 px-6 py-3 text-base font-semibold transition-all duration-200 border rounded-lg hover:shadow-md"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                    "
                >
                    <XIcon class="w-5 h-5" />
                    <span>Cerrar</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatDate, getStatusText } from '@/utils/formatters';
import {
    AlertCircle as AlertCircleIcon,
    Building as BuildingIcon,
    Cake as CakeIcon,
    Calendar as CalendarIcon,
    Clock as ClockIcon,
    CreditCard as CreditCardIcon,
    Database as DatabaseIcon,
    FileText as FileTextIcon,
    Hash as HashIcon,
    Home as HomeIcon,
    InfoIcon,
    Loader2 as Loader2Icon,
    Mail as MailIcon,
    Map as MapIcon,
    MapPin as MapPinIcon,
    PhoneCall as PhoneCallIcon,
    Phone as PhoneIcon,
    ShieldCheck as ShieldCheckIcon,
    UserCircle as UserCircleIcon,
    User as UserIcon,
    Users as UsersIcon,
    XIcon,
} from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    userData: Object,
    isDarkMode: Boolean,
});

defineEmits(['close']);

// Función para calcular edad
const calculateAge = birthDate => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
};

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
