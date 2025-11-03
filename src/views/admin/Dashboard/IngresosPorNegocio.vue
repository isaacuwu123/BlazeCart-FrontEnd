<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-green-500 to-green-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    INGRESOS POR NEGOCIO
                </h1>
                <div v-if="ingresosPorNegocio?.resumen_global" class="mt-2 text-center">
                    <p class="text-lg font-semibold">Todos los negocios</p>
                    <p class="text-sm opacity-90">
                        {{ formatDate(filtros.fecha_inicial) }} -
                        {{ formatDate(filtros.fecha_final) }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button
                        @click="exportarPDF"
                        :disabled="cargando || !ingresosPorNegocio?.resumen_global"
                        class="btn"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar PDF
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargando || !ingresosPorNegocio?.resumen_global"
                        class="btn"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar Excel
                    </button>
                </div>
            </div>

            <!-- Filtros -->
            <div
                class="p-6 transition-colors duration-300 border-gray-200 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-x dark:border-gray-700"
            >
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Negocio
                        </label>
                        <select
                            v-model="filtros.negocio_id"
                            class="input-field"
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
                            class="input-field"
                            @change="aplicarFiltros"
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
                            class="input-field"
                            @change="aplicarFiltros"
                        />
                    </div>
                    <div class="flex items-end">
                        <button
                            @click="aplicarFiltros"
                            :disabled="!filtros.fecha_inicial || !filtros.fecha_final || cargando"
                            class="w-full btn"
                        >
                            <FilterIcon class="w-4 h-4 mr-2" />
                            {{ cargando ? 'Cargando...' : 'Generar Reporte' }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div
                class="transition-colors duration-300 border-b border-gray-200 rounded-b-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-x dark:border-gray-700"
            >
                <!-- Contenido de Ingresos por Negocio -->
                <div v-if="cargando" class="flex items-center justify-center p-12">
                    <div class="text-center">
                        <RefreshCwIcon class="w-8 h-8 mx-auto mb-4 text-green-500 animate-spin" />
                        <p class="text-gray-600 dark:text-gray-400">Cargando datos...</p>
                    </div>
                </div>

                <div v-else-if="error" class="p-6 text-center">
                    <div
                        class="p-4 bg-red-100 border border-red-200 rounded-lg dark:bg-red-900/30 dark:border-red-700"
                    >
                        <p class="text-red-800 dark:text-red-200">{{ error }}</p>
                        <button @click="aplicarFiltros" class="mt-4 btn">Reintentar</button>
                    </div>
                </div>

                <!-- Ingresos por Negocio -->
                <div
                    v-else-if="ingresosPorNegocio?.resumen_global"
                    class="grid grid-cols-1 gap-6 p-6"
                >
                    <!-- Gráfico de Barras Horizontales (ahora ocupa todo el ancho) -->
                    <div class="flex flex-col h-full chart-card">
                        <h4 class="chart-title">📊 Distribución de Ingresos por Negocio</h4>
                        <div class="flex-grow chart-container">
                            <Bar
                                :data="ingresosPorNegocioChartData"
                                :options="ingresosPorNegocioChartOptions"
                            />
                        </div>
                    </div>

                    <!-- Tabla y Resumen -->
                    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <!-- Tabla de Ingresos por Negocio -->
                        <div class="flex flex-col gap-6 xl:col-span-2">
                            <div>
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-4 gap-4 text-sm font-semibold">
                                        <div>NEGOCIO</div>
                                        <div>TOTAL INGRESOS</div>
                                        <div>CANTIDAD TRANSACCIONES</div>
                                        <div>PROMEDIO</div>
                                    </div>
                                </div>
                                <div
                                    class="overflow-y-auto border border-gray-300 dark:border-gray-600 max-h-96 rounded-b-md"
                                >
                                    <div
                                        v-for="negocio in ingresosPorNegocio.negocios"
                                        :key="negocio.negocio_id"
                                        class="grid grid-cols-4 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <div class="font-medium text-gray-900 dark:text-gray-100">
                                            {{ negocio.negocio_nombre }}
                                        </div>
                                        <div
                                            class="font-semibold text-green-600 dark:text-green-400"
                                        >
                                            {{ formatCurrency(negocio.total_ingresos) }}
                                        </div>
                                        <div class="text-gray-600 dark:text-gray-400">
                                            {{ negocio.cantidad_transacciones }}
                                        </div>
                                        <div class="text-gray-600 dark:text-gray-400">
                                            {{ formatCurrency(negocio.promedio_ingreso) }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Estadísticas Adicionales -->
                            <div v-if="ingresosPorNegocio.estadisticas_adicionales" class="mt-6">
                                <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                    Estadísticas Adicionales
                                </h3>
                                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div
                                        v-if="
                                            ingresosPorNegocio.estadisticas_adicionales
                                                .negocio_mayor_ingreso
                                        "
                                        class="p-4 bg-green-100 rounded-lg dark:bg-green-900/30"
                                    >
                                        <p class="text-sm text-green-600 dark:text-green-400">
                                            Negocio con mayor ingreso:
                                        </p>
                                        <p class="font-medium text-green-800 dark:text-green-200">
                                            {{
                                                ingresosPorNegocio.estadisticas_adicionales
                                                    .negocio_mayor_ingreso.negocio_nombre
                                            }}
                                            -
                                            {{
                                                formatCurrency(
                                                    ingresosPorNegocio.estadisticas_adicionales
                                                        .negocio_mayor_ingreso.total_ingresos
                                                )
                                            }}
                                        </p>
                                    </div>
                                    <div
                                        v-if="
                                            ingresosPorNegocio.estadisticas_adicionales
                                                .negocio_menor_ingreso
                                        "
                                        class="p-4 bg-yellow-100 rounded-lg dark:bg-yellow-900/30"
                                    >
                                        <p class="text-sm text-yellow-600 dark:text-yellow-400">
                                            Negocio con menor ingreso:
                                        </p>
                                        <p class="font-medium text-yellow-800 dark:text-yellow-200">
                                            {{
                                                ingresosPorNegocio.estadisticas_adicionales
                                                    .negocio_menor_ingreso.negocio_nombre
                                            }}
                                            -
                                            {{
                                                formatCurrency(
                                                    ingresosPorNegocio.estadisticas_adicionales
                                                        .negocio_menor_ingreso.total_ingresos
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Resumen Global -->
                        <div class="h-full summary-card">
                            <h3 class="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Resumen Global
                            </h3>
                            <div class="space-y-3">
                                <div
                                    class="bg-blue-100 border-blue-200 summary-item dark:bg-blue-900/30 dark:border-blue-700"
                                >
                                    <span class="font-medium text-blue-800 dark:text-blue-200"
                                        >Total de ingresos</span
                                    >
                                    <span
                                        class="text-lg font-bold text-blue-800 dark:text-blue-200"
                                    >
                                        {{
                                            formatCurrency(
                                                ingresosPorNegocio.resumen_global?.total_ingresos ||
                                                    0
                                            )
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-purple-100 border-purple-200 summary-item dark:bg-purple-900/30 dark:border-purple-700"
                                >
                                    <span class="font-medium text-purple-800 dark:text-purple-200"
                                        >Cantidad de transacciones</span
                                    >
                                    <span
                                        class="text-lg font-bold text-purple-800 dark:text-purple-200"
                                    >
                                        {{
                                            ingresosPorNegocio.resumen_global
                                                ?.cantidad_transacciones || 0
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-indigo-100 border-indigo-200 summary-item dark:bg-indigo-900/30 dark:border-indigo-700"
                                >
                                    <span class="font-medium text-indigo-800 dark:text-indigo-200"
                                        >Promedio por transacción</span
                                    >
                                    <span
                                        class="text-lg font-bold text-indigo-800 dark:text-indigo-200"
                                    >
                                        {{
                                            formatCurrency(
                                                ingresosPorNegocio.resumen_global
                                                    ?.promedio_ingreso || 0
                                            )
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty state -->
                <div
                    v-else-if="!cargando && !error && !ingresosPorNegocio?.resumen_global"
                    class="p-12 text-center"
                >
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">Selecciona un negocio y fechas</p>
                        <p>Elige los filtros para generar tu reporte de ingresos por negocio</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import {
    exportToExcelIngresos,
    exportToPDFIngresos,
    getFinancialTransacctionsIncomesByCategory,
} from '@/services/TransactionFinancialService';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { DownloadIcon, FilterIcon, RefreshCwIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

// Registrar componentes de Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    RadialLinearScale,
    Filler
);

// Estado del componente
const isDarkMode = ref(false);
const cargando = ref(false);
const error = ref('');
const negocios = ref([]);
const ingresosPorNegocio = ref({});

// Filtros
const filtros = ref({
    negocio_id: '',
    fecha_inicial: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    fecha_final: new Date().toISOString().split('T')[0],
});

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
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// Colores dinámicos según tema
const colors = computed(() => ({
    primary: isDarkMode.value ? '#34D399' : '#10B981',
    secondary: isDarkMode.value ? '#38BDF8' : '#0EA5E9',
    success: isDarkMode.value ? '#4ADE80' : '#10B981',
    danger: isDarkMode.value ? '#F87171' : '#EF4444',
    warning: isDarkMode.value ? '#FBBF24' : '#F59E0B',
    text: isDarkMode.value ? 'rgba(229, 231, 235, 0.8)' : '#4B5563',
    grid: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBg: isDarkMode.value ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: isDarkMode.value ? '#34D399' : '#10B981',
}));

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

// Obtener ingresos por negocio
const obtenerIngresosPorNegocio = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getFinancialTransacctionsIncomesByCategory(filtros.value);
        ingresosPorNegocio.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching incomes by business:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Aplicar filtros
const aplicarFiltros = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        await obtenerIngresosPorNegocio();
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

// Formatear fecha
const formatDate = dateString => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Formatear moneda con 2 decimales
const formatCurrency = value => {
    if (value === null || value === undefined) return '$0.00';
    // Asegurar que sea un número
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numValue);
};

// Obtener color de estado
const getStatusColor = estado => {
    const colors = {
        PAGADO: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        'POR COBRAR': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
        'PAGO PARCIAL': 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        'POR PAGAR': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        'POR COBRAR': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
        CANCELADO: 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200',
        PENDIENTE: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    };
    return colors[estado] || 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
};

// Exportar a Excel
const exportarExcel = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportToExcelIngresos(filtros.value);
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Ingresos_por_Negocio_${formatDate(filtros.value.fecha_final)}.xlsx`;
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

// Exportar a PDF
const exportarPDF = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportToPDFIngresos(filtros.value);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Ingresos_por_Negocio_${formatDate(filtros.value.fecha_final)}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('[v0] Error exporting PDF:', err);
        error.value =
            err.response?.data?.message || 'Error al exportar a PDF. Por favor intenta de nuevo.';
    } finally {
        cargando.value = false;
    }
};

// Opciones base para gráficos
const baseChartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1000,
        easing: 'easeInOutCubic',
    },
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: colors.value.text,
                usePointStyle: true,
                pointStyle: 'rectRounded',
                padding: 15,
                font: {
                    size: 12,
                    weight: '500',
                },
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: colors.value.tooltipBg,
            titleColor: colors.value.primary,
            bodyColor: colors.value.text,
            borderColor: colors.value.tooltipBorder,
            borderWidth: 1,
            padding: 12,
            caretSize: 6,
            cornerRadius: 8,
            boxPadding: 4,
            callbacks: {
                label: context => {
                    const value = context.parsed.y || context.parsed;
                    return ` ${context.dataset.label || ''}: ${formatCurrency(value)}`;
                },
            },
        },
    },
}));

// Datos para gráfico de ingresos por negocio (barras horizontales)
const ingresosPorNegocioChartData = computed(() => {
    if (!ingresosPorNegocio.value?.negocios) return { labels: [], datasets: [] };

    const negocios = ingresosPorNegocio.value.negocios.map(item => item.negocio_nombre);
    const valores = ingresosPorNegocio.value.negocios.map(item => {
        // Asegurarse de que sea un número
        return typeof item.total_ingresos === 'number'
            ? item.total_ingresos
            : parseFloat(item.total_ingresos) || 0;
    });

    return {
        labels: negocios,
        datasets: [
            {
                label: 'Total de Ingresos',
                data: valores,
                backgroundColor: colors.value.primary,
                borderColor: colors.value.primary,
                borderWidth: 1,
                borderRadius: 4,
                barThickness: 'flex',
                maxBarThickness: 50, // Aumentado para mejor visibilidad
            },
        ],
    };
});

const ingresosPorNegocioChartOptions = computed(() => ({
    ...baseChartOptions.value,
    indexAxis: 'y', // Esto hace que el gráfico sea de barras horizontales
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                color: colors.value.grid,
            },
            ticks: {
                color: colors.value.text,
                callback: function (value) {
                    return formatCurrency(value);
                },
            },
        },
        y: {
            grid: {
                display: false, // Ocultar líneas de cuadrícula en el eje Y para mejor visualización
            },
            ticks: {
                color: colors.value.text,
                font: {
                    size: 12,
                    weight: 'bold',
                },
            },
        },
    },
    plugins: {
        ...baseChartOptions.value.plugins,
        tooltip: {
            ...baseChartOptions.value.plugins.tooltip,
            callbacks: {
                label: context => {
                    const value = context.parsed.x;
                    return ` ${context.dataset.label}: ${formatCurrency(value)}`;
                },
            },
        },
    },
}));
</script>

<style scoped>
.chart-card {
    @apply p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out border bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm;
    animation: fadeInUp 0.5s ease-out forwards;
}

.chart-card:hover {
    @apply transform -translate-y-1 shadow-2xl bg-white dark:bg-gray-800;
}

.chart-title {
    @apply text-center text-base sm:text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200;
}

.chart-container {
    @apply relative h-[300px] sm:h-[350px]; /* Altura aumentada para mejor visualización */
}

.btn {
    @apply flex items-center justify-center py-2 px-5 rounded-full font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-green-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
}

.input-field {
    @apply w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200;
}

.summary-card {
    @apply p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out border bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm;
}

.summary-item {
    @apply flex justify-between items-center p-3 rounded-md border transition-colors duration-200;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.chart-card:nth-child(1) {
    animation-delay: 0.05s;
}

.chart-card:nth-child(2) {
    animation-delay: 0.1s;
}
</style>
