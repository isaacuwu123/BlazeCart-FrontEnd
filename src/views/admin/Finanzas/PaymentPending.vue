<template>
    <div
        class="min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        "
    >
        <!-- Header -->
        <div
            class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div
                class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between"
            >
                <div class="flex items-center space-x-2 sm:space-x-4">
                    <div
                        class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 sm:p-3"
                    >
                        <ClockIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Pagos Pendientes
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los pagos pendientes del sistema
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Search and Filters -->
        <div
            class="p-3 mb-3 transition-colors duration-200 shadow-lg rounded-xl sm:p-4 lg:p-6 sm:mb-4 lg:mb-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
                <div class="relative flex-1">
                    <SearchIcon
                        class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar pagos pendientes..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="pendiente">Pendientes</option>
                    <option value="pagado">Pagados</option>
                    <option value="cancelado">Cancelados</option>
                </select>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Total Pagos
                </h3>
                <p class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ filteredPayments.length }}
                </p>
            </div>
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Pendientes
                </h3>
                <p
                    class="text-xl font-bold text-yellow-500"
                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                >
                    {{ filteredPayments.filter(p => p.estado === 'pendiente').length }}
                </p>
            </div>
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Pagados
                </h3>
                <p
                    class="text-xl font-bold text-green-500"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                >
                    {{ filteredPayments.filter(p => p.estado === 'pagado').length }}
                </p>
            </div>
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <h3
                    class="mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Monto Total Pendiente
                </h3>
                <p
                    class="text-xl font-bold"
                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                >
                    {{ formatCurrency(totalPendingAmount) }}
                </p>
            </div>
        </div>

        <!-- Desktop Table -->
        <div
            class="hidden overflow-hidden transition-colors duration-200 shadow-lg lg:block rounded-xl"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div class="overflow-x-auto">
                <table
                    class="min-w-full divide-y"
                    :class="isDarkMode ? 'divide-gray-700' : 'divide-gray-200'"
                >
                    <thead class="bg-gradient-to-r from-blue-500 to-purple-600">
                        <tr>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Numero Transacción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Conductor
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Negocio
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Monto
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Descripción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Estado
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Fecha
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y"
                        :class="
                            isDarkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'
                        "
                    >
                        <tr
                            v-for="payment in paginatedPayments"
                            :key="payment.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ payment.financial_transaction.numero_transaccion }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ getResponsibleName(payment) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    {{ payment.negocio?.nombre }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                                >
                                    {{ formatCurrency(payment.monto) }}
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    {{ payment.descripcion }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        payment.estado === 'pendiente'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                            : payment.estado === 'pagado'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    "
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ payment.estado }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    {{ formatDate(payment.created_at) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        v-if="payment.estado === 'pendiente'"
                                        @click="confirmProcessPayment(payment)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Procesar pago"
                                    >
                                        <CheckIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-if="payment.estado === 'pendiente'"
                                        @click="confirmCancelPayment(payment)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                        title="Cancelar pago"
                                    >
                                        <XIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-if="payment.estado === 'pagado'"
                                        @click="viewTransaction(payment.financial_transaction_id)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Ver transacción"
                                    >
                                        <EyeIcon class="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Mobile Cards -->
        <div class="space-y-3 sm:space-y-4 lg:hidden">
            <div
                v-for="payment in paginatedPayments"
                :key="payment.id"
                class="p-4 transition-colors duration-200 border-l-4 border-blue-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600"
                        >
                            <ClockIcon class="w-5 h-5 text-white sm:w-6 sm:h-6" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Pago #{{ payment.id }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                {{ getDriverName(payment) }}
                            </p>
                        </div>
                    </div>
                    <span
                        :class="
                            payment.estado === 'pendiente'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                : payment.estado === 'pagado'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        "
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
                    >
                        {{ payment.estado }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <BuildingIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ payment.negocio?.nombre }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <DollarSignIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatCurrency(payment.monto) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatDate(payment.created_at) }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        v-if="payment.estado === 'pendiente'"
                        @click="confirmProcessPayment(payment)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Procesar pago"
                    >
                        <CheckIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-if="payment.estado === 'pendiente'"
                        @click="confirmCancelPayment(payment)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Cancelar pago"
                    >
                        <XIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-if="payment.estado === 'pagado'"
                        @click="viewTransaction(payment.financial_transaction_id)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Ver transacción"
                    >
                        <EyeIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div
            class="flex justify-center mt-4 space-x-2"
            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50"
            >
                Anterior
            </button>
            <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedPayments.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <ClockIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron pagos pendientes
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros.
                </p>
            </div>
        </div>

        <!-- Process Payment Confirmation Modal -->
        <div
            v-if="showProcessModal"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Procesar Pago Pendiente
                        </h2>
                        <button
                            @click="closeProcessModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div class="mb-6">
                        <p
                            class="text-base transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            ¿Está seguro que desea procesar el pago pendiente por
                            <span
                                class="font-bold"
                                :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                            >
                                {{ formatCurrency(selectedPayment?.monto) }}
                            </span>
                            al conductor
                            <span
                                class="font-bold"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ getDriverName(selectedPayment) }} </span
                            >?
                        </p>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Esta acción descontará el monto de la caja operativa y registrará una
                            transacción financiera.
                        </p>
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="errorMessage"
                        class="p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20"
                    >
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg
                                    class="w-5 h-5 text-red-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800 dark:text-red-300">
                                    Error al procesar el pago
                                </h3>
                                <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                                    {{ errorMessage }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div
                        class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                        :class="
                            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        "
                    >
                        <button
                            type="button"
                            @click="closeProcessModal"
                            :disabled="isProcessing"
                            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 disabled:opacity-50 touch-manipulation"
                            :class="
                                isDarkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            "
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            :disabled="isProcessing"
                            @click="processPayment"
                            class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                        >
                            <span v-if="isProcessing">Procesando...</span>
                            <span v-else>Procesar Pago</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cancel Payment Confirmation Modal -->
        <div
            v-if="showCancelModal"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Cancelar Pago Pendiente
                        </h2>
                        <button
                            @click="closeCancelModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div class="mb-6">
                        <p
                            class="text-base transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                        >
                            ¿Está seguro que desea cancelar el pago pendiente por
                            <span
                                class="font-bold"
                                :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                            >
                                {{ formatCurrency(selectedPayment?.monto) }}
                            </span>
                            al conductor
                            <span
                                class="font-bold"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ getDriverName(selectedPayment) }} </span
                            >?
                        </p>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Esta acción marcará el pago como cancelado y no podrá ser procesado en
                            el futuro.
                        </p>
                    </div>

                    <!-- Error Message -->
                    <div
                        v-if="cancelErrorMessage"
                        class="p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20"
                    >
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <svg
                                    class="w-5 h-5 text-red-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800 dark:text-red-300">
                                    Error al cancelar el pago
                                </h3>
                                <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                                    {{ cancelErrorMessage }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div
                        class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                        :class="
                            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        "
                    >
                        <button
                            type="button"
                            @click="closeCancelModal"
                            :disabled="isCanceling"
                            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 disabled:opacity-50 touch-manipulation"
                            :class="
                                isDarkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            "
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            :disabled="isCanceling"
                            @click="cancelPayment"
                            class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                        >
                            <span v-if="isCanceling">Cancelando...</span>
                            <span v-else>Confirmar Cancelación</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { useCurrency } from '@/composables/useCurrency';
import { isDarkMode } from '@/composables/useDarkMode';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { formatCurrency } = useCurrency();
const router = useRouter();

// Icons
import {
    BuildingIcon,
    CalendarIcon,
    CheckIcon,
    ClockIcon,
    DollarSignIcon,
    EyeIcon,
    SearchIcon,
    XIcon,
} from 'lucide-vue-next';

// Services
import {
    cancelPendingPayment,
    getPendingPayments,
    processPendingPayment,
} from '@/services/PaymentPendingService';

// Initialize alert
const { showSuccess, showError } = useAlert();

// State
const payments = ref([]);
const searchQuery = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const perPage = ref(15);
const showProcessModal = ref(false);
const showCancelModal = ref(false);
const selectedPayment = ref(null);
const isProcessing = ref(false);
const isCanceling = ref(false);
const errorMessage = ref('');
const cancelErrorMessage = ref('');

// Computed
const filteredPayments = computed(() => {
    return payments.value.filter(payment => {
        const matchesSearch =
            payment.id.toString().includes(searchQuery.value.toLowerCase()) ||
            getDriverName(payment).toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            (payment.negocio?.nombre || '').toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus =
            selectedStatus.value === '' || payment.estado === selectedStatus.value;
        return matchesSearch && matchesStatus;
    });
});

const paginatedPayments = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredPayments.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredPayments.value.length / perPage.value));

const totalPendingAmount = computed(() => {
    return filteredPayments.value
        .filter(p => p.estado === 'pendiente')
        .reduce((sum, payment) => sum + (parseFloat(payment.monto) || 0), 0);
});

// Methods
const loadPendingPayments = async () => {
    try {
        const response = await getPendingPayments();
        payments.value = response.data.data.data;
        console.log(payments.value);
    } catch (error) {
        console.error('Error loading pending payments:', error);
        showError('Error', 'No se pudieron cargar los pagos pendientes.');
    }
};

// Función para obtener el nombre del conductor
const getDriverName = payment => {
    if (!payment || !payment.driver) return '';

    // Si el conductor tiene datos generales directamente
    if (payment.driver.general_data) {
        return `${payment.driver.general_data.nombre} ${payment.driver.general_data.apellido}`;
    }

    // Si el conductor tiene una relación con user y ese user tiene general_data
    if (payment.driver.user && payment.driver.user.general_data) {
        return `${payment.driver.user.general_data.nombre} ${payment.driver.user.general_data.apellido}`;
    }

    // Si el conductor tiene nombre y apellido directamente
    if (payment.driver.nombre && payment.driver.apellido) {
        return `${payment.driver.nombre} ${payment.driver.apellido}`;
    }

    // Si no hay información, mostrar el ID
    return `Conductor ID: ${payment.driver.id}`;
};

const getAdminName = payment => {
    if (!payment || !payment.user) return '';

    let adminName = '';
    if (payment.user.general_data) {
        adminName = `${payment.user.general_data.nombre} ${payment.user.general_data.apellido}`;
    } else if (payment.user.name) {
        adminName = payment.user.name;
    } else {
        adminName = `Admin ID: ${payment.user.id}`;
    }

    // Si hay conductor, devolver como nota entre paréntesis
    if (payment.driver) {
        return `(Registrado por: ${adminName})`;
    } else {
        // Si no hay conductor, devolver como principal, indicando que es admin
        return `Admin: ${adminName}`;
    }
};

// Función principal para obtener el nombre del responsable
const getResponsibleName = payment => {
    const driverName = getDriverName(payment);
    const adminName = getAdminName(payment);

    if (driverName) {
        return driverName + (adminName ? ' ' + adminName : '');
    } else {
        return adminName || 'Sin asignar';
    }
};
const confirmProcessPayment = payment => {
    selectedPayment.value = payment;
    errorMessage.value = ''; // Limpiar mensaje de error previo
    showProcessModal.value = true;
};

const closeProcessModal = () => {
    showProcessModal.value = false;
    selectedPayment.value = null;
    errorMessage.value = '';
};

const processPayment = async () => {
    if (!selectedPayment.value) return;

    try {
        isProcessing.value = true;
        errorMessage.value = ''; // Limpiar mensaje de error previo

        await processPendingPayment(selectedPayment.value.id);
        showSuccess('Éxito', 'Pago procesado correctamente.');
        await loadPendingPayments();
        closeProcessModal();
    } catch (error) {
        console.error('Error processing payment:', error);

        // Extraer el mensaje de error específico si está disponible
        if (error.response && error.response.data && error.response.data.details) {
            errorMessage.value = error.response.data.details;
        } else if (error.message) {
            errorMessage.value = error.message;
        } else {
            errorMessage.value = 'No se pudo procesar el pago. Intente nuevamente más tarde.';
        }

        // Mantener el modal abierto para que el usuario vea el error
        showError('Error', errorMessage.value);
    } finally {
        isProcessing.value = false;
    }
};

const confirmCancelPayment = payment => {
    selectedPayment.value = payment;
    cancelErrorMessage.value = ''; // Limpiar mensaje de error previo
    showCancelModal.value = true;
};

const closeCancelModal = () => {
    showCancelModal.value = false;
    selectedPayment.value = null;
    cancelErrorMessage.value = '';
};

const cancelPayment = async () => {
    if (!selectedPayment.value) return;

    try {
        isCanceling.value = true;
        cancelErrorMessage.value = ''; // Limpiar mensaje de error previo

        await cancelPendingPayment(selectedPayment.value.id);
        showSuccess('Éxito', 'Pago cancelado correctamente.');
        await loadPendingPayments();
        closeCancelModal();
    } catch (error) {
        console.error('Error canceling payment:', error);

        // Extraer el mensaje de error específico si está disponible
        if (error.response && error.response.data && error.response.data.details) {
            cancelErrorMessage.value = error.response.data.details;
        } else if (error.message) {
            cancelErrorMessage.value = error.message;
        } else {
            cancelErrorMessage.value = 'No se pudo cancelar el pago. Intente nuevamente más tarde.';
        }

        // Mantener el modal abierto para que el usuario vea el error
        showError('Error', cancelErrorMessage.value);
    } finally {
        isCanceling.value = false;
    }
};

const viewTransaction = transactionId => {
    router.push(`/financial-transactions/${transactionId}`);
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

// Watchers
watch([searchQuery, selectedStatus], () => {
    currentPage.value = 1;
});

// Lifecycle
onMounted(async () => {
    await loadPendingPayments();
});
</script>
