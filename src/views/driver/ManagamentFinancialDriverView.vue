<template>
    <div
        class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
    >
        <!-- Header profesional mejorado -->
        <div
            class="sticky top-0 z-40 border-b shadow-xl bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50"
        >
            <div class="px-4 py-4 sm:px-6">
                <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div class="flex items-center space-x-4">
                        <div
                            class="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl hover:scale-110"
                        >
                            <CalculatorIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <div>
                            <h1
                                class="text-xl font-black text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text dark:from-blue-400 dark:to-indigo-400 sm:text-2xl"
                            >
                                Egresos Financieros - Lease on
                            </h1>
                            <p class="text-sm text-slate-600 dark:text-slate-400">
                                Visualización de transacciones, caja operativa y archivos adjuntos
                            </p>
                        </div>
                    </div>
                    <button
                        @click="crearNuevaTransaccion"
                        class="flex items-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-base hover:shadow-2xl hover:scale-105 active:scale-95"
                        aria-label="Crear nuevo egreso"
                    >
                        <PlusCircleIcon class="w-5 h-5 mr-2" :stroke-width="2.5" />
                        Nuevo Egreso
                    </button>
                </div>
            </div>
        </div>

        <!-- Filtros profesionales mejorados -->
        <div
            class="px-4 py-4 border-b shadow-md bg-white/90 backdrop-blur-xl border-slate-200/50 dark:bg-slate-900/90 dark:border-slate-700/50 sm:px-6"
        >
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <div>
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <BuildingIcon class="w-4 h-4" />
                        <span>Negocio</span>
                    </label>
                    <div
                        class="p-3 text-base font-semibold text-center text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
                    >
                        🏢 Lease on
                    </div>
                </div>
                <div>
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <TrendingDownIcon class="w-4 h-4" />
                        <span>Tipo</span>
                    </label>
                    <div
                        class="p-3 text-base font-semibold text-center text-white shadow-lg bg-gradient-to-r from-red-600 to-pink-600 rounded-xl"
                    >
                        💸 Egreso
                    </div>
                    <input
                        type="hidden"
                        v-model="filtrosTransacciones.tipo_transaccion"
                        value="Egreso"
                    />
                </div>
                <div>
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <CalendarIcon class="w-4 h-4" />
                        <span>Desde</span>
                    </label>
                    <input
                        type="date"
                        v-model="filtrosTransacciones.fecha_desde"
                        @change="debouncedFetchTransactions"
                        class="w-full p-3 text-base transition-all duration-200 bg-white border shadow-sm text-slate-900 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 hover:shadow-md"
                        aria-label="Fecha desde"
                    />
                </div>
                <div>
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <CalendarIcon class="w-4 h-4" />
                        <span>Hasta</span>
                    </label>
                    <input
                        type="date"
                        v-model="filtrosTransacciones.fecha_hasta"
                        @change="debouncedFetchTransactions"
                        class="w-full p-3 text-base transition-all duration-200 bg-white border shadow-sm text-slate-900 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 hover:shadow-md"
                        aria-label="Fecha hasta"
                    />
                </div>
                <div class="hidden lg:block">
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <FilterIcon class="w-4 h-4" />
                        <span>Estado</span>
                    </label>
                    <div class="relative">
                        <select
                            v-model="filtrosTransacciones.estado_id"
                            @change="debouncedFetchTransactions"
                            class="w-full p-3 pr-10 text-base transition-all duration-200 bg-white border shadow-sm appearance-none text-slate-900 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 hover:shadow-md"
                            aria-label="Filtrar por estado"
                        >
                            <option value="">Todos los estados</option>
                            <option
                                v-for="estado in estadosDisponibles"
                                :key="estado.id"
                                :value="estado.id"
                            >
                                {{ estado.nombre }}
                            </option>
                        </select>
                        <ChevronDownIcon
                            class="absolute w-5 h-5 transition-transform -translate-y-1/2 pointer-events-none right-3 top-1/2 text-slate-400"
                            :class="{ 'rotate-180': filtrosTransacciones.estado_id }"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-3 mt-4 sm:flex-row sm:justify-between sm:items-center">
                <div class="flex flex-col gap-3 sm:flex-row">
                    <button
                        @click="refrescarDatos"
                        class="flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:w-auto hover:shadow-xl hover:scale-105 active:scale-95"
                        aria-label="Actualizar datos"
                    >
                        <RefreshCwIcon class="w-4 h-4 mr-2" :stroke-width="2.5" />
                        Actualizar
                    </button>
                    <button
                        @click="vaciarFiltros"
                        class="flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl hover:from-slate-600 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 sm:w-auto hover:shadow-xl hover:scale-105 active:scale-95"
                        aria-label="Limpiar filtros"
                    >
                        <XCircleIcon class="w-4 h-4 mr-2" :stroke-width="2.5" />
                        Limpiar Filtros
                    </button>
                    <button
                        @click="exportarExcel"
                        :disabled="cargandoExcel"
                        class="flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto disabled:opacity-50 hover:shadow-xl hover:scale-105 active:scale-95"
                        :aria-label="cargandoExcel ? 'Exportando...' : 'Exportar a Excel'"
                    >
                        <Loader2Icon
                            v-if="cargandoExcel"
                            class="w-4 h-4 mr-2 animate-spin"
                            :stroke-width="2.5"
                        />
                        <FileDownIcon v-else class="w-4 h-4 mr-2" :stroke-width="2.5" />
                        {{ cargandoExcel ? 'Exportando...' : 'Exportar Excel' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Vista móvil: Tarjetas mejoradas -->
        <div class="block lg:hidden">
            <div class="p-4 space-y-4">
                <div
                    v-for="transaccion in transacciones"
                    :key="transaccion.id"
                    class="p-5 transition-all duration-300 border shadow-lg bg-white/95 backdrop-blur-xl border-slate-200/50 rounded-2xl dark:bg-slate-900/95 dark:border-slate-700/50 hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
                    role="article"
                    :aria-label="`Detalles de egreso: ${transaccion.item}`"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h4 class="text-lg font-bold text-slate-900 dark:text-white">
                                {{ transaccion.item }}
                            </h4>
                            <p
                                class="flex items-center mt-1 text-sm text-slate-600 dark:text-slate-400"
                            >
                                <CalendarIcon class="w-4 h-4 mr-1.5" />
                                {{ formatDate(transaccion.fecha) }}
                            </p>
                        </div>
                        <span
                            class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md bg-gradient-to-r from-red-600 to-pink-600"
                        >
                            💸 Egreso
                        </span>
                    </div>
                    <div
                        class="p-3 mb-3 shadow-md rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
                    >
                        <p
                            class="flex items-center text-sm font-medium text-blue-700 dark:text-blue-300"
                        >
                            <WalletIcon class="w-4 h-4 mr-1.5" />
                            Caja Operativa
                        </p>
                        <p class="text-sm font-semibold text-blue-900 dark:text-blue-100">
                            {{ transaccion.cajaOperativa?.nombre || 'Sin Caja' }}
                            <span
                                v-if="transaccion.cajaOperativa?.saldo"
                                class="ml-2 text-xs text-slate-600 dark:text-slate-400"
                            >
                                (Saldo: ${{ formatCurrency(transaccion.cajaOperativa.saldo) }})
                            </span>
                        </p>
                    </div>
                    <div class="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
                        <div class="p-3 shadow-md rounded-xl bg-slate-50 dark:bg-slate-800/60">
                            <p
                                class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                <DollarSignIcon class="w-4 h-4 mr-1.5" />
                                Importe
                            </p>
                            <p class="text-xl font-bold text-red-600 dark:text-red-400">
                                ${{ formatCurrency(transaccion.importe_total) }}
                            </p>
                        </div>
                        <div class="p-3 shadow-md rounded-xl bg-slate-50 dark:bg-slate-800/60">
                            <p
                                class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                <ActivityIcon class="w-4 h-4 mr-1.5" />
                                Estado
                            </p>
                            <span
                                :class="getStatusColor(transaccion.estadoDeTransaccion?.nombre)"
                                class="inline-block px-3 py-1 mt-1 text-sm font-bold rounded-full shadow-sm"
                            >
                                {{ transaccion.estadoDeTransaccion?.nombre || 'Sin Estado' }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-between p-3 mb-4 shadow-md rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
                    >
                        <div>
                            <p
                                class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                <FolderIcon class="w-4 h-4 mr-1.5" />
                                Archivos
                            </p>
                            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {{ transaccion.archivos_count || 0 }} adjunto(s)
                            </p>
                        </div>
                        <div
                            v-if="transaccion.pendingPayment?.monto > 0"
                            class="p-2 bg-red-100 rounded-full shadow-md dark:bg-red-900/30"
                        >
                            <span class="text-xs font-bold text-red-800 dark:text-red-300">
                                ⏳ Pendiente: {{ formatCurrency(transaccion.pendingPayment.monto) }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex pt-4 space-x-3 border-t border-slate-200 dark:border-slate-700"
                    >
                        <button
                            @click="verTransaccion(transaccion)"
                            class="flex-1 px-4 py-2 text-base font-bold text-blue-700 transition-all duration-300 bg-blue-100 shadow-md rounded-xl hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:scale-105 active:scale-95"
                            aria-label="Ver detalles de transacción"
                        >
                            <EyeIcon class="w-5 h-5 mx-auto mb-1" />
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contenido principal -->
        <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Mensajes de feedback mejorados -->
            <div v-if="message" class="mb-6 animate-fade-in" role="alert" aria-live="polite">
                <div
                    :class="
                        success
                            ? 'p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-400/50 text-green-800 rounded-2xl shadow-lg dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-800 dark:text-green-300'
                            : 'p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-400/50 text-red-800 rounded-2xl shadow-lg dark:from-red-900/30 dark:to-pink-900/30 dark:border-red-800 dark:text-red-300'
                    "
                    role="status"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <CheckCircle2Icon v-if="success" class="w-5 h-5" />
                            <AlertCircleIcon v-else class="w-5 h-5" />
                            <span class="font-semibold">{{ message }}</span>
                        </div>
                        <button
                            @click="message = ''"
                            class="p-1 transition-colors rounded-lg hover:bg-white/30 dark:hover:bg-black/20"
                            aria-label="Cerrar mensaje"
                        >
                            <XIcon class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabla de transacciones -->
            <div
                class="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl border-slate-200/50 rounded-2xl dark:bg-slate-900/95 dark:border-slate-700/50"
            >
                <div v-if="loadingTransactions" class="p-8 text-center">
                    <Loader2Icon class="w-8 h-8 mx-auto mb-4 text-blue-500 animate-spin" />
                    <p class="text-slate-600 dark:text-slate-400">Cargando egresos...</p>
                </div>
                <div v-else-if="errorTransactions" class="p-8 text-center" role="alert">
                    <div
                        class="p-4 border shadow-lg bg-gradient-to-r from-red-50 to-pink-50 border-red-200/50 rounded-2xl dark:from-red-900/30 dark:to-pink-900/30 dark:border-red-700"
                    >
                        <AlertCircleIcon
                            class="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400"
                        />
                        <p class="text-red-800 dark:text-red-200">{{ errorTransactions }}</p>
                        <button
                            @click="fetchTransactions"
                            class="px-4 py-2 mt-4 text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105 active:scale-95"
                            aria-label="Reintentar carga"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
                <div v-else class="hidden lg:block">
                    <table class="w-full" role="table" aria-label="Tabla de egresos">
                        <thead
                            class="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700"
                        >
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    📅 Fecha
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    📝 Item
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    💸 Importe
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    💳 Caja Operativa
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-500 dark:text-slate-300"
                                >
                                    📁 Archivos
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    📊 Estado
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-slate-500 dark:text-slate-300"
                                >
                                    ⚡ Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="bg-white divide-y divide-slate-200 dark:bg-slate-900 dark:divide-slate-700"
                        >
                            <tr
                                v-for="transaccion in transacciones"
                                :key="transaccion.id"
                                class="transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                :aria-label="`Fila para ${transaccion.item}`"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                                >
                                    {{ formatDate(transaccion.fecha) }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                                >
                                    {{ transaccion.item }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-bold text-red-600 whitespace-nowrap dark:text-red-400"
                                >
                                    ${{ formatCurrency(transaccion.importe_total) }}
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-900 dark:text-white">
                                    {{ transaccion.cajaOperativa?.nombre || 'Sin Caja' }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm text-center text-slate-900 dark:text-white"
                                >
                                    {{ transaccion.archivos_count || 0 }}
                                    <span
                                        v-if="transaccion.pendingPayment?.monto > 0"
                                        class="block text-xs font-bold text-orange-600"
                                    >
                                        ⏳ Pendiente:
                                        {{ formatCurrency(transaccion.pendingPayment.monto) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        :class="
                                            getStatusColor(transaccion.estadoDeTransaccion?.nombre)
                                        "
                                        class="inline-block px-3 py-1 text-xs font-bold rounded-full shadow-sm"
                                    >
                                        {{
                                            transaccion.estadoDeTransaccion?.nombre || 'Sin Estado'
                                        }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center whitespace-nowrap">
                                    <div class="flex justify-center space-x-2">
                                        <button
                                            @click="verTransaccion(transaccion)"
                                            class="p-2 text-blue-600 transition-all duration-200 shadow-sm rounded-xl hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 active:scale-95"
                                            title="Ver detalles"
                                            aria-label="Ver detalles de transacción"
                                        >
                                            <EyeIcon class="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Estado vacío mejorado -->
                <div
                    v-if="!loadingTransactions && !errorTransactions && transacciones.length === 0"
                    class="p-12 text-center"
                    role="status"
                >
                    <div class="text-slate-500 dark:text-slate-400">
                        <InboxIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p class="mb-2 text-lg font-medium">No hay egresos registrados</p>
                        <p>Ajusta los filtros o crea un nuevo egreso para comenzar.</p>
                        <button
                            @click="crearNuevaTransaccion"
                            class="px-4 py-2 mt-4 text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 active:scale-95"
                            aria-label="Crear primer egreso"
                        >
                            Crear Primer Egreso
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paginación mejorada -->
        <div
            v-if="pagination.last_page > 1"
            class="flex flex-col items-center justify-between px-6 py-4 border-t shadow-md border-slate-200 sm:flex-row bg-slate-50/90 backdrop-blur-xl dark:bg-slate-800/90 dark:border-slate-700"
        >
            <div class="flex items-center mb-4 space-x-2 sm:mb-0">
                <button
                    @click="cambiarPagina(pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white border shadow-sm text-slate-700 border-slate-300 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 hover:scale-105 active:scale-95"
                    :aria-label="`Página anterior: ${pagination.current_page - 1}`"
                >
                    ← Anterior
                </button>
                <div class="flex space-x-1">
                    <button
                        v-for="pagina in getPaginacionVisible()"
                        :key="pagina"
                        @click="cambiarPagina(pagina)"
                        :class="[
                            'px-3 py-2 text-sm font-medium border rounded-xl transition-all duration-200 shadow-sm',
                            pagina === pagination.current_page
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md scale-110'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 active:scale-95',
                        ]"
                        :disabled="pagina === pagination.current_page"
                        :aria-label="`Ir a página ${pagina}`"
                    >
                        {{ pagina }}
                    </button>
                </div>
                <button
                    @click="cambiarPagina(pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-4 py-2 text-sm font-medium transition-all duration-200 bg-white border shadow-sm text-slate-700 border-slate-300 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700 hover:scale-105 active:scale-95"
                    :aria-label="`Página siguiente: ${pagination.current_page + 1}`"
                >
                    Siguiente →
                </button>
            </div>
            <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
                Página {{ pagination.current_page }} de {{ pagination.last_page }} ({{
                    pagination.total || 0
                }}
                egresos)
            </span>
        </div>

        <!-- Modal de visualización SOLAMENTE -->
        <transition name="modal-fade">
            <div
                v-if="modalVisible"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm"
                @click.self="cerrarModal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    class="relative w-full max-w-4xl overflow-hidden transition-all duration-300 transform bg-white shadow-2xl dark:bg-slate-900 rounded-3xl animate-scale-in"
                >
                    <!-- Modal Header -->
                    <div
                        class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-slate-200 dark:border-slate-700"
                    >
                        <div class="flex items-center space-x-3">
                            <div
                                class="p-2 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl"
                            >
                                <EyeIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                            </div>
                            <div>
                                <h3
                                    id="modal-title"
                                    class="text-xl font-black text-slate-900 dark:text-white"
                                >
                                    Detalles del Egreso
                                </h3>
                                <p class="text-sm text-slate-600 dark:text-slate-400">
                                    Información completa de la transacción
                                </p>
                            </div>
                        </div>
                        <button
                            @click="cerrarModal"
                            class="p-2 transition-all duration-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-110 active:scale-95"
                            aria-label="Cerrar modal"
                        >
                            <XIcon class="w-6 h-6 text-slate-600 dark:text-slate-400" />
                        </button>
                    </div>

                    <!-- Modal Content -->
                    <div class="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div
                            v-if="transaccionSeleccionada"
                            class="grid grid-cols-1 gap-6 md:grid-cols-2"
                        >
                            <!-- Info básica -->
                            <div
                                class="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            >
                                <h4
                                    class="flex items-center mb-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    <FileTextIcon class="w-4 h-4 mr-2" />
                                    Información General
                                </h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Item:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ transaccionSeleccionada.item }}</span
                                        >
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Fecha:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ formatDate(transaccionSeleccionada.fecha) }}</span
                                        >
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Cantidad:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ transaccionSeleccionada.cantidad }}</span
                                        >
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Estado:</span
                                        >
                                        <span
                                            :class="
                                                getStatusColor(
                                                    transaccionSeleccionada.estadoDeTransaccion
                                                        ?.nombre
                                                )
                                            "
                                            class="px-2 py-1 text-xs font-bold rounded-full"
                                        >
                                            {{
                                                transaccionSeleccionada.estadoDeTransaccion
                                                    ?.nombre || 'Sin Estado'
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Info financiera -->
                            <div
                                class="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            >
                                <h4
                                    class="flex items-center mb-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    <DollarSignIcon class="w-4 h-4 mr-2" />
                                    Información Financiera
                                </h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Importe:</span
                                        >
                                        <span
                                            class="text-lg font-bold text-red-600 dark:text-red-400"
                                            >${{
                                                formatCurrency(
                                                    transaccionSeleccionada.importe_total
                                                )
                                            }}</span
                                        >
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Caja:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{
                                                transaccionSeleccionada.cajaOperativa?.nombre ||
                                                'Sin Caja'
                                            }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between"
                                        v-if="transaccionSeleccionada.cajaOperativa?.saldo"
                                    >
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Saldo:</span
                                        >
                                        <span class="font-semibold text-slate-900 dark:text-white"
                                            >${{
                                                formatCurrency(
                                                    transaccionSeleccionada.cajaOperativa.saldo
                                                )
                                            }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between"
                                        v-if="transaccionSeleccionada.pendingPayment?.monto > 0"
                                    >
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Pendiente:</span
                                        >
                                        <span class="font-bold text-orange-600 dark:text-orange-400"
                                            >${{
                                                formatCurrency(
                                                    transaccionSeleccionada.pendingPayment.monto
                                                )
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Ubicación -->
                            <div
                                class="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                                v-if="
                                    transaccionSeleccionada.punto_de_partida ||
                                    transaccionSeleccionada.destino
                                "
                            >
                                <h4
                                    class="flex items-center mb-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    <MapPinIcon class="w-4 h-4 mr-2" />
                                    Ubicación
                                </h4>
                                <div class="space-y-2 text-sm">
                                    <div
                                        class="flex justify-between"
                                        v-if="transaccionSeleccionada.punto_de_partida"
                                    >
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Origen:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ transaccionSeleccionada.punto_de_partida }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between"
                                        v-if="transaccionSeleccionada.destino"
                                    >
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Destino:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ transaccionSeleccionada.destino }}</span
                                        >
                                    </div>
                                    <div
                                        class="flex justify-between"
                                        v-if="transaccionSeleccionada.millas"
                                    >
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Millas:</span
                                        >
                                        <span
                                            class="font-semibold text-slate-900 dark:text-white"
                                            >{{ transaccionSeleccionada.millas }}</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Archivos -->
                            <div
                                class="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            >
                                <h4
                                    class="flex items-center mb-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    <FolderIcon class="w-4 h-4 mr-2" />
                                    Archivos Adjuntos
                                </h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-slate-600 dark:text-slate-400"
                                            >Total:</span
                                        >
                                        <span class="font-semibold text-slate-900 dark:text-white"
                                            >{{
                                                transaccionSeleccionada.archivos_count || 0
                                            }}
                                            archivo(s)</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Observaciones -->
                            <div
                                class="p-4 border md:col-span-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                                v-if="transaccionSeleccionada.observaciones"
                            >
                                <h4
                                    class="flex items-center mb-3 text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    <FileTextIcon class="w-4 h-4 mr-2" />
                                    Observaciones
                                </h4>
                                <p class="text-sm text-slate-600 dark:text-slate-400">
                                    {{ transaccionSeleccionada.observaciones }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div
                        class="flex justify-end p-6 border-t bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    >
                        <button
                            @click="cerrarModal"
                            class="px-6 py-3 text-base font-bold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 hover:shadow-xl hover:scale-105 active:scale-95"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { businessesActivesDriver } from '@/services/BusinessService';
import {
    exportTransactionsToExcelDriver,
    getUserTransactions,
} from '@/services/TransactionFinancialService';
import {
    ActivityIcon,
    AlertCircleIcon,
    BuildingIcon,
    CalculatorIcon,
    CalendarIcon,
    CheckCircle2Icon,
    ChevronDownIcon,
    DollarSignIcon,
    EyeIcon,
    FileDownIcon,
    FileTextIcon,
    FilterIcon,
    FolderIcon,
    InboxIcon,
    Loader2Icon,
    MapPinIcon,
    PlusCircleIcon,
    RefreshCwIcon,
    TrendingDownIcon,
    WalletIcon,
    XCircleIcon,
    XIcon,
} from 'lucide-vue-next';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const modalVisible = ref(false);
const transaccionSeleccionada = ref(null);
const estadosDisponibles = ref([
    { id: 1, nombre: 'Por Pagar' },
    { id: 2, nombre: 'Pagado' },
    { id: 3, nombre: 'Pago Parcial' },
    { id: 4, nombre: 'Por Cobrar' },
]);
const filtrosTransacciones = ref({
    fecha_desde: '',
    fecha_hasta: '',
    estado_id: '',
    tipo_transaccion: 'Egreso',
    page: 1,
    per_page: 15,
});
const transacciones = ref([]);
const pagination = ref({});
const loadingTransactions = ref(false);
const errorTransactions = ref('');
const message = ref('');
const success = ref(false);
const negocios = ref([]);
const cargandoExcel = ref(false);

// Debounce implementation
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const debouncedFetchTransactions = debounce(async () => {
    if (
        filtrosTransacciones.value.fecha_desde ||
        filtrosTransacciones.value.fecha_hasta ||
        filtrosTransacciones.value.estado_id
    ) {
        filtrosTransacciones.value.page = 1;
        await fetchTransactions();
    }
}, 500);

const handleBodyScroll = prevent => {
    if (prevent) {
        const scrollY = window.scrollY;
        document.body.classList.add('overflow-hidden');
        document.body.style.top = `-${scrollY}px`;
    } else {
        const scrollY = document.body.style.top || '0';
        document.body.classList.remove('overflow-hidden');
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
};

const verTransaccion = transaccion => {
    console.log(transaccion);
    transaccionSeleccionada.value = { ...transaccion };
    modalVisible.value = true;
    handleBodyScroll(true);
    nextTick(() => {
        const modal = document.querySelector('[role="dialog"]');
        modal?.focus();
    });
};

const cerrarModal = () => {
    modalVisible.value = false;
    handleBodyScroll(false);
    transaccionSeleccionada.value = null;
};

const fetchTransactions = async () => {
    loadingTransactions.value = true;
    errorTransactions.value = '';
    try {
        const { data } = await getUserTransactions(filtrosTransacciones.value);
        console.log(data);
        transacciones.value = data.data || [];
        pagination.value = data.pagination || {};
    } catch (err) {
        errorTransactions.value = err.response?.data?.message || 'Error al cargar egresos';
        console.warn('Error fetching transactions:', err);
        message.value = 'Error en la carga. Revisa tu conexión.';
        success.value = false;
    } finally {
        loadingTransactions.value = false;
    }
};

const cargarNegocios = async () => {
    try {
        const { data } = await businessesActivesDriver();
        negocios.value = data.datos || [];
    } catch (err) {
        console.warn('Error loading businesses:', err);
        negocios.value = [
            { id: 1, nombre: 'FLIP 4' },
            { id: 2, nombre: 'Lease on' },
            { id: 3, nombre: 'NEGOCIO B' },
        ];
    }
};

const getStatusColor = estado => {
    const colors = {
        Pagado: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'Por Cobrar': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        'Pago Parcial': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        'Por Pagar': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    };
    return colors[estado] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
};

const refrescarDatos = async () => {
    await fetchTransactions();
    message.value = 'Datos actualizados correctamente';
    success.value = true;
    setTimeout(() => (message.value = ''), 3000);
};

const crearNuevaTransaccion = () => {
    router.push({ path: '/formulario' });
};

const cambiarPagina = async pagina => {
    if (pagina < 1 || pagina > pagination.value.last_page) return;
    filtrosTransacciones.value.page = pagina;
    await fetchTransactions();
};

const getPaginacionVisible = () => {
    const current = pagination.value.current_page;
    const last = pagination.value.last_page;
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i);
    }
    if (current - delta > 2) range.unshift('...');
    if (current + delta < last - 1) range.push('...');
    return [1, ...range, last].filter(p => p !== '...');
};

const formatDate = date => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const formatCurrency = value => {
    if (!value) return '0.00';
    return parseFloat(value).toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const vaciarFiltros = () => {
    filtrosTransacciones.value = {
        ...filtrosTransacciones.value,
        fecha_desde: '',
        fecha_hasta: '',
        estado_id: '',
        page: 1,
    };
    debouncedFetchTransactions();
    message.value = 'Filtros limpiados.';
    success.value = true;
    setTimeout(() => (message.value = ''), 2000);
};

const exportarExcel = async () => {
    cargandoExcel.value = true;
    errorTransactions.value = '';
    try {
        const filtrosExport = {
            fecha_desde: filtrosTransacciones.value.fecha_desde,
            fecha_hasta: filtrosTransacciones.value.fecha_hasta,
            estado_id: filtrosTransacciones.value.estado_id,
            negocio_id: 1,
            tipo_transaccion: 'Egreso',
        };

        const response = await exportTransactionsToExcelDriver(filtrosExport);
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().split('T')[0];
        link.download = `Egresos_Lease_on_${fechaFormateada}.xlsx`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        message.value = 'Exportación completada exitosamente.';
        success.value = true;
        setTimeout(() => (message.value = ''), 3000);
    } catch (err) {
        console.warn('Error exporting Excel:', err);
        errorTransactions.value =
            err.response?.data?.message || 'Error al exportar. Verifica filtros.';
        message.value = 'Error en exportación.';
        success.value = false;
        setTimeout(() => (message.value = ''), 3000);
    } finally {
        cargandoExcel.value = false;
    }
};

onMounted(async () => {
    await cargarNegocios();
    await fetchTransactions();
});

onUnmounted(() => {
    handleBodyScroll(false);
});
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-in;
}
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

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
