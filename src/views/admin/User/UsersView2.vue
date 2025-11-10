<template>
    <div
        class="w-full min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
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
                            Gestión de Usuarios
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Administra los usuarios del sistema
                        </p>
                    </div>
                </div>
                <button
                    @click="openUserModal()"
                    class="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <UserPlusIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Nuevo Usuario</span>
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
                        placeholder="Buscar usuarios..."
                        class="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                        :class="
                            isDarkMode
                                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        "
                    />
                </div>
                <select
                    v-model="selectedUserType"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los estados</option>
                    <option :value="1">Activos</option>
                    <option :value="0">Inactivos</option>
                </select>
                <!-- Nuevo filtro por rol -->
                <select
                    v-model="selectedRole"
                    class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                    :class="
                        isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                    "
                >
                    <option value="">Todos los roles</option>
                    <option v-for="role in roles" :key="role.id" :value="role.name">
                        {{ role.name }}
                    </option>
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
                                Usuario
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Contacto
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-medium tracking-wider text-left text-black uppercase"
                            >
                                Ubicación
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
                            v-for="user in users"
                            :key="user.id"
                            class="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 w-10 h-10">
                                        <div
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
                                            {{ user.general_data.nombre }}
                                            {{ user.general_data.apellido }}
                                        </div>
                                        <div
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                        >
                                            ID: {{ user.general_data.documento_identidad }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ user.email }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    {{ user.general_data.celular }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    {{ user.general_data.ciudad }}
                                </div>
                                <div
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-500'"
                                >
                                    {{ user.general_data.departamento }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    :class="getStatusClass(user.estado)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    <CheckCircle2Icon
                                        v-if="user.estado === 1"
                                        class="w-4 h-4 mr-1"
                                    />
                                    <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                    {{ getStatusText(user.estado) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="openCompleteInfoModal(user.id)"
                                        class="p-2 text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                                        title="Ver información completa"
                                    >
                                        <InfoIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="sendByWhatsApp(user)"
                                        class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                        title="Enviar por WhatsApp"
                                    >
                                        <MessageSquareIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openPasswordModal(user.id)"
                                        class="p-2 text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                                        title="Cambiar Contraseña"
                                    >
                                        <LockIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="openUserModal(user)"
                                        class="p-2 text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                                        title="Editar"
                                    >
                                        <EditIcon class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="confirmDelete(user)"
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
                v-for="user in users"
                :key="user.id"
                class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl sm:p-5 border-gradient-to-b from-yellow-400 to-orange-500"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'"
            >
                <div class="flex items-start justify-between mb-3 sm:mb-4">
                    <div class="flex items-center flex-1 min-w-0 space-x-3">
                        <div
                            class="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-500"
                        >
                            <UserIcon class="w-5 h-5 text-white sm:w-6 sm:h-6" />
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3
                                class="text-base font-semibold truncate transition-colors duration-200 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                {{ user.general_data.nombre }} {{ user.general_data.apellido }}
                            </h3>
                            <p
                                class="text-xs truncate transition-colors duration-200 sm:text-sm"
                                :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                            >
                                ID: {{ user.general_data.documento_identidad }}
                            </p>
                        </div>
                    </div>
                    <span
                        :class="getStatusClass(user.estado)"
                        class="inline-flex items-center flex-shrink-0 px-2 py-1 ml-2 text-xs font-medium rounded-full"
                    >
                        <CheckCircle2Icon v-if="user.estado === 1" class="w-3 h-3 mr-1" />
                        <XCircleIcon v-else class="w-3 h-3 mr-1" />
                        {{ getStatusText(user.estado) }}
                    </span>
                </div>
                <div class="mb-4 space-y-2 sm:space-y-3">
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <MailIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ user.email }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <PhoneIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ user.general_data.celular }}</span>
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <MapPinIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate"
                            >{{ user.general_data.ciudad }},
                            {{ user.general_data.departamento }}</span
                        >
                    </div>
                    <div
                        class="flex items-center text-xs transition-colors duration-200 sm:text-sm"
                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                    >
                        <CalendarIcon class="flex-shrink-0 w-4 h-4 mr-3 text-gray-400" />
                        <span class="truncate">{{ formatDate(user.created_at) }}</span>
                    </div>
                </div>
                <div
                    class="flex items-center justify-end pt-3 space-x-2 transition-colors duration-200 border-t sm:pt-4"
                    :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'"
                >
                    <button
                        @click="openCompleteInfoModal(user.id)"
                        class="p-2.5 sm:p-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Ver información completa"
                    >
                        <InfoIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="sendByWhatsApp(user)"
                        class="p-2.5 sm:p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Enviar por WhatsApp"
                    >
                        <MessageSquareIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openPasswordModal(user)"
                        class="p-2.5 sm:p-3 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Cambiar Contraseña"
                    >
                        <LockIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="openUserModal(user)"
                        class="p-2.5 sm:p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Editar"
                    >
                        <EditIcon class="w-4 h-4" />
                    </button>
                    <button
                        @click="confirmDelete(user)"
                        class="p-2.5 sm:p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 touch-manipulation transform hover:scale-105"
                        title="Eliminar"
                    >
                        <TrashIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <!-- Empty State -->
        <div v-if="users.length === 0" class="py-8 text-center sm:py-12">
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
                    No se encontraron usuarios
                </h3>
                <p
                    class="text-sm transition-colors duration-200 sm:text-base"
                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                >
                    Intenta con diferentes filtros de búsqueda
                </p>
            </div>
        </div>
        <!-- Pagination -->
        <div
            v-if="pagination.total_pages > 1"
            class="flex flex-col items-center justify-between px-4 py-3 mt-4 space-y-3 sm:space-y-0 sm:flex-row sm:px-6"
            :class="
                isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
            "
        >
            <div class="flex items-center justify-center flex-1">
                <div>
                    <p class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                        Mostrando
                        <span class="font-medium">{{ pagination.from }}</span>
                        a
                        <span class="font-medium">{{ pagination.to }}</span>
                        de
                        <span class="font-medium">{{ pagination.total }}</span>
                        resultados
                    </p>
                </div>
            </div>
            <div>
                <nav
                    class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <button
                        @click="changePage(pagination.current_page - 1)"
                        :disabled="pagination.current_page === 1"
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium border rounded-l-md focus:z-20 disabled:opacity-50"
                        :class="
                            isDarkMode
                                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        "
                    >
                        <span class="sr-only">Anterior</span>
                        <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                        v-for="page in paginationPages"
                        :key="page"
                        @click="changePage(page)"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium border focus:z-20"
                        :class="
                            page === pagination.current_page
                                ? 'z-10 bg-yellow-500 border-yellow-500 text-black'
                                : isDarkMode
                                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        "
                    >
                        {{ page }}
                    </button>
                    <button
                        @click="changePage(pagination.current_page + 1)"
                        :disabled="!pagination.has_more_pages"
                        class="relative inline-flex items-center px-2 py-2 text-sm font-medium border rounded-r-md focus:z-20 disabled:opacity-50"
                        :class="
                            isDarkMode
                                ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        "
                    >
                        <span class="sr-only">Siguiente</span>
                        <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
        <!-- User Modal (Create/Edit) -->
        <div
            v-if="isUserModalOpen"
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
                            {{ posicion ? 'Editar Usuario' : 'Nuevo Usuario' }}
                        </h2>
                        <button
                            @click="closeUserModal"
                            class="p-1.5 sm:p-2 text-black hover:text-gray-700 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6">
                    <form @submit.prevent="handleSaveUser" class="space-y-4 sm:space-y-6">
                        <!-- Account Information -->
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <UserIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información de Cuenta
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div class="sm:col-span-2 md:col-span-1">
                                    <label
                                        for="modal-email"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        id="modal-email"
                                        v-model="formData.email"
                                        type="email"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="usuario@ejemplo.com"
                                    />
                                </div>
                                <div v-if="!posicion" class="sm:col-span-2 md:col-span-1">
                                    <label
                                        for="modal-password"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Contraseña *
                                    </label>
                                    <input
                                        id="modal-password"
                                        v-model="formData.password"
                                        type="password"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div v-if="!posicion" class="sm:col-span-2 md:col-span-1">
                                    <label
                                        for="modal-password-confirmation"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Confirmar Contraseña *
                                    </label>
                                    <input
                                        id="modal-password-confirmation"
                                        v-model="formData.password_confirmation"
                                        type="password"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Roles * (Selecciona al menos uno)
                                    </label>
                                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                                        <label
                                            v-for="role in roles"
                                            :key="role.id"
                                            class="flex items-center p-2 transition-colors duration-200 rounded-lg cursor-pointer"
                                            :class="
                                                isDarkMode
                                                    ? 'bg-gray-800 hover:bg-gray-700'
                                                    : 'bg-white hover:bg-gray-50'
                                            "
                                        >
                                            <input
                                                type="checkbox"
                                                :value="role.name"
                                                v-model="formData.roles"
                                                class="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                                :class="
                                                    isDarkMode
                                                        ? 'bg-gray-700 border-gray-600'
                                                        : 'bg-white border-gray-300'
                                                "
                                            />
                                            <span
                                                class="ml-2 text-sm transition-colors duration-200"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                "
                                            >
                                                {{ role.name }}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="sm:col-span-2 md:col-span-1">
                                    <label
                                        for="modal-estado"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Estado
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
                                        <option :value="1">Activo</option>
                                        <option :value="0">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- Personal Information -->
                        <div
                            class="p-4 transition-colors duration-200 sm:p-6 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <UserIcon class="w-4 h-4 mr-2 text-yellow-500 sm:w-5 sm:h-5" />
                                Información Personal
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label
                                        for="modal-nombre"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre *
                                    </label>
                                    <input
                                        id="modal-nombre"
                                        v-model="formData.general_data.nombre"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Juan"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="modal-apellido"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Apellido *
                                    </label>
                                    <input
                                        id="modal-apellido"
                                        v-model="formData.general_data.apellido"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Pérez"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="modal-documento"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Documento de Identidad *
                                    </label>
                                    <input
                                        id="modal-documento"
                                        v-model="formData.general_data.documento_identidad"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="12345678"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="modal-celular"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Teléfono *
                                    </label>
                                    <input
                                        id="modal-celular"
                                        v-model="formData.general_data.celular"
                                        type="tel"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="+51 999 888 777"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="modal-ciudad"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Ciudad *
                                    </label>
                                    <input
                                        id="modal-ciudad"
                                        v-model="formData.general_data.ciudad"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Lima"
                                    />
                                </div>
                                <div>
                                    <label
                                        for="modal-departamento"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Departamento *
                                    </label>
                                    <input
                                        id="modal-departamento"
                                        v-model="formData.general_data.departamento"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Lima Metropolitana"
                                    />
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        for="modal-direccion"
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Dirección *
                                    </label>
                                    <input
                                        id="modal-direccion"
                                        v-model="formData.general_data.direccion"
                                        type="text"
                                        class="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="Av. Principal 123, Lima"
                                    />
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
                                @click="closeUserModal"
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
                                <span v-else>{{ posicion ? 'Actualizar' : 'Crear' }} Usuario</span>
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
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="••••••••"
                                    />
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
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="••••••••"
                                    />
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
        <!-- Complete User Info Modal -->
        <div
            v-if="isCompleteInfoModalOpen"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Información Completa del Usuario
                        </h2>
                        <button
                            @click="closeCompleteInfoModal"
                            class="p-1.5 sm:p-2 text-white hover:text-gray-200 transition-colors duration-200 touch-manipulation"
                        >
                            <XIcon class="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>
                <!-- Modal Body -->
                <div class="p-4 sm:p-6" v-if="completeUserData">
                    <!-- Información de la cuenta -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 sm:p-6 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <UserIcon class="w-4 h-4 mr-2 text-indigo-500 sm:w-5 sm:h-5" />
                            Información de la Cuenta
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    ID de Usuario
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.id }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Email
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.email }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado
                                </p>
                                <span
                                    :class="getStatusClass(completeUserData.estado)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    <CheckCircle2Icon
                                        v-if="completeUserData.estado === 1"
                                        class="w-4 h-4 mr-1"
                                    />
                                    <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                    {{ getStatusText(completeUserData.estado) }}
                                </span>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Roles
                                </p>
                                <div class="flex flex-wrap gap-1 mt-1">
                                    <span
                                        v-for="role in completeUserData.roles"
                                        :key="role.id"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                        {{ role.name }}
                                    </span>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Permisos
                                </p>
                                <div class="flex flex-wrap gap-1 mt-1">
                                    <span
                                        v-for="permission in completeUserData.permissions"
                                        :key="permission.id"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                    >
                                        {{ permission.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Información Personal -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 sm:p-6 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        v-if="completeUserData.general_data"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <UserIcon class="w-4 h-4 mr-2 text-indigo-500 sm:w-5 sm:h-5" />
                            Información Personal
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Nombre
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.nombre }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Apellido
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.apellido }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Documento de Identidad
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.documento_identidad }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Celular
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.celular }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Fecha de Nacimiento
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{
                                        completeUserData.general_data.nacimiento
                                            ? formatDate(completeUserData.general_data.nacimiento)
                                            : 'No especificado'
                                    }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Género
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.genero || 'No especificado' }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Ciudad
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.ciudad }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Departamento
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.departamento }}
                                </p>
                            </div>
                            <div class="sm:col-span-2">
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Dirección
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.direccion }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Código Postal
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{
                                        completeUserData.general_data.codigo_postal ||
                                        'No especificado'
                                    }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Contacto de Emergencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{
                                        completeUserData.general_data.contacto_emergencia_nombre ||
                                        'No especificado'
                                    }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Teléfono de Emergencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{
                                        completeUserData.general_data
                                            .contacto_emergencia_telefono || 'No especificado'
                                    }}
                                </p>
                            </div>
                            <div class="sm:col-span-2">
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Notas
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.general_data.notas || 'No hay notas' }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- Información de Conductor -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 sm:p-6 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        v-if="completeUserData.driver"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <UserIcon class="w-4 h-4 mr-2 text-indigo-500 sm:w-5 sm:h-5" />
                            Información de Conductor
                        </h3>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Número de Licencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.numero_licencia }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Vencimiento de Licencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ formatDate(completeUserData.driver.vencimiento_licencia) }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado de Licencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.estado_licencia }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Clase CDL
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.clase_cdl }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Tipo de Licencia
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.tipo_licencia }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Restricciones
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.restricciones || 'Ninguna' }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Categoría
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{ completeUserData.driver.categoria }}
                                </p>
                            </div>
                            <div>
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado
                                </p>
                                <span
                                    :class="getStatusClass(completeUserData.driver.estado)"
                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                >
                                    <CheckCircle2Icon
                                        v-if="completeUserData.driver.estado === 1"
                                        class="w-4 h-4 mr-1"
                                    />
                                    <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                    {{ getStatusText(completeUserData.driver.estado) }}
                                </span>
                            </div>
                            <div class="sm:col-span-2">
                                <p
                                    class="text-sm font-medium"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Observaciones
                                </p>
                                <p
                                    class="text-sm"
                                    :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                >
                                    {{
                                        completeUserData.driver.observaciones ||
                                        'No hay observaciones'
                                    }}
                                </p>
                            </div>
                        </div>
                        <!-- Documentos del Conductor -->
                        <div class="mt-4">
                            <h4
                                class="mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Documentos del Conductor
                            </h4>
                            <div
                                class="overflow-hidden border rounded-lg"
                                :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'"
                            >
                                <table
                                    class="min-w-full divide-y"
                                    :class="isDarkMode ? 'divide-gray-600' : 'divide-gray-200'"
                                >
                                    <thead class="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                            >
                                                Tipo
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                            >
                                                Nombre
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                            >
                                                Vencimiento
                                            </th>
                                            <th
                                                class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                            >
                                                Estado
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody
                                        class="divide-y"
                                        :class="
                                            isDarkMode
                                                ? 'divide-gray-600 bg-gray-800'
                                                : 'divide-gray-200 bg-white'
                                        "
                                    >
                                        <tr
                                            v-for="document in completeUserData.driver.documents"
                                            :key="document.id"
                                        >
                                            <td
                                                class="px-4 py-2 text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ document.tipo }}
                                            </td>
                                            <td
                                                class="px-4 py-2 text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ document.nombre }}
                                            </td>
                                            <td
                                                class="px-4 py-2 text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                                                "
                                            >
                                                {{ formatDate(document.fecha_vencimiento) }}
                                            </td>
                                            <td class="px-4 py-2 text-sm">
                                                <span
                                                    :class="
                                                        document.aprobado
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    "
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                >
                                                    {{
                                                        document.aprobado ? 'Aprobado' : 'Pendiente'
                                                    }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- Información de Vehículos -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 sm:p-6 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        v-if="completeUserData.vehicles && completeUserData.vehicles.length > 0"
                    >
                        <h3
                            class="flex items-center mb-3 text-base font-semibold transition-colors duration-200 sm:mb-4 sm:text-lg"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            <CarIcon class="w-4 h-4 mr-2 text-indigo-500 sm:w-5 sm:h-5" />
                            Vehículos Asociados
                        </h3>
                        <div class="space-y-4">
                            <div
                                v-for="vehicle in completeUserData.vehicles"
                                :key="vehicle.id"
                                class="p-4 transition-colors duration-200 border rounded-lg"
                                :class="
                                    isDarkMode
                                        ? 'border-gray-600 bg-gray-800'
                                        : 'border-gray-200 bg-white'
                                "
                            >
                                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            VIN
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.numero_vin }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Marca
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.marca }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Modelo
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.modelo }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Año
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.año }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Placa
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.numero_placa }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Tipo de Vehículo
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.tipo_vehiculo }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Tipo de Propiedad
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.tipo_propiedad }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Millaje
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.millaje }}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Estado
                                        </p>
                                        <span
                                            :class="getStatusClass(vehicle.estado)"
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        >
                                            <CheckCircle2Icon
                                                v-if="vehicle.estado === 1"
                                                class="w-4 h-4 mr-1"
                                            />
                                            <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                            {{ getStatusText(vehicle.estado) }}
                                        </span>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <p
                                            class="text-sm font-medium"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                        >
                                            Negocio
                                        </p>
                                        <p
                                            class="text-sm"
                                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
                                        >
                                            {{ vehicle.negocio.nombre }}
                                        </p>
                                    </div>
                                </div>
                                <!-- Documentos del Vehículo -->
                                <div class="mt-4">
                                    <h4
                                        class="mb-3 text-base font-semibold transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Documentos del Vehículo
                                    </h4>
                                    <div
                                        class="overflow-hidden border rounded-lg"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'"
                                    >
                                        <table
                                            class="min-w-full divide-y"
                                            :class="
                                                isDarkMode ? 'divide-gray-600' : 'divide-gray-200'
                                            "
                                        >
                                            <thead class="bg-gray-100 dark:bg-gray-700">
                                                <tr>
                                                    <th
                                                        class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                                    >
                                                        Tipo
                                                    </th>
                                                    <th
                                                        class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                                    >
                                                        Nombre
                                                    </th>
                                                    <th
                                                        class="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-300"
                                                    >
                                                        Vencimiento
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody
                                                class="divide-y"
                                                :class="
                                                    isDarkMode
                                                        ? 'divide-gray-600 bg-gray-800'
                                                        : 'divide-gray-200 bg-white'
                                                "
                                            >
                                                <tr
                                                    v-for="document in vehicle.documents"
                                                    :key="document.id"
                                                >
                                                    <td
                                                        class="px-4 py-2 text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ document.tipo }}
                                                    </td>
                                                    <td
                                                        class="px-4 py-2 text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ document.nombre }}
                                                    </td>
                                                    <td
                                                        class="px-4 py-2 text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ formatDate(document.fecha_vencimiento) }}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Footer -->
                    <div
                        class="sticky bottom-0 flex justify-end pt-4 transition-colors duration-200 border-t sm:pt-6"
                        :class="
                            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        "
                    >
                        <button
                            type="button"
                            @click="closeCompleteInfoModal"
                            class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border rounded-lg transition-colors duration-200 touch-manipulation"
                            :class="
                                isDarkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            "
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
import { isDarkMode } from '@/composables/useDarkMode';
import { indexRoles } from '@/services/RolesAndPermissionsService';
import {
    createUser,
    getUserWithPassword,
    indexUsers,
    infoUserComplete,
    showUsers,
    updatePassword,
    updateUser,
} from '@/services/UserService';
import {
    CalendarIcon,
    CarIcon,
    CheckCircle2Icon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EditIcon,
    InfoIcon,
    LockIcon,
    MailIcon,
    MapPinIcon,
    MessageSquareIcon,
    PhoneIcon,
    SearchIcon,
    TrashIcon,
    UserIcon,
    UserPlusIcon,
    UsersIcon,
    XCircleIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref, watch } from 'vue';
// Initialize useAlert
const { showSuccess, showError, showValidationErrors, showConfirm, showLoading, closeLoading } =
    useAlert();
// State
const users = ref([]);
const roles = ref([]);
const isUserModalOpen = ref(false);
const isPasswordModalOpen = ref(false);
const isCompleteInfoModalOpen = ref(false);
const isLoading = ref(false);
const searchQuery = ref('');
const selectedUserType = ref('');
const selectedRole = ref('');
const posicion = ref(null);
const lastCreatedUser = ref(null); // Store last created user for WhatsApp
const completeUserData = ref(null); // Store complete user data for modal
const pagination = ref({
    total: 0,
    count: 0,
    per_page: 10,
    current_page: 1,
    total_pages: 1,
    has_more_pages: false,
    next_page_url: null,
    prev_page_url: null,
    from: 0,
    to: 0,
});
const formData = ref({
    id: null,
    email: '',
    password: '',
    password_confirmation: '',
    estado: 1,
    roles: [],
    general_data: {
        nombre: '',
        apellido: '',
        documento_identidad: '',
        celular: '',
        ciudad: '',
        departamento: '',
        direccion: '',
        nacimiento: null,
        genero: null,
        codigo_postal: null,
        contacto_emergencia_nombre: null,
        contacto_emergencia_telefono: null,
        notas: null,
    },
});
const passwordFormData = ref({
    userId: null,
    password: '',
    password_confirmation: '',
});
// Computed
const paginationPages = computed(() => {
    const pages = [];
    const current = pagination.value.current_page;
    const last = pagination.value.total_pages;
    // Si hay 7 páginas o menos, mostrar todas
    if (last <= 7) {
        for (let i = 1; i <= last; i++) {
            pages.push(i);
        }
    } else {
        // Si hay más de 7 páginas, mostrar un rango alrededor de la página actual
        if (current <= 4) {
            // Cuando estamos cerca del inicio
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(last);
        } else if (current >= last - 3) {
            // Cuando estamos cerca del final
            pages.push(1);
            pages.push('...');
            for (let i = last - 4; i <= last; i++) {
                pages.push(i);
            }
        } else {
            // Cuando estamos en el medio
            pages.push(1);
            pages.push('...');
            for (let i = current - 1; i <= current + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(last);
        }
    }
    return pages;
});
// Methods
const listUsers = async (page = 1) => {
    try {
        // Preparamos los parámetros para enviar al backend
        const params = {
            page,
            per_page: pagination.value.per_page,
        };
        if (searchQuery.value) {
            params.search = searchQuery.value;
        }
        if (selectedUserType.value !== '') {
            params.estado = selectedUserType.value;
        }
        if (selectedRole.value !== '') {
            params.rol = selectedRole.value;
        }
        const { data } = await indexUsers(params);
        users.value = data.data;
        pagination.value = {
            total: data.pagination.total,
            count: data.pagination.count,
            per_page: data.pagination.per_page,
            current_page: data.pagination.current_page,
            total_pages: data.pagination.total_pages,
            has_more_pages: data.pagination.has_more_pages,
            next_page_url: data.pagination.next_page_url,
            prev_page_url: data.pagination.prev_page_url,
            from: (data.pagination.current_page - 1) * data.pagination.per_page + 1,
            to: Math.min(
                data.pagination.current_page * data.pagination.per_page,
                data.pagination.total
            ),
        };
    } catch (error) {
        console.log(error);
    }
};
const listRoles = async () => {
    try {
        const { data } = await indexRoles();
        roles.value = data.data;
    } catch (error) {
        console.log(error);
    }
};
const resetForm = () => {
    formData.value = {
        id: null,
        email: '',
        password: '',
        password_confirmation: '',
        estado: 1,
        roles: [],
        general_data: {
            nombre: '',
            apellido: '',
            documento_identidad: '',
            celular: '',
            ciudad: '',
            departamento: '',
            direccion: '',
            nacimiento: null,
            genero: null,
            codigo_postal: null,
            contacto_emergencia_nombre: null,
            contacto_emergencia_telefono: null,
            notas: null,
        },
    };
};
const resetPasswordForm = () => {
    passwordFormData.value = {
        userId: null,
        password: '',
        password_confirmation: '',
    };
};
const openUserModal = (user = null) => {
    resetForm();
    if (user) {
        showUser(user.id);
    } else {
        posicion.value = null;
        isUserModalOpen.value = true;
    }
};
const openPasswordModal = userID => {
    resetPasswordForm();
    passwordFormData.value.userId = userID;
    isPasswordModalOpen.value = true;
};
const openCompleteInfoModal = async userId => {
    try {
        const { data } = await infoUserComplete(userId);
        console.log(data);
        completeUserData.value = data.data;
        isCompleteInfoModalOpen.value = true;
    } catch (error) {
        console.error('Error al obtener datos completos del usuario:', error);
        showError('Error', 'No se pudieron cargar los datos completos del usuario.');
    }
};
const closeCompleteInfoModal = () => {
    isCompleteInfoModalOpen.value = false;
    completeUserData.value = null;
};
const showUser = async userID => {
    resetForm();
    try {
        const { data } = await showUsers(userID);
        // Extraer solo los nombres de los roles
        const roleNames = data.data.roles.map(role => role.name);
        formData.value = {
            id: data.data.id,
            email: data.data.email,
            password: '',
            password_confirmation: '',
            estado: data.data.estado,
            roles: roleNames,
            general_data: {
                nombre: data.data.general_data.nombre,
                apellido: data.data.general_data.apellido,
                documento_identidad: data.data.general_data.documento_identidad,
                celular: data.data.general_data.celular,
                ciudad: data.data.general_data.ciudad,
                departamento: data.data.general_data.departamento,
                direccion: data.data.general_data.direccion,
                nacimiento: data.data.general_data.nacimiento,
                genero: data.data.general_data.genero,
                codigo_postal: data.data.general_data.codigo_postal,
                contacto_emergencia_nombre: data.data.general_data.contacto_emergencia_nombre,
                contacto_emergencia_telefono: data.data.general_data.contacto_emergencia_telefono,
                notas: data.data.general_data.notas,
            },
        };
        posicion.value = userID;
        isUserModalOpen.value = true;
    } catch (error) {
        console.log(error);
    }
};
const closeUserModal = () => {
    isUserModalOpen.value = false;
    resetForm();
};
const closePasswordModal = () => {
    isPasswordModalOpen.value = false;
    resetPasswordForm();
};
const handleSaveUser = async () => {
    try {
        isLoading.value = true;
        showLoading(formData.value.id ? 'Actualizando usuario...' : 'Guardando usuario...');
        if (posicion.value != null) {
            // Editing user: exclude password fields
            const { password, password_confirmation, ...updateData } = formData.value;
            const { data } = await updateUser(posicion.value, updateData);
            closeLoading();
            await showSuccess(
                '¡Usuario actualizado!',
                'Los datos del usuario han sido actualizados correctamente.'
            );
        } else {
            // Creating user: include password fields
            const { data } = await createUser(formData.value);
            lastCreatedUser.value = {
                ...formData.value,
                id: data.data.id,
            };
            closeLoading();
            await showSuccess('¡Usuario creado!', 'El nuevo usuario ha sido creado correctamente.');
        }
        await listUsers(pagination.value.current_page);
        closeUserModal();
    } catch (error) {
        closeLoading();
        if (error.response?.status === 422) {
            await showValidationErrors(error.response.data.errors);
        } else {
            await showError(
                'Error',
                'Ha ocurrido un error al guardar el usuario. Por favor, inténtalo de nuevo.'
            );
        }
    } finally {
        isLoading.value = false;
    }
};
const handleUpdatePassword = async () => {
    try {
        isLoading.value = true;
        showLoading('Actualizando contraseña...');
        const { data } = await updatePassword(
            passwordFormData.value.userId,
            passwordFormData.value
        );
        console.log(data);
        closeLoading();
        await showSuccess(
            '¡Contraseña actualizada!',
            'La contraseña ha sido actualizada correctamente.'
        );
        closePasswordModal();
    } catch (error) {
        closeLoading();
        if (error.response?.status === 422) {
            await showValidationErrors(error.response.data.errors);
        } else {
            await showError(
                'Error',
                'Ha ocurrido un error al actualizar la contraseña. Por favor, inténtalo de nuevo.'
            );
        }
    } finally {
        isLoading.value = false;
    }
};
const confirmDelete = async user => {
    try {
        const result = await showConfirm(
            '¿Eliminar usuario?',
            'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este usuario?'
        );
        if (result.isConfirmed) {
            deleteUser(user);
        }
    } catch (error) {
        console.log(error);
    }
};
const deleteUser = async user => {
    try {
        showLoading('Eliminando usuario...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        users.value = users.value.filter(u => u.id !== user.id);
        closeLoading();
        await showSuccess('¡Usuario eliminado!', 'El usuario ha sido eliminado correctamente.');
        // Si la página actual queda vacía después de eliminar, ir a la página anterior
        if (users.value.length === 0 && pagination.value.current_page > 1) {
            await listUsers(pagination.value.current_page - 1);
        } else {
            await listUsers(pagination.value.current_page);
        }
    } catch (error) {
        closeLoading();
        await showError(
            'Error',
            'Ha ocurrido un error al eliminar el usuario. Por favor, inténtalo de nuevo.'
        );
    }
};
const sendByWhatsApp = async user => {
    try {
        // Obtener el número de teléfono del usuario
        const phoneNumber = user.general_data.celular.replace(/[^0-9]/g, '');

        // Obtener los datos completos del usuario incluyendo la contraseña
        let userPassword = '';
        if (lastCreatedUser.value && lastCreatedUser.value.id === user.id) {
            // Si es un usuario recién creado, usar la contraseña del formulario
            userPassword = lastCreatedUser.value.password;
        } else {
            // Para usuarios existentes, obtener la contraseña del backend
            try {
                const { data } = await getUserWithPassword(user.id);
                // Nota: La contraseña estará hasheada, no podemos mostrarla en texto plano
                // Por lo tanto, no la incluiremos en el mensaje para usuarios existentes
                userPassword = '';
            } catch (error) {
                console.error('Error al obtener la contraseña del usuario:', error);
            }
        }

        let message = `Hola ${user.general_data.nombre}, te contactamos desde Logística.\n\n`;

        // Agregar datos del usuario
        message += `Tus datos registrados:\n`;
        message += `Nombre completo: ${user.general_data.nombre} ${user.general_data.apellido}\n`;
        message += `Documento de identidad: ${user.general_data.documento_identidad}\n`;
        message += `Celular: ${user.general_data.celular}\n`;
        message += `Ciudad: ${user.general_data.ciudad}\n`;
        message += `Departamento: ${user.general_data.departamento}\n`;
        message += `Dirección: ${user.general_data.direccion}\n`;

        // Agregar credenciales de acceso
        message += `\nTus credenciales de acceso:\n`;
        message += `Email: ${user.email}\n`;

        if (userPassword) {
            // Solo mostrar la contraseña si está disponible (usuarios recién creados)
            message += `Contraseña: ${userPassword}\n`;
        } else {
            // Para usuarios existentes, no mostrar la contraseña hasheada
            message += `Contraseña: [La contraseña no se puede mostrar por seguridad]\n`;
        }

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        // Limpiar lastCreatedUser después de enviar para evitar reutilizar datos antiguos
        if (lastCreatedUser.value && lastCreatedUser.value.id === user.id) {
            lastCreatedUser.value = null;
        }
    } catch (error) {
        console.error('Error al enviar mensaje por WhatsApp:', error);
        showError('Error', 'No se pudo enviar el mensaje por WhatsApp.');
    }
};
const getStatusText = status => {
    return status === 1 ? 'Activo' : 'Inactivo';
};
const getStatusClass = status => {
    return status === 1
        ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'
        : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800';
};
const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const changePage = async page => {
    if (page >= 1 && page <= pagination.value.total_pages) {
        await listUsers(page);
    }
};
// Watchers para recargar la lista cuando cambian los filtros
watch([searchQuery, selectedUserType, selectedRole], () => {
    listUsers(1); // Reset to first page when filters change
});
// Lifecycle
onMounted(() => {
    listUsers();
    listRoles();
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
/* Checkbox styling */
input[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 0.25rem;
    border: 1px solid;
    cursor: pointer;
    position: relative;
}
input[type='checkbox']:checked::before {
    content: '\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
}
</style>
