<template>
    <div
        class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800"
        ref="topSection"
    >
        <div class="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
            <!-- Header Compacto y Responsivo -->
            <div
                class="sticky top-0 z-10 py-3 mb-4 border shadow-lg rounded-2xl bg-white/95 backdrop-blur-xl dark:bg-gray-800/95 border-gray-200/50 dark:border-gray-700/50"
            >
                <div
                    class="flex flex-col items-center px-4 space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0"
                >
                    <div class="flex items-center space-x-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 transition-transform duration-300 shadow-lg rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:scale-110"
                        >
                            <ReceiptIcon class="w-6 h-6 text-white" :stroke-width="2.5" />
                        </div>
                        <h1
                            class="text-xl font-black text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text dark:from-emerald-400 dark:to-teal-400 sm:text-lg"
                        >
                            Registrar Egreso
                        </h1>
                    </div>
                    <p class="text-sm text-center text-gray-600 dark:text-gray-400 sm:text-right">
                        Completa los datos para registrar un nuevo egreso
                    </p>
                </div>
            </div>

            <!-- Contenido del Formulario -->
            <div class="pb-6">
                <form
                    @submit.prevent="submitForm"
                    class="overflow-hidden border shadow-2xl bg-white/95 backdrop-blur-xl dark:bg-gray-800/95 rounded-3xl border-gray-200/50 dark:border-gray-700/50"
                >
                    <!-- Barra de Progreso Compacta -->
                    <div
                        class="px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600"
                    >
                        <div class="flex items-center justify-between text-white">
                            <div class="flex items-center space-x-3">
                                <CheckCircle2Icon class="w-5 h-5" :stroke-width="2.5" />
                                <span class="text-base font-bold">Información del Egreso</span>
                            </div>
                            <span class="text-sm font-semibold opacity-90">Paso 1 de 1</span>
                        </div>
                    </div>

                    <!-- Contenido del Formulario -->
                    <div class="p-6 space-y-8">
                        <!-- Nota importante sobre Lease on -->
                        <div
                            class="p-5 text-sm border-l-4 border-yellow-500 shadow-lg rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30"
                        >
                            <div class="flex items-start space-x-3">
                                <div class="flex-shrink-0">
                                    <AlertTriangleIcon
                                        class="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="text-base font-bold text-yellow-800 dark:text-yellow-300"
                                    >
                                        Importante
                                    </p>
                                    <p class="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                                        Esta operación solo está permitida para el negocio "Lease
                                        on". Asegúrate de que el vehículo seleccionado esté asociado
                                        a este negocio.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Detalles del Egreso -->
                        <div class="space-y-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 hover:scale-110"
                                >
                                    <RefreshCwIcon
                                        class="w-5 h-5 text-purple-600 dark:text-purple-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <h2 class="text-xl font-black text-gray-900 dark:text-white">
                                    Detalles del Egreso
                                </h2>
                            </div>

                            <div
                                class="p-5 text-sm border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                            >
                                <div class="flex items-start space-x-3">
                                    <InfoIcon
                                        class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400"
                                        :stroke-width="2.5"
                                    />
                                    <p class="text-blue-700 dark:text-blue-300">
                                        <span class="font-bold">Instrucciones:</span> Selecciona el
                                        método de pago, categoría y caja operativa (opcional). La
                                        categoría se puede buscar escribiendo en el campo. El estado
                                        de la transacción es automáticamente "Pagado".
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <!-- Número de Transacción -->
                                <div class="space-y-2">
                                    <label
                                        for="numero_transaccion"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <HashIcon class="w-4 h-4" />
                                        <span>Número de Transacción *</span>
                                    </label>
                                    <input
                                        v-model="form.numero_transaccion"
                                        type="text"
                                        id="numero_transaccion"
                                        placeholder="Ingresa el número de transacción"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                        :class="
                                            errors.numero_transaccion
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300'
                                        "
                                    />
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.numero_transaccion"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.numero_transaccion }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Método de Pago -->
                                <div class="space-y-2">
                                    <label
                                        for="metodo_id"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <CreditCardIcon class="w-4 h-4" />
                                        <span>Método de Pago *</span>
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.metodo_id"
                                            id="metodo_id"
                                            class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm appearance-none dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] pr-10 hover:shadow-md"
                                            :class="
                                                errors.metodo_id
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300'
                                            "
                                        >
                                            <option value="">Seleccionar método</option>
                                            <option
                                                v-for="method in paymentMethods"
                                                :key="method.id"
                                                :value="method.id"
                                            >
                                                {{ method.nombre }}
                                            </option>
                                        </select>
                                        <div
                                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                        >
                                            <ChevronDownIcon
                                                class="w-5 h-5 text-gray-400 transition-transform"
                                                :class="{ 'rotate-180': form.metodo_id }"
                                            />
                                        </div>
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.metodo_id"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.metodo_id }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Categoría con búsqueda mejorada -->
                                <div class="space-y-2">
                                    <label
                                        for="categoria_id"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <TagIcon class="w-4 h-4" />
                                        <span>Categoría *</span>
                                    </label>
                                    <div class="relative">
                                        <input
                                            v-model="categorySearch"
                                            type="text"
                                            placeholder="Buscar categoría..."
                                            class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] pr-20 hover:shadow-md"
                                            @focus="showCategoryDropdown = true"
                                            @blur="hideCategoryDropdown"
                                        />
                                        <div
                                            class="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2"
                                        >
                                            <button
                                                v-if="form.categoria_id"
                                                type="button"
                                                @click="clearCategory"
                                                class="p-1.5 text-gray-400 transition-colors rounded-lg hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            >
                                                <XIcon class="w-4 h-4" />
                                            </button>
                                            <SearchIcon class="w-5 h-5 text-gray-400" />
                                        </div>

                                        <Transition name="dropdown">
                                            <div
                                                v-if="showCategoryDropdown"
                                                class="absolute z-20 w-full mt-2 overflow-hidden border border-gray-300 shadow-2xl bg-white/95 dark:bg-gray-700/95 backdrop-blur-xl dark:border-gray-600 rounded-xl"
                                            >
                                                <div
                                                    class="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                                                >
                                                    <div
                                                        v-for="category in filteredCategories"
                                                        :key="category.id"
                                                        class="flex items-center justify-between px-4 py-3 transition-all duration-200 cursor-pointer hover:bg-emerald-50 dark:hover:bg-gray-600 min-h-[48px] group"
                                                        :class="
                                                            form.categoria_id === category.id
                                                                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30'
                                                                : ''
                                                        "
                                                        @mousedown="selectCategory(category)"
                                                    >
                                                        <div class="flex items-center space-x-3">
                                                            <div
                                                                class="flex items-center justify-center w-8 h-8 transition-transform duration-200 rounded-lg group-hover:scale-110"
                                                                :class="
                                                                    form.categoria_id ===
                                                                    category.id
                                                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                                                        : 'bg-emerald-100 dark:bg-emerald-900/30'
                                                                "
                                                            >
                                                                <TagIcon
                                                                    class="w-4 h-4"
                                                                    :class="
                                                                        form.categoria_id ===
                                                                        category.id
                                                                            ? 'text-white'
                                                                            : 'text-emerald-600 dark:text-emerald-400'
                                                                    "
                                                                />
                                                            </div>
                                                            <span
                                                                class="font-medium text-gray-900 dark:text-white"
                                                            >
                                                                {{ category.nombre }}
                                                            </span>
                                                        </div>
                                                        <div
                                                            class="flex items-center justify-center w-6 h-6"
                                                        >
                                                            <Transition name="check-fade">
                                                                <CheckIcon
                                                                    v-if="
                                                                        form.categoria_id ===
                                                                        category.id
                                                                    "
                                                                    class="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                                                    :stroke-width="3"
                                                                />
                                                            </Transition>
                                                        </div>
                                                    </div>
                                                    <div
                                                        v-if="filteredCategories.length === 0"
                                                        class="px-4 py-6 text-center"
                                                    >
                                                        <SearchXIcon
                                                            class="w-12 h-12 mx-auto mb-2 text-gray-400"
                                                        />
                                                        <p
                                                            class="text-sm font-medium text-gray-500 dark:text-gray-400"
                                                        >
                                                            No se encontraron categorías
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.categoria_id"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.categoria_id }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Caja Operativa -->
                                <div class="space-y-2">
                                    <label
                                        for="caja_operativa_id"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <WalletIcon class="w-4 h-4" />
                                        <span>Caja Operativa</span>
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.caja_operativa_id"
                                            id="caja_operativa_id"
                                            class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm appearance-none dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] pr-10 hover:shadow-md"
                                            :class="
                                                errors.caja_operativa_id
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300'
                                            "
                                        >
                                            <option value="">Seleccionar caja operativa</option>
                                            <option
                                                v-for="box in operatingBoxes"
                                                :key="box.id"
                                                :value="box.id"
                                            >
                                                {{ box.nombre }} (Saldo: ${{ box.saldo }})
                                            </option>
                                        </select>
                                        <div
                                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                        >
                                            <ChevronDownIcon
                                                class="w-5 h-5 text-gray-400 transition-transform"
                                                :class="{ 'rotate-180': form.caja_operativa_id }"
                                            />
                                        </div>
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.caja_operativa_id"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.caja_operativa_id }}</span>
                                        </span>
                                    </Transition>
                                </div>
                            </div>

                            <!-- Tipo de Transacción (solo Egreso, oculto) -->
                            <div
                                class="p-5 border shadow-lg rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200/50 dark:border-emerald-800/50"
                            >
                                <div class="flex items-center space-x-3">
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30"
                                    >
                                        <TrendingDownIcon
                                            class="w-5 h-5 text-red-600 dark:text-red-400"
                                            :stroke-width="2.5"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            class="text-base font-bold text-gray-900 dark:text-white"
                                        >
                                            Tipo de Transacción
                                        </p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">
                                            Este es un
                                            <strong class="text-red-600 dark:text-red-400"
                                                >Egreso</strong
                                            >
                                            (automático)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Producto y Monto -->
                        <div class="space-y-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 hover:scale-110"
                                >
                                    <PackageIcon
                                        class="w-5 h-5 text-orange-600 dark:text-orange-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <h2 class="text-xl font-black text-gray-900 dark:text-white">
                                    Información del Producto
                                </h2>
                            </div>

                            <div
                                class="p-5 text-sm border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                            >
                                <div class="flex items-start space-x-3">
                                    <InfoIcon
                                        class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400"
                                        :stroke-width="2.5"
                                    />
                                    <p class="text-blue-700 dark:text-blue-300">
                                        <span class="font-bold">Instrucciones:</span> Ingresa los
                                        detalles del producto o servicio, la fecha de la
                                        transacción, la cantidad y el importe total. El importe debe
                                        incluir impuestos si aplica.
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <!-- Ítem -->
                                <div class="space-y-2">
                                    <label
                                        for="item"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <FileTextIcon class="w-4 h-4" />
                                        <span>Ítem *</span>
                                    </label>
                                    <input
                                        v-model="form.item"
                                        type="text"
                                        id="item"
                                        placeholder="Descripción del ítem"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                        :class="
                                            errors.item
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300'
                                        "
                                    />
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.item"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.item }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Fecha -->
                                <div class="space-y-2">
                                    <label
                                        for="fecha"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <CalendarIcon class="w-4 h-4" />
                                        <span>Fecha *</span>
                                    </label>
                                    <input
                                        v-model="form.fecha"
                                        type="date"
                                        id="fecha"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                        :class="
                                            errors.fecha
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300'
                                        "
                                    />
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.fecha"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.fecha }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Cantidad -->
                                <div class="space-y-2">
                                    <label
                                        for="cantidad"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <HashIcon class="w-4 h-4" />
                                        <span>Cantidad *</span>
                                    </label>
                                    <input
                                        v-model.number="form.cantidad"
                                        type="number"
                                        step="0.01"
                                        id="cantidad"
                                        placeholder="0.00"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                        :class="
                                            errors.cantidad
                                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                : 'border-gray-300'
                                        "
                                    />
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.cantidad"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.cantidad }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Importe Total -->
                                <div class="space-y-2">
                                    <label
                                        for="importe_total"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <DollarSignIcon class="w-4 h-4" />
                                        <span>Importe Total *</span>
                                    </label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
                                        >
                                            <DollarSignIcon class="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            v-model.number="form.importe_total"
                                            type="number"
                                            step="0.01"
                                            id="importe_total"
                                            placeholder="0.00"
                                            class="block w-full py-3 pl-10 pr-4 text-base transition-all duration-200 border shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                            :class="
                                                errors.importe_total
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300'
                                            "
                                        />
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.importe_total"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.importe_total }}</span>
                                        </span>
                                    </Transition>
                                </div>
                            </div>
                        </div>

                        <!-- Ubicación y Vehículo -->
                        <div class="space-y-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 hover:scale-110"
                                >
                                    <MapPinIcon
                                        class="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <h2 class="text-xl font-black text-gray-900 dark:text-white">
                                    Ubicación y Vehículo
                                </h2>
                            </div>

                            <div
                                class="p-5 text-sm border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                            >
                                <div class="flex items-start space-x-3">
                                    <InfoIcon
                                        class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400"
                                        :stroke-width="2.5"
                                    />
                                    <p class="text-blue-700 dark:text-blue-300">
                                        <span class="font-bold">Instrucciones:</span> Selecciona el
                                        vehículo utilizado y opcionalmente ingresa las millas
                                        recorridas, punto de partida y destino. Esto ayuda a llevar
                                        un registro detallado de los gastos.
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <!-- Vehículo -->
                                <div class="space-y-2">
                                    <label
                                        for="vehicle_id"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <TruckIcon class="w-4 h-4" />
                                        <span>Vehículo *</span>
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.vehicle_id"
                                            id="vehicle_id"
                                            class="block w-full px-4 py-3 text-base transition-all duration-200 border shadow-sm appearance-none dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] pr-10 hover:shadow-md"
                                            :class="
                                                errors.vehicle_id
                                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                                    : 'border-gray-300'
                                            "
                                        >
                                            <option value="">Seleccionar vehículo</option>
                                            <option
                                                v-for="vehicle in vehicles"
                                                :key="vehicle.id"
                                                :value="vehicle.id"
                                            >
                                                ({{ vehicle.codigo_unico }})
                                                {{ vehicle.numero_placa }} ({{ vehicle.marca }}
                                                {{ vehicle.modelo }})
                                            </option>
                                        </select>
                                        <div
                                            class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                                        >
                                            <ChevronDownIcon
                                                class="w-5 h-5 text-gray-400 transition-transform"
                                                :class="{ 'rotate-180': form.vehicle_id }"
                                            />
                                        </div>
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.vehicle_id"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.vehicle_id }}</span>
                                        </span>
                                    </Transition>
                                </div>

                                <!-- Millas -->
                                <div class="space-y-2">
                                    <label
                                        for="millas"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <GaugeIcon class="w-4 h-4" />
                                        <span>Millas</span>
                                    </label>
                                    <input
                                        v-model.number="form.millas"
                                        type="number"
                                        id="millas"
                                        placeholder="0"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border border-gray-300 shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                    />
                                </div>

                                <!-- Punto de Partida -->
                                <div class="space-y-2">
                                    <label
                                        for="punto_de_partida"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <MapIcon class="w-4 h-4" />
                                        <span>Punto de Partida</span>
                                    </label>
                                    <input
                                        v-model="form.punto_de_partida"
                                        type="text"
                                        id="punto_de_partida"
                                        placeholder="Dirección de origen"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border border-gray-300 shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                    />
                                </div>

                                <!-- Destino -->
                                <div class="space-y-2">
                                    <label
                                        for="destino"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <NavigationIcon class="w-4 h-4" />
                                        <span>Destino</span>
                                    </label>
                                    <input
                                        v-model="form.destino"
                                        type="text"
                                        id="destino"
                                        placeholder="Dirección de destino"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border border-gray-300 shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>

                        <!-- Información Adicional -->
                        <div class="space-y-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30 hover:scale-110"
                                >
                                    <InfoIcon
                                        class="w-5 h-5 text-teal-600 dark:text-teal-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <h2 class="text-xl font-black text-gray-900 dark:text-white">
                                    Información Adicional
                                </h2>
                            </div>

                            <div
                                class="p-5 text-sm border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                            >
                                <div class="flex items-start space-x-3">
                                    <InfoIcon
                                        class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400"
                                        :stroke-width="2.5"
                                    />
                                    <p class="text-blue-700 dark:text-blue-300">
                                        <span class="font-bold">Instrucciones:</span> Ingresa el
                                        nombre del proveedor si aplica, selecciona el tipo de egreso
                                        (directo o indirecto) y añade cualquier observación
                                        relevante sobre la transacción.
                                    </p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <!-- Proveedor -->
                                <div class="space-y-2">
                                    <label
                                        for="cliente_proveedor"
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <UserIcon class="w-4 h-4" />
                                        <span>Proveedor</span>
                                    </label>
                                    <input
                                        v-model="form.cliente_proveedor"
                                        type="text"
                                        id="cliente_proveedor"
                                        placeholder="Nombre del proveedor"
                                        class="block w-full px-4 py-3 text-base transition-all duration-200 border border-gray-300 shadow-sm dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[48px] hover:shadow-md"
                                    />
                                </div>

                                <!-- Tipo de Egreso - NUEVA SECCIÓN CON DOS OPCIONES -->
                                <div class="space-y-2">
                                    <label
                                        class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                    >
                                        <SplitIcon class="w-4 h-4" />
                                        <span>Tipo de Egreso *</span>
                                    </label>
                                    <div class="space-y-3">
                                        <!-- Opción: Egreso Directo -->
                                        <label
                                            class="relative flex items-center p-4 space-x-4 transition-all duration-300 border-2 cursor-pointer group rounded-xl hover:shadow-lg min-h-[56px]"
                                            :class="
                                                form.egreso_directo === true
                                                    ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 shadow-md'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500'
                                            "
                                        >
                                            <input
                                                v-model="form.egreso_directo"
                                                type="radio"
                                                :value="true"
                                                class="sr-only"
                                            />
                                            <div
                                                class="relative flex items-center justify-center flex-shrink-0"
                                            >
                                                <div
                                                    class="flex items-center justify-center transition-all duration-300 border-2 rounded-full w-7 h-7"
                                                    :class="
                                                        form.egreso_directo === true
                                                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600'
                                                            : 'border-gray-300 group-hover:border-emerald-400'
                                                    "
                                                >
                                                    <Transition name="radio-scale">
                                                        <div
                                                            v-if="form.egreso_directo === true"
                                                            class="w-3 h-3 bg-white rounded-full"
                                                        ></div>
                                                    </Transition>
                                                </div>
                                            </div>
                                            <div class="flex items-center flex-1 space-x-3">
                                                <div
                                                    class="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-xl"
                                                    :class="
                                                        form.egreso_directo === true
                                                            ? 'bg-emerald-100 dark:bg-emerald-500/20'
                                                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20'
                                                    "
                                                >
                                                    <ZapIcon
                                                        class="w-5 h-5 transition-colors"
                                                        :class="
                                                            form.egreso_directo === true
                                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                                : 'text-gray-500 group-hover:text-emerald-500'
                                                        "
                                                        :stroke-width="2.5"
                                                    />
                                                </div>
                                                <div>
                                                    <span
                                                        class="block text-base font-bold"
                                                        :class="
                                                            form.egreso_directo === true
                                                                ? 'text-emerald-700 dark:text-emerald-300'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                        "
                                                    >
                                                        Egreso Directo
                                                    </span>
                                                    <span
                                                        class="text-xs text-gray-500 dark:text-gray-400"
                                                    >
                                                        Gasto pagado inmediatamente
                                                    </span>
                                                </div>
                                            </div>
                                            <Transition name="check-fade">
                                                <CheckCircle2Icon
                                                    v-if="form.egreso_directo === true"
                                                    class="absolute w-6 h-6 text-emerald-600 dark:text-emerald-400 top-3 right-3"
                                                    :stroke-width="2.5"
                                                />
                                            </Transition>
                                        </label>

                                        <!-- Opción: Egreso Indirecto -->
                                        <label
                                            class="relative flex items-center p-4 space-x-4 transition-all duration-300 border-2 cursor-pointer group rounded-xl hover:shadow-lg min-h-[56px]"
                                            :class="
                                                form.egreso_directo === false
                                                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-md'
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                                            "
                                        >
                                            <input
                                                v-model="form.egreso_directo"
                                                type="radio"
                                                :value="false"
                                                class="sr-only"
                                            />
                                            <div
                                                class="relative flex items-center justify-center flex-shrink-0"
                                            >
                                                <div
                                                    class="flex items-center justify-center transition-all duration-300 border-2 rounded-full w-7 h-7"
                                                    :class="
                                                        form.egreso_directo === false
                                                            ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-indigo-600'
                                                            : 'border-gray-300 group-hover:border-blue-400'
                                                    "
                                                >
                                                    <Transition name="radio-scale">
                                                        <div
                                                            v-if="form.egreso_directo === false"
                                                            class="w-3 h-3 bg-white rounded-full"
                                                        ></div>
                                                    </Transition>
                                                </div>
                                            </div>
                                            <div class="flex items-center flex-1 space-x-3">
                                                <div
                                                    class="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-xl"
                                                    :class="
                                                        form.egreso_directo === false
                                                            ? 'bg-blue-100 dark:bg-blue-500/20'
                                                            : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                                                    "
                                                >
                                                    <ClockIcon
                                                        class="w-5 h-5 transition-colors"
                                                        :class="
                                                            form.egreso_directo === false
                                                                ? 'text-blue-600 dark:text-blue-400'
                                                                : 'text-gray-500 group-hover:text-blue-500'
                                                        "
                                                        :stroke-width="2.5"
                                                    />
                                                </div>
                                                <div>
                                                    <span
                                                        class="block text-base font-bold"
                                                        :class="
                                                            form.egreso_directo === false
                                                                ? 'text-blue-700 dark:text-blue-300'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                        "
                                                    >
                                                        Egreso Indirecto
                                                    </span>
                                                    <span
                                                        class="text-xs text-gray-500 dark:text-gray-400"
                                                    >
                                                        Gasto diferido o pendiente
                                                    </span>
                                                </div>
                                            </div>
                                            <Transition name="check-fade">
                                                <CheckCircle2Icon
                                                    v-if="form.egreso_directo === false"
                                                    class="absolute w-6 h-6 text-blue-600 dark:text-blue-400 top-3 right-3"
                                                    :stroke-width="2.5"
                                                />
                                            </Transition>
                                        </label>
                                    </div>
                                    <Transition name="error-slide">
                                        <span
                                            v-if="errors.egreso_directo"
                                            class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                        >
                                            <AlertCircleIcon class="w-4 h-4" />
                                            <span>{{ errors.egreso_directo }}</span>
                                        </span>
                                    </Transition>
                                </div>
                            </div>

                            <!-- Observaciones -->
                            <div class="space-y-2">
                                <label
                                    for="observaciones"
                                    class="flex items-center space-x-2 text-sm font-bold text-gray-700 dark:text-gray-300"
                                >
                                    <MessageSquareIcon class="w-4 h-4" />
                                    <span>Observaciones</span>
                                </label>
                                <textarea
                                    v-model="form.observaciones"
                                    id="observaciones"
                                    rows="4"
                                    placeholder="Notas adicionales sobre el egreso..."
                                    class="block w-full px-4 py-3 text-base transition-all duration-200 border border-gray-300 shadow-sm resize-none dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white min-h-[120px] hover:shadow-md"
                                ></textarea>
                            </div>
                        </div>

                        <!-- Carga de Archivos (sin cambios) -->
                        <div class="space-y-6">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 hover:scale-110"
                                >
                                    <PaperclipIcon
                                        class="w-5 h-5 text-rose-600 dark:text-rose-400"
                                        :stroke-width="2.5"
                                    />
                                </div>
                                <h2 class="text-xl font-black text-gray-900 dark:text-white">
                                    Documentos Adjuntos
                                </h2>
                            </div>

                            <div
                                class="p-5 text-sm border shadow-lg rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                            >
                                <div class="flex items-start space-x-3">
                                    <InfoIcon
                                        class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400"
                                        :stroke-width="2.5"
                                    />
                                    <p class="text-blue-700 dark:text-blue-300">
                                        <span class="font-bold">Instrucciones:</span> Adjunta
                                        facturas, recibos o cualquier documento relevante. Formatos
                                        permitidos: PNG, JPG, PDF, AI, EPS, DOCX, PSD (Máximo 10MB).
                                        Puedes arrastrar los archivos al área designada o hacer clic
                                        para seleccionarlos.
                                    </p>
                                </div>
                            </div>

                            <!-- Área de Subida -->
                            <div class="relative">
                                <input
                                    type="file"
                                    id="archivo"
                                    ref="fileInput"
                                    @change="handleFileChange"
                                    class="sr-only"
                                    accept="image/*,application/pdf,application/postscript,application/illustrator,.ai,.eps,.psd,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    multiple
                                />
                                <label
                                    for="archivo"
                                    class="flex flex-col items-center justify-center w-full h-48 transition-all duration-300 border-2 border-dashed cursor-pointer sm:h-32 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 min-h-[120px] p-6 rounded-2xl"
                                    :class="{
                                        'border-red-500 bg-red-50 dark:bg-red-900/20':
                                            errors.archivo,
                                        'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg':
                                            isDragging,
                                        'border-gray-300 dark:border-gray-600 hover:border-emerald-400 hover:shadow-md':
                                            !errors.archivo && !isDragging,
                                    }"
                                    @dragover.prevent="isDragging = true"
                                    @dragleave.prevent="isDragging = false"
                                    @drop.prevent="handleDrop"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center text-center"
                                    >
                                        <UploadCloudIcon
                                            class="w-16 h-16 mb-4 text-gray-400 transition-transform duration-300 dark:text-gray-500 sm:w-12 sm:h-12"
                                            :class="{ 'scale-110 text-emerald-500': isDragging }"
                                        />
                                        <p
                                            class="mb-2 text-base font-bold text-gray-600 dark:text-gray-400"
                                        >
                                            Toca para subir o arrastra archivos
                                        </p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">
                                            PNG, JPG, PDF, AI, EPS, DOCX, PSD (MAX. 10MB)
                                        </p>
                                        <Transition name="fade">
                                            <p
                                                v-if="form.archivos.length > 0"
                                                class="flex items-center mt-3 space-x-2 text-sm font-bold text-emerald-600 dark:text-emerald-400"
                                            >
                                                <CheckCircle2Icon class="w-5 h-5" />
                                                <span
                                                    >{{ form.archivos.length }} archivo(s)
                                                    seleccionado(s)</span
                                                >
                                            </p>
                                        </Transition>
                                    </div>
                                </label>
                            </div>

                            <Transition name="error-slide">
                                <span
                                    v-if="errors.archivo"
                                    class="flex items-center space-x-1.5 text-xs font-semibold text-red-600 dark:text-red-400"
                                >
                                    <AlertCircleIcon class="w-4 h-4" />
                                    <span>{{ errors.archivo }}</span>
                                </span>
                            </Transition>

                            <!-- Vista Previa de Archivos -->
                            <Transition name="list-fade">
                                <div
                                    v-if="form.archivos.length > 0"
                                    class="p-6 mt-4 border border-gray-200 shadow-xl rounded-2xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm dark:border-gray-600"
                                >
                                    <div class="flex items-center justify-between mb-4">
                                        <p
                                            class="flex items-center space-x-2 text-base font-bold text-gray-900 dark:text-white"
                                        >
                                            <PaperclipIcon class="w-5 h-5" />
                                            <span
                                                >Archivos seleccionados ({{
                                                    form.archivos.length
                                                }})</span
                                            >
                                        </p>
                                    </div>
                                    <div
                                        class="space-y-3 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                                    >
                                        <TransitionGroup name="list-item">
                                            <div
                                                v-for="(archivo, index) in form.archivos"
                                                :key="archivo.nombre + index"
                                                class="flex items-center justify-between p-4 transition-all duration-300 bg-white border shadow-md dark:bg-gray-600 rounded-xl hover:shadow-lg hover:scale-[1.02] border-gray-200/50 dark:border-gray-500/50"
                                            >
                                                <div
                                                    class="flex items-center flex-1 min-w-0 space-x-4"
                                                >
                                                    <div
                                                        v-if="isImage(archivo)"
                                                        class="flex-shrink-0"
                                                    >
                                                        <img
                                                            :src="archivo.previewUrl"
                                                            alt="Vista Previa"
                                                            class="object-cover border-2 border-gray-200 shadow-lg w-18 h-18 rounded-xl dark:border-gray-600"
                                                        />
                                                    </div>
                                                    <div v-else class="flex-shrink-0">
                                                        <div
                                                            class="flex items-center justify-center border-2 shadow-lg w-18 h-18 rounded-xl"
                                                            :class="{
                                                                'bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700':
                                                                    getFileType(archivo) === 'pdf',
                                                                'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700':
                                                                    getFileType(archivo) === 'docx',
                                                                'bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700':
                                                                    ['ai', 'eps'].includes(
                                                                        getFileType(archivo)
                                                                    ),
                                                                'bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700':
                                                                    getFileType(archivo) === 'psd',
                                                                'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600':
                                                                    ![
                                                                        'pdf',
                                                                        'docx',
                                                                        'ai',
                                                                        'eps',
                                                                        'psd',
                                                                    ].includes(
                                                                        getFileType(archivo)
                                                                    ),
                                                            }"
                                                        >
                                                            <FileTextIcon
                                                                class="w-9 h-9"
                                                                :class="{
                                                                    'text-red-600 dark:text-red-400':
                                                                        getFileType(archivo) ===
                                                                        'pdf',
                                                                    'text-blue-600 dark:text-blue-400':
                                                                        getFileType(archivo) ===
                                                                        'docx',
                                                                    'text-orange-600 dark:text-orange-400':
                                                                        ['ai', 'eps'].includes(
                                                                            getFileType(archivo)
                                                                        ),
                                                                    'text-purple-600 dark:text-purple-400':
                                                                        getFileType(archivo) ===
                                                                        'psd',
                                                                    'text-gray-600 dark:text-gray-400':
                                                                        ![
                                                                            'pdf',
                                                                            'docx',
                                                                            'ai',
                                                                            'eps',
                                                                            'psd',
                                                                        ].includes(
                                                                            getFileType(archivo)
                                                                        ),
                                                                }"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="flex-1 min-w-0">
                                                        <p
                                                            class="text-base font-bold text-gray-900 truncate dark:text-white"
                                                        >
                                                            {{ archivo.nombre }}
                                                        </p>
                                                        <p
                                                            class="text-sm text-gray-600 dark:text-gray-400"
                                                        >
                                                            {{ formatFileSize(archivo.tamano) }}
                                                        </p>
                                                        <p
                                                            class="text-xs font-semibold text-gray-500 uppercase dark:text-gray-500"
                                                        >
                                                            {{ getFileType(archivo) }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="flex items-center space-x-2">
                                                    <button
                                                        type="button"
                                                        @click="downloadFile(archivo)"
                                                        class="p-3 text-blue-600 transition-all duration-200 rounded-xl hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 active:scale-95"
                                                    >
                                                        <DownloadIcon class="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        @click="removeFile(index)"
                                                        class="p-3 text-red-600 transition-all duration-200 rounded-xl hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 active:scale-95"
                                                    >
                                                        <Trash2Icon class="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </TransitionGroup>
                                    </div>
                                </div>
                            </Transition>
                        </div>

                        <!-- Botón de Envío -->
                        <div class="pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                :disabled="loading || !vehicles.length"
                                class="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-2xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] min-h-[56px] text-lg"
                            >
                                <Loader2Icon v-if="loading" class="w-6 h-6 mr-3 animate-spin" />
                                <SaveIcon v-else class="w-6 h-6 mr-3" />
                                {{
                                    loading
                                        ? 'Procesando...'
                                        : `Guardar Egreso (${form.archivos.length} archivos)`
                                }}
                            </button>
                            <Transition name="fade">
                                <p
                                    v-if="!vehicles.length"
                                    class="flex items-center justify-center mt-4 space-x-2 text-sm font-semibold text-center text-red-600 dark:text-red-400"
                                >
                                    <AlertTriangleIcon class="w-5 h-5" />
                                    <span
                                        >No hay vehículos disponibles. Por favor, registra un
                                        vehículo primero.</span
                                    >
                                </p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { categoriesActives } from '@/services/CategoryService';
import { operatingBoxesActives } from '@/services/OperatingBoxService';
import { paymentMethodsActivesDriver } from '@/services/PaymentMethodService';
import { saveTransactionFinancialDriver } from '@/services/TransactionFinancialService';
import { transactionStatesActives } from '@/services/TransactionStateService';
import { vehiclesAuthUser } from '@/services/VehicleService';
import {
    AlertCircleIcon,
    AlertTriangleIcon,
    CalendarIcon,
    CheckCircle2Icon,
    CheckIcon,
    ChevronDownIcon,
    ClockIcon,
    CreditCardIcon,
    DollarSignIcon,
    DownloadIcon,
    FileTextIcon,
    GaugeIcon,
    HashIcon,
    InfoIcon,
    Loader2Icon,
    MapIcon,
    MapPinIcon,
    MessageSquareIcon,
    NavigationIcon,
    PackageIcon,
    PaperclipIcon,
    ReceiptIcon,
    RefreshCwIcon,
    SaveIcon,
    SearchIcon,
    SearchXIcon,
    SplitIcon,
    TagIcon,
    Trash2Icon,
    TrendingDownIcon,
    TruckIcon,
    UploadCloudIcon,
    UserIcon,
    WalletIcon,
    XIcon,
    ZapIcon,
} from 'lucide-vue-next';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

// --- STATE ---
const form = ref({
    numero_transaccion: '',
    metodo_id: '',
    categoria_id: '',
    vehicle_id: '',
    caja_operativa_id: '',
    estado_de_transaccion_id: '',
    fecha: '',
    punto_de_partida: '',
    destino: '',
    millas: null,
    item: '',
    cantidad: null,
    importe_total: null,
    cliente_proveedor: '',
    egreso_directo: true, // Por defecto: Egreso Directo
    observaciones: '',
    archivos: [],
});

const loading = ref(false);
const errors = ref({});
const fileInput = ref(null);
const isDragging = ref(false);
const topSection = ref(null);

const {
    showSuccess,
    showError,
    showWarning,
    showConfirm,
    showValidationErrors,
    showLoading,
    closeLoading,
} = useAlert();

// --- LISTAS DE DATOS ---
const paymentMethods = ref([]);
const categories = ref([]);
const vehicles = ref([]);
const transactionStates = ref([]);
const operatingBoxes = ref([]);

// --- Búsqueda de categorías ---
const categorySearch = ref('');
const showCategoryDropdown = ref(false);
const filteredCategories = computed(() => {
    if (!categorySearch.value) return categories.value;
    return categories.value.filter(category =>
        category.nombre.toLowerCase().includes(categorySearch.value.toLowerCase())
    );
});

// --- MÉTODOS DE CARGA DE DATOS (sin cambios) ---
const listPaymentMethodsActives = async () => {
    try {
        const { data } = await paymentMethodsActivesDriver();
        paymentMethods.value = data.datos;
    } catch (error) {
        console.error('[Form] Error loading payment methods:', error);
        showError('Error', 'No se pudieron cargar los métodos de pago');
    }
};

const listCategoriesActives = async () => {
    try {
        const { data } = await categoriesActives();
        categories.value = data.datos;
    } catch (error) {
        console.error('[Form] Error loading categories:', error);
        showError('Error', 'No se pudieron cargar las categorías');
    }
};

const listTransactionStatesActives = async () => {
    try {
        const { data } = await transactionStatesActives();
        transactionStates.value = data.datos.filter(state => state.nombre === 'Pagado');
        if (transactionStates.value.length > 0) {
            form.value.estado_de_transaccion_id = transactionStates.value[0].id;
        }
    } catch (error) {
        console.error('[Form] Error loading transaction states:', error);
        showError('Error', 'No se pudieron cargar los estados de transacción');
    }
};

const listVehiclesTheUserAuthenticated = async () => {
    try {
        const { data } = await vehiclesAuthUser();
        vehicles.value = data.datos;
        if (!vehicles.value.length) {
            showWarning(
                'Advertencia',
                'No hay vehículos disponibles. Por favor, registra un vehículo primero.'
            );
        }
    } catch (error) {
        console.error('[Form] Error loading vehicles:', error);
        showError('Error', 'No se pudieron cargar los vehículos');
    }
};

const listOperatingBoxesActives = async () => {
    try {
        const { data } = await operatingBoxesActives();
        operatingBoxes.value = data.data;
    } catch (error) {
        console.error('[Form] Error loading operating boxes:', error);
        showError('Error', 'No se pudieron cargar las cajas operativas');
    }
};

// --- MANEJO DE BÚSQUEDA DE CATEGORÍAS ---
const selectCategory = category => {
    form.value.categoria_id = category.id;
    categorySearch.value = category.nombre;
    showCategoryDropdown.value = false;
};

const clearCategory = () => {
    form.value.categoria_id = '';
    categorySearch.value = '';
};

const hideCategoryDropdown = () => {
    setTimeout(() => {
        showCategoryDropdown.value = false;
    }, 200);
};

// --- MANEJO DE ARCHIVOS (sin cambios) ---
const handleFileChange = event => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/postscript',
        'application/illustrator',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/vnd.adobe.photoshop',
    ];
    const validExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'pdf',
        'ai',
        'eps',
        'docx',
        'psd',
    ];

    errors.value.archivo = '';

    files.forEach(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isValidType = validTypes.includes(file.type);
        const isValidExtension = validExtensions.includes(extension);

        if (!isValidType && !isValidExtension) {
            errors.value.archivo =
                'Formato no permitido. Usa: JPG, PNG, GIF, PDF, AI, EPS, DOCX, PSD.';
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            errors.value.archivo = 'El archivo no debe exceder los 10MB.';
            return;
        }

        const archivo = {
            file: file,
            nombre: file.name,
            tamano: file.size,
            tipo: file.type,
            previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        };

        form.value.archivos.push(archivo);
    });
};

const handleDrop = event => {
    isDragging.value = false;
    const files = Array.from(event.dataTransfer.files);
    if (files.length) {
        if (fileInput.value) {
            fileInput.value.files = event.dataTransfer.files;
            handleFileChange({ target: { files } });
        }
    }
};

const removeFile = index => {
    if (form.value.archivos[index].previewUrl) {
        URL.revokeObjectURL(form.value.archivos[index].previewUrl);
    }
    form.value.archivos.splice(index, 1);

    if (form.value.archivos.length === 0 && fileInput.value) {
        fileInput.value.value = '';
    }
};

const downloadFile = archivo => {
    const url = URL.createObjectURL(archivo.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = archivo.nombre;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
};

const isImage = archivo => {
    return archivo.tipo?.startsWith('image/');
};

const getFileType = archivo => {
    if (!archivo) return '';
    const ext = archivo.nombre.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'pdf';
    if (['docx', 'doc'].includes(ext)) return 'docx';
    if (['ai', 'eps'].includes(ext)) return 'ai';
    if (['psd'].includes(ext)) return 'psd';
    return 'file';
};

const formatFileSize = bytes => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// --- FUNCIÓN DE DESPLAZAMIENTO HACIA ARRIBA ---
const scrollToTop = () => {
    const mainContainer =
        document.querySelector('main') ||
        document.querySelector('.overflow-auto') ||
        document.documentElement;

    if (mainContainer && typeof mainContainer.scrollTo === 'function') {
        mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// --- ENVÍO DEL FORMULARIO ---
const submitForm = async () => {
    const confirm = await showConfirm(
        'Confirmar Envío',
        '¿Estás seguro de que deseas registrar este egreso?'
    );

    if (!confirm) return;

    loading.value = true;
    errors.value = {};

    if (!vehicles.value.length) {
        showError(
            'Error',
            'No hay vehículos disponibles. Por favor, registra un vehículo primero.'
        );
        loading.value = false;
        return;
    }

    const formData = new FormData();

    for (const key in form.value) {
        if (key === 'egreso_directo') {
            formData.append(key, form.value[key] ? '1' : '0');
        } else if (key === 'archivos') {
            if (form.value[key] && form.value[key].length > 0) {
                form.value[key].forEach(archivo => {
                    formData.append('archivo[]', archivo.file);
                });
            }
        } else if (form.value[key] !== null && form.value[key] !== '') {
            formData.append(key, form.value[key]);
        }
    }

    try {
        showLoading('Registrando egreso...');
        const response = await saveTransactionFinancialDriver(formData);
        closeLoading();

        Object.assign(form.value, {
            numero_transaccion: '',
            metodo_id: '',
            categoria_id: '',
            vehicle_id: '',
            caja_operativa_id: '',
            estado_de_transaccion_id:
                transactionStates.value.length > 0 ? transactionStates.value[0].id : '',
            fecha: new Date().toISOString().split('T')[0],
            punto_de_partida: '',
            destino: '',
            millas: null,
            item: '',
            cantidad: null,
            importe_total: null,
            cliente_proveedor: '',
            egreso_directo: true,
            observaciones: '',
            archivos: [],
        });
        categorySearch.value = '';

        if (fileInput.value) {
            fileInput.value.value = '';
        }

        await nextTick();

        if (response.data.excedente_por_pagar > 0) {
            await showWarning(
                'Saldo Insuficiente',
                `El egreso se registró parcialmente. Se descontó $${response.data.data.operating_box.monto_descontado} de la caja operativa. 
                El excedente de $${response.data.excedente_por_pagar} se ha registrado como pago pendiente.`,
                {
                    didClose: () => {
                        setTimeout(() => {
                            scrollToTop();
                        }, 100);
                    },
                }
            );
        } else {
            await showSuccess('Éxito', response.data.message, {
                didClose: () => {
                    setTimeout(() => {
                        scrollToTop();
                    }, 100);
                },
            });
        }

        scrollToTop();
    } catch (error) {
        closeLoading();
        console.error('[Form] Error submitting:', error);

        if (error.response) {
            if (error.response.status === 422) {
                if (error.response.data?.message?.includes('Saldo insuficiente')) {
                    const data = error.response.data;
                    showWarning(
                        'Saldo Insuficiente',
                        `La caja operativa "${
                            data.operating_box?.nombre || 'desconocida'
                        }" no tiene suficiente saldo. 
                        Saldo disponible: $${data.saldo_disponible || 0}. 
                        Monto requerido: $${data.monto_requerido || form.value.importe_total}.
                        Se ha registrado un pago pendiente por $${data.excedente_por_pagar || 0}.`
                    );
                } else {
                    errors.value = error.response.data.errors;
                    showValidationErrors(error.response.data.errors);
                }
            } else {
                showError(
                    'Error del servidor',
                    error.response.data.message || 'Ocurrió un error en el servidor'
                );
            }
        } else if (error.request) {
            showError(
                'Error de conexión',
                'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
            );
        } else {
            showError('Error inesperado', 'Ocurrió un error al procesar la solicitud.');
        }
    } finally {
        loading.value = false;
    }
};

// --- WATCHERS ---
watch(categorySearch, newValue => {
    if (newValue === '') {
        form.value.categoria_id = '';
    }
});

// --- ON MOUNTED ---
onMounted(() => {
    listPaymentMethodsActives();
    listCategoriesActives();
    listTransactionStatesActives();
    listVehiclesTheUserAuthenticated();
    listOperatingBoxesActives();
    form.value.fecha = new Date().toISOString().split('T')[0];
    console.log('[Form] Component mounted');
});
</script>

<style scoped>
/* Scrollbar personalizado */
.scrollbar-thin::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
    background: rgb(209 213 219);
    border-radius: 3px;
}

.dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
    background: rgb(75 85 99);
    border-radius: 3px;
}

/* Transición suave para el check en dropdown */
.check-fade-enter-active,
.check-fade-leave-active {
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.check-fade-enter-from,
.check-fade-leave-to {
    opacity: 0;
    transform: scale(0.3) rotate(-180deg);
}

/* Transición para radio buttons */
.radio-scale-enter-active,
.radio-scale-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.radio-scale-enter-from,
.radio-scale-leave-to {
    opacity: 0;
    transform: scale(0);
}

/* Transición para dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}

/* Transición para errores */
.error-slide-enter-active,
.error-slide-leave-active {
    transition: all 0.3s ease;
}

.error-slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.error-slide-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

/* Transiciones fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Transición para lista de archivos */
.list-fade-enter-active,
.list-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-fade-enter-from,
.list-fade-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

/* Transición para items individuales de lista */
.list-item-enter-active,
.list-item-leave-active {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.list-item-enter-from {
    opacity: 0;
    transform: translateX(-20px);
}

.list-item-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.list-item-move {
    transition: transform 0.3s ease;
}
</style>
