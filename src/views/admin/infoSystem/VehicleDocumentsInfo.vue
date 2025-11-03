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
                        <FileIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Sistema de Gestión de Documentos de Vehículos
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra todos los documentos asociados a los vehículos
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
            <!-- Section 1: Document List -->
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
                        1. Listado de Documentos
                    </h2>
                    <button
                        @click="showDemoDocumentList"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema muestra una tabla con todos los documentos asociados a los vehículos.
                    Cada fila contiene información básica del documento y acciones rápidas.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Documento
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Nombre y vista previa
                        </p>
                    </div>
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
                            Marca, modelo y placa
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Tipo
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Categoría del documento
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Vencimiento
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Fecha de caducidad
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
                            Descargar, editar, eliminar
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 2: Document Creation -->
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
                        2. Creación de Documentos
                    </h2>
                    <button
                        @click="showDemoDocumentCreation"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema permite crear nuevos documentos asociados a vehículos con información
                    completa.
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
                            <li>• Vehículo asociado</li>
                            <li>• Nombre del documento</li>
                            <li>• Tipo de documento</li>
                            <li>• Fecha de vencimiento</li>
                        </ul>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Archivo y Observaciones
                        </h3>
                        <ul
                            class="mt-2 space-y-1 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            <li>• Carga de archivo (PDF o imagen)</li>
                            <li>• Vista previa del documento</li>
                            <li>• Observaciones adicionales</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 3: Document Actions -->
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
                        @click="showDemoDocumentActions"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema ofrece múltiples acciones para gestionar los documentos de manera
                    eficiente.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                <DownloadIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Descargar Documento
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Permite descargar el archivo original del documento para su consulta
                            offline.
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
                                Editar Documento
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Modifica la información del documento como nombre, tipo o fecha de
                            vencimiento.
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
                                Eliminar Documento
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Elimina permanentemente un documento del sistema con confirmación
                            previa.
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
                    documentos rápidamente.
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
                            Busca documentos por nombre, vehículo o cualquier otro campo de texto.
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Filtro por Tipo
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Filtra documentos según su tipo (registro, seguro, inspección, etc.).
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 5: Notifications -->
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
                        5. Notificaciones de Vencimiento
                    </h2>
                    <button
                        @click="showDemoNotifications"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema envía notificaciones automáticas para documentos próximos a vencer o
                    ya vencidos.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-yellow-500 rounded-full">
                                <BellIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Próximos a Vencer
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Alertas para documentos próximos a vencer.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-red-500 rounded-full">
                                <AlertTriangleIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Vencidos
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Notificaciones para documentos ya vencidos.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-green-500 rounded-full">
                                <CheckCircleIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Actualizados
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Confirmación cuando un documento se actualiza.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Demo Modals -->
        <!-- Document List Demo Modal -->
        <div
            v-if="showDocumentListDemo"
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
                            Demo: Listado de Documentos
                        </h2>
                        <button
                            @click="closeDemo('documentList')"
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
                        Esta es una demostración de cómo se ve el listado de documentos en el
                        sistema. La tabla muestra información básica de cada documento y acciones
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
                                            Documento
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Vehículo
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Tipo
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Vencimiento
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
                                        v-for="document in demoDocuments"
                                        :key="document.id"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <div
                                                        class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                                    >
                                                        <FileIcon class="w-5 h-5 text-white" />
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
                                                        {{ document.name }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        ID: {{ document.id }}
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
                                                    `${document.vehicle.make} ${document.vehicle.model}`
                                                }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ document.vehicle.plate }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ getDocumentTypeText(document.type) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ formatDate(document.expiry) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div class="flex items-center space-x-2">
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                                    title="Descargar"
                                                >
                                                    <DownloadIcon class="w-4 h-4" />
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
                                    documento</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Acciones rápidas para gestionar documentos directamente desde
                                    la tabla</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Indicadores visuales del tipo y vencimiento de cada
                                    documento</span
                                >
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
                        @click="closeDemo('documentList')"
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

        <!-- Document Creation Demo Modal -->
        <div
            v-if="showDocumentCreationDemo"
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
                            Demo: Creación de Documentos
                        </h2>
                        <button
                            @click="closeDemo('documentCreation')"
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
                        Esta es una demostración del formulario para crear nuevos documentos en el
                        sistema. El formulario está dividido en secciones para facilitar la
                        recopilación de información.
                    </p>

                    <!-- Demo Form -->
                    <div class="space-y-4">
                        <!-- Document Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileIcon class="w-4 h-4 mr-2 text-green-500" />
                                Información del Documento
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vehículo *
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar vehículo</option>
                                        <option value="1">Toyota Tacoma (ABC123)</option>
                                        <option value="2">Ford Ranger (XYZ789)</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre del Documento *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Registro Vehicular"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Documento *
                                    </label>
                                    <select
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        <option value="registro_vehicular">
                                            Registro Vehicular
                                        </option>
                                        <option value="seguro">Seguro</option>
                                        <option value="inspeccion">Inspección</option>
                                        <option value="permiso_circulacion">
                                            Permiso de Circulación
                                        </option>
                                        <option value="certificado_emisiones">
                                            Certificado de Emisiones
                                        </option>
                                        <option value="otros">Otros</option>
                                    </select>
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha de Vencimiento
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
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Archivo *
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <div class="mt-2">
                                        <p
                                            class="text-xs transition-colors duration-200"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                                        >
                                            Formatos admitidos: JPG, PNG, GIF, PDF (Máx. 10MB)
                                        </p>
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Notas sobre el documento"
                                        rows="3"
                                    ></textarea>
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
                                    >Selección de vehículo existente para asociar al documento</span
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
                        @click="closeDemo('documentCreation')"
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

        <!-- Document Actions Demo Modal -->
        <div
            v-if="showDocumentActionsDemo"
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
                            Demo: Acciones de Documentos
                        </h2>
                        <button
                            @click="closeDemo('documentActions')"
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
                        documentos en el sistema. Cada acción está diseñada para realizar tareas
                        específicas de manera eficiente.
                    </p>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <!-- Action 1: Download -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-green-400 to-green-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                    <DownloadIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Descargar Documento
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Permite descargar el archivo original del documento para su consulta
                                offline.
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
                                    botón de descarga, el sistema generará un enlace seguro para
                                    descargar el archivo original del documento.
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
                                    Editar Documento
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Modifica la información del documento como nombre, tipo o fecha de
                                vencimiento.
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
                                        Nombre del Documento
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Registro Vehicular"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-1 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Documento
                                    </label>
                                    <select
                                        class="w-full px-3 py-2 text-sm transition-colors duration-200 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="registro_vehicular">
                                            Registro Vehicular
                                        </option>
                                        <option value="seguro">Seguro</option>
                                        <option value="inspeccion">Inspección</option>
                                    </select>
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
                                    Eliminar Documento
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Elimina permanentemente un documento del sistema con confirmación
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
                                    un documento, el sistema mostrará un diálogo de confirmación
                                    para evitar eliminaciones accidentales.
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
                                    documentos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Confirmaciones previas para acciones destructivas como eliminar
                                    documentos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Descarga segura de archivos con nombres originales
                                    preservados</span
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
                        </ul>
                    </div>
                </div>
                <!-- Modal Footer -->
                <div
                    class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                    :class="isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'"
                >
                    <button
                        @click="closeDemo('documentActions')"
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
                        disponibles en el sistema para encontrar documentos rápidamente.
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
                                    placeholder="Buscar documentos..."
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
                                <option value="">Todos los tipos</option>
                                <option value="registro_vehicular">Registro Vehicular</option>
                                <option value="seguro">Seguro</option>
                                <option value="inspeccion">Inspección</option>
                                <option value="permiso_circulacion">Permiso de Circulación</option>
                                <option value="certificado_emisiones">
                                    Certificado de Emisiones
                                </option>
                                <option value="otros">Otros</option>
                            </select>
                            <select
                                class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                "
                            >
                                <option value="">Todos los estados</option>
                                <option value="true">Aprobado</option>
                                <option value="false">No Aprobado</option>
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
                                            Documento
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Vehículo
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Tipo
                                        </th>
                                        <th
                                            class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                                        >
                                            Vencimiento
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
                                        v-for="document in demoFilteredDocuments"
                                        :key="document.id"
                                        class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10">
                                                    <div
                                                        class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                                    >
                                                        <FileIcon class="w-5 h-5 text-white" />
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
                                                        {{ document.name }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        ID: {{ document.id }}
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
                                                    `${document.vehicle.make} ${document.vehicle.model}`
                                                }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ document.vehicle.plate }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ getDocumentTypeText(document.type) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ formatDate(document.expiry) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                                                :class="
                                                    document.approved
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                "
                                            >
                                                {{ document.approved ? 'Aprobado' : 'No Aprobado' }}
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
                                <span
                                    >Posibilidad de filtrar por tipo de documento y estado de
                                    aprobación</span
                                >
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

        <!-- Notifications Demo Modal -->
        <div
            v-if="showNotificationsDemo"
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
                            Demo: Notificaciones de Vencimiento
                        </h2>
                        <button
                            @click="closeDemo('notifications')"
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
                        Esta es una demostración de las notificaciones y alertas que el sistema
                        envía para documentos próximos a vencer o ya vencidos.
                    </p>

                    <!-- Demo Notifications -->
                    <div class="space-y-4">
                        <!-- Upcoming Expiry -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 p-2 mr-3 text-white bg-yellow-500 rounded-lg"
                                >
                                    <BellIcon class="w-5 h-5" />
                                </div>
                                <div class="flex-1">
                                    <h3
                                        class="mb-1 text-base font-semibold transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Documento Próximo a Vencer
                                    </h3>
                                    <p
                                        class="text-sm transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >
                                        El documento "Seguro" para el vehículo Toyota Tacoma
                                        (ABC123) vence en 7 días.
                                    </p>
                                    <div
                                        class="flex items-center mt-2 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        <ClockIcon class="w-4 h-4 mr-1" />
                                        <span>Hace 2 horas</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Expired Document -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 border-red-500 shadow-lg rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 p-2 mr-3 text-white bg-red-500 rounded-lg"
                                >
                                    <AlertTriangleIcon class="w-5 h-5" />
                                </div>
                                <div class="flex-1">
                                    <h3
                                        class="mb-1 text-base font-semibold transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Documento Vencido
                                    </h3>
                                    <p
                                        class="text-sm transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >
                                        El documento "Inspección" para el vehículo Ford Ranger
                                        (XYZ789) venció hace 5 días.
                                    </p>
                                    <div
                                        class="flex items-center mt-2 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        <ClockIcon class="w-4 h-4 mr-1" />
                                        <span>Hace 1 día</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Updated Document -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 border-green-500 shadow-lg rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-start">
                                <div
                                    class="flex-shrink-0 p-2 mr-3 text-white bg-green-500 rounded-lg"
                                >
                                    <CheckCircleIcon class="w-5 h-5" />
                                </div>
                                <div class="flex-1">
                                    <h3
                                        class="mb-1 text-base font-semibold transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Documento Actualizado
                                    </h3>
                                    <p
                                        class="text-sm transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                    >
                                        El documento "Registro Vehicular" para el vehículo Toyota
                                        Tacoma (ABC123) ha sido actualizado exitosamente.
                                    </p>
                                    <div
                                        class="flex items-center mt-2 text-xs transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                    >
                                        <ClockIcon class="w-4 h-4 mr-1" />
                                        <span>Hace 3 horas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de las Notificaciones
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
                                    >Notificaciones automáticas para documentos próximos a
                                    vencer</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Alertas prioritarias para documentos ya vencidos</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Confirmaciones cuando un documento se actualiza</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Historial de notificaciones con marca de tiempo</span>
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
                        @click="closeDemo('notifications')"
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
    AlertTriangleIcon,
    BellIcon,
    CheckCircle2Icon,
    CheckCircleIcon,
    ClockIcon,
    DownloadIcon,
    EditIcon,
    FileIcon,
    PlayIcon,
    SearchIcon,
    TrashIcon,
    XIcon,
} from 'lucide-vue-next';
import { ref } from 'vue';

// Demo modals state
const showDocumentListDemo = ref(false);
const showDocumentCreationDemo = ref(false);
const showDocumentActionsDemo = ref(false);
const showFiltersDemo = ref(false);
const showNotificationsDemo = ref(false);

// Demo data
const demoDocuments = [
    {
        id: 'DOC001',
        name: 'Seguro del Vehículo',
        vehicle: {
            make: 'Toyota',
            model: 'Tacoma',
            plate: 'ABC123',
        },
        type: 'seguro',
        expiry: '2023-12-15',
        approved: true,
    },
    {
        id: 'DOC002',
        name: 'Inspección Técnica',
        vehicle: {
            make: 'Ford',
            model: 'Ranger',
            plate: 'XYZ789',
        },
        type: 'inspeccion',
        expiry: '2023-11-10',
        approved: false,
    },
    {
        id: 'DOC003',
        name: 'Registro Vehicular',
        vehicle: {
            make: 'Toyota',
            model: 'Tacoma',
            plate: 'ABC123',
        },
        type: 'registro_vehicular',
        expiry: '2024-05-20',
        approved: true,
    },
];

const demoFilteredDocuments = [
    {
        id: 'DOC001',
        name: 'Seguro del Vehículo',
        vehicle: {
            make: 'Toyota',
            model: 'Tacoma',
            plate: 'ABC123',
        },
        type: 'seguro',
        expiry: '2023-12-15',
        approved: true,
    },
    {
        id: 'DOC002',
        name: 'Inspección Técnica',
        vehicle: {
            make: 'Ford',
            model: 'Ranger',
            plate: 'XYZ789',
        },
        type: 'inspeccion',
        expiry: '2023-11-10',
        approved: false,
    },
];

// Methods
const startTour = () => {
    alert(
        '¡Bienvenido al tour guiado!\n\nEste tour te mostrará las principales características del sistema de gestión de documentos de vehículos.\n\n1. Listado de Documentos: Visualiza todos los documentos asociados a los vehículos.\n2. Creación de Documentos: Añade nuevos documentos al sistema.\n3. Acciones Disponibles: Gestiona documentos con diversas acciones.\n4. Búsqueda y Filtros: Encuentra documentos rápidamente.\n5. Notificaciones de Vencimiento: Recibe alertas para documentos próximos a vencer.\n\nExplora las secciones y haz clic en "Ver Demo" para ver ejemplos detallados de cada funcionalidad.'
    );
};

const showDemoDocumentList = () => {
    showDocumentListDemo.value = true;
};

const showDemoDocumentCreation = () => {
    showDocumentCreationDemo.value = true;
};

const showDemoDocumentActions = () => {
    showDocumentActionsDemo.value = true;
};

const showDemoFilters = () => {
    showFiltersDemo.value = true;
};

const showDemoNotifications = () => {
    showNotificationsDemo.value = true;
};

const closeDemo = demoType => {
    switch (demoType) {
        case 'documentList':
            showDocumentListDemo.value = false;
            break;
        case 'documentCreation':
            showDocumentCreationDemo.value = false;
            break;
        case 'documentActions':
            showDocumentActionsDemo.value = false;
            break;
        case 'filters':
            showFiltersDemo.value = false;
            break;
        case 'notifications':
            showNotificationsDemo.value = false;
            break;
    }
};

const getDocumentTypeText = tipo => {
    const types = {
        registro_vehicular: 'Registro Vehicular',
        seguro: 'Seguro',
        inspeccion: 'Inspección',
        permiso_circulacion: 'Permiso de Circulación',
        certificado_emisiones: 'Certificado de Emisiones',
        otros: 'Otros',
    };
    return types[tipo] || 'Desconocido';
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
