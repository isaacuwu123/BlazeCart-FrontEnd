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
                            Sistema de Gestión de Vehículos
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra todos los vehículos de tu flota
                        </p>
                    </div>
                </div>
                <button
                    @click="startTour"
                    class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <PlayIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Iniciar Tour Guiado</span>
                </button>
            </div>
        </div>

        <!-- Demo Sections -->
        <div class="space-y-6">
            <!-- Section 1: Vehicle List -->
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-6"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <div class="flex items-center justify-between mb-4">
                    <h2
                        class="text-xl font-bold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        1. Listado de Vehículos
                    </h2>
                    <button
                        @click="showDemoVehicleList"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema muestra una tabla con todos los vehículos registrados en la flota.
                    Cada fila contiene información básica del vehículo y acciones rápidas.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Vehículo
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Marca, modelo y foto
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Propietario
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Nombre y contacto
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Placa
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Número de placa y VIN
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Estado
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Estado actual del vehículo
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Acciones
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Editar, activar/desactivar
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 2: Vehicle Creation -->
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-6"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <div class="flex items-center justify-between mb-4">
                    <h2
                        class="text-xl font-bold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        2. Creación de Vehículos
                    </h2>
                    <button
                        @click="showDemoVehicleCreation"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema permite crear nuevos vehículos con información completa incluyendo
                    datos básicos, financieros y documentación.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Información Básica
                        </h3>
                        <ul
                            class="mt-2 space-y-1 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            <li>• Propietario y negocio</li>
                            <li>• VIN, marca, modelo</li>
                            <li>• Año, placa, tipo</li>
                            <li>• Estado y combustible</li>
                        </ul>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Datos Adicionales
                        </h3>
                        <ul
                            class="mt-2 space-y-1 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            <li>• Información financiera</li>
                            <li>• Millaje y fechas</li>
                            <li>• Características técnicas</li>
                            <li>• Foto del vehículo</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 3: Vehicle Actions -->
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-6"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <div class="flex items-center justify-between mb-4">
                    <h2
                        class="text-xl font-bold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        3. Acciones Disponibles
                    </h2>
                    <button
                        @click="showDemoVehicleActions"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema ofrece múltiples acciones para gestionar los vehículos de manera
                    eficiente.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                <EyeIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Ver Detalles
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Permite visualizar todos los detalles del vehículo incluyendo
                            información completa.
                        </p>
                    </div>
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-blue-500 rounded-lg">
                                <EditIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Editar Vehículo
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Modifica la información del vehículo como estado, millaje o datos
                            financieros.
                        </p>
                    </div>
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-red-500 rounded-lg">
                                <TrashIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Eliminar Vehículo
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Elimina permanentemente un vehículo del sistema con confirmación previa.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 4: Filters and Search -->
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-6"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <div class="flex items-center justify-between mb-4">
                    <h2
                        class="text-xl font-bold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        4. Búsqueda y Filtros
                    </h2>
                    <button
                        @click="showDemoFilters"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema incluye potentes herramientas de búsqueda y filtrado para encontrar
                    vehículos rápidamente.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Búsqueda por Texto
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Busca vehículos por VIN, marca, modelo, placa o propietario.
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Filtro por Estado
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Filtra vehículos según su estado actual (activo, inactivo, etc.).
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 5: Statistics -->
            <div
                class="p-4 transition-colors duration-200 shadow-lg rounded-xl sm:p-6"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <div class="flex items-center justify-between mb-4">
                    <h2
                        class="text-xl font-bold transition-colors duration-200"
                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                    >
                        5. Estadísticas y Reportes
                    </h2>
                    <button
                        @click="showDemoStatistics"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema proporciona estadísticas en tiempo real y reportes sobre la flota de
                    vehículos.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-blue-500 rounded-full">
                                <CarIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Total Vehículos
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Número total de vehículos registrados en el sistema.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-green-500 rounded-full">
                                <GaugeIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Millaje Total
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Suma total del millaje de todos los vehículos.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-yellow-500 rounded-full">
                                <TrendingUpIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Vehículos Activos
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Porcentaje de vehículos actualmente en operación.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Demo Modals -->
        <!-- Vehicle List Demo Modal -->
        <div
            v-if="showVehicleListDemo"
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
                            Demo: Listado de Vehículos
                        </h2>
                        <button
                            @click="closeDemo('vehicleList')"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <p
                        class="mb-4 transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Esta es una demostración de cómo se ve el listado de vehículos en el
                        sistema. La tabla muestra información básica de cada vehículo y acciones
                        rápidas.
                    </p>

                    <!-- Demo Table -->
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
                                        isDarkMode
                                            ? 'bg-gray-800 divide-gray-700'
                                            : 'bg-white divide-gray-200'
                                    "
                                >
                                    <tr
                                        v-for="vehicle in demoVehicles"
                                        :key="vehicle.id"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ vehicle.marca }} {{ vehicle.modelo }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        Año: {{ vehicle.año }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ vehicle.owner }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ vehicle.ownerEmail }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ vehicle.plate }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                VIN: {{ vehicle.vin }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="getStatusClass(vehicle.status)"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ getStatusText(vehicle.status) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div class="flex items-center space-x-2">
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                                    title="Ver detalles"
                                                >
                                                    <EyeIcon class="w-4 h-4" />
                                                </button>
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                                    title="Editar"
                                                >
                                                    <EditIcon class="w-4 h-4" />
                                                </button>
                                                <button
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

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características del Listado
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Visualización clara de la información básica de cada
                                    vehículo</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Acciones rápidas para gestionar vehículos directamente desde la
                                    tabla</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Indicadores visuales del estado de cada vehículo</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Diseño responsivo que se adapta a diferentes tamaños de
                                    pantalla</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('vehicleList')"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                        :class="
                            isDarkMode
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        Cerrar Demo
                    </button>
                </div>
            </div>
        </div>

        <!-- Vehicle Creation Demo Modal -->
        <div
            v-if="showVehicleCreationDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-green-400 to-green-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Creación de Vehículos
                        </h2>
                        <button
                            @click="closeDemo('vehicleCreation')"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <p
                        class="mb-4 transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Esta es una demostración del formulario para crear nuevos vehículos en el
                        sistema. El formulario está dividido en secciones para facilitar la
                        recopilación de información.
                    </p>

                    <!-- Demo Form -->
                    <div class="space-y-4">
                        <!-- Basic Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <CarIcon class="w-4 h-4 mr-2 text-green-500" />
                                Información Básica del Vehículo
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Propietario *
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar propietario</option>
                                        <option value="1">Juan Pérez</option>
                                        <option value="2">María García</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Negocio
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar negocio</option>
                                        <option value="1">Transportes Rápidos</option>
                                        <option value="2">Logística Eficiente</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número VIN *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="1HGBH41JXMN109186"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Marca *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Toyota"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Modelo *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Tacoma"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Año
                                    </label>
                                    <input
                                        type="number"
                                        :min="1900"
                                        :max="new Date().getFullYear() + 1"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="2020"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número de Placa *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="ABC123"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                </div>
                            </div>
                        </div>

                        <!-- Financial Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <DollarSignIcon class="w-4 h-4 mr-2 text-green-500" />
                                Datos Financieros
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Precio de Compra
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="15000.00"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha de Compra
                                    </label>
                                    <input
                                        type="date"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Valor Actual
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="12000.00"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Millaje *
                                    </label>
                                    <input
                                        type="number"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="50000"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Additional Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-4 h-4 mr-2 text-green-500" />
                                Información Adicional
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Color
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Rojo"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Vehículo
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        rows="3"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Detalles adicionales sobre el vehículo..."
                                    ></textarea>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Foto del Vehículo
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características del Formulario
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >División en secciones lógicas para facilitar la recopilación de
                                    información</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Validación de campos obligatorios y formatos correctos</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Selección de propietario existente para asociar al
                                    vehículo</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Diseño responsivo que se adapta a diferentes dispositivos</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('vehicleCreation')"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                        :class="
                            isDarkMode
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        Cerrar Demo
                    </button>
                </div>
            </div>
        </div>

        <!-- Vehicle Actions Demo Modal -->
        <div
            v-if="showVehicleActionsDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Acciones de Vehículos
                        </h2>
                        <button
                            @click="closeDemo('vehicleActions')"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <p
                        class="mb-4 transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Esta es una demostración de las acciones disponibles para gestionar
                        vehículos en el sistema. Cada acción está diseñada para realizar tareas
                        específicas de manera eficiente.
                    </p>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <!-- Action 1: View Details -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-green-400 to-green-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                    <EyeIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Ver Detalles
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Permite visualizar todos los detalles del vehículo incluyendo
                                información completa.
                            </p>
                            <div
                                class="p-3 mb-3 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
                            >
                                <p
                                    class="text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    <span class="font-medium">Proceso:</span> Al hacer clic en el
                                    botón de ver detalles, se mostrará una ventana con toda la
                                    información del vehículo.
                                </p>
                            </div>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 2: Edit -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-blue-400 to-blue-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-blue-500 rounded-lg">
                                    <EditIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Editar Vehículo
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Modifica la información del vehículo como estado, millaje o datos
                                financieros.
                            </p>
                            <div
                                class="p-3 mb-3 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
                            >
                                <div class="mb-2">
                                    <label
                                        class="block mb-1 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado
                                    </label>
                                    <select
                                        class="w-full px-3 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="activo">Activo</option>
                                        <option value="mantenimiento">Mantenimiento</option>
                                        <option value="inactivo">Inactivo</option>
                                        <option value="en_venta">En Venta</option>
                                        <option value="vendido">Vendido</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Millaje
                                    </label>
                                    <input
                                        type="number"
                                        class="w-full px-3 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="50000"
                                    />
                                </div>
                            </div>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 3: Delete -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-red-400 to-red-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-red-500 rounded-lg">
                                    <TrashIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Eliminar Vehículo
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Elimina permanentemente un vehículo del sistema con confirmación
                                previa.
                            </p>
                            <div
                                class="p-3 mb-3 rounded-lg"
                                :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
                            >
                                <p
                                    class="text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                >
                                    <span class="font-medium">Confirmación:</span> Antes de eliminar
                                    un vehículo, el sistema mostrará un diálogo de confirmación para
                                    evitar eliminaciones accidentales.
                                </p>
                            </div>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de las Acciones
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Acciones rápidas accesibles directamente desde la tabla de
                                    vehículos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Confirmaciones previas para acciones destructivas como eliminar
                                    vehículos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Formularios modales para edición sin abandonar la vista
                                    principal</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Vista detallada con toda la información del vehículo</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('vehicleActions')"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                        :class="
                            isDarkMode
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        Cerrar Demo
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters Demo Modal -->
        <div
            v-if="showFiltersDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Búsqueda y Filtros
                        </h2>
                        <button
                            @click="closeDemo('filters')"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <p
                        class="mb-4 transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Esta es una demostración de las herramientas de búsqueda y filtrado
                        disponibles en el sistema para encontrar vehículos rápidamente.
                    </p>

                    <!-- Demo Filters -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 shadow-lg rounded-xl"
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
                                    type="text"
                                    placeholder="Buscar vehículos..."
                                    class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    "
                                />
                            </div>
                            <select
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

                    <!-- Demo Results -->
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
                                <thead class="bg-gradient-to-r from-yellow-400 to-yellow-600">
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
                                        v-for="vehicle in demoFilteredVehicles"
                                        :key="vehicle.id"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
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
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ vehicle.marca }} {{ vehicle.modelo }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        Año: {{ vehicle.año }}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ vehicle.owner }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ vehicle.ownerEmail }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ vehicle.plate }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                VIN: {{ vehicle.vin }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="getStatusClass(vehicle.status)"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ getStatusText(vehicle.status) }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de Búsqueda y Filtros
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Búsqueda en tiempo real que actualiza los resultados mientras
                                    escribes</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Filtros combinables para refinar resultados según múltiples
                                    criterios</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Posibilidad de filtrar por estado del vehículo</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Resultados actualizados automáticamente al aplicar
                                    filtros</span
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('filters')"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                        :class="
                            isDarkMode
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        Cerrar Demo
                    </button>
                </div>
            </div>
        </div>

        <!-- Statistics Demo Modal -->
        <div
            v-if="showStatisticsDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Estadísticas y Reportes
                        </h2>
                        <button
                            @click="closeDemo('statistics')"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <p
                        class="mb-4 transition-colors duration-200"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        Esta es una demostración de las estadísticas y reportes disponibles en el
                        sistema para monitorear la flota de vehículos.
                    </p>

                    <!-- Demo Statistics Cards -->
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
                            <p
                                class="text-xl font-bold"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                24
                            </p>
                            <div class="h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="h-2 bg-blue-500 rounded-full" style="width: 100%"></div>
                            </div>
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
                                18
                            </p>
                            <div class="h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div class="h-2 bg-green-500 rounded-full" style="width: 75%"></div>
                            </div>
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
                                1,245,890 mi
                            </p>
                            <div class="h-2 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    class="h-2 bg-yellow-500 rounded-full"
                                    style="width: 60%"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <!-- Demo Chart -->
                    <div
                        class="p-4 transition-colors duration-200 shadow-lg rounded-xl"
                        :class="
                            isDarkMode
                                ? 'bg-gray-800 border border-gray-700'
                                : 'bg-white border border-gray-200'
                        "
                    >
                        <h3
                            class="mb-4 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Distribución por Estado
                        </h3>
                        <div class="flex items-center justify-center h-64">
                            <div class="relative w-48 h-48">
                                <!-- Pie Chart Placeholder -->
                                <div class="absolute inset-0 bg-blue-500 rounded-full"></div>
                                <div
                                    class="absolute inset-0 bg-green-500 rounded-full"
                                    style="
                                        clip-path: polygon(
                                            50% 50%,
                                            100% 0,
                                            100% 100%,
                                            0 100%,
                                            0 50%
                                        );
                                    "
                                ></div>
                                <div
                                    class="absolute inset-0 bg-yellow-500 rounded-full"
                                    style="clip-path: polygon(50% 50%, 100% 0, 50% 0)"
                                ></div>
                                <div
                                    class="absolute inset-0 bg-red-500 rounded-full"
                                    style="clip-path: polygon(50% 50%, 0 0, 0 50%)"
                                ></div>
                                <div
                                    class="absolute inset-0 bg-gray-500 rounded-full"
                                    style="clip-path: polygon(50% 50%, 50% 0, 100% 0)"
                                ></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div
                                        class="w-24 h-24 bg-white rounded-full dark:bg-gray-800"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap justify-center mt-4 space-x-4">
                            <div class="flex items-center">
                                <div class="w-4 h-4 mr-2 bg-blue-500 rounded"></div>
                                <span
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >Activo (75%)</span
                                >
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 mr-2 bg-green-500 rounded"></div>
                                <span
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >Mantenimiento (10%)</span
                                >
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 mr-2 bg-yellow-500 rounded"></div>
                                <span
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >En Venta (10%)</span
                                >
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 mr-2 bg-red-500 rounded"></div>
                                <span
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >Inactivo (3%)</span
                                >
                            </div>
                            <div class="flex items-center">
                                <div class="w-4 h-4 mr-2 bg-gray-500 rounded"></div>
                                <span
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >Vendido (2%)</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de las Estadísticas
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Estadísticas en tiempo actualizadas en tiempo real</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Visualizaciones gráficas para mejor comprensión de datos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Reportes personalizables para diferentes necesidades</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Indicadores clave de rendimiento para la flota</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('statistics')"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                        :class="
                            isDarkMode
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        "
                    >
                        Cerrar Demo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { isDarkMode } from '@/composables/useDarkMode';
import {
    CarIcon,
    CheckCircle2Icon,
    DollarSignIcon,
    EditIcon,
    EyeIcon,
    FileTextIcon,
    GaugeIcon,
    PlayIcon,
    SearchIcon,
    TrashIcon,
    TrendingUpIcon,
    XIcon,
} from 'lucide-vue-next';
import { ref } from 'vue';

// Demo modals state
const showVehicleListDemo = ref(false);
const showVehicleCreationDemo = ref(false);
const showVehicleActionsDemo = ref(false);
const showFiltersDemo = ref(false);
const showStatisticsDemo = ref(false);

// Demo data
const demoVehicles = [
    {
        id: 'V001',
        marca: 'Toyota',
        modelo: 'Tacoma',
        año: '2020',
        owner: 'Juan Pérez',
        ownerEmail: 'juan.perez@example.com',
        plate: 'ABC123',
        vin: '1HGBH41JXMN109186',
        status: 'activo',
    },
    {
        id: 'V002',
        marca: 'Ford',
        modelo: 'Ranger',
        año: '2019',
        owner: 'María García',
        ownerEmail: 'maria.garcia@example.com',
        plate: 'XYZ789',
        vin: '1FTFW1ET5DFC12345',
        status: 'activo',
    },
    {
        id: 'V003',
        marca: 'Chevrolet',
        modelo: 'Silverado',
        año: '2021',
        owner: 'Carlos López',
        ownerEmail: 'carlos.lopez@example.com',
        plate: 'DEF456',
        vin: '1GCVKREC6MZ123456',
        status: 'mantenimiento',
    },
];

const demoFilteredVehicles = [
    {
        id: 'V001',
        marca: 'Toyota',
        modelo: 'Tacoma',
        año: '2020',
        owner: 'Juan Pérez',
        ownerEmail: 'juan.perez@example.com',
        plate: 'ABC123',
        vin: '1HGBH41JXMN109186',
        status: 'activo',
    },
    {
        id: 'V002',
        marca: 'Ford',
        modelo: 'Ranger',
        año: '2019',
        owner: 'María García',
        ownerEmail: 'maria.garcia@example.com',
        plate: 'XYZ789',
        vin: '1FTFW1ET5DFC12345',
        status: 'activo',
    },
];

// Methods
const startTour = () => {
    alert(
        '¡Bienvenido al tour guiado!\n\nEste tour te mostrará las principales características del sistema de gestión de vehículos.\n\n1. Listado de Vehículos: Visualiza todos los vehículos registrados en la flota.\n2. Creación de Vehículos: Añade nuevos vehículos al sistema.\n3. Acciones Disponibles: Gestiona vehículos con diversas acciones.\n4. Búsqueda y Filtros: Encuentra vehículos rápidamente.\n5. Estadísticas y Reportes: Monitorea el rendimiento de la flota.\n\nExplora las secciones y haz clic en "Ver Demo" para ver ejemplos detallados de cada funcionalidad.'
    );
};

const showDemoVehicleList = () => {
    showVehicleListDemo.value = true;
};

const showDemoVehicleCreation = () => {
    showVehicleCreationDemo.value = true;
};

const showDemoVehicleActions = () => {
    showVehicleActionsDemo.value = true;
};

const showDemoFilters = () => {
    showFiltersDemo.value = true;
};

const showDemoStatistics = () => {
    showStatisticsDemo.value = true;
};

const closeDemo = demoType => {
    switch (demoType) {
        case 'vehicleList':
            showVehicleListDemo.value = false;
            break;
        case 'vehicleCreation':
            showVehicleCreationDemo.value = false;
            break;
        case 'vehicleActions':
            showVehicleActionsDemo.value = false;
            break;
        case 'filters':
            showFiltersDemo.value = false;
            break;
        case 'statistics':
            showStatisticsDemo.value = false;
            break;
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
    background: #fbbf24;
    border-radius: 2px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #f59e0b;
}

/* Touch improvements for mobile */
@media (max-width: 640px) {
    .touch-manipulation {
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
    }
}
</style>
