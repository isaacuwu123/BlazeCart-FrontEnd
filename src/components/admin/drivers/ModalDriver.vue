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
                        <CarIcon class="w-6 h-6 text-white" />
                    </div>
                    <h3
                        class="text-lg font-semibold transition-colors duration-200 sm:text-xl"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        {{ isEditMode ? 'Editar Conductor' : 'Nuevo Conductor' }}
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
                <form @submit.prevent="$emit('save')" id="driver-form" class="space-y-6">
                    <!-- ==================== INFORMACIÓN DE LICENCIA ==================== -->
                    <div>
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <CreditCardIcon class="w-5 h-5 text-yellow-500" />
                            Información de Licencia
                        </h4>
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <!-- Usuario -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Usuario *
                                </label>
                                <select
                                    v-model="formData.user_id"
                                    required
                                    :disabled="isEditMode"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Seleccione un usuario</option>
                                    <option v-for="user in users" :key="user.id" :value="user.id">
                                        {{ user.general_data?.nombre || 'NA' }}
                                        {{ user.general_data?.apellido || '' }}
                                    </option>
                                </select>
                            </div>

                            <!-- Número de Licencia -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Número de Licencia *
                                </label>
                                <input
                                    v-model="formData.numero_licencia"
                                    type="text"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="LIC-123456789"
                                />
                            </div>

                            <!-- Vencimiento de Licencia -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Vencimiento de Licencia *
                                </label>
                                <input
                                    v-model="formData.vencimiento_licencia"
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

                            <!-- Estado de Licencia -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado de Licencia *
                                </label>
                                <select
                                    v-model="formData.estado_licencia"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="vigente">Vigente</option>
                                    <option value="suspendida">Suspendida</option>
                                    <option value="vencida">Vencida</option>
                                </select>
                            </div>

                            <!-- Clase CDL -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Clase CDL *
                                </label>
                                <select
                                    v-model="formData.clase_cdl"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>

                            <!-- Tipo de Licencia -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Tipo de Licencia *
                                </label>
                                <select
                                    v-model="formData.tipo_licencia"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Seleccione un tipo de licencia</option>
                                    <option value="particular">Particular</option>
                                    <option value="profesional">Profesional</option>
                                </select>
                            </div>

                            <!-- Categoría -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Categoría *
                                </label>
                                <select
                                    v-model="formData.categoria"
                                    required
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                >
                                    <option value="">Seleccione una categoría</option>
                                    <option value="primera">Primera</option>
                                    <option value="segunda">Segunda</option>
                                    <option value="tercera">Tercera</option>
                                </select>
                            </div>

                            <!-- Restricciones -->
                            <div class="sm:col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Restricciones
                                </label>
                                <input
                                    v-model="formData.restricciones"
                                    type="text"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Ninguna"
                                />
                            </div>

                            <!-- Observaciones -->
                            <div class="sm:col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Observaciones
                                </label>
                                <textarea
                                    v-model="formData.observaciones"
                                    rows="3"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                    placeholder="Sin observaciones"
                                ></textarea>
                            </div>

                            <!-- Foto de Perfil -->
                            <div class="sm:col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Foto de Perfil
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    @change="handlePhotoUpload"
                                    class="w-full px-4 py-2.5 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                                <!-- Preview de la foto -->
                                <div v-if="photoPreview" class="mt-4">
                                    <img
                                        :src="photoPreview"
                                        class="object-cover w-32 h-32 border-4 border-yellow-500 rounded-lg shadow-lg"
                                        alt="Photo Preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- ==================== DOCUMENTOS DEL CONDUCTOR ==================== -->
                    <div v-if="isEditMode && driverDocuments.length > 0">
                        <h4
                            class="flex items-center gap-2 mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <FileTextIcon class="w-5 h-5 text-yellow-500" />
                            Documentos del Conductor
                        </h4>
                        <div class="space-y-3">
                            <div
                                v-for="doc in driverDocuments"
                                :key="doc.id"
                                class="p-4 transition-colors duration-200 border rounded-lg"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600'
                                        : 'bg-gray-50 border-gray-200'
                                "
                            >
                                <div class="flex items-center justify-between mb-2">
                                    <h5
                                        class="text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        {{ doc.nombre }}
                                    </h5>
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        :class="
                                            doc.aprobado === 1
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        "
                                    >
                                        {{ doc.aprobado === 1 ? 'Aprobado' : 'Pendiente' }}
                                    </span>
                                </div>
                                <p
                                    class="text-xs transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    Tipo: {{ doc.tipo }}<br />
                                    Vence: {{ formatDate(doc.fechavencimiento) }}
                                    <span v-if="doc.observaciones"
                                        ><br />Observaciones: {{ doc.observaciones }}</span
                                    >
                                </p>
                                <a
                                    v-if="doc.archivourl"
                                    :href="doc.archivourl"
                                    target="_blank"
                                    class="inline-flex items-center gap-1 px-3 py-1 mt-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                                >
                                    <DownloadIcon class="w-3 h-3" />
                                    Ver documento
                                </a>
                            </div>
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
                    form="driver-form"
                    :disabled="isLoading"
                    class="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-bold text-black transition-all duration-200 transform rounded-lg shadow-lg sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl hover:scale-105"
                >
                    <CheckIcon v-if="!isLoading" class="w-5 h-5" />
                    <Loader2Icon v-else class="w-5 h-5 animate-spin" />
                    <span v-if="isLoading">Guardando...</span>
                    <span v-else>{{
                        isEditMode ? 'Actualizar Conductor' : 'Crear Conductor'
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Car as CarIcon,
    CheckIcon,
    CreditCardIcon,
    DownloadIcon,
    FileText as FileTextIcon,
    Loader2 as Loader2Icon,
    XIcon,
} from 'lucide-vue-next';
import { watch } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    formData: Object,
    users: Array,
    driverDocuments: Array,
    photoPreview: String, // ← NUEVO: Agregado para ver el preview
    isLoading: Boolean,
    isEditMode: Boolean,
    isDarkMode: Boolean,
});
console.log(props.users);
const emit = defineEmits(['close', 'save', 'photo-upload']);

/**
 * Maneja la subida de foto
 */
const handlePhotoUpload = event => {
    emit('photo-upload', event);
};

/**
 * Formatea una fecha
 */
const formatDate = date => {
    if (!date) return 'NA';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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
