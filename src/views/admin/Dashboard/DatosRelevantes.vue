<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white shadow-xl rounded-t-xl bg-gradient-to-r from-orange-500 to-orange-600 sm:p-6"
            >
                <h1 class="text-xl font-extrabold text-center sm:text-3xl md:text-4xl">
                    DATOS RELEVANTES DE OPERACIÓN
                </h1>
                <div v-if="datosOperacion?.periodo" class="mt-2 text-center">
                    <p class="text-base font-semibold sm:text-lg md:text-xl">
                        {{ formatDate(datosOperacion.periodo.fecha_inicial) }} -
                        {{ formatDate(datosOperacion.periodo.fecha_final) }}
                    </p>
                </div>
                <div class="flex flex-wrap justify-center gap-3 mt-4 sm:gap-4">
                    <button
                        @click="refrescarDatos"
                        :disabled="cargando"
                        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargando || !datosOperacion || fechasInvalidas"
                        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-all duration-300 rounded-full bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar Excel
                    </button>
                </div>
            </div>

            <!-- Filtros -->
            <div
                class="p-4 transition-all duration-300 bg-white border-b border-gray-200 shadow-lg dark:bg-gray-800 sm:p-6 rounded-b-xl border-x dark:border-gray-700"
            >
                <div
                    v-if="fechaError"
                    class="p-3 mb-4 text-sm font-medium text-red-800 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200"
                >
                    {{ fechaError }}
                    <button
                        @click="resetDates"
                        class="float-right p-1 text-red-600 hover:text-red-800"
                    >
                        <XIcon class="w-4 h-4" />
                    </button>
                </div>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Negocio
                        </label>
                        <select
                            v-model="filtros.negocio_id"
                            class="w-full p-3 text-sm text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-100"
                            @change="aplicarFiltros"
                        >
                            <option value="">Todos los negocios</option>
                            <option
                                v-for="negocio in negocios"
                                :key="negocio.id"
                                :value="negocio.id"
                            >
                                {{ negocio.nombre }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Fecha Inicial
                        </label>
                        <input
                            v-model="filtros.fecha_inicial"
                            type="date"
                            :min="getMinDate"
                            :max="filtros.fecha_final || getMaxDate"
                            class="w-full p-3 text-sm text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-100"
                            @change="validateDates"
                        />
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Fecha Final
                        </label>
                        <input
                            v-model="filtros.fecha_final"
                            type="date"
                            :min="filtros.fecha_inicial || getMinDate"
                            :max="getMaxDate"
                            class="w-full p-3 text-sm text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-gray-100"
                            @change="validateDates"
                        />
                    </div>
                    <div class="flex items-end">
                        <button
                            @click="aplicarFiltros"
                            :disabled="!isValidForm || cargando"
                            class="w-full py-3 text-sm font-medium text-white transition-all duration-300 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FilterIcon class="inline w-4 h-4 mr-2" />
                            {{ cargando ? 'Cargando...' : 'Generar Reporte' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div
                class="mt-6 transition-all duration-300 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700"
            >
                <!-- Estado de carga -->
                <div v-if="cargando" class="flex flex-col items-center justify-center p-12">
                    <div class="relative">
                        <div class="w-16 h-16 border-4 border-orange-200 rounded-full"></div>
                        <div
                            class="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"
                        ></div>
                    </div>
                    <p class="mt-4 text-gray-600 dark:text-gray-400">Cargando datos...</p>
                </div>

                <!-- Estado de error -->
                <div v-else-if="error" class="p-6 text-center">
                    <div
                        class="p-6 border border-red-200 bg-red-50 rounded-xl dark:bg-red-900/20 dark:border-red-700"
                    >
                        <div class="flex justify-center mb-4">
                            <div class="p-3 bg-red-100 rounded-full dark:bg-red-800/30">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-8 h-8 text-red-600 dark:text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
                        <button
                            @click="aplicarFiltros"
                            class="px-4 py-2 mt-4 text-sm font-medium text-white transition-colors duration-300 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>

                <!-- Tabla de Datos Relevantes -->
                <div
                    v-else-if="datosOperacion?.datos_relevantes"
                    class="overflow-hidden animate-fade-in"
                >
                    <!-- Vista de tabla para pantallas grandes -->
                    <div class="hidden md:block">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead class="bg-gray-50 dark:bg-gray-900/50">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Item
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Total
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Unidad
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                                        >
                                            Detalles
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                                >
                                    <tr
                                        v-for="(item, index) in datosOperacion.datos_relevantes"
                                        :key="index"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    >
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                                        >
                                            {{ item.ranking }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap"
                                        >
                                            {{ item.item }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm font-semibold text-right text-gray-900 dark:text-gray-100 whitespace-nowrap"
                                        >
                                            <span v-if="item.item === 'DÍAS TRANSCURRIDOS'">
                                                {{ Math.round(Number(item.total)) }}
                                            </span>
                                            <span v-else>
                                                {{ item.total }}
                                            </span>
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                                        >
                                            {{ item.unidad }}
                                        </td>
                                        <td
                                            class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            <div v-if="item.detalle" class="space-y-1">
                                                <p>
                                                    <span class="font-medium">Cliente:</span>
                                                    {{ item.detalle.cliente }}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Fecha:</span>
                                                    {{ item.detalle.fecha }}
                                                </p>
                                                <p>
                                                    <span class="font-medium">Destino:</span>
                                                    {{ item.detalle.destino }}
                                                </p>
                                            </div>
                                            <span v-else class="text-gray-400">-</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Vista de tarjetas para móviles -->
                    <div class="p-4 md:hidden">
                        <div class="space-y-4">
                            <div
                                v-for="(item, index) in datosOperacion.datos_relevantes"
                                :key="index"
                                class="p-4 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700/50 dark:border-gray-600 hover:shadow-md"
                            >
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <span
                                            class="flex items-center justify-center w-8 h-8 mr-3 text-sm font-bold text-white bg-orange-500 rounded-full"
                                        >
                                            {{ item.ranking }}
                                        </span>
                                        <h3
                                            class="text-sm font-semibold text-gray-900 dark:text-gray-100"
                                        >
                                            {{ item.item }}
                                        </h3>
                                    </div>
                                    <span
                                        class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                    >
                                        {{ item.unidad }}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between mt-2">
                                    <div class="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        <span v-if="item.item === 'DÍAS TRANSCURRIDOS'">
                                            {{ Math.round(Number(item.total)) }}
                                        </span>
                                        <span v-else>
                                            {{ item.total }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    v-if="item.detalle"
                                    class="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600"
                                >
                                    <div class="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                                        <p>
                                            <span class="font-medium">Cliente:</span>
                                            {{ item.detalle.cliente }}
                                        </p>
                                        <p>
                                            <span class="font-medium">Fecha:</span>
                                            {{ item.detalle.fecha }}
                                        </p>
                                        <p>
                                            <span class="font-medium">Destino:</span>
                                            {{ item.detalle.destino }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Estado vacío -->
                <div v-else-if="!cargando && !error && !datosOperacion" class="p-8 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="p-4 bg-gray-100 rounded-full dark:bg-gray-700/50">
                            <FilterIcon class="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>
                    <p class="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Selecciona un negocio y fechas
                    </p>
                    <p class="text-gray-500 dark:text-gray-400">
                        Elige los filtros para generar tu reporte de datos relevantes
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import { exportToExcel, getOperationReport } from '@/services/TransactionFinancialService';
import { DownloadIcon, FilterIcon, RefreshCwIcon, XIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

// Estado del componente
const isDarkMode = ref(false);
const cargando = ref(false);
const error = ref('');
const fechaError = ref('');
const negocios = ref([]);
const datosOperacion = ref(null);

// Filtros
const filtros = ref({
    negocio_id: '',
    fecha_inicial: getLast30DaysStart(), // Default to last 30 days
    fecha_final: new Date().toISOString().split('T')[0],
});

// Computed properties for validation
const fechasInvalidas = computed(() => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) return true;
    return new Date(filtros.value.fecha_inicial) > new Date(filtros.value.fecha_final);
});

const isValidForm = computed(() => {
    return !fechasInvalidas.value && filtros.value.fecha_inicial && filtros.value.fecha_final;
});

const getMinDate = computed(() => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1); // Allow up to 1 year back
    return minDate.toISOString().split('T')[0];
});

const getMaxDate = computed(() => {
    return new Date().toISOString().split('T')[0];
});

// Helper to get last 30 days start
function getLast30DaysStart() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
}

// Helper to parse DD/MM/YYYY format to Date object
function parseDMY(dateString) {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date;
}

// Sincronizar tema
const syncTheme = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
};

let observer;
onMounted(() => {
    syncTheme();
    observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    cargarNegocios();
    // Auto-load data on mount
    aplicarFiltros();
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// Watch for date changes to validate
watch([() => filtros.value.fecha_inicial, () => filtros.value.fecha_final], () => {
    validateDates();
});

// Cargar negocios
const cargarNegocios = async () => {
    try {
        const { data } = await businessesActives();
        negocios.value = data.datos || [];
    } catch (err) {
        console.error('[v0] Error loading businesses:', err);
        error.value = 'Error al cargar los negocios. Por favor intenta de nuevo.';
    }
};

// Validate dates
const validateDates = () => {
    if (fechasInvalidas.value) {
        fechaError.value = 'La fecha final debe ser mayor o igual a la fecha inicial.';
    } else {
        fechaError.value = '';
    }
};

// Reset dates
const resetDates = () => {
    filtros.value = {
        negocio_id: '',
        fecha_inicial: getLast30DaysStart(),
        fecha_final: new Date().toISOString().split('T')[0],
    };
    fechaError.value = '';
};

// Obtener datos de operación
const obtenerDatosOperacion = async () => {
    try {
        const { data } = await getOperationReport(filtros.value);
        // Post-procesar días transcurridos para asegurar entero
        if (data.data?.datos_relevantes) {
            data.data.datos_relevantes = data.data.datos_relevantes.map(item => {
                if (item.item === 'DÍAS TRANSCURRIDOS') {
                    item.total = Math.round(Number(item.total));
                }
                return item;
            });
        }
        datosOperacion.value = data.data || {};
        error.value = '';
    } catch (err) {
        console.error('[v0] Error fetching operation report:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
        throw err;
    }
};

// Aplicar filtros
const aplicarFiltros = async () => {
    if (!isValidForm.value) {
        fechaError.value = 'Por favor selecciona un rango de fechas válido.';
        return;
    }
    cargando.value = true;
    error.value = '';
    fechaError.value = '';
    try {
        await obtenerDatosOperacion();
    } catch (err) {
        console.error('[v0] Error applying filters:', err);
        error.value = 'Error al aplicar filtros. Por favor intenta de nuevo.';
    } finally {
        cargando.value = false;
    }
};

// Refrescar datos
const refrescarDatos = async () => {
    await aplicarFiltros();
};

// Formatear fecha (maneja formato DD/MM/YYYY del backend)
const formatDate = dateString => {
    const parsedDate = parseDMY(dateString);
    if (!parsedDate) return dateString || 'Fecha inválida'; // Fallback si no se puede parsear
    return parsedDate.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Exportar a Excel
const exportarExcel = async () => {
    if (!isValidForm.value) return;
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportToExcel(filtros.value);
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const fechaFinalISO = filtros.value.fecha_final.replace(/-/g, '');
        link.download = `Datos_Relevantes_${fechaFinalISO}.xlsx`; // Improved filename with ISO date
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('[v0] Error exporting Excel:', err);
        error.value =
            err.response?.data?.message || 'Error al exportar a Excel. Por favor intenta de nuevo.';
    } finally {
        cargando.value = false;
    }
};
</script>

<style scoped>
/* Animaciones y transiciones */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.btn {
    @apply flex items-center justify-center py-2 px-4 rounded-lg font-medium cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
}

.input-field {
    @apply w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200;
}

/* Efectos de hover para elementos interactivos */
table tr {
    @apply transition-all duration-200;
}

/* Mejoras para modo oscuro */
.dark .btn {
    @apply bg-orange-600 hover:bg-orange-700;
}

/* Animación de carga personalizada */
.animate-spin-slow {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .btn {
        @apply text-sm py-2 px-3;
    }

    .input-field {
        @apply p-2 text-sm;
    }
}
</style>
