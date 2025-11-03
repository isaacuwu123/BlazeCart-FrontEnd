<template>
    <div
        class="min-h-screen transition-colors duration-500 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
        <!-- Header Principal -->
        <header
            class="sticky top-0 z-50 border-b-2 shadow-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-orange-200/50 dark:border-slate-800/50"
        >
            <div class="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
                >
                    <div class="text-center sm:text-left">
                        <h1
                            class="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl lg:text-4xl"
                        >
                            📊 ESTADO FINANCIERO GLOBAL
                        </h1>
                        <div
                            v-if="estadoFinanciero?.negocio?.nombre"
                            class="flex flex-wrap items-center justify-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-300 sm:justify-start"
                        >
                            <span
                                class="px-2 py-1 font-semibold text-gray-900 rounded bg-white/80 dark:bg-slate-800 dark:text-white"
                            >
                                {{ estadoFinanciero.negocio.nombre }}
                            </span>
                            <span class="mx-1 text-gray-400">•</span>
                            <span
                                >{{ formatDate(estadoFinanciero.periodo.fecha_inicial) }} -
                                {{ formatDate(estadoFinanciero.periodo.fecha_final) }}</span
                            >
                            <span
                                v-if="estadoFinanciero.periodo.dias_periodo"
                                class="px-2 py-1 ml-2 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/50 dark:text-blue-200"
                            >
                                {{ estadoFinanciero.periodo.dias_periodo }} días
                            </span>
                        </div>
                    </div>

                    <!-- Botones de Acción (Responsive) -->
                    <div
                        class="flex flex-wrap justify-center gap-2 mt-3 sm:justify-end sm:mt-0 sm:gap-3"
                    >
                        <button
                            @click="refrescarDatos"
                            :disabled="cargando"
                            class="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all duration-300 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-400 text-white min-w-[120px] transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                        >
                            <RefreshCwIcon :class="['w-4 h-4', { 'animate-spin': cargando }]" />
                            <span>{{ cargando ? '🔄 Actualizando...' : '🔄 Refrescar' }}</span>
                        </button>

                        <button
                            @click="exportarPDF"
                            :disabled="cargando || !estadoFinanciero?.resumen_financiero"
                            class="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600 active:bg-green-700 disabled:bg-green-400 text-white min-w-[80px] transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                        >
                            <DownloadIcon class="w-4 h-4" />
                            PDF
                        </button>

                        <button
                            @click="exportarExcel"
                            :disabled="cargando || !estadoFinanciero?.resumen_financiero"
                            class="group flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all duration-300 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 disabled:bg-indigo-400 text-white min-w-[80px] transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
                        >
                            <DownloadIcon class="w-4 h-4" />
                            Excel
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Filtros (Sticky en Desktop) -->
        <div
            class="sticky top-0 z-40 -mt-px border-b-2 shadow-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-orange-200/50 dark:border-slate-800/50"
        >
            <div class="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <!-- Negocio -->
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            🏢 Negocio *
                        </label>
                        <select
                            v-model="filtros.negocio_id"
                            @change="onNegocioChange"
                            class="w-full px-3 py-3 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-300 shadow-md dark:border-slate-600 rounded-xl dark:bg-slate-800 dark:text-gray-100 focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 focus:shadow-xl"
                        >
                            <option value="">📋 Seleccionar negocio</option>
                            <option
                                v-for="negocio in negocios"
                                :key="negocio.id"
                                :value="negocio.id"
                                class="py-2"
                            >
                                {{ negocio.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Fecha Inicial -->
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            📅 Fecha Inicial *
                        </label>
                        <input
                            v-model="filtros.fecha_inicial"
                            type="date"
                            @change="onFechaChange"
                            :max="filtros.fecha_final || new Date().toISOString().split('T')[0]"
                            class="w-full px-3 py-3 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-300 shadow-md dark:border-slate-600 rounded-xl dark:bg-slate-800 dark:text-gray-100 focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 focus:shadow-xl"
                        />
                    </div>

                    <!-- Fecha Final -->
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            📆 Fecha Final *
                        </label>
                        <input
                            v-model="filtros.fecha_final"
                            type="date"
                            @change="onFechaChange"
                            :min="
                                filtros.fecha_inicial ||
                                new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0]
                            "
                            class="w-full px-3 py-3 text-gray-900 transition-all duration-200 bg-white border-2 border-gray-300 shadow-md dark:border-slate-600 rounded-xl dark:bg-slate-800 dark:text-gray-100 focus:ring-3 focus:ring-orange-500/30 focus:border-orange-500 focus:shadow-xl"
                        />
                    </div>

                    <!-- Botón Generar -->
                    <div class="pt-1 space-y-2 md:pt-6">
                        <button
                            @click="generarReporte"
                            :disabled="isGenerateButtonDisabled"
                            class="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-bold transition-all duration-300 shadow-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            :class="
                                isGenerateButtonDisabled
                                    ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-500 border border-gray-300 dark:border-slate-600'
                                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transform hover:scale-[1.02] shadow-xl hover:shadow-orange-500/20'
                            "
                        >
                            <FilterIcon class="w-4 h-4" />
                            <span>{{ cargando ? '🔄 Generando...' : '🎯 Generar Reporte' }}</span>
                        </button>
                    </div>
                </div>

                <!-- Validación de Filtros -->
                <div
                    v-if="filtrosError"
                    class="p-3 mt-3 border-2 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 rounded-xl"
                >
                    <div class="flex items-center gap-2 text-sm text-red-800 dark:text-red-200">
                        <AlertTriangleIcon class="w-5 h-5" />
                        <span>{{ filtrosError }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contenido Principal -->
        <main class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Loading State -->
            <div v-if="cargando" class="flex flex-col items-center justify-center min-h-[60vh]">
                <div class="text-center animate-pulse">
                    <div class="relative mb-6">
                        <RefreshCwIcon class="w-16 h-16 mx-auto text-orange-500 animate-spin" />
                        <div
                            class="absolute rounded-full -inset-1 bg-gradient-to-r from-orange-500/20 to-orange-600/20 blur-xl animate-pulse"
                        ></div>
                    </div>
                    <p class="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
                        Generando estado financiero global...
                    </p>
                    <div class="w-24 h-2 overflow-hidden bg-orange-100 rounded-full">
                        <div
                            class="h-2 bg-orange-500 rounded-full animate-pulse-slow"
                            style="width: 45%"
                        ></div>
                    </div>
                    <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                        Analizando ingresos, egresos y márgenes del negocio
                    </p>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center">
                <div
                    class="max-w-md p-6 text-center border-2 border-red-200 shadow-lg bg-red-50 dark:bg-red-950/80 dark:border-red-800 rounded-3xl"
                >
                    <AlertTriangleIcon class="w-16 h-16 mx-auto mb-4 text-red-500" />
                    <h3 class="mb-2 text-lg font-bold text-red-800 dark:text-red-200">
                        Error al cargar datos
                    </h3>
                    <p class="mb-4 text-red-700 dark:text-red-300">{{ error }}</p>
                    <button
                        @click="limpiarError"
                        class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl shadow-md bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                    >
                        <RefreshCwIcon class="w-4 h-4" />
                        Reintentar
                    </button>
                </div>
            </div>

            <!-- Estado Sin Datos -->
            <div
                v-else-if="!estadoFinanciero?.resumen_financiero"
                class="min-h-[60vh] flex items-center justify-center"
            >
                <div class="max-w-lg px-6 text-center">
                    <div
                        class="w-32 h-32 p-6 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-slate-800 dark:to-slate-900"
                    >
                        <ChartBarIcon class="w-20 h-20 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        No hay datos financieros
                    </h3>
                    <p class="mb-6 text-center text-gray-600 dark:text-gray-400">
                        Tu selección no produjo resultados. Verifica los filtros o selecciona un
                        rango de fechas más amplio.
                    </p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <button
                            @click="limpiarFiltros"
                            class="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 transition-colors"
                        >
                            🔄 Limpiar Filtros
                        </button>
                        <button
                            @click="generarReporte"
                            class="px-6 py-2.5 text-sm font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            🎯 Regenerar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Datos Disponibles -->
            <div v-else class="space-y-8">
                <!-- KPIs Principales (Horizontal en desktop, vertical en móvil) -->
                <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
                    <div
                        class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >Ingresos Brutos</span
                            >
                            <div class="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                                <TrendingUpIcon
                                    class="w-5 h-5 text-green-600 dark:text-green-400"
                                />
                            </div>
                        </div>
                        <div class="mb-1 text-3xl font-bold text-green-600 dark:text-green-400">
                            ${{
                                parseFloat(
                                    estadoFinanciero.resumen_financiero
                                        ?.total_ingresos_brutos_raw || 0
                                ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                            }}
                        </div>
                        <div class="text-xs text-green-500 dark:text-green-400">
                            {{
                                estadoFinanciero.estadisticas_adicionales
                                    ?.total_transacciones_ingresos || 0
                            }}
                            transacciones
                        </div>
                    </div>

                    <div
                        class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >Egresos Brutos</span
                            >
                            <div class="p-2 bg-red-100 rounded-lg dark:bg-red-900/30">
                                <TrendingDownIcon class="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <div class="mb-1 text-3xl font-bold text-red-600 dark:text-red-400">
                            ${{
                                parseFloat(
                                    estadoFinanciero.resumen_financiero?.total_egresos_brutos_raw ||
                                        0
                                ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                            }}
                        </div>
                        <div class="text-xs text-red-500 dark:text-red-400">
                            {{
                                estadoFinanciero.estadisticas_adicionales
                                    ?.total_transacciones_egresos || 0
                            }}
                            transacciones
                        </div>
                    </div>

                    <div
                        class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >Margen Bruto</span
                            >
                            <div
                                class="p-2 rounded-lg"
                                :class="[
                                    estadoFinanciero.resumen_financiero?.margen_bruto_raw >= 0
                                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30'
                                        : 'bg-red-100 text-red-600 dark:bg-red-900/30',
                                ]"
                            >
                                <ActivityIcon
                                    class="w-5 h-5"
                                    :class="[
                                        estadoFinanciero.resumen_financiero?.margen_bruto_raw >= 0
                                            ? 'text-green-500'
                                            : 'text-red-500',
                                    ]"
                                />
                            </div>
                        </div>
                        <div
                            :class="[
                                'text-3xl font-bold mb-1',
                                estadoFinanciero.resumen_financiero?.margen_bruto_raw >= 0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400',
                            ]"
                        >
                            ${{
                                Math.abs(
                                    parseFloat(
                                        estadoFinanciero.resumen_financiero?.margen_bruto_raw || 0
                                    )
                                ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                            }}
                            <span
                                v-if="estadoFinanciero.resumen_financiero?.margen_bruto_raw < 0"
                                class="text-red-600 dark:text-red-400"
                            >
                                -
                            </span>
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            Ingresos - Egresos
                        </div>
                    </div>

                    <div
                        class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >Margen Útil Antes Impuestos</span
                            >
                            <div class="p-2 bg-gray-100 rounded-lg dark:bg-gray-900/30">
                                <CalculatorIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                        </div>
                        <div class="mb-1 text-3xl font-bold text-gray-600 dark:text-gray-400">
                            $0.00
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            No considerado (en 0)
                        </div>
                    </div>

                    <div
                        class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                                >Rentabilidad %</span
                            >
                            <div class="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
                                <PercentIcon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                        <div class="mb-1 text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {{
                                parseFloat(
                                    estadoFinanciero.resumen_financiero
                                        ?.rentabilidad_porcentaje_raw || 0
                                ).toFixed(2)
                            }}%
                        </div>
                        <div class="text-xs text-purple-500 dark:text-purple-400">
                            Sobre margen bruto
                        </div>
                    </div>
                </div>

                <!-- Tabla de Detalle por Estado -->
                <div
                    class="overflow-hidden bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                >
                    <div
                        class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700"
                    >
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                                📋 Detalle por Estado de Transacción ({{
                                    estadoFinanciero.detalle_por_estado?.length || 0
                                }})
                            </h3>
                            <div class="items-center hidden gap-2 text-sm text-gray-500 sm:flex">
                                Total Transacciones:
                                {{
                                    estadoFinanciero.estadisticas_adicionales
                                        ?.total_transacciones || 0
                                }}
                            </div>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="w-full min-w-max">
                            <thead class="bg-gray-50 dark:bg-slate-700/50">
                                <tr class="border-b-2 border-gray-200 dark:border-slate-600">
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Estado
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Ingresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Egresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Tx. Ingresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Tx. Egresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Balance Estado
                                    </th>
                                </tr>
                            </thead>

                            <tbody class="divide-y divide-gray-200 dark:divide-slate-700">
                                <tr
                                    v-for="detalle in estadoFinanciero.detalle_por_estado"
                                    :key="detalle.estado_id"
                                    class="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                >
                                    <td class="px-4 py-4">
                                        <div class="flex items-center gap-2">
                                            <span
                                                class="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 border border-blue-200 rounded-full dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-500/30"
                                            >
                                                {{ detalle.estado_nombre }}
                                            </span>
                                            <div
                                                v-if="detalle.estado_descripcion"
                                                class="hidden mt-1 text-xs text-gray-500 lg:block dark:text-gray-400"
                                            >
                                                {{ detalle.estado_descripcion }}
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-green-600 dark:text-green-400"
                                        >
                                            ${{
                                                parseFloat(detalle.ingresos || 0).toLocaleString(
                                                    'es-MX',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )
                                            }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-red-600 dark:text-red-400"
                                        >
                                            ${{
                                                parseFloat(detalle.egresos || 0).toLocaleString(
                                                    'es-MX',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )
                                            }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-gray-900 dark:text-white"
                                        >
                                            {{ detalle.total_transacciones_ingresos }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-gray-900 dark:text-white"
                                        >
                                            {{ detalle.total_transacciones_egresos }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            :class="getBalanceColor(detalle.balance_estado)"
                                            class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                                        >
                                            ${{
                                                Math.abs(
                                                    parseFloat(detalle.balance_estado || 0)
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                            <span
                                                v-if="detalle.balance_estado < 0"
                                                class="text-red-600 dark:text-red-400"
                                            >
                                                -
                                            </span>
                                        </span>
                                    </td>
                                </tr>

                                <!-- Total General -->
                                <tr
                                    class="font-bold border-t-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-slate-800/50 to-slate-700/50 border-orange-200/50 dark:border-slate-800/50"
                                >
                                    <td class="px-4 py-4 text-left">
                                        <span
                                            class="text-sm font-bold text-gray-900 dark:text-white"
                                            >TOTAL GLOBAL</span
                                        >
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            class="text-xl font-bold text-green-600 dark:text-green-400"
                                        >
                                            ${{
                                                parseFloat(
                                                    estadoFinanciero.resumen_financiero
                                                        ?.total_ingresos_brutos_raw || 0
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            class="text-xl font-bold text-red-600 dark:text-red-400"
                                        >
                                            ${{
                                                parseFloat(
                                                    estadoFinanciero.resumen_financiero
                                                        ?.total_egresos_brutos_raw || 0
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            class="text-xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {{
                                                estadoFinanciero.estadisticas_adicionales
                                                    ?.total_transacciones_ingresos || 0
                                            }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            class="text-xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {{
                                                estadoFinanciero.estadisticas_adicionales
                                                    ?.total_transacciones_egresos || 0
                                            }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            :class="
                                                getBalanceColor(
                                                    parseFloat(
                                                        estadoFinanciero.resumen_financiero
                                                            ?.margen_bruto_raw || 0
                                                    )
                                                )
                                            "
                                            class="px-4 py-2 text-xl font-bold bg-white rounded-full shadow-md dark:bg-slate-800"
                                        >
                                            ${{
                                                Math.abs(
                                                    parseFloat(
                                                        estadoFinanciero.resumen_financiero
                                                            ?.margen_bruto_raw || 0
                                                    )
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                            <span
                                                v-if="
                                                    estadoFinanciero.resumen_financiero
                                                        ?.margen_bruto_raw < 0
                                                "
                                                class="text-red-600 dark:text-red-400"
                                            >
                                                -
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Nueva Sección: Detalle por Caja Operativa -->
                <div v-if="estadoFinanciero.detalle_por_caja?.length > 0" class="space-y-4">
                    <div
                        class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 dark:border-yellow-800"
                    >
                        <h3 class="text-lg font-bold text-yellow-900 dark:text-yellow-200">
                            💰 Detalle por Caja Operativa ({{
                                estadoFinanciero.detalle_por_caja.length
                            }})
                        </h3>
                        <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                            Auditoría interna: Recargas (ingresos a caja) y subtracciones (egresos
                            de caja) por estado.
                        </p>
                    </div>

                    <div
                        v-for="caja in estadoFinanciero.detalle_por_caja"
                        :key="caja.caja_operativa.id"
                        class="overflow-hidden bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                    >
                        <!-- Header de Caja -->
                        <div
                            class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700"
                        >
                            <div class="flex flex-wrap items-center justify-between gap-4">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/30">
                                        <DollarSignIcon
                                            class="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                                        />
                                    </div>
                                    <div>
                                        <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                                            {{ caja.caja_operativa.nombre }}
                                        </h4>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">
                                            {{ caja.caja_operativa.descripcion }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-sm text-right">
                                    <p class="font-semibold text-gray-700 dark:text-gray-300">
                                        Saldo Actual: ${{
                                            parseFloat(
                                                caja.caja_operativa.saldo_actual || 0
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                        Balance Período: ${{
                                            parseFloat(
                                                caja.periodo.balance_periodo || 0
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                    </p>
                                    <p class="text-xs text-yellow-600 dark:text-yellow-400">
                                        Diferencia: ${{
                                            parseFloat(caja.diferencia_saldo || 0).toLocaleString(
                                                'es-MX',
                                                { minimumFractionDigits: 2 }
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Sub-totals de Caja -->
                        <div class="p-6 bg-gray-50 dark:bg-slate-700/50">
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div class="text-center">
                                    <div
                                        class="text-2xl font-bold text-green-600 dark:text-green-400"
                                    >
                                        ${{
                                            parseFloat(
                                                caja.periodo.ingresos_recargas || 0
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                    </div>
                                    <div class="text-sm text-green-600 dark:text-green-400">
                                        Recargas ({{ caja.transacciones_totales.total_recargas }}
                                        tx.)
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                                        ${{
                                            parseFloat(
                                                caja.periodo.egresos_subtracciones || 0
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                    </div>
                                    <div class="text-sm text-red-600 dark:text-red-400">
                                        Subtracciones ({{
                                            caja.transacciones_totales.total_subtracciones
                                        }}
                                        tx.)
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div
                                        :class="[
                                            'text-2xl font-bold',
                                            caja.periodo.balance_periodo >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400',
                                        ]"
                                    >
                                        ${{
                                            Math.abs(
                                                parseFloat(caja.periodo.balance_periodo || 0)
                                            ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                        }}
                                        <span
                                            v-if="caja.periodo.balance_periodo < 0"
                                            class="text-red-600 dark:text-red-400"
                                            >-</span
                                        >
                                    </div>
                                    <div class="text-sm text-gray-600 dark:text-gray-400">
                                        Balance Neto ({{
                                            caja.transacciones_totales.total_transacciones_caja
                                        }}
                                        tx. totales)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Tabla Detalle por Estado de Caja (si existe) -->
                        <div v-if="caja.detalle_por_estado?.length > 0" class="overflow-x-auto">
                            <table class="w-full min-w-max">
                                <thead class="bg-gray-100 dark:bg-slate-700/50">
                                    <tr class="border-b-2 border-gray-200 dark:border-slate-600">
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Estado de Caja
                                        </th>
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Recargas
                                        </th>
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Subtracciones
                                        </th>
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Tx. Recargas
                                        </th>
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Tx. Subtracciones
                                        </th>
                                        <th
                                            class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                        >
                                            Balance Estado Caja
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-slate-700">
                                    <tr
                                        v-for="estado in caja.detalle_por_estado"
                                        :key="estado.estado_id"
                                        class="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                    >
                                        <td class="px-4 py-4">
                                            <span
                                                class="inline-flex items-center px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-900/20 dark:text-indigo-200"
                                            >
                                                {{ estado.estado_nombre }}
                                            </span>
                                        </td>
                                        <td class="px-4 py-4 text-right">
                                            <div
                                                class="text-sm font-semibold text-green-600 dark:text-green-400"
                                            >
                                                ${{
                                                    parseFloat(
                                                        estado.ingresos_recargas || 0
                                                    ).toLocaleString('es-MX', {
                                                        minimumFractionDigits: 2,
                                                    })
                                                }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-right">
                                            <div
                                                class="text-sm font-semibold text-red-600 dark:text-red-400"
                                            >
                                                ${{
                                                    parseFloat(
                                                        estado.egresos_subtracciones || 0
                                                    ).toLocaleString('es-MX', {
                                                        minimumFractionDigits: 2,
                                                    })
                                                }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-right">
                                            <div
                                                class="text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                {{ estado.total_transacciones_recargas }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-right">
                                            <div
                                                class="text-sm font-semibold text-gray-900 dark:text-white"
                                            >
                                                {{ estado.total_transacciones_subtracciones }}
                                            </div>
                                        </td>
                                        <td class="px-4 py-4 text-right">
                                            <span
                                                :class="getBalanceColor(estado.balance_estado_caja)"
                                                class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                                            >
                                                ${{
                                                    Math.abs(
                                                        parseFloat(estado.balance_estado_caja || 0)
                                                    ).toLocaleString('es-MX', {
                                                        minimumFractionDigits: 2,
                                                    })
                                                }}
                                                <span
                                                    v-if="estado.balance_estado_caja < 0"
                                                    class="text-red-600 dark:text-red-400"
                                                    >-</span
                                                >
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Sin Detalle por Estado -->
                        <div v-else class="p-6 text-center text-gray-500 dark:text-gray-400">
                            <p>
                                No hay detalle por estados para esta caja en el período
                                seleccionado.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Sección de Resumen por Categoría (Opcional, en tabs o acordeón si es largo) -->
                <div
                    v-if="estadoFinanciero.resumen_por_categoria?.length > 0"
                    class="overflow-hidden bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                >
                    <div
                        class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700"
                    >
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                            🏷️ Resumen por Categoría ({{
                                estadoFinanciero.resumen_por_categoria.length
                            }})
                        </h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-max">
                            <thead class="bg-gray-50 dark:bg-slate-700/50">
                                <tr class="border-b-2 border-gray-200 dark:border-slate-600">
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-left text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Categoría
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Ingresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Egresos
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Tx. Total
                                    </th>
                                    <th
                                        class="px-4 py-3 text-xs font-semibold tracking-wider text-right text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-slate-700">
                                <tr
                                    v-for="categoria in estadoFinanciero.resumen_por_categoria"
                                    :key="categoria.categoria"
                                    class="transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                                >
                                    <td class="px-4 py-4">
                                        <span
                                            class="text-sm font-semibold text-gray-900 dark:text-white"
                                        >
                                            {{ categoria.categoria }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-green-600 dark:text-green-400"
                                        >
                                            ${{
                                                parseFloat(
                                                    categoria.total_ingresos || 0
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-red-600 dark:text-red-400"
                                        >
                                            ${{
                                                parseFloat(
                                                    categoria.total_egresos || 0
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <div
                                            class="text-sm font-semibold text-gray-900 dark:text-white"
                                        >
                                            {{
                                                (categoria.cantidad_ingresos || 0) +
                                                (categoria.cantidad_egresos || 0)
                                            }}
                                        </div>
                                    </td>
                                    <td class="px-4 py-4 text-right">
                                        <span
                                            :class="getBalanceColor(categoria.balance_categoria)"
                                            class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
                                        >
                                            ${{
                                                Math.abs(
                                                    parseFloat(categoria.balance_categoria || 0)
                                                ).toLocaleString('es-MX', {
                                                    minimumFractionDigits: 2,
                                                })
                                            }}
                                            <span
                                                v-if="categoria.balance_categoria < 0"
                                                class="text-red-600 dark:text-red-400"
                                            >
                                                -
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Gráfico de Distribución por Estados -->
                <div
                    class="p-6 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-gray-200/50 dark:border-slate-700/50"
                >
                    <div class="flex items-center justify-between mb-6">
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white">
                            📈 Distribución por Estados (Importe)
                        </h4>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                            Total Importe: ${{
                                parseFloat(
                                    estadoFinanciero.resumen_financiero?.total_ingresos_brutos_raw +
                                        estadoFinanciero.resumen_financiero
                                            ?.total_egresos_brutos_raw || 0
                                ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                            }}
                        </div>
                    </div>

                    <div class="relative h-80">
                        <Pie
                            v-if="
                                pieDistribucionData.labels && pieDistribucionData.labels.length > 0
                            "
                            :data="pieDistribucionData"
                            :options="pieChartOptions"
                            class="w-full h-full"
                        />
                        <div v-else class="flex flex-col items-center justify-center h-full">
                            <ChartBarIcon class="w-16 h-16 mb-4 text-gray-400" />
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                No hay datos para mostrar en el gráfico
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Sección Opcional: Resumen de Cajas (si aplica) -->
                <div
                    v-if="estadoFinanciero.resumen_global_cajas?.total_cajas_activas > 0"
                    class="p-6 border-2 border-yellow-200 bg-yellow-50 rounded-2xl dark:bg-yellow-950/20 dark:border-yellow-800"
                >
                    <h4 class="mb-4 text-lg font-bold text-yellow-900 dark:text-yellow-200">
                        💰 Resumen de Cajas Operativas (Auditoría Interna)
                    </h4>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div class="p-4 bg-white rounded-xl dark:bg-slate-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400">Recargas Totales</p>
                            <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${{
                                    parseFloat(
                                        estadoFinanciero.resumen_global_cajas
                                            ?.total_ingresos_cajas_raw || 0
                                    ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                }}
                            </p>
                        </div>
                        <div class="p-4 bg-white rounded-xl dark:bg-slate-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400">Subtracciones</p>
                            <p class="text-2xl font-bold text-red-600 dark:text-red-400">
                                ${{
                                    parseFloat(
                                        estadoFinanciero.resumen_global_cajas
                                            ?.total_egresos_cajas_raw || 0
                                    ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                }}
                            </p>
                        </div>
                        <div class="p-4 bg-white rounded-xl dark:bg-slate-800">
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                Balance Neto Cajas
                            </p>
                            <p
                                class="text-2xl font-bold"
                                :class="[
                                    estadoFinanciero.resumen_global_cajas
                                        ?.balance_global_cajas_raw >= 0
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-red-600 dark:text-red-400',
                                ]"
                            >
                                ${{
                                    Math.abs(
                                        parseFloat(
                                            estadoFinanciero.resumen_global_cajas
                                                ?.balance_global_cajas_raw || 0
                                        )
                                    ).toLocaleString('es-MX', { minimumFractionDigits: 2 })
                                }}
                                <span
                                    v-if="
                                        estadoFinanciero.resumen_global_cajas
                                            ?.balance_global_cajas_raw < 0
                                    "
                                    class="text-red-600 dark:text-red-400"
                                >
                                    -
                                </span>
                            </p>
                            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {{
                                    estadoFinanciero.resumen_global_cajas?.total_cajas_activas || 0
                                }}
                                cajas activas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { businessesActives } from '@/services/BusinessService';
import {
    exportToExcel,
    exportToPDF,
    generateFinancialStatement, // Servicio para el endpoint global
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
import {
    ActivityIcon,
    AlertTriangleIcon,
    CalculatorIcon,
    ChartBarIcon,
    DollarSignIcon,
    DownloadIcon,
    FilterIcon,
    PercentIcon,
    RefreshCwIcon,
    TrendingDownIcon,
    TrendingUpIcon,
} from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Pie } from 'vue-chartjs';

// Registrar Chart.js correctamente
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
const filtrosError = ref('');
const negocios = ref([]);
const estadoFinanciero = ref({}); // Cambiado a estadoFinanciero para el contexto global
const error = ref('');

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
    observer = new MutationObserver(() => {
        syncTheme();
    });
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    });
    cargarNegocios();
});

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// Colores dinámicos
const colors = computed(() => ({
    primary: isDarkMode.value ? '#FB923C' : '#EA580C',
    secondary: isDarkMode.value ? '#38BDF8' : '#0EA5E9',
    success: isDarkMode.value ? '#4ADE80' : '#10B981',
    danger: isDarkMode.value ? '#F87171' : '#EF4444',
    warning: isDarkMode.value ? '#FBBF24' : '#F59E0B',
    text: isDarkMode.value ? 'rgba(229, 231, 235, 0.95)' : '#374151',
    grid: isDarkMode.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    tooltipBg: isDarkMode.value ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    tooltipBorder: isDarkMode.value ? '#FB923C' : '#EA580C',
}));

// Cargar negocios
const cargarNegocios = async () => {
    try {
        const { data } = await businessesActives();
        console.log(data);
        if (data.mensaje === 'Negocios Cargados') {
            negocios.value = data.datos || [];
        } else {
            throw new Error('No se pudieron cargar los negocios');
        }
    } catch (err) {
        console.error('Error cargando negocios:', err);
        filtrosError.value = 'No se pudieron cargar los negocios. Intenta recargar la página.';
    }
};

// Validación de filtros
const isGenerateButtonDisabled = computed(() => {
    return (
        !filtros.value.negocio_id ||
        !filtros.value.fecha_inicial ||
        !filtros.value.fecha_final ||
        cargando.value
    );
});

// Generar reporte - Adaptado para el endpoint global
const generarReporte = async () => {
    filtrosError.value = '';

    // Validar fechas
    const fechaInicio = new Date(filtros.value.fecha_inicial);
    const fechaFinal = new Date(filtros.value.fecha_final);

    if (fechaInicio > fechaFinal) {
        filtrosError.value = 'La fecha inicial no puede ser mayor que la fecha final';
        return;
    }

    cargando.value = true;

    try {
        // Llamada al servicio para el estado financiero global
        const { data } = await generateFinancialStatement({
            negocio_id: filtros.value.negocio_id,
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
        });

        if (data.status === 'success') {
            estadoFinanciero.value = data.datos;
            filtrosError.value = '';
        } else {
            throw new Error(data.message || 'Error al generar reporte');
        }
    } catch (error) {
        console.error('Error en generarReporte:', error);
        filtrosError.value =
            error.response?.data?.message || 'Error al generar el reporte. Verifica los filtros.';
        estadoFinanciero.value = {};
    } finally {
        cargando.value = false;
    }
};

// Limpiar filtros
const limpiarFiltros = () => {
    filtros.value = {
        negocio_id: '',
        fecha_inicial: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
        fecha_final: new Date().toISOString().split('T')[0],
    };
    estadoFinanciero.value = {};
    filtrosError.value = '';
};

// Limpiar error
const limpiarError = () => {
    error.value = '';
    filtrosError.value = '';
};

// Event handlers mejorados
const onNegocioChange = () => {
    if (filtros.value.negocio_id) {
        limpiarError();
    }
};

const onFechaChange = () => {
    limpiarError();
};

// Formatear fecha
const formatDate = dateString => {
    if (!dateString) return '';

    const parts = dateString.split('-');
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);

        const dayFormatted = day.toString().padStart(2, '0');
        const monthNames = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
        ];
        const monthName = monthNames[month];

        return `${dayFormatted} de ${monthName} de ${year}`;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Obtener color para balance
const getBalanceColor = balance => {
    if (balance >= 0) {
        return 'bg-green-100 text-green-800 border-green-500 dark:bg-green-900/20 dark:text-green-200 dark:border-green-500/30';
    }
    return 'bg-red-100 text-red-800 border-red-500 dark:bg-red-900/20 dark:text-red-200 dark:border-red-500/30';
};

// Exportar a Excel - Adaptado para global
const exportarExcel = async () => {
    if (!filtros.value.negocio_id) {
        filtrosError.value = 'Por favor selecciona un negocio';
        return;
    }

    try {
        const response = await exportToExcel({
            negocio_id: filtros.value.negocio_id,
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
            tipo_reporte: 'estado_financiero_global', // Diferenciador para backend
        });

        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Estado_Financiero_Global_${filtros.value.negocio_id}_${filtros.value.fecha_final}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Error exportando Excel:', err);
        filtrosError.value = 'Error al exportar a Excel';
    }
};

// Exportar a PDF - Adaptado para global
const exportarPDF = async () => {
    if (!filtros.value.negocio_id) {
        filtrosError.value = 'Por favor selecciona un negocio';
        return;
    }

    try {
        const response = await exportToPDF({
            negocio_id: filtros.value.negocio_id,
            fecha_inicial: filtros.value.fecha_inicial,
            fecha_final: filtros.value.fecha_final,
            tipo_reporte: 'estado_financiero_global', // Diferenciador para backend
        });

        const blob = new Blob([response.data], {
            type: 'application/pdf',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Estado_Financiero_Global_${filtros.value.negocio_id}_${filtros.value.fecha_final}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Error exportando PDF:', err);
        filtrosError.value = 'Error al exportar a PDF';
    }
};

// Refrescar datos
const refrescarDatos = async () => {
    if (!filtros.value.negocio_id) {
        filtrosError.value = 'Por favor selecciona un negocio';
        return;
    }
    await generarReporte();
};

// Gráfico de Distribución por Estados - Adaptado para global
const pieDistribucionData = computed(() => {
    if (!estadoFinanciero.value?.distribucion_estados?.por_importe) {
        return { labels: [], datasets: [] };
    }

    const distribucion = estadoFinanciero.value.distribucion_estados.por_importe;
    if (distribucion.length === 0) {
        return { labels: [], datasets: [] };
    }

    const labels = distribucion.map(item => item.estado_nombre);
    const data = distribucion.map(item => item.total_importe);
    const backgroundColors = [
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(236, 72, 153, 0.8)',
    ].slice(0, labels.length);

    return {
        labels,
        datasets: [
            {
                data,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                borderWidth: 3,
                hoverOffset: 12,
                hoverBorderWidth: 4,
            },
        ],
    };
});

const pieChartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: colors.value.text,
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 13,
                    weight: '600',
                },
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: colors.value.tooltipBg,
            titleColor: colors.value.primary,
            bodyColor: colors.value.text,
            borderColor: colors.value.tooltipBorder,
            borderWidth: 2,
            padding: 12,
            caretSize: 6,
            cornerRadius: 8,
            boxPadding: 4,
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
</script>

<style scoped>
/* Reset y base */
* {
    box-sizing: border-box;
}

/* Animaciones */
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse-slow {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.transform:hover {
    transform: scale(1.02);
}

/* Shadow utilities */
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradientes para modo oscuro */
.dark .bg-gradient-to-r {
    background: linear-gradient(to right, hsl(0 0% 20%) 0%, hsl(0 0% 10%) 100%);
}

/* Responsive Typography */
@media (max-width: 640px) {
    h1 {
        font-size: 1.75rem !important;
    }

    h3 {
        font-size: 1.125rem !important;
    }

    .text-3xl {
        font-size: 1.875rem !important;
    }

    .text-lg {
        font-size: 1.125rem !important;
    }
}

/* Tabla responsive */
table {
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
}

th,
td {
    padding: 0.75rem;
    vertical-align: middle;
}

/* Responsive grid */
@media (max-width: 1024px) {
    .lg\:col-span-8,
    .lg\:col-span-4 {
        grid-column: 1 / -1;
    }
}

/* Focus states */
button:focus-visible,
input:focus-visible,
select:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.2);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.15);
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}

.dark ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.15);
}

/* Print styles */
@media print {
    button,
    .header,
    .footer {
        display: none !important;
    }

    .bg-white {
        background: white !important;
        box-shadow: none !important;
    }
}
</style>
