<template>
    <div
        class="min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50'
        "
    >
        <!-- Header: Encabezado principal con título y botón de nueva categoría -->
        <div
            class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div
                class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between"
            >
                <div class="flex items-center space-x-2 sm:space-x-4">
                    <div
                        class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 sm:p-3"
                    >
                        <TagIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Gestión de Categorías
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra las categorías financieras del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="openCreateModal"
                    class="flex items-center justify-center px-4 py-2.5 font-medium text-white transition-all duration-200 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg hover:from-yellow-500 hover:to-orange-600 shadow-md hover:shadow-lg touch-manipulation transform hover:scale-105"
                >
                    <PlusIcon class="w-4 h-4 mr-2" />
                    Nueva Categoría
                </button>
            </div>
        </div>

        <!-- Search and Filters: Sección de búsqueda y filtros -->
        <div
            class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
                <div class="relative flex-1">
                    <SearchIcon
                        class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar categorías..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="true">Activas</option>
                    <option value="false">Inactivas</option>
                </select>
            </div>
        </div>

        <!-- Stats Cards: Tarjetas de estadísticas -->
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2">
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Total Categorías
                </h3>
                <p class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ filteredCategories.length }}
                </p>
            </div>
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Activas
                </h3>
                <p
                    class="text-xl font-bold text-green-500"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                >
                    {{ filteredCategories.filter(c => c.estado).length }}
                </p>
            </div>
        </div>

        <!-- Desktop Table: Tabla para vista de escritorio -->
        <div
            class="hidden overflow-hidden transition-colors duration-200 shadow-lg lg:block rounded-xl"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div class="overflow-x-auto">
                <table
                    class="min-w-full divide-y"
                    :class="isDarkMode ? 'divide-gray-700' : 'divide-gray-200'"
                >
                    <thead class="bg-gradient-to-r from-yellow-400 to-orange-500">
                        <tr>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Nombre
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Descripción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Estado
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y"
                        :class="
                            isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
                        "
                    >
                        <tr
                            v-for="cat in paginatedCategories"
                            :key="cat.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ cat.nombre }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    {{ cat.descripcion || 'Sin descripción' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        cat.estado
                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    "
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ cat.estado ? 'Activa' : 'Inactiva' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="openEditModal(cat)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-if="cat.estado"
                                        @click="confirmDeactivate(cat)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                        title="Desactivar"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button
                                        v-else
                                        @click="confirmActivate(cat)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Reactivar"
                                    >
                                        <RefreshCwIcon class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Mobile Cards: Tarjetas para vista móvil -->
        <div class="space-y-3 sm:space-y-4 lg:hidden">
            <div
                v-for="cat in paginatedCategories"
                :key="cat.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500"
                        >
                            <TagIcon class="w-5 h-5 text-white sm:w-6 sm:h-6" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ cat.nombre }}
                            </h3>
                        </div>
                    </div>
                    <span
                        :class="
                            cat.estado
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        "
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
                    >
                        {{ cat.estado ? 'Activa' : 'Inactiva' }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <FileTextIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ cat.descripcion || 'Sin descripción' }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="openEditModal(cat)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-if="cat.estado"
                        @click="confirmDeactivate(cat)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Desactivar"
                    >
                        <TrashIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-else
                        @click="confirmActivate(cat)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Reactivar"
                    >
                        <RefreshCwIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Pagination: Controles de paginación -->
        <div
            class="flex justify-center mt-4 space-x-2"
            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Anterior
            </button>
            <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>

        <!-- Empty State: Estado vacío cuando no hay categorías -->
        <div v-if="paginatedCategories.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <TagIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron categorías
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros o crea una nueva.
                </p>
            </div>
        </div>

        <!-- Edit/Create Modal: Modal para crear/editar categorías -->
        <div
            v-if="isEditModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header: Encabezado del modal -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            {{ posicion ? 'Editar' : 'Crear' }} Categoría
                        </h2>
                        <button
                            @click="closeEditModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-300 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                <!-- Modal Body: Cuerpo del modal con formulario -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveCategory" class="space-y-4 sm:space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <TagIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información de la Categoría
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre *
                                    </label>
                                    <input
                                        v-model="form.nombre"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Nombre de la categoría"
                                    />
                                    <p v-if="formErrors.nombre" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.nombre }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        v-model="form.descripcion"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Descripción opcional"
                                    ></textarea>
                                    <p
                                        v-if="formErrors.descripcion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.descripcion }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Footer: Pie del modal con botones -->
                        <div
                            class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-800'
                                    : 'border-gray-200 bg-white'
                            "
                        >
                            <button
                                type="button"
                                @click="closeEditModal"
                                :disabled="isLoading"
                                class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 disabled:opacity-50 touch-manipulation"
                                :class="
                                    isDarkMode
                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                "
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                :disabled="isLoading"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isLoading">{{
                                    posicion ? 'Actualizando...' : 'Creando...'
                                }}</span>
                                <span v-else
                                    >{{ posicion ? 'Actualizar' : 'Crear' }} Categoría</span
                                >
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Importaciones de composables y servicios
import { useAlert } from '@/composables/useAlert';
import { isDarkMode } from '@/composables/useDarkMode';
import {
    activateCategory,
    deactivateCategory,
    indexCategories,
    showCategory,
    storeCategory,
    updateCategory,
} from '@/services/CategoryService';
import {
    EditIcon,
    FileTextIcon,
    PlusIcon,
    RefreshCwIcon,
    SearchIcon,
    TagIcon,
    TrashIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Inicialización del composable de alertas
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();

// Estado del componente
const categories = ref([]); // Lista de categorías
const isEditModalOpen = ref(false); // Controla la visibilidad del modal
const isLoading = ref(false); // Indicador de carga
const searchQuery = ref(''); // Término de búsqueda
const selectedStatus = ref(''); // Filtro de estado
const currentPage = ref(1); // Página actual de paginación
const perPage = ref(15); // Elementos por página
const posicion = ref(null); // ID de la categoría en edición (null si es nueva)
const form = ref({
    // Datos del formulario
    id: null,
    nombre: '',
    descripcion: '',
});
const formErrors = ref({}); // Errores de validación del formulario

// Propiedades computadas
const filteredCategories = computed(() => {
    // Filtra categorías según búsqueda y estado
    return categories.value.filter(cat => {
        const matchesSearch = cat.nombre.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus =
            selectedStatus.value === '' || cat.estado.toString() === selectedStatus.value;
        return matchesSearch && matchesStatus;
    });
});

const paginatedCategories = computed(() => {
    // Paginación de categorías filtradas
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredCategories.value.slice(start, end);
});

const totalPages = computed(() => {
    // Calcula el total de páginas
    return Math.ceil(filteredCategories.value.length / perPage.value);
});

// Métodos del componente
const listCategories = async () => {
    // Obtiene la lista de categorías desde la API
    try {
        showLoading();
        const { data } = await indexCategories();
        categories.value = data.data || [];
    } catch (error) {
        console.error('Error loading categories:', error);
        showError('Error', 'No se pudieron cargar las categorías.');
    } finally {
        closeLoading();
    }
};

const resetForm = () => {
    // Reinicia el formulario a su estado inicial
    form.value = { id: null, nombre: '', descripcion: '' };
    formErrors.value = {};
    posicion.value = null;
};

const openCreateModal = () => {
    // Abre el modal para crear una nueva categoría
    resetForm();
    isEditModalOpen.value = true;
};

const openEditModal = async cat => {
    // Abre el modal para editar una categoría existente
    try {
        showLoading();
        const { data } = await showCategory(cat.id);
        form.value = { ...data.data };
        posicion.value = cat.id;
        isEditModalOpen.value = true;
    } catch (error) {
        showError('Error', 'No se pudo cargar la categoría.');
    } finally {
        closeLoading();
    }
};

const closeEditModal = () => {
    // Cierra el modal y reinicia el formulario
    isEditModalOpen.value = false;
    resetForm();
};

const validateForm = () => {
    // Valida los campos del formulario
    formErrors.value = {};
    let valid = true;
    if (!form.value.nombre?.trim()) {
        formErrors.value.nombre = 'El nombre es obligatorio.';
        valid = false;
    }
    return valid;
};

const handleSaveCategory = async () => {
    // Maneja el guardado de una categoría (creación o actualización)
    if (!validateForm()) return;
    try {
        showLoading();
        isLoading.value = true;
        if (posicion.value) {
            // Actualiza categoría existente
            await updateCategory(posicion.value, form.value);
            showSuccess('Éxito', 'Categoría actualizada.');
        } else {
            // Crea nueva categoría
            await storeCategory(form.value);
            showSuccess('Éxito', 'Categoría creada.');
        }
        await listCategories(); // Refresca la lista
        closeEditModal(); // Cierra el modal
    } catch (error) {
        formErrors.value = error.response?.data?.errors || {};
        showError('Error', `No se pudo ${posicion.value ? 'actualizar' : 'crear'} la categoría.`);
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};

const confirmDeactivate = async cat => {
    // Confirma y ejecuta la desactivación de una categoría
    const confirmed = await showConfirm('Confirmar', `¿Desactivar la categoría "${cat.nombre}"?`);
    if (confirmed) {
        try {
            showLoading();
            await deactivateCategory(cat.id);
            showSuccess('Éxito', 'Categoría desactivada.');
            await listCategories(); // Refresca la lista
        } catch (error) {
            showError('Error', 'No se pudo desactivar.');
        } finally {
            closeLoading();
        }
    }
};

const confirmActivate = async cat => {
    // Confirma y ejecuta la reactivación de una categoría
    const confirmed = await showConfirm('Confirmar', `¿Reactivar la categoría "${cat.nombre}"?`);
    if (confirmed) {
        try {
            showLoading();
            await activateCategory(cat.id);
            showSuccess('Éxito', 'Categoría reactivada.');
            await listCategories(); // Refresca la lista
        } catch (error) {
            showError('Error', 'No se pudo reactivar.');
        } finally {
            closeLoading();
        }
    }
};

const prevPage = () => {
    // Navega a la página anterior
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    // Navega a la página siguiente
    if (currentPage.value < totalPages.value) currentPage.value++;
};

// Observadores
watch([searchQuery, selectedStatus], () => {
    // Reinicia la paginación cuando cambian los filtros
    currentPage.value = 1;
});

// Ciclo de vida del componente
onMounted(async () => {
    // Al montar el componente, carga los datos iniciales
    await listCategories();
});
</script>

<style scoped>
/* Estilos personalizados para el componente */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px; /* Ancho de la barra de desplazamiento */
}
.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent; /* Fondo transparente de la pista */
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #fbbf24; /* Color del pulgar de la barra */
    border-radius: 2px; /* Bordes redondeados */
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #f59e0b; /* Color al pasar el mouse */
}
@media (max-width: 640px) {
    .touch-manipulation {
        touch-action: manipulation; /* Mejora la experiencia táctil */
        -webkit-tap-highlight-color: transparent; /* Elimina el resalte al tocar */
    }
}
</style>
