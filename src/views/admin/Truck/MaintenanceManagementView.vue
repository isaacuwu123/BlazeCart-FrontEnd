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
                        <WrenchIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Gestión de Mantenimientos de Vehículos
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los mantenimientos asociados a los vehículos
                        </p>
                    </div>
                </div>
                <button
                    @click="openMaintenanceModal()"
                    class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                    <FilePlusIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Nuevo Mantenimiento</span>
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
                        placeholder="Buscar por VIN, placa, marca, modelo o descripción..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedTipo"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los tipos</option>
                    <option value="cambio_aceite">Cambio de Aceite</option>
                    <option value="rotacion_neumaticos">Rotación de Neumáticos</option>
                    <option value="inspeccion_frenos">Inspección de Frenos</option>
                    <option value="alineacion">Alineación</option>
                    <option value="cambio_filtros">Cambio de Filtros</option>
                    <option value="inspeccion_general">Inspección General</option>
                    <option value="cambio_bateria">Cambio de Batería</option>
                    <option value="otros">Otros</option>
                </select>
                <select
                    v-model="selectedEstado"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                    <option value="atrasado">Atrasado</option>
                </select>
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
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Vehículo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Tipo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Fecha Programada
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Kilometraje
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Estado
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
                            v-for="maintenance in paginatedMaintenances"
                            :key="maintenance.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                            :class="{
                                'bg-red-100 dark:bg-red-900': maintenance.estado === 'atrasado',
                            }"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <div
                                            class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                        >
                                            <CarIcon class="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                        >
                                            {{
                                                maintenance.vehicle
                                                    ? `${maintenance.vehicle.marca} ${maintenance.vehicle.modelo}`
                                                    : 'N/A'
                                            }}
                                        </div>
                                        <div
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                        >
                                            {{ maintenance.vehicle?.numero_placa || 'N/A' }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ getMaintenanceTypeText(maintenance.tipo) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ formatDate(maintenance.fecha_programada) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ maintenance.kilometraje_programado }}
                                    <span v-if="maintenance.kilometraje_real">
                                        (Real: {{ maintenance.kilometraje_real }})</span
                                    >
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="{
                                        'text-yellow-600': maintenance.estado === 'pendiente',
                                        'text-green-600': maintenance.estado === 'completado',
                                        'text-red-600': maintenance.estado === 'atrasado',
                                    }"
                                >
                                    {{ getEstadoText(maintenance.estado) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="downloadMaintenance(maintenance.id)"
                                        v-if="maintenance.rutaArchivoCompleta"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                        title="Descargar"
                                    >
                                        <DownloadIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openMaintenanceModal(maintenance)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="confirmDelete(maintenance)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
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
                v-for="maintenance in paginatedMaintenances"
                :key="maintenance.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12"
                        >
                            <CarIcon
                                class="w-5 h-5 text-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{
                                    maintenance.vehicle
                                        ? `${maintenance.vehicle.marca} ${maintenance.vehicle.modelo}`
                                        : 'N/A'
                                }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                {{ maintenance.vehicle?.numero_placa || 'N/A' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <WrenchIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ getMaintenanceTypeText(maintenance.tipo) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatDate(maintenance.fecha_programada) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <GaugeIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">
                            {{ maintenance.kilometraje_programado }}
                            <span v-if="maintenance.kilometraje_real">
                                (Real: {{ maintenance.kilometraje_real }})</span
                            >
                        </span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <AlertCircleIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ getEstadoText(maintenance.estado) }}</span>
                    </div>
                    <div
                        v-if="maintenance.observaciones"
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <FileIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ maintenance.observaciones }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        v-if="maintenance.rutaArchivoCompleta"
                        @click="downloadMaintenance(maintenance.id)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        title="Descargar"
                    >
                        <DownloadIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openMaintenanceModal(maintenance)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="confirmDelete(maintenance)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105 focus:ring-2 focus:ring-red-400 focus:outline-none"
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
                :disabled="currentPage === 1"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
                Anterior
            </button>
            <span class="flex items-center"> Página {{ currentPage }} de {{ totalPages }} </span>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
                Siguiente
            </button>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedMaintenances.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <WrenchIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron mantenimientos
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>

        <!-- Maintenance Modal (Create/Edit) -->
        <div
            v-if="isMaintenanceModalOpen"
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
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            {{ posicion ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento' }}
                        </h2>
                        <button
                            @click="closeMaintenanceModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveMaintenance" class="space-y-4 sm:space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <WrenchIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información del Mantenimiento
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-vehicle"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vehículo *
                                    </label>
                                    <select
                                        id="modal-vehicle"
                                        v-model="formData.vehicle_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar vehículo</option>
                                        <option
                                            v-for="vehicle in vehicles"
                                            :key="vehicle.id"
                                            :value="vehicle.id"
                                        >
                                            {{ vehicle.codigo_unico }}{{ vehicle.marca }}
                                            {{ vehicle.modelo }} ({{ vehicle.numero_placa }})
                                        </option>
                                    </select>
                                    <p
                                        v-if="formErrors.vehicle_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.vehicle_id }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-tipo"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Mantenimiento *
                                    </label>
                                    <select
                                        id="modal-tipo"
                                        v-model="formData.tipo"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        <option value="cambio_aceite">Cambio de Aceite</option>
                                        <option value="rotacion_neumaticos">
                                            Rotación de Neumáticos
                                        </option>
                                        <option value="inspeccion_frenos">
                                            Inspección de Frenos
                                        </option>
                                        <option value="alineacion">Alineación</option>
                                        <option value="cambio_filtros">Cambio de Filtros</option>
                                        <option value="inspeccion_general">
                                            Inspección General
                                        </option>
                                        <option value="cambio_bateria">Cambio de Batería</option>
                                        <option value="otros">Otros</option>
                                    </select>
                                    <p v-if="formErrors.tipo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.tipo }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-descripcion"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Descripción
                                    </label>
                                    <input
                                        id="modal-descripcion"
                                        v-model="formData.descripcion"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="Cambio de aceite sintético"
                                    />
                                    <p
                                        v-if="formErrors.descripcion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.descripcion }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-fecha-programada"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha Programada *
                                    </label>
                                    <input
                                        id="modal-fecha-programada"
                                        v-model="formData.fecha_programada"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.fecha_programada"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.fecha_programada }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-kilometraje-programado"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Kilometraje Programado *
                                    </label>
                                    <input
                                        id="modal-kilometraje-programado"
                                        v-model="formData.kilometraje_programado"
                                        type="number"
                                        min="0"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="15000"
                                    />
                                    <p
                                        v-if="formErrors.kilometraje_programado"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.kilometraje_programado }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-kilometraje-real"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Kilometraje Real
                                    </label>
                                    <input
                                        id="modal-kilometraje-real"
                                        v-model="formData.kilometraje_real"
                                        type="number"
                                        min="0"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="15010"
                                    />
                                    <p
                                        v-if="formErrors.kilometraje_real"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.kilometraje_real }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-costo"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Costo
                                    </label>
                                    <input
                                        id="modal-costo"
                                        v-model="formData.costo"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="75.50"
                                    />
                                    <p v-if="formErrors.costo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.costo }}
                                    </p>
                                </div>

                                <div>
                                    <label
                                        for="modal-estado"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado *
                                    </label>
                                    <select
                                        id="modal-estado"
                                        v-model="formData.estado"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="completado">Completado</option>
                                        <option value="atrasado">Atrasado</option>
                                    </select>
                                    <p v-if="formErrors.estado" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.estado }}
                                    </p>
                                </div>

                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-archivo"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Archivo
                                    </label>
                                    <input
                                        id="modal-archivo"
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        @change="handleFileUpload"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <p v-if="formErrors.archivo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.archivo }}
                                    </p>
                                    <div v-if="filePreview" class="mt-2">
                                        <img
                                            v-if="isImage(formData.archivo)"
                                            :src="filePreview"
                                            class="object-cover w-24 h-24 rounded-lg"
                                            alt="File Preview"
                                        />
                                        <p
                                            v-else
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                        >
                                            {{ formData.archivo?.name || 'Archivo seleccionado' }}
                                        </p>
                                    </div>
                                </div>

                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-observaciones"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        id="modal-observaciones"
                                        v-model="formData.observaciones"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="Notas sobre el mantenimiento"
                                    ></textarea>
                                    <p
                                        v-if="formErrors.observaciones"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.observaciones }}
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
                                @click="closeMaintenanceModal"
                                :disabled="isLoading"
                                class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation focus:ring-2 focus:ring-gray-400 focus:outline-none"
                                :class="
                                    isDarkMode
                                        ? 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
                                        : 'border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200'
                                "
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                :disabled="isLoading"
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base touch-manipulation focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                            >
                                <span v-if="isLoading">Guardando...</span>
                                <span v-else
                                    >{{ posicion ? 'Actualizar' : 'Crear' }} Mantenimiento</span
                                >
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Overdue Alert -->
        <div
            v-if="overdueMaintenances.length"
            class="p-4 mt-4 transition-colors duration-200 border-l-4 border-red-500 shadow-lg rounded-xl sm:p-5"
            :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
        >
            <h3
                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
            >
                <AlertCircleIcon class="w-4 h-4 mr-2 text-red-500 sm:w-5 sm:h-5" />
                Mantenimientos Atrasados
            </h3>
            <ul class="space-y-2">
                <li
                    v-for="maintenance in overdueMaintenances"
                    :key="maintenance.id"
                    class="text-sm"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    {{
                        maintenance.vehicle
                            ? `${maintenance.vehicle.marca} ${maintenance.vehicle.modelo} (${maintenance.vehicle.numero_placa})`
                            : 'N/A'
                    }}
                    - {{ getMaintenanceTypeText(maintenance.tipo) }} (Vencido:
                    {{ formatDate(maintenance.fecha_programada) }})
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { isDarkMode } from '@/composables/useDarkMode';
import {
    createVehicleMaintenance,
    deleteVehicleMaintenance,
    downloadMaintenanceDocument,
    getActiveMaintenances,
    updateVehicleMaintenance,
} from '@/services/VehicleMaintenanceService';
import { indexVehiclesActives } from '@/services/VehicleService';
import {
    AlertCircleIcon,
    CalendarIcon,
    CarIcon,
    DownloadIcon,
    EditIcon,
    FileIcon,
    FilePlusIcon,
    GaugeIcon,
    SearchIcon,
    TrashIcon,
    WrenchIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Initialize useAlert
const { showSuccess, showError, showValidationErrors, showConfirm, showLoading, closeLoading } =
    useAlert();

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB to match backend
const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// State
const maintenances = ref([]);
const vehicles = ref([]);
const isMaintenanceModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedTipo = ref('');
const selectedEstado = ref('');
const posicion = ref(null);
const formData = ref({
    vehicle_id: '',
    tipo: 'cambio_aceite',
    descripcion: '',
    fecha_programada: '',
    kilometraje_programado: '',
    kilometraje_real: '',
    costo: '',
    estado: 'pendiente',
    archivo: null,
    observaciones: '',
});
const formErrors = ref({});
const filePreview = ref(null);
const currentPage = ref(1);
const perPage = ref(15);
const totalPages = ref(1);

// Computed
const filteredMaintenances = computed(() => {
    let filtered = maintenances.value;
    if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            maintenance =>
                (maintenance.descripcion || '').toLowerCase().includes(search) ||
                (maintenance.vehicle?.numero_vin || '').toLowerCase().includes(search) ||
                (maintenance.vehicle?.numero_placa || '').toLowerCase().includes(search) ||
                (maintenance.vehicle?.marca || '').toLowerCase().includes(search) ||
                (maintenance.vehicle?.modelo || '').toLowerCase().includes(search)
        );
    }
    if (selectedTipo.value) {
        filtered = filtered.filter(maintenance => maintenance.tipo === selectedTipo.value);
    }
    if (selectedEstado.value) {
        filtered = filtered.filter(maintenance => maintenance.estado === selectedEstado.value);
    }
    return filtered;
});

const paginatedMaintenances = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredMaintenances.value.slice(start, end);
});

const overdueMaintenances = computed(() => {
    return maintenances.value.filter(m => m.estado === 'atrasado');
});

// Methods
const listMaintenances = async () => {
    try {
        showLoading();
        const params = {
            search: searchQuery.value || undefined,
            tipo: selectedTipo.value || undefined,
            estado: selectedEstado.value || undefined,
        };
        const { data } = await getActiveMaintenances(params);
        maintenances.value = data.datos;
        totalPages.value = Math.ceil(maintenances.value.length / perPage.value);
    } catch (error) {
        console.error('Error listing maintenances:', error);
        showError('Error', 'No se pudo cargar la lista de mantenimientos.');
    } finally {
        closeLoading();
    }
};

const listVehicles = async () => {
    try {
        const { data } = await indexVehiclesActives();
        vehicles.value = data.data;
    } catch (error) {
        console.error('Error listing vehicles:', error);
        showError('Error', 'No se pudo cargar la lista de vehículos.');
    }
};

const resetForm = () => {
    formData.value = {
        vehicle_id: '',
        tipo: 'cambio_aceite',
        descripcion: '',
        fecha_programada: '',
        kilometraje_programado: '',
        kilometraje_real: '',
        costo: '',
        estado: 'pendiente',
        archivo: null,
        observaciones: '',
    };
    formErrors.value = {};
    filePreview.value = null;
};

const handleFileUpload = event => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            formErrors.value.archivo = `El archivo no debe superar los ${
                MAX_FILE_SIZE / (1024 * 1024)
            }MB.`;
            formData.value.archivo = null;
            filePreview.value = null;
            fileInput.value = '';
            return;
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            formErrors.value.archivo = 'Formato no válido. Use JPEG, PNG, PDF, DOC o DOCX.';
            formData.value.archivo = null;
            filePreview.value = null;
            fileInput.value = '';
            return;
        }
        formData.value.archivo = file;
        if (isImage(file)) {
            filePreview.value = URL.createObjectURL(file);
        } else {
            filePreview.value = file.name;
        }
        formErrors.value.archivo = '';
    } else {
        formData.value.archivo = null;
        filePreview.value = null;
        formErrors.value.archivo = '';
        fileInput.value = '';
    }
};

const isImage = file => {
    if (typeof file === 'string') {
        return /\.(jpg|jpeg|png)$/i.test(file);
    }
    return file && /\.(jpg|jpeg|png)$/i.test(file.name);
};

const openMaintenanceModal = (maintenance = null) => {
    resetForm();
    if (maintenance) {
        formData.value = {
            vehicle_id: maintenance.vehicle_id || '',
            tipo: maintenance.tipo || 'cambio_aceite',
            descripcion: maintenance.descripcion || '',
            fecha_programada: maintenance.fecha_programada
                ? maintenance.fecha_programada.split('T')[0]
                : '',
            kilometraje_programado: maintenance.kilometraje_programado || '',
            kilometraje_real: maintenance.kilometraje_real || '',
            costo: maintenance.costo || '',
            estado: maintenance.estado || 'pendiente',
            archivo: null,
            observaciones: maintenance.observaciones || '',
        };
        filePreview.value = maintenance.rutaArchivoCompleta
            ? maintenance.rutaArchivoCompleta
            : null;
        posicion.value = maintenance.id;
    } else {
        posicion.value = null;
    }
    isMaintenanceModalOpen.value = true;
};

const closeMaintenanceModal = () => {
    isMaintenanceModalOpen.value = false;
    resetForm();
};

const validateFormData = () => {
    formErrors.value = {};
    let isValid = true;
    if (!formData.value.vehicle_id) {
        formErrors.value.vehicle_id = 'Debe seleccionar un vehículo.';
        isValid = false;
    }
    if (!formData.value.tipo) {
        formErrors.value.tipo = 'El tipo de mantenimiento es obligatorio.';
        isValid = false;
    }
    if (!formData.value.fecha_programada) {
        formErrors.value.fecha_programada = 'La fecha programada es obligatoria.';
        isValid = false;
    }
    if (!formData.value.kilometraje_programado) {
        formErrors.value.kilometraje_programado = 'El kilometraje programado es obligatorio.';
        isValid = false;
    }
    if (!formData.value.estado) {
        formErrors.value.estado = 'El estado es obligatorio.';
        isValid = false;
    }
    return isValid;
};

const handleSaveMaintenance = async () => {
    try {
        showLoading();
        isLoading.value = true;
        if (!validateFormData()) {
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
            return;
        }
        const data = new FormData();
        try {
            data.append('vehicle_id', formData.value.vehicle_id || '');
            data.append('tipo', formData.value.tipo || '');
            data.append('descripcion', formData.value.descripcion || '');
            data.append('fecha_programada', formData.value.fecha_programada || '');
            data.append('kilometraje_programado', formData.value.kilometraje_programado || '');
            data.append('kilometraje_real', formData.value.kilometraje_real || '');
            data.append('costo', formData.value.costo || '');
            data.append('estado', formData.value.estado || '');
            if (formData.value.archivo) {
                data.append('archivo', formData.value.archivo);
            }
            data.append('observaciones', formData.value.observaciones || '');
            if (posicion.value) {
                data.append('_method', 'PUT');
            }
        } catch (error) {
            console.error('Error constructing FormData:', error);
            showError('Error', 'Error al preparar los datos del formulario.');
            return;
        }
        if (posicion.value) {
            await updateVehicleMaintenance(posicion.value, data);
        } else {
            await createVehicleMaintenance(data);
        }
        showSuccess(
            'Éxito',
            posicion.value
                ? 'Mantenimiento actualizado correctamente.'
                : 'Mantenimiento creado correctamente.'
        );
        await listMaintenances();
        closeMaintenanceModal();
    } catch (error) {
        console.error('Error saving maintenance:', error);
        if (error.response?.data?.errors) {
            formErrors.value = error.response.data.errors;
            showValidationErrors('Error de Validación', error.response.data.errors);
        } else {
            showError(
                'Error',
                error.response?.data?.message || 'No se pudo guardar el mantenimiento.'
            );
        }
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};

const confirmDelete = async maintenance => {
    const confirmed = await showConfirm(
        'Confirmar Eliminación',
        `¿Estás seguro de que deseas eliminar el mantenimiento para "${
            maintenance.vehicle
                ? maintenance.vehicle.marca + ' ' + maintenance.vehicle.modelo
                : 'N/A'
        }"?`
    );
    if (confirmed) {
        try {
            showLoading();
            await deleteVehicleMaintenance(maintenance.id);
            showSuccess('Éxito', 'Mantenimiento eliminado correctamente.');
            await listMaintenances();
        } catch (error) {
            console.error('Error deleting maintenance:', error);
            showError(
                'Error',
                error.response?.data?.message || 'No se pudo eliminar el mantenimiento.'
            );
        } finally {
            closeLoading();
        }
    }
};

const downloadMaintenance = async maintenanceId => {
    try {
        const response = await downloadMaintenanceDocument(maintenanceId);
        const blob = new Blob([response.data]);
        let fileName = `maintenance_${maintenanceId}`;
        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
            const matches = contentDisposition.match(/filename="([^"]+)"/);
            if (matches && matches[1]) {
                fileName = decodeURIComponent(matches[1]);
            }
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading maintenance document:', error);
        showError('Error', 'No se pudo descargar el documento.');
    }
};

const getMaintenanceTypeText = tipo => {
    const types = {
        cambio_aceite: 'Cambio de Aceite',
        rotacion_neumaticos: 'Rotación de Neumáticos',
        inspeccion_frenos: 'Inspección de Frenos',
        alineacion: 'Alineación',
        cambio_filtros: 'Cambio de Filtros',
        inspeccion_general: 'Inspección General',
        cambio_bateria: 'Cambio de Batería',
        otros: 'Otros',
    };
    return types[tipo] || 'Desconocido';
};

const getEstadoText = estado => {
    const estados = {
        pendiente: 'Pendiente',
        completado: 'Completado',
        atrasado: 'Atrasado',
    };
    return estados[estado] || 'Desconocido';
};

const formatDate = date => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

// Watchers
watch([searchQuery, selectedTipo, selectedEstado], () => {
    currentPage.value = 1;
    listMaintenances();
});

// Lifecycle Hooks
onMounted(async () => {
    await listMaintenances();
    await listVehicles();
});

// Auto-fill kilometraje_programado for oil changes
watch(
    () => formData.value.vehicle_id,
    newVehicleId => {
        if (formData.value.tipo === 'cambio_aceite' && !posicion.value) {
            const vehicle = vehicles.value.find(v => v.id == newVehicleId);
            if (vehicle) {
                formData.value.kilometraje_programado = vehicle.millaje + 10000;
                formData.value.fecha_programada = new Date(
                    Date.now() + 6 * 30 * 24 * 60 * 60 * 1000
                )
                    .toISOString()
                    .split('T')[0];
            }
        }
    }
);
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #fbbf24;
    border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #f59e0b;
}
@media (max-width: 640px) {
    .touch-manipulation {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }
}
</style>
