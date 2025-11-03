<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    RESUMEN DE CAJAS OPERATIVAS
                </h1>
                <div class="mt-2 text-center">
                    <p class="text-lg font-semibold">
                        {{ formatDate(filtros.fecha_inicio) }} - {{ formatDate(filtros.fecha_fin) }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button @click="exportarPDF" :disabled="cargando || !cajas.length" class="btn">
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar PDF
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargando || !cajas.length"
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
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Fecha Inicial
                        </label>
                        <input
                            v-model="filtros.fecha_inicio"
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
                            v-model="filtros.fecha_fin"
                            type="date"
                            class="input-field"
                            @change="aplicarFiltros"
                        />
                    </div>
                    <div class="flex items-end">
                        <button
                            @click="aplicarFiltros"
                            :disabled="!filtros.fecha_inicio || !filtros.fecha_fin || cargando"
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
                <!-- Contenido de Resumen de Cajas -->
                <div v-if="cargando" class="flex items-center justify-center p-12">
                    <div class="text-center">
                        <RefreshCwIcon class="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
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
                <!-- Resumen de Cajas -->
                <div v-else-if="cajas.length > 0" class="p-6">
                    <!-- Resumen General -->
                    <div
                        class="p-6 mb-8 shadow-lg rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700"
                    >
                        <h2
                            class="mb-6 text-xl font-bold text-center text-gray-800 dark:text-gray-200"
                        >
                            Resumen General del Período
                        </h2>
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div
                                class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800"
                            >
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Ingresos
                                </p>
                                <p
                                    class="mt-2 text-2xl font-bold text-green-600 dark:text-green-400"
                                >
                                    ${{
                                        totalIngresosGeneral.toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </p>
                            </div>
                            <div
                                class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800"
                            >
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Egresos
                                </p>
                                <p class="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
                                    ${{
                                        totalEgresosGeneral.toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </p>
                            </div>
                            <div
                                class="p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800"
                            >
                                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Saldo Final
                                </p>
                                <p
                                    :class="[
                                        'mt-2 text-2xl font-bold',
                                        saldoFinalGeneral >= 0
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400',
                                    ]"
                                >
                                    ${{
                                        saldoFinalGeneral.toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Resumen de Cajas -->
                    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                        <div v-for="caja in cajas" :key="caja.caja.id" class="summary-card">
                            <h3 class="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                                {{ caja.caja.nombre }}
                            </h3>
                            <div class="space-y-3">
                                <div
                                    class="bg-green-100 border-green-200 summary-item dark:bg-green-900/30 dark:border-green-700"
                                >
                                    <span class="font-medium text-green-800 dark:text-green-200"
                                        >Total Ingresos</span
                                    >
                                    <span
                                        class="text-lg font-bold text-green-800 dark:text-green-200"
                                    >
                                        ${{
                                            parseFloat(caja.resumen.total_ingresos).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-red-100 border-red-200 summary-item dark:bg-red-900/30 dark:border-red-700"
                                >
                                    <span class="font-medium text-red-800 dark:text-red-200"
                                        >Total Egresos</span
                                    >
                                    <span class="text-lg font-bold text-red-800 dark:text-red-200">
                                        ${{
                                            parseFloat(caja.resumen.total_egresos).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-purple-100 border-purple-200 summary-item dark:bg-purple-900/30 dark:border-purple-700"
                                >
                                    <span class="font-medium text-purple-800 dark:text-purple-200"
                                        >Saldo Final</span
                                    >
                                    <span
                                        :class="[
                                            'text-lg font-bold',
                                            caja.resumen.saldo_final >= 0
                                                ? 'text-green-800 dark:text-green-200'
                                                : 'text-red-800 dark:text-red-200',
                                        ]"
                                    >
                                        ${{
                                            parseFloat(caja.resumen.saldo_final).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Empty state -->
                <div v-else-if="!cargando && !error && cajas.length === 0" class="p-12 text-center">
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">No se encontraron cajas operativas</p>
                        <p>Intenta con otro rango de fechas</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    exportOperatingBoxExcel,
    exportOperatingBoxPDF,
    getOperatingBoxRendimiento,
} from '@/services/TransactionFinancialService';
import { DownloadIcon, FilterIcon, RefreshCwIcon } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';

// Estado del componente
const isDarkMode = ref(false);
const cargando = ref(false);
const error = ref('');
const cajas = ref([]);

// Filtros
const filtros = ref({
    fecha_inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
    fecha_fin: new Date().toISOString().split('T')[0],
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

// Obtener resumen de cajas
const obtenerResumenCajas = async () => {
    try {
        const { data } = await getOperatingBoxRendimiento(filtros.value);
        cajas.value = data.data || [];
    } catch (err) {
        console.error('[v0] Error fetching box summary:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Aplicar filtros
const aplicarFiltros = async () => {
    if (!filtros.value.fecha_inicio || !filtros.value.fecha_fin) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        await obtenerResumenCajas();
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

// Totales generales
const totalIngresosGeneral = computed(() => {
    return cajas.value.reduce((total, caja) => total + parseFloat(caja.resumen.total_ingresos), 0);
});

const totalEgresosGeneral = computed(() => {
    return cajas.value.reduce((total, caja) => total + parseFloat(caja.resumen.total_egresos), 0);
});

const saldoFinalGeneral = computed(() => {
    return totalIngresosGeneral.value - totalEgresosGeneral.value;
});

// Exportar a Excel
const exportarExcel = async () => {
    if (!filtros.value.fecha_inicio || !filtros.value.fecha_fin) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportOperatingBoxExcel(filtros.value);
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Rendicion_Cajas_${formatDate(filtros.value.fecha_fin)}.xlsx`;
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
    if (!filtros.value.fecha_inicio || !filtros.value.fecha_fin) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        const response = await exportOperatingBoxPDF(filtros.value);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Rendicion_Cajas_${formatDate(filtros.value.fecha_fin)}.pdf`;
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
</script>

<style scoped>
.summary-card {
    @apply p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out border bg-white/70 dark:bg-gray-800/70 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm;
}

.summary-item {
    @apply flex justify-between items-center p-3 rounded-md border transition-colors duration-200;
}

.btn {
    @apply flex items-center justify-center py-2 px-5 rounded-full font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-md bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none;
}

.btn:focus-visible {
    @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900;
}

.input-field {
    @apply w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200;
}
</style>
