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
                            Gestión de Documentos de Conductores
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los documentos asociados a los conductores
                        </p>
                    </div>
                </div>
                <button
                    @click="openDocumentModal()"
                    class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                    <FilePlusIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Nuevo Documento</span>
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
                    v-model="selectedDocumentType"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los tipos</option>
                    <option value="licencia">Licencia</option>
                    <option value="seguro">Seguro</option>
                    <option value="identificacion">Identificación</option>
                    <option value="certificado_medico">Certificado Médico</option>
                    <option value="registro_vehicular">Registro Vehicular</option>
                    <option value="otros">Otros</option>
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
                                Documento
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Conductor
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Tipo
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-white uppercase"
                            >
                                Vencimiento
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
                            v-for="document in paginatedDocuments"
                            :key="document.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <img
                                            v-if="isImage(document.archivo)"
                                            :src="document.archivo"
                                            class="object-cover w-10 h-10 rounded-full"
                                            alt="Document Preview"
                                        />
                                        <div
                                            v-else
                                            class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                        >
                                            <FileIcon class="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                        >
                                            {{ document.nombre || 'N/A' }}
                                        </div>
                                        <div
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                        >
                                            ID: {{ document.id || 'N/A' }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ document.driver?.user?.general_data?.nombre || 'N/A' }}
                                    {{ document.driver?.user?.general_data?.apellido || '' }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    {{ document.driver?.user?.email || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ getDocumentTypeText(document.tipo) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ formatDate(document.fecha_vencimiento) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="downloadDocument(document.id)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                                        title="Descargar"
                                    >
                                        <DownloadIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openDocumentModal(document)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="confirmDelete(document)"
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
                v-for="document in paginatedDocuments"
                :key="document.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12"
                        >
                            <img
                                v-if="isImage(document.archivo)"
                                :src="document.archivo"
                                class="object-cover w-10 h-10 rounded-full sm:w-12 sm:h-12"
                                alt="Document Preview"
                            />
                            <FileIcon
                                v-else
                                class="w-5 h-5 text-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ document.nombre || 'N/A' }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                ID: {{ document.id || 'N/A' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <UserIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">
                            {{ document.driver?.user?.general_data?.nombre || 'N/A' }}
                            {{ document.driver?.user?.general_data?.apellido || '' }}
                        </span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <FileIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ getDocumentTypeText(document.tipo) }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatDate(document.fecha_vencimiento) }}</span>
                    </div>
                    <div
                        v-if="document.observaciones"
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <AlertCircleIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ document.observaciones }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="downloadDocument(document.id)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        title="Descargar"
                    >
                        <DownloadIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openDocumentModal(document)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="confirmDelete(document)"
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
        <div v-if="paginatedDocuments.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <FileIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron documentos
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>
        <!-- Document Modal (Create/Edit) -->
        <div
            v-if="isDocumentModalOpen"
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
                            {{ posicion ? 'Editar Documento' : 'Nuevo Documento' }}
                        </h2>
                        <button
                            @click="closeDocumentModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveDocument" class="space-y-4 sm:space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información del Documento
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-driver"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Conductor *
                                    </label>
                                    <select
                                        id="modal-driver"
                                        v-model="formData.driver_id"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar conductor</option>
                                        <option
                                            v-for="driver in drivers"
                                            :key="driver.id"
                                            :value="driver.id"
                                        >
                                            {{ driver.user?.general_data?.nombre || 'N/A' }}
                                            {{ driver.user?.general_data?.apellido || '' }}
                                            ({{ driver.user?.email || 'N/A' }})
                                        </option>
                                    </select>
                                    <p
                                        v-if="formErrors.driver_id"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.driver_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-nombre"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre del Documento *
                                    </label>
                                    <input
                                        id="modal-nombre"
                                        v-model="formData.nombre"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="Licencia de Conducir"
                                    />
                                    <p v-if="formErrors.nombre" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.nombre }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-tipo"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Documento *
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
                                        <option value="licencia">Licencia</option>
                                        <option value="seguro">Seguro</option>
                                        <option value="identificacion">Identificación</option>
                                        <option value="certificado_medico">
                                            Certificado Médico
                                        </option>
                                        <option value="registro_vehicular">
                                            Registro Vehicular
                                        </option>
                                        <option value="otros">Otros</option>
                                    </select>
                                    <p v-if="formErrors.tipo" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.tipo }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-fecha-vencimiento"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Fecha de Vencimiento
                                    </label>
                                    <input
                                        id="modal-fecha-vencimiento"
                                        v-model="formData.fecha_vencimiento"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.fecha_vencimiento"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.fecha_vencimiento }}
                                    </p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-archivo"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Archivo *
                                    </label>
                                    <input
                                        id="modal-archivo"
                                        type="file"
                                        accept="image/*,application/pdf"
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
                                            v-if="isImage(filePreview)"
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
                                        placeholder="Notas sobre el documento"
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
                                @click="closeDocumentModal"
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
                                    >{{ posicion ? 'Actualizar' : 'Crear' }} Documento</span
                                >
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
import {
    createDriverDocument,
    deleteDriverDocument,
    downloadDriverDocument,
    indexDriversDocuments,
    showDriverDocument,
    updateDriverDocument,
} from '@/services/DriverDocumentService';
import { indexDriversActives } from '@/services/DriverService';
import {
    AlertCircleIcon,
    CalendarIcon,
    DownloadIcon,
    EditIcon,
    FileIcon,
    FilePlusIcon,
    SearchIcon,
    TrashIcon,
    UserIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Initialize useAlert
const { showSuccess, showError, showValidationErrors, showConfirm, showLoading, closeLoading } =
    useAlert();

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB to match backend
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/pdf'];

// State
const documents = ref([]);
const drivers = ref([]);
const isDocumentModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedDocumentType = ref('');
const posicion = ref(null);
const formData = ref({
    driver_id: '',
    tipo: 'licencia',
    nombre: '',
    archivo: null,
    fecha_vencimiento: '',
    observaciones: '',
});
const formErrors = ref({});
const filePreview = ref(null);
const currentPage = ref(1);
const perPage = ref(15);
const totalPages = ref(1);

// Computed
const filteredDocuments = computed(() => {
    let filtered = documents.value;
    if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            doc =>
                (doc.nombre || '').toLowerCase().includes(search) ||
                (doc.driver?.user?.general_data?.nombre || '').toLowerCase().includes(search) ||
                (doc.driver?.user?.general_data?.apellido || '').toLowerCase().includes(search) ||
                (doc.driver?.user?.email || '').toLowerCase().includes(search)
        );
    }
    if (selectedDocumentType.value) {
        filtered = filtered.filter(doc => doc.tipo === selectedDocumentType.value);
    }
    return filtered;
});

const paginatedDocuments = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredDocuments.value.slice(start, end);
});

// Methods
const listDocuments = async () => {
    try {
        showLoading();
        const { data } = await indexDriversDocuments();
        documents.value = data.datos;
        totalPages.value = Math.ceil(documents.value.length / perPage.value);
    } catch (error) {
        console.error('Error listing documents:', error);
        showError('Error', 'No se pudo cargar la lista de documentos.');
    } finally {
        closeLoading();
    }
};

const listDrivers = async () => {
    try {
        const { data } = await indexDriversActives();
        drivers.value = data.datos;
    } catch (error) {
        console.error('Error listing drivers:', error);
        showError('Error', 'No se pudo cargar la lista de conductores.');
    }
};

const resetForm = () => {
    formData.value = {
        driver_id: '',
        tipo: 'licencia',
        nombre: '',
        archivo: null,
        fecha_vencimiento: '',
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
            formErrors.value.archivo = 'Formato no válido. Use JPEG, PNG, GIF o PDF.';
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
        return /\.(jpg|jpeg|png|gif)$/i.test(file);
    }
    return file && /\.(jpg|jpeg|png|gif)$/i.test(file.name);
};

const openDocumentModal = (document = null) => {
    resetForm();
    if (document) {
        showDocumentById(document.id);
    } else {
        posicion.value = null;
        isDocumentModalOpen.value = true;
    }
};

const closeDocumentModal = () => {
    isDocumentModalOpen.value = false;
    resetForm();
};

const showDocumentById = async documentId => {
    try {
        showLoading();
        const { data } = await showDriverDocument(documentId);
        console.log(data);
        // Verificar que los datos existen antes de asignarlos
        const documentData = data?.datos || {};

        formData.value = {
            driver_id: documentData.driver_id || '',
            tipo: documentData.tipo || 'licencia',
            nombre: documentData.nombre || '',
            archivo: null,
            fecha_vencimiento: documentData.fecha_vencimiento
                ? documentData.fecha_vencimiento.split('T')[0]
                : '',
            observaciones: documentData.observaciones || '',
        };

        filePreview.value = documentData.archivo_url || null;
        posicion.value = documentId;
        isDocumentModalOpen.value = true;
        formErrors.value = {};
    } catch (error) {
        console.error('Error fetching document:', error);
        showError('Error', 'No se pudo cargar la información del documento.');
    } finally {
        closeLoading();
    }
};

const validateFormData = () => {
    formErrors.value = {};
    let isValid = true;

    if (!formData.value.driver_id) {
        formErrors.value.driver_id = 'Debe seleccionar un conductor.';
        isValid = false;
    }

    if (!formData.value.nombre) {
        formErrors.value.nombre = 'El nombre del documento es obligatorio.';
        isValid = false;
    }

    if (!formData.value.tipo) {
        formErrors.value.tipo = 'El tipo de documento es obligatorio.';
        isValid = false;
    }

    if (!posicion.value && !formData.value.archivo) {
        formErrors.value.archivo = 'El archivo es obligatorio para nuevos documentos.';
        isValid = false;
    }

    return isValid;
};

const handleSaveDocument = async () => {
    try {
        showLoading();
        isLoading.value = true;

        // Perform client-side validation
        if (!validateFormData()) {
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
            return;
        }

        const data = new FormData();
        try {
            data.append('driver_id', formData.value.driver_id || '');
            data.append('tipo', formData.value.tipo || '');
            data.append('nombre', formData.value.nombre || '');

            if (formData.value.archivo) {
                data.append('archivo', formData.value.archivo);
            }

            data.append('fecha_vencimiento', formData.value.fecha_vencimiento || '');
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
            await updateDriverDocument(posicion.value, data);
            showSuccess('Éxito', 'Documento actualizado correctamente.');
        } else {
            await createDriverDocument(data);
            showSuccess('Éxito', 'Documento creado correctamente.');
        }

        await listDocuments();
        closeDocumentModal();
    } catch (error) {
        console.error('Error saving document:', error);
        if (error.response?.data?.errors) {
            formErrors.value = error.response.data.errors;
            showValidationErrors('Error de Validación', error.response.data.errors);
        } else {
            showError('Error', error.response?.data?.message || 'No se pudo guardar el documento.');
        }
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};

const confirmDelete = async document => {
    const confirmed = await showConfirm(
        'Confirmar Eliminación',
        `¿Estás seguro de que deseas eliminar el documento "${document.nombre || 'N/A'}"?`
    );

    if (confirmed) {
        try {
            showLoading();
            await deleteDriverDocument(document.id);
            showSuccess('Éxito', 'Documento eliminado correctamente.');
            await listDocuments();
        } catch (error) {
            console.error('Error deleting document:', error);
            showError(
                'Error',
                error.response?.data?.message || 'No se pudo eliminar el documento.'
            );
        } finally {
            closeLoading();
        }
    }
};

const downloadDocument = async documentId => {
    try {
        const response = await downloadDriverDocument(documentId);
        const blob = new Blob([response.data]);
        let fileName = `document_${documentId}`;

        const contentDisposition = response.headers['content-disposition'];
        if (contentDisposition) {
            const matches = contentDisposition.match(/filename="([^"]+)"/);
            if (matches && matches[1]) {
                fileName = decodeURIComponent(matches[1]); // Handle special characters
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
        console.error('Error downloading document:', error);
        showError('Error', 'No se pudo descargar el documento.');
    }
};

const getDocumentTypeText = tipo => {
    const types = {
        licencia: 'Licencia',
        seguro: 'Seguro',
        identificacion: 'Identificación',
        certificado_medico: 'Certificado Médico',
        registro_vehicular: 'Registro Vehicular',
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
watch([searchQuery, selectedDocumentType], () => {
    currentPage.value = 1;
});

// Lifecycle Hooks
onMounted(async () => {
    await listDocuments();
    await listDrivers();
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
