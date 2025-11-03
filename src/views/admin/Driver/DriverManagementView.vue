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
                        <UsersIcon class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Gestión de Conductores
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los conductores del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="openDriverModal()"
                    class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <UserPlusIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Nuevo Conductor</span>
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
                        placeholder="Buscar conductores..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedDriverStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                </select>
                <select
                    v-model="selectedLicenseStatus"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados de licencia</option>
                    <option value="vigente">Vigente</option>
                    <option value="suspendida">Suspendida</option>
                    <option value="vencida">Vencida</option>
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
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Conductor
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Contacto
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Licencia
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Estado de Licencia
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
                            v-for="driver in paginatedDrivers"
                            :key="driver.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <img
                                            v-if="driver.ruta_foto"
                                            :src="driver.ruta_foto"
                                            class="object-cover w-10 h-10 rounded-full"
                                            alt="Driver Photo"
                                        />
                                        <div
                                            v-else
                                            class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                        >
                                            <UserIcon class="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                        >
                                            {{ driver.user?.general_data?.nombre || 'N/A' }}
                                            {{ driver.user?.general_data?.apellido || '' }}
                                        </div>
                                        <div
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                        >
                                            ID:
                                            {{
                                                driver.user?.general_data?.documento_identidad ||
                                                'N/A'
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ driver.user?.email || 'N/A' }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    {{ driver.user?.general_data?.celular || 'N/A' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ driver.numero_licencia || 'N/A' }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    Vence: {{ formatDate(driver.vencimiento_licencia) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="getLicenseStatusClass(driver.estado_licencia)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    {{ driver.estado_licencia || 'N/A' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="getStatusClass(driver.estado)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    <CheckCircle2Icon
                                        v-if="driver.estado === 1"
                                        class="w-4 h-4 mr-1"
                                    />
                                    <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                    {{ getStatusText(driver.estado) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="sendByWhatsApp(driver)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Enviar por WhatsApp"
                                    >
                                        <MessageSquareIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openPasswordModal(driver)"
                                        class="p-2 text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                                        title="Cambiar Contraseña"
                                    >
                                        <LockIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openDriverModal(driver)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <!-- Botón de activar/desactivar -->
                                    <button
                                        v-if="driver.estado === 0"
                                        @click="handleActivateDriver(driver)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Activar conductor"
                                    >
                                        <PowerIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        v-else
                                        @click="handleDeactivateDriver(driver)"
                                        class="p-2 text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                                        title="Desactivar conductor"
                                    >
                                        <PowerIcon class="w-4 h-4" />
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
                v-for="driver in paginatedDrivers"
                :key="driver.id"
                class="p-4 transition-colors duration-200 border-l-4 border-yellow-500 shadow-lg rounded-xl sm:p-5"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12"
                        >
                            <img
                                v-if="driver.ruta_foto"
                                :src="driver.ruta_foto"
                                class="object-cover w-10 h-10 rounded-full sm:w-12 sm:h-12"
                                alt="Driver Photo"
                            />
                            <UserIcon
                                v-else
                                class="w-5 h-5 text-white rounded-full sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500"
                            />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ driver.user?.general_data?.nombre || 'N/A' }}
                                {{ driver.user?.general_data?.apellido || '' }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                ID: {{ driver.user?.general_data?.documento_identidad || 'N/A' }}
                            </p>
                        </div>
                    </div>
                    <span
                        :class="getStatusClass(driver.estado)"
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
                    >
                        <CheckCircle2Icon v-if="driver.estado === 1" class="w-3 h-3 mr-1" />
                        <XCircleIcon v-else class="w-3 h-3 mr-1" />
                        {{ getStatusText(driver.estado) }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <MailIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ driver.user?.email || 'N/A' }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <PhoneIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{
                            driver.user?.general_data?.celular || 'N/A'
                        }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <MapPinIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">
                            {{ driver.user?.general_data?.ciudad || 'N/A' }},
                            {{ driver.user?.general_data?.departamento || 'N/A' }}
                        </span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >Licencia: {{ driver.numero_licencia || 'N/A' }}</span
                        >
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >Vence: {{ formatDate(driver.vencimiento_licencia) }}</span
                        >
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CheckCircle2Icon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >Estado Licencia: {{ driver.estado_licencia || 'N/A' }}</span
                        >
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="sendByWhatsApp(driver)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Enviar por WhatsApp"
                    >
                        <MessageSquareIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openPasswordModal(driver)"
                        class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Cambiar Contraseña"
                    >
                        <LockIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openDriverModal(driver)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <!-- Botón de activar/desactivar -->
                    <button
                        v-if="driver.estado === 0"
                        @click="handleActivateDriver(driver)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Activar conductor"
                    >
                        <PowerIcon class="w-4 h-4" />
                    </button>
                    <button
                        v-else
                        @click="handleDeactivateDriver(driver)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Desactivar conductor"
                    >
                        <PowerIcon class="w-4 h-4" />
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
        <div v-if="paginatedDrivers.length === 0" class="py-8 text-center sm:py-12">
            <div
                class="p-6 transition-colors duration-200 shadow-lg rounded-xl sm:p-8"
                :class="
                    isDarkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                "
            >
                <UsersIcon class="w-12 h-12 mx-auto mb-4 text-gray-400 sm:w-16 sm:h-16" />
                <h3
                    class="mb-2 text-base font-medium transition-colors duration-200 sm:text-lg"
                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                    No se encontraron conductores
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>
        <!-- Driver Modal (Create/Edit) -->
        <div
            v-if="isDriverModalOpen"
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
                            {{ posicion ? 'Editar Conductor' : 'Nuevo Conductor' }}
                        </h2>
                        <button
                            @click="closeDriverModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveDriver" class="space-y-4 sm:space-y-6">
                        <!-- Driver Information -->
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <CarIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información de Licencia
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label
                                        for="modalUserId"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Usuario *
                                    </label>
                                    <select
                                        id="modalUserId"
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
                                            {{ user.general_data?.nombre || 'N/A' }}
                                            {{ user.general_data?.apellido || '' }}
                                        </option>
                                    </select>
                                    <p v-if="formErrors.user_id" class="mt-1 text-xs text-red-500">
                                        {{ formErrors.user_id }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-numero-licencia"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Número de Licencia *
                                    </label>
                                    <input
                                        id="modal-numero-licencia"
                                        v-model="formData.numero_licencia"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="LIC2844176823"
                                    />
                                    <p
                                        v-if="formErrors.numero_licencia"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.numero_licencia }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-vencimiento-licencia"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Vencimiento de Licencia *
                                    </label>
                                    <input
                                        id="modal-vencimiento-licencia"
                                        v-model="formData.vencimiento_licencia"
                                        type="date"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                    />
                                    <p
                                        v-if="formErrors.vencimiento_licencia"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.vencimiento_licencia }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-estado-licencia"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado de Licencia *
                                    </label>
                                    <select
                                        id="modal-estado-licencia"
                                        v-model="formData.estado_licencia"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="vigente">Vigente</option>
                                        <option value="suspendida">Suspendida</option>
                                        <option value="vencida">Vencida</option>
                                    </select>
                                    <p
                                        v-if="formErrors.estado_licencia"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.estado_licencia }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-clase-cdl"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Clase CDL *
                                    </label>
                                    <select
                                        id="modal-clase-cdl"
                                        v-model="formData.clase_cdl"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                    <p
                                        v-if="formErrors.clase_cdl"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.clase_cdl }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-tipo-licencia"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Tipo de Licencia *
                                    </label>
                                    <select
                                        id="modal-tipo-licencia"
                                        v-model="formData.tipo_licencia"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione un tipo de licencia</option>
                                        <option value="particular">Particular</option>
                                        <option value="profesional">Profesional</option>
                                    </select>
                                    <p
                                        v-if="formErrors.tipo_licencia"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.tipo_licencia }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-categoria"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Categoría *
                                    </label>
                                    <select
                                        id="modal-categoria"
                                        v-model="formData.categoria"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccione una categoría</option>
                                        <option value="primera">Primera</option>
                                        <option value="segunda">Segunda</option>
                                        <option value="tercera">Tercera</option>
                                    </select>
                                    <p
                                        v-if="formErrors.categoria"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.categoria }}
                                    </p>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-restricciones"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Restricciones
                                    </label>
                                    <input
                                        id="modal-restricciones"
                                        v-model="formData.restricciones"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="Ninguna"
                                    />
                                    <p
                                        v-if="formErrors.restricciones"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ formErrors.restricciones }}
                                    </p>
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
                                        placeholder="Sin observaciones"
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
                                        for="modal-foto"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Foto de Perfil
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
                                            class="object-contain h-30 w-35"
                                            alt="Photo Preview"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Driver Documents Section -->
                        <div
                            v-if="posicion"
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <FileTextIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Documentos del Conductor
                            </h3>
                            <div v-if="driverDocuments && driverDocuments.length > 0">
                                <div class="space-y-3 sm:space-y-4">
                                    <div
                                        v-for="doc in driverDocuments"
                                        :key="doc.id"
                                        class="p-3 transition-colors duration-200 border rounded-lg sm:p-4"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600'
                                                : 'bg-white border-gray-200'
                                        "
                                    >
                                        <div class="flex items-center justify-between mb-2">
                                            <h4
                                                class="text-sm font-medium transition-colors duration-200 sm:text-base"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ doc.nombre }}
                                            </h4>
                                            <span
                                                :class="getDocumentStatusClass(doc.aprobado)"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ getDocumentStatusText(doc.aprobado) }}
                                            </span>
                                        </div>
                                        <div
                                            class="text-xs transition-colors duration-200 sm:text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                        >
                                            <p>Tipo: {{ doc.tipo }}</p>
                                            <p>Vence: {{ formatDate(doc.fecha_vencimiento) }}</p>
                                            <p v-if="doc.observaciones">
                                                Observaciones: {{ doc.observaciones }}
                                            </p>
                                        </div>
                                        <div class="mt-2">
                                            <a
                                                :href="doc.archivo_url"
                                                target="_blank"
                                                class="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800"
                                            >
                                                <DownloadIcon class="w-3 h-3 mr-1" />
                                                Ver documento
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="py-4 text-center">
                                <p
                                    class="text-sm transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    No hay documentos registrados para este conductor.
                                </p>
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
                                @click="closeDriverModal"
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
                                <span v-if="isLoading">Guardando...</span>
                                <span v-else
                                    >{{ posicion ? 'Actualizar' : 'Crear' }} Conductor</span
                                >
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Password Change Modal -->
        <div
            v-if="isPasswordModalOpen"
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
                        <h2 class="text-lg font-bold text-black sm:text-xl">Cambiar Contraseña</h2>
                        <button
                            @click="closePasswordModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleUpdatePassword" class="space-y-4 sm:space-y-6">
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <LockIcon class="w-4 h-4 mr-2 text-purple-500 sm:w-5 sm:h-5" />
                                Nueva Contraseña
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label
                                        for="modal-password"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nueva Contraseña *
                                    </label>
                                    <input
                                        id="modal-password"
                                        v-model="passwordFormData.password"
                                        type="password"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="••••••••"
                                    />
                                    <p
                                        v-if="passwordFormErrors.password"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ passwordFormErrors.password }}
                                    </p>
                                </div>
                                <div>
                                    <label
                                        for="modal-password-confirmation"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Confirmar Nueva Contraseña *
                                    </label>
                                    <input
                                        id="modal-password-confirmation"
                                        v-model="passwordFormData.password_confirmation"
                                        type="password"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                        "
                                        placeholder="••••••••"
                                    />
                                    <p
                                        v-if="passwordFormErrors.password_confirmation"
                                        class="mt-1 text-xs text-red-500"
                                    >
                                        {{ passwordFormErrors.password_confirmation }}
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
                                @click="closePasswordModal"
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
                                class="w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 space-x-2 font-semibold text-black bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-sm sm:text-base touch-manipulation"
                            >
                                <span v-if="isLoading">Guardando...</span>
                                <span v-else>Actualizar Contraseña</span>
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
    activateDriver,
    createDriver,
    deactivateDriver,
    deleteDriver,
    indexDrivers,
    showDriver,
    updateDriver,
} from '@/services/DriverService';
import { indexUsers } from '@/services/UserService';
import {
    CalendarIcon,
    CarIcon,
    CheckCircle2Icon,
    DownloadIcon,
    EditIcon,
    FileTextIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    PowerIcon,
    SearchIcon,
    UserIcon,
    UserPlusIcon,
    UsersIcon,
    XCircleIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

// Initialize useAlert
const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();

// Constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

// State
const drivers = ref([]);
const users = ref([]);
const isDriverModalOpen = ref(false);
const isPasswordModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedDriverStatus = ref('');
const selectedLicenseStatus = ref('');
const posicion = ref(null);
const formData = ref({
    user_id: '',
    numero_licencia: '',
    vencimiento_licencia: '',
    estado_licencia: '',
    clase_cdl: '',
    tipo_licencia: '',
    restricciones: '',
    categoria: '',
    observaciones: '',
    foto: null,
});
const formErrors = ref({});
const passwordFormData = ref({
    user_id: null,
    password: '',
    password_confirmation: '',
});
const passwordFormErrors = ref({});
const photoPreview = ref(null);
const currentPage = ref(1);
const perPage = ref(15);
const totalPages = ref(1);
const driverDocuments = ref([]);

// Computed
const filteredDrivers = computed(() => {
    let filtered = drivers.value;

    if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
            driver =>
                (driver.user?.email || '').toLowerCase().includes(search) ||
                (driver.user?.general_data?.nombre || '').toLowerCase().includes(search) ||
                (driver.user?.general_data?.apellido || '').toLowerCase().includes(search) ||
                (driver.user?.general_data?.documento_identidad || '').includes(search) ||
                (driver.numero_licencia || '').toLowerCase().includes(search)
        );
    }

    // Filtro de estado
    if (selectedDriverStatus.value !== '') {
        const statusValue = selectedDriverStatus.value === 'activo' ? 1 : 0;
        filtered = filtered.filter(driver => driver.estado === statusValue);
    }

    if (selectedLicenseStatus.value) {
        filtered = filtered.filter(
            driver => (driver.estado_licencia || '').toLowerCase() === selectedLicenseStatus.value
        );
    }

    return filtered;
});

const paginatedDrivers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    totalPages.value = Math.ceil(filteredDrivers.value.length / perPage.value);
    return filteredDrivers.value.slice(start, end);
});

// Methods
const listDrivers = async () => {
    try {
        showLoading();
        const params = {};
        if (searchQuery.value) params.search = searchQuery.value;
        // Filtro de estado (enviar como 1/0)
        if (selectedDriverStatus.value !== '') {
            params.estado = selectedDriverStatus.value === 'activo' ? 1 : 0;
        }
        if (selectedLicenseStatus.value !== '') {
            params.estado_licencia = selectedLicenseStatus.value;
        }
        const { data } = await indexDrivers(params);
        drivers.value = data.datos;
    } catch (error) {
        console.error('Error listing drivers:', error);
        showError('Error', 'No se pudo cargar la lista de conductores.');
    } finally {
        closeLoading();
    }
};

const listUsers = async () => {
    try {
        const { data } = await indexUsers();
        console.log(data);
        users.value = data.data;
    } catch (error) {
        console.error('Error listing users:', error);
        showError('Error', 'No se pudo cargar la lista de usuarios.');
    }
};

const showDriverById = async driverId => {
    try {
        showLoading();
        const { data } = await showDriver(driverId);
        console.log(data);
        formData.value = {
            user_id: data.datos.user_id,
            numero_licencia: data.datos.numero_licencia || '',
            vencimiento_licencia: data.datos.vencimiento_licencia
                ? data.datos.vencimiento_licencia.split('T')[0]
                : '',
            estado_licencia: data.datos.estado_licencia || '',
            clase_cdl: data.datos.clase_cdl || '',
            tipo_licencia: data.datos.tipo_licencia || '',
            restricciones: data.datos.restricciones || '',
            categoria: data.datos.categoria || '',
            observaciones: data.datos.observaciones || '',
            foto: null,
        };
        photoPreview.value = data.datos.ruta_foto || null;
        driverDocuments.value = data.datos.documents || [];
        posicion.value = driverId;
        isDriverModalOpen.value = true;
        formErrors.value = {};
    } catch (error) {
        console.error('Error fetching driver:', error);
        showError('Error', 'No se pudo cargar la información del conductor.');
    } finally {
        closeLoading();
    }
};

const resetForm = () => {
    formData.value = {
        user_id: '',
        numero_licencia: '',
        vencimiento_licencia: '',
        estado_licencia: '',
        clase_cdl: '',
        tipo_licencia: '',
        restricciones: '',
        categoria: '',
        observaciones: '',
        foto: null,
    };
    photoPreview.value = null;
    driverDocuments.value = [];
    formErrors.value = {};
};

const resetPasswordForm = () => {
    passwordFormData.value = {
        user_id: null,
        password: '',
        password_confirmation: '',
    };
    passwordFormErrors.value = {};
};

const handlePhotoUpload = event => {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            formErrors.value.foto = `La imagen no debe superar los ${
                MAX_FILE_SIZE / (1024 * 1024)
            }MB.`;
            formData.value.foto = null;
            photoPreview.value = null;
            fileInput.value = ''; // Reset file input
            return;
        }
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            formErrors.value.foto = 'Formato de imagen no válido. Use JPEG, PNG o GIF.';
            formData.value.foto = null;
            photoPreview.value = null;
            fileInput.value = ''; // Reset file input
            return;
        }
        formData.value.foto = file;
        photoPreview.value = URL.createObjectURL(file);
        formErrors.value.foto = '';
    } else {
        formData.value.foto = null;
        photoPreview.value = null;
        formErrors.value.foto = '';
        fileInput.value = ''; // Reset file input
    }
};

const openDriverModal = (driver = null) => {
    resetForm();
    if (driver) {
        showDriverById(driver.id);
    } else {
        posicion.value = null;
        isDriverModalOpen.value = true;
    }
};

const openPasswordModal = driver => {
    resetPasswordForm();
    passwordFormData.value.user_id = driver.user_id;
    isPasswordModalOpen.value = true;
};

const closeDriverModal = () => {
    isDriverModalOpen.value = false;
    resetForm();
};

const closePasswordModal = () => {
    isPasswordModalOpen.value = false;
    resetPasswordForm();
};

const validateFormData = () => {
    formErrors.value = {};
    let isValid = true;

    if (!formData.value.user_id) {
        formErrors.value.user_id = 'Debe seleccionar un usuario.';
        isValid = false;
    }
    if (!formData.value.numero_licencia) {
        formErrors.value.numero_licencia = 'El número de licencia es obligatorio.';
        isValid = false;
    }
    if (!formData.value.vencimiento_licencia) {
        formErrors.value.vencimiento_licencia = 'La fecha de vencimiento es obligatoria.';
        isValid = false;
    }
    if (!formData.value.estado_licencia) {
        formErrors.value.estado_licencia = 'El estado de la licencia es obligatorio.';
        isValid = false;
    }
    if (!formData.value.clase_cdl) {
        formErrors.value.clase_cdl = 'La clase CDL es obligatoria.';
        isValid = false;
    }
    if (!formData.value.tipo_licencia) {
        formErrors.value.tipo_licencia = 'El tipo de licencia es obligatorio.';
        isValid = false;
    }
    if (!formData.value.categoria) {
        formErrors.value.categoria = 'La categoría es obligatoria.';
        isValid = false;
    }

    return isValid;
};

const handleSaveDriver = async () => {
    const { showLoading, closeLoading, showError, showSuccess } = useAlert(); // ✅ Agregar esta línea

    try {
        showLoading();
        isLoading.value = true;

        // Perform client-side validation
        if (!validateFormData()) {
            closeLoading(); // ✅ Cerrar loading antes de mostrar error
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
            return;
        }

        const data = new FormData();
        try {
            data.append('user_id', formData.value.user_id || '');
            data.append('numero_licencia', formData.value.numero_licencia || '');
            data.append('vencimiento_licencia', formData.value.vencimiento_licencia || '');
            data.append('estado_licencia', formData.value.estado_licencia || '');
            data.append('clase_cdl', formData.value.clase_cdl || '');
            data.append('tipo_licencia', formData.value.tipo_licencia || '');
            data.append('restricciones', formData.value.restricciones || '');
            data.append('categoria', formData.value.categoria || '');
            data.append('observaciones', formData.value.observaciones || '');
            if (formData.value.foto) {
                data.append('foto', formData.value.foto);
            }
            if (posicion.value) {
                data.append('_method', 'PUT');
            }
        } catch (error) {
            console.error('Error constructing FormData:', error);
            closeLoading(); // ✅ Cerrar loading antes de mostrar error
            showError('Error', 'Error al preparar los datos del formulario.');
            return;
        }

        if (posicion.value) {
            await updateDriver(posicion.value, data);
            showSuccess('Éxito', 'Conductor actualizado correctamente.');
        } else {
            await createDriver(data);
            showSuccess('Éxito', 'Conductor creado correctamente.');
        }

        await listDrivers();
        closeDriverModal();
    } catch (error) {
        console.error('Error saving driver:', error);
        if (error.response?.data?.errors) {
            formErrors.value = error.response.data.errors;
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
        } else {
            showError('Error', error.response?.data?.message || 'No se pudo guardar el conductor.');
        }
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};
const handleUpdatePassword = async () => {
    try {
        showLoading();
        isLoading.value = true;
        passwordFormErrors.value = {};

        // Client-side validation for immediate feedback
        if (!passwordFormData.value.password) {
            passwordFormErrors.value.password = 'La contraseña es obligatoria.';
            return;
        }
        if (!passwordFormData.value.password_confirmation) {
            passwordFormErrors.value.password_confirmation =
                'La confirmación de la contraseña es obligatoria.';
            return;
        }
        if (
            passwordFormData.value.password &&
            passwordFormData.value.password_confirmation &&
            passwordFormData.value.password !== passwordFormData.value.password_confirmation
        ) {
            passwordFormErrors.value.password_confirmation = 'Las contraseñas no coinciden.';
            return;
        }

        await updateDriverPassword(passwordFormData.value.user_id, {
            password: passwordFormData.value.password || '',
            password_confirmation: passwordFormData.value.password_confirmation || '',
        });

        showSuccess('Éxito', 'Contraseña actualizada correctamente.');
        closePasswordModal();
    } catch (error) {
        console.error('Error updating password:', error);
        if (error.response?.data?.errors) {
            passwordFormErrors.value = error.response.data.errors;
            showError('Error de Validación', 'Por favor, corrige los errores en el formulario.');
        } else {
            showError(
                'Error',
                error.response?.data?.message || 'No se pudo actualizar la contraseña.'
            );
        }
    } finally {
        isLoading.value = false;
        closeLoading();
    }
};

// Función para activar conductor
const handleActivateDriver = async driver => {
    try {
        showLoading();
        await activateDriver(driver.id);
        showSuccess('Éxito', 'Conductor activado correctamente.');
        await listDrivers();
    } catch (error) {
        console.error('Error activating driver:', error);
        showError('Error', error.response?.data?.message || 'No se pudo activar el conductor.');
    } finally {
        closeLoading();
    }
};

// Función para desactivar conductor
const handleDeactivateDriver = async driver => {
    try {
        showLoading();
        await deactivateDriver(driver.id);
        showSuccess('Éxito', 'Conductor desactivado correctamente.');
        await listDrivers();
    } catch (error) {
        console.error('Error deactivating driver:', error);
        showError('Error', error.response?.data?.message || 'No se pudo desactivar el conductor.');
    } finally {
        closeLoading();
    }
};

const confirmDelete = async driver => {
    try {
        console.log('Iniciando proceso de eliminación para el conductor:', driver.id);
        // Mostrar el diálogo de confirmación y esperar la respuesta
        const result = await showConfirm(
            'Confirmar Eliminación',
            `¿Estás seguro de que deseas eliminar al conductor "${
                driver.user?.general_data?.nombre || 'N/A'
            } ${driver.user?.general_data?.apellido || ''}"?`
        );
        console.log('Resultado de la confirmación:', result);
        // Verificar explícitamente si el usuario confirmó
        if (!result.isConfirmed) {
            console.log('Eliminación cancelada por el usuario');
            return;
        }
        // Si el usuario confirmó, procedemos con la eliminación
        console.log('Procediendo con la eliminación del conductor:', driver.id);
        showLoading();
        await deleteDriver(driver.id);
        showSuccess('Éxito', 'Conductor eliminado correctamente.');
        await listDrivers();
    } catch (error) {
        console.error('Error deleting driver:', error);
        showError('Error', error.response?.data?.message || 'No se pudo eliminar el conductor.');
    } finally {
        closeLoading();
    }
};

const sendByWhatsApp = driver => {
    const message = `Hola ${
        driver.user?.general_data?.nombre || 'Conductor'
    }, te contactamos desde el sistema de gestión de conductores.`;
    const phone = (driver.user?.general_data?.celular || '')
        .replace(/\s/g, '')
        .replace(/[^0-9+]/g, ''); // Sanitize phone number
    if (!phone) {
        showError('Error', 'El conductor no tiene un número de teléfono registrado.');
        return;
    }
    const url = `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

const getStatusClass = status => {
    return status === 1
        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
        : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
};

const getStatusText = status => {
    return status === 1 ? 'Activo' : 'Inactivo';
};

const getLicenseStatusClass = status => {
    switch (status) {
        case 'vigente':
            return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
        case 'suspendida':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
        case 'vencida':
            return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
};

const getDocumentStatusClass = status => {
    return status === 1
        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
};

const getDocumentStatusText = status => {
    return status === 1 ? 'Aprobado' : 'Pendiente';
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
// Modificar el watcher para recargar datos cuando cambien los filtros
watch([searchQuery, selectedDriverStatus, selectedLicenseStatus], () => {
    currentPage.value = 1;
    listDrivers(); // Recargar datos con los nuevos filtros
});

// Lifecycle Hooks
onMounted(async () => {
    await listDrivers();
    await listUsers();
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
