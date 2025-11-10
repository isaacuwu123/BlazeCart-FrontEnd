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
                                Usuario
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
                                <MapPinIcon class="w-4 h-4" />
                                Ubicación
                            </div>
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-4 text-xs font-bold tracking-wider text-left uppercase transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            <div class="flex items-center gap-2">
                                <UsersIcon class="w-4 h-4" />
                                Roles
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
                    <tr v-if="!users || users.length === 0">
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
                                    No hay usuarios registrados
                                </p>
                                <p
                                    class="mt-1 text-xs"
                                    :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
                                >
                                    Crea un nuevo usuario para comenzar
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- User Rows -->
                    <tr
                        v-for="user in users"
                        :key="user.id"
                        class="transition-all duration-200 group"
                        :class="
                            isDarkMode
                                ? 'hover:bg-gray-700/50 hover:shadow-lg'
                                : 'hover:bg-yellow-50/50 hover:shadow-lg'
                        "
                    >
                        <!-- ==================== COLUMNA USUARIO ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center gap-3">
                                <div
                                    class="relative flex items-center justify-center flex-shrink-0 transition-transform duration-200 rounded-full shadow-md w-11 h-11 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 group-hover:scale-110"
                                >
                                    <UserIcon class="w-5 h-5 text-white" />
                                    <!-- Indicador de estado en el avatar -->
                                    <span
                                        class="absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full"
                                        :class="[
                                            user.estado === 1 ? 'bg-green-500' : 'bg-red-500',
                                            isDarkMode ? 'border-gray-800' : 'border-white',
                                        ]"
                                    ></span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div
                                        class="text-sm font-semibold truncate transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        {{ user.general_data.nombre }}
                                        {{ user.general_data.apellido }}
                                    </div>
                                    <div
                                        class="flex items-center gap-1.5 mt-0.5 text-xs transition-colors duration-200 truncate"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        <MailIcon class="flex-shrink-0 w-3 h-3" />
                                        {{ user.email }}
                                    </div>
                                    <div
                                        class="flex items-center gap-1.5 mt-0.5 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'"
                                    >
                                        <CreditCardIcon class="flex-shrink-0 w-3 h-3" />
                                        ID: {{ user.general_data.documento_identidad }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- ==================== COLUMNA CONTACTO ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <a
                                :href="`tel:${user.general_data.celular}`"
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
                                <span class="font-medium">{{ user.general_data.celular }}</span>
                            </a>
                        </td>

                        <!-- ==================== COLUMNA UBICACIÓN ==================== -->
                        <td class="px-6 py-4">
                            <div class="flex items-start gap-2">
                                <div
                                    class="p-1.5 rounded-lg transition-colors duration-200 flex-shrink-0"
                                    :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                >
                                    <MapPinIcon class="w-3.5 h-3.5 text-orange-500" />
                                </div>
                                <div class="min-w-0">
                                    <div
                                        class="text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ user.general_data.ciudad }}
                                    </div>
                                    <div
                                        class="text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-500' : 'text-gray-500'"
                                    >
                                        {{ user.general_data.departamento }}
                                    </div>
                                </div>
                            </div>
                        </td>

                        <!-- ==================== COLUMNA ROLES ==================== -->
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1.5">
                                <span
                                    v-for="(role, index) in user.roles.slice(0, 2)"
                                    :key="role.id"
                                    class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105"
                                    :class="getRoleClass(index)"
                                >
                                    <ShieldIcon class="w-3 h-3" />
                                    {{ role.name }}
                                </span>
                                <span
                                    v-if="user.roles.length > 2"
                                    class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full cursor-help transition-all duration-200 hover:scale-105"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    "
                                    :title="
                                        user.roles
                                            .slice(2)
                                            .map(r => r.name)
                                            .join(', ')
                                    "
                                >
                                    +{{ user.roles.length - 2 }}
                                </span>
                            </div>
                        </td>

                        <!-- ==================== COLUMNA ESTADO ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span
                                :class="getStatusClass(user.estado)"
                                class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm transition-all duration-200 hover:scale-105"
                            >
                                <span class="relative flex w-2 h-2">
                                    <span
                                        class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping"
                                        :class="user.estado === 1 ? 'bg-green-500' : 'bg-red-500'"
                                    ></span>
                                    <span
                                        class="relative inline-flex w-2 h-2 rounded-full"
                                        :class="user.estado === 1 ? 'bg-green-600' : 'bg-red-600'"
                                    ></span>
                                </span>
                                {{ getStatusText(user.estado) }}
                            </span>
                        </td>

                        <!-- ==================== COLUMNA ACCIONES ==================== -->
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center justify-center gap-2">
                                <!-- Ver Info -->
                                <button
                                    @click="$emit('view-info', user.id)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-indigo-500 rounded-lg hover:bg-indigo-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Ver información completa"
                                >
                                    <InfoIcon class="w-4 h-4" />
                                    <span
                                        class="absolute px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-900 rounded opacity-0 pointer-events-none whitespace-nowrap -top-9 left-1/2 group-hover/btn:opacity-100"
                                    >
                                        Ver info
                                    </span>
                                </button>

                                <!-- WhatsApp -->
                                <button
                                    @click="$emit('send-whatsapp', user)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Enviar por WhatsApp"
                                >
                                    <MessageSquareIcon class="w-4 h-4" />
                                    <span
                                        class="absolute px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-900 rounded opacity-0 pointer-events-none whitespace-nowrap -top-9 left-1/2 group-hover/btn:opacity-100"
                                    >
                                        WhatsApp
                                    </span>
                                </button>

                                <!-- Cambiar Contraseña -->
                                <button
                                    @click="$emit('change-password', user.id)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-purple-500 rounded-lg hover:bg-purple-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Cambiar Contraseña"
                                >
                                    <LockIcon class="w-4 h-4" />
                                    <span
                                        class="absolute px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-900 rounded opacity-0 pointer-events-none whitespace-nowrap -top-9 left-1/2 group-hover/btn:opacity-100"
                                    >
                                        Contraseña
                                    </span>
                                </button>

                                <!-- Editar -->
                                <button
                                    @click="$emit('edit', user)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Editar usuario"
                                >
                                    <EditIcon class="w-4 h-4" />
                                    <span
                                        class="absolute px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-900 rounded opacity-0 pointer-events-none whitespace-nowrap -top-9 left-1/2 group-hover/btn:opacity-100"
                                    >
                                        Editar
                                    </span>
                                </button>

                                <!-- Eliminar -->
                                <!--                                 <button
                                    @click="$emit('delete', user)"
                                    class="relative p-2.5 text-white transition-all duration-200 transform bg-red-500 rounded-lg hover:bg-red-600 hover:scale-110 hover:shadow-lg active:scale-95 group/btn"
                                    title="Eliminar usuario"
                                >
                                    <TrashIcon class="w-4 h-4" />
                                    <span
                                        class="absolute px-2 py-1 text-xs font-medium text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-900 rounded opacity-0 pointer-events-none whitespace-nowrap -top-9 left-1/2 group-hover/btn:opacity-100"
                                    >
                                        Eliminar
                                    </span>
                                </button> -->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { getStatusClass, getStatusText } from '@/utils/formatters';
import {
    ActivityIcon,
    CreditCardIcon,
    EditIcon,
    InfoIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    SettingsIcon,
    Shield as ShieldIcon,
    UserIcon,
    UsersIcon,
} from 'lucide-vue-next';

defineProps({
    users: {
        type: Array,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['view-info', 'send-whatsapp', 'change-password', 'edit', 'delete']);

// Función para obtener clases de color para roles (variedad visual)
const getRoleClass = index => {
    const classes = [
        'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
        'bg-purple-100 text-purple-800 hover:bg-purple-200',
        'bg-pink-100 text-pink-800 hover:bg-pink-200',
    ];
    return classes[index % classes.length];
};
</script>
