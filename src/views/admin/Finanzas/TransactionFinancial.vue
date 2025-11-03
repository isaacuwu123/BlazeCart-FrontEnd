<template>
    <div
        class="min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50'
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
                        class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 to-orange-500 sm:p-3"
                    >
                        <DollarSignIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Gestión de Transacciones Financieras
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra las transacciones financieras del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="navigateToCreate"
                    class="flex items-center justify-center px-4 py-2.5 font-medium text-white transition-all duration-200 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg hover:from-yellow-600 hover:to-orange-700 shadow-md hover:shadow-lg touch-manipulation transform hover:scale-105"
                >
                    <PlusIcon class="w-4 h-4 mr-2" />
                    Nueva Transacción
                </button>
            </div>
        </div>

        <!-- Search and Filters - IMPROVED UI/UX -->
        <div
            class="p-4 mb-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-5 lg:p-6 sm:mb-5 lg:mb-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <!-- Título de la sección de filtros -->
            <div class="flex items-center justify-between mb-4">
                <h2
                    class="text-base font-semibold sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    <SearchIcon class="inline-block w-5 h-5 mr-2 text-yellow-500" />
                    Filtros de Búsqueda
                </h2>
                <button
                    @click="clearFilters"
                    class="px-3 py-1.5 text-xs font-medium transition-colors duration-200 rounded-lg"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    "
                >
                    Limpiar Filtros
                </button>
            </div>

            <!-- Búsqueda General -->
            <div class="mb-4">
                <label
                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Búsqueda General
                </label>
                <div class="relative">
                    <SearchIcon
                        class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar por N°, ítem, cliente, proveedor..."
                        class="w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-base"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
            </div>

            <!-- Filtros Principales - Grid mejorado -->
            <div class="mb-4">
                <h3
                    class="mb-3 text-sm font-medium"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Filtros Principales
                </h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <!-- Tipo de transacción -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Tipo de Transacción
                        </label>
                        <select
                            v-model="selectedType"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todos los tipos</option>
                            <option value="Ingreso">Ingresos</option>
                            <option value="Egreso">Egresos</option>
                        </select>
                    </div>

                    <!-- Estado -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Estado
                        </label>
                        <select
                            v-model="selectedStatus"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todos los estados</option>
                            <option
                                v-for="state in transactionStates"
                                :key="state.id"
                                :value="state.id"
                            >
                                {{ state.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Categoría -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Categoría
                        </label>
                        <select
                            v-model="selectedCategory"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todas las categorías</option>
                            <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Tipo de egreso -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Tipo de Egreso
                        </label>
                        <select
                            v-model="selectedEgresoDirecto"
                            :disabled="selectedType !== 'Egreso'"
                            :title="selectedType !== 'Egreso' ? 'Solo aplica para egresos' : ''"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todos los egresos</option>
                            <option value="true">Directos</option>
                            <option value="false">Indirectos</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Filtros de Caja Operativa -->
            <div class="mb-4">
                <h3
                    class="mb-3 text-sm font-medium"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Filtros de Caja Operativa
                </h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <!-- Caja Operativa -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Caja Operativa
                        </label>
                        <select
                            v-model="selectedOperatingBoxId"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todas las cajas</option>
                            <option v-for="box in operatingBoxes" :key="box.id" :value="box.id">
                                {{ box.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Tipo de movimiento en caja -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Movimiento en Caja
                        </label>
                        <select
                            v-model="selectedOperatingBoxMovementType"
                            :disabled="!selectedOperatingBoxId"
                            :title="
                                !selectedOperatingBoxId
                                    ? 'Seleccione primero una caja operativa'
                                    : ''
                            "
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        >
                            <option value="">Todos los movimientos</option>
                            <option value="ingreso">Ingresos</option>
                            <option value="egreso">Egresos</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Filtros de Fecha -->
            <div class="mb-4">
                <h3
                    class="mb-3 text-sm font-medium"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                >
                    Rango de Fechas
                </h3>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <!-- Fecha desde -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Fecha Desde
                        </label>
                        <input
                            v-model="filterDateFrom"
                            type="date"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        />
                    </div>

                    <!-- Fecha hasta -->
                    <div>
                        <label
                            class="block mb-1.5 text-xs font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Fecha Hasta
                        </label>
                        <input
                            v-model="filterDateTo"
                            type="date"
                            class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                            "
                        />
                    </div>
                </div>
            </div>

            <!-- Botones de Acción -->
            <div class="pt-4 border-t" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:flex-wrap lg:gap-3">
                    <button
                        @click="exportToExcel"
                        class="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        :class="
                            isDarkMode
                                ? 'bg-green-700 text-white hover:bg-green-600'
                                : 'bg-green-500 text-white hover:bg-green-600'
                        "
                        title="Exportar datos a Excel"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        <span class="hidden sm:inline">Exportar</span>
                    </button>

                    <button
                        @click="openImportModal"
                        class="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        :class="
                            isDarkMode
                                ? 'bg-blue-700 text-white hover:bg-blue-600'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                        "
                        title="Importar datos desde Excel"
                    >
                        <UploadIcon class="w-4 h-4 mr-2" />
                        <span class="hidden sm:inline">Importar</span>
                    </button>

                    <button
                        @click="descargarPlantilla"
                        class="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        :class="
                            isDarkMode
                                ? 'bg-purple-700 text-white hover:bg-purple-600'
                                : 'bg-purple-500 text-white hover:bg-purple-600'
                        "
                        title="Descargar plantilla de Excel"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        <span class="hidden sm:inline">Plantilla</span>
                    </button>

                    <button
                        @click="toggleOperatingBoxTotals"
                        class="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                        :class="
                            calculateOperatingBoxTotals
                                ? isDarkMode
                                    ? 'bg-indigo-700 text-white'
                                    : 'bg-indigo-500 text-white'
                                : isDarkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        "
                        title="Calcular totales por caja operativa"
                    >
                        <BarChart3Icon class="w-4 h-4 mr-2" />
                        <span class="hidden sm:inline">Totales Caja</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
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
                    Total Ingresos
                </h3>
                <p
                    class="text-xl font-bold text-green-500 transition-colors duration-200"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                >
                    {{ formatCurrency(totales.ingresos) }}
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
                    Total Egresos
                </h3>
                <p
                    class="text-xl font-bold text-red-500 transition-colors duration-200"
                    :class="isDarkMode ? 'text-red-400' : 'text-red-600'"
                >
                    {{ formatCurrency(totales.egresos) }}
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
                    Balance Neto
                </h3>
                <p
                    class="text-xl font-bold transition-colors duration-200"
                    :class="
                        totales.balance >= 0
                            ? isDarkMode
                                ? 'text-green-400'
                                : 'text-green-600'
                            : isDarkMode
                            ? 'text-red-400'
                            : 'text-red-600'
                    "
                >
                    {{ formatCurrency(totales.balance) }}
                </p>
            </div>
        </div>

        <!-- Sección de totales por caja operativa -->
        <div v-if="calculateOperatingBoxTotals && operatingBoxTotals.length > 0" class="mb-6">
            <h2
                class="mb-4 text-lg font-bold transition-colors duration-200"
                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
            >
                Totales por Caja Operativa
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="boxTotal in operatingBoxTotals"
                    :key="boxTotal.caja_operativa_id"
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
                        {{ boxTotal.nombre_caja }}
                    </h3>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span
                                class="text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                Saldo Actual:
                            </span>
                            <span
                                class="text-sm font-medium"
                                :class="
                                    boxTotal.saldo_actual >= 0
                                        ? isDarkMode
                                            ? 'text-green-400'
                                            : 'text-green-600'
                                        : isDarkMode
                                        ? 'text-red-400'
                                        : 'text-red-600'
                                "
                            >
                                {{ formatCurrency(boxTotal.saldo_actual) }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span
                                class="text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                Ingresos:
                            </span>
                            <span
                                class="text-sm font-medium text-green-500"
                                :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                            >
                                {{ formatCurrency(boxTotal.ingresos) }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span
                                class="text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                Egresos:
                            </span>
                            <span
                                class="text-sm font-medium text-red-500"
                                :class="isDarkMode ? 'text-red-400' : 'text-red-600'"
                            >
                                {{ formatCurrency(boxTotal.egresos) }}
                            </span>
                        </div>
                        <div
                            class="flex justify-between pt-2 mt-2 border-t"
                            :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                        >
                            <span
                                class="text-sm font-medium"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                            >
                                Balance:
                            </span>
                            <span
                                class="text-sm font-bold"
                                :class="
                                    boxTotal.balance >= 0
                                        ? isDarkMode
                                            ? 'text-green-400'
                                            : 'text-green-600'
                                        : isDarkMode
                                        ? 'text-red-400'
                                        : 'text-red-600'
                                "
                            >
                                {{ formatCurrency(boxTotal.balance) }}
                            </span>
                        </div>
                    </div>
                </div>
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
                    <thead class="bg-gradient-to-r from-yellow-400 to-orange-500">
                        <tr>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                N° Transacción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Fecha
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Tipo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Ítem
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Cliente/Proveedor
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Importe
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Monto Excedido
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Estado
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Egreso
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Caja Operativa
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
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
                            v-for="transaction in paginatedTransactions"
                            :key="transaction.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ transaction.numero_transaccion || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ formatDate(transaction.fecha) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="getTypeClass(transaction.tipo_de_transaccion)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ transaction.tipo_de_transaccion }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    :title="transaction.item"
                                >
                                    {{ truncateText(transaction.item, 30) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ transaction.cliente_proveedor || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="getImporteClass(transaction.tipo_de_transaccion)"
                                >
                                    {{ formatCurrency(transaction.importe_total) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="
                                        transaction.monto_excedido > 0
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                    "
                                >
                                    {{ formatCurrency(transaction.monto_excedido || 0) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    :class="
                                        getStateColorClass(
                                            getStateName(transaction.estado_de_transaccion_id)
                                        )
                                    "
                                >
                                    {{ getStateName(transaction.estado_de_transaccion_id) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    v-if="transaction.tipo_de_transaccion === 'Egreso'"
                                    :class="
                                        transaction.egreso_directo
                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                    "
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ transaction.egreso_directo ? 'Directo' : 'Indirecto' }}
                                </span>
                                <span v-else class="text-gray-500">-</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ getOperatingBoxName(transaction.caja_operativa_id) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="openViewModal(transaction)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Ver"
                                    >
                                        <EyeIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openEditModal(transaction)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openStateModal(transaction)"
                                        class="p-2 text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                                        title="Cambiar estado"
                                    >
                                        <RefreshCwIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="confirmDelete(transaction)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                        title="Eliminar"
                                    >
                                        <TrashIcon class="w-4 h-4" />
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
                v-for="transaction in paginatedTransactions"
                :key="transaction.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500"
                        >
                            <DollarSignIcon class="w-5 h-5 text-white sm:w-6 sm:h-6" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                :title="transaction.item"
                            >
                                {{ truncateText(transaction.item, 40) }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                N° Transacción: {{ transaction.numero_transaccion || 'N/A' }}
                            </p>
                        </div>
                    </div>
                    <span
                        :class="getTypeClass(transaction.tipo_de_transaccion)"
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full"
                    >
                        {{ transaction.tipo_de_transaccion }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatDate(transaction.fecha) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <UserIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ transaction.cliente_proveedor || 'N/A' }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <DollarSignIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{
                            formatCurrency(transaction.importe_total)
                        }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <AlertTriangleIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >Monto Excedido:
                            {{ formatCurrency(transaction.monto_excedido || 0) }}</span
                        >
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CheckCircle2Icon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{
                            getStateName(transaction.estado_de_transaccion_id)
                        }}</span>
                    </div>
                    <div
                        v-if="transaction.tipo_de_transaccion === 'Egreso'"
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <RefreshCwIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{
                            transaction.egreso_directo ? 'Egreso Directo' : 'Egreso Indirecto'
                        }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <BriefcaseIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{
                            getOperatingBoxName(transaction.caja_operativa_id)
                        }}</span>
                    </div>
                    <div
                        v-if="transaction.observaciones"
                        class="flex items-start text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <FileIcon class="flex-shrink-0 w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                        <span class="truncate" :title="transaction.observaciones">{{
                            truncateText(transaction.observaciones, 60)
                        }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="openViewModal(transaction)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Ver"
                    >
                        <EyeIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openEditModal(transaction)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openStateModal(transaction)"
                        class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Cambiar estado"
                    >
                        <RefreshCwIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="confirmDelete(transaction)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Eliminar"
                    >
                        <TrashIcon class="w-4 h-4" />
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
                :disabled="pagination.current_page === 1"
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Anterior
            </button>
            <span class="flex items-center">
                Página {{ pagination.current_page }} de {{ pagination.last_page }} (Total:
                {{ pagination.total }} registros)
            </span>
            <button
                @click="nextPage"
                :disabled="pagination.current_page === pagination.last_page"
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedTransactions.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <DollarSignIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron transacciones
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>

        <!-- View Modal -->
        <div
            v-if="isViewModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
            @click.self="closeViewModal"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-300 transform"
                :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-black sm:text-xl">
                            Ver Transacción Financiera
                        </h2>
                        <button
                            @click="closeViewModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation rounded-full hover:bg-black hover:bg-opacity-10"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 space-y-6 sm:p-6">
                    <!-- Business Information -->
                    <div
                        class="p-4 transition-all duration-300 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <BriefcaseIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                            Información del Negocio
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Número de Transacción
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.numero_transaccion || 'N/A' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Negocio
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getBusinessName(viewTransaction.negocio_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Método de Pago
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getPaymentMethodName(viewTransaction.metodo_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Categoría
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getCategoryName(viewTransaction.categoria_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Usuario
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getUserName(viewTransaction.user_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Vehículo
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getVehicleName(viewTransaction.vehicle_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Estado
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getStateName(viewTransaction.estado_de_transaccion_id) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Caja Operativa
                                </label>
                                <p class="text-sm font-medium">
                                    {{ getOperatingBoxName(viewTransaction.caja_operativa_id) }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Transaction Details -->
                    <div
                        class="p-4 transition-all duration-300 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <DollarSignIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                            Detalles de la Transacción
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Fecha
                                </label>
                                <p class="text-sm font-medium">
                                    {{ formatDate(viewTransaction.fecha) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Punto de Partida
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.punto_de_partida || 'N/A' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Destino
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.destino || 'N/A' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Millas
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.millas || 'N/A' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Tipo de Transacción
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.tipo_de_transaccion }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Ítem
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.item }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Cantidad
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.cantidad }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Importe Total
                                </label>
                                <p
                                    class="text-sm font-medium"
                                    :class="getImporteClass(viewTransaction.tipo_de_transaccion)"
                                >
                                    {{ formatCurrency(viewTransaction.importe_total) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Monto Excedido
                                </label>
                                <p
                                    class="text-sm font-medium"
                                    :class="
                                        viewTransaction.monto_excedido > 0
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                    "
                                >
                                    {{ formatCurrency(viewTransaction.monto_excedido || 0) }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Cliente/Proveedor
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.cliente_proveedor || 'N/A' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Egreso Directo
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.egreso_directo ? 'Sí' : 'No' }}
                                </p>
                            </div>
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg sm:col-span-2"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Observaciones
                                </label>
                                <p class="text-sm font-medium">
                                    {{ viewTransaction.observaciones || 'N/A' }}
                                </p>
                            </div>
                            <!-- Archivos Adjuntos -->
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg sm:col-span-2"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Archivos Adjuntos
                                </label>
                                <!-- Contenedor para los archivos -->
                                <div
                                    v-if="
                                        viewTransaction.archivos_procesados &&
                                        viewTransaction.archivos_procesados.length > 0
                                    "
                                    class="mt-3"
                                >
                                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div
                                            v-for="(
                                                archivo, index
                                            ) in viewTransaction.archivos_procesados"
                                            :key="index"
                                            class="overflow-hidden border rounded-lg"
                                            :class="
                                                isDarkMode ? 'border-gray-600' : 'border-gray-300'
                                            "
                                        >
                                            <!-- Vista previa para imágenes -->
                                            <div v-if="isImageFile(archivo.ruta)" class="mb-4">
                                                <div class="relative">
                                                    <img
                                                        :src="archivo.ruta"
                                                        class="object-contain w-full h-48 border-b rounded-t-lg shadow-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'border-gray-600 bg-gray-700'
                                                                : 'border-gray-300 bg-gray-100'
                                                        "
                                                        alt="Imagen adjunta"
                                                    />
                                                    <div
                                                        class="absolute px-2 py-1 text-xs text-white bg-black bg-opacity-50 rounded top-2 right-2"
                                                    >
                                                        Imagen
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Vista previa para PDF -->
                                            <div v-else-if="isPdfFile(archivo.ruta)" class="mb-4">
                                                <div
                                                    class="relative overflow-hidden border rounded-t-lg shadow-sm"
                                                    :class="
                                                        isDarkMode
                                                            ? 'border-gray-600 bg-gray-700'
                                                            : 'border-gray-300 bg-gray-100'
                                                    "
                                                >
                                                    <div
                                                        class="flex items-center justify-center h-48 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
                                                    >
                                                        <div class="text-center">
                                                            <FileIcon
                                                                class="w-16 h-16 mx-auto text-red-500 dark:text-red-400"
                                                            />
                                                            <p
                                                                class="mt-2 font-medium text-red-700 dark:text-red-300"
                                                            >
                                                                Documento PDF
                                                            </p>
                                                            <p
                                                                class="mt-1 text-sm text-red-600 dark:text-red-400"
                                                            >
                                                                {{ getFileName(archivo.ruta) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="absolute px-2 py-1 text-xs text-white bg-red-500 rounded top-2 right-2"
                                                    >
                                                        PDF
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Vista previa para otros tipos de documentos -->
                                            <div v-else class="mb-4">
                                                <div
                                                    class="relative overflow-hidden border rounded-t-lg shadow-sm"
                                                    :class="
                                                        isDarkMode
                                                            ? 'border-gray-600 bg-gray-700'
                                                            : 'border-gray-300 bg-gray-100'
                                                    "
                                                >
                                                    <div
                                                        class="flex items-center justify-center h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                                                    >
                                                        <div class="text-center">
                                                            <FileIcon
                                                                class="w-16 h-16 mx-auto text-blue-500 dark:text-blue-400"
                                                            />
                                                            <p
                                                                class="mt-2 font-medium text-blue-700 dark:text-blue-300"
                                                            >
                                                                Documento
                                                            </p>
                                                            <p
                                                                class="mt-1 text-sm text-blue-600 dark:text-blue-400"
                                                            >
                                                                {{ getFileName(archivo.ruta) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded top-2 right-2"
                                                    >
                                                        {{ getFileExtension(archivo.ruta) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Información adicional del archivo -->
                                            <div
                                                class="p-3"
                                                :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                                            >
                                                <p
                                                    class="text-sm font-medium truncate"
                                                    :class="
                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                    "
                                                >
                                                    {{
                                                        archivo.nombre_original ||
                                                        getFileName(archivo.ruta)
                                                    }}
                                                </p>
                                                <div class="flex items-center justify-between mt-2">
                                                    <span
                                                        class="text-xs"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-400'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        {{
                                                            archivo.mime_type ||
                                                            'Tipo no especificado'
                                                        }}
                                                    </span>
                                                    <span
                                                        v-if="archivo.estado !== undefined"
                                                        class="text-xs"
                                                        :class="
                                                            archivo.estado
                                                                ? 'text-green-500'
                                                                : 'text-red-500'
                                                        "
                                                    >
                                                        {{ archivo.estado ? 'Activo' : 'Inactivo' }}
                                                    </span>
                                                </div>
                                                <div class="mt-3">
                                                    <a
                                                        :href="archivo.ruta"
                                                        target="_blank"
                                                        class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white transition-all duration-200 transform rounded-md shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105"
                                                    >
                                                        <DownloadIcon class="w-4 h-4 mr-1" />
                                                        Ver/Descargar
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Mensaje cuando no hay archivos -->
                                <div
                                    v-else
                                    class="flex items-center text-gray-500 dark:text-gray-400"
                                >
                                    <FileIcon class="w-5 h-5 mr-2" />
                                    <p class="text-sm font-medium">No hay archivos adjuntos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Footer -->
                    <div
                        class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t rounded-b-xl"
                        :class="
                            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        "
                    >
                        <button
                            @click="closeViewModal"
                            class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 touch-manipulation"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                            "
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div
            v-if="isEditModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Editar Transacción Financiera
                        </h2>
                        <button
                            @click="closeEditModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleUpdate" class="space-y-4 sm:space-y-6">
                        <!-- Business Information -->
                        <div
                            class="p-4 transition-all duration-300 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <BriefcaseIcon class="w-4 h-4 mr-2 text-blue-500 sm:w-5 sm:h-5" />
                                Información del Negocio
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Negocio *
                                    </label>
                                    <select
                                        v-model="editForm.negocio_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione un negocio</option>
                                        <option
                                            v-for="business in businesses"
                                            :key="business.id"
                                            :value="business.id"
                                        >
                                            {{ business.nombre }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.negocio_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.negocio_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Método de Pago *
                                    </label>
                                    <select
                                        v-model="editForm.metodo_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione un método</option>
                                        <option
                                            v-for="method in paymentMethods"
                                            :key="method.id"
                                            :value="method.id"
                                        >
                                            {{ method.nombre }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.metodo_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.metodo_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Categoría *
                                    </label>
                                    <select
                                        v-model="editForm.categoria_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        <option
                                            v-for="category in categories"
                                            :key="category.id"
                                            :value="category.id"
                                        >
                                            {{ category.nombre }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.categoria_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.categoria_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vehículo
                                    </label>
                                    <select
                                        v-model="editForm.vehicle_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione un vehículo</option>
                                        <option
                                            v-for="vehicle in vehicles"
                                            :key="vehicle.id"
                                            :value="vehicle.id"
                                        >
                                            {{ vehicle.numero_placa }} - {{ vehicle.modelo }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.vehicle_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.vehicle_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado *
                                    </label>
                                    <select
                                        v-model="editForm.estado_de_transaccion_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione un estado</option>
                                        <option
                                            v-for="state in transactionStates"
                                            :key="state.id"
                                            :value="state.id"
                                        >
                                            {{ state.nombre }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.estado_de_transaccion_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.estado_de_transaccion_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Caja Operativa
                                    </label>
                                    <select
                                        v-model="editForm.caja_operativa_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione una caja</option>
                                        <option
                                            v-for="box in operatingBoxes"
                                            :key="box.id"
                                            :value="box.id"
                                        >
                                            {{ box.nombre }}
                                        </option>
                                    </select>
                                    <p
                                        v-if="editErrors.caja_operativa_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.caja_operativa_id }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Transaction Details -->
                        <div
                            class="p-4 transition-all duration-300 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <DollarSignIcon class="w-4 h-4 mr-2 text-blue-500 sm:w-5 sm:h-5" />
                                Detalles de la Transacción
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha *
                                    </label>
                                    <input
                                        v-model="editForm.fecha"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    />
                                    <p v-if="editErrors.fecha" class="mt-1 text-xs text-red-500">
                                        {{ editErrors.fecha }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número de Transacción
                                    </label>
                                    <input
                                        v-model="editForm.numero_transaccion"
                                        type="text"
                                        @blur="convertToUpperCase('numero_transaccion')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Número de transacción"
                                    />
                                    <p
                                        v-if="editErrors.numero_transaccion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.numero_transaccion }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Transacción *
                                    </label>
                                    <select
                                        v-model="editForm.tipo_de_transaccion"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione un tipo</option>
                                        <option value="Ingreso">Ingreso</option>
                                        <option value="Egreso">Egreso</option>
                                    </select>
                                    <p
                                        v-if="editErrors.tipo_de_transaccion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.tipo_de_transaccion }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Ítem *
                                    </label>
                                    <input
                                        v-model="editForm.item"
                                        type="text"
                                        @blur="convertToUpperCase('item')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Descripción del ítem"
                                        required
                                    />
                                    <p v-if="editErrors.item" class="mt-1 text-xs text-red-500">
                                        {{ editErrors.item }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Cantidad *
                                    </label>
                                    <input
                                        v-model="editForm.cantidad"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="0.00"
                                        required
                                    />
                                    <p v-if="editErrors.cantidad" class="mt-1 text-xs text-red-500">
                                        {{ editErrors.cantidad }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Importe Total *
                                    </label>
                                    <input
                                        v-model="editForm.importe_total"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="0.00"
                                        required
                                    />
                                    <p
                                        v-if="editErrors.importe_total"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.importe_total }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Cliente/Proveedor
                                    </label>
                                    <input
                                        v-model="editForm.cliente_proveedor"
                                        type="text"
                                        @blur="convertToUpperCase('cliente_proveedor')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Nombre del cliente o proveedor"
                                    />
                                    <p
                                        v-if="editErrors.cliente_proveedor"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.cliente_proveedor }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Punto de Partida
                                    </label>
                                    <input
                                        v-model="editForm.punto_de_partida"
                                        type="text"
                                        @blur="convertToUpperCase('punto_de_partida')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Punto de partida"
                                    />
                                    <p
                                        v-if="editErrors.punto_de_partida"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.punto_de_partida }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Destino
                                    </label>
                                    <input
                                        v-model="editForm.destino"
                                        type="text"
                                        @blur="convertToUpperCase('destino')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Destino"
                                    />
                                    <p v-if="editErrors.destino" class="mt-1 text-xs text-red-500">
                                        {{ editErrors.destino }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Millas
                                    </label>
                                    <input
                                        v-model="editForm.millas"
                                        type="number"
                                        min="0"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="0"
                                    />
                                    <p v-if="editErrors.millas" class="mt-1 text-xs text-red-500">
                                        {{ editErrors.millas }}
                                    </p>
                                </div>
                                <div v-if="editForm.tipo_de_transaccion === 'Egreso'">
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Egreso Directo *
                                    </label>
                                    <select
                                        v-model="editForm.egreso_directo"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        required
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option :value="true">Sí</option>
                                        <option :value="false">No</option>
                                    </select>
                                    <p
                                        v-if="editErrors.egreso_directo"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.egreso_directo }}
                                    </p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        v-model="editForm.observaciones"
                                        @blur="convertToUpperCase('observaciones')"
                                        rows="3"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Observaciones adicionales"
                                    ></textarea>
                                    <p
                                        v-if="editErrors.observaciones"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ editErrors.observaciones }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Files Section -->
                        <div
                            class="p-4 transition-all duration-300 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileIcon class="w-4 h-4 mr-2 text-blue-500 sm:w-5 sm:h-5" />
                                Archivos Adjuntos
                            </h3>
                            <div class="mb-4">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Cargar nuevos archivos
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    @change="handleFileChange"
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                    class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                                <p
                                    class="mt-1 text-xs"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Formatos permitidos: PDF, JPG, PNG, DOC, DOCX (Máx. 10MB por
                                    archivo)
                                </p>
                            </div>

                            <!-- Existing Files -->
                            <div v-if="editForm.existingFiles && editForm.existingFiles.length > 0">
                                <h4
                                    class="mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Archivos existentes
                                </h4>
                                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div
                                        v-for="(file, index) in editForm.existingFiles"
                                        :key="index"
                                        class="overflow-hidden border rounded-lg"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
                                    >
                                        <div class="p-3">
                                            <div class="flex items-center justify-between">
                                                <p
                                                    class="text-sm font-medium truncate"
                                                    :class="
                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                    "
                                                >
                                                    {{
                                                        file.nombre_original ||
                                                        getFileName(file.ruta)
                                                    }}
                                                </p>
                                                <button
                                                    type="button"
                                                    @click="removeExistingFile(index)"
                                                    class="p-1 text-red-500 transition-colors duration-200 hover:text-red-700"
                                                    title="Eliminar archivo"
                                                >
                                                    <TrashIcon class="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div class="mt-2">
                                                <a
                                                    :href="file.ruta"
                                                    target="_blank"
                                                    class="inline-flex items-center px-2 py-1 text-xs font-medium text-white transition-colors duration-200 bg-blue-500 rounded hover:bg-blue-600"
                                                >
                                                    <DownloadIcon class="w-3 h-3 mr-1" />
                                                    Ver
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- New Files Preview -->
                            <div v-if="editForm.newFiles && editForm.newFiles.length > 0">
                                <h4
                                    class="mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Nuevos archivos
                                </h4>
                                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div
                                        v-for="(file, index) in editForm.newFiles"
                                        :key="index"
                                        class="overflow-hidden border rounded-lg"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
                                    >
                                        <div class="p-3">
                                            <div class="flex items-center justify-between">
                                                <p
                                                    class="text-sm font-medium truncate"
                                                    :class="
                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                    "
                                                >
                                                    {{ file.name }}
                                                </p>
                                                <button
                                                    type="button"
                                                    @click="removeNewFile(index)"
                                                    class="p-1 text-red-500 transition-colors duration-200 hover:text-red-700"
                                                    title="Eliminar archivo"
                                                >
                                                    <TrashIcon class="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div class="mt-1">
                                                <p
                                                    class="text-xs"
                                                    :class="
                                                        isDarkMode
                                                            ? 'text-gray-400'
                                                            : 'text-gray-500'
                                                    "
                                                >
                                                    {{ formatFileSize(file.size) }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Footer -->
                        <div
                            class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-800'
                                    : 'border-gray-200 bg-white'
                            "
                        >
                            <button
                                type="button"
                                @click="closeEditModal"
                                :disabled="isUpdating"
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
                                type="submit"
                                :disabled="isUpdating"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isUpdating">Actualizando...</span>
                                <span v-else>Actualizar Transacción</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- State Change Modal -->
        <div
            v-if="isStateModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-black sm:text-xl">
                            Cambiar Estado de Transacción
                        </h2>
                        <button
                            @click="closeStateModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div class="mb-6">
                        <h3
                            class="mb-2 text-lg font-medium"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Información de la Transacción
                        </h3>
                        <div
                            class="p-4 rounded-lg"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <p
                                class="font-medium"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ selectedTransaction?.item || 'N/A' }}
                            </p>
                            <p
                                class="text-sm"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                {{ formatCurrency(selectedTransaction?.importe_total || 0) }}
                            </p>
                            <p
                                class="mt-1 text-xs"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                ID: {{ selectedTransaction?.id }}
                            </p>
                        </div>
                    </div>
                    <form @submit.prevent="handleStateChange" class="space-y-4 sm:space-y-6">
                        <div>
                            <label
                                for="estado-transaccion-id"
                                class="block mb-2 text-sm font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                            >
                                Nuevo Estado *
                            </label>
                            <select
                                id="estado-transaccion-id"
                                v-model="selectedEstadoId"
                                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                "
                            >
                                <option value="">Seleccione un estado</option>
                                <option
                                    v-for="state in transactionStates"
                                    :key="state.id"
                                    :value="state.id"
                                >
                                    {{ state.nombre }}
                                </option>
                            </select>
                            <p
                                v-if="stateErrors.estado_de_transaccion_id"
                                class="mt-1 text-xs text-red-500"
                            >
                                {{ stateErrors.estado_de_transaccion_id }}
                            </p>
                        </div>
                        <!-- Modal Footer -->
                        <div
                            class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-800'
                                    : 'border-gray-200 bg-white'
                            "
                        >
                            <button
                                type="button"
                                @click="closeStateModal"
                                :disabled="isStateChanging"
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
                                type="submit"
                                :disabled="isStateChanging || !selectedEstadoId"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isStateChanging">Actualizando...</span>
                                <span v-else>Cambiar Estado</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Import Modal -->
        <div
            v-if="isImportModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-black sm:text-xl">
                            Importar Transacciones desde Excel
                        </h2>
                        <button
                            @click="closeImportModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div class="mb-4">
                        <p class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">
                            Seleccione un archivo Excel (.xlsx, .xls) o CSV para importar
                            transacciones financieras.
                        </p>
                        <p
                            class="mt-2 text-xs"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                        >
                            El archivo no debe superar los 10MB.
                        </p>
                    </div>
                    <form @submit.prevent="handleImport" class="space-y-4 sm:space-y-6">
                        <div>
                            <label
                                for="import-file"
                                class="block mb-2 text-sm font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                            >
                                Archivo de Importación *
                            </label>
                            <input
                                id="import-file"
                                type="file"
                                @change="handleImportFileChange"
                                accept=".xlsx,.xls,.csv"
                                class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-800 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                "
                                required
                            />
                            <p v-if="importErrors.length > 0" class="mt-1 text-xs text-red-500">
                                {{ importErrors[0] }}
                            </p>
                        </div>
                        <!-- Resultados de importación -->
                        <div v-if="importSuccess || importErrors.length > 0" class="mt-4">
                            <div
                                v-if="importSuccess"
                                class="p-3 mb-3 rounded-lg"
                                :class="isDarkMode ? 'bg-green-900/30' : 'bg-green-100'"
                            >
                                <h3
                                    class="font-medium"
                                    :class="isDarkMode ? 'text-green-300' : 'text-green-800'"
                                >
                                    Importación completada
                                </h3>
                                <p
                                    class="mt-1 text-sm"
                                    :class="isDarkMode ? 'text-green-200' : 'text-green-700'"
                                >
                                    {{ importSuccess }}
                                </p>
                            </div>
                            <div
                                v-if="importErrors.length > 0"
                                class="p-3 rounded-lg"
                                :class="isDarkMode ? 'bg-red-900/30' : 'bg-red-100'"
                            >
                                <h3
                                    class="font-medium"
                                    :class="isDarkMode ? 'text-red-300' : 'text-red-800'"
                                >
                                    Errores en la importación
                                </h3>
                                <ul class="mt-2 space-y-1 text-sm">
                                    <li
                                        v-for="(error, index) in importErrors"
                                        :key="index"
                                        :class="isDarkMode ? 'text-red-200' : 'text-red-700'"
                                    >
                                        {{ error }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Modal Footer -->
                        <div
                            class="sticky bottom-0 flex flex-col items-stretch justify-end pt-4 space-y-2 transition-colors duration-200 border-t sm:flex-row sm:items-center sm:pt-6 sm:space-y-0 sm:space-x-4"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-800'
                                    : 'border-gray-200 bg-white'
                            "
                        >
                            <button
                                type="button"
                                @click="closeImportModal"
                                :disabled="isImporting"
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
                                type="submit"
                                :disabled="isImporting || !importFile"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isImporting">Importando...</span>
                                <span v-else>Importar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { isDarkMode } from '@/composables/useDarkMode';
import { businessesActives } from '@/services/BusinessService';
import { categoriesActives } from '@/services/CategoryService';
import { indexOperatingBoxes } from '@/services/OperatingBoxService';
import { paymentMethodsActives } from '@/services/PaymentMethodService';
import {
    changeStateFinancialTransaction,
    deleteFinancialTransaction,
    downloadTransactionFinancialTemplate,
    exportTransactionFinancialExcel,
    importTransactionFinancial,
    indexTransactionFinancialAll,
    showFinancialTransaction,
    updateFinancialTransaction,
} from '@/services/TransactionFinancialService';
import { transactionStatesActives } from '@/services/TransactionStateService';
import { usersActives } from '@/services/UserService';
import { indexVehicles } from '@/services/VehicleService';
import {
    AlertTriangleIcon,
    BarChart3Icon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircle2Icon,
    DollarSignIcon,
    DownloadIcon,
    EditIcon,
    EyeIcon,
    FileIcon,
    PlusIcon,
    RefreshCwIcon,
    SearchIcon,
    TrashIcon,
    UploadIcon,
    UserIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

// Initialize useAlert
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();
const router = useRouter();
// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// State
const transactions = ref([]);
const businesses = ref([]);
const paymentMethods = ref([]);
const categories = ref([]);
const users = ref([]);
const vehicles = ref([]);
const transactionStates = ref([]);
const operatingBoxes = ref([]);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false); // Modal para editar transacción
const isStateModalOpen = ref(false); // Modal para cambiar estado
const isStateChanging = ref(false); // Estado de carga para el modal de estado
const isUpdating = ref(false); // Estado de carga para el modal de edición
const selectedTransaction = ref(null); // Transacción seleccionada para cambiar estado
const selectedEstadoId = ref(''); // ID del estado seleccionado en el modal
const stateErrors = ref({}); // Errores del formulario de cambio de estado
const searchQuery = ref('');
const selectedType = ref('');
const selectedStatus = ref('');
const selectedCategory = ref(''); // NEW: Category filter
const selectedEgresoDirecto = ref(''); // Nuevo filtro para egresos directos/indirectos
const selectedOperatingBoxId = ref(''); // Filtro de caja operativa
const selectedOperatingBoxMovementType = ref(''); // Tipo de movimiento en caja
const calculateOperatingBoxTotals = ref(false); // Calcular totales por caja
const operatingBoxTotals = ref([]); // Totales por caja operativa
const filterDateFrom = ref('');
const filterDateTo = ref('');
const currentPage = ref(1);
const perPage = ref(15);
const pagination = ref({
    total: 0,
    current_page: 1,
    per_page: 15,
    last_page: 1,
});

// Totales globales calculados en el backend
const totales = ref({
    ingresos: 0,
    egresos: 0,
    balance: 0,
});

// Formulario de edición
const editForm = ref({
    id: null,
    negocio_id: '',
    metodo_id: '',
    categoria_id: '',
    vehicle_id: '',
    estado_de_transaccion_id: '',
    caja_operativa_id: '',
    fecha: '',
    punto_de_partida: '',
    destino: '',
    millas: '',
    tipo_de_transaccion: '',
    item: '',
    cantidad: '',
    importe_total: '',
    cliente_proveedor: '',
    egreso_directo: false,
    observaciones: '',
    numero_transaccion: '',
    existingFiles: [], // Archivos existentes
    newFiles: [], // Nuevos archivos a subir
});

// Errores del formulario de edición
const editErrors = ref({});

// Computed
const totalPages = computed(() => pagination.value.last_page);
const paginatedTransactions = computed(() => transactions.value); // Ahora las transacciones ya vienen paginadas del backend

const viewTransaction = ref(null);

// Variables para la importación
const isImportModalOpen = ref(false);
const importFile = ref(null);
const importErrors = ref([]);
const importSuccess = ref(null);
const isImporting = ref(false);

// Funciones para el modal de importación
const openImportModal = () => {
    isImportModalOpen.value = true;
    importFile.value = null;
    importErrors.value = [];
    importSuccess.value = null;
};

const closeImportModal = () => {
    isImportModalOpen.value = false;
    importFile.value = null;
    importErrors.value = [];
    importSuccess.value = null;
};

const handleImportFileChange = event => {
    const file = event.target.files[0];
    if (file) {
        // Validar tamaño (10MB)
        if (file.size > 10 * 1024 * 1024) {
            importErrors.value = ['El archivo no debe superar los 10MB.'];
            importFile.value = null;
            return;
        }
        // Validar tipo
        const allowedTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
        ];
        if (!allowedTypes.includes(file.type)) {
            importErrors.value = ['El archivo debe ser de tipo Excel (.xlsx, .xls) o CSV.'];
            importFile.value = null;
            return;
        }
        importFile.value = file;
        importErrors.value = [];
    }
};

const handleImport = async () => {
    if (!importFile.value) {
        importErrors.value = ['Debe seleccionar un archivo.'];
        return;
    }
    try {
        isImporting.value = true;
        showLoading();
        const formData = new FormData();
        formData.append('archivo', importFile.value);
        const { data } = await importTransactionFinancial(formData);
        // Mostrar resultados
        if (data.status === 'success') {
            importSuccess.value = data.details;
            importErrors.value = [];
            // Recargar la lista de transacciones
            await listTransactions();
        } else if (data.status === 'warning') {
            importSuccess.value = data.details;
            importErrors.value = data.errors || [];
            // Recargar la lista de transacciones aunque haya errores
            await listTransactions();
        } else {
            importErrors.value = [data.message || 'Error desconocido durante la importación.'];
        }
    } catch (error) {
        console.error('Error importing transactions:', error);
        if (error.response && error.response.data) {
            const errorData = error.response.data;
            if (errorData.errors) {
                importErrors.value = Object.values(errorData.errors).flat();
            } else {
                importErrors.value = [errorData.message || 'Error al importar las transacciones.'];
            }
        } else {
            importErrors.value = [
                'Error al importar las transacciones. Inténtelo de nuevo más tarde.',
            ];
        }
    } finally {
        isImporting.value = false;
        closeLoading();
    }
};

// Reemplazar la función descargarPlantilla
const descargarPlantilla = async () => {
    try {
        showLoading();
        // Llamar al servicio para descargar la plantilla
        const response = await downloadTransactionFinancialTemplate();
        // Crear un blob con los datos recibidos
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        // Crear una URL para el blob
        const url = window.URL.createObjectURL(blob);
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'plantilla_transacciones_financieras.xlsx');
        // Simular clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showSuccess('Éxito', 'Plantilla descargada correctamente.');
    } catch (error) {
        console.error('Error downloading template:', error);
        showError('Error', 'No se pudo descargar la plantilla. Inténtelo de nuevo.');
    } finally {
        closeLoading();
    }
};

// Función para alternar el cálculo de totales por caja operativa
const toggleOperatingBoxTotals = () => {
    calculateOperatingBoxTotals.value = !calculateOperatingBoxTotals.value;
    listTransactions(); // Recargar datos para obtener o no los totales
};

const clearFilters = () => {
    searchQuery.value = '';
    selectedType.value = '';
    selectedStatus.value = '';
    selectedCategory.value = '';
    selectedEgresoDirecto.value = '';
    selectedOperatingBoxId.value = '';
    selectedOperatingBoxMovementType.value = '';
    filterDateFrom.value = '';
    filterDateTo.value = '';
};

const prevPage = () => {
    if (pagination.value.current_page > 1) {
        currentPage.value = pagination.value.current_page - 1;
        listTransactions();
    }
};

const nextPage = () => {
    if (pagination.value.current_page < pagination.value.last_page) {
        currentPage.value = pagination.value.current_page + 1;
        listTransactions();
    }
};

const listTransactions = async () => {
    try {
        showLoading();
        // Construir parámetros de filtro
        const params = {
            page: currentPage.value,
            per_page: perPage.value,
        };
        if (searchQuery.value) params.search = searchQuery.value;
        if (selectedType.value) params.tipo = selectedType.value;
        if (selectedStatus.value) params.estado = selectedStatus.value;
        if (selectedCategory.value) params.categoria = selectedCategory.value;
        // Solo enviar egreso_directo si es un egreso y se ha seleccionado un valor
        if (selectedType.value === 'Egreso' && selectedEgresoDirecto.value !== '') {
            // Enviar como número (1 o 0) para mayor compatibilidad
            params.egreso_directo = selectedEgresoDirecto.value === 'true' ? true : false;
        }
        if (filterDateFrom.value) params.fecha_desde = filterDateFrom.value;
        if (filterDateTo.value) params.fecha_hasta = filterDateTo.value;

        // Filtros de caja operativa
        if (selectedOperatingBoxId.value) {
            params.caja_operativa_id = selectedOperatingBoxId.value;
            if (selectedOperatingBoxMovementType.value) {
                params.tipo_movimiento_caja = selectedOperatingBoxMovementType.value;
            }
        }

        // Calcular totales por caja si está activado
        if (calculateOperatingBoxTotals.value) {
            params.calcular_totales_caja = true;
        }

        // Para depuración: muestra los parámetros que se están enviando
        console.log('Parámetros enviados:', params);
        const { data } = await indexTransactionFinancialAll(params);
        console.log(data);
        transactions.value = data.datos || [];
        // Actualizar información de paginación
        if (data.meta) {
            pagination.value = {
                total: data.meta.total,
                current_page: data.meta.current_page,
                per_page: data.meta.per_page,
                last_page: data.meta.last_page,
            };
        }
        // Actualizar totales globales
        if (data.totales) {
            totales.value = data.totales;
        }
        // Actualizar totales por caja operativa si existen
        if (data.totales_por_caja) {
            operatingBoxTotals.value = data.totales_por_caja;
        } else {
            operatingBoxTotals.value = [];
        }
        console.log('Transacciones recibidas:', transactions.value);
    } catch (error) {
        console.error('Error listing transactions:', error);
        showError('Error', 'No se pudo cargar la lista de transacciones.');
    } finally {
        closeLoading();
    }
};

// Methods
const listTransactionStatesActives = async () => {
    try {
        const { data } = await transactionStatesActives();
        transactionStates.value = data.datos || [];
    } catch (error) {
        console.log(error);
    }
};

const listBusinessActives = async () => {
    try {
        const { data } = await businessesActives();
        businesses.value = data.datos || [];
    } catch (error) {
        console.log(error);
    }
};

const listPayMethodsActives = async () => {
    try {
        const { data } = await paymentMethodsActives();
        paymentMethods.value = data.datos || [];
    } catch (error) {
        console.log(error);
    }
};

const listCategoriesActives = async () => {
    try {
        const { data } = await categoriesActives();
        categories.value = data.datos || [];
    } catch (error) {
        console.log(error);
    }
};

const listUsersActives = async () => {
    try {
        const { data } = await usersActives();
        users.value = data.data || [];
    } catch (error) {
        console.log(error);
    }
};

const listVehicles = async () => {
    try {
        const { data } = await indexVehicles();
        vehicles.value = data.datos || [];
    } catch (error) {
        console.log(error);
    }
};

// Nueva variable para cajas operativas
const listOperatingBoxesActives = async () => {
    try {
        const { data } = await indexOperatingBoxes();
        operatingBoxes.value = data.data || [];
    } catch (error) {
        console.log(error);
    }
};

// Función para verificar si un archivo es una imagen
const isImageFile = fileUrl => {
    if (!fileUrl) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png'];
    const lowerCaseUrl = fileUrl.toLowerCase();
    return imageExtensions.some(ext => lowerCaseUrl.includes(ext));
};

const isPdfFile = fileUrl => {
    if (!fileUrl) return false;
    return fileUrl.toLowerCase().includes('.pdf');
};

const getFileName = fileUrl => {
    if (!fileUrl) return '';
    return fileUrl.split('/').pop() || 'Archivo';
};

const getFileExtension = fileUrl => {
    if (!fileUrl) return '';
    const fileName = fileUrl.split('/').pop() || '';
    const extension = fileName.split('.').pop();
    return extension ? extension.toUpperCase() : 'DOC';
};

// Funciones para el modal de vista
const openViewModal = async transaction => {
    try {
        showLoading();
        const { data } = await showFinancialTransaction(transaction.id);
        viewTransaction.value = data.data;
        isViewModalOpen.value = true;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        showError('Error', 'No se pudo cargar la información de la transacción.');
    } finally {
        closeLoading();
    }
};

const closeViewModal = () => {
    isViewModalOpen.value = false;
    viewTransaction.value = null;
};

// Funciones para el modal de edición
const openEditModal = async transaction => {
    try {
        showLoading();
        const { data } = await showFinancialTransaction(transaction.id);
        const transactionData = data.data;

        // Llenar el formulario con los datos de la transacción
        editForm.value = {
            id: transactionData.id,
            negocio_id: transactionData.negocio_id,
            metodo_id: transactionData.metodo_id,
            categoria_id: transactionData.categoria_id,
            vehicle_id: transactionData.vehicle_id,
            estado_de_transaccion_id: transactionData.estado_de_transaccion_id,
            caja_operativa_id: transactionData.caja_operativa_id,
            fecha: transactionData.fecha,
            punto_de_partida: transactionData.punto_de_partida,
            destino: transactionData.destino,
            millas: transactionData.millas,
            tipo_de_transaccion: transactionData.tipo_de_transaccion,
            item: transactionData.item,
            cantidad: transactionData.cantidad,
            importe_total: transactionData.importe_total,
            cliente_proveedor: transactionData.cliente_proveedor,
            egreso_directo: transactionData.egreso_directo,
            observaciones: transactionData.observaciones,
            numero_transaccion: transactionData.numero_transaccion,
            existingFiles: transactionData.archivos_procesados || [],
            newFiles: [],
        };

        editErrors.value = {};
        isEditModalOpen.value = true;
    } catch (error) {
        console.error('Error fetching transaction for edit:', error);
        showError('Error', 'No se pudo cargar la información de la transacción para editar.');
    } finally {
        closeLoading();
    }
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
    editForm.value = {
        id: null,
        negocio_id: '',
        metodo_id: '',
        categoria_id: '',
        vehicle_id: '',
        estado_de_transaccion_id: '',
        caja_operativa_id: '',
        fecha: '',
        punto_de_partida: '',
        destino: '',
        millas: '',
        tipo_de_transaccion: '',
        item: '',
        cantidad: '',
        importe_total: '',
        cliente_proveedor: '',
        egreso_directo: false,
        observaciones: '',
        numero_transaccion: '',
        existingFiles: [],
        newFiles: [],
    };
    editErrors.value = {};
};

// Función para convertir campos a mayúsculas
const convertToUpperCase = fieldName => {
    if (editForm.value[fieldName] && typeof editForm.value[fieldName] === 'string') {
        editForm.value[fieldName] = editForm.value[fieldName].toUpperCase();
    }
};

// Función para manejar el cambio de archivos
const handleFileChange = event => {
    const files = event.target.files;
    if (files && files.length > 0) {
        // Validar cada archivo
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validar tamaño (10MB)
            if (file.size > MAX_FILE_SIZE) {
                showError('Error', `El archivo ${file.name} excede el tamaño máximo de 10MB.`);
                return;
            }

            // Validar tipo
            const fileType = file.type;
            if (!ALLOWED_TYPES.includes(fileType)) {
                showError('Error', `El archivo ${file.name} no tiene un formato permitido.`);
                return;
            }
        }

        // Si todos los archivos son válidos, agregarlos a la lista de nuevos archivos
        editForm.value.newFiles = [...editForm.value.newFiles, ...files];
    }
};

// Función para eliminar un archivo existente
const removeExistingFile = index => {
    editForm.value.existingFiles.splice(index, 1);
};

// Función para eliminar un nuevo archivo
const removeNewFile = index => {
    editForm.value.newFiles.splice(index, 1);
};

// Función para formatear el tamaño del archivo
const formatFileSize = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Función para validar el formulario de edición
const validateEditForm = () => {
    editErrors.value = {};
    let isValid = true;

    // Validar campos obligatorios
    if (!editForm.value.negocio_id) {
        editErrors.value.negocio_id = 'El negocio es obligatorio';
        isValid = false;
    }
    if (!editForm.value.metodo_id) {
        editErrors.value.metodo_id = 'El método de pago es obligatorio';
        isValid = false;
    }
    if (!editForm.value.categoria_id) {
        editErrors.value.categoria_id = 'La categoría es obligatoria';
        isValid = false;
    }
    if (!editForm.value.estado_de_transaccion_id) {
        editErrors.value.estado_de_transaccion_id = 'El estado es obligatorio';
        isValid = false;
    }
    if (!editForm.value.fecha) {
        editErrors.value.fecha = 'La fecha es obligatoria';
        isValid = false;
    }
    if (!editForm.value.tipo_de_transaccion) {
        editErrors.value.tipo_de_transaccion = 'El tipo de transacción es obligatorio';
        isValid = false;
    }
    if (!editForm.value.item) {
        editErrors.value.item = 'El ítem es obligatorio';
        isValid = false;
    }
    if (!editForm.value.cantidad || editForm.value.cantidad <= 0) {
        editErrors.value.cantidad = 'La cantidad debe ser mayor que cero';
        isValid = false;
    }
    if (!editForm.value.importe_total || editForm.value.importe_total <= 0) {
        editErrors.value.importe_total = 'El importe total debe ser mayor que cero';
        isValid = false;
    }
    if (editForm.value.tipo_de_transaccion === 'Egreso' && editForm.value.egreso_directo === '') {
        editErrors.value.egreso_directo = 'Debe especificar si es un egreso directo';
        isValid = false;
    }

    return isValid;
};

// Función para manejar la actualización de la transacción
const handleUpdate = async () => {
    if (!validateEditForm()) return;

    try {
        isUpdating.value = true;
        showLoading();

        // Crear FormData para enviar los datos y archivos
        const formData = new FormData();

        // Agregar todos los campos del formulario
        formData.append('negocio_id', editForm.value.negocio_id);
        formData.append('metodo_id', editForm.value.metodo_id);
        formData.append('categoria_id', editForm.value.categoria_id);
        formData.append('vehicle_id', editForm.value.vehicle_id || '');
        formData.append('estado_de_transaccion_id', editForm.value.estado_de_transaccion_id);
        formData.append('caja_operativa_id', editForm.value.caja_operativa_id || '');
        formData.append('fecha', editForm.value.fecha);
        formData.append('punto_de_partida', editForm.value.punto_de_partida || '');
        formData.append('destino', editForm.value.destino || '');
        formData.append('millas', editForm.value.millas || '');
        formData.append('tipo_de_transaccion', editForm.value.tipo_de_transaccion);
        formData.append('item', editForm.value.item);
        formData.append('cantidad', editForm.value.cantidad);
        formData.append('importe_total', editForm.value.importe_total);
        formData.append('cliente_proveedor', editForm.value.cliente_proveedor || '');
        formData.append('egreso_directo', editForm.value.egreso_directo);
        formData.append('observaciones', editForm.value.observaciones || '');
        formData.append('numero_transaccion', editForm.value.numero_transaccion || '');
        formData.append('_method', 'PUT'); // Para simular método PUT
        // Agregar archivos nuevos
        if (editForm.value.newFiles && editForm.value.newFiles.length > 0) {
            for (let i = 0; i < editForm.value.newFiles.length; i++) {
                formData.append('archivo[]', editForm.value.newFiles[i]);
            }
        }

        // Enviar la solicitud de actualización
        const { data } = await updateFinancialTransaction(editForm.value.id, formData);

        showSuccess('Éxito', 'Transacción actualizada correctamente.');
        await listTransactions();
        closeEditModal();
    } catch (error) {
        console.error('Error updating transaction:', error);
        if (error.response && error.response.data && error.response.data.errors) {
            editErrors.value = error.response.data.errors;
        } else {
            showError(
                'Error',
                'No se pudo actualizar la transacción. Inténtelo de nuevo más tarde.'
            );
        }
    } finally {
        isUpdating.value = false;
        closeLoading();
    }
};

// Funciones para el modal de cambio de estado
const openStateModal = transaction => {
    console.log(transaction);
    selectedTransaction.value = transaction;
    selectedEstadoId.value = transaction.estado_de_transaccion_id;
    stateErrors.value = {};
    isStateModalOpen.value = true;
};

const closeStateModal = () => {
    isStateModalOpen.value = false;
    selectedTransaction.value = null;
    selectedEstadoId.value = '';
    stateErrors.value = {};
};

const validateStateForm = () => {
    stateErrors.value = {};
    let isValid = true;
    if (!selectedEstadoId.value) {
        stateErrors.value.estado_de_transaccion_id = 'Debe seleccionar un estado';
        isValid = false;
    }
    return isValid;
};

const handleStateChange = async () => {
    if (!validateStateForm()) return;
    try {
        isStateChanging.value = true;
        showLoading();
        await changeStateFinancialTransaction(selectedTransaction.value.id, {
            estado_de_transaccion_id: selectedEstadoId.value,
        });
        showSuccess('Éxito', 'Estado de transacción actualizado correctamente.');
        await listTransactions();
        closeStateModal();
    } catch (error) {
        console.error('Error changing transaction state:', error);
        if (error.response && error.response.data && error.response.data.errors) {
            stateErrors.value = error.response.data.errors;
        } else {
            showError('Error', 'No se pudo actualizar el estado de la transacción.');
        }
    } finally {
        isStateChanging.value = false;
        closeLoading();
    }
};

// Función para exportar a Excel
const exportToExcel = async () => {
    try {
        showLoading();
        // Construir parámetros de filtro (iguales a los de listTransactions)
        const params = {};
        if (searchQuery.value) params.search = searchQuery.value;
        if (selectedType.value) params.tipo = selectedType.value;
        if (selectedStatus.value) params.estado = selectedStatus.value;
        if (selectedCategory.value) params.categoria = selectedCategory.value;
        if (selectedType.value === 'Egreso' && selectedEgresoDirecto.value !== '') {
            params.egreso_directo = selectedEgresoDirecto.value === 'true' ? true : false;
        }
        if (filterDateFrom.value) params.fecha_desde = filterDateFrom.value;
        if (filterDateTo.value) params.fecha_hasta = filterDateTo.value;

        // Filtros de caja operativa
        if (selectedOperatingBoxId.value) {
            params.caja_operativa_id = selectedOperatingBoxId.value;
            if (selectedOperatingBoxMovementType.value) {
                params.tipo_movimiento_caja = selectedOperatingBoxMovementType.value;
            }
        }

        // Llamar al servicio de exportación
        const response = await exportTransactionFinancialExcel(params);
        // Crear un blob con los datos recibidos
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        // Crear una URL para el blob
        const url = window.URL.createObjectURL(blob);
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        // Generar nombre de archivo con fecha actual
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10);
        link.setAttribute('download', `transacciones_financieras_${dateStr}.xlsx`);
        // Simular clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        showSuccess('Éxito', 'Los datos se han exportado correctamente a Excel.');
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        showError('Error', 'No se pudo exportar los datos a Excel. Inténtelo de nuevo.');
    } finally {
        closeLoading();
    }
};

const confirmDelete = async transaction => {
    console.log('ID de transacción a eliminar:', transaction.id);
    const isConfirmed = await showConfirm(
        'Confirmar',
        '¿Está seguro de eliminar esta transacción?'
    );

    if (isConfirmed) {
        try {
            showLoading();
            console.log('Enviando solicitud de eliminación...');
            await deleteFinancialTransaction(transaction.id);
            console.log('Transacción eliminada, actualizando lista...');
            showSuccess('Éxito', 'Transacción eliminada correctamente.');
            await listTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            showError('Error', 'No se pudo eliminar la transacción.');
        } finally {
            closeLoading();
        }
    }
};

const getTypeClass = type => {
    return type === 'Ingreso'
        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
};

const getImporteClass = type => {
    return type === 'Ingreso'
        ? 'text-green-600 dark:text-green-400'
        : 'text-red-600 dark:text-red-400';
};

const formatDate = date => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const formatCurrency = value => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(
        value || 0
    );
};

// Función para truncar texto
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Funciones para obtener nombres de relaciones
const getBusinessName = id => {
    const business = businesses.value.find(b => b.id === id);
    return business ? business.nombre : 'N/A';
};

const getPaymentMethodName = id => {
    const method = paymentMethods.value.find(m => m.id === id);
    return method ? method.nombre : 'N/A';
};

const getCategoryName = id => {
    const category = categories.value.find(c => c.id === id);
    return category ? category.nombre : 'N/A';
};

const getUserName = id => {
    const user = users.value.find(u => u.id === id);
    if (user) {
        return (
            `${user.general_data?.nombre || ''} ${user.general_data?.apellido || ''}`.trim() ||
            'N/A'
        );
    }
    return 'N/A';
};

const getVehicleName = id => {
    const vehicle = vehicles.value.find(v => v.id === id);
    return vehicle ? `${vehicle.numero_placa} - ${vehicle.modelo}` : 'N/A';
};

// Función para obtener el nombre del estado
const getStateName = id => {
    const state = transactionStates.value.find(s => s.id === id);
    return state ? state.nombre : 'N/A';
};

// Función para obtener el nombre de la caja operativa
const getOperatingBoxName = id => {
    if (!id) return 'N/A';
    const box = operatingBoxes.value.find(b => b.id === id);
    return box ? box.nombre : 'N/A';
};

// Función para obtener la clase CSS según el estado
const getStateColorClass = stateName => {
    switch (stateName) {
        case 'Por Cobrar':
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        case 'Por Pagar':
            return 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100';
        case 'Pagado':
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'Pago Parcial':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        case 'Reembolso':
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
};
// Método para navegar a la ruta de creación
const navigateToCreate = () => {
    router.push({ path: '/form-financial-admin' }); // Usando nombre de ruta
    // O con path: router.push('/transactions/create');
};
// Watcher para recargar datos cuando cambian los filtros
watch(
    [
        searchQuery,
        selectedType,
        selectedStatus,
        selectedCategory,
        selectedEgresoDirecto,
        selectedOperatingBoxId,
        selectedOperatingBoxMovementType,
        filterDateFrom,
        filterDateTo,
        calculateOperatingBoxTotals,
    ],
    () => {
        currentPage.value = 1;
        listTransactions();
    }
);

// Watcher para resetear el filtro de egreso directo cuando cambia el tipo de transacción
watch(selectedType, newValue => {
    if (newValue !== 'Egreso') {
        selectedEgresoDirecto.value = '';
    }
});

// Lifecycle
onMounted(async () => {
    await listTransactions();
    await listTransactionStatesActives();
    await listBusinessActives();
    await listPayMethodsActives();
    await listCategoriesActives();
    await listUsersActives();
    await listVehicles();
    await listOperatingBoxesActives(); // Cargar cajas operativas
});
</script>
