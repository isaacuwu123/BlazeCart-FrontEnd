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
                            class="p-3 transition-transform duration-300 shadow-lg bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl hover:scale-110"
                        >
                            <ClockIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <div>
                            <h1
                                class="text-xl font-black text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text dark:from-yellow-400 dark:to-amber-400 sm:text-2xl"
                            >
                                Pagos Pendientes - Carrier
                            </h1>
                            <p class="text-sm text-slate-600 dark:text-slate-400">
                                Revisa tus pagos pendientes en Lease on
                            </p>
                        </div>
                    </div>
                    <button
                        @click="refrescarDatos"
                        class="flex items-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl hover:from-yellow-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-base hover:shadow-2xl hover:scale-105 active:scale-95"
                        aria-label="Actualizar datos"
                    >
                        <RefreshCwIcon class="w-4 h-4 mr-2 sm:w-5 sm:h-5" :stroke-width="2.5" />
                        Actualizar
                    </button>
                </div>
            </div>
        </div>

        <!-- Filtros profesionales mejorados -->
        <div
            class="px-4 py-4 border-b shadow-md bg-white/90 backdrop-blur-xl border-slate-200/50 dark:bg-slate-900/90 dark:border-slate-700/50 sm:px-6"
        >
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        class="flex items-center mb-2 space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                        <CalendarIcon class="w-4 h-4" />
                        <span>Desde</span>
                    </label>
                    <input
                        type="date"
                        v-model="filtrosPagos.fecha_desde"
                        @change="debouncedFetchPendingPayments"
                        class="w-full p-3 text-base transition-all duration-200 bg-white border shadow-sm text-slate-900 border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 hover:shadow-md"
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
                        v-model="filtrosPagos.fecha_hasta"
                        @change="debouncedFetchPendingPayments"
                        class="w-full p-3 text-base transition-all duration-200 bg-white border shadow-sm text-slate-900 border-slate-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 hover:shadow-md"
                        aria-label="Fecha hasta"
                    />
                </div>
            </div>
            <div class="mt-4">
                <button
                    @click="vaciarFiltros"
                    class="flex items-center justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 hover:shadow-xl hover:scale-105 active:scale-95"
                    aria-label="Limpiar filtros"
                >
                    <XCircleIcon class="w-4 h-4 mr-2" :stroke-width="2.5" />
                    Limpiar Filtros
                </button>
            </div>
        </div>

        <!-- Vista móvil: Tarjetas mejoradas -->
        <div class="block lg:hidden">
            <div class="p-4 space-y-4">
                <div
                    v-for="pago in pagosPendientes"
                    :key="pago.id"
                    class="p-5 transition-all duration-300 border shadow-lg bg-white/95 backdrop-blur-xl border-slate-200/50 rounded-2xl dark:bg-slate-900/95 dark:border-slate-700/50 hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
                    role="article"
                    :aria-label="`Detalles de pago pendiente: ${pago.transaction?.item}`"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h4 class="text-lg font-bold text-slate-900 dark:text-white">
                                {{ pago.transaction?.item || 'Sin descripción' }}
                            </h4>
                            <p
                                class="flex items-center mt-1 text-sm text-slate-600 dark:text-slate-400"
                            >
                                <CalendarIcon class="w-4 h-4 mr-1.5" />
                                {{ formatDate(pago.transaction?.fecha) }}
                            </p>
                        </div>
                        <span
                            class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-md bg-gradient-to-r from-yellow-600 to-amber-600"
                        >
                            ⏳ {{ pago.estado || 'Pendiente' }}
                        </span>
                    </div>
                    <div class="grid grid-cols-1 gap-4 mb-4">
                        <div
                            class="p-3 shadow-md rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
                        >
                            <p
                                class="flex items-center text-sm font-medium text-yellow-700 dark:text-yellow-300"
                            >
                                <DollarSignIcon class="w-4 h-4 mr-1.5" />
                                Monto Pendiente
                            </p>
                            <p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                ${{ pago.monto_formateado }}
                            </p>
                        </div>
                        <div class="p-3 shadow-md rounded-xl bg-slate-50 dark:bg-slate-800/60">
                            <p
                                class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                <ActivityIcon class="w-4 h-4 mr-1.5" />
                                Estado Transacción
                            </p>
                            <span
                                class="inline-block px-3 py-1 mt-1 text-sm font-bold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                            >
                                {{ pago.transaction?.estado || 'N/A' }}
                            </span>
                        </div>
                        <div class="p-3 shadow-md rounded-xl bg-slate-50 dark:bg-slate-800/60">
                            <p
                                class="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400"
                            >
                                <BuildingIcon class="w-4 h-4 mr-1.5" />
                                Negocio
                            </p>
                            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {{ pago.transaction?.negocio || 'Lease on' }}
                            </p>
                        </div>
                    </div>
                    <div class="flex pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                            @click="verPago(pago)"
                            class="flex-1 px-4 py-2 text-base font-bold transition-all duration-300 shadow-md text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 dark:bg-slate-700/60 dark:text-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:shadow-lg hover:scale-105 active:scale-95"
                            aria-label="Ver detalles de pago"
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

            <!-- Estadísticas profesionales mejoradas -->
            <div
                v-if="!loadingPagos && !errorPagos"
                class="p-6 mb-6 border shadow-xl bg-white/95 backdrop-blur-xl border-slate-200/50 rounded-2xl dark:bg-slate-900/95 dark:border-slate-700/50"
            >
                <h3
                    class="flex items-center mb-4 space-x-2 text-lg font-semibold text-slate-900 dark:text-white"
                >
                    <BarChart3Icon class="w-5 h-5 text-yellow-500" />
                    <span>Estadísticas de Pagos Pendientes</span>
                </h3>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div
                        class="p-4 text-center border shadow-lg bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200/50 rounded-2xl dark:from-yellow-900/20 dark:to-amber-900/20 dark:border-yellow-800/50"
                    >
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-xl bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl"
                        >
                            <DollarSignIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Total Pendiente
                        </p>
                        <p class="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                            ${{ estadisticasPagos.total_pendiente || '0.00' }}
                        </p>
                    </div>
                    <div
                        class="p-4 text-center border shadow-lg bg-gradient-to-br from-orange-50 to-red-50 border-orange-200/50 rounded-2xl dark:from-orange-900/20 dark:to-red-900/20 dark:border-orange-800/50"
                    >
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-xl bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl"
                        >
                            <ListIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Total Pagos
                        </p>
                        <p class="text-xl font-bold text-orange-600 dark:text-orange-400">
                            {{ estadisticasPagos.total_pendientes_count || 0 }}
                        </p>
                    </div>
                    <div
                        class="p-4 text-center border shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 rounded-2xl dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800/50"
                    >
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-2 shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl"
                        >
                            <BuildingIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Negocio
                        </p>
                        <p class="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {{ estadisticasPagos.negocio_nombre || 'Lease on' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Tabla de pagos pendientes -->
            <div
                class="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl border-slate-200/50 rounded-2xl dark:bg-slate-900/95 dark:border-slate-700/50"
            >
                <div v-if="loadingPagos" class="p-8 text-center">
                    <Loader2Icon class="w-8 h-8 mx-auto mb-4 text-yellow-500 animate-spin" />
                    <p class="text-slate-600 dark:text-slate-400">Cargando pagos pendientes...</p>
                </div>
                <div v-else-if="errorPagos" class="p-8 text-center" role="alert">
                    <div
                        class="p-4 border shadow-lg bg-gradient-to-r from-red-50 to-pink-50 border-red-200/50 rounded-2xl dark:from-red-900/30 dark:to-pink-900/30 dark:border-red-700"
                    >
                        <AlertCircleIcon
                            class="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400"
                        />
                        <p class="text-red-800 dark:text-red-200">{{ errorPagos }}</p>
                        <button
                            @click="fetchPendingPayments"
                            class="px-4 py-2 mt-4 text-white transition-all duration-300 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 hover:scale-105 active:scale-95"
                            aria-label="Reintentar carga"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
                <div v-else class="hidden lg:block">
                    <table class="w-full" role="table" aria-label="Tabla de pagos pendientes">
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
                                    📄 Transacción
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    📝 Item
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    💰 Monto
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500 dark:text-slate-300"
                                >
                                    🏢 Negocio
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
                                v-for="pago in pagosPendientes"
                                :key="pago.id"
                                class="transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                :aria-label="`Fila para ${pago.transaction?.item}`"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                                >
                                    {{ formatDate(pago.transaction?.fecha) }}
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-900 dark:text-white">
                                    {{ pago.transaction?.numero_transaccion || 'N/A' }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
                                >
                                    {{ pago.transaction?.item || 'Sin descripción' }}
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-bold text-yellow-600 whitespace-nowrap dark:text-yellow-400"
                                >
                                    ${{ pago.monto_formateado }}
                                </td>
                                <td class="px-6 py-4 text-sm text-slate-900 dark:text-white">
                                    {{ pago.transaction?.negocio || 'Lease on' }}
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-block px-3 py-1 text-xs font-bold text-blue-800 bg-blue-100 rounded-full shadow-sm dark:bg-blue-900/30 dark:text-blue-400"
                                    >
                                        {{ pago.estado }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-center whitespace-nowrap">
                                    <button
                                        @click="verPago(pago)"
                                        class="p-2 text-yellow-600 transition-all duration-200 shadow-sm rounded-xl hover:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-900/20 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:scale-110 active:scale-95"
                                        title="Ver detalles"
                                        aria-label="Ver detalles de pago"
                                    >
                                        <EyeIcon class="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="!loadingPagos && !errorPagos && pagosPendientes.length === 0"
                        class="p-12 text-center"
                        role="status"
                    >
                        <div class="text-slate-500 dark:text-slate-400">
                            <InboxIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p class="mb-2 text-lg font-medium">¡No hay pagos pendientes!</p>
                            <p>Todos tus pagos están al día.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal mejorado -->
        <Teleport to="body">
            <Transition name="modal">
                <div
                    v-if="modalVisible"
                    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    @click="cerrarModal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        class="relative w-full max-w-2xl mx-auto overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl rounded-3xl dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 animate-fade-in"
                        @click.stop
                    >
                        <div
                            class="flex items-center justify-between p-6 border-b bg-gradient-to-r from-yellow-500 to-amber-600"
                        >
                            <h3 id="modal-title" class="text-xl font-bold text-white">
                                Detalles del Pago Pendiente
                            </h3>
                            <button
                                @click="cerrarModal"
                                class="p-2 text-white transition-all duration-200 rounded-lg hover:bg-white/20 hover:scale-110 active:scale-95"
                                aria-label="Cerrar modal"
                            >
                                <XIcon class="w-5 h-5" />
                            </button>
                        </div>
                        <div class="p-6 overflow-y-auto max-h-96">
                            <div v-if="pagoSeleccionado" class="space-y-6">
                                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div
                                        class="p-4 bg-white border shadow-md dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    >
                                        <p
                                            class="flex items-center mb-2 space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                                        >
                                            <FileTextIcon class="w-4 h-4" />
                                            <span>Item</span>
                                        </p>
                                        <p class="text-lg font-bold text-slate-900 dark:text-white">
                                            {{
                                                pagoSeleccionado.transaction?.item ||
                                                'Sin descripción'
                                            }}
                                        </p>
                                    </div>
                                    <div
                                        class="p-4 bg-white border shadow-md dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    >
                                        <p
                                            class="flex items-center mb-2 space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                                        >
                                            <CalendarIcon class="w-4 h-4" />
                                            <span>Fecha</span>
                                        </p>
                                        <p class="text-lg font-bold text-slate-900 dark:text-white">
                                            {{ formatDate(pagoSeleccionado.transaction?.fecha) }}
                                        </p>
                                    </div>
                                    <div
                                        class="p-4 border border-yellow-200 shadow-md bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 dark:border-yellow-800 rounded-xl"
                                    >
                                        <p
                                            class="flex items-center mb-2 space-x-2 text-sm font-medium text-yellow-700 dark:text-yellow-300"
                                        >
                                            <DollarSignIcon class="w-4 h-4" />
                                            <span>Monto</span>
                                        </p>
                                        <p
                                            class="text-lg font-bold text-yellow-600 dark:text-yellow-400"
                                        >
                                            ${{ pagoSeleccionado.monto_formateado }}
                                        </p>
                                    </div>
                                    <div
                                        class="p-4 bg-white border shadow-md dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                                    >
                                        <p
                                            class="flex items-center mb-2 space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                                        >
                                            <HashIcon class="w-4 h-4" />
                                            <span>Número</span>
                                        </p>
                                        <p class="text-lg font-bold text-slate-900 dark:text-white">
                                            {{
                                                pagoSeleccionado.transaction?.numero_transaccion ||
                                                'N/A'
                                            }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex justify-end p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50"
                        >
                            <button
                                @click="cerrarModal"
                                class="px-6 py-3 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 hover:shadow-xl hover:scale-105 active:scale-95"
                                aria-label="Cerrar modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import { getUserPaymentPendings } from '@/services/TransactionFinancialService';
import {
    ActivityIcon,
    AlertCircleIcon,
    BarChart3Icon,
    BuildingIcon,
    CalendarIcon,
    CheckCircle2Icon,
    ClockIcon,
    DollarSignIcon,
    EyeIcon,
    FileTextIcon,
    HashIcon,
    InboxIcon,
    ListIcon,
    Loader2Icon,
    RefreshCwIcon,
    XCircleIcon,
    XIcon,
} from 'lucide-vue-next';
import { nextTick, onMounted, ref } from 'vue';

const modalVisible = ref(false);
const pagoSeleccionado = ref(null);
const filtrosPagos = ref({
    fecha_desde: '',
    fecha_hasta: '',
    page: 1,
    per_page: 10,
});
const pagosPendientes = ref([]);
const estadisticasPagos = ref({});
const pagination = ref({});
const loadingPagos = ref(false);
const errorPagos = ref('');
const message = ref('');
const success = ref(false);

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

const debouncedFetchPendingPayments = debounce(async () => {
    filtrosPagos.value.page = 1;
    await fetchPendingPayments();
}, 500);

const verPago = pago => {
    pagoSeleccionado.value = { ...pago };
    modalVisible.value = true;
    nextTick(() => {
        const modal = document.querySelector('[role="dialog"]');
        modal?.focus();
    });
};

const cerrarModal = () => {
    modalVisible.value = false;
    pagoSeleccionado.value = null;
};

const fetchPendingPayments = async () => {
    loadingPagos.value = true;
    errorPagos.value = '';
    try {
        const response = await getUserPaymentPendings(filtrosPagos.value);
        console.log('Response completa:', response);

        // CORRECCIÓN: El backend devuelve estadisticas directo en data, no en data.estadisticas
        pagosPendientes.value = response.data.data || [];
        pagination.value = response.data.pagination || {};
        estadisticasPagos.value = response.data.estadisticas || {};

        console.log('Pagos cargados:', pagosPendientes.value.length);
        console.log('Estadísticas:', estadisticasPagos.value);
    } catch (err) {
        errorPagos.value = err.response?.data?.message || 'Error al cargar pagos pendientes';
        console.error('[PendingPayments] Error:', err);
    } finally {
        loadingPagos.value = false;
    }
};

const formatDate = date => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const refrescarDatos = async () => {
    await fetchPendingPayments();
    message.value = 'Datos actualizados correctamente';
    success.value = true;
    setTimeout(() => (message.value = ''), 3000);
};

const vaciarFiltros = () => {
    filtrosPagos.value = {
        ...filtrosPagos.value,
        fecha_desde: '',
        fecha_hasta: '',
        page: 1,
    };
    debouncedFetchPendingPayments();
    message.value = 'Filtros limpiados.';
    success.value = true;
    setTimeout(() => (message.value = ''), 2000);
};

onMounted(async () => {
    await fetchPendingPayments();
    console.log('[PendingPayments] Component mounted');
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

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from > div,
.modal-leave-to > div {
    transform: scale(0.9) translateY(20px);
}
</style>
