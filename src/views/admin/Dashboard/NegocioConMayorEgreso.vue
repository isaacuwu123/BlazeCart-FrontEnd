<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-red-500 to-red-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    NEGOCIO CON MAYOR EGRESO
                </h1>
                <div v-if="negocioMayorEgreso?.negocio?.nombre" class="mt-2 text-center">
                    <p class="text-lg font-semibold">
                        {{ negocioMayorEgreso?.negocio?.nombre }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                </div>
            </div>

            <!-- Contenido Principal -->
            <div
                class="transition-colors duration-300 border-b border-gray-200 rounded-b-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-x dark:border-gray-700"
            >
                <!-- Contenido de Negocio con Mayor Egreso -->
                <div v-if="cargando" class="flex items-center justify-center p-12">
                    <div class="text-center">
                        <RefreshCwIcon class="w-8 h-8 mx-auto mb-4 text-red-500 animate-spin" />
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
                <!-- Negocio con Mayor Egreso -->
                <div
                    v-else-if="negocioMayorEgreso?.negocio"
                    class="grid grid-cols-1 gap-6 p-6 xl:grid-cols-3"
                >
                    <!-- Información Principal -->
                    <div class="xl:col-span-2">
                        <div class="p-6 mb-6 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-xl font-bold text-red-800 dark:text-red-200">
                                        {{ negocioMayorEgreso.negocio.nombre }}
                                    </h3>
                                    <p class="text-red-600 dark:text-red-400">
                                        Negocio con mayor egreso histórico
                                    </p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div class="p-4 bg-red-100 rounded-lg dark:bg-red-900/30">
                                    <p class="text-sm text-red-600 dark:text-red-400">
                                        Total de egresos
                                    </p>
                                    <p class="text-2xl font-bold text-red-800 dark:text-red-200">
                                        ${{ negocioMayorEgreso.negocio.total_egresos }}
                                    </p>
                                </div>
                                <div class="p-4 bg-red-100 rounded-lg dark:bg-red-900/30">
                                    <p class="text-sm text-red-600 dark:text-red-400">
                                        Cantidad de transacciones
                                    </p>
                                    <p class="text-2xl font-bold text-red-800 dark:text-red-200">
                                        {{ negocioMayorEgreso.negocio.cantidad_transacciones }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Tabla de Desglose por Categoría -->
                        <div v-if="negocioMayorEgreso.desglose_categorias?.length">
                            <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Desglose por categorías
                            </h3>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                            >
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-3 gap-4 text-sm font-semibold">
                                        <div>CATEGORÍA</div>
                                        <div>TOTAL</div>
                                        <div>PORCENTAJE</div>
                                    </div>
                                </div>
                                <div
                                    v-for="categoria in negocioMayorEgreso.desglose_categorias"
                                    :key="categoria.id"
                                    class="grid grid-cols-3 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="font-medium text-gray-900 dark:text-gray-100">
                                        {{ categoria.nombre }}
                                    </div>
                                    <div class="font-semibold text-red-600 dark:text-red-400">
                                        ${{ categoria.total_categoria }}
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{ categoria.porcentaje }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Gráfico de Desglose por Categoría -->
                    <div class="flex flex-col h-full chart-card">
                        <h4 class="chart-title">📊 Desglose por Categoría</h4>
                        <div class="flex-grow chart-container">
                            <Doughnut
                                :data="negocioMayorEgresoChartData"
                                :options="negocioMayorEgresoChartOptions"
                            />
                        </div>
                    </div>
                </div>
                <!-- Empty state -->
                <div
                    v-else-if="!cargando && !error && !negocioMayorEgreso?.negocio"
                    class="p-12 text-center"
                >
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">No hay datos disponibles</p>
                        <p>No se encontraron registros de egresos en el sistema</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import { getFinancialTransacctionsBusinessHighestExpense } from '@/services/TransactionFinancialService';
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
import { FilterIcon, RefreshCwIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';

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
const negocioMayorEgreso = ref({});

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
    aplicarFiltros(); // Cargar datos automáticamente al montar el componente
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

// Obtener negocio con mayor egreso
const obtenerNegocioMayorEgreso = async () => {
    try {
        const { data } = await getFinancialTransacctionsBusinessHighestExpense({});
        negocioMayorEgreso.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching business with highest expense:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Aplicar filtros
const aplicarFiltros = async () => {
    cargando.value = true;
    error.value = '';
    try {
        await obtenerNegocioMayorEgreso();
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

// Datos para gráfico de negocio con mayor egreso
const negocioMayorEgresoChartData = computed(() => {
    if (!negocioMayorEgreso.value?.desglose_categorias) return { labels: [], datasets: [] };
    const categorias = negocioMayorEgreso.value.desglose_categorias.map(item => item.nombre);
    const valores = negocioMayorEgreso.value.desglose_categorias.map(item =>
        parseFloat(item.total_categoria.replace(/,/g, ''))
    );
    return {
        labels: categorias,
        datasets: [
            {
                data: valores,
                backgroundColor: [
                    colors.value.primary,
                    colors.value.secondary,
                    colors.value.success,
                    colors.value.danger,
                    colors.value.warning,
                    '#8B5CF6',
                    '#EC4899',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                ],
                borderWidth: 3,
                borderColor: isDarkMode.value ? '#111827' : '#ffffff',
                hoverOffset: 8,
            },
        ],
    };
});

const negocioMayorEgresoChartOptions = computed(() => ({
    ...baseChartOptions.value,
    scales: {},
    cutout: '60%',
    plugins: {
        ...baseChartOptions.value.plugins,
        tooltip: {
            ...baseChartOptions.value.plugins.tooltip,
            callbacks: {
                label: context => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                    return ` ${context.label}: $${value.toLocaleString('es-MX')} (${percentage}%)`;
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
    @apply relative h-[300px];
}

.btn {
    @apply flex items-center justify-center py-2 px-5 rounded-full font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-red-400 hover:bg-red-500 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-red-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
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
