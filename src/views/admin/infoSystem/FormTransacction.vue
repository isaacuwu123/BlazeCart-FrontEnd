<template>
    <div
        class="w-full min-h-screen p-2 transition-colors duration-200 sm:p-4 lg:p-6"
        :class="
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
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
                        class="p-2 rounded-lg shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 sm:p-3"
                    >
                        <CurrencyDollarIcon
                            class="w-5 h-5 text-white sm:h-6 sm:w-6 lg:h-8 lg:w-8"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-bold truncate transition-colors duration-200 sm:text-xl lg:text-3xl"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Demostración del Sistema de Transacciones
                        </h1>
                        <p
                            class="mt-1 text-xs truncate transition-colors duration-200 sm:text-sm lg:text-base"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            Explora las funcionalidades del formulario de registro de transacciones
                        </p>
                    </div>
                </div>
                <button
                    @click="startTour"
                    class="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 touch-manipulation text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <PlayIcon class="w-4 h-4 sm:h-5 sm:w-5" />
                    <span>Iniciar Tour Guiado</span>
                </button>
            </div>
        </div>

        <!-- Demo Sections -->
        <div class="space-y-6">
            <!-- Section 1: Información General -->
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
                        1. Información General
                    </h2>
                    <button
                        @click="showDemoGeneralInfo"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Esta sección recopila los datos básicos de la transacción como el negocio
                    asociado, el tipo de transacción y el número de referencia.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Negocio
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Selección del negocio asociado a la transacción
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Número de Transacción
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Identificador único (opcional, se genera automáticamente)
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Tipo de Transacción
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Clasificación como Ingreso o Egreso
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 2: Detalles de la Transacción -->
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
                        2. Detalles de la Transacción
                    </h2>
                    <button
                        @click="showDemoTransactionDetails"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Aquí se especifican los detalles financieros como método de pago, categoría y
                    estado de la transacción.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Método de Pago
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Forma en que se realizó el pago (efectivo, tarjeta, etc.)
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Categoría
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Clasificación de la transacción con búsqueda inteligente
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
                            Situación actual de la transacción (pendiente, completado, etc.)
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 3: Información del Producto -->
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
                        3. Información del Producto
                    </h2>
                    <button
                        @click="showDemoProductInfo"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-orange-500 rounded-lg hover:bg-orange-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    En esta sección se detallan los productos o servicios involucrados en la
                    transacción junto con su valor.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Ítem
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Descripción del producto o servicio
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Fecha
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Fecha en que se realizó la transacción
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Cantidad
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Número de unidades o servicios
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Importe Total
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Monto total incluyendo impuestos
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 4: Ubicación y Vehículo -->
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
                        4. Ubicación y Vehículo
                    </h2>
                    <button
                        @click="showDemoLocationVehicle"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Sección opcional para registrar información logística relacionada con la
                    transacción.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                            Vehículo asociado a la transacción (opcional)
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Millas
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Distancia recorrida si aplica
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Punto de Partida
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Dirección de origen
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Destino
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Dirección de destino
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 5: Información Adicional -->
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
                        5. Información Adicional
                    </h2>
                    <button
                        @click="showDemoAdditionalInfo"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-teal-500 rounded-lg hover:bg-teal-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Espacio para datos complementarios como cliente/proveedor y observaciones.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Cliente/Proveedor
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Nombre de la persona o empresa relacionada
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Tipo de Egreso
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Clasificación para egresos (directo/indirecto)
                        </p>
                    </div>
                    <div
                        class="p-3 rounded-lg sm:col-span-2"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'"
                    >
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Observaciones
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Notas adicionales sobre la transacción
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 6: Documentos Adjuntos -->
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
                        6. Documentos Adjuntos
                    </h2>
                    <button
                        @click="showDemoAttachments"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg bg-rose-500 hover:bg-rose-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    Permite adjuntar archivos relacionados con la transacción como facturas o
                    recibos.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Arrastrar y Soltar
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Arrastra archivos directamente al área designada
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Formatos Aceptados
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            PNG, JPG, PDF, DOC, DOCX (Máx. 10MB)
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Vista Previa
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Previsualización de archivos antes de enviar
                        </p>
                    </div>
                </div>
            </div>

            <!-- Section 7: Validaciones y Envío -->
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
                        7. Validaciones y Envío
                    </h2>
                    <button
                        @click="showDemoValidation"
                        class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
                    >
                        Ver Demo
                    </button>
                </div>
                <p
                    class="mb-4 transition-colors duration-200"
                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                >
                    El sistema incluye validaciones completas y un proceso de envío seguro con
                    confirmación.
                </p>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Validación de Campos
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Verificación de datos obligatorios y formatos
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Confirmación de Envío
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Diálogo de confirmación antes de procesar
                        </p>
                    </div>
                    <div class="p-3 rounded-lg" :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-100'">
                        <h3
                            class="font-medium transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Retroalimentación
                        </h3>
                        <p
                            class="text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
                        >
                            Mensajes claros de éxito o error
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Demo Modals -->
        <!-- General Info Demo Modal -->
        <div
            v-if="showGeneralInfoDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Información General
                        </h2>
                        <button
                            @click="closeDemo('generalInfo')"
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
                        Esta es una demostración de la sección de Información General del formulario
                        de transacciones.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <!-- Negocio -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Negocio *
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar negocio</option>
                                        <option value="1">Negocio A</option>
                                        <option value="2">Negocio B</option>
                                        <option value="3">Negocio C</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Número de Transacción -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Número de Transacción
                                </label>
                                <input
                                    type="text"
                                    placeholder="Opcional: se generará automáticamente"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Tipo de Transacción -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Tipo de Transacción *
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar tipo</option>
                                        <option value="Ingreso">Ingreso</option>
                                        <option value="Egreso">Egreso</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
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
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Selección de negocio de una lista desplegable</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Campo opcional para número de transacción con generación
                                    automática</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Clasificación obligatoria entre Ingreso y Egreso</span>
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
                        @click="closeDemo('generalInfo')"
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

        <!-- Transaction Details Demo Modal -->
        <div
            v-if="showTransactionDetailsDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Detalles de la Transacción
                        </h2>
                        <button
                            @click="closeDemo('transactionDetails')"
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
                        Esta es una demostración de la sección de Detalles de la Transacción.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <!-- Método de Pago -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Método de Pago *
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar método</option>
                                        <option value="1">Efectivo</option>
                                        <option value="2">Tarjeta de Crédito</option>
                                        <option value="3">Transferencia Bancaria</option>
                                        <option value="4">Cheque</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Categoría -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Categoría *
                                </label>
                                <div class="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar categoría..."
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    />
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Estado -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Estado *
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar estado</option>
                                        <option value="1">Pendiente</option>
                                        <option value="2">Completado</option>
                                        <option value="3">Cancelado</option>
                                        <option value="4">En Revisión</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
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
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Selección de método de pago de una lista predefinida</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Campo de búsqueda inteligente para categorías con filtrado en
                                    tiempo real</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Selección de estado para seguimiento de la transacción</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Diseño responsivo con campos adaptados a diferentes
                                    dispositivos</span
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
                        @click="closeDemo('transactionDetails')"
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

        <!-- Product Info Demo Modal -->
        <div
            v-if="showProductInfoDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Información del Producto
                        </h2>
                        <button
                            @click="closeDemo('productInfo')"
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
                        Esta es una demostración de la sección de Información del Producto.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <!-- Ítem -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Ítem *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Descripción del ítem"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Fecha -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Fecha *
                                </label>
                                <input
                                    type="date"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Cantidad -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Cantidad *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Importe Total -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Importe Total *
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                                    >
                                        <span class="text-base text-gray-500 dark:text-gray-400"
                                            >$</span
                                        >
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        class="block w-full rounded-xl border py-3 pl-10 pr-4 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5 sm:pl-9"
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
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Campo de texto libre para descripción del ítem</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Selector de fecha con calendario integrado</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Campos numéricos para cantidad e importe con formato
                                    monetario</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Validación de datos obligatorios y formatos correctos</span>
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
                        @click="closeDemo('productInfo')"
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

        <!-- Location Vehicle Demo Modal -->
        <div
            v-if="showLocationVehicleDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Ubicación y Vehículo
                        </h2>
                        <button
                            @click="closeDemo('locationVehicle')"
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
                        Esta es una demostración de la sección de Ubicación y Vehículo.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <!-- Vehículo -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Vehículo
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar vehículo</option>
                                        <option value="1">ABC123 (Toyota Corolla)</option>
                                        <option value="2">XYZ789 (Honda Civic)</option>
                                        <option value="3">DEF456 (Nissan Versa)</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Millas -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Millas
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Punto de Partida -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Punto de Partida
                                </label>
                                <input
                                    type="text"
                                    placeholder="Dirección de origen"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Destino -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Destino
                                </label>
                                <input
                                    type="text"
                                    placeholder="Dirección de destino"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Selección opcional de vehículo con placa y modelo</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Campo numérico para registro de millas recorridas</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Campos de texto para direcciones de origen y destino</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Todos los campos son opcionales para mayor flexibilidad</span>
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
                        @click="closeDemo('locationVehicle')"
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

        <!-- Additional Info Demo Modal -->
        <div
            v-if="showAdditionalInfoDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Información Adicional
                        </h2>
                        <button
                            @click="closeDemo('additionalInfo')"
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
                        Esta es una demostración de la sección de Información Adicional.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <!-- Cliente/Proveedor -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Cliente/Proveedor
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre del cliente o proveedor"
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                />
                            </div>

                            <!-- Egreso Directo -->
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Tipo de Egreso
                                </label>
                                <div class="flex flex-col gap-2 sm:flex-row">
                                    <label
                                        class="flex items-center gap-3 p-4 transition-all duration-200 border cursor-pointer rounded-xl hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
                                    >
                                        <div class="relative">
                                            <input
                                                type="radio"
                                                class="sr-only"
                                                name="egreso_directo"
                                                value="true"
                                            />
                                            <div
                                                class="flex items-center justify-center w-6 h-6 transition-colors duration-200 border rounded-md"
                                                :class="
                                                    isDarkMode
                                                        ? 'border-gray-500'
                                                        : 'border-gray-300'
                                                "
                                            >
                                                <svg
                                                    class="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-base text-gray-700 dark:text-gray-300">
                                            Directo
                                        </span>
                                    </label>
                                    <label
                                        class="flex items-center gap-3 p-4 transition-all duration-200 border cursor-pointer rounded-xl hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
                                        :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
                                    >
                                        <div class="relative">
                                            <input
                                                type="radio"
                                                class="sr-only"
                                                name="egreso_directo"
                                                value="false"
                                            />
                                            <div
                                                class="flex items-center justify-center w-6 h-6 transition-colors duration-200 border rounded-md"
                                                :class="
                                                    isDarkMode
                                                        ? 'border-gray-500'
                                                        : 'border-gray-300'
                                                "
                                            >
                                                <svg
                                                    class="w-4 h-4 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <span class="text-base text-gray-700 dark:text-gray-300">
                                            Indirecto
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <!-- Observaciones -->
                            <div class="sm:col-span-2">
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Observaciones
                                </label>
                                <textarea
                                    rows="3"
                                    placeholder="Notas adicionales sobre la transacción..."
                                    class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    :class="
                                        isDarkMode
                                            ? 'bg-gray-800 border-gray-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-900'
                                    "
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Campo opcional para cliente/proveedor relacionado</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Botones de radio para selección de tipo de egreso (solo visible
                                    para egresos)</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Área de texto multilínea para observaciones</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Diseño responsivo con campos adaptados a diferentes
                                    dispositivos</span
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
                        @click="closeDemo('additionalInfo')"
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

        <!-- Attachments Demo Modal -->
        <div
            v-if="showAttachmentsDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Documentos Adjuntos
                        </h2>
                        <button
                            @click="closeDemo('attachments')"
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
                        Esta es una demostración de la sección de Documentos Adjuntos.
                    </p>

                    <!-- Demo Form -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <!-- Área de Subida -->
                        <div class="relative">
                            <input
                                type="file"
                                class="sr-only"
                                accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                            <label
                                class="flex flex-col items-center justify-center h-48 transition-all duration-300 border-2 border-dashed cursor-pointer group rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 sm:h-40"
                                :class="
                                    isDarkMode
                                        ? 'border-gray-600 bg-gray-800'
                                        : 'border-gray-300 bg-gray-50'
                                "
                            >
                                <div
                                    class="flex flex-col items-center justify-center px-4 text-center"
                                >
                                    <svg
                                        class="w-12 h-12 mb-3 text-gray-500 transition-colors group-hover:text-rose-500 dark:text-gray-400 sm:h-10 sm:w-10"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>
                                    <p
                                        class="mb-1 text-base font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        <span
                                            class="block font-semibold text-rose-600 dark:text-rose-400"
                                            >Arrastra y suelta</span
                                        >
                                        o haz clic para seleccionar un archivo
                                    </p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        PNG, JPG, PDF, DOC, DOCX (MAX. 10MB)
                                    </p>
                                </div>
                            </label>
                        </div>

                        <!-- Vista Previa del Archivo -->
                        <div
                            class="p-5 mt-4 rounded-xl"
                            :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-100'"
                        >
                            <div
                                class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
                            >
                                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Archivo seleccionado:
                                </p>
                                <div class="flex gap-2">
                                    <button
                                        type="button"
                                        class="flex items-center justify-center w-10 h-10 text-blue-500 transition-colors rounded-lg hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/30"
                                        aria-label="Descargar archivo"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        class="flex items-center justify-center w-10 h-10 text-red-500 transition-colors rounded-lg hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30"
                                        aria-label="Eliminar archivo"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div
                                class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:items-center"
                            >
                                <div class="shrink-0">
                                    <div
                                        class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-xl dark:bg-gray-600 sm:h-28 sm:w-28"
                                    >
                                        <svg
                                            class="w-12 h-12 text-red-500 dark:text-red-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p
                                        class="text-base font-medium text-gray-900 truncate dark:text-white sm:text-sm"
                                    >
                                        factura_ejemplo.pdf
                                    </p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">2.4 MB</p>
                                    <p class="text-xs text-gray-400 dark:text-gray-500">PDF</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3
                            class="mb-2 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Características de la Sección
                        </h3>
                        <ul
                            class="space-y-2 text-sm transition-colors duration-200"
                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                        >
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Área de arrastrar y soltar con indicadores visuales</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Validación de formatos y tamaño de archivo (máx. 10MB)</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Vista previa del archivo con iconos según el tipo</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Botones para descargar o eliminar el archivo adjunto</span>
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
                        @click="closeDemo('attachments')"
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

        <!-- Validation Demo Modal -->
        <div
            v-if="showValidationDemo"
            class="fixed inset-0 z-50 flex items-end justify-center p-2 bg-black bg-opacity-50 sm:items-center sm:p-4"
        >
            <div
                class="rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto transition-colors duration-200"
                :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
            >
                <!-- Modal Header -->
                <div
                    class="sticky top-0 z-10 px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-t-2xl sm:rounded-t-2xl"
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-bold text-white sm:text-xl">
                            Demo: Validaciones y Envío
                        </h2>
                        <button
                            @click="closeDemo('validation')"
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
                        Esta es una demostración de las validaciones y el proceso de envío del
                        formulario.
                    </p>

                    <!-- Demo Validation Errors -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="mb-3 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Ejemplo de Validación de Campos
                        </h3>
                        <div class="space-y-3">
                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Negocio *
                                </label>
                                <div class="relative">
                                    <select
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5 border-red-500 focus:ring-red-500/20"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-red-500 text-white'
                                                : 'bg-white border-red-500 text-gray-900'
                                        "
                                    >
                                        <option value="">Seleccionar negocio</option>
                                        <option value="1">Negocio A</option>
                                        <option value="2">Negocio B</option>
                                        <option value="3">Negocio C</option>
                                    </select>
                                    <div
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                    >
                                        <svg
                                            class="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <p class="flex items-center gap-1 mt-1 text-xs text-red-500">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    El campo negocio es obligatorio
                                </p>
                            </div>

                            <div>
                                <label
                                    class="block mb-2 text-sm font-medium transition-colors duration-200"
                                    :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'"
                                >
                                    Importe Total *
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                                    >
                                        <span class="text-base text-gray-500 dark:text-gray-400"
                                            >$</span
                                        >
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        class="block w-full rounded-xl border py-3 pl-10 pr-4 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5 sm:pl-9 border-red-500 focus:ring-red-500/20"
                                        :class="
                                            isDarkMode
                                                ? 'bg-gray-800 border-red-500 text-white'
                                                : 'bg-white border-red-500 text-gray-900'
                                        "
                                    />
                                </div>
                                <p class="flex items-center gap-1 mt-1 text-xs text-red-500">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    El importe debe ser mayor que 0
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Demo Confirmation Dialog -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="mb-3 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Diálogo de Confirmación
                        </h3>
                        <div
                            class="p-4 rounded-lg"
                            :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
                        >
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="w-6 h-6 text-yellow-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3
                                        class="text-lg font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Confirmar Envío
                                    </h3>
                                    <div class="mt-2">
                                        <p
                                            class="text-sm transition-colors duration-200"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                        >
                                            ¿Estás seguro de que deseas registrar esta transacción?
                                        </p>
                                    </div>
                                    <div class="flex justify-end mt-4 space-x-3">
                                        <button
                                            type="button"
                                            class="px-4 py-2 text-sm font-medium transition-colors duration-200 border rounded-lg touch-manipulation"
                                            :class="
                                                isDarkMode
                                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            "
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Demo Success Message -->
                    <div
                        class="p-4 mb-4 transition-colors duration-200 rounded-xl"
                        :class="isDarkMode ? 'bg-gray-700' : 'bg-gray-50'"
                    >
                        <h3
                            class="mb-3 text-lg font-semibold transition-colors duration-200"
                            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                        >
                            Mensaje de Éxito
                        </h3>
                        <div
                            class="p-4 rounded-lg"
                            :class="isDarkMode ? 'bg-gray-800' : 'bg-white'"
                        >
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <svg
                                        class="w-6 h-6 text-green-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3
                                        class="text-lg font-medium transition-colors duration-200"
                                        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                                    >
                                        Transacción Registrada
                                    </h3>
                                    <div class="mt-2">
                                        <p
                                            class="text-sm transition-colors duration-200"
                                            :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'"
                                        >
                                            La transacción ha sido registrada exitosamente con el
                                            número TRX-2023-001234.
                                        </p>
                                    </div>
                                    <div class="mt-4">
                                        <button
                                            type="button"
                                            class="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                                        >
                                            Aceptar
                                        </button>
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
                            Características del Proceso
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
                                    >Validación en tiempo real de campos obligatorios y
                                    formatos</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Mensajes de error específicos para cada campo</span>
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span
                                    >Diálogo de confirmación antes de procesar la transacción</span
                                >
                            </li>
                            <li class="flex items-start">
                                <CheckCircle2Icon
                                    class="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500"
                                />
                                <span>Retroalimentación clara con mensajes de éxito o error</span>
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
                        @click="closeDemo('validation')"
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
import { CheckCircle2Icon, PlayIcon, XIcon } from 'lucide-vue-next';
import { ref } from 'vue';

// Demo modals state
const showGeneralInfoDemo = ref(false);
const showTransactionDetailsDemo = ref(false);
const showProductInfoDemo = ref(false);
const showLocationVehicleDemo = ref(false);
const showAdditionalInfoDemo = ref(false);
const showAttachmentsDemo = ref(false);
const showValidationDemo = ref(false);

// Methods
const startTour = () => {
    alert(
        '¡Bienvenido al tour guiado del formulario de transacciones!\n\nEste tour te mostrará las principales características del sistema:\n\n1. Información General: Datos básicos de la transacción.\n2. Detalles de la Transacción: Método de pago, categoría y estado.\n3. Información del Producto: Descripción, fecha, cantidad e importe.\n4. Ubicación y Vehículo: Datos logísticos opcionales.\n5. Información Adicional: Cliente/proveedor y observaciones.\n6. Documentos Adjuntos: Gestión de archivos relacionados.\n7. Validaciones y Envío: Proceso completo con confirmaciones.\n\nExplora cada sección y haz clic en "Ver Demo" para ver ejemplos detallados.'
    );
};

const showDemoGeneralInfo = () => {
    showGeneralInfoDemo.value = true;
};

const showDemoTransactionDetails = () => {
    showTransactionDetailsDemo.value = true;
};

const showDemoProductInfo = () => {
    showProductInfoDemo.value = true;
};

const showDemoLocationVehicle = () => {
    showLocationVehicleDemo.value = true;
};

const showDemoAdditionalInfo = () => {
    showAdditionalInfoDemo.value = true;
};

const showDemoAttachments = () => {
    showAttachmentsDemo.value = true;
};

const showDemoValidation = () => {
    showValidationDemo.value = true;
};

const closeDemo = demoType => {
    switch (demoType) {
        case 'generalInfo':
            showGeneralInfoDemo.value = false;
            break;
        case 'transactionDetails':
            showTransactionDetailsDemo.value = false;
            break;
        case 'productInfo':
            showProductInfoDemo.value = false;
            break;
        case 'locationVehicle':
            showLocationVehicleDemo.value = false;
            break;
        case 'additionalInfo':
            showAdditionalInfoDemo.value = false;
            break;
        case 'attachments':
            showAttachmentsDemo.value = false;
            break;
        case 'validation':
            showValidationDemo.value = false;
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
