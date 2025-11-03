<template>
    <div
        class="min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50'
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
                        <CarIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Gestión de Vehículos
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los vehículos del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="openVehicleModal()"
                    class="flex items-center justify-center px-4 py-2.5 font-medium text-white transition-all duration-200 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg hover:from-yellow-600 hover:to-orange-700 shadow-md hover:shadow-lg touch-manipulation transform hover:scale-105"
                >
                    <PlusIcon class="w-4 h-4 mr-2" />
                    Nuevo Vehículo
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
                        placeholder="Buscar vehículos (VIN, marca, placa...)"
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedVehicleStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="en_venta">En Venta</option>
                    <option value="vendido">Vendido</option>
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
                    Total Vehículos
                </h3>
                <p class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                    {{ filteredVehicles.length }}
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
                    En Operación
                </h3>
                <p
                    class="text-xl font-bold text-green-500"
                    :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                >
                    {{ filteredVehicles.filter(v => v.estado === 'activo').length }}
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
                    Millaje Total
                </h3>
                <p
                    class="text-xl font-bold"
                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                >
                    {{
                        formatNumber(
                            filteredVehicles.reduce((sum, v) => sum + (parseInt(v.millaje) || 0), 0)
                        )
                    }}
                    mi
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
                                Vehículo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Propietario
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Placa
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
                            v-for="vehicle in paginatedVehicles"
                            :key="vehicle.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <img
                                            v-if="vehicle.foto"
                                            :src="vehicle.foto"
                                            class="object-cover w-10 h-10 rounded-full"
                                            alt="Foto del vehículo"
                                        />
                                        <div
                                            v-else
                                            class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                        >
                                            <CarIcon class="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div class="ml-3">
                                        <div
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                        >
                                            {{ vehicle.codigo_unico || 'N/A' }}
                                            {{ vehicle.marca || 'N/A' }} {{ vehicle.modelo || '' }}
                                        </div>
                                        <div
                                            class="text-xs"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                        >
                                            Año: {{ vehicle.año || 'N/A' }}
                                        </div>
                                        <div
                                            v-if="vehicle.codigo_unico"
                                            class="text-xs font-medium"
                                            :class="
                                                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                                            "
                                        >
                                            Código: {{ vehicle.codigo_unico }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{
                                        vehicle.user?.general_data?.nombre ||
                                        vehicle.user?.name ||
                                        'N/A'
                                    }}
                                </div>
                                <div
                                    class="text-xs"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    {{ vehicle.user?.email || 'Sin correo' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ vehicle.numero_placa || 'N/A' }}
                                </div>
                                <div
                                    class="text-xs"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    Registro: {{ formatDate(vehicle.vencimiento_registro) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="getStatusClass(vehicle.estado)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    <CheckCircle2Icon
                                        v-if="vehicle.estado === 'activo'"
                                        class="w-4 h-4 mr-1"
                                    />
                                    <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                    {{ getStatusText(vehicle.estado) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="openVehicleModal(vehicle)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="toggleVehicleStatus(vehicle)"
                                        :class="
                                            vehicle.estado === 'activo'
                                                ? 'bg-red-500 hover:bg-red-600'
                                                : 'bg-green-500 hover:bg-green-600'
                                        "
                                        class="p-2 text-white transition-colors duration-200 rounded-lg"
                                        :title="
                                            vehicle.estado === 'activo' ? 'Desactivar' : 'Activar'
                                        "
                                    >
                                        <PowerIcon
                                            v-if="vehicle.estado === 'activo'"
                                            class="w-4 h-4"
                                        />
                                        <ZapIcon v-else class="w-4 h-4" />
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
                v-for="vehicle in paginatedVehicles"
                :key="vehicle.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12"
                        >
                            <img
                                v-if="vehicle.foto"
                                :src="vehicle.foto"
                                class="object-cover w-10 h-10 rounded-full sm:w-12 sm:h-12"
                                alt="Vehicle Photo"
                            />
                            <CarIcon
                                v-else
                                class="w-5 h-5 text-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ vehicle.marca || 'N/A' }} {{ vehicle.modelo || '' }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                Año: {{ vehicle.año || 'N/A' }} | Placa:
                                {{ vehicle.numero_placa || 'N/A' }}
                                <span
                                    v-if="vehicle.codigo_unico"
                                    class="font-medium"
                                    :class="isDarkMode ? 'text-yellow-400' : 'text-yellow-600'"
                                >
                                    | Código: {{ vehicle.codigo_unico }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <span
                        :class="getStatusClass(vehicle.estado)"
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
                    >
                        {{ getStatusText(vehicle.estado) }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <UserIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">
                            {{ vehicle.user?.general_data?.nombre || 'Sin propietario' }}
                        </span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <MailIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ vehicle.user?.email || 'N/A' }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >Inspección: {{ formatDate(vehicle.vencimiento_inspeccion) }}</span
                        >
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="openVehicleModal(vehicle)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="toggleVehicleStatus(vehicle)"
                        :class="
                            vehicle.estado === 'activo'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-green-500 hover:bg-green-600'
                        "
                        class="p-2.5 sm:p-3 text-white rounded-lg transition-all duration-200 touch-manipulation transform hover:scale-105"
                        :title="vehicle.estado === 'activo' ? 'Desactivar' : 'Activar'"
                    >
                        <PowerIcon v-if="vehicle.estado === 'activo'" class="w-4 h-4" />
                        <ZapIcon v-else class="w-4 h-4" />
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
        <div v-if="paginatedVehicles.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <CarIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron vehículos
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros o crea uno nuevo.
                </p>
            </div>
        </div>
        <!-- Vehicle Modal (Create/Edit) -->
        <div
            v-if="isVehicleModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-black sm:text-xl">
                            {{ posicion ? 'Editar' : 'Crear' }} Vehículo
                        </h2>
                        <button
                            @click="closeVehicleModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveVehicle" class="space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <CarIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información Básica del Vehículo
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Propietario
                                    </label>
                                    <select
                                        v-model="formData.user_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione un usuario</option>
                                        <option
                                            v-for="user in users"
                                            :key="user.id"
                                            :value="user.id"
                                        >
                                            {{ user.general_data.nombre }}
                                            {{ user.general_data.apellido }}
                                        </option>
                                    </select>
                                    <p v-if="formErrors.user_id" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.user_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Negocio
                                    </label>
                                    <select
                                        v-model="formData.negocio_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
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
                                        v-if="formErrors.negocio_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.negocio_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número VIN *
                                    </label>
                                    <input
                                        v-model="formData.numero_vin"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="1HGBH41JXMN109186"
                                    />
                                    <p
                                        v-if="formErrors.numero_vin"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.numero_vin }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Código Único
                                    </label>
                                    <input
                                        v-model="formData.codigo_unico"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Código único del vehículo"
                                    />
                                    <p
                                        v-if="formErrors.codigo_unico"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.codigo_unico }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Marca *
                                    </label>
                                    <input
                                        v-model="formData.marca"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Toyota"
                                    />
                                    <p v-if="formErrors.marca" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.marca }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Modelo *
                                    </label>
                                    <input
                                        v-model="formData.modelo"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Tacoma"
                                    />
                                    <p v-if="formErrors.modelo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.modelo }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Año
                                    </label>
                                    <input
                                        v-model="formData.año"
                                        type="number"
                                        :min="1900"
                                        :max="new Date().getFullYear() + 1"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="2020"
                                    />
                                    <p v-if="formErrors.año" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.año }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número de Placa *
                                    </label>
                                    <input
                                        v-model="formData.numero_placa"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="ABC123"
                                    />
                                    <p
                                        v-if="formErrors.numero_placa"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.numero_placa }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número DOT
                                    </label>
                                    <input
                                        v-model="formData.numero_dot"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="DOT12345"
                                    />
                                    <p
                                        v-if="formErrors.numero_dot"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.numero_dot }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Vehículo
                                    </label>
                                    <select
                                        v-model="formData.tipo_vehiculo"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="truck">Truck</option>
                                        <option value="trailer">Trailer</option>
                                        <option value="semi">Semi</option>
                                        <option value="box_truck">Box Truck</option>
                                    </select>
                                    <p
                                        v-if="formErrors.tipo_vehiculo"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.tipo_vehiculo }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Propiedad
                                    </label>
                                    <select
                                        v-model="formData.tipo_propiedad"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="owned">Propio</option>
                                        <option value="leased">Arrendado</option>
                                        <option value="lease_on">Lease On</option>
                                        <option value="flip_candidate">Candidato a venta</option>
                                    </select>
                                    <p
                                        v-if="formErrors.tipo_propiedad"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.tipo_propiedad }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Combustible
                                    </label>
                                    <select
                                        v-model="formData.combustible"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="diesel">Diésel</option>
                                        <option value="gasolina">Gasolina</option>
                                        <option value="hibrido">Híbrido</option>
                                        <option value="electrico">Eléctrico</option>
                                    </select>
                                    <p
                                        v-if="formErrors.combustible"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.combustible }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Transmisión
                                    </label>
                                    <select
                                        v-model="formData.transmision"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatica">Automática</option>
                                    </select>
                                    <p
                                        v-if="formErrors.transmision"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.transmision }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado
                                    </label>
                                    <select
                                        v-model="formData.estado"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="mantenimiento">Mantenimiento</option>
                                        <option value="inactivo">Inactivo</option>
                                        <option value="en_venta">En Venta</option>
                                        <option value="vendido">Vendido</option>
                                    </select>
                                    <p v-if="formErrors.estado" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.estado }}
                                    </p>
                                </div>
                            </div>
                        </div>
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
                                Datos Financieros
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Precio de Compra
                                    </label>
                                    <input
                                        v-model="formData.precio_compra"
                                        type="number"
                                        step="0.01"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="15000.00"
                                    />
                                    <p
                                        v-if="formErrors.precio_compra"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.precio_compra }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha de Compra
                                    </label>
                                    <input
                                        v-model="formData.fecha_compra"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.fecha_compra"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.fecha_compra }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Valor Actual
                                    </label>
                                    <input
                                        v-model="formData.valor_actual"
                                        type="number"
                                        step="0.01"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="12000.00"
                                    />
                                    <p
                                        v-if="formErrors.valor_actual"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.valor_actual }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Millaje *
                                    </label>
                                    <input
                                        v-model="formData.millaje"
                                        type="number"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="50000"
                                    />
                                    <p v-if="formErrors.millaje" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.millaje }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vencimiento Registro
                                    </label>
                                    <input
                                        v-model="formData.vencimiento_registro"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.vencimiento_registro"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.vencimiento_registro }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vencimiento Inspección
                                    </label>
                                    <input
                                        v-model="formData.vencimiento_inspeccion"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.vencimiento_inspeccion"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.vencimiento_inspeccion }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información Adicional
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Color
                                    </label>
                                    <input
                                        v-model="formData.color"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Rojo"
                                    />
                                    <p v-if="formErrors.color" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.color }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Capacidad de Carga (lbs)
                                    </label>
                                    <input
                                        v-model="formData.capacidad_carga"
                                        type="number"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="5000"
                                    />
                                    <p
                                        v-if="formErrors.capacidad_carga"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.capacidad_carga }}
                                    </p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        v-model="formData.observaciones"
                                        rows="3"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Detalles adicionales sobre el vehículo..."
                                    ></textarea>
                                    <p
                                        v-if="formErrors.observaciones"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.observaciones }}
                                    </p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Foto del Vehículo
                                    </label>
                                    <input
                                        id="modal-foto"
                                        type="file"
                                        accept="image/*"
                                        @change="handlePhotoUpload"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <p v-if="formErrors.foto" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.foto }}
                                    </p>
                                    <div v-if="photoPreview" class="mt-2">
                                        <img
                                            :src="photoPreview"
                                            alt="Vista previa"
                                            class="object-cover w-32 h-32 rounded-lg"
                                        />
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
                                @click="closeVehicleModal"
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
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isLoading">{{
                                    posicion ? 'Actualizando...' : 'Creando...'
                                }}</span>
                                <span v-else>{{ posicion ? 'Actualizar' : 'Crear' }} Vehículo</span>
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
/* import { indexBusinesses } from '@/services/BusinessService'; */
import { usersActives } from '@/services/UserService';
import {
    activateVehicle,
    deactivateVehicle,
    destroyVehicle,
    /*     deleteVehicle, */
    indexVehicles,
    showVehicle,
    storeVehicle,
    updateVehicle,
} from '@/services/VehicleService';
import {
    CalendarIcon,
    CarIcon,
    CheckCircle2Icon,
    DollarSignIcon,
    EditIcon,
    FileTextIcon,
    MailIcon,
    PlusIcon,
    PowerIcon,
    SearchIcon,
    UserIcon,
    XCircleIcon,
    XIcon,
    ZapIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
// Initialize alert
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();
// Constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
// State
const vehicles = ref([]);
const users = ref([]);
const businesses = ref([]);
const isVehicleModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedVehicleStatus = ref('');
const posicion = ref(null);
const formData = ref({
    user_id: '',
    negocio_id: '',
    numero_vin: '',
    codigo_unico: '',
    marca: '',
    modelo: '',
    año: '',
    numero_placa: '',
    numero_dot: '',
    tipo_vehiculo: '',
    tipo_propiedad: '',
    precio_compra: '',
    fecha_compra: '',
    valor_actual: '',
    millaje: '',
    vencimiento_registro: '',
    vencimiento_inspeccion: '',
    color: '',
    combustible: '',
    transmision: '',
    capacidad_carga: '',
    observaciones: '',
    estado: 'activo',
    foto: null,
});
const formErrors = ref({});
const photoPreview = ref(null);
const currentPage = ref(1);
const perPage = ref(15);
const totalPages = ref(1);
// Computed
const filteredVehicles = computed(() => {
    let filtered = vehicles.value;
    if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            vehicle =>
                (vehicle.numero_vin || '').toLowerCase().includes(search) ||
                (vehicle.codigo_unico || '').toLowerCase().includes(search) ||
                (vehicle.marca || '').toLowerCase().includes(search) ||
                (vehicle.modelo || '').toLowerCase().includes(search) ||
                (vehicle.numero_placa || '').toLowerCase().includes(search) ||
                (vehicle.user?.general_data?.nombre || '').toLowerCase().includes(search) ||
                (vehicle.user?.general_data?.apellido || '').toLowerCase().includes(search)
        );
    }
    if (selectedVehicleStatus.value) {
        filtered = filtered.filter(
            vehicle => (vehicle.estado || '').toLowerCase() === selectedVehicleStatus.value
        );
    }
    return filtered;
});
const paginatedVehicles = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    totalPages.value = Math.ceil(filteredVehicles.value.length / perPage.value);
    return filteredVehicles.value.slice(start, end);
});
// Methods
const listVehicles = async () => {
    try {
        showLoading();
        const { data } = await indexVehicles();
        vehicles.value = data.datos || [];
    } catch (error) {
        console.error('Error listing vehicles:', error);
        showError('Error', 'No se pudo cargar la lista de vehículos.');
    } finally {
        closeLoading();
    }
};
const listUsers = async () => {
    try {
        const { data } = await usersActives();
        console.log(data);
        users.value = data.data || [];
    } catch (error) {
        console.error('Error listing users:', error);
        showError('Error', 'No se pudo cargar la lista de usuarios.');
    }
};
const listBusinesses = async () => {
    try {
        const { data } = await businessesActives();
        console.log(data);
        businesses.value = data.datos || [];
    } catch (error) {
        console.error('Error listing businesses:', error);
        showError('Error', 'No se pudo cargar la lista de negocios.');
    }
};
const showVehicleById = async vehicleId => {
    try {
        showLoading();
        const { data } = await showVehicle(vehicleId);
        console.log(data);
        const vehicle = data.datos;
        formData.value = {
            user_id: vehicle.user_id || '',
            negocio_id: vehicle.negocio_id || '',
            numero_vin: vehicle.numero_vin || '',
            codigo_unico: vehicle.codigo_unico || '',
            marca: vehicle.marca || '',
            modelo: vehicle.modelo || '',
            año: vehicle.año || '',
            numero_placa: vehicle.numero_placa || '',
            numero_dot: vehicle.numero_dot || '',
            tipo_vehiculo: vehicle.tipo_vehiculo || '',
            tipo_propiedad: vehicle.tipo_propiedad || '',
            precio_compra: vehicle.precio_compra || '',
            fecha_compra: vehicle.fecha_compra ? vehicle.fecha_compra.split('T')[0] : '',
            valor_actual: vehicle.valor_actual || '',
            millaje: vehicle.millaje || '',
            vencimiento_registro: vehicle.vencimiento_registro
                ? vehicle.vencimiento_registro.split('T')[0]
                : '',
            vencimiento_inspeccion: vehicle.vencimiento_inspeccion
                ? vehicle.vencimiento_inspeccion.split('T')[0]
                : '',
            color: vehicle.color || '',
            combustible: vehicle.combustible || '',
            transmision: vehicle.transmision || '',
            capacidad_carga: vehicle.capacidad_carga || '',
            observaciones: vehicle.observaciones || '',
            estado: vehicle.estado || 'activo',
            foto: null,
        };
        photoPreview.value = data.ruta_foto || null;
        posicion.value = vehicleId;
        isVehicleModalOpen.value = true;
        formErrors.value = {};
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        showError('Error', 'No se pudo cargar la información del vehículo.');
    } finally {
        closeLoading();
    }
};
const resetForm = () => {
    formData.value = {
        user_id: '',
        negocio_id: '',
        numero_vin: '',
        codigo_unico: '',
        marca: '',
        modelo: '',
        año: '',
        numero_placa: '',
        numero_dot: '',
        tipo_vehiculo: '',
        tipo_propiedad: '',
        precio_compra: '',
        fecha_compra: '',
        valor_actual: '',
        millaje: '',
        vencimiento_registro: '',
        vencimiento_inspeccion: '',
        color: '',
        combustible: '',
        transmision: '',
        capacidad_carga: '',
        observaciones: '',
        estado: 'activo',
        foto: null,
    };
    photoPreview.value = null;
    formErrors.value = {};
};
const handlePhotoUpload = event => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            formErrors.value.foto = `La imagen no debe superar los ${
                MAX_FILE_SIZE / (1024 * 1024)
            }MB.`;
            formData.value.foto = null;
            photoPreview.value = null;
            event.target.value = '';
            return;
        }
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            formErrors.value.foto = 'Formato de imagen no válido. Use JPEG, PNG o GIF.';
            formData.value.foto = null;
            photoPreview.value = null;
            event.target.value = '';
            return;
        }
        formData.value.foto = file;
        photoPreview.value = URL.createObjectURL(file);
        formErrors.value.foto = '';
    } else {
        formData.value.foto = null;
        photoPreview.value = null;
        formErrors.value.foto = '';
        event.target.value = '';
    }
};
const openVehicleModal = (vehicle = null) => {
    resetForm();
    if (vehicle) {
        showVehicleById(vehicle.id);
    } else {
        posicion.value = null;
        isVehicleModalOpen.value = true;
    }
};
const closeVehicleModal = () => {
    isVehicleModalOpen.value = false;
    resetForm();
};
const validateFormData = () => {
    formErrors.value = {};
    let isValid = true;
    if (!formData.value.numero_vin) {
        formErrors.value.numero_vin = 'El número VIN es obligatorio.';
        isValid = false;
    }
    if (!formData.value.marca) {
        formErrors.value.marca = 'La marca es obligatoria.';
        isValid = false;
    }
    if (!formData.value.modelo) {
        formErrors.value.modelo = 'El modelo es obligatorio.';
        isValid = false;
    }
    if (!formData.value.numero_placa) {
        formErrors.value.numero_placa = 'El número de placa es obligatorio.';
        isValid = false;
    }
    if (!formData.value.millaje) {
        formErrors.value.millaje = 'El millaje es obligatorio.';
        isValid = false;
    }
    return isValid;
};
const handleSaveVehicle = async () => {
    if (!validateFormData()) {
        showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
        return;
    }
    try {
        showLoading();
        isLoading.value = true;
        const data = new FormData();
        Object.keys(formData.value).forEach(key => {
            if (formData.value[key] !== null && formData.value[key] !== '') {
                data.append(key, formData.value[key]);
            }
        });
        if (posicion.value) {
            data.append('_method', 'PUT');
            await updateVehicle(posicion.value, data);
            showSuccess('Éxito', 'Vehículo actualizado correctamente.');
        } else {
            await storeVehicle(data);
            showSuccess('Éxito', 'Vehículo creado correctamente.');
        }
        await listVehicles();
        closeVehicleModal();
    } catch (error) {
        console.error('Error saving vehicle:', error);
        if (error.response?.data?.errors) {
            formErrors.value = error.response.data.errors;
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
        } else {
            showError('Error', error.response?.data?.message || 'No se pudo guardar el vehículo.');
        }
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};
const toggleVehicleStatus = async vehicle => {
    const action = vehicle.estado === 'activo' ? 'desactivar' : 'activar';
    const confirmed = await showConfirm(
        'Confirmar',
        `¿Estás seguro de que deseas ${action} el vehículo ${vehicle.marca || 'N/A'} ${
            vehicle.modelo || ''
        } (Placa: ${vehicle.numero_placa || 'N/A'})?`
    );
    if (confirmed) {
        try {
            showLoading();
            if (vehicle.estado === 'activo') {
                await deactivateVehicle(vehicle.id);
            } else {
                await activateVehicle(vehicle.id);
            }
            showSuccess('Éxito', `Vehículo ${action}do correctamente.`);
            await listVehicles();
        } catch (error) {
            console.error('Error toggling vehicle status:', error);
            showError(
                'Error',
                error.response?.data?.message || `No se pudo ${action} el vehículo.`
            );
        } finally {
            closeLoading();
        }
    }
};
const confirmDelete = async vehicle => {
    const confirmed = await showConfirm(
        'Confirmar Eliminación',
        `¿Estás seguro de que deseas eliminar el vehículo ${vehicle.marca || 'N/A'} ${
            vehicle.modelo || ''
        } (Placa: ${vehicle.numero_placa || 'N/A'})?`
    );
    if (confirmed) {
        try {
            showLoading();
            await destroyVehicle(vehicle.id);
            showSuccess('Éxito', 'Vehículo eliminado correctamente.');
            await listVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            showError('Error', error.response?.data?.message || 'No se pudo eliminar el vehículo.');
        } finally {
            closeLoading();
        }
    }
};
const getStatusClass = status => {
    switch (status) {
        case 'activo':
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'mantenimiento':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        case 'inactivo':
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        case 'en_venta':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
        case 'vendido':
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
};
const getStatusText = status => {
    switch (status) {
        case 'activo':
            return 'Activo';
        case 'mantenimiento':
            return 'Mantenimiento';
        case 'inactivo':
            return 'Inactivo';
        case 'en_venta':
            return 'En Venta';
        case 'vendido':
            return 'Vendido';
        default:
            return 'N/A';
    }
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
const formatNumber = num => {
    return new Intl.NumberFormat('es-ES').format(num);
};
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
// Watchers
watch([searchQuery, selectedVehicleStatus], () => {
    currentPage.value = 1;
});
// Lifecycle
onMounted(async () => {
    await Promise.all([listVehicles(), listUsers(), listBusinesses()]);
});
</script>
