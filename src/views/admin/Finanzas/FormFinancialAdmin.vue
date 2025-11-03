<template>
    <div
        class="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800"
    >
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <!-- Header Compacto -->
            <div
                ref="headerElement"
                class="sticky top-0 z-10 px-4 py-3 mb-6 transition-all duration-300 shadow-md rounded-xl backdrop-blur-md sm:px-6"
                :class="{
                    'bg-white/95 shadow-emerald-500/10 dark:bg-gray-800/95': true,
                }"
            >
                <div
                    class="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center"
                >
                    <div class="flex items-center gap-3">
                        <div
                            class="flex items-center justify-center w-12 h-12 text-white transition-transform shadow-lg rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 hover:scale-105 sm:h-10 sm:w-10"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                                Registrar Transacción
                            </h1>
                            <p class="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                                Completa los datos para registrar una nueva transacción
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Contenido del Formulario -->
            <div class="pb-8">
                <form
                    @submit.prevent="submitForm"
                    class="overflow-hidden transition-shadow duration-300 bg-white shadow-2xl rounded-2xl hover:shadow-3xl dark:bg-gray-800"
                >
                    <!-- Barra de Progreso Compacta -->
                    <div class="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700">
                        <div
                            class="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center"
                        >
                            <div class="flex items-center gap-2">
                                <svg
                                    class="w-5 h-5 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span class="text-sm font-medium text-white md:text-base"
                                    >Información de la Transacción</span
                                >
                            </div>
                            <span class="px-3 py-1 text-xs text-white rounded-full bg-white/20">
                                Paso 1 de 1
                            </span>
                        </div>
                    </div>
                    <!-- Contenido del Formulario -->
                    <div class="p-6 space-y-8">
                        <!-- Sección: Información General -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 text-purple-600 transition-transform bg-purple-100 shadow-sm rounded-xl hover:scale-105 dark:bg-purple-900/40 dark:text-purple-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Información General
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span>
                                        Selecciona el negocio y tipo de transacción. Estos campos
                                        son obligatorios.</span
                                    >
                                </p>
                            </div>
                            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <!-- Negocio -->
                                <div class="space-y-2">
                                    <label
                                        for="negocio_id"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Negocio
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.negocio_id"
                                            id="negocio_id"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.negocio_id,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.negocio_id,
                                            }"
                                        >
                                            <option value="">Seleccionar negocio</option>
                                            <option
                                                v-for="business in businesses"
                                                :key="business.id"
                                                :value="business.id"
                                            >
                                                {{ business.nombre }}
                                            </option>
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
                                    <p
                                        v-if="errors.negocio_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.negocio_id }}
                                    </p>
                                </div>
                                <!-- Número de Transacción -->
                                <div class="space-y-2">
                                    <label
                                        for="numero_transaccion"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Número de Transacción
                                    </label>
                                    <input
                                        v-model="form.numero_transaccion"
                                        type="text"
                                        id="numero_transaccion"
                                        placeholder="Opcional: se generará automáticamente"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="{
                                            'border-red-500 focus:ring-red-500/20':
                                                errors.numero_transaccion,
                                            'border-gray-300 focus:border-emerald-500':
                                                !errors.numero_transaccion,
                                        }"
                                    />
                                    <p
                                        v-if="errors.numero_transaccion"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.numero_transaccion }}
                                    </p>
                                </div>
                                <!-- Tipo de Transacción -->
                                <div class="space-y-2">
                                    <label
                                        for="tipo_de_transaccion"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Tipo de Transacción
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.tipo_de_transaccion"
                                            id="tipo_de_transaccion"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.tipo_de_transaccion,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.tipo_de_transaccion,
                                            }"
                                            @change="handleTipoTransaccionChange"
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
                                    <p
                                        v-if="errors.tipo_de_transaccion"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.tipo_de_transaccion }}
                                    </p>
                                </div>
                                <!-- Caja Operativa -->
                                <div class="space-y-2">
                                    <label
                                        for="caja_operativa_id"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Caja chica (opcional)
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.caja_operativa_id"
                                            id="caja_operativa_id"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.caja_operativa_id,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.caja_operativa_id,
                                            }"
                                        >
                                            <option value="">Seleccionar caja (opcional)</option>
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
                                    <p
                                        v-if="errors.caja_operativa_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.caja_operativa_id }}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <!-- Sección: Detalles de la Transacción -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 text-purple-600 transition-transform bg-purple-100 shadow-sm rounded-xl hover:scale-105 dark:bg-purple-900/40 dark:text-purple-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Detalles de la Transacción
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span>
                                        Selecciona el método de pago, categoría y estado. La
                                        categoría se puede buscar escribiendo.</span
                                    >
                                </p>
                            </div>
                            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <!-- Método de Pago -->
                                <div class="space-y-2">
                                    <label
                                        for="metodo_id"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Método de Pago
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.metodo_id"
                                            id="metodo_id"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.metodo_id,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.metodo_id,
                                            }"
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
                                    <p
                                        v-if="errors.metodo_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.metodo_id }}
                                    </p>
                                </div>
                                <!-- Categoría con búsqueda mejorada -->
                                <div class="space-y-2">
                                    <label
                                        for="categoria_id"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Categoría
                                    </label>
                                    <div class="relative">
                                        <input
                                            v-model="categorySearch"
                                            type="text"
                                            placeholder="Buscar categoría..."
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            @focus="showCategoryDropdown = true"
                                            @blur="hideCategoryDropdown"
                                        />
                                        <div
                                            v-if="form.categoria_id"
                                            class="absolute inset-y-0 flex items-center right-10"
                                        >
                                            <button
                                                type="button"
                                                @click="clearCategory"
                                                class="p-1 text-gray-400 transition-colors rounded hover:text-gray-600 dark:hover:text-gray-200"
                                                aria-label="Clear category"
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
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div
                                            v-if="showCategoryDropdown"
                                            class="absolute z-20 w-full mt-1 overflow-y-auto bg-white border border-gray-300 shadow-xl max-h-60 rounded-xl dark:border-gray-600 dark:bg-gray-700"
                                        >
                                            <div
                                                v-for="category in filteredCategories"
                                                :key="category.id"
                                                class="px-4 py-3 text-sm text-gray-900 transition-colors cursor-pointer hover:bg-emerald-50 dark:text-white dark:hover:bg-gray-600"
                                                @mousedown="selectCategory(category)"
                                            >
                                                <div class="flex items-center gap-3">
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                                                    >
                                                        <svg
                                                            class="w-3 h-3"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clip-rule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                    <span>{{ category.nombre }}</span>
                                                </div>
                                            </div>
                                            <div
                                                v-if="filteredCategories.length === 0"
                                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
                                            >
                                                No se encontraron categorías
                                            </div>
                                        </div>
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
                                    <p
                                        v-if="errors.categoria_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.categoria_id }}
                                    </p>
                                </div>
                                <!-- Estado de Transacción -->
                                <div class="space-y-2">
                                    <label
                                        for="estado_de_transaccion_id"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Estado
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.estado_de_transaccion_id"
                                            id="estado_de_transaccion_id"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.estado_de_transaccion_id,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.estado_de_transaccion_id,
                                            }"
                                        >
                                            <option value="">Seleccionar estado</option>
                                            <option
                                                v-for="state in transactionStates"
                                                :key="state.id"
                                                :value="state.id"
                                            >
                                                {{ state.nombre }}
                                            </option>
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
                                    <p
                                        v-if="errors.estado_de_transaccion_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.estado_de_transaccion_id }}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <!-- Sección: Información del Producto -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 text-orange-600 transition-transform bg-orange-100 shadow-sm rounded-xl hover:scale-105 dark:bg-orange-900/40 dark:text-orange-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Información del Producto
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span> Ingresa
                                        los detalles del producto, fecha, cantidad e importe total.
                                        El importe debe incluir impuestos.</span
                                    >
                                </p>
                            </div>
                            <div class="grid gap-6 sm:grid-cols-2">
                                <!-- Ítem -->
                                <div class="space-y-2">
                                    <label
                                        for="item"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Ítem
                                    </label>
                                    <input
                                        v-model="form.item"
                                        type="text"
                                        id="item"
                                        placeholder="Descripción del ítem"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="{
                                            'border-red-500 focus:ring-red-500/20': errors.item,
                                            'border-gray-300 focus:border-emerald-500':
                                                !errors.item,
                                        }"
                                    />
                                    <p
                                        v-if="errors.item"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.item }}
                                    </p>
                                </div>
                                <!-- Fecha -->
                                <div class="space-y-2">
                                    <label
                                        for="fecha"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Fecha
                                    </label>
                                    <input
                                        v-model="form.fecha"
                                        type="date"
                                        id="fecha"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="{
                                            'border-red-500 focus:ring-red-500/20': errors.fecha,
                                            'border-gray-300 focus:border-emerald-500':
                                                !errors.fecha,
                                        }"
                                    />
                                    <p
                                        v-if="errors.fecha"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.fecha }}
                                    </p>
                                </div>
                                <!-- Cantidad -->
                                <div class="space-y-2">
                                    <label
                                        for="cantidad"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Cantidad
                                    </label>
                                    <input
                                        v-model.number="form.cantidad"
                                        type="number"
                                        step="0.01"
                                        id="cantidad"
                                        placeholder="0.00"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        :class="{
                                            'border-red-500 focus:ring-red-500/20': errors.cantidad,
                                            'border-gray-300 focus:border-emerald-500':
                                                !errors.cantidad,
                                        }"
                                    />
                                    <p
                                        v-if="errors.cantidad"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.cantidad }}
                                    </p>
                                </div>
                                <!-- Importe Total -->
                                <div class="space-y-2">
                                    <label
                                        for="importe_total"
                                        class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                    >
                                        Importe Total
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
                                            v-model.number="form.importe_total"
                                            type="number"
                                            step="0.01"
                                            id="importe_total"
                                            placeholder="0.00"
                                            class="block w-full rounded-xl border py-3 pl-10 pr-4 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5 sm:pl-9"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.importe_total,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.importe_total,
                                            }"
                                        />
                                    </div>
                                    <p
                                        v-if="errors.importe_total"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.importe_total }}
                                    </p>
                                </div>
                            </div>
                        </section>
                        <!-- Sección: Ubicación y Vehículo -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 text-indigo-600 transition-transform bg-indigo-100 shadow-sm rounded-xl hover:scale-105 dark:bg-indigo-900/40 dark:text-indigo-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Ubicación y Vehículo
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span>
                                        Selecciona el vehículo (opcional) e ingresa millas, punto de
                                        partida y destino si aplica.</span
                                    >
                                </p>
                            </div>
                            <div class="grid gap-6 sm:grid-cols-2">
                                <!-- Vehículo -->
                                <div class="space-y-2">
                                    <label
                                        for="vehicle_id"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Vehículo
                                    </label>
                                    <div class="relative">
                                        <select
                                            v-model="form.vehicle_id"
                                            id="vehicle_id"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                            :class="{
                                                'border-red-500 focus:ring-red-500/20':
                                                    errors.vehicle_id,
                                                'border-gray-300 focus:border-emerald-500':
                                                    !errors.vehicle_id,
                                            }"
                                        >
                                            <option value="">Seleccionar vehículo</option>
                                            <option
                                                v-for="vehicle in vehicles"
                                                :key="vehicle.id"
                                                :value="vehicle.id"
                                            >
                                                {{ vehicle.codigo_unico }} -
                                                {{ vehicle.numero_placa }} ({{ vehicle.marca }}
                                                {{ vehicle.modelo }})
                                            </option>
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
                                    <p
                                        v-if="errors.vehicle_id"
                                        class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                    >
                                        <svg
                                            class="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        {{ errors.vehicle_id }}
                                    </p>
                                </div>
                                <!-- Millas -->
                                <div class="space-y-2">
                                    <label
                                        for="millas"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Millas
                                    </label>
                                    <input
                                        v-model.number="form.millas"
                                        type="number"
                                        id="millas"
                                        placeholder="0"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    />
                                </div>
                                <!-- Punto de Partida -->
                                <div class="space-y-2">
                                    <label
                                        for="punto_de_partida"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Punto de Partida
                                    </label>
                                    <input
                                        v-model="form.punto_de_partida"
                                        type="text"
                                        id="punto_de_partida"
                                        placeholder="Dirección de origen"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    />
                                </div>
                                <!-- Destino -->
                                <div class="space-y-2">
                                    <label
                                        for="destino"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Destino
                                    </label>
                                    <input
                                        v-model="form.destino"
                                        type="text"
                                        id="destino"
                                        placeholder="Dirección de destino"
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    />
                                </div>
                            </div>
                        </section>
                        <!-- Sección: Información Adicional -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 text-teal-600 transition-transform bg-teal-100 shadow-sm rounded-xl hover:scale-105 dark:bg-teal-900/40 dark:text-teal-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Información Adicional
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span> Ingresa
                                        el nombre del cliente o proveedor, marca si es un egreso
                                        directo y añade observaciones.</span
                                    >
                                </p>
                            </div>
                            <div class="space-y-6">
                                <div class="grid gap-6 sm:grid-cols-2">
                                    <!-- Cliente/Proveedor -->
                                    <div class="space-y-2">
                                        <label
                                            for="cliente_proveedor"
                                            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Cliente/Proveedor
                                        </label>
                                        <input
                                            v-model="form.cliente_proveedor"
                                            type="text"
                                            id="cliente_proveedor"
                                            placeholder="Nombre del cliente o proveedor"
                                            class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                        />
                                    </div>
                                    <!-- Egreso Directo - Solo visible para egresos -->
                                    <div
                                        v-if="form.tipo_de_transaccion === 'Egreso'"
                                        class="space-y-2"
                                    >
                                        <label
                                            class="block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-gray-300"
                                        >
                                            Tipo de Egreso
                                        </label>
                                        <div class="flex flex-col gap-2 sm:flex-row">
                                            <label
                                                class="flex items-center gap-3 p-4 transition-all duration-200 border cursor-pointer rounded-xl hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
                                                :class="{
                                                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:border-emerald-400':
                                                        form.egreso_directo === true,
                                                }"
                                            >
                                                <div class="relative">
                                                    <input
                                                        v-model="form.egreso_directo"
                                                        type="radio"
                                                        class="sr-only"
                                                        :value="true"
                                                        name="egreso_directo"
                                                    />
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 transition-colors duration-200 border rounded-md"
                                                        :class="
                                                            form.egreso_directo === true
                                                                ? 'border-emerald-500 bg-emerald-500'
                                                                : 'border-gray-300 dark:border-gray-500'
                                                        "
                                                    >
                                                        <svg
                                                            v-if="form.egreso_directo === true"
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
                                                <span
                                                    class="text-base text-gray-700 dark:text-gray-300"
                                                >
                                                    Directo
                                                </span>
                                            </label>
                                            <label
                                                class="flex items-center gap-3 p-4 transition-all duration-200 border cursor-pointer rounded-xl hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-600 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
                                                :class="{
                                                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:border-emerald-400':
                                                        form.egreso_directo === false,
                                                }"
                                            >
                                                <div class="relative">
                                                    <input
                                                        v-model="form.egreso_directo"
                                                        type="radio"
                                                        class="sr-only"
                                                        :value="false"
                                                        name="egreso_directo"
                                                    />
                                                    <div
                                                        class="flex items-center justify-center w-6 h-6 transition-colors duration-200 border rounded-md"
                                                        :class="
                                                            form.egreso_directo === false
                                                                ? 'border-emerald-500 bg-emerald-500'
                                                                : 'border-gray-300 dark:border-gray-500'
                                                        "
                                                    >
                                                        <svg
                                                            v-if="form.egreso_directo === false"
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
                                                <span
                                                    class="text-base text-gray-700 dark:text-gray-300"
                                                >
                                                    Indirecto
                                                </span>
                                            </label>
                                        </div>
                                        <p
                                            v-if="errors.egreso_directo"
                                            class="flex items-center gap-1 mt-1 text-xs text-red-500"
                                        >
                                            <svg
                                                class="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            {{ errors.egreso_directo }}
                                        </p>
                                    </div>
                                </div>
                                <!-- Observaciones -->
                                <div class="space-y-2">
                                    <label
                                        for="observaciones"
                                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Observaciones
                                    </label>
                                    <textarea
                                        v-model="form.observaciones"
                                        id="observaciones"
                                        rows="3"
                                        placeholder="Notas adicionales sobre la transacción..."
                                        class="block w-full rounded-xl border px-4 py-3 text-base shadow-sm transition-all duration-200 focus:ring-4 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-emerald-500 sm:py-2.5"
                                    ></textarea>
                                </div>
                            </div>
                        </section>
                        <!-- Sección: Documentos Adjuntos -->
                        <section class="space-y-4">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex items-center justify-center w-10 h-10 transition-transform shadow-sm rounded-xl bg-rose-100 text-rose-600 hover:scale-105 dark:bg-rose-900/40 dark:text-rose-400 sm:h-8 sm:w-8"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fill-rule="evenodd"
                                            d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3.293 7.707A1 1 0 014 7h12a1 1 0 00.707.293l2 2A1 1 0 0119 10v4a1 1 0 01-1 1v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2a1 1 0 01-1-1v-4a1 1 0 01.293-.707l2-2z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Documentos Adjuntos
                                </h2>
                            </div>
                            <div
                                class="p-4 text-sm text-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                                <p class="flex items-start gap-2">
                                    <span
                                        class="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-500"
                                    ></span>
                                    <span
                                        ><span class="font-semibold">Instrucciones:</span> Adjunta
                                        facturas, recibos o documentos relevantes. Formatos: PNG,
                                        JPG, PDF, DOC, DOCX (Máximo 10MB por archivo). Puedes
                                        seleccionar múltiples archivos.</span
                                    >
                                </p>
                            </div>
                            <!-- Área de Subida mejorada -->
                            <div class="relative">
                                <input
                                    type="file"
                                    id="archivo"
                                    ref="fileInput"
                                    @change="handleFileChange"
                                    class="sr-only"
                                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    multiple
                                />
                                <label
                                    for="archivo"
                                    class="flex flex-col items-center justify-center h-48 transition-all duration-300 border-2 border-dashed cursor-pointer group rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 sm:h-40"
                                    :class="{
                                        'border-red-500 bg-red-50 dark:bg-red-900/20':
                                            errors.archivo,
                                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20':
                                            isDragging,
                                        'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700':
                                            !errors.archivo && !isDragging,
                                    }"
                                    @dragover.prevent="isDragging = true"
                                    @dragleave.prevent="isDragging = false"
                                    @drop.prevent="handleDrop"
                                >
                                    <div
                                        class="flex flex-col items-center justify-center px-4 text-center"
                                    >
                                        <svg
                                            class="w-12 h-12 mb-3 text-gray-500 transition-colors group-hover:text-emerald-500 dark:text-gray-400 sm:h-10 sm:w-10"
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
                                                class="block font-semibold text-emerald-600 dark:text-emerald-400"
                                                >Arrastra y suelta</span
                                            >
                                            o haz clic para seleccionar archivos
                                        </p>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">
                                            PNG, JPG, PDF, DOC, DOCX (MAX. 10MB por archivo)
                                        </p>
                                        <p
                                            v-if="form.archivos.length > 0"
                                            class="mt-1 text-xs text-emerald-600 dark:text-emerald-400"
                                        >
                                            {{ form.archivos.length }} archivo(s) seleccionado(s)
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <p
                                v-if="errors.archivo"
                                class="flex items-center gap-1 mt-1 text-xs text-red-500"
                            >
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                {{ errors.archivo }}
                            </p>
                            <!-- Vista Previa de Archivos mejorada -->
                            <div
                                v-if="form.archivos.length > 0"
                                class="p-5 rounded-xl bg-gray-50 dark:bg-gray-700"
                            >
                                <div
                                    class="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
                                >
                                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Archivos seleccionados ({{ form.archivos.length }}):
                                    </p>
                                </div>
                                <div class="mt-4 space-y-3">
                                    <div
                                        v-for="(archivo, index) in form.archivos"
                                        :key="index"
                                        class="flex flex-col items-start gap-4 p-3 bg-white rounded-lg shadow-sm dark:bg-gray-600 sm:flex-row sm:items-center"
                                    >
                                        <div v-if="isImage(archivo)" class="shrink-0">
                                            <img
                                                :src="archivo.previewUrl"
                                                alt="Vista Previa"
                                                class="object-cover w-32 h-32 border shadow-sm rounded-xl dark:border-gray-600 sm:h-28 sm:w-28"
                                            />
                                        </div>
                                        <div v-else class="shrink-0">
                                            <div
                                                class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-xl dark:bg-gray-600 sm:h-28 sm:w-28"
                                            >
                                                <svg
                                                    v-if="getFileType(archivo) === 'pdf'"
                                                    class="w-12 h-12 text-red-500 dark:text-red-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-4 4h3a2 2 0 012-2V8z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                                <svg
                                                    v-else-if="getFileType(archivo) === 'docx'"
                                                    class="w-12 h-12 text-blue-500 dark:text-blue-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 4l-4 4h3a2 2 0 012-2V8z"
                                                    ></path>
                                                </svg>
                                                <svg
                                                    v-else
                                                    class="w-12 h-12 text-gray-500 dark:text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                                        clip-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p
                                                class="text-base font-medium text-gray-900 truncate dark:text-white sm:text-sm"
                                            >
                                                {{ archivo.nombre }}
                                            </p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                                {{ formatFileSize(archivo.tamano) }}
                                            </p>
                                            <p class="text-xs text-gray-400 dark:text-gray-500">
                                                {{ getFileType(archivo).toUpperCase() }}
                                            </p>
                                        </div>
                                        <div class="flex gap-2">
                                            <button
                                                type="button"
                                                @click="downloadFile(archivo)"
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
                                                @click="removeFile(index)"
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
                                </div>
                            </div>
                        </section>
                        <!-- Botón de Envío -->
                        <div class="pt-6">
                            <button
                                type="submit"
                                :disabled="loading"
                                class="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5"
                            >
                                <svg
                                    v-if="loading"
                                    class="w-6 h-6 text-white animate-spin sm:h-5 sm:w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <svg
                                    v-else
                                    class="w-6 h-6 text-white transition-transform group-hover:scale-110 sm:h-5 sm:w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                {{
                                    loading
                                        ? 'Procesando...'
                                        : `Guardar Transacción (${form.archivos.length} archivos)`
                                }}
                                <span class="absolute flex w-3 h-3 -right-1 -top-1" v-if="!loading">
                                    <span
                                        class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"
                                    ></span>
                                    <span
                                        class="relative inline-flex w-3 h-3 rounded-full bg-emerald-500"
                                    ></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { businessesActives } from '@/services/BusinessService';
import { categoriesActives } from '@/services/CategoryService';
import { operatingBoxesActives } from '@/services/OperatingBoxService';
import { paymentMethodsActives } from '@/services/PaymentMethodService';
import { saveTransactionFinancialAdmin } from '@/services/TransactionFinancialService';
import { transactionStatesActives } from '@/services/TransactionStateService';
import { indexVehiclesActives } from '@/services/VehicleService';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

// Definir emit
const emit = defineEmits(['scroll-to-top']);

// --- STATE ---
const form = ref({
    negocio_id: '',
    metodo_id: '',
    categoria_id: '',
    vehicle_id: '',
    estado_de_transaccion_id: '',
    caja_operativa_id: '', // Nuevo campo para caja operativa
    fecha: '',
    punto_de_partida: '',
    destino: '',
    millas: null,
    tipo_de_transaccion: '',
    item: '',
    cantidad: null,
    importe_total: null,
    cliente_proveedor: '',
    egreso_directo: null, // Inicialmente null
    observaciones: '',
    archivos: [], // Array para múltiples archivos
    numero_transaccion: '', // Nuevo campo
});
const loading = ref(false);
const errors = ref({});
const fileInput = ref(null);
const isDragging = ref(false);
const headerElement = ref(null);
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
const businesses = ref([]);
const vehicles = ref([]);
const transactionStates = ref([]);
const operatingBoxes = ref([]); // Nueva lista para cajas operativas

// --- Búsqueda de categorías ---
const categorySearch = ref('');
const showCategoryDropdown = ref(false);
const filteredCategories = computed(() => {
    if (!categorySearch.value) return categories.value;
    return categories.value.filter(category =>
        category.nombre.toLowerCase().includes(categorySearch.value.toLowerCase())
    );
});

// --- MÉTODOS DE CARGA DE DATOS ---
const listPaymentMethodsActives = async () => {
    try {
        const { data } = await paymentMethodsActives();
        paymentMethods.value = data.datos;
    } catch (error) {
        console.error('Error al cargar métodos de pago:', error);
        showError('Error', 'No se pudieron cargar los métodos de pago');
    }
};
const listCategoriesActives = async () => {
    try {
        const { data } = await categoriesActives();
        categories.value = data.datos;
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        showError('Error', 'No se pudieron cargar las categorías');
    }
};
const listTransactionStatesActives = async () => {
    try {
        const { data } = await transactionStatesActives();
        transactionStates.value = data.datos;
    } catch (error) {
        console.error('Error al cargar estados de transacción:', error);
        showError('Error', 'No se pudieron cargar los estados de transacción');
    }
};
const listBusinessesActives = async () => {
    try {
        const { data } = await businessesActives();
        businesses.value = data.datos;
    } catch (error) {
        console.error('Error al cargar negocios:', error);
        showError('Error', 'No se pudieron cargar los negocios');
    }
};
const listVehiclesAll = async () => {
    try {
        const { data } = await indexVehiclesActives();
        vehicles.value = data.data;
    } catch (error) {
        console.error('Error al cargar vehículos:', error);
        showError('Error', 'No se pudieron cargar los vehículos');
    }
};
const listOperatingBoxesActives = async () => {
    try {
        const { data } = await operatingBoxesActives();
        console.log(data);
        operatingBoxes.value = data.data;
    } catch (error) {
        console.error('Error al cargar cajas operativas:', error);
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

// --- MANEJO DE ARCHIVOS ---
const handleFileChange = event => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const validTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'];

    // Limpiar errores previos
    errors.value.archivo = '';

    // Procesar cada archivo
    files.forEach(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        const isValidType = validTypes.includes(file.type);
        const isValidExtension = validExtensions.includes(extension);

        if (!isValidType && !isValidExtension) {
            errors.value.archivo = 'Formato no permitido. Usa: JPG, PNG, GIF, PDF, DOC, DOCX.';
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            errors.value.archivo = 'El archivo no debe exceder los 10MB.';
            return;
        }

        // Agregar archivo al array
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
    // Revocar URL si es imagen
    if (form.value.archivos[index].previewUrl) {
        URL.revokeObjectURL(form.value.archivos[index].previewUrl);
    }

    // Eliminar del array
    form.value.archivos.splice(index, 1);

    // Si no hay archivos, limpiar el input
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
    return 'file';
};

const formatFileSize = bytes => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// --- MANEJO DE TIPO DE TRANSACCIÓN ---
const handleTipoTransaccionChange = () => {
    // Si el tipo de transacción es "Ingreso", establecer egreso_directo en null
    if (form.value.tipo_de_transaccion === 'Ingreso') {
        form.value.egreso_directo = null;
    } else if (form.value.tipo_de_transaccion === 'Egreso') {
        // Si cambia a egreso, establecer un valor por defecto (false)
        form.value.egreso_directo = false;
    }
};

// --- FUNCIÓN PARA DESPLAZAR HACIA ARRIBA ---
const scrollToTop = () => {
    // Intentar encontrar el contenedor principal (main)
    const mainContainer = document.querySelector('main');

    // Si encontramos el contenedor principal, hacer scroll en él
    if (mainContainer) {
        mainContainer.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        console.log('Scrolling using main container');
    } else {
        // Fallback: intentar con el primer elemento con overflow-auto
        const overflowContainer = document.querySelector('.overflow-auto');
        if (overflowContainer) {
            overflowContainer.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            console.log('Scrolling using overflow-auto container');
        } else {
            // Último recurso: usar window.scrollTo
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            console.log('Scrolling using window');
        }
    }

    // También emitir el evento para que el layout lo maneje si está disponible
    emit('scroll-to-top');
};

// --- ENVÍO DEL FORMULARIO ---
const submitForm = async () => {
    // Confirmación antes de enviar
    const confirm = await showConfirm(
        'Confirmar Envío',
        '¿Estás seguro de que deseas registrar esta transacción?'
    );

    if (!confirm) return;

    loading.value = true;
    errors.value = {};

    const formData = new FormData();

    // Corrección: Manejar correctamente todos los campos del formulario
    for (const key in form.value) {
        if (key === 'egreso_directo') {
            // Solo enviar egreso_directo si no es null y es un egreso
            if (form.value.tipo_de_transaccion === 'Egreso' && form.value[key] !== null) {
                formData.append(key, form.value[key] ? '1' : '0');
            }
        } else if (key === 'archivos') {
            // Manejo especial para archivos múltiples
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
        showLoading('Registrando transacción...');

        const response = await saveTransactionFinancialAdmin(formData);
        closeLoading();

        // Reset form
        Object.assign(form.value, {
            negocio_id: '',
            metodo_id: '',
            categoria_id: '',
            vehicle_id: '',
            estado_de_transaccion_id: '',
            caja_operativa_id: '', // Resetear campo de caja operativa
            fecha: new Date().toISOString().split('T')[0],
            punto_de_partida: '',
            destino: '',
            millas: null,
            tipo_de_transaccion: '',
            item: '',
            cantidad: null,
            importe_total: null,
            cliente_proveedor: '',
            egreso_directo: null,
            observaciones: '',
            archivos: [], // Limpiar archivos
            numero_transaccion: '',
        });
        categorySearch.value = '';

        // Limpiar input de archivos
        if (fileInput.value) {
            fileInput.value.value = '';
        }

        // Ensure DOM is updated before scrolling
        await nextTick();

        // Extraer datos de la respuesta
        const responseData = response.data;

        // Mostrar mensaje de éxito principal
        await showSuccess('Éxito', responseData.message);

        // Mostrar advertencia si existe
        if (responseData.advertencia) {
            await showWarning('Advertencia', responseData.advertencia);
        }

        // Mostrar información sobre excedente por pagar si existe
        if (responseData.excedente_por_pagar > 0) {
            await showWarning(
                'Excedente por pagar',
                `Se ha generado un excedente por pagar de $${responseData.excedente_por_pagar}.`
            );
        }

        // Mostrar información sobre pago pendiente si existe
        if (responseData.pending_payment) {
            const pendingPayment = responseData.pending_payment;
            await showWarning(
                'Pago pendiente',
                `Se ha creado un pago pendiente con ID ${pendingPayment.id} por un monto de $${pendingPayment.monto}. Descripción: ${pendingPayment.descripcion}`
            );
        }

        // Esperar un poco para asegurar que todas las alertas se han mostrado
        await new Promise(resolve => setTimeout(resolve, 300));

        // Desplazar hacia arriba después de todas las alertas
        await nextTick();
        scrollToTop();
    } catch (error) {
        closeLoading();
        console.error('Error al enviar:', error);

        if (error.response) {
            console.error('Error response data:', error.response.data);

            if (error.response.status === 422) {
                const data = error.response.data;
                if (data.message?.includes('Saldo insuficiente')) {
                    // Si hay datos adicionales sobre la caja operativa, los mostramos
                    let message = `Saldo insuficiente en la caja operativa.`;
                    if (data.operating_box) {
                        message += ` Caja: ${data.operating_box.nombre}. Saldo disponible: $${data.saldo_disponible}. Monto requerido: $${data.monto_requerido}.`;
                    }
                    showError('Saldo Insuficiente', message);
                } else {
                    errors.value = data.errors;
                    showValidationErrors(data.errors);
                }
            } else {
                const message = error.response.data?.message || 'Error del servidor';
                showError('Error', message);
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
    listBusinessesActives();
    listVehiclesAll();
    listOperatingBoxesActives(); // Cargar cajas operativas
    form.value.fecha = new Date().toISOString().split('T')[0];
});
</script>
