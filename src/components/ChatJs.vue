<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <h1
            class="mb-10 text-3xl font-extrabold text-center text-transparent sm:text-4xl bg-gradient-to-r from-blazecart-yellow-400 to-blazecart-yellow-500 bg-clip-text"
        >
            Dashboard de Analíticas
        </h1>

        <!-- Tarjetas de estadísticas -->
        <div class="grid grid-cols-1 gap-6 mx-auto mb-10 md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
            <div class="stat-card">
                <div class="bg-blue-100 stat-icon dark:bg-blue-900/30">
                    <svg
                        class="w-8 h-8 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <h3 class="stat-title">Usuarios Totales</h3>
                    <p class="stat-value">1,248</p>
                    <p class="stat-change positive">+12.5% desde el mes pasado</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="bg-green-100 stat-icon dark:bg-green-900/30">
                    <svg
                        class="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <h3 class="stat-title">Conductores Activos</h3>
                    <p class="stat-value">86</p>
                    <p class="stat-change positive">+8.2% desde el mes pasado</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="bg-purple-100 stat-icon dark:bg-purple-900/30">
                    <svg
                        class="w-8 h-8 text-purple-600 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <h3 class="stat-title">Vehículos</h3>
                    <p class="stat-value">124</p>
                    <p class="stat-change positive">+5.7% desde el mes pasado</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon bg-amber-100 dark:bg-amber-900/30">
                    <svg
                        class="w-8 h-8 text-amber-600 dark:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <div class="stat-content">
                    <h3 class="stat-title">Transacciones</h3>
                    <p class="stat-value">3,456</p>
                    <p class="stat-change positive">+18.3% desde el mes pasado</p>
                </div>
            </div>
        </div>

        <!-- Grid de gráficos -->
        <div class="grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 xl:grid-cols-3 max-w-7xl">
            <!-- 1. Gráfico de Líneas - Ingresos Mensuales -->
            <div class="chart-card">
                <h3 class="chart-title">📈 Ingresos Mensuales</h3>
                <Line :data="lineChart.data" :options="lineChart.options" />
            </div>
            <!-- 2. Gráfico de Barras - Ingresos por Categoría -->
            <div class="chart-card">
                <h3 class="chart-title">📊 Ingresos por Categoría</h3>
                <Bar :data="barChart.data" :options="barChart.options" />
            </div>
            <!-- 3. Gráfico Circular - Distribución de Estados -->
            <div class="chart-card">
                <h3 class="chart-title">🥧 Distribución de Estados</h3>
                <Pie :data="pieChart.data" :options="pieChart.options" />
            </div>
            <!-- 4. Gráfico Donut - Egresos por Categoría -->
            <div class="chart-card">
                <h3 class="chart-title">🍩 Egresos por Categoría</h3>
                <Doughnut :data="doughnutChart.data" :options="doughnutChart.options" />
            </div>
            <!-- 5. Gráfico Radar - Comparación Ingresos vs Egresos -->
            <div class="chart-card">
                <h3 class="chart-title">🎯 Comparación Ingresos vs Egresos</h3>
                <Radar :data="radarChart.data" :options="radarChart.options" />
            </div>
            <!-- 6. Gráfico de Barras Apiladas - Margen por Mes -->
            <div class="chart-card">
                <h3 class="chart-title">📚 Margen por Mes</h3>
                <Bar :data="stackedBarChart.data" :options="stackedBarChart.options" />
            </div>
        </div>

        <!-- Controles interactivos -->
        <div
            class="max-w-lg p-6 mx-auto mt-10 text-center border border-gray-200 shadow-lg controls rounded-xl bg-white/50 dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-sm"
        >
            <h3 class="mb-5 text-xl font-semibold text-gray-800 dark:text-white">
                🎮 Controles Interactivos
            </h3>
            <div class="flex flex-wrap items-center justify-center gap-4">
                <button @click="fetchData" class="btn">
                    <RefreshCwIcon class="w-4 h-4 mr-2" />
                    Actualizar Datos
                </button>
                <button @click="toggleAnimation" class="btn">
                    <PlayIcon v-if="!animationsEnabled" class="w-4 h-4 mr-2" />
                    <PauseIcon v-else class="w-4 h-4 mr-2" />
                    {{ animationsEnabled ? 'Pausar' : 'Activar' }} Animaciones
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
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
import { PauseIcon, PlayIcon, RefreshCwIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Bar, Doughnut, Line, Pie, Radar } from 'vue-chartjs';

// Registra los componentes de Chart.js necesarios para los gráficos
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

// --- DETECCIÓN DE TEMA (MODO OSCURO) ---
const isDarkMode = ref(false);
const animationsEnabled = ref(true);

// Sincroniza el estado local `isDarkMode` con el tema global
const syncTheme = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
};

let observer;
onMounted(() => {
    syncTheme();
    observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});
onUnmounted(() => {
    if (observer) observer.disconnect();
});

// --- ESTILOS Y OPCIONES DE GRÁFICOS ---
const colors = computed(() => ({
    primary: isDarkMode.value ? '#FBBF24' : '#D97706',
    secondary: isDarkMode.value ? '#38BDF8' : '#0EA5E9',
    danger: isDarkMode.value ? '#F87171' : '#EF4444',
    success: isDarkMode.value ? '#34D399' : '#10B981',
    text: isDarkMode.value ? 'rgba(229, 231, 235, 0.8)' : '#4B5563',
    grid: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBg: isDarkMode.value ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    tooltipBorder: isDarkMode.value ? '#FBBF24' : '#D97706',
}));

const baseOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: animationsEnabled.value ? { duration: 1000, easing: 'easeInOutCubic' } : false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: { color: colors.value.text, usePointStyle: true, pointStyle: 'rectRounded' },
        },
        tooltip: {
            enabled: true,
            backgroundColor: colors.value.tooltipBg,
            titleColor: colors.value.primary,
            bodyColor: colors.value.text,
            borderColor: colors.value.tooltipBorder,
            borderWidth: 1,
            padding: 10,
            caretSize: 6,
            cornerRadius: 8,
            boxPadding: 4,
            callbacks: {
                label: context => ` ${context.dataset.label || ''}: ${context.formattedValue}`,
            },
        },
    },
    scales: {
        x: {
            ticks: { color: colors.value.text, font: { weight: '500' } },
            grid: { color: colors.value.grid, drawBorder: false },
        },
        y: {
            ticks: { color: colors.value.text, font: { weight: '500' } },
            grid: { color: colors.value.grid, drawBorder: false },
        },
    },
}));

// --- DATOS FICTICIOS ---
const financialData = ref({
    negocio_id: 1,
    year: 2025,
    month: 7,
    period: 'July 2025',
    total_ingresos_brutos: '15000.00',
    total_egresos_brutos: '12000.00',
    margen_bruto: '3000.00',
    margen_util_antes_de_impuestos: '3000.00',
    status_distribution: { Pagado: 2, 'Por Cobrar': 1, 'Pago Parcial': 1 },
    ingresos_por_categoria: {
        Servicios: { total: '10000.00', transacciones: 5, promedio: '2000.00' },
        Productos: { total: '5000.00', transacciones: 3, promedio: '1666.67' },
    },
    egresos_por_categoria: {
        Operativos: { total: '8000.00', transacciones: 4, promedio: '2000.00' },
        Administrativos: { total: '4000.00', transacciones: 2, promedio: '2000.00' },
    },
});

// --- CONFIGURACIÓN DE GRÁFICOS CON DATOS FICTICIOS ---
const lineChart = computed(() => {
    const data = financialData.value;
    const months = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ];

    // Generar datos aleatorios para cada mes
    const monthlyIncomes = months.map((_, index) => {
        if (index === data.month - 1) {
            return parseFloat(data.total_ingresos_brutos);
        }
        return Math.floor(Math.random() * 10000) + 5000;
    });

    return {
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Ingresos',
                    data: monthlyIncomes,
                    borderColor: colors.value.primary,
                    backgroundColor: colors.value.primary + '33',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.value.primary,
                    pointBorderColor: '#fff',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: colors.value.primary,
                },
            ],
        },
        options: baseOptions.value,
    };
});

const barChart = computed(() => {
    const data = financialData.value;

    // Agregar más categorías ficticias
    const categories = {
        ...data.ingresos_por_categoria,
        Suscripciones: { total: '7500.00', transacciones: 12, promedio: '625.00' },
        Licencias: { total: '3500.00', transacciones: 7, promedio: '500.00' },
    };

    return {
        data: {
            labels: Object.keys(categories),
            datasets: [
                {
                    label: 'Ingresos',
                    data: Object.values(categories).map(item => parseFloat(item.total)),
                    backgroundColor: [
                        colors.value.primary + 'CC',
                        colors.value.secondary + 'CC',
                        colors.value.success + 'CC',
                        colors.value.danger + 'CC',
                        'rgba(139, 92, 246, 0.8)',
                    ],
                    borderRadius: 6,
                    borderWidth: 2,
                    borderColor: 'transparent',
                },
            ],
        },
        options: baseOptions.value,
    };
});

const pieChart = computed(() => {
    const data = financialData.value;

    // Agregar más estados ficticios
    const statusDistribution = {
        ...data.status_distribution,
        Pendiente: 3,
        Cancelado: 1,
    };

    return {
        data: {
            labels: Object.keys(statusDistribution),
            datasets: [
                {
                    data: Object.values(statusDistribution),
                    backgroundColor: [
                        colors.value.secondary,
                        colors.value.primary,
                        colors.value.danger,
                        colors.value.success,
                        'rgba(139, 92, 246, 0.8)',
                    ],
                    hoverOffset: 8,
                    borderColor: isDarkMode.value ? '#111827' : '#F9FAFB',
                    borderWidth: 4,
                },
            ],
        },
        options: { ...baseOptions.value, scales: {} },
    };
});

const doughnutChart = computed(() => {
    const data = financialData.value;

    // Agregar más categorías de egresos ficticias
    const expenseCategories = {
        ...data.egresos_por_categoria,
        Marketing: { total: '2500.00', transacciones: 3, promedio: '833.33' },
        Tecnología: { total: '3500.00', transacciones: 5, promedio: '700.00' },
    };

    return {
        data: {
            labels: Object.keys(expenseCategories),
            datasets: [
                {
                    data: Object.values(expenseCategories).map(item => parseFloat(item.total)),
                    backgroundColor: [
                        colors.value.primary,
                        colors.value.secondary,
                        colors.value.danger,
                        colors.value.success,
                        'rgba(139, 92, 246, 0.8)',
                    ],
                    hoverOffset: 8,
                    borderColor: isDarkMode.value ? '#111827' : '#F9FAFB',
                    borderWidth: 4,
                },
            ],
        },
        options: { ...baseOptions.value, scales: {}, cutout: '65%' },
    };
});

const radarChart = computed(() => {
    const data = financialData.value;

    // Usar todas las categorías combinadas
    const categories = [
        ...Object.keys(data.ingresos_por_categoria),
        ...Object.keys(data.egresos_por_categoria),
    ];

    // Eliminar duplicados
    const uniqueCategories = [...new Set(categories)];

    return {
        data: {
            labels: uniqueCategories,
            datasets: [
                {
                    label: 'Ingresos',
                    data: uniqueCategories.map(cat => {
                        if (data.ingresos_por_categoria[cat]) {
                            return parseFloat(data.ingresos_por_categoria[cat].total);
                        }
                        return Math.floor(Math.random() * 8000) + 2000;
                    }),
                    borderColor: colors.value.primary,
                    backgroundColor: colors.value.primary + '40',
                    pointBackgroundColor: colors.value.primary,
                },
                {
                    label: 'Egresos',
                    data: uniqueCategories.map(cat => {
                        if (data.egresos_por_categoria[cat]) {
                            return parseFloat(data.egresos_por_categoria[cat].total);
                        }
                        return Math.floor(Math.random() * 6000) + 1000;
                    }),
                    borderColor: colors.value.secondary,
                    backgroundColor: colors.value.secondary + '40',
                    pointBackgroundColor: colors.value.secondary,
                },
            ],
        },
        options: {
            ...baseOptions.value,
            scales: {
                r: {
                    angleLines: { color: colors.value.grid },
                    grid: { color: colors.value.grid },
                    pointLabels: { color: colors.value.text, font: { size: 12 } },
                    ticks: { color: colors.value.text, backdropColor: 'transparent' },
                },
            },
        },
    };
});

const stackedBarChart = computed(() => {
    const data = financialData.value;
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    // Generar datos ficticios para cada trimestre
    const margins = quarters.map((_, index) => {
        if (index === 2) {
            // Q3
            return parseFloat(data.margen_bruto);
        }
        return Math.floor(Math.random() * 5000) + 1000;
    });

    const expenses = quarters.map((_, index) => {
        if (index === 2) {
            // Q3
            return parseFloat(data.total_egresos_brutos);
        }
        return Math.floor(Math.random() * 10000) + 5000;
    });

    return {
        data: {
            labels: quarters,
            datasets: [
                {
                    label: 'Margen',
                    data: margins,
                    backgroundColor: colors.value.primary,
                    borderRadius: 6,
                },
                {
                    label: 'Egresos',
                    data: expenses,
                    backgroundColor: colors.value.danger,
                    borderRadius: 6,
                },
            ],
        },
        options: {
            ...baseOptions.value,
            scales: {
                x: { ...baseOptions.value.scales.x, stacked: true },
                y: { ...baseOptions.value.scales.y, stacked: true },
            },
        },
    };
});

// --- CONTROLES INTERACTIVOS ---
const fetchData = () => {
    // Simular la actualización de datos con nuevos valores aleatorios
    financialData.value = {
        negocio_id: 1,
        year: 2025,
        month: 7,
        period: 'July 2025',
        total_ingresos_brutos: (Math.floor(Math.random() * 10000) + 10000).toFixed(2),
        total_egresos_brutos: (Math.floor(Math.random() * 8000) + 8000).toFixed(2),
        margen_bruto: (Math.floor(Math.random() * 5000) + 2000).toFixed(2),
        margen_util_antes_de_impuestos: (Math.floor(Math.random() * 5000) + 2000).toFixed(2),
        status_distribution: {
            Pagado: Math.floor(Math.random() * 10) + 1,
            'Por Cobrar': Math.floor(Math.random() * 5) + 1,
            'Pago Parcial': Math.floor(Math.random() * 5) + 1,
            Pendiente: Math.floor(Math.random() * 5) + 1,
            Cancelado: Math.floor(Math.random() * 3) + 1,
        },
        ingresos_por_categoria: {
            Servicios: {
                total: (Math.floor(Math.random() * 8000) + 5000).toFixed(2),
                transacciones: Math.floor(Math.random() * 10) + 5,
                promedio: (Math.floor(Math.random() * 1000) + 1000).toFixed(2),
            },
            Productos: {
                total: (Math.floor(Math.random() * 5000) + 3000).toFixed(2),
                transacciones: Math.floor(Math.random() * 8) + 2,
                promedio: (Math.floor(Math.random() * 1000) + 1000).toFixed(2),
            },
            Suscripciones: {
                total: (Math.floor(Math.random() * 6000) + 4000).toFixed(2),
                transacciones: Math.floor(Math.random() * 15) + 5,
                promedio: (Math.floor(Math.random() * 500) + 300).toFixed(2),
            },
            Licencias: {
                total: (Math.floor(Math.random() * 4000) + 2000).toFixed(2),
                transacciones: Math.floor(Math.random() * 10) + 2,
                promedio: (Math.floor(Math.random() * 800) + 200).toFixed(2),
            },
        },
        egresos_por_categoria: {
            Operativos: {
                total: (Math.floor(Math.random() * 6000) + 4000).toFixed(2),
                transacciones: Math.floor(Math.random() * 8) + 2,
                promedio: (Math.floor(Math.random() * 1000) + 1000).toFixed(2),
            },
            Administrativos: {
                total: (Math.floor(Math.random() * 4000) + 2000).toFixed(2),
                transacciones: Math.floor(Math.random() * 6) + 1,
                promedio: (Math.floor(Math.random() * 1000) + 500).toFixed(2),
            },
            Marketing: {
                total: (Math.floor(Math.random() * 3000) + 1000).toFixed(2),
                transacciones: Math.floor(Math.random() * 5) + 1,
                promedio: (Math.floor(Math.random() * 800) + 200).toFixed(2),
            },
            Tecnología: {
                total: (Math.floor(Math.random() * 4000) + 2000).toFixed(2),
                transacciones: Math.floor(Math.random() * 7) + 2,
                promedio: (Math.floor(Math.random() * 800) + 300).toFixed(2),
            },
        },
    };
};

const toggleAnimation = () => {
    animationsEnabled.value = !animationsEnabled.value;
};
</script>

<style scoped>
/* Tarjetas de estadísticas */
.stat-card {
    @apply flex items-center p-6 bg-white rounded-xl shadow-md dark:bg-gray-800 transition-all duration-300 hover:shadow-lg;
}

.stat-icon {
    @apply flex items-center justify-center p-3 rounded-lg mr-4;
}

.stat-content {
    @apply flex-1;
}

.stat-title {
    @apply text-sm font-medium text-gray-500 dark:text-gray-400;
}

.stat-value {
    @apply text-2xl font-bold text-gray-900 dark:text-white mt-1;
}

.stat-change {
    @apply text-sm mt-1;
}

.stat-change.positive {
    @apply text-green-600 dark:text-green-400;
}

.stat-change.negative {
    @apply text-red-600 dark:text-red-400;
}

/* Gráficos */
.chart-card {
    @apply p-4 sm:p-6 rounded-2xl shadow-lg h-[400px] transition-all duration-300 ease-in-out border bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm;
    animation: fadeInUp 0.5s ease-out forwards;
}

.chart-card:hover {
    @apply transform -translate-y-1 shadow-2xl bg-white dark:bg-gray-800;
}

.chart-title {
    @apply text-center text-base sm:text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200;
}

/* Botones */
.btn {
    @apply flex items-center justify-center py-2 px-5 rounded-full font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-blazecart-yellow-400 text-black hover:bg-blazecart-yellow-500 hover:shadow-lg transform hover:-translate-y-0.5;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-blazecart-yellow-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
}

/* Animaciones */
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
.chart-card:nth-child(3) {
    animation-delay: 0.15s;
}
.chart-card:nth-child(4) {
    animation-delay: 0.2s;
}
.chart-card:nth-child(5) {
    animation-delay: 0.25s;
}
.chart-card:nth-child(6) {
    animation-delay: 0.3s;
}
</style>
