<template>
    <div
        class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl sm:p-5 border-gradient-to-b from-yellow-400 to-orange-500"
        :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
    >
        <div class="flex items-start justify-between mb-3 sm:mb-4">
            <div class="flex items-center flex-1 min-w-0 space-x-3">
                <div
                    class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500"
                >
                    <UserIcon class="w-5 h-5 text-white sm:w-6 sm:h-6" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3
                        class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        {{ user.general_data.nombre }} {{ user.general_data.apellido }}
                    </h3>
                    <p
                        class="text-xs truncate transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                    >
                        ID: {{ user.general_data.documento_identidad }}
                    </p>
                </div>
            </div>
            <span
                :class="getStatusClass(user.estado)"
                class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
            >
                <CheckCircle2Icon v-if="user.estado === 1" class="w-3 h-3 mr-1" />
                <XCircleIcon v-else class="w-3 h-3 mr-1" />
                {{ getStatusText(user.estado) }}
            </span>
        </div>

        <div class="mb-4 space-y-2 sm:space-y-3">
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <MailIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">{{ user.email }}</span>
            </div>
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <PhoneIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate">{{ user.general_data.celular }}</span>
            </div>
            <div
                class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
            >
                <MapPinIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                <span class="truncate"
                    >{{ user.general_data.ciudad }}, {{ user.general_data.departamento }}</span
                >
            </div>
        </div>

        <div
            class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
            :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
        >
            <button
                @click="$emit('view-info', user.id)"
                class="p-2.5 sm:p-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Ver información completa"
            >
                <InfoIcon class="w-4 h-4" />
            </button>
            <button
                @click="$emit('send-whatsapp', user)"
                class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Enviar por WhatsApp"
            >
                <MessageSquareIcon class="w-4 h-4" />
            </button>
            <button
                @click="$emit('change-password', user.id)"
                class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Cambiar Contraseña"
            >
                <LockIcon class="w-4 h-4" />
            </button>
            <button
                @click="$emit('edit', user)"
                class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Editar"
            >
                <EditIcon class="w-4 h-4" />
            </button>
            <button
                @click="$emit('delete', user)"
                class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                title="Eliminar"
            >
                <TrashIcon class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { getStatusClass, getStatusText } from '@/utils/formatters';
import {
    CheckCircle2Icon,
    EditIcon,
    InfoIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    TrashIcon,
    UserIcon,
    XCircleIcon,
} from 'lucide-vue-next';

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    isDarkMode: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['view-info', 'send-whatsapp', 'change-password', 'edit', 'delete']);
</script>
