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
                            Gestión de Cajas Operativas
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra las cajas operativas del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="openCreateModal"
                    class="flex items-center justify-center px-4 py-2.5 font-medium text-white transition-all duration-200 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg hover:from-yellow-600 hover:to-orange-700 shadow-md hover:shadow-lg touch-manipulation transform hover:scale-105"
                >
                    <PlusIcon class="w-4 h-4 mr-2" />
                    Nueva Caja
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
            <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4">
                <div class="relative flex-1">
                    <SearchIcon
                        class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 sm:h-5 sm:w-5"
                    />
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Buscar cajas..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="true">Activas</option>
                    <option value="false">Inactivas</option>
                </select>
            </div>
        </div>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    Total Cajas
                </h3>
                <p class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ filteredBoxes.length }}
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
                    Cajas Activas
                </h3>
                <p
                    class="text-xl font-bold text-green-500"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                >
                    {{ filteredBoxes.filter(box => box.estado).length }}
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
                    Saldo Total
                </h3>
                <p
                    class="text-xl font-bold"
                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                >
                    {{ formatCurrency(totalSaldo) }}
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
                                Nombre
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Saldo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Descripción
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Estado
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
                            v-for="box in paginatedBoxes"
                            :key="box.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ box.nombre }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm font-medium"
                                    :class="box.saldo >= 0 ? 'text-green-600' : 'text-red-600'"
                                >
                                    {{ formatCurrency(box.saldo) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    {{ box.descripcion || 'Sin descripción' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="
                                        box.estado
                                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                    "
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ box.estado ? 'Activa' : 'Inactiva' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="showOperatingBoxById(box.id)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="viewBoxHistory(box)"
                                        class="p-2 text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                                        title="Ver historial"
                                    >
                                        <HistoryIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-if="box.estado"
                                        @click="confirmDeactivate(box)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                        title="Desactivar"
                                    >
                                        <TrashIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-else
                                        @click="confirmActivate(box)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Reactivar"
                                    >
                                        <RefreshCwIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-if="!box.estado"
                                        @click="confirmDeletePermanent(box)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-700 rounded-lg hover:bg-red-800"
                                        title="Eliminar permanentemente"
                                    >
                                        <Trash2Icon class="w-4 h-4" />
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
                v-for="box in paginatedBoxes"
                :key="box.id"
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
                            >
                                {{ box.nombre }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                ID: {{ box.id }}
                            </p>
                        </div>
                    </div>
                    <span
                        :class="
                            box.estado
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        "
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full"
                    >
                        {{ box.estado ? 'Activa' : 'Inactiva' }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <DollarSignIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatCurrency(box.saldo) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <FileTextIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ box.descripcion || 'Sin descripción' }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="showOperatingBoxById(box.id)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="viewBoxHistory(box)"
                        class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Ver historial"
                    >
                        <HistoryIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-if="box.estado"
                        @click="confirmDeactivate(box)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Desactivar"
                    >
                        <TrashIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-else
                        @click="confirmActivate(box)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Reactivar"
                    >
                        <RefreshCwIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-if="!box.estado"
                        @click="confirmDeletePermanent(box)"
                        class="p-2.5 sm:p-3 text-white bg-red-700 rounded-lg hover:bg-red-800 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Eliminar permanentemente"
                    >
                        <Trash2Icon class="w-4 h-4" />
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
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Anterior
            </button>
            <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 font-semibold text-black rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
        <!-- Empty State -->
        <div v-if="paginatedBoxes.length === 0" class="py-8 text-center sm:py-12">
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
                    No se encontraron cajas operativas
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros o crea una nueva.
                </p>
            </div>
        </div>
        <!-- Edit/Create Modal -->
        <div
            v-if="isEditModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-black sm:text-xl">
                            {{ posicion ? 'Editar' : 'Crear' }} Caja Operativa
                        </h2>
                        <button
                            @click="closeEditModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <div class="space-y-4 sm:space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <DollarSignIcon
                                    class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5"
                                />
                                Información de la Caja
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre *
                                    </label>
                                    <input
                                        v-model="form.nombre"
                                        type="text"
                                        @blur="convertToUpperCase('nombre')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Nombre de la caja"
                                    />
                                    <p v-if="formErrors.nombre" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.nombre }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Saldo Inicial
                                    </label>
                                    <input
                                        v-model="form.saldo"
                                        type="number"
                                        step="0.01"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="0.00"
                                    />
                                    <p v-if="formErrors.saldo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.saldo }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        v-model="form.descripcion"
                                        @blur="convertToUpperCase('descripcion')"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Descripción opcional"
                                    ></textarea>
                                    <p
                                        v-if="formErrors.descripcion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.descripcion }}
                                    </p>
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
                                :disabled="isLoading"
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
                                :disabled="isLoading"
                                @click="handleSaveBox"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isLoading">{{
                                    posicion ? 'Actualizando...' : 'Creando...'
                                }}</span>
                                <span v-else>{{ posicion ? 'Actualizar' : 'Crear' }} Caja</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- History Modal -->
        <div
            v-if="isHistoryModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Historial de Caja Operativa: {{ selectedBoxForHistory?.nombre }}
                        </h2>
                        <button
                            @click="closeHistoryModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <!-- Box Summary -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl sm:p-6"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <DollarSignIcon class="w-4 h-4 mr-2 text-purple-500 sm:w-5 sm:h-5" />
                            Resumen de la Caja
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                            <div>
                                <p
                                    class="text-xs font-medium transition-colors duration-200 sm:text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    Saldo Actual
                                </p>
                                <p
                                    class="text-lg font-bold transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{
                                        formatCurrency(boxHistory?.operating_box?.saldo_actual || 0)
                                    }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-xs font-medium transition-colors duration-200 sm:text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    Total Ingresos
                                </p>
                                <p
                                    class="text-lg font-bold text-green-500 transition-colors duration-200"
                                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                                >
                                    {{ formatCurrency(boxHistory?.resumen?.total_ingresos || 0) }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-xs font-medium transition-colors duration-200 sm:text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    Total Egresos
                                </p>
                                <p
                                    class="text-lg font-bold text-red-500 transition-colors duration-200"
                                    :class="isDarkMode ? 'text-red-400' : 'text-red-600'"
                                >
                                    {{ formatCurrency(boxHistory?.resumen?.total_egresos || 0) }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- History Table -->
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
                                <thead class="bg-gradient-to-r from-purple-400 to-indigo-500">
                                    <tr>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Fecha
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Tipo
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Monto
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Saldo Anterior
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Saldo Nuevo
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Descripción
                                        </th>
                                        <th
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                                        >
                                            Usuario
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="divide-y"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 divide-gray-700'
                                            : 'bg-white divide-gray-200'
                                    "
                                >
                                    <tr
                                        v-for="item in boxHistory?.historial || []"
                                        :key="item.id"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ formatDate(item.created_at) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="
                                                    item.tipo_movimiento === 'ingreso'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : item.tipo_movimiento === 'egreso'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ item.tipo_movimiento }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm font-medium"
                                                :class="
                                                    item.tipo_movimiento === 'ingreso'
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                "
                                            >
                                                {{ formatCurrency(item.monto) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ formatCurrency(item.saldo_anterior) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm font-medium"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ formatCurrency(item.saldo_nuevo) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ item.descripcion }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ item.user?.general_data?.nombre }}
                                                {{ item.user?.general_data?.apellido }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!boxHistory?.historial?.length">
                                        <td
                                            colspan="7"
                                            class="px-6 py-4 text-center"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            No se encontraron movimientos para esta caja operativa
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- History Pagination -->
                    <div
                        v-if="boxHistory?.pagination?.last_page > 1"
                        class="flex justify-center mt-4 space-x-2"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <button
                            @click="prevHistoryPage"
                            :disabled="boxHistory.pagination.current_page === 1"
                            class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span class="flex items-center">
                            Página {{ boxHistory.pagination.current_page }} de
                            {{ boxHistory.pagination.last_page }}
                        </span>
                        <button
                            @click="nextHistoryPage"
                            :disabled="
                                boxHistory.pagination.current_page ===
                                boxHistory.pagination.last_page
                            "
                            class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                    <!-- Modal Footer -->
                    <div
                        class="sticky bottom-0 flex justify-end pt-4 mt-6 transition-colors duration-200 border-t"
                        :class="
                            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        "
                    >
                        <button
                            @click="closeHistoryModal"
                            class="px-4 py-2 text-sm font-medium text-white transition-all duration-200 transform rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg touch-manipulation hover:scale-105"
                        >
                            Cerrar
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
import { operatingBoxHistories, payRefundTransaction } from '@/services/OperatingBoxHistoryService';
import { computed, onMounted, ref, watch } from 'vue';

const { formatCurrency } = useCurrency();

// Icons
import {
    DollarSignIcon,
    EditIcon,
    FileTextIcon,
    HistoryIcon,
    PlusIcon,
    RefreshCwIcon,
    SearchIcon,
    Trash2Icon,
    TrashIcon,
    XIcon,
} from 'lucide-vue-next';

// Services
import {
    activateOperatingBox,
    deactivateOperatingBox,
    deletePermanentOperatingBox,
    indexOperatingBoxes,
    showOperatingBox,
    storeOperatingBox,
    updateOperatingBox,
} from '@/services/OperatingBoxService';

// Initialize alert
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();

// State
const boxes = ref([]);
const isEditModalOpen = ref(false);
const isHistoryModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const perPage = ref(15);
const posicion = ref(null); // null = crear, ID = editar
const form = ref({
    id: null,
    nombre: '',
    saldo: 0,
    descripcion: '',
});
const formErrors = ref({});

// History state
const selectedBoxForHistory = ref(null);
const boxHistory = ref(null);
const historyFilters = ref({
    fecha_desde: '',
    fecha_hasta: '',
    tipo_movimiento: '',
    per_page: 15,
});
const historyCurrentPage = ref(1);

// Computed
const filteredBoxes = computed(() => {
    return boxes.value.filter(box => {
        const matchesSearch = box.nombre.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus =
            selectedStatus.value === '' || box.estado.toString() === selectedStatus.value;
        return matchesSearch && matchesStatus;
    });
});

const paginatedBoxes = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredBoxes.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredBoxes.value.length / perPage.value));

const totalSaldo = computed(() => {
    return filteredBoxes.value.reduce((sum, box) => sum + (parseFloat(box.saldo) || 0), 0);
});

// Methods
const listBoxes = async () => {
    try {
        showLoading();
        const { data } = await indexOperatingBoxes();
        boxes.value = data.data || [];
    } catch (error) {
        console.error('Error loading boxes:', error);
        showError('Error', 'No se pudieron cargar las cajas operativas.');
    } finally {
        closeLoading();
    }
};

const resetForm = () => {
    form.value = {
        id: null,
        nombre: '',
        saldo: 0,
        descripcion: '',
    };
    formErrors.value = {};
    posicion.value = null;
};

const openCreateModal = () => {
    resetForm();
    isEditModalOpen.value = true;
};

// Método para convertir un campo a mayúsculas
const convertToUpperCase = fieldName => {
    if (form.value[fieldName] && typeof form.value[fieldName] === 'string') {
        form.value[fieldName] = form.value[fieldName].toUpperCase();
    }
};

const showOperatingBoxById = async boxId => {
    try {
        showLoading();
        const { data } = await showOperatingBox(boxId);
        console.log(data);

        // Verificar que data.data exista
        if (!data.data) {
            throw new Error('No se encontraron datos de la caja');
        }

        form.value = {
            id: data.data.id,
            nombre: (data.data.nombre ?? '').toUpperCase(),
            descripcion: (data.data.descripcion ?? '').toUpperCase(),
            saldo: parseFloat(data.data.saldo) || 0,
        };
        posicion.value = boxId; // Marcar como edición
        isEditModalOpen.value = true;
    } catch (error) {
        console.error('Error al cargar caja:', error);
        showError('Error', 'No se pudo cargar la caja para edición.');
    } finally {
        closeLoading();
    }
};

const closeEditModal = () => {
    isEditModalOpen.value = false;
    resetForm();
};

const validateForm = () => {
    formErrors.value = {};
    let valid = true;
    if (!form.value.nombre?.trim()) {
        formErrors.value.nombre = 'El nombre es obligatorio.';
        valid = false;
    }
    if (form.value.saldo < 0) {
        formErrors.value.saldo = 'El saldo no puede ser negativo.';
        valid = false;
    }
    return valid;
};

const handleSaveBox = async () => {
    if (!validateForm()) return;

    // Convertir campos a mayúsculas antes de enviar
    const formData = {
        ...form.value,
        nombre: form.value.nombre ? form.value.nombre.toUpperCase() : '',
        descripcion: form.value.descripcion ? form.value.descripcion.toUpperCase() : '',
    };

    try {
        showLoading();
        isLoading.value = true;
        if (posicion.value) {
            await updateOperatingBox(posicion.value, formData);
            showSuccess('Éxito', 'Caja actualizada correctamente.');
        } else {
            await storeOperatingBox(formData);
            showSuccess('Éxito', 'Caja creada correctamente.');
        }
        await listBoxes();
        closeEditModal();
    } catch (error) {
        console.error('Error guardando caja:', error);
        formErrors.value = error.response?.data?.errors || {};
        showError('Error', `No se pudo ${posicion.value ? 'actualizar' : 'crear'} la caja.`);
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};

const confirmDeactivate = async box => {
    const confirmed = await showConfirm('Confirmar', `¿Desactivar la caja "${box.nombre}"?`);
    if (confirmed) {
        try {
            showLoading();
            await deactivateOperatingBox(box.id);
            showSuccess('Éxito', 'Caja desactivada correctamente.');
            await listBoxes();
        } catch (error) {
            showError('Error', 'No se pudo desactivar la caja.');
        } finally {
            closeLoading();
        }
    }
};

const confirmActivate = async box => {
    const confirmed = await showConfirm('Confirmar', `¿Reactivar la caja "${box.nombre}"?`);
    if (confirmed) {
        try {
            showLoading();
            await activateOperatingBox(box.id);
            showSuccess('Éxito', 'Caja reactivada correctamente.');
            await listBoxes();
        } catch (error) {
            showError('Error', 'No se pudo reactivar la caja.');
        } finally {
            closeLoading();
        }
    }
};

const confirmDeletePermanent = async box => {
    const confirmed = await showConfirm(
        'Confirmar eliminación permanente',
        `¿Está seguro de que desea eliminar permanentemente la caja "${box.nombre}"? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
        try {
            showLoading();
            await deletePermanentOperatingBox(box.id);
            showSuccess('Éxito', 'Caja eliminada permanentemente.');
            await listBoxes();
        } catch (error) {
            showError('Error', 'No se pudo eliminar la caja permanentemente.');
        } finally {
            closeLoading();
        }
    }
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};

// History methods
const viewBoxHistory = async box => {
    selectedBoxForHistory.value = box;
    historyCurrentPage.value = 1;
    await loadBoxHistory();
    isHistoryModalOpen.value = true;
};

const closeHistoryModal = () => {
    isHistoryModalOpen.value = false;
    selectedBoxForHistory.value = null;
    boxHistory.value = null;
    historyFilters.value = {
        fecha_desde: '',
        fecha_hasta: '',
        tipo_movimiento: '',
        per_page: 15,
    };
};

const loadBoxHistory = async () => {
    try {
        showLoading();
        const filters = {
            ...historyFilters.value,
            page: historyCurrentPage.value,
        };
        const { data } = await operatingBoxHistories(selectedBoxForHistory.value.id, filters);
        console.log(data);
        boxHistory.value = data.data;
    } catch (error) {
        console.error('Error loading box history:', error);
        showError('Error', 'No se pudo cargar el historial de la caja operativa.');
    } finally {
        closeLoading();
    }
};

const applyHistoryFilters = async () => {
    historyCurrentPage.value = 1;
    await loadBoxHistory();
};

const prevHistoryPage = async () => {
    if (boxHistory.value?.pagination?.current_page > 1) {
        historyCurrentPage.value--;
        await loadBoxHistory();
    }
};

const nextHistoryPage = async () => {
    if (boxHistory.value?.pagination?.current_page < boxHistory.value?.pagination?.last_page) {
        historyCurrentPage.value++;
        await loadBoxHistory();
    }
};

const payRefund = async item => {
    try {
        const confirmed = await showConfirm(
            'Confirmar pago',
            `¿Desea pagar el reembolso por ${formatCurrency(item.monto)}?`
        );
        if (!confirmed) return;

        showLoading();
        // Llamamos al nuevo endpoint payRefundTransaction con el ID del historial
        await payRefundTransaction(item.id);
        showSuccess('Éxito', 'Reembolso pagado correctamente.');
        // Recargar el historial
        await loadBoxHistory();
    } catch (error) {
        console.error('Error al pagar reembolso:', error);
        showError('Error', 'No se pudo procesar el pago del reembolso.');
    } finally {
        closeLoading();
    }
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
    await listBoxes();
});
</script>
