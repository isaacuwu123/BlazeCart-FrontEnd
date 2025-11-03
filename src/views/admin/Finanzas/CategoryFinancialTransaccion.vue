<template>
    <div class="min-h-screen p-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950 sm:p-6">
        <div class="mx-auto max-w-7xl">
            <!-- Header -->
            <div
                class="p-4 text-white rounded-t-lg shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 sm:p-6"
            >
                <h1 class="text-2xl font-extrabold text-center sm:text-3xl">
                    DASHBOARD FINANCIERO
                </h1>
                <div
                    v-if="
                        estadoFinanciero?.negocio?.nombre ||
                        allBusinessesFinancialData?.resumen_general ||
                        vehiclesFinancialData?.negocio
                    "
                    class="mt-2 text-center"
                >
                    <p class="text-lg font-semibold">
                        {{
                            estadoFinanciero?.negocio?.nombre ||
                            allBusinessesFinancialData?.resumen_general
                                ? 'Todos los negocios'
                                : vehiclesFinancialData?.negocio?.nombre || ''
                        }}
                    </p>
                    <p class="text-sm opacity-90">
                        {{
                            formatDate(
                                estadoFinanciero?.periodo?.fecha_inicial ||
                                    allBusinessesFinancialData?.periodo?.fecha_inicial ||
                                    vehiclesFinancialData?.periodo?.fecha_inicial
                            )
                        }}
                        -
                        {{
                            formatDate(
                                estadoFinanciero?.periodo?.fecha_final ||
                                    allBusinessesFinancialData?.periodo?.fecha_final ||
                                    vehiclesFinancialData?.periodo?.fecha_final
                            )
                        }}
                    </p>
                </div>
                <div class="flex justify-center mt-4 space-x-4">
                    <button @click="refrescarDatos" :disabled="cargando" class="btn">
                        <RefreshCwIcon :class="['w-4 h-4 mr-2', { 'animate-spin': cargando }]" />
                        {{ cargando ? 'Actualizando...' : 'Refrescar Datos' }}
                    </button>
                    <button
                        @click="exportarPDF"
                        :disabled="
                            cargando ||
                            (!estadoFinanciero?.resumen_financiero &&
                                !allBusinessesFinancialData?.resumen_general &&
                                !vehiclesFinancialData?.resumen_general)
                        "
                        class="btn"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        Exportar PDF
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="
                            cargando ||
                            (!estadoFinanciero?.resumen_financiero &&
                                !allBusinessesFinancialData?.resumen_general &&
                                !vehiclesFinancialData?.resumen_general)
                        "
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
                <!-- Pestañas de navegación -->
                <div class="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        @click="tabActiva = 'estados-resultados'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'estados-resultados'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Estados de Resultados
                    </button>
                    <button
                        @click="tabActiva = 'egresos'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'egresos'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Egresos por Categoría
                    </button>
                    <button
                        @click="tabActiva = 'negocio-mayor'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'negocio-mayor'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Negocio con Mayor Egreso
                    </button>
                    <button
                        @click="tabActiva = 'lease-on'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'lease-on'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Lease On Vehicles
                    </button>
                    <button
                        @click="tabActiva = 'all-businesses'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'all-businesses'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Todos los Negocios
                    </button>
                    <button
                        v-if="filtros.negocio_id"
                        @click="tabActiva = 'vehicles'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'vehicles'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Vehículos del Negocio
                    </button>
                    <button
                        v-if="selectedVehicleId"
                        @click="tabActiva = 'vehicle-details'"
                        :class="[
                            'px-4 py-2 font-medium text-sm',
                            tabActiva === 'vehicle-details'
                                ? 'text-orange-600 border-b-2 border-orange-600 dark:text-orange-400 dark:border-orange-400'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                        ]"
                    >
                        Detalles del Vehículo
                    </button>
                </div>
                <!-- Contenido de las pestañas -->
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
                <!-- Pestaña: Estados de Resultados -->
                <div
                    v-else-if="
                        tabActiva === 'estados-resultados' && estadoFinanciero?.resumen_financiero
                    "
                    class="grid grid-cols-1 gap-6 p-6 xl:grid-cols-3"
                >
                    <!-- Tabla de Transacciones por Estado -->
                    <div class="xl:col-span-2">
                        <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
                            <div class="grid grid-cols-4 gap-4 text-sm font-semibold">
                                <div>ESTADO TRANSACCIÓN</div>
                                <div>INGRESOS</div>
                                <div>EGRESOS</div>
                                <div>TOTAL TRANSACCIONES</div>
                            </div>
                        </div>
                        <div
                            class="overflow-y-auto border border-gray-300 dark:border-gray-600 max-h-96 rounded-b-md"
                        >
                            <div
                                v-for="detalle in estadoFinanciero.detalle_por_estado"
                                :key="detalle.estado_id"
                                class="grid grid-cols-4 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                                        parseFloat(detalle.ingresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{
                                        parseFloat(detalle.egresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
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
                        <!-- Tabla de Distribución por Estado -->
                        <div class="mt-6">
                            <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Distribución por Estado
                            </h3>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                            >
                                <div
                                    class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-4 gap-4 text-sm font-semibold">
                                        <div>ESTADO</div>
                                        <div>CANTIDAD</div>
                                        <div>% CANTIDAD</div>
                                        <div>IMPORTE</div>
                                    </div>
                                </div>
                                <div
                                    v-for="estado in estadoFinanciero?.distribucion_estados
                                        ?.por_cantidad || []"
                                    :key="estado.estado_id"
                                    class="grid grid-cols-4 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="font-medium text-gray-900 dark:text-gray-100">
                                        <span
                                            :class="getStatusColor(estado.estado_nombre)"
                                            class="px-2 py-1 text-xs font-medium rounded-full"
                                        >
                                            {{ estado.estado_nombre }}
                                        </span>
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{ estado.cantidad }}
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-400">
                                        {{ estado.porcentaje_cantidad }}%
                                    </div>
                                    <div class="font-semibold text-blue-600 dark:text-blue-400">
                                        ${{
                                            estado.total_importe.toLocaleString('es-MX', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Estados de Resultados -->
                    <div class="space-y-4">
                        <div class="summary-card">
                            <h3 class="mb-4 text-lg font-bold text-gray-800 dark:text-gray-200">
                                Estados de Resultados
                            </h3>
                            <div class="space-y-3">
                                <div
                                    class="bg-green-100 border-green-200 summary-item dark:bg-green-900/30 dark:border-green-700"
                                >
                                    <span class="font-medium text-green-800 dark:text-green-200"
                                        >Total Ingresos Brutos</span
                                    >
                                    <span
                                        class="text-lg font-bold text-green-800 dark:text-green-200"
                                    >
                                        ${{
                                            estadoFinanciero.resumen_financiero
                                                ?.total_ingresos_brutos || '0.00'
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-red-100 border-red-200 summary-item dark:bg-red-900/30 dark:border-red-700"
                                >
                                    <span class="font-medium text-red-800 dark:text-red-200"
                                        >Total Egresos Brutos</span
                                    >
                                    <span class="text-lg font-bold text-red-800 dark:text-red-200">
                                        ${{
                                            estadoFinanciero.resumen_financiero
                                                ?.total_egresos_brutos || '0.00'
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-blue-100 border-blue-200 summary-item dark:bg-blue-900/30 dark:border-blue-700"
                                >
                                    <span class="font-medium text-blue-800 dark:text-blue-200"
                                        >Margen Bruto</span
                                    >
                                    <span
                                        class="text-lg font-bold text-blue-800 dark:text-blue-200"
                                    >
                                        ${{
                                            estadoFinanciero.resumen_financiero?.margen_bruto ||
                                            '0.00'
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-purple-100 border-purple-200 summary-item dark:bg-purple-900/30 dark:border-purple-700"
                                >
                                    <span class="font-medium text-purple-800 dark:text-purple-200"
                                        >Margen Útil Antes de Impuestos</span
                                    >
                                    <span
                                        class="text-lg font-bold text-purple-800 dark:text-purple-200"
                                    >
                                        ${{
                                            estadoFinanciero.resumen_financiero
                                                ?.margen_util_antes_impuestos || '0.00'
                                        }}
                                    </span>
                                </div>
                                <div
                                    class="bg-indigo-100 border-indigo-200 summary-item dark:bg-indigo-900/30 dark:border-indigo-700"
                                >
                                    <span class="font-medium text-indigo-800 dark:text-indigo-200"
                                        >Rentabilidad</span
                                    >
                                    <span
                                        class="text-lg font-bold text-indigo-800 dark:text-indigo-200"
                                    >
                                        {{
                                            estadoFinanciero.resumen_financiero
                                                ?.rentabilidad_porcentaje || '0.00'
                                        }}%
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- Gráfico de Pie -->
                        <div class="chart-card">
                            <h4 class="chart-title">🥧 Distribución por Estado</h4>
                            <div class="chart-container">
                                <Pie :data="pieChartData" :options="pieChartOptions" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Pestaña: Egresos por Categoría -->
                <div
                    v-else-if="tabActiva === 'egresos' && egresosPorCategoria?.resumen_global"
                    class="p-6"
                >
                    <!-- Resumen Global -->
                    <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <h3 class="mb-3 text-lg font-bold text-blue-800 dark:text-blue-200">
                            Resumen Global
                        </h3>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total de egresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{
                                        egresosPorCategoria.resumen_global?.total_egresos || '0.00'
                                    }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Cantidad de transacciones
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    {{
                                        egresosPorCategoria.resumen_global
                                            ?.cantidad_transacciones || 0
                                    }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Promedio por transacción
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{
                                        egresosPorCategoria.resumen_global?.promedio_egreso ||
                                        '0.00'
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Tabla de Egresos por Categoría -->
                    <div class="mb-6">
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Egresos por Categoría
                        </h3>
                        <div
                            class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                        >
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
                                <div class="grid grid-cols-4 gap-4 text-sm font-semibold">
                                    <div>CATEGORÍA</div>
                                    <div>TOTAL EGRESOS</div>
                                    <div>CANTIDAD TRANSACCIONES</div>
                                    <div>PROMEDIO</div>
                                </div>
                            </div>
                            <div
                                v-for="categoria in egresosPorCategoria.categorias"
                                :key="categoria.categoria_id"
                                class="grid grid-cols-4 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <div class="font-medium text-gray-900 dark:text-gray-100">
                                    {{ categoria.categoria_nombre }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{ categoria.total_categoria }}
                                </div>
                                <div class="text-gray-600 dark:text-gray-400">
                                    {{ categoria.cantidad_transacciones }}
                                </div>
                                <div class="text-gray-600 dark:text-gray-400">
                                    ${{ categoria.promedio_egreso }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Estadísticas Adicionales -->
                    <div v-if="egresosPorCategoria.estadisticas_adicionales" class="mb-6">
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Estadísticas Adicionales
                        </h3>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div
                                v-if="
                                    egresosPorCategoria.estadisticas_adicionales
                                        .categoria_mayor_egreso
                                "
                                class="p-4 bg-green-100 rounded-lg dark:bg-green-900/30"
                            >
                                <p class="text-sm text-green-600 dark:text-green-400">
                                    Categoría con mayor egreso:
                                </p>
                                <p class="font-medium text-green-800 dark:text-green-200">
                                    {{
                                        egresosPorCategoria.estadisticas_adicionales
                                            .categoria_mayor_egreso.categoria_nombre
                                    }}
                                    - ${{
                                        egresosPorCategoria.estadisticas_adicionales
                                            .categoria_mayor_egreso.total_categoria
                                    }}
                                </p>
                            </div>
                            <div
                                v-if="
                                    egresosPorCategoria.estadisticas_adicionales
                                        .categoria_menor_egreso
                                "
                                class="p-4 bg-yellow-100 rounded-lg dark:bg-yellow-900/30"
                            >
                                <p class="text-sm text-yellow-600 dark:text-yellow-400">
                                    Categoría con menor egreso:
                                </p>
                                <p class="font-medium text-yellow-800 dark:text-yellow-200">
                                    {{
                                        egresosPorCategoria.estadisticas_adicionales
                                            .categoria_menor_egreso.categoria_nombre
                                    }}
                                    - ${{
                                        egresosPorCategoria.estadisticas_adicionales
                                            .categoria_menor_egreso.total_categoria
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Gráfico de Distribución Porcentual -->
                    <div
                        v-if="
                            egresosPorCategoria.estadisticas_adicionales?.distribucion_porcentual
                                ?.length
                        "
                        class="chart-card"
                    >
                        <h4 class="chart-title">📊 Distribución Porcentual de Egresos</h4>
                        <div class="chart-container">
                            <Pie
                                :data="egresosPorCategoriaChartData"
                                :options="egresosPorCategoriaChartOptions"
                            />
                        </div>
                    </div>
                </div>
                <!-- Pestaña: Negocio con Mayor Egreso -->
                <div
                    v-else-if="tabActiva === 'negocio-mayor' && negocioMayorEgreso?.negocio"
                    class="p-6"
                >
                    <div class="p-6 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-red-800 dark:text-red-200">
                                    {{ negocioMayorEgreso.negocio.nombre }}
                                </h3>
                                <p class="text-red-600 dark:text-red-400">
                                    Negocio con mayor egreso en el período
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-red-600 dark:text-red-400">Período:</p>
                                <p class="text-sm font-medium text-red-800 dark:text-red-200">
                                    {{ formatDate(negocioMayorEgreso.periodo.fecha_inicial) }} -
                                    {{ formatDate(negocioMayorEgreso.periodo.fecha_final) }}
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
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
                        <div v-if="negocioMayorEgreso.desglose_categorias?.length">
                            <h4 class="mb-3 text-lg font-bold text-red-800 dark:text-red-200">
                                Desglose por categorías
                            </h4>
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
                    <div
                        v-if="negocioMayorEgreso.desglose_categorias?.length"
                        class="mt-6 chart-card"
                    >
                        <h4 class="chart-title">📊 Desglose por Categoría</h4>
                        <div class="chart-container">
                            <Doughnut
                                :data="negocioMayorEgresoChartData"
                                :options="negocioMayorEgresoChartOptions"
                            />
                        </div>
                    </div>
                </div>
                <!-- Pestaña: Lease On Vehicles -->
                <div v-else-if="tabActiva === 'lease-on' && leaseOnVehicles?.lease_on" class="p-6">
                    <!-- Información del Lease On -->
                    <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-blue-800 dark:text-blue-200">
                                    {{ leaseOnVehicles.lease_on.nombre }}
                                </h3>
                                <p class="text-blue-600 dark:text-blue-400">
                                    Negocio Lease On - Vehículos y Egresos
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Período:</p>
                                <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    {{ formatDate(leaseOnVehicles?.periodo?.fecha_inicial) }} -
                                    {{ formatDate(leaseOnVehicles?.periodo?.fecha_final) }}
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total de egresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ leaseOnVehicles?.resumen_global?.total_egresos || '0.00' }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Cantidad de transacciones
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    {{
                                        leaseOnVehicles?.resumen_global?.cantidad_transacciones || 0
                                    }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Promedio por transacción
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{
                                        leaseOnVehicles?.resumen_global?.promedio_egreso || '0.00'
                                    }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Cantidad de vehículos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    {{ leaseOnVehicles?.resumen_global?.cantidad_vehiculos || 0 }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Selector de vehículo -->
                    <div class="mb-6">
                        <label
                            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Seleccionar vehículo
                        </label>
                        <select
                            v-model="selectedVehicleId"
                            class="input-field"
                            @change="filterVehicleExpenses"
                        >
                            <option value="">Todos los vehículos</option>
                            <option
                                v-for="vehicle in leaseOnVehicles?.vehicles"
                                :key="vehicle.vehicle_id"
                                :value="vehicle.vehicle_id"
                            >
                                {{
                                    vehicle.vehicle_info.marca +
                                    ' ' +
                                    vehicle.vehicle_info.modelo +
                                    ' - ' +
                                    vehicle.vehicle_info.numero_placa
                                }}
                            </option>
                        </select>
                    </div>
                    <!-- Tabla de Vehículos con Egresos -->
                    <div class="mb-6">
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Vehículos y Egresos
                        </h3>
                        <div
                            class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600"
                        >
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
                                <div class="grid grid-cols-4 gap-4 text-sm font-semibold">
                                    <div>VEHÍCULO</div>
                                    <div>TOTAL EGRESOS</div>
                                    <div>CANTIDAD TRANSACCIONES</div>
                                    <div>PROMEDIO</div>
                                </div>
                            </div>
                            <div
                                v-for="vehicle in filteredVehicles"
                                :key="vehicle.vehicle_id"
                                class="grid grid-cols-4 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                <div class="font-medium text-gray-900 dark:text-gray-100">
                                    {{
                                        vehicle.vehicle_info.marca +
                                        ' ' +
                                        vehicle.vehicle_info.modelo +
                                        ' (' +
                                        vehicle.vehicle_info.numero_placa +
                                        ')'
                                    }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{ vehicle.resumen_egresos.total_egresos }}
                                </div>
                                <div class="text-gray-600 dark:text-gray-400">
                                    {{ vehicle.resumen_egresos.cantidad_transacciones }}
                                </div>
                                <div class="text-gray-600 dark:text-gray-400">
                                    ${{ vehicle.resumen_egresos.promedio_egreso }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Gráfico de Egresos por Vehículo -->
                    <div v-if="filteredVehicles.length > 0" class="chart-card">
                        <h4 class="chart-title">📊 Egresos por Vehículo</h4>
                        <div class="chart-container">
                            <Bar
                                :data="leaseOnVehiclesChartData"
                                :options="leaseOnVehiclesChartOptions"
                            />
                        </div>
                    </div>
                    <!-- Detalle de Egresos del Vehículo Seleccionado -->
                    <div
                        v-if="selectedVehicleId && selectedVehicleDetails"
                        class="p-4 mt-6 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Detalle de Egresos - {{ selectedVehicleDetails.vehicle_info.marca }}
                            {{ selectedVehicleDetails.vehicle_info.modelo }} ({{
                                selectedVehicleDetails.vehicle_info.numero_placa
                            }})
                        </h3>
                        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                            <div class="p-3 bg-gray-100 rounded dark:bg-gray-700">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Total de egresos
                                </p>
                                <p class="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    ${{ selectedVehicleDetails.resumen_egresos.total_egresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-gray-100 rounded dark:bg-gray-700">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Cantidad de transacciones
                                </p>
                                <p class="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    {{
                                        selectedVehicleDetails.resumen_egresos
                                            .cantidad_transacciones
                                    }}
                                </p>
                            </div>
                            <div class="p-3 bg-gray-100 rounded dark:bg-gray-700">
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Promedio por transacción
                                </p>
                                <p class="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    ${{ selectedVehicleDetails.resumen_egresos.promedio_egreso }}
                                </p>
                            </div>
                        </div>
                        <!-- Egresos por Categoría del Vehículo -->
                        <div class="mb-4">
                            <h4 class="mb-2 font-medium text-gray-700 text-md dark:text-gray-300">
                                Egresos por Categoría
                            </h4>
                            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                                <div
                                    v-for="categoria in selectedVehicleDetails.egresos_por_categoria"
                                    :key="categoria.categoria_id"
                                    class="p-2 bg-white border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {{ categoria.categoria_nombre }}
                                    </p>
                                    <p class="text-sm text-red-600 dark:text-red-400">
                                        ${{ categoria.total_egresos }}
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        {{ categoria.cantidad_transacciones }} transacciones
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Tabla de Transacciones del Vehículo -->
                        <div>
                            <h4 class="mb-2 font-medium text-gray-700 text-md dark:text-gray-300">
                                Transacciones
                            </h4>
                            <div
                                class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600 max-h-60"
                            >
                                <div
                                    class="p-2 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md"
                                >
                                    <div class="grid grid-cols-4 gap-2 text-xs font-semibold">
                                        <div>FECHA</div>
                                        <div>ÍTEM</div>
                                        <div>IMPORTE</div>
                                        <div>ESTADO</div>
                                    </div>
                                </div>
                                <div
                                    v-for="expense in selectedVehicleDetails.egresos"
                                    :key="expense.id"
                                    class="grid grid-cols-4 gap-2 p-2 text-xs transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <div class="text-gray-900 dark:text-gray-100">
                                        {{ formatDate(expense.fecha) }}
                                    </div>
                                    <div class="text-gray-900 truncate dark:text-gray-100">
                                        {{ expense.item }}
                                    </div>
                                    <div class="font-semibold text-red-600 dark:text-red-400">
                                        ${{ expense.importe_total }}
                                    </div>
                                    <div>
                                        <span
                                            :class="getStatusColor(expense.estado)"
                                            class="px-1 py-0.5 text-xs font-medium rounded-full"
                                        >
                                            {{ expense.estado }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Pestaña: Todos los Negocios -->
                <div
                    v-else-if="
                        tabActiva === 'all-businesses' &&
                        allBusinessesFinancialData?.resumen_general
                    "
                    class="p-6"
                >
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
                                <div class="grid grid-cols-5 gap-4 text-sm font-semibold">
                                    <div>NEGOCIO</div>
                                    <div>INGRESOS</div>
                                    <div>EGRESOS</div>
                                    <div>MARGEN BRUTO</div>
                                    <div>RENTABILIDAD</div>
                                </div>
                            </div>
                            <div
                                v-for="negocio in allBusinessesFinancialData.negocios"
                                :key="negocio.negocio.id"
                                class="grid grid-cols-5 gap-4 p-3 text-sm transition-colors duration-200 border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                <!-- Pestaña: Vehículos del Negocio -->
                <div
                    v-else-if="tabActiva === 'vehicles' && vehiclesFinancialData?.resumen_general"
                    class="p-6"
                >
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
                <!-- Pestaña: Detalles del Vehículo -->
                <div
                    v-else-if="tabActiva === 'vehicle-details' && vehicleFinancialDetails"
                    class="p-6"
                >
                    <div class="p-4 mb-6 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-xl font-bold text-blue-800 dark:text-blue-200">
                                    {{ vehicleFinancialDetails.vehicle.marca }}
                                    {{ vehicleFinancialDetails.vehicle.modelo }} ({{
                                        vehicleFinancialDetails.vehicle.numero_placa
                                    }})
                                </h3>
                                <p class="text-blue-600 dark:text-blue-400">
                                    Estado financiero detallado del vehículo
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Período:</p>
                                <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    {{ formatDate(vehicleFinancialDetails.periodo.fecha_inicial) }}
                                    -
                                    {{ formatDate(vehicleFinancialDetails.periodo.fecha_final) }}
                                </p>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Ingresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehicleFinancialDetails.resumen_financiero.total_ingresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">
                                    Total Egresos
                                </p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehicleFinancialDetails.resumen_financiero.total_egresos }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Margen Bruto</p>
                                <p class="text-lg font-bold text-blue-800 dark:text-blue-200">
                                    ${{ vehicleFinancialDetails.resumen_financiero.margen_bruto }}
                                </p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded dark:bg-blue-900/30">
                                <p class="text-sm text-blue-600 dark:text-blue-400">Rentabilidad</p>
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
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
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
                                        parseFloat(detalle.ingresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{
                                        parseFloat(detalle.egresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
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
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
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
                                        parseFloat(detalle.ingresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
                                    }}
                                </div>
                                <div class="font-semibold text-red-600 dark:text-red-400">
                                    ${{
                                        parseFloat(detalle.egresos || 0).toLocaleString('es-MX', {
                                            minimumFractionDigits: 2,
                                        })
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
                                        parseFloat(detalle.balance_categoria || 0).toLocaleString(
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
                    <!-- Transacciones Detalladas -->
                    <div>
                        <h3 class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">
                            Transacciones Detalladas
                        </h3>
                        <div
                            class="overflow-y-auto border border-gray-300 rounded-md dark:border-gray-600 max-h-96"
                        >
                            <div class="p-3 text-white bg-gray-800 dark:bg-gray-900 rounded-t-md">
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
                <!-- Empty state -->
                <div
                    v-else-if="
                        !cargando &&
                        !error &&
                        !estadoFinanciero?.resumen_financiero &&
                        !allBusinessesFinancialData?.resumen_general &&
                        !vehiclesFinancialData?.resumen_general
                    "
                    class="p-12 text-center"
                >
                    <div class="text-gray-500 dark:text-gray-400">
                        <FilterIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">Selecciona un negocio y fechas</p>
                        <p>Elige los filtros para generar tu dashboard financiero</p>
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
    generateFinancialStatement,
    getAllBusinessesFinancialStatement,
    getFinancialTransacctionsBusinessHighestExpense,
    getFinancialTransacctionsExpensesByCategory,
    getFinancialTransacctionsLeaseOnVehicles,
    getVehicleFinancialStatement,
    getVehiclesFinancialStatementByBusiness,
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
import { Bar, Doughnut, Pie } from 'vue-chartjs';

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
const estadoFinanciero = ref({});
const egresosPorCategoria = ref({});
const negocioMayorEgreso = ref({});
const leaseOnVehicles = ref({});
const allBusinessesFinancialData = ref({});
const vehiclesFinancialData = ref({});
const vehicleFinancialDetails = ref({});
const tabActiva = ref('estados-resultados');
const selectedVehicleId = ref('');
const selectedVehicleDetails = ref(null);

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

// Obtener estado financiero
const obtenerEstadoFinanciero = async () => {
    if (!filtros.value.negocio_id) {
        return;
    }
    try {
        const { data } = await generateFinancialStatement(filtros.value);
        console.log('Datos de estado financiero:', data.datos);
        estadoFinanciero.value = data.datos || {};
    } catch (err) {
        console.error('[v0] Error fetching financial statement:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Obtener egresos por categoría
const obtenerEgresosPorCategoria = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getFinancialTransacctionsExpensesByCategory(filtros.value);
        egresosPorCategoria.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching expenses by category:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Obtener negocio con mayor egreso
const obtenerNegocioMayorEgreso = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getFinancialTransacctionsBusinessHighestExpense({
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
        });
        negocioMayorEgreso.value = data.data || {};
    } catch (err) {
        console.error('[v0] Error fetching business with highest expense:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

// Obtener vehículos y egresos de Lease On
const obtenerLeaseOnVehicles = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        return;
    }
    try {
        const { data } = await getFinancialTransacctionsLeaseOnVehicles({
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
        });
        leaseOnVehicles.value = data.data || {};
        console.log(leaseOnVehicles.value);
    } catch (err) {
        console.error('[v0] Error fetching Lease On vehicles:', err);
        error.value =
            err.response?.data?.message || 'Error de conexión. Por favor intenta de nuevo.';
    }
};

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
        tabActiva.value = 'vehicle-details';
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

// Aplicar filtros
const aplicarFiltros = async () => {
    if (!filtros.value.fecha_inicial || !filtros.value.fecha_final) {
        error.value = 'Por favor selecciona un rango de fechas';
        return;
    }
    cargando.value = true;
    error.value = '';
    try {
        if (filtros.value.negocio_id) {
            await obtenerEstadoFinanciero();
            await obtenerVehiclesFinancialStatement();
        } else {
            await obtenerAllBusinessesFinancialStatement();
        }
        await obtenerEgresosPorCategoria();
        await obtenerNegocioMayorEgreso();
        await obtenerLeaseOnVehicles();
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

// Filtrar egresos por vehículo
const filterVehicleExpenses = () => {
    if (!selectedVehicleId.value) {
        selectedVehicleDetails.value = null;
        return;
    }
    const vehicle = leaseOnVehicles.value?.vehicles?.find(
        v => v.vehicle_id === parseInt(selectedVehicleId.value)
    );
    if (vehicle) {
        selectedVehicleDetails.value = vehicle;
    } else {
        selectedVehicleDetails.value = null;
    }
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
    if (!filtros.value.negocio_id && !allBusinessesFinancialData.value?.resumen_general) {
        error.value = 'Por favor selecciona un negocio o genera el reporte de todos los negocios';
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
        link.download = `Dashboard_Financiero_${formatDate(filtros.value.fecha_final)}.xlsx`;
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
    if (!filtros.value.negocio_id && !allBusinessesFinancialData.value?.resumen_general) {
        error.value = 'Por favor selecciona un negocio o genera el reporte de todos los negocios';
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
        link.download = `Dashboard_Financiero_${formatDate(filtros.value.fecha_final)}.pdf`;
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

// Datos para gráfico de pie (distribución por estado)
const pieChartData = computed(() => {
    if (!estadoFinanciero.value?.distribucion_estados?.por_cantidad)
        return { labels: [], datasets: [] };
    const distribucion = estadoFinanciero.value.distribucion_estados.por_cantidad;
    const labels = distribucion.map(item => item.estado_nombre);
    const valores = distribucion.map(item => item.total_importe);
    return {
        labels,
        datasets: [
            {
                data: valores,
                backgroundColor: [
                    colors.value.success,
                    colors.value.danger,
                    colors.value.warning,
                    colors.value.secondary,
                ],
                borderWidth: 3,
                borderColor: isDarkMode.value ? '#111827' : '#ffffff',
                hoverOffset: 8,
            },
        ],
    };
});

const pieChartOptions = computed(() => ({
    ...baseChartOptions.value,
    scales: {},
    plugins: {
        ...baseChartOptions.value.plugins,
        tooltip: {
            ...baseChartOptions.value.plugins.tooltip,
            callbacks: {
                label: context => {
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
                    return ` ${context.label}: $${value.toLocaleString('es-MX', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} (${percentage}%)`;
                },
            },
        },
    },
}));

// Datos para gráfico de egresos por categoría
const egresosPorCategoriaChartData = computed(() => {
    if (!egresosPorCategoria.value?.estadisticas_adicionales?.distribucion_porcentual)
        return { labels: [], datasets: [] };
    const categorias =
        egresosPorCategoria.value.estadisticas_adicionales.distribucion_porcentual.map(
            item => item.categoria_nombre
        );
    const valores = egresosPorCategoria.value.estadisticas_adicionales.distribucion_porcentual.map(
        item => parseFloat(item.porcentaje.replace('%', ''))
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

const egresosPorCategoriaChartOptions = computed(() => ({
    ...baseChartOptions.value,
    scales: {},
    plugins: {
        ...baseChartOptions.value.plugins,
        tooltip: {
            ...baseChartOptions.value.plugins.tooltip,
            callbacks: {
                label: context => {
                    const value = context.parsed;
                    return ` ${context.label}: ${value}%`;
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

// Vehículos filtrados para mostrar en la tabla
const filteredVehicles = computed(() => {
    if (!leaseOnVehicles.value?.vehicles) return [];
    if (!selectedVehicleId.value) {
        return leaseOnVehicles.value.vehicles;
    }
    return leaseOnVehicles.value.vehicles.filter(
        vehicle => vehicle.vehicle_id === parseInt(selectedVehicleId.value)
    );
});

// Datos para gráfico de Lease On Vehicles
const leaseOnVehiclesChartData = computed(() => {
    if (!filteredVehicles.value.length) return { labels: [], datasets: [] };
    const labels = filteredVehicles.value.map(
        vehicle =>
            `${vehicle.vehicle_info.marca} ${vehicle.vehicle_info.modelo} (${vehicle.vehicle_info.numero_placa})`
    );
    const data = filteredVehicles.value.map(vehicle =>
        parseFloat(vehicle.resumen_egresos.total_egresos.replace(/,/g, ''))
    );
    return {
        labels,
        datasets: [
            {
                label: 'Total de Egresos',
                data,
                backgroundColor: colors.value.danger + 'CC',
                borderColor: colors.value.danger,
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            },
        ],
    };
});

const leaseOnVehiclesChartOptions = computed(() => ({
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
