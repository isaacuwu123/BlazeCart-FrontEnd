<template>
    <div
        class="hidden mb-4 overflow-hidden transition-colors duration-200 border shadow-lg lg:block rounded-xl sm:mb-6"
        :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
    >
        <div class="overflow-x-auto">
            <table
                class="min-w-full divide-y"
                :class="isDarkMode ? 'divide-gray-700' : 'divide-gray-200'"
            >
                <!-- ==================== THEAD ==================== -->
                <thead :class="isDarkMode ? 'bg-gray-900' : 'bg-gray-100'">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <UserIcon class="w-4 h-4" />
                                Conductor
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <PhoneIcon class="w-4 h-4" />
                                Contacto
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <CreditCardIcon class="w-4 h-4" />
                                Licencia
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <ShieldIcon class="w-4 h-4" />
                                Estado Licencia
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <ActivityIcon class="w-4 h-4" />
                                Estado
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-center uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center justify-center gap-2">
                                <SettingsIcon class="w-4 h-4" />
                                Acciones
                            </div>
                        </th>
                    </tr>
                </thead>

                <!-- ==================== TBODY ==================== -->
                <tbody
                    class="divide-y"
                    :class="isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'"
                >
                    <!-- Empty State -->
                    <tr v-if="!drivers || drivers.length === 0">
                        <td colspan="6" class="px-6 py-12 text-center">
                            <div class="flex flex-col items-center justify-center">
                                <UsersIcon
                                    class="w-12 h-12 mb-3"
                                    :class="isDarkMode ? 'text-gray-600' : 'text-gray-400'"
                                />
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    No hay conductores registrados
                                </p>
                                <p
                                    class="mt-1 text-xs"
                                    :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
                                >
                                    Crea un nuevo conductor para comenzar
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Driver Rows -->
                    <tr
                        v-for="driver in drivers"
                        :key="driver.id"
                        class="transition-all duration-200 group"
                        :class="
                            isDarkMode
                                ? 'hover:bg-gray-700/50 hover:shadow-lg'
                                : 'hover:bg-yellow-50/50 hover:shadow-lg'
                        "
                    >
                        <!-- ==================== COLUMNA CONDUCTOR ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-3">
                                <div
                                    class="relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 rounded-full shadow-md w-11 h-11 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 group-hover:scale-110"
                                >
                                    <img
                                        v-if="driver.foto_url"
                                        :src="driver.foto_url"
                                        class="object-cover rounded-full w-11 h-11"
                                        alt="Driver Photo"
                                    />
                                    <UserIcon v-else class="w-5 h-5 text-white" />
                                    <!-- Indicador de estado en el avatar -->
                                    <span
                                        class="absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full"
                                        :class="[
                                            driver.estado === 1 ? 'bg-green-500' : 'bg-red-500',
                                            isDarkMode ? 'border-gray-800' : 'border-white',
                                        ]"
                                    ></span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div
                                        class="text-sm font-semibold truncate transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        {{ driver.user?.general_data?.nombre || 'NA' }}
                                        {{ driver.user?.general_data?.apellido || '' }}
                                    </div>
                                    <div
                                        class="flex items-center gap-1.5 mt-0.5 text-xs transition-colors duration-200 truncate"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        <MailIcon class="flex-shrink-0 w-3 h-3" />
                                        {{ driver.user?.email || 'NA' }}
                                    </div>
                                    <div
                                        class="flex items-center gap-1.5 mt-0.5 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
                                    >
                                        <CreditCardIcon class="flex-shrink-0 w-3 h-3" />
                                        ID:
                                        {{ driver.user?.general_data?.documento_identidad || 'NA' }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- ==================== COLUMNA CONTACTO ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <a
                                :href="`tel:${driver.user?.general_data?.celular}`"
                                class="flex items-center gap-2 text-sm transition-all duration-200 group/phone"
                                :class="
                                    isDarkMode
                                        ? 'text-gray-300 hover:text-yellow-400'
                                        : 'text-gray-700 hover:text-yellow-600'
                                "
                            >
                                <div
                                    class="p-1.5 rounded-lg transition-colors duration-200"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 group-hover/phone:bg-yellow-500/20'
                                            : 'bg-gray-100 group-hover/phone:bg-yellow-100'
                                    "
                                >
                                    <PhoneIcon class="w-3.5 h-3.5" />
                                </div>
                                <span class="font-medium">{{
                                    driver.user?.general_data?.celular || 'NA'
                                }}</span>
                            </a>
                        </td>

                        <!-- ==================== COLUMNA LICENCIA ==================== -->
                        <td class="px-6 py-4">
                            <div class="flex items-start gap-2">
                                <div
                                    class="p-1.5 rounded-lg transition-colors duration-200 flex-shrink-0"
                                    :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                >
                                    <CreditCardIcon class="w-3.5 h-3.5 text-orange-500" />
                                </div>
                                <div class="min-w-0">
                                    <div
                                        class="text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ driver.numero_licencia || 'NA' }}
                                    </div>
                                    <div
                                        class="flex items-center gap-1 mt-0.5 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'"
                                    >
                                        <CalendarIcon class="w-3 h-3" />
                                        Vence: {{ formatDate(driver.vencimiento_licencia) }}
                                    </div>
                                    <div
                                        class="text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'"
                                    >
                                        Clase: {{ driver.clase_cdl || 'NA' }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- ==================== COLUMNA ESTADO LICENCIA ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                :class="getLicenseStatusClass(driver.estado_licencia)"
                                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm transition-all duration-200 hover:scale-105"
                            >
                                <ShieldIcon class="w-3 h-3" />
                                {{ driver.estado_licencia || 'NA' }}
                            </span>
                        </td>

                        <!-- ==================== COLUMNA ESTADO ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                :class="getStatusClass(driver.estado)"
                                class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm transition-all duration-200 hover:scale-105"
                            >
                                <span class="relative flex w-2 h-2">
                                    <span
                                        class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                                        :class="driver.estado === 1 ? 'bg-green-500' : 'bg-red-500'"
                                    ></span>
                                    <span
                                        class="relative inline-flex w-2 h-2 rounded-full"
                                        :class="driver.estado === 1 ? 'bg-green-600' : 'bg-red-600'"
                                    ></span>
                                </span>
                                {{ getStatusText(driver.estado) }}
                            </span>
                        </td>

                        <!-- ==================== COLUMNA ACCIONES ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center justify-center gap-2">
                                <!-- WhatsApp -->
                                <button
                                    @click="$emit('send-whatsapp', driver)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Enviar por WhatsApp"
                                >
                                    <MessageSquareIcon class="w-4 h-4" />
                                </button>

                                <!-- Cambiar Contraseña -->
                                <button
                                    @click="$emit('change-password', driver)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-purple-500 rounded-lg hover:bg-purple-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Cambiar Contraseña"
                                >
                                    <LockIcon class="w-4 h-4" />
                                </button>

                                <!-- Editar -->
                                <button
                                    @click="$emit('edit', driver)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Editar conductor"
                                >
                                    <EditIcon class="w-4 h-4" />
                                </button>

                                <!-- Activar/Desactivar -->
                                <button
                                    v-if="driver.estado === 0"
                                    @click="$emit('activate', driver)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Activar conductor"
                                >
                                    <PowerIcon class="w-4 h-4" />
                                </button>
                                <button
                                    v-else
                                    @click="$emit('deactivate', driver)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-red-500 rounded-lg hover:bg-red-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Desactivar conductor"
                                >
                                    <PowerIcon class="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import {
    ActivityIcon,
    CalendarIcon,
    CreditCardIcon,
    EditIcon,
    LockIcon,
    MailIcon,
    MessageSquareIcon,
    PhoneIcon,
    PowerIcon,
    SettingsIcon,
    Shield as ShieldIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-vue-next';

defineProps({
    drivers: {
        type: Array,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['send-whatsapp', 'change-password', 'edit', 'activate', 'deactivate', 'delete']);

// ==================== UTILITY FUNCTIONS ====================

/**
 * Formatea una fecha en formato legible
 * @param {string} date - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
const formatDate = date => {
    if (!date) return 'NA';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Obtiene las clases CSS para el estado del conductor
 * @param {number} status - Estado (1: activo, 0: inactivo)
 * @returns {string} - Clases CSS
 */
const getStatusClass = status => {
    return status === 1
        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
};

/**
 * Obtiene el texto para el estado del conductor
 * @param {number} status - Estado (1: activo, 0: inactivo)
 * @returns {string} - Texto del estado
 */
const getStatusText = status => {
    return status === 1 ? 'Activo' : 'Inactivo';
};

/**
 * Obtiene las clases CSS para el estado de la licencia
 * @param {string} status - Estado de la licencia (vigente, suspendida, vencida)
 * @returns {string} - Clases CSS
 */
const getLicenseStatusClass = status => {
    switch (status?.toLowerCase()) {
        case 'vigente':
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'suspendida':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        case 'vencida':
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
};
</script>
