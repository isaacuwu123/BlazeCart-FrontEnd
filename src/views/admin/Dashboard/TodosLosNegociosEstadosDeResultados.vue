<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    ESTADOS DE RESULTADOS - TODOS LOS NEGOCIOS
                </h1>
                <div class="mt-2 text-center">
                    <p class="text-lg font-semibold">Resumen General de Todos los Negocios</p>
                    <p class="text-sm opacity-90">
                        {{ formatDate(allBusinessesFinancialData?.periodo?.fecha_inicial) }}
                        -
                        {{ formatDate(allBusinessesFinancialData?.periodo?.fecha_final) }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button
                        @click="exportarPDF"
                        :disabled="cargando || !allBusinessesFinancialData?.resumen_general"
                        class="btn"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar PDF
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargando || !allBusinessesFinancialData?.resumen_general"
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
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                <!-- Contenido de Estados de Resultados -->
                <div v-if="cargando" class="flex items-center justify-center p-12">
                    <div class="text-center">
                        <RefreshCwIcon class="w-8 h-8 mx-auto mb-4 text-orange-500 animate-spin" />
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
                <!-- Estados de Resultados -->
                <div v-else-if="allBusinessesFinancialData?.resumen_general" class="p-6">
                    <!-- Resumen General -->
                    <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <h3 class="mb-3 text-lg font-bold text-blue-800 dark:text-blue-200">
                            Resumen General de Todos los Negocios
                        </h3>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Ingresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ allBusinessesFinancialData.resumen_general.total_ingresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Egresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ allBusinessesFinancialData.resumen_general.total_egresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Margen Bruto</p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ allBusinessesFinancialData.resumen_general.margen_bruto }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Rentabilidad</p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    {{
                                        allBusinessesFinancialData.resumen_general
                                            .rentabilidad_porcentaje
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Tabla de Negocios -->
                    <div class="mb-6">
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Detalle por Negocio
                        </h3>
                        <div
                            class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                        >
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
                                <div class="grid grid-cols-6 gap-4 text-sm font-semibold">
                                    <div>NEGOCIO</div>
                                    <div>INGRESOS</div>
                                    <div>EGRESOS</div>
                                    <div>MARGEN BRUTO</div>
                                    <div>RENTABILIDAD</div>
                                    <div>DETALLES</div>
                                </div>
                            </div>
                            <div
                                v-for="negocio in allBusinessesFinancialData.negocios"
                                :key="negocio.negocio.id"
                                class="grid grid-cols-6 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <div class="font-medium text-gray-900 dark:text-gray-100">
                                    {{ negocio.negocio.nombre }}
                                </div>
                                <div class="font-semibold text-green-600 dark:text-green-400">
                                    ${{ negocio.resumen_financiero.total_ingresos }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{ negocio.resumen_financiero.total_egresos }}
                                </div>
                                <div class="font-semibold text-blue-600 dark:text-blue-400">
                                    ${{ negocio.resumen_financiero.margen_bruto }}
                                </div>
                                <div class="font-semibold text-purple-600 dark:text-purple-400">
                                    {{ negocio.resumen_financiero.rentabilidad_porcentaje }}
                                </div>
                                <div>
                                    <button
                                        @click="verDetallesNegocio(negocio.negocio.id)"
                                        class="px-3 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Gráfico de Comparación de Negocios -->
                    <div class="chart-card">
                        <h4 class="chart-title">📊 Comparación de Rentabilidad por Negocio</h4>
                        <div class="chart-container">
                            <Bar
                                :data="allBusinessesComparisonChartData"
                                :options="allBusinessesComparisonChartOptions"
                            />
                        </div>
                    </div>
                </div>
                <!-- Empty state -->
                <div
                    v-else-if="!cargando && !error && !allBusinessesFinancialData?.resumen_general"
                    class="p-12 text-center"
                >
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">Selecciona un rango de fechas</p>
                        <p>Elige los filtros para generar el reporte de todos los negocios</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    exportToExcel,
    exportToPDF,
    getAllBusinessesFinancialStatement,
} from '@/services/TransactionFinancialService';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { DownloadIcon, FilterIcon, RefreshCwIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

// Registrar componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Estado del componente
const isDarkMode = ref(false);
const cargando = ref(false);
const error = ref('');
const allBusinessesFinancialData = ref({});

// Filtros
const filtros = ref({
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
    aplicarFiltros();
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// Colores dinámicos según tema
const colors = computed(() => ({
    primary: isDarkMode.value ? '#FB923C' : '#EA580C',
    secondary: isDarkMode.value ? '#38BDF8' : '#0EA5E9',
    success: isDarkMode.value ? '#4ADE80' : '#10B981',
    danger: isDarkMode.value ? '#F87171' : '#EF4444',
    warning: isDarkMode.value ? '#FBBF24' : '#F59E0B',
    text: isDarkMode.value ? 'rgba(229, 231, 235, 0.8)' : '#4B5563',
    grid: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBg: isDarkMode.value ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: isDarkMode.value ? '#FB923C' : '#EA580C',
}));

// Obtener estado financiero de todos los negocios
const obtenerAllBusinessesFinancialStatement = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getAllBusinessesFinancialStatement({
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
        });
        allBusinessesFinancialData.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching all businesses financial statement:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Ver detalles de un negocio específico
const verDetallesNegocio = negocioId => {
    // Aquí podrías redirigir a la vista de detalles de un negocio específico
    // Por ejemplo: router.push(`/estados-resultados?negocio_id=${negocioId}`)
    console.log('Ver detalles del negocio:', negocioId);
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
        await obtenerAllBusinessesFinancialStatement();
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

// Exportar a Excel
const exportarExcel = async () => {
    if (!allBusinessesFinancialData.value?.resumen_general) {
        error.value = 'No hay datos para exportar';
        return;
    }
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
        link.download = `Estados_de_Resultados_Todos_Negocios_${formatDate(
            filtros.value.fecha_final
        )}.xlsx`;
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
    if (!allBusinessesFinancialData.value?.resumen_general) {
        error.value = 'No hay datos para exportar';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportToPDF(filtros.value);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Estados_de_Resultados_Todos_Negocios_${formatDate(
            filtros.value.fecha_final
        )}.pdf`;
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
                    return ` ${context.dataset.label || ''}: $${value.toLocaleString('es-MX')}`;
                },
            },
        },
    },
}));

// Datos para gráfico de comparación de negocios
const allBusinessesComparisonChartData = computed(() => {
    if (!allBusinessesFinancialData.value?.negocios) return { labels: [], datasets: [] };
    const labels = allBusinessesFinancialData.value.negocios.map(negocio => negocio.negocio.nombre);
    const ingresos = allBusinessesFinancialData.value.negocios.map(negocio =>
        parseFloat(negocio.resumen_financiero.total_ingresos.replace(/,/g, ''))
    );
    const egresos = allBusinessesFinancialData.value.negocios.map(negocio =>
        parseFloat(negocio.resumen_financiero.total_egresos.replace(/,/g, ''))
    );
    return {
        labels,
        datasets: [
            {
                label: 'Ingresos',
                data: ingresos,
                backgroundColor: colors.value.success + 'CC',
                borderColor: colors.value.success,
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: 'Egresos',
                data: egresos,
                backgroundColor: colors.value.danger + 'CC',
                borderColor: colors.value.danger,
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };
});

const allBusinessesComparisonChartOptions = computed(() => ({
    ...baseChartOptions.value,
    scales: {
        x: {
            ticks: {
                color: colors.value.text,
                font: { weight: '500' },
            },
            grid: {
                color: colors.value.grid,
                drawBorder: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                color: colors.value.text,
                font: { weight: '500' },
                callback: value => '$' + value.toLocaleString('es-MX'),
            },
            grid: {
                color: colors.value.grid,
                drawBorder: false,
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
    @apply relative h-[300px];
}

.btn {
    @apply flex items-center justify-center py-2 px-5 rounded-full font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-orange-400 hover:bg-orange-500 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
}

.input-field {
    @apply w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200;
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
