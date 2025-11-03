<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    VEHÍCULOS DEL NEGOCIO
                </h1>
                <div v-if="vehiclesFinancialData?.negocio?.nombre" class="mt-2 text-center">
                    <p class="text-lg font-semibold">
                        {{ vehiclesFinancialData?.negocio?.nombre }}
                    </p>
                    <p class="text-sm opacity-90">
                        {{ formatDate(vehiclesFinancialData?.periodo?.fecha_inicial) }}
                        -
                        {{ formatDate(vehiclesFinancialData?.periodo?.fecha_final) }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button
                        @click="exportarPDF"
                        :disabled="cargando || !vehiclesFinancialData?.resumen_general"
                        class="btn"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar PDF
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargando || !vehiclesFinancialData?.resumen_general"
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
                            <option value="">Selecciona un negocio</option>
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
                            :disabled="
                                !filtros.negocio_id ||
                                !filtros.fecha_inicial ||
                                !filtros.fecha_final ||
                                cargando
                            "
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
                <!-- Contenido de Vehículos del Negocio -->
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
                <!-- Vehículos del Negocio -->
                <div v-else-if="vehiclesFinancialData?.resumen_general" class="p-6">
                    <!-- Información del Negocio -->
                    <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-blue-800 dark:text-blue-200">
                                    {{ vehiclesFinancialData.negocio.nombre }}
                                </h3>
                                <p class="text-blue-600 dark:text-blue-400">
                                    Estado financiero de vehículos
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Período:</p>
                                <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    {{ formatDate(vehiclesFinancialData.periodo.fecha_inicial) }} -
                                    {{ formatDate(vehiclesFinancialData.periodo.fecha_final) }}
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Ingresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehiclesFinancialData.resumen_general.total_ingresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Egresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehiclesFinancialData.resumen_general.total_egresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Margen Bruto</p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehiclesFinancialData.resumen_general.margen_bruto }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Rentabilidad</p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    {{
                                        vehiclesFinancialData.resumen_general
                                            .rentabilidad_porcentaje
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Tabla de Vehículos -->
                    <div class="mb-6">
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Detalle por Vehículo
                        </h3>
                        <div
                            class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                        >
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
                                <div class="grid grid-cols-6 gap-4 text-sm font-semibold">
                                    <div>VEHÍCULO</div>
                                    <div>INGRESOS</div>
                                    <div>EGRESOS</div>
                                    <div>MARGEN BRUTO</div>
                                    <div>RENTABILIDAD</div>
                                    <div>ACCIONES</div>
                                </div>
                            </div>
                            <div
                                v-for="vehicle in vehiclesFinancialData.vehicles"
                                :key="vehicle.vehicle_id"
                                class="grid grid-cols-6 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                :class="{
                                    'bg-orange-50 dark:bg-orange-900/20':
                                        selectedVehicleId === vehicle.vehicle_id,
                                }"
                            >
                                <div class="font-medium text-gray-900 dark:text-gray-100">
                                    {{ vehicle.vehicle_info.marca }}
                                    {{ vehicle.vehicle_info.modelo }} ({{
                                        vehicle.vehicle_info.numero_placa
                                    }})
                                </div>
                                <div class="font-semibold text-green-600 dark:text-green-400">
                                    ${{ vehicle.resumen_financiero.total_ingresos }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{ vehicle.resumen_financiero.total_egresos }}
                                </div>
                                <div class="font-semibold text-blue-600 dark:text-blue-400">
                                    ${{ vehicle.resumen_financiero.margen_bruto }}
                                </div>
                                <div class="font-semibold text-purple-600 dark:text-purple-400">
                                    {{ vehicle.resumen_financiero.rentabilidad_porcentaje }}
                                </div>
                                <div>
                                    <button
                                        @click="verDetallesVehiculo(vehicle.vehicle_id)"
                                        class="px-3 py-1 text-sm text-white bg-orange-500 rounded hover:bg-orange-600"
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Detalles del Vehículo Seleccionado -->
                    <div
                        v-if="vehicleFinancialDetails?.resumen_financiero"
                        class="p-6 mb-6 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                                Detalles del Vehículo:
                                {{ vehicleFinancialDetails.vehicle.marca }}
                                {{ vehicleFinancialDetails.vehicle.modelo }} ({{
                                    vehicleFinancialDetails.vehicle.numero_placa
                                }})
                            </h3>
                            <button
                                @click="cerrarDetallesVehiculo"
                                class="px-3 py-1 text-sm bg-gray-200 rounded dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                                Cerrar
                            </button>
                        </div>

                        <!-- Resumen Financiero -->
                        <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                    <p class="text-sm text-blue-600 dark:text-blue-400">
                                        Total Ingresos
                                    </p>
                                    <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                        ${{
                                            vehicleFinancialDetails.resumen_financiero
                                                .total_ingresos
                                        }}
                                    </p>
                                </div>
                                <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                    <p class="text-sm text-blue-600 dark:text-blue-400">
                                        Total Egresos
                                    </p>
                                    <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                        ${{
                                            vehicleFinancialDetails.resumen_financiero.total_egresos
                                        }}
                                    </p>
                                </div>
                                <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                    <p class="text-sm text-blue-600 dark:text-blue-400">
                                        Margen Bruto
                                    </p>
                                    <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                        ${{
                                            vehicleFinancialDetails.resumen_financiero.margen_bruto
                                        }}
                                    </p>
                                </div>
                                <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                    <p class="text-sm text-blue-600 dark:text-blue-400">
                                        Rentabilidad
                                    </p>
                                    <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                        {{
                                            vehicleFinancialDetails.resumen_financiero
                                                .rentabilidad_porcentaje
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Detalle por Estado -->
                        <div class="mb-6">
                            <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Transacciones por Estado
                            </h3>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                            >
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-5 gap-4 text-sm font-semibold">
                                        <div>ESTADO</div>
                                        <div>INGRESOS</div>
                                        <div>EGRESOS</div>
                                        <div>BALANCE</div>
                                        <div>TRANSACCIONES</div>
                                    </div>
                                </div>
                                <div
                                    v-for="detalle in vehicleFinancialDetails.detalle_por_estado"
                                    :key="detalle.estado_id"
                                    class="grid grid-cols-5 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="font-medium text-gray-900 dark:text-gray-100">
                                        <span
                                            :class="getStatusColor(detalle.estado_nombre)"
                                            class="px-2 py-1 text-xs font-medium rounded-full"
                                        >
                                            {{ detalle.estado_nombre }}
                                        </span>
                                    </div>
                                    <div class="font-semibold text-green-600 dark:text-green-400">
                                        ${{
                                            parseFloat(detalle.ingresos || 0).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </div>
                                    <div class="font-semibold text-red-600 dark:text-red-400">
                                        ${{
                                            parseFloat(detalle.egresos || 0).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </div>
                                    <div
                                        :class="
                                            detalle.balance_estado >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        "
                                    >
                                        ${{
                                            parseFloat(detalle.balance_estado || 0).toLocaleString(
                                                'es-MX',
                                                { minimumFractionDigits: 2 }
                                            )
                                        }}
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{
                                            (detalle.total_transacciones_ingresos || 0) +
                                            (detalle.total_transacciones_egresos || 0)
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Detalle por Categoría -->
                        <div class="mb-6">
                            <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Transacciones por Categoría
                            </h3>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                            >
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-5 gap-4 text-sm font-semibold">
                                        <div>CATEGORÍA</div>
                                        <div>INGRESOS</div>
                                        <div>EGRESOS</div>
                                        <div>BALANCE</div>
                                        <div>TRANSACCIONES</div>
                                    </div>
                                </div>
                                <div
                                    v-for="detalle in vehicleFinancialDetails.detalle_por_categoria"
                                    :key="detalle.categoria_id"
                                    class="grid grid-cols-5 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="font-medium text-gray-900 dark:text-gray-100">
                                        {{ detalle.categoria_nombre }}
                                    </div>
                                    <div class="font-semibold text-green-600 dark:text-green-400">
                                        ${{
                                            parseFloat(detalle.ingresos || 0).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </div>
                                    <div class="font-semibold text-red-600 dark:text-red-400">
                                        ${{
                                            parseFloat(detalle.egresos || 0).toLocaleString(
                                                'es-MX',
                                                {
                                                    minimumFractionDigits: 2,
                                                }
                                            )
                                        }}
                                    </div>
                                    <div
                                        :class="
                                            detalle.balance_categoria >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        "
                                    >
                                        ${{
                                            parseFloat(
                                                detalle.balance_categoria || 0
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{
                                            (detalle.total_transacciones_ingresos || 0) +
                                            (detalle.total_transacciones_egresos || 0)
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Transacciones Detalladas -->
                        <div>
                            <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Transacciones Detalladas
                            </h3>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600 max-h-96"
                            >
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-6 gap-4 text-sm font-semibold">
                                        <div>FECHA</div>
                                        <div>ÍTEM</div>
                                        <div>IMPORTE</div>
                                        <div>TIPO</div>
                                        <div>CATEGORÍA</div>
                                        <div>ESTADO</div>
                                    </div>
                                </div>
                                <div
                                    v-for="transaccion in vehicleFinancialDetails.transacciones"
                                    :key="transaccion.id"
                                    class="grid grid-cols-6 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="text-gray-900 dark:text-gray-100">
                                        {{ formatDate(transaccion.fecha) }}
                                    </div>
                                    <div class="text-gray-900 truncate dark:text-gray-100">
                                        {{ transaccion.item }}
                                    </div>
                                    <div
                                        :class="
                                            transaccion.tipo_de_transaccion === 'Ingreso'
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                        "
                                    >
                                        ${{ transaccion.importe_total }}
                                    </div>
                                    <div>
                                        <span
                                            :class="
                                                transaccion.tipo_de_transaccion === 'Ingreso'
                                                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                            "
                                            class="px-2 py-1 text-xs font-medium rounded-full"
                                        >
                                            {{ transaccion.tipo_de_transaccion }}
                                        </span>
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{ transaccion.categoria }}
                                    </div>
                                    <div>
                                        <span
                                            :class="getStatusColor(transaccion.estado)"
                                            class="px-2 py-1 text-xs font-medium rounded-full"
                                        >
                                            {{ transaccion.estado }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Gráfico de Comparación de Vehículos -->
                    <div class="chart-card">
                        <h4 class="chart-title">📊 Comparación de Rentabilidad por Vehículo</h4>
                        <div class="chart-container">
                            <Bar
                                :data="vehiclesComparisonChartData"
                                :options="vehiclesComparisonChartOptions"
                            />
                        </div>
                    </div>
                </div>
                <!-- Empty state -->
                <div
                    v-else-if="!cargando && !error && !vehiclesFinancialData?.resumen_general"
                    class="p-12 text-center"
                >
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">Selecciona un negocio y fechas</p>
                        <p>Elige los filtros para generar el reporte de vehículos del negocio</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import {
    exportToExcel,
    exportToPDF,
    getVehicleFinancialStatement,
    getVehiclesFinancialStatementByBusiness,
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
const negocios = ref([]);
const vehiclesFinancialData = ref({});
const vehicleFinancialDetails = ref({});
const selectedVehicleId = ref('');

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

// Obtener estado financiero de vehículos del negocio
const obtenerVehiclesFinancialStatement = async () => {
    if (!filtros.value.negocio_id || !filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getVehiclesFinancialStatementByBusiness(filtros.value);
        vehiclesFinancialData.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching vehicles financial statement:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Obtener detalles financieros de un vehículo específico
const obtenerVehicleFinancialDetails = async vehicleId => {
    if (!vehicleId || !filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        cargando.value = true;
        const params = {
            vehicle_id: vehicleId,
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
        };
        const { data } = await getVehicleFinancialStatement(params);
        vehicleFinancialDetails.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching vehicle financial details:', err);
        error.value = err.response?.data?.message || 'Error al obtener los detalles del vehículo.';
    } finally {
        cargando.value = false;
    }
};

// Ver detalles de un vehículo
const verDetallesVehiculo = vehicleId => {
    selectedVehicleId.value = vehicleId;
    obtenerVehicleFinancialDetails(vehicleId);
};

// Cerrar detalles del vehículo
const cerrarDetallesVehiculo = () => {
    vehicleFinancialDetails.value = {};
    selectedVehicleId.value = '';
};

// Aplicar filtros
const aplicarFiltros = async () => {
    if (!filtros.value.negocio_id || !filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        error.value = 'Por favor selecciona un negocio y un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        await obtenerVehiclesFinancialStatement();
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
    if (!filtros.value.negocio_id) {
        error.value = 'Por favor selecciona un negocio';
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
        link.download = `Vehiculos_Negocio_${formatDate(filtros.value.fecha_final)}.xlsx`;
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
    if (!filtros.value.negocio_id) {
        error.value = 'Por favor selecciona un negocio';
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
        link.download = `Vehiculos_Negocio_${formatDate(filtros.value.fecha_final)}.pdf`;
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

// Datos para gráfico de comparación de vehículos
const vehiclesComparisonChartData = computed(() => {
    if (!vehiclesFinancialData.value?.vehicles) return { labels: [], datasets: [] };
    const labels = vehiclesFinancialData.value.vehicles.map(
        vehicle =>
            `${vehicle.vehicle_info.marca} ${vehicle.vehicle_info.modelo} (${vehicle.vehicle_info.numero_placa})`
    );
    const ingresos = vehiclesFinancialData.value.vehicles.map(vehicle =>
        parseFloat(vehicle.resumen_financiero.total_ingresos.replace(/,/g, ''))
    );
    const egresos = vehiclesFinancialData.value.vehicles.map(vehicle =>
        parseFloat(vehicle.resumen_financiero.total_egresos.replace(/,/g, ''))
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

const vehiclesComparisonChartOptions = computed(() => ({
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
