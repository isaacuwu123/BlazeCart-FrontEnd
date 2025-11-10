<template>
    <div
        class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
        <!-- Animated Background Elements -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute rounded-full top-20 left-10 w-96 h-96 bg-amber-200/10 dark:bg-amber-500/5 animate-pulse blur-3xl"
            ></div>
            <div
                class="absolute rounded-full bottom-20 right-10 w-[32rem] h-[32rem] bg-orange-200/10 dark:bg-orange-500/5 animate-pulse blur-3xl"
                style="animation-delay: 1s"
            ></div>
            <div
                class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-80 h-80 top-1/2 left-1/2 bg-red-200/10 dark:bg-red-500/5 animate-ping blur-3xl"
                style="animation-delay: 2s"
            ></div>
        </div>

        <div class="relative z-10 p-4 sm:p-6 lg:p-8">
            <div class="mx-auto max-w-[1600px]">
                <!-- Enhanced Header -->
                <div class="mb-8 text-center animate-fade-in">
                    <div
                        class="inline-flex items-center gap-3 px-8 py-4 mb-6 transition-all duration-300 border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50 hover:shadow-3xl hover:scale-105 group"
                    >
                        <div class="relative">
                            <div
                                class="p-3 transition-transform duration-300 shadow-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl group-hover:scale-110 group-hover:rotate-3"
                            >
                                <BarChart3Icon class="text-white w-7 h-7" :stroke-width="2.5" />
                            </div>
                            <div
                                class="absolute flex items-center justify-center w-6 h-6 border-2 border-white rounded-full shadow-lg -top-2 -right-2 bg-emerald-400 animate-pulse"
                            >
                                <SparklesIcon class="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <h1
                            class="text-3xl font-black text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text dark:from-amber-400 dark:to-orange-400 sm:text-2xl"
                        >
                            Dashboard del Conductor
                        </h1>
                    </div>
                    <p
                        class="max-w-2xl mx-auto text-base text-slate-600 dark:text-slate-300 sm:text-sm"
                    >
                        Bienvenido a tu panel de control. Aquí puedes ver todas tus estadísticas,
                        rutas recientes y gestionar tu disponibilidad.
                    </p>
                </div>

                <!-- Enhanced Stats Grid -->
                <div class="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Active Routes Card -->
                    <div
                        class="relative overflow-hidden transition-all duration-500 border shadow-xl group bg-white/95 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:scale-105 border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 dark:from-emerald-500/5 dark:to-teal-600/5"
                        ></div>
                        <div
                            class="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-2xl"
                        ></div>

                        <div class="relative p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="p-4 transition-all duration-300 shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110"
                                >
                                    <ZapIcon class="text-white w-7 h-7" :stroke-width="2.5" />
                                </div>
                                <div class="text-right">
                                    <p class="text-4xl font-black text-slate-900 dark:text-white">
                                        {{ stats.activeRoutes }}
                                    </p>
                                    <div class="flex items-center justify-end mt-1">
                                        <TrendingUpIcon class="w-4 h-4 text-emerald-500" />
                                        <span
                                            class="ml-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                                            >+12%</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <h3
                                class="text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300"
                            >
                                Rutas Activas
                            </h3>
                        </div>
                    </div>

                    <!-- Pending Docs Card -->
                    <div
                        class="relative overflow-hidden transition-all duration-500 border shadow-xl group bg-white/95 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:scale-105 border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 dark:from-amber-500/5 dark:to-orange-600/5"
                        ></div>
                        <div
                            class="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-2xl"
                        ></div>

                        <div class="relative p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="p-4 transition-all duration-300 shadow-2xl bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110"
                                >
                                    <FileTextIcon class="text-white w-7 h-7" :stroke-width="2.5" />
                                </div>
                                <div class="text-right">
                                    <p class="text-4xl font-black text-slate-900 dark:text-white">
                                        {{ stats.pendingDocs }}
                                    </p>
                                    <div class="flex items-center justify-end mt-1">
                                        <TrendingDownIcon class="w-4 h-4 text-amber-500" />
                                        <span
                                            class="ml-1 text-xs font-semibold text-amber-600 dark:text-amber-400"
                                            >+5%</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <h3
                                class="text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300"
                            >
                                Documentos Pendientes
                            </h3>
                        </div>
                    </div>

                    <!-- Miles Driven Card -->
                    <div
                        class="relative overflow-hidden transition-all duration-500 border shadow-xl group bg-white/95 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:scale-105 border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 dark:from-blue-500/5 dark:to-indigo-600/5"
                        ></div>
                        <div
                            class="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/20 blur-2xl"
                        ></div>

                        <div class="relative p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="p-4 transition-all duration-300 shadow-2xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110"
                                >
                                    <ActivityIcon class="text-white w-7 h-7" :stroke-width="2.5" />
                                </div>
                                <div class="text-right">
                                    <p class="text-4xl font-black text-slate-900 dark:text-white">
                                        {{ stats.milesDriven.toLocaleString() }}
                                    </p>
                                    <div class="flex items-center justify-end mt-1">
                                        <TrendingUpIcon class="w-4 h-4 text-blue-500" />
                                        <span
                                            class="ml-1 text-xs font-semibold text-blue-600 dark:text-blue-400"
                                            >+8%</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <h3
                                class="text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300"
                            >
                                Millas Recorridas
                            </h3>
                        </div>
                    </div>

                    <!-- Next Maintenance Card -->
                    <div
                        class="relative overflow-hidden transition-all duration-500 border shadow-xl group bg-white/95 backdrop-blur-xl rounded-3xl hover:shadow-2xl hover:scale-105 border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                    >
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 dark:from-purple-500/5 dark:to-pink-600/5"
                        ></div>
                        <div
                            class="absolute top-0 right-0 w-32 h-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-2xl"
                        ></div>

                        <div class="relative p-6">
                            <div class="flex items-center justify-between mb-4">
                                <div
                                    class="p-4 transition-all duration-300 shadow-2xl bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110"
                                >
                                    <SettingsIcon class="text-white w-7 h-7" :stroke-width="2.5" />
                                </div>
                                <div class="text-right">
                                    <p class="text-4xl font-black text-slate-900 dark:text-white">
                                        {{ stats.nextMaintenance.toLocaleString() }}
                                    </p>
                                    <span
                                        class="text-sm font-semibold text-slate-500 dark:text-slate-400"
                                        >mi</span
                                    >
                                    <div class="flex items-center justify-end mt-1">
                                        <ClockIcon class="w-4 h-4 text-purple-500" />
                                        <span
                                            class="ml-1 text-xs font-semibold text-purple-600 dark:text-purple-400"
                                            >En 15 días</span
                                        >
                                    </div>
                                </div>
                            </div>
                            <h3
                                class="text-sm font-bold tracking-wider uppercase text-slate-600 dark:text-slate-300"
                            >
                                Próximo Mantenimiento
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Quick Actions -->
                <div
                    class="mb-8 overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                >
                    <div class="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
                        <div class="flex items-center gap-4">
                            <div
                                class="p-3 shadow-xl bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl"
                            >
                                <ZapIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                            </div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">
                                Acciones Rápidas
                            </h3>
                        </div>
                    </div>
                    <div class="p-8">
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <button
                                @click="updateAvailability(true)"
                                class="relative px-6 py-6 overflow-hidden font-bold text-white transition-all duration-500 transform shadow-2xl group bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl hover:shadow-3xl hover:scale-105 hover:from-emerald-600 hover:to-teal-700 active:scale-95"
                            >
                                <div
                                    class="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 bg-white/20 group-hover:scale-x-100"
                                ></div>
                                <div class="relative flex items-center justify-center gap-3">
                                    <CheckCircle2Icon class="w-6 h-6" :stroke-width="2.5" />
                                    <span class="text-lg">Marcar como Disponible</span>
                                </div>
                            </button>

                            <button
                                @click="updateAvailability(false)"
                                class="relative px-6 py-6 overflow-hidden font-bold text-white transition-all duration-500 transform shadow-2xl group bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl hover:shadow-3xl hover:scale-105 hover:from-red-600 hover:to-pink-700 active:scale-95"
                            >
                                <div
                                    class="absolute inset-0 transition-transform duration-500 origin-left transform scale-x-0 bg-white/20 group-hover:scale-x-100"
                                ></div>
                                <div class="relative flex items-center justify-center gap-3">
                                    <XCircleIcon class="w-6 h-6" :stroke-width="2.5" />
                                    <span class="text-lg">Marcar como No Disponible</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Recent Routes -->
                <div
                    class="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl border-white/50 dark:bg-slate-800/95 dark:border-slate-700/50"
                >
                    <div class="p-8 border-b border-slate-200/50 dark:border-slate-700/50">
                        <div
                            class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
                        >
                            <div class="flex items-center gap-4">
                                <div
                                    class="p-3 shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl"
                                >
                                    <MapIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                                </div>
                                <h3 class="text-xl font-black text-slate-900 dark:text-white">
                                    Rutas Recientes
                                </h3>
                            </div>
                            <button
                                class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 transition-all duration-200 border rounded-xl bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 border-blue-200/50 dark:border-blue-700/50 hover:scale-105 active:scale-95"
                            >
                                <ArrowRightIcon class="w-4 h-4" />
                                <span>Ver todas</span>
                            </button>
                        </div>
                    </div>

                    <div class="p-8">
                        <div
                            class="space-y-4 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 dark:scrollbar-thumb-slate-700 dark:hover:scrollbar-thumb-slate-600"
                        >
                            <div
                                v-for="route in recentRoutes"
                                :key="route.id"
                                class="flex flex-col gap-4 p-6 transition-all duration-500 border shadow-lg sm:flex-row sm:items-center sm:justify-between group bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl hover:from-blue-50/90 hover:to-indigo-50/90 dark:from-slate-700/50 dark:to-slate-600/50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border-slate-200/50 hover:border-blue-300/50 hover:shadow-xl hover:scale-[1.02]"
                            >
                                <div class="flex items-center gap-4">
                                    <div class="relative">
                                        <div
                                            class="p-3 transition-transform duration-500 shadow-xl rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:scale-110 group-hover:rotate-6"
                                        >
                                            <MapPinIcon
                                                class="w-5 h-5 text-white"
                                                :stroke-width="2.5"
                                            />
                                        </div>
                                        <div
                                            class="absolute flex items-center justify-center w-5 h-5 border-2 border-white rounded-full -top-2 -right-2 bg-emerald-400"
                                        >
                                            <CheckIcon class="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <span
                                            class="text-lg font-bold text-slate-900 dark:text-slate-100"
                                        >
                                            {{ route.origin }} → {{ route.destination }}
                                        </span>
                                        <div
                                            class="flex items-center mt-1 text-sm text-slate-500 dark:text-slate-400"
                                        >
                                            <ClockIcon class="w-4 h-4 mr-1" />
                                            {{ route.date }}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span
                                        class="flex items-center gap-1.5 px-4 py-2 text-sm font-bold border rounded-full text-blue-700 bg-blue-100/80 backdrop-blur-sm border-blue-200/50 dark:text-blue-300 dark:bg-blue-900/50 dark:border-blue-700/50"
                                    >
                                        <RouteIcon class="w-4 h-4" />
                                        {{ route.miles }} mi
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getDriverDashboardData } from '@/services/DashboardDriverService';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import {
    ActivityIcon,
    ArrowRightIcon,
    BarChart3Icon,
    CheckCircle2Icon,
    CheckIcon,
    ClockIcon,
    FileTextIcon,
    MapIcon,
    MapPinIcon,
    RouteIcon,
    SettingsIcon,
    SparklesIcon,
    TrendingDownIcon,
    TrendingUpIcon,
    XCircleIcon,
    ZapIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const router = useRouter();

// State
const stats = ref({
    activeRoutes: 0,
    pendingDocs: 0,
    milesDriven: 0,
    nextMaintenance: 0,
});

const recentRoutes = ref([]);
const financialData = ref(null);
const fallbackData = ref(null);
const error = ref(null);

// Fallback data generator
const generateFallbackData = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    return {
        negocio_id: 1,
        year,
        month,
        period: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
        total_ingresos_brutos: '10000.00',
        total_egresos_brutos: '4500.00',
        margen_bruto: '5500.00',
        margen_util_antes_de_impuestos: '5500.00',
        status_distribution: { Pagado: 70, 'Por Cobrar': 30 },
        ingresos_por_categoria: {
            Combustible: { total: '6000.00', transacciones: 5, promedio: '1200.00' },
            Mantenimiento: { total: '4000.00', transacciones: 3, promedio: '1333.33' },
        },
        egresos_por_categoria: {
            Combustible: { total: '3000.00', transacciones: 2, promedio: '1500.00' },
            Mantenimiento: { total: '1500.00', transacciones: 1, promedio: '1500.00' },
        },
    };
};

// Charts configuration
const statusChart = computed(() => ({
    data: {
        labels: (financialData.value || fallbackData.value)?.status_distribution
            ? Object.keys((financialData.value || fallbackData.value).status_distribution)
            : [],
        datasets: [
            {
                data: (financialData.value || fallbackData.value)?.status_distribution
                    ? Object.values((financialData.value || fallbackData.value).status_distribution)
                    : [],
                backgroundColor: [
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderColor: [
                    'rgb(245, 158, 11)',
                    'rgb(16, 185, 129)',
                    'rgb(59, 130, 246)',
                    'rgb(239, 68, 68)',
                ],
                borderWidth: 3,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 25,
                    usePointStyle: true,
                    font: {
                        size: 13,
                        weight: '600',
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    },
                },
            },
        },
    },
}));

const incomeChart = computed(() => ({
    data: {
        labels: (financialData.value || fallbackData.value)?.egresos_por_categoria
            ? Object.keys((financialData.value || fallbackData.value).egresos_por_categoria)
            : [],
        datasets: [
            {
                label: 'Egresos',
                data: (financialData.value || fallbackData.value)?.egresos_por_categoria
                    ? Object.values(
                          (financialData.value || fallbackData.value).egresos_por_categoria
                      ).map(cat => cat.total)
                    : [],
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderColor: 'rgb(239, 68, 68)',
                borderWidth: 3,
                borderRadius: 12,
                borderSkipped: false,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 12,
                boxPadding: 6,
                callbacks: {
                    label: function (context) {
                        return `$${context.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: value => `$${value}`,
                    font: {
                        size: 12,
                        weight: '600',
                    },
                },
                grid: {
                    color: 'rgba(156, 163, 175, 0.2)',
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                        weight: '600',
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
    },
}));

// Methods
const fetchDashboardData = async () => {
    try {
        const { data } = await getDriverDashboardData();
        console.log('[Dashboard] Data loaded:', data);

        stats.value = data.data.stats;
        recentRoutes.value = data.data.recentRoutes;

        if (data.data.financialData) {
            financialData.value = data.data.financialData;
            fallbackData.value = null;
            error.value = null;
        }
    } catch (err) {
        console.error('[Dashboard] Error loading data:', err);
        fallbackData.value = generateFallbackData();
    }
};

const updateAvailability = available => {
    stats.value.activeRoutes = available ? stats.value.activeRoutes + 1 : stats.value.activeRoutes;

    // Enhanced notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-5 rounded-2xl shadow-2xl text-white z-50 backdrop-blur-xl border-2 transition-all duration-500 transform ${
        available
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 border-emerald-400'
            : 'bg-gradient-to-r from-red-500 to-pink-600 border-red-400'
    }`;

    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="p-2 bg-white/20 rounded-xl">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    ${
                        available
                            ? '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>'
                            : '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>'
                    }
                </svg>
            </div>
            <span class="font-bold">Estado actualizado a ${
                available ? 'Disponible' : 'No Disponible'
            }</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
};

const navigateToNewTransaction = () => {
    router.push('/driver/transactions/create');
};

const navigateToDocuments = () => {
    router.push('/driver/documents');
};

// Lifecycle
onMounted(async () => {
    await fetchDashboardData();
    console.log('[Dashboard] Mounted at', new Date().toLocaleString());
});
</script>

<style scoped>
/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
    background: rgb(203 213 225);
    border-radius: 3px;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb:hover {
    background: rgb(148 163 184);
}

.dark .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb {
    background: rgb(51 65 85);
    border-radius: 3px;
}

.dark .scrollbar-thumb-slate-700::-webkit-scrollbar-thumb:hover {
    background: rgb(71 85 105);
}

/* Fade in animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}
</style>
