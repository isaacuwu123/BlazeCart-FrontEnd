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
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <!-- Campo de búsqueda -->
                <div class="relative col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
                    <label
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Búsqueda general
                    </label>
                    <div class="relative">
                        <SearchIcon
                            class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                        />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Buscar por N°, ítem, cliente..."
                            class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                            :class="
                                isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            "
                        />
                    </div>
                </div>

                <!-- Tipo de transacción -->
                <div>
                    <label
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Tipo de transacción
                    </label>
                    <select
                        v-model="selectedType"
                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
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
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Estado
                    </label>
                    <select
                        v-model="selectedStatus"
                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
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

                <!-- Egreso directo -->
                <div>
                    <label
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Tipo de egreso
                    </label>
                    <select
                        v-model="selectedEgresoDirecto"
                        :disabled="selectedType !== 'Egreso'"
                        :title="selectedType !== 'Egreso' ? 'Solo aplica para egresos' : ''"
                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200 disabled:opacity-50"
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

                <!-- Fecha desde -->
                <div>
                    <label
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Fecha desde
                    </label>
                    <input
                        v-model="filterDateFrom"
                        type="date"
                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
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
                        class="block mb-1 text-xs font-medium transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                    >
                        Fecha hasta
                    </label>
                    <input
                        v-model="filterDateTo"
                        type="date"
                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                        "
                    />
                </div>

                <!-- Botones de acción -->
                <div
                    class="flex flex-col col-span-1 space-y-2 sm:col-span-2 md:col-span-3 lg:col-span-2 lg:flex-row lg:space-y-0 lg:space-x-2"
                >
                    <button
                        @click="exportToExcel"
                        class="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-green-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-green-700 border-green-600 text-white hover:bg-green-600'
                                : 'bg-green-500 border-green-400 text-white hover:bg-green-600'
                        "
                        title="Exportar datos a Excel"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        <span>Exportar</span>
                    </button>

                    <button
                        @click="openImportModal"
                        class="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-blue-700 border-blue-600 text-white hover:bg-blue-600'
                                : 'bg-blue-500 border-blue-400 text-white hover:bg-blue-600'
                        "
                        title="Importar datos desde Excel"
                    >
                        <UploadIcon class="w-4 h-4 mr-2" />
                        <span>Importar</span>
                    </button>

                    <button
                        @click="descargarPlantilla"
                        class="flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-purple-700 border-purple-600 text-white hover:bg-purple-600'
                                : 'bg-purple-500 border-purple-400 text-white hover:bg-purple-600'
                        "
                        title="Descargar plantilla de Excel"
                    >
                        <DownloadIcon class="w-4 h-4 mr-2" />
                        <span>Plantilla</span>
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
                            <div
                                class="p-3 transition-colors duration-200 rounded-lg sm:col-span-2"
                                :class="isDarkMode ? 'bg-gray-600' : 'bg-white'"
                            >
                                <label
                                    class="block mb-1 text-xs font-medium tracking-wider uppercase"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    Archivo Adjunto
                                </label>
                                <div v-if="viewTransaction.archivo" class="mt-3">
                                    <div v-if="isImageFile(viewTransaction.archivo)" class="mb-4">
                                        <div class="relative">
                                            <img
                                                :src="viewTransaction.archivo"
                                                class="object-contain h-64 max-w-full border rounded-lg shadow-sm"
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
                                    <div
                                        v-else-if="isPdfFile(viewTransaction.archivo)"
                                        class="mb-4"
                                    >
                                        <div
                                            class="relative overflow-hidden border rounded-lg shadow-sm"
                                            :class="
                                                isDarkMode
                                                    ? 'border-gray-600 bg-gray-700'
                                                    : 'border-gray-300 bg-gray-100'
                                            "
                                        >
                                            <div
                                                class="flex items-center justify-center h-64 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
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
                                                        {{ getFileName(viewTransaction.archivo) }}
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
                                    <div v-else class="mb-4">
                                        <div
                                            class="relative overflow-hidden border rounded-lg shadow-sm"
                                            :class="
                                                isDarkMode
                                                    ? 'border-gray-600 bg-gray-700'
                                                    : 'border-gray-300 bg-gray-100'
                                            "
                                        >
                                            <div
                                                class="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
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
                                                        {{ getFileName(viewTransaction.archivo) }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                class="absolute px-2 py-1 text-xs text-white bg-blue-500 rounded top-2 right-2"
                                            >
                                                {{ getFileExtension(viewTransaction.archivo) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex justify-center mt-4">
                                        <a
                                            :href="viewTransaction.archivo"
                                            target="_blank"
                                            class="inline-flex items-center px-4 py-2 font-medium text-white transition-all duration-200 transform rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105"
                                        >
                                            <DownloadIcon class="w-5 h-5 mr-2" />
                                            Ver/Descargar Archivo
                                        </a>
                                    </div>
                                </div>
                                <div
                                    v-else
                                    class="flex items-center text-gray-500 dark:text-gray-400"
                                >
                                    <FileIcon class="w-5 h-5 mr-2" />
                                    <p class="text-sm font-medium">No hay archivo adjunto</p>
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
import { paymentMethodsActives } from '@/services/PaymentMethodService';
import {
    changeStateFinancialTransaction,
    deleteFinancialTransaction,
    downloadTransactionFinancialTemplate,
    exportTransactionFinancialExcel,
    importTransactionFinancial,
    indexTransactionFinancialAll,
    showFinancialTransaction,
} from '@/services/TransactionFinancialService';
import { transactionStatesActives } from '@/services/TransactionStateService';
import { usersActives } from '@/services/UserService';
import { indexVehicles } from '@/services/VehicleService';
import {
    AlertTriangleIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircle2Icon,
    DollarSignIcon,
    DownloadIcon,
    EyeIcon,
    FileIcon,
    RefreshCwIcon,
    SearchIcon,
    TrashIcon,
    UploadIcon,
    UserIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Initialize useAlert
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();

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
const isViewModalOpen = ref(false);
const isStateModalOpen = ref(false);
const isStateChanging = ref(false);
const selectedTransaction = ref(null);
const selectedEstadoId = ref('');
const stateErrors = ref({});
const searchQuery = ref('');
const selectedType = ref('');
const selectedStatus = ref('');
const selectedEgresoDirecto = ref('');
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

// Computed
const totalPages = computed(() => pagination.value.last_page);
const paginatedTransactions = computed(() => transactions.value);

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
        // Solo enviar egreso_directo si es un egreso y se ha seleccionado un valor
        if (selectedType.value === 'Egreso' && selectedEgresoDirecto.value !== '') {
            // Enviar como número (1 o 0) para mayor compatibilidad
            params.egreso_directo = selectedEgresoDirecto.value === 'true' ? true : false;
        }
        if (filterDateFrom.value) params.fecha_desde = filterDateFrom.value;
        if (filterDateTo.value) params.fecha_hasta = filterDateTo.value;
        // Para depuración: muestra los parámetros que se están enviando
        console.log('Parámetros enviados:', params);
        const { data } = await indexTransactionFinancialAll(params);
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

// Función para exportar a Excel
const exportToExcel = async () => {
    try {
        showLoading();
        // Construir parámetros de filtro (iguales a los de listTransactions)
        const params = {};
        if (searchQuery.value) params.search = searchQuery.value;
        if (selectedType.value) params.tipo = selectedType.value;
        if (selectedStatus.value) params.estado = selectedStatus.value;
        if (selectedType.value === 'Egreso' && selectedEgresoDirecto.value !== '') {
            params.egreso_directo = selectedEgresoDirecto.value === 'true' ? true : false;
        }
        if (filterDateFrom.value) params.fecha_desde = filterDateFrom.value;
        if (filterDateTo.value) params.fecha_hasta = filterDateTo.value;
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

// Watcher para recargar datos cuando cambian los filtros
watch(
    [
        searchQuery,
        selectedType,
        selectedStatus,
        selectedEgresoDirecto,
        filterDateFrom,
        filterDateTo,
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
});
</script>

<style scoped>
/* Enhanced scrollbar styling for better mobile experience */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #059669;
}
/* Touch improvements for mobile */
@media (max-width: 640px) {
    .touch-manipulation {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }
}
</style>
