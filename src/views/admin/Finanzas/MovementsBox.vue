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
                        class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-500 to-amber-600 sm:p-3"
                    >
                        <FileTextIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Movimientos de Caja
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Consulta todos los movimientos de caja del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="exportToExcel"
                    class="flex items-center justify-center px-4 py-2.5 font-medium text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg touch-manipulation transform hover:scale-105"
                >
                    <DownloadIcon class="w-4 h-4 mr-2" />
                    Exportar
                </button>
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
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div class="relative">
                    <SearchIcon
                        class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar movimientos..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedType"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los tipos</option>
                    <option value="ingreso">Ingresos</option>
                    <option value="egreso">Egresos</option>
                </select>
                <select
                    v-model="selectedCategory"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todas las categorías</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.nombre }}
                    </option>
                </select>
                <select
                    v-model="selectedOperatingBox"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
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
            <div class="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                    v-model="startDate"
                    type="date"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                />
                <input
                    v-model="endDate"
                    type="date"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                />
                <select
                    v-model="selectedUser"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los usuarios</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.email }}
                    </option>
                </select>
                <button
                    @click="clearFilters"
                    class="px-4 py-2.5 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base"
                >
                    Limpiar filtros
                </button>
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
                    Total Movimientos
                </h3>
                <p class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ filteredMovements.length }}
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
                    Ingresos
                </h3>
                <p class="text-xl font-bold text-green-500">
                    {{ formatCurrency(totals.ingresos) }}
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
                    Egresos
                </h3>
                <p class="text-xl font-bold text-red-500">
                    {{ formatCurrency(totals.egresos) }}
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
                    Saldo Neto
                </h3>
                <p
                    class="text-xl font-bold"
                    :class="totals.saldo >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                    {{ formatCurrency(totals.saldo) }}
                </p>
            </div>
        </div>
        <!-- Table -->
        <div
            class="overflow-hidden transition-colors duration-200 shadow-lg rounded-xl"
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
                    <thead class="bg-gradient-to-r from-yellow-500 to-amber-600">
                        <tr>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                N° Transacción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Fecha
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Descripción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Tipo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Monto
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Monto Excedido
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Categoría
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Caja Operativa
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
                            >
                                Usuario
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left uppercase text-dark"
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
                            v-for="movement in paginatedMovements"
                            :key="movement.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{ movement.numero_transaccion || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{ formatDate(movement.fecha_movimiento) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{ movement.descripcion || 'Sin descripción' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        movement.tipo === 'ingreso'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    "
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ movement.tipo === 'ingreso' ? 'Ingreso' : 'Egreso' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="
                                        movement.tipo === 'ingreso'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    "
                                >
                                    {{ movement.tipo === 'ingreso' ? '+' : '-' }}
                                    {{ formatCurrency(movement.monto) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="
                                        movement.monto_excedido > 0
                                            ? 'text-red-600'
                                            : 'text-gray-600 dark:text-gray-400'
                                    "
                                >
                                    {{ formatCurrency(movement.monto_excedido) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{
                                        movement.transaccion_financiera?.categoria?.nombre || 'N/A'
                                    }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{
                                        movement.transaccion_financiera?.caja_operativa?.nombre ||
                                        'N/A'
                                    }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                >
                                    {{ movement.user?.email || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="showMovementDetails(movement)"
                                        class="p-2 text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                                        title="Ver detalles"
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
        <!-- Empty State -->
        <div v-if="filteredMovements.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <FileTextIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron movimientos
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros.
                </p>
            </div>
        </div>
        <!-- Pagination -->
        <div
            v-if="filteredMovements.length > 0"
            class="flex justify-center mt-6 space-x-2"
            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
        >
            <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 disabled:opacity-50"
            >
                Anterior
            </button>
            <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
        <!-- Movement Details Modal -->
        <div
            v-if="isDetailsModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Detalles del Movimiento
                        </h2>
                        <button
                            @click="closeDetailsModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div v-if="selectedMovement" class="space-y-6">
                        <!-- Movement Info -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-5 h-5 mr-2 text-yellow-500" />
                                Información del Movimiento
                            </h3>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        ID
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Número de Transacción
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.numero_transaccion || 'N/A' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Fecha y Hora
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ formatDate(selectedMovement.fecha_movimiento) }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Descripción
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.descripcion || 'Sin descripción' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Tipo
                                    </label>
                                    <span
                                        :class="
                                            selectedMovement.tipo === 'ingreso'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                        "
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    >
                                        {{
                                            selectedMovement.tipo === 'ingreso'
                                                ? 'Ingreso'
                                                : 'Egreso'
                                        }}
                                    </span>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Monto
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="
                                            selectedMovement.tipo === 'ingreso'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        "
                                    >
                                        {{ selectedMovement.tipo === 'ingreso' ? '+' : '-' }}
                                        {{ formatCurrency(selectedMovement.monto) }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Monto Excedido
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="
                                            selectedMovement.monto_excedido > 0
                                                ? 'text-red-600'
                                                : 'text-gray-600 dark:text-gray-400'
                                        "
                                    >
                                        {{ formatCurrency(selectedMovement.monto_excedido) }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Usuario
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.user?.email || 'N/A' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Categoría
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.categoria
                                                ?.nombre || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Caja Operativa
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.caja_operativa
                                                ?.nombre || 'N/A'
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Transaction Info -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-5 h-5 mr-2 text-amber-500" />
                                Información de la Transacción
                            </h3>
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        ID de Transacción
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.transaccion_financiera?.id || 'N/A' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Item
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{ selectedMovement.transaccion_financiera?.item || 'N/A' }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Cantidad
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.cantidad ||
                                            'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Importe Total
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            formatCurrency(
                                                selectedMovement.transaccion_financiera
                                                    ?.importe_total || 0
                                            )
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Método de Pago
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.metodo
                                                ?.nombre || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Estado de Transacción
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera
                                                ?.estado_de_transaccion?.nombre || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Negocio
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.negocio
                                                ?.nombre || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Vehículo
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.vehicle
                                                ?.numero_placa || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Punto de Partida
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera
                                                ?.punto_de_partida || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Destino
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.destino ||
                                            'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Millas
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.millas || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Cliente/Proveedor
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera
                                                ?.cliente_proveedor || 'N/A'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Egreso Directo
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera?.egreso_directo
                                                ? 'Sí'
                                                : 'No'
                                        }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        Observaciones
                                    </label>
                                    <p
                                        class="text-sm font-medium"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-900'"
                                    >
                                        {{
                                            selectedMovement.transaccion_financiera
                                                ?.observaciones || 'Sin observaciones'
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- File Info -->
                        <div
                            v-if="selectedMovement.transaccion_financiera?.archivo"
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-4 text-base font-semibold transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-5 h-5 mr-2 text-purple-500" />
                                Archivo Adjunto
                            </h3>
                            <div
                                class="flex items-center justify-between p-3 bg-gray-200 rounded-lg dark:bg-gray-600"
                            >
                                <div class="flex items-center space-x-3">
                                    <div
                                        class="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg dark:bg-purple-900/30"
                                    >
                                        <svg
                                            class="w-5 h-5 text-purple-600 dark:text-purple-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p
                                            class="text-sm font-medium text-gray-900 truncate dark:text-white"
                                        >
                                            {{
                                                getFileName(
                                                    selectedMovement.transaccion_financiera.archivo
                                                )
                                            }}
                                        </p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">
                                            {{
                                                formatFileSize(
                                                    selectedMovement.transaccion_financiera.archivo
                                                )
                                            }}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    @click="downloadFile"
                                    class="p-2 text-purple-500 transition-colors duration-200 rounded-lg hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
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

const { formatCurrency } = useCurrency();

// Icons
import { DownloadIcon, EyeIcon, FileTextIcon, SearchIcon, XIcon } from 'lucide-vue-next';

// Services
import {
    getCategories,
    getMovements,
    getOperatingBoxes,
    getUsers,
} from '@/services/MovementBoxService';

// Initialize alert
const { showSuccess, showError, showLoading, closeLoading } = useAlert();

// ========== STATE ==========
const movements = ref([]);
const categories = ref([]);
const operatingBoxes = ref([]);
const users = ref([]);
const isLoading = ref(false);
const isDetailsModalOpen = ref(false);
const selectedMovement = ref(null);

// ========== FILTERS ==========
const searchQuery = ref('');
const selectedType = ref('');
const selectedCategory = ref('');
const selectedOperatingBox = ref('');
const selectedUser = ref('');

// ========== FECHAS - DESDE ENERO HASTA HOY ==========
const getJanuaryFirstThisYear = () => {
    const today = new Date();
    return new Date(today.getFullYear(), 0, 1); // Enero 1 del año actual
};

const getTodayDate = () => {
    return new Date();
};

const formatDateToYYYYMMDD = date => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Inicializar fechas: desde enero 1 hasta hoy
const startDate = ref(formatDateToYYYYMMDD(getJanuaryFirstThisYear()));
const endDate = ref(formatDateToYYYYMMDD(getTodayDate()));
const currentPage = ref(1);
const perPage = ref(20);

// ========== FUNCIONES DE FORMATO ==========

/**
 * Formatea fecha sin problemas de zona horaria
 */
const formatDate = dateStr => {
    if (!dateStr) return '';

    // SOLUCIÓN: Dividir la fecha en partes para evitar problemas de zona horaria
    const parts = dateStr.split('T')[0].split('-'); // Si viene ISO, tomar solo la fecha
    if (parts.length !== 3) return 'Fecha inválida';

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) return 'Fecha inválida';

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    return new Intl.DateTimeFormat('es-ES', options).format(date);
};

/**
 * Compara fechas sin problemas de zona horaria
 */
const compareDates = (dateStr, startDateStr, endDateStr) => {
    if (!dateStr) return false;

    const dateParts = dateStr.split('T')[0].split('-');
    const startParts = startDateStr ? startDateStr.split('-') : null;
    const endParts = endDateStr ? endDateStr.split('-') : null;

    if (dateParts.length !== 3) return false;
    if (startParts && startParts.length !== 3) return false;
    if (endParts && endParts.length !== 3) return false;

    const date = new Date(
        parseInt(dateParts[0], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[2], 10)
    );

    const start = startParts
        ? new Date(
              parseInt(startParts[0], 10),
              parseInt(startParts[1], 10) - 1,
              parseInt(startParts[2], 10)
          )
        : null;

    const end = endParts
        ? new Date(
              parseInt(endParts[0], 10),
              parseInt(endParts[1], 10) - 1,
              parseInt(endParts[2], 10)
          )
        : null;

    const normalizeDate = d => {
        const normalized = new Date(d);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    };

    const normalizedDate = normalizeDate(date);
    const normalizedStart = start ? normalizeDate(start) : null;
    const normalizedEnd = end ? normalizeDate(end) : null;

    if (normalizedStart && normalizedDate < normalizedStart) return false;
    if (normalizedEnd && normalizedDate > normalizedEnd) return false;

    return true;
};

// ========== COMPUTED PROPERTIES ==========

/**
 * Filtra movimientos basado en criterios
 */
const filteredMovements = computed(() => {
    console.log('Filtrando movimientos. Total:', movements.value.length);
    return movements.value.filter(movement => {
        const matchesSearch = movement.descripcion
            ? movement.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
            : true;
        const matchesType = selectedType.value === '' || movement.tipo === selectedType.value;
        const matchesCategory =
            selectedCategory.value === '' ||
            movement.transaccion_financiera?.categoria?.id == selectedCategory.value;
        const matchesOperatingBox =
            selectedOperatingBox.value === '' ||
            movement.transaccion_financiera?.caja_operativa?.id == selectedOperatingBox.value;
        const matchesUser = selectedUser.value === '' || movement.user?.id == selectedUser.value;

        const matchesDates = compareDates(
            movement.fecha_movimiento,
            startDate.value,
            endDate.value
        );

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory &&
            matchesOperatingBox &&
            matchesUser &&
            matchesDates
        );
    });
});

const paginatedMovements = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredMovements.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredMovements.value.length / perPage.value));

const totals = computed(() => {
    const ingresos = filteredMovements.value
        .filter(m => m.tipo === 'ingreso')
        .reduce((sum, m) => sum + (parseFloat(m.monto) || 0), 0);
    const egresos = filteredMovements.value
        .filter(m => m.tipo === 'egreso')
        .reduce((sum, m) => sum + (parseFloat(m.monto) || 0), 0);
    return {
        ingresos,
        egresos,
        saldo: ingresos - egresos,
    };
});

// ========== MÉTODOS ==========

/**
 * Carga todos los movimientos
 */
const loadMovements = async () => {
    try {
        showLoading();

        const params = {
            tipo: selectedType.value || '',
            categoria_id: selectedCategory.value || '',
            operating_box_id: selectedOperatingBox.value || '',
            user_id: selectedUser.value || '',
            fecha_inicio: startDate.value || formatDateToYYYYMMDD(getJanuaryFirstThisYear()),
            fecha_fin: endDate.value || formatDateToYYYYMMDD(getTodayDate()),
            search: searchQuery.value || '',
            per_page: 500, // Cargar muchos para filtrar en frontend
        };

        console.log('📤 Enviando parámetros:', params);

        const response = await getMovements(params);
        console.log('📥 Respuesta completa:', response.data);

        const responseData = response.data;

        if (responseData.data && Array.isArray(responseData.data)) {
            movements.value = responseData.data;
            console.log('✅ Movimientos cargados (formato paginado):', movements.value.length);
        } else if (Array.isArray(responseData)) {
            movements.value = responseData;
            console.log('✅ Movimientos cargados (array directo):', movements.value.length);
        } else {
            console.warn('⚠️ Formato de respuesta no reconocido:', responseData);
            movements.value = [];
        }
    } catch (error) {
        console.error('❌ Error loading movements:', error);
        showError('Error', 'No se pudieron cargar los movimientos de caja.');
        movements.value = [];
    } finally {
        closeLoading();
    }
};

/**
 * Carga categorías
 */
const loadCategories = async () => {
    try {
        const response = await getCategories();
        categories.value = response.data.data || [];
        console.log('✅ Categorías cargadas:', categories.value.length);
    } catch (error) {
        console.error('Error loading categories:', error);
    }
};

/**
 * Carga cajas operativas
 */
const loadOperatingBoxes = async () => {
    try {
        const response = await getOperatingBoxes();
        operatingBoxes.value = response.data.data || [];
        console.log('✅ Cajas operativas cargadas:', operatingBoxes.value.length);
    } catch (error) {
        console.error('Error loading operating boxes:', error);
    }
};

/**
 * Carga usuarios
 */
const loadUsers = async () => {
    try {
        const response = await getUsers();
        users.value = response.data.data || [];
        console.log('✅ Usuarios cargados:', users.value.length);
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

/**
 * Limpia todos los filtros y reinicia desde enero
 */
const clearFilters = () => {
    searchQuery.value = '';
    selectedType.value = '';
    selectedCategory.value = '';
    selectedOperatingBox.value = '';
    selectedUser.value = '';

    // Restaurar fechas a enero 1 hasta hoy
    startDate.value = formatDateToYYYYMMDD(getJanuaryFirstThisYear());
    endDate.value = formatDateToYYYYMMDD(getTodayDate());

    currentPage.value = 1;

    console.log('🔄 Filtros limpiados - reiniciando desde enero');
    loadMovements();
};

/**
 * Navega a página anterior
 */
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

/**
 * Navega a página siguiente
 */
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

/**
 * Muestra detalles de un movimiento
 */
const showMovementDetails = movement => {
    selectedMovement.value = movement;
    isDetailsModalOpen.value = true;
};

/**
 * Cierra modal de detalles
 */
const closeDetailsModal = () => {
    isDetailsModalOpen.value = false;
    selectedMovement.value = null;
};

/**
 * Obtiene nombre del archivo
 */
const getFileName = filePath => {
    if (!filePath) return '';
    return filePath.split('/').pop();
};

/**
 * Formatea tamaño de archivo
 */
const formatFileSize = bytes => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Descarga archivo
 */
const downloadFile = () => {
    if (!selectedMovement.value?.transaccion_financiera?.archivo) return;
    const filePath = selectedMovement.value.transaccion_financiera.archivo;
    const fileName = getFileName(filePath);
    const link = document.createElement('a');
    link.href = filePath.startsWith('http') ? filePath : `${window.location.origin}/${filePath}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Exporta a Excel
 */
const exportToExcel = () => {
    const csvContent = [
        [
            'N° Transacción',
            'Fecha',
            'Descripción',
            'Tipo',
            'Monto',
            'Monto Excedido',
            'Categoría',
            'Caja Operativa',
            'Usuario',
        ],
        ...filteredMovements.value.map(m => [
            m.numero_transaccion || '',
            formatDate(m.fecha_movimiento),
            m.descripcion || '',
            m.tipo,
            m.monto,
            m.monto_excedido,
            m.transaccion_financiera?.categoria?.nombre || '',
            m.transaccion_financiera?.caja_operativa?.nombre || '',
            m.user?.email || '',
        ]),
    ]
        .map(row => row.join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `movimientos_caja_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};

// ========== WATCHERS ==========

/**
 * Observa cambios en filtros
 */
watch(
    [
        searchQuery,
        selectedType,
        selectedCategory,
        selectedOperatingBox,
        selectedUser,
        startDate,
        endDate,
    ],
    () => {
        currentPage.value = 1;
        loadMovements();
    },
    { debounce: 500 }
);

// ========== LIFECYCLE ==========

onMounted(async () => {
    console.log('🚀 Montando componente de movimientos de caja');

    // Mostrar fechas iniciales
    console.log('📅 Rango de fechas inicial:', {
        inicio: startDate.value,
        fin: endDate.value,
    });

    await Promise.all([loadMovements(), loadCategories(), loadOperatingBoxes(), loadUsers()]);
});
</script>
