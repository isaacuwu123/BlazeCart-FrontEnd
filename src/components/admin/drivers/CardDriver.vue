<template>
    <div
        class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
        :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
    >
        <!-- Header -->
        <div class="flex items-start justify-between mb-3 sm:mb-4">
            <div class="flex items-center flex-1 min-w-0 space-x-3">
                <div
                    class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12"
                >
                    <img
                        v-if="driver.rutafoto"
                        :src="driver.rutafoto"
                        class="object-cover w-10 h-10 rounded-full sm:w-12 sm:h-12"
                        alt="Driver Photo"
                    />
                    <UserIcon
                        v-else
                        class="w-5 h-5 text-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500"
                    />
                </div>
                <div class="flex-1 min-w-0">
                    <h3
                        class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        {{ driver.user?.generaldata?.nombre || 'NA' }}
                        {{ driver.user?.generaldata?.apellido || '' }}
                    </h3>
                    <p
                        class="text-xs truncate transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                    >
                        ID: {{ driver.user?.generaldata?.documento_identidad || 'NA' }}
                    </p>
                </div>
            </div>
            <span
                :class="getStatusClass(driver.estado)"
                class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
            >
                <CheckCircle2Icon v-if="driver.estado === 1" class="w-3 h-3 mr-1" />
                <XCircleIcon v-else class="w-3 h-3 mr-1" />
                {{ getStatusText(driver.estado) }}
            </span>
        </div>

        <!-- Details -->
        <div class="mb-4 space-y-2 sm:space-y-3">
            <!-- Email -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <MailIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">{{ driver.user?.email || 'NA' }}</span>
            </div>

            <!-- Phone -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <PhoneIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">{{ driver.user?.generaldata?.celular || 'NA' }}</span>
            </div>

            <!-- Location -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <MapPinIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">
                    {{ driver.user?.generaldata?.ciudad || 'NA' }},
                    {{ driver.user?.generaldata?.departamento || 'NA' }}
                </span>
            </div>

            <!-- License -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <CreditCardIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">Licencia: {{ driver.numerolicencia || 'NA' }}</span>
            </div>

            <!-- License Expiration -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">Vence: {{ formatDate(driver.vencimientolicencia) }}</span>
            </div>

            <!-- License Status -->
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <ShieldIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">Estado Licencia: {{ driver.estadolicencia || 'NA' }}</span>
            </div>
        </div>

        <!-- Actions -->
        <div
            class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
            :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
        >
            <!-- WhatsApp -->
            <button
                @click="$emit('send-whatsapp', driver)"
                class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Enviar por WhatsApp"
            >
                <MessageSquareIcon class="w-4 h-4" />
            </button>

            <!-- Change Password -->
            <button
                @click="$emit('change-password', driver)"
                class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Cambiar Contraseña"
            >
                <LockIcon class="w-4 h-4" />
            </button>

            <!-- Edit -->
            <button
                @click="$emit('edit', driver)"
                class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Editar"
            >
                <EditIcon class="w-4 h-4" />
            </button>

            <!-- Activate/Deactivate -->
            <button
                v-if="driver.estado === 0"
                @click="$emit('activate', driver)"
                class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Activar conductor"
            >
                <PowerIcon class="w-4 h-4" />
            </button>
            <button
                v-else
                @click="$emit('deactivate', driver)"
                class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Desactivar conductor"
            >
                <PowerIcon class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>

<script setup>
import {
    CalendarIcon,
    CheckCircle2Icon,
    CreditCardIcon,
    EditIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    PowerIcon,
    Shield as ShieldIcon,
    UserIcon,
    XCircleIcon,
} from 'lucide-vue-next';

defineProps({
    driver: {
        type: Object,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['send-whatsapp', 'change-password', 'edit', 'activate', 'deactivate', 'delete']);

// Utility functions
const formatDate = date => {
    if (!date) return 'NA';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const getStatusClass = status => {
    return status === 1
        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
};

const getStatusText = status => {
    return status === 1 ? 'Activo' : 'Inactivo';
};
</script>
