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
                            Demostración del Sistema de Gestión de Usuarios
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Explora las funcionalidades principales del sistema
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
            <!-- Section 1: User List -->
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
                        1. Listado de Usuarios
                    </h2>
                    <button
                        @click="showDemoUserList"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema muestra una tabla con todos los usuarios registrados. Cada fila
                    contiene información básica del usuario y acciones rápidas.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Información del Usuario
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Nombre, ID y avatar del usuario
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Contacto
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Email y número de teléfono
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Ubicación
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Ciudad y departamento
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
                            Activo o inactivo
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 2: User Creation -->
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
                        2. Creación de Usuarios
                    </h2>
                    <button
                        @click="showDemoUserCreation"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema permite crear nuevos usuarios con información completa de cuenta y
                    datos personales.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Información de Cuenta
                        </h3>
                        <ul
                            class="mt-2 space-y-1 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            <li>• Email</li>
                            <li>• Contraseña</li>
                            <li>• Roles y permisos</li>
                            <li>• Estado de la cuenta</li>
                        </ul>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Información Personal
                        </h3>
                        <ul
                            class="mt-2 space-y-1 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            <li>• Nombre y apellido</li>
                            <li>• Documento de identidad</li>
                            <li>• Teléfono y dirección</li>
                            <li>• Ubicación geográfica</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Section 3: User Actions -->
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
                        @click="showDemoUserActions"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema ofrece múltiples acciones para gestionar los usuarios de manera
                    eficiente.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-blue-500 rounded-lg">
                                <InfoIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Ver Información Completa
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Accede a todos los detalles del usuario incluyendo información personal,
                            de conductor y vehículos asociados.
                        </p>
                    </div>
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                <MessageSquareIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Enviar por WhatsApp
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Envía automáticamente un mensaje al usuario con sus credenciales de
                            acceso y datos registrados.
                        </p>
                    </div>
                    <div class="p-4 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <div class="flex items-center mb-2">
                            <div class="p-2 mr-3 text-white bg-purple-500 rounded-lg">
                                <LockIcon class="w-5 h-5" />
                            </div>
                            <h3
                                class="font-medium transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Cambiar Contraseña
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Permite restablecer la contraseña de un usuario de forma segura.
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
                                Editar Usuario
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Modifica la información de la cuenta y datos personales del usuario.
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
                                Eliminar Usuario
                            </h3>
                        </div>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Elimina permanentemente un usuario del sistema con confirmación previa.
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
                    usuarios rápidamente.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                            Busca usuarios por nombre, email, ID o cualquier otro campo de texto.
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
                            Filtra usuarios activos o inactivos según su estado actual.
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Filtro por Rol
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Filtra usuarios según los roles asignados en el sistema.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 5: Responsive Design -->
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
                        5. Diseño Responsivo
                    </h2>
                    <button
                        @click="showDemoResponsive"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema está optimizado para funcionar perfectamente en cualquier
                    dispositivo, desde móviles hasta escritorios.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-blue-500 rounded-full">
                                <SmartphoneIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Versión Móvil
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Interfaz optimizada para pantallas pequeñas con tarjetas de usuario y
                            acciones accesibles.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-green-500 rounded-full">
                                <TabletIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Versión Tablet
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Diseño adaptado para tablets con elementos intermedios entre móvil y
                            escritorio.
                        </p>
                    </div>
                    <div
                        class="p-4 text-center rounded-lg"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <div class="flex justify-center mb-3">
                            <div class="p-3 text-white bg-purple-500 rounded-full">
                                <MonitorIcon class="w-6 h-6" />
                            </div>
                        </div>
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Versión Escritorio
                        </h3>
                        <p
                            class="mt-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Interfaz completa con tabla de usuarios y todas las funcionalidades
                            disponibles.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Demo Modals -->
        <!-- User List Demo Modal -->
        <div
            v-if="showUserListDemo"
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
                            Demo: Listado de Usuarios
                        </h2>
                        <button
                            @click="closeDemo('userList')"
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
                        Esta es una demostración de cómo se ve el listado de usuarios en el sistema.
                        La tabla muestra información básica de cada usuario y acciones rápidas.
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
                                <thead class="bg-gradient-to-r from-blue-400 to-blue-600">
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
                                        isDarkMode
                                            ? 'bg-gray-800 divide-gray-700'
                                            : 'bg-white divide-gray-200'
                                    "
                                >
                                    <tr
                                        v-for="user in demoUsers"
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
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ user.name }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        ID: {{ user.id }}
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
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ user.phone }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ user.city }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ user.department }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="
                                                    user.status === 'Activo'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                <CheckCircle2Icon
                                                    v-if="user.status === 'Activo'"
                                                    class="w-4 h-4 mr-1"
                                                />
                                                <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                                {{ user.status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div class="flex items-center space-x-2">
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                                                    title="Ver información completa"
                                                >
                                                    <InfoIcon class="w-4 h-4" />
                                                </button>
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                                                    title="Enviar por WhatsApp"
                                                >
                                                    <MessageSquareIcon class="w-4 h-4" />
                                                </button>
                                                <button
                                                    class="p-2 text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                                                    title="Cambiar Contraseña"
                                                >
                                                    <LockIcon class="w-4 h-4" />
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
                                    usuario</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Acciones rápidas para gestionar usuarios directamente desde la
                                    tabla</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Indicadores visuales del estado de cada usuario</span>
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
                        @click="closeDemo('userList')"
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

        <!-- User Creation Demo Modal -->
        <div
            v-if="showUserCreationDemo"
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
                            Demo: Creación de Usuarios
                        </h2>
                        <button
                            @click="closeDemo('userCreation')"
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
                        Esta es una demostración del formulario para crear nuevos usuarios en el
                        sistema. El formulario está dividido en secciones para facilitar la
                        recopilación de información.
                    </p>

                    <!-- Demo Form -->
                    <div class="space-y-4">
                        <!-- Account Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <UserIcon class="w-4 h-4 mr-2 text-green-500" />
                                Información de Cuenta
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                        placeholder="usuario@ejemplo.com"
                                    />
                                </div>
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Contraseña *
                                    </label>
                                    <input
                                        type="password"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Confirmar Contraseña *
                                    </label>
                                    <input
                                        type="password"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div>
                                <div class="sm:col-span-2">
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Roles * (Selecciona al menos uno)
                                    </label>
                                    <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        <label
                                            v-for="role in demoRoles"
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
                                                class="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
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
                            </div>
                        </div>

                        <!-- Personal Information Section -->
                        <div
                            class="p-4 transition-colors duration-200 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                        >
                            <h3
                                class="flex items-center mb-3 text-base font-semibold transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                <UserIcon class="w-4 h-4 mr-2 text-green-500" />
                                Información Personal
                            </h3>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Apellido *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Documento de Identidad *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Ciudad *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Departamento *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                        class="block mb-2 text-sm font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                    >
                                        Dirección *
                                    </label>
                                    <input
                                        type="text"
                                        class="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-colors duration-200"
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
                                    >Selección múltiple de roles para asignar permisos
                                    adecuados</span
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
                        @click="closeDemo('userCreation')"
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

        <!-- User Actions Demo Modal -->
        <div
            v-if="showUserActionsDemo"
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
                            Demo: Acciones de Usuario
                        </h2>
                        <button
                            @click="closeDemo('userActions')"
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
                        Esta es una demostración de las acciones disponibles para gestionar usuarios
                        en el sistema. Cada acción está diseñada para realizar tareas específicas de
                        manera eficiente.
                    </p>

                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <!-- Action 1: Complete Info -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-indigo-400 to-indigo-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-indigo-500 rounded-lg">
                                    <InfoIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Ver Información Completa
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Accede a todos los detalles del usuario incluyendo información
                                personal, de conductor y vehículos asociados.
                            </p>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 2: WhatsApp -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-green-400 to-green-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-green-500 rounded-lg">
                                    <MessageSquareIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Enviar por WhatsApp
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Envía automáticamente un mensaje al usuario con sus credenciales de
                                acceso y datos registrados.
                            </p>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-500 rounded-lg hover:bg-green-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 3: Change Password -->
                        <div
                            class="p-4 transition-colors duration-200 border-l-4 shadow-lg rounded-xl border-gradient-to-b from-purple-400 to-purple-600"
                            :class="isDarkMode ? 'bg-gray-700' : 'bg-white'"
                        >
                            <div class="flex items-center mb-3">
                                <div class="p-2 mr-3 text-white bg-purple-500 rounded-lg">
                                    <LockIcon class="w-5 h-5" />
                                </div>
                                <h3
                                    class="font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                >
                                    Cambiar Contraseña
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Permite restablecer la contraseña de un usuario de forma segura.
                            </p>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 4: Edit User -->
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
                                    Editar Usuario
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Modifica la información de la cuenta y datos personales del usuario.
                            </p>
                            <button
                                class="w-full px-3 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Ver Ejemplo
                            </button>
                        </div>

                        <!-- Action 5: Delete User -->
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
                                    Eliminar Usuario
                                </h3>
                            </div>
                            <p
                                class="mb-3 text-sm transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Elimina permanentemente un usuario del sistema con confirmación
                                previa.
                            </p>
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
                                    usuarios</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Confirmaciones previas para acciones destructivas como eliminar
                                    usuarios</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Integración con WhatsApp para comunicación directa con los
                                    usuarios</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Formularios modales para edición y creación de usuarios sin
                                    abandonar la vista principal</span
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
                        @click="closeDemo('userActions')"
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
                        disponibles en el sistema para encontrar usuarios rápidamente.
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
                                class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                "
                            >
                                <option value="">Todos los estados</option>
                                <option value="1">Activos</option>
                                <option value="0">Inactivos</option>
                            </select>
                            <select
                                class="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm sm:text-base min-w-0 sm:min-w-[160px] transition-colors duration-200"
                                :class="
                                    isDarkMode
                                        ? 'bg-gray-700 border-gray-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-900'
                                "
                            >
                                <option value="">Todos los roles</option>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                                <option value="driver">Conductor</option>
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
                                        v-for="user in demoFilteredUsers"
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
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        "
                                                    >
                                                        {{ user.name }}
                                                    </div>
                                                    <div
                                                        class="text-sm"
                                                        :class="
                                                            isDarkMode
                                                                ? 'text-gray-300'
                                                                : 'text-gray-500'
                                                        "
                                                    >
                                                        ID: {{ user.id }}
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
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ user.phone }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div
                                                class="text-sm"
                                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                            >
                                                {{ user.city }}
                                            </div>
                                            <div
                                                class="text-sm"
                                                :class="
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-500'
                                                "
                                            >
                                                {{ user.department }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="
                                                    user.status === 'Activo'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                "
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                <CheckCircle2Icon
                                                    v-if="user.status === 'Activo'"
                                                    class="w-4 h-4 mr-1"
                                                />
                                                <XCircleIcon v-else class="w-4 h-4 mr-1" />
                                                {{ user.status }}
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
                                    >Posibilidad de filtrar por estado de cuenta y roles
                                    asignados</span
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

        <!-- Responsive Design Demo Modal -->
        <div
            v-if="showResponsiveDemo"
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
                            Demo: Diseño Responsivo
                        </h2>
                        <button
                            @click="closeDemo('responsive')"
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
                        Esta es una demostración de cómo el sistema se adapta a diferentes
                        dispositivos y tamaños de pantalla.
                    </p>

                    <!-- Device Previews -->
                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <!-- Mobile Preview -->
                        <div
                            class="p-4 transition-colors duration-200 border rounded-xl"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-700'
                                    : 'border-gray-200 bg-gray-50'
                            "
                        >
                            <div class="flex items-center justify-center mb-4">
                                <div class="p-3 text-white bg-blue-500 rounded-full">
                                    <SmartphoneIcon class="w-6 h-6" />
                                </div>
                            </div>
                            <h3
                                class="mb-3 text-lg font-semibold text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Versión Móvil
                            </h3>
                            <div
                                class="mx-auto border-2 border-gray-300 rounded-lg"
                                style="width: 200px; height: 400px; overflow: hidden"
                            >
                                <div
                                    class="h-full p-2"
                                    :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
                                >
                                    <!-- Mobile Header -->
                                    <div
                                        class="p-2 mb-2 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div
                                                    class="w-6 h-6 mr-2 bg-yellow-500 rounded-full"
                                                ></div>
                                                <span
                                                    class="text-xs font-medium"
                                                    :class="
                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                    "
                                                    >Usuarios</span
                                                >
                                            </div>
                                            <div class="w-6 h-6 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <!-- Mobile Search -->
                                    <div
                                        class="p-2 mb-2 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center">
                                            <div
                                                class="w-4 h-4 mr-2 bg-gray-400 rounded-full"
                                            ></div>
                                            <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>

                                    <!-- Mobile Filters -->
                                    <div class="flex mb-2 space-x-1">
                                        <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                        <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                    </div>

                                    <!-- Mobile User Cards -->
                                    <div
                                        class="p-2 mb-2 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center mb-1">
                                            <div
                                                class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                            ></div>
                                            <div>
                                                <div
                                                    class="w-16 h-2 mb-1 bg-gray-300 rounded"
                                                ></div>
                                                <div class="w-12 h-2 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="flex justify-between mt-2">
                                            <div class="flex space-x-1">
                                                <div class="w-5 h-5 bg-blue-500 rounded"></div>
                                                <div class="w-5 h-5 bg-green-500 rounded"></div>
                                                <div class="w-5 h-5 bg-purple-500 rounded"></div>
                                            </div>
                                            <div class="w-12 h-4 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <div
                                        class="p-2 mb-2 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center mb-1">
                                            <div
                                                class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                            ></div>
                                            <div>
                                                <div
                                                    class="w-16 h-2 mb-1 bg-gray-300 rounded"
                                                ></div>
                                                <div class="w-12 h-2 bg-gray-300 rounded"></div>
                                            </div>
                                        </div>
                                        <div class="flex justify-between mt-2">
                                            <div class="flex space-x-1">
                                                <div class="w-5 h-5 bg-blue-500 rounded"></div>
                                                <div class="w-5 h-5 bg-green-500 rounded"></div>
                                                <div class="w-5 h-5 bg-purple-500 rounded"></div>
                                            </div>
                                            <div class="w-12 h-4 bg-red-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                class="mt-4 text-sm text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Interfaz optimizada para pantallas pequeñas con tarjetas de usuario
                                y acciones accesibles.
                            </p>
                        </div>

                        <!-- Tablet Preview -->
                        <div
                            class="p-4 transition-colors duration-200 border rounded-xl"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-700'
                                    : 'border-gray-200 bg-gray-50'
                            "
                        >
                            <div class="flex items-center justify-center mb-4">
                                <div class="p-3 text-white bg-green-500 rounded-full">
                                    <TabletIcon class="w-6 h-6" />
                                </div>
                            </div>
                            <h3
                                class="mb-3 text-lg font-semibold text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Versión Tablet
                            </h3>
                            <div
                                class="mx-auto border-2 border-gray-300 rounded-lg"
                                style="width: 300px; height: 400px; overflow: hidden"
                            >
                                <div
                                    class="h-full p-3"
                                    :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
                                >
                                    <!-- Tablet Header -->
                                    <div
                                        class="p-3 mb-3 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 mr-3 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div>
                                                    <div
                                                        class="w-24 h-3 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-16 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                            </div>
                                            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <!-- Tablet Search and Filters -->
                                    <div
                                        class="p-2 mb-3 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center mb-2">
                                            <div
                                                class="w-5 h-5 mr-2 bg-gray-400 rounded-full"
                                            ></div>
                                            <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                                        </div>
                                        <div class="flex space-x-2">
                                            <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                            <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>

                                    <!-- Tablet User Table -->
                                    <div
                                        class="overflow-hidden border rounded-lg"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'"
                                    >
                                        <div
                                            class="p-2"
                                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                        >
                                            <div class="grid grid-cols-3 gap-2">
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                            </div>
                                        </div>
                                        <div
                                            class="p-2 border-t"
                                            :class="
                                                isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                            "
                                        >
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div class="flex-1">
                                                    <div
                                                        class="w-16 h-2 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-12 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                                <div
                                                    class="w-12 h-4 bg-green-500 rounded-full"
                                                ></div>
                                            </div>
                                        </div>
                                        <div
                                            class="p-2 border-t"
                                            :class="
                                                isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                            "
                                        >
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div class="flex-1">
                                                    <div
                                                        class="w-16 h-2 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-12 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                                <div class="w-12 h-4 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                class="mt-4 text-sm text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Diseño adaptado para tablets con elementos intermedios entre móvil y
                                escritorio.
                            </p>
                        </div>

                        <!-- Desktop Preview -->
                        <div
                            class="p-4 transition-colors duration-200 border rounded-xl"
                            :class="
                                isDarkMode
                                    ? 'border-gray-700 bg-gray-700'
                                    : 'border-gray-200 bg-gray-50'
                            "
                        >
                            <div class="flex items-center justify-center mb-4">
                                <div class="p-3 text-white bg-purple-500 rounded-full">
                                    <MonitorIcon class="w-6 h-6" />
                                </div>
                            </div>
                            <h3
                                class="mb-3 text-lg font-semibold text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                            >
                                Versión Escritorio
                            </h3>
                            <div
                                class="mx-auto border-2 border-gray-300 rounded-lg"
                                style="width: 350px; height: 400px; overflow: hidden"
                            >
                                <div
                                    class="h-full p-4"
                                    :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
                                >
                                    <!-- Desktop Header -->
                                    <div
                                        class="p-3 mb-3 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center">
                                                <div
                                                    class="w-10 h-10 mr-3 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div>
                                                    <div
                                                        class="w-32 h-4 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-24 h-3 bg-gray-300 rounded"></div>
                                                </div>
                                            </div>
                                            <div class="w-10 h-10 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    <!-- Desktop Search and Filters -->
                                    <div
                                        class="p-3 mb-3 rounded-lg"
                                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                    >
                                        <div class="flex items-center mb-2">
                                            <div
                                                class="w-5 h-5 mr-2 bg-gray-400 rounded-full"
                                            ></div>
                                            <div class="flex-1 h-4 bg-gray-300 rounded"></div>
                                        </div>
                                        <div class="flex space-x-2">
                                            <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                            <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                            <div class="flex-1 h-6 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>

                                    <!-- Desktop User Table -->
                                    <div
                                        class="overflow-hidden border rounded-lg"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'"
                                    >
                                        <div
                                            class="p-2"
                                            :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                                        >
                                            <div class="grid grid-cols-4 gap-2">
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                                <div class="h-4 bg-gray-400 rounded"></div>
                                            </div>
                                        </div>
                                        <div
                                            class="p-2 border-t"
                                            :class="
                                                isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                            "
                                        >
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div class="flex-1">
                                                    <div
                                                        class="w-20 h-2 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-16 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                                <div class="flex space-x-1">
                                                    <div class="w-6 h-6 bg-blue-500 rounded"></div>
                                                    <div class="w-6 h-6 bg-green-500 rounded"></div>
                                                    <div
                                                        class="w-6 h-6 bg-purple-500 rounded"
                                                    ></div>
                                                    <div class="w-6 h-6 bg-blue-500 rounded"></div>
                                                    <div class="w-6 h-6 bg-red-500 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="p-2 border-t"
                                            :class="
                                                isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                            "
                                        >
                                            <div class="flex items-center">
                                                <div
                                                    class="w-8 h-8 mr-2 bg-yellow-500 rounded-full"
                                                ></div>
                                                <div class="flex-1">
                                                    <div
                                                        class="w-20 h-2 mb-1 bg-gray-300 rounded"
                                                    ></div>
                                                    <div class="w-16 h-2 bg-gray-300 rounded"></div>
                                                </div>
                                                <div class="flex space-x-1">
                                                    <div class="w-6 h-6 bg-blue-500 rounded"></div>
                                                    <div class="w-6 h-6 bg-green-500 rounded"></div>
                                                    <div
                                                        class="w-6 h-6 bg-purple-500 rounded"
                                                    ></div>
                                                    <div class="w-6 h-6 bg-blue-500 rounded"></div>
                                                    <div class="w-6 h-6 bg-red-500 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                class="mt-4 text-sm text-center transition-colors duration-200"
                                :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                            >
                                Interfaz completa con tabla de usuarios y todas las funcionalidades
                                disponibles.
                            </p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características del Diseño Responsivo
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
                                    >Adaptación automática a diferentes tamaños de pantalla sin
                                    perder funcionalidad</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Reorganización de elementos para optimizar el espacio
                                    disponible</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Accesibilidad completa en todos los dispositivos con controles
                                    adaptados</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Experiencia de usuario consistente en todas las
                                    plataformas</span
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
                        @click="closeDemo('responsive')"
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
    CheckCircle2Icon,
    EditIcon,
    InfoIcon,
    LockIcon,
    MessageSquareIcon,
    MonitorIcon,
    PlayIcon,
    SearchIcon,
    SmartphoneIcon,
    TabletIcon,
    TrashIcon,
    UserIcon,
    UsersIcon,
    XCircleIcon,
    XIcon,
} from 'lucide-vue-next';
import { ref } from 'vue';

// Demo modals state
const showUserListDemo = ref(false);
const showUserCreationDemo = ref(false);
const showUserActionsDemo = ref(false);
const showFiltersDemo = ref(false);
const showResponsiveDemo = ref(false);

// Demo data
const demoUsers = [
    {
        id: 'USR001',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+51 999 888 777',
        city: 'Lima',
        department: 'Lima Metropolitana',
        status: 'Activo',
    },
    {
        id: 'USR002',
        name: 'María García',
        email: 'maria.garcia@example.com',
        phone: '+51 988 777 666',
        city: 'Arequipa',
        department: 'Arequipa',
        status: 'Activo',
    },
    {
        id: 'USR003',
        name: 'Carlos López',
        email: 'carlos.lopez@example.com',
        phone: '+51 977 666 555',
        city: 'Cusco',
        department: 'Cusco',
        status: 'Inactivo',
    },
];

const demoFilteredUsers = [
    {
        id: 'USR001',
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+51 999 888 777',
        city: 'Lima',
        department: 'Lima Metropolitana',
        status: 'Activo',
    },
    {
        id: 'USR002',
        name: 'María García',
        email: 'maria.garcia@example.com',
        phone: '+51 988 777 666',
        city: 'Arequipa',
        department: 'Arequipa',
        status: 'Activo',
    },
];

const demoRoles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Usuario' },
    { id: 3, name: 'Conductor' },
    { id: 4, name: 'Supervisor' },
];

// Methods
const startTour = () => {
    alert(
        '¡Bienvenido al tour guiado!\n\nEste tour te mostrará las principales características del sistema de gestión de usuarios.\n\n1. Listado de Usuarios: Visualiza todos los usuarios registrados.\n2. Creación de Usuarios: Añade nuevos usuarios al sistema.\n3. Acciones Disponibles: Gestiona usuarios con diversas acciones.\n4. Búsqueda y Filtros: Encuentra usuarios rápidamente.\n5. Diseño Responsivo: Usa el sistema en cualquier dispositivo.\n\nExplora las secciones y haz clic en "Ver Demo" para ver ejemplos detallados de cada funcionalidad.'
    );
};

const showDemoUserList = () => {
    showUserListDemo.value = true;
};

const showDemoUserCreation = () => {
    showUserCreationDemo.value = true;
};

const showDemoUserActions = () => {
    showUserActionsDemo.value = true;
};

const showDemoFilters = () => {
    showFiltersDemo.value = true;
};

const showDemoResponsive = () => {
    showResponsiveDemo.value = true;
};

const closeDemo = demoType => {
    switch (demoType) {
        case 'userList':
            showUserListDemo.value = false;
            break;
        case 'userCreation':
            showUserCreationDemo.value = false;
            break;
        case 'userActions':
            showUserActionsDemo.value = false;
            break;
        case 'filters':
            showFiltersDemo.value = false;
            break;
        case 'responsive':
            showResponsiveDemo.value = false;
            break;
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
