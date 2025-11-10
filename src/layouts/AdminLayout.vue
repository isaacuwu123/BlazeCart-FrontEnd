<template>
    <div class="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <!-- Superposición del menú móvil -->
        <div v-if="sidebarOpen" class="fixed inset-0 z-40 lg:hidden" @click="sidebarOpen = false">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        <!-- Barra lateral (Sidebar) -->
        <div
            :class="[
                'fixed inset-y-0 left-0 z-50 w-64 flex flex-col shadow-xl transform transition-all duration-300 ease-in-out',
                'lg:relative lg:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
            ]"
        >
            <!-- Sección del Logo -->
            <div
                class="flex items-center justify-center flex-shrink-0 h-16 px-4 shadow-lg bg-gradient-to-r from-blazecart-yellow-400 to-blazecart-yellow-500"
            >
                <div class="flex items-center space-x-2">
                    <div
                        class="flex items-center justify-center w-8 h-8 bg-black rounded-lg shadow-md"
                    >
                        <TruckIcon class="w-5 h-5 text-blazecart-yellow-400" />
                    </div>
                    <span class="text-xl font-bold text-black">BlazeCart</span>
                </div>
            </div>
            <!-- Navegación -->
            <nav class="flex-1 px-4 py-6 overflow-y-auto">
                <div class="space-y-2">
                    <!-- Bucle de elementos del menú -->
                    <div v-for="menu in menuItems" :key="menu.key">
                        <!-- Elemento con submenú -->
                        <div v-if="menu.items" class="space-y-1">
                            <button
                                @click="toggleSubmenu(menu.key)"
                                class="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left transition-all duration-200 group rounded-xl hover:scale-105"
                                :class="
                                    isRouteActive(menu)
                                        ? 'bg-blazecart-yellow-50 dark:bg-gray-700/50 text-blazecart-yellow-700 dark:text-blazecart-yellow-400 shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                                "
                            >
                                <div class="flex items-center">
                                    <component
                                        :is="menu.icon"
                                        class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110"
                                    />
                                    {{ t(menu.key) }}
                                </div>
                                <ChevronDownIcon
                                    class="w-4 h-4 transition-all duration-300 group-hover:text-blazecart-yellow-500"
                                    :class="{
                                        'rotate-180 text-blazecart-yellow-500':
                                            openSubmenus[menu.key],
                                    }"
                                />
                            </button>
                            <div
                                v-show="openSubmenus[menu.key]"
                                class="ml-6 space-y-1 animate-fade-in"
                            >
                                <router-link
                                    v-for="item in menu.items"
                                    :key="item.path"
                                    :to="item.path"
                                    class="flex items-center px-4 py-2 text-sm transition-all duration-200 rounded-lg group hover:translate-x-1"
                                    :class="
                                        route.path === item.path
                                            ? 'bg-blazecart-yellow-50 dark:bg-gray-700/30 text-blazecart-yellow-700 dark:text-blazecart-yellow-400 border-l-2 border-blazecart-yellow-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/30 hover:text-gray-800 dark:hover:text-gray-200'
                                    "
                                >
                                    <component
                                        :is="item.icon"
                                        class="w-4 h-4 mr-2 transition-transform duration-200 group-hover:scale-110"
                                    />
                                    {{ t(item.label) }}
                                </router-link>
                            </div>
                        </div>
                        <!-- Elemento individual -->
                        <router-link
                            v-else
                            :to="menu.path"
                            class="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 group rounded-xl hover:scale-105"
                            :class="
                                route.path === menu.path
                                    ? 'bg-blazecart-yellow-50 dark:bg-gray-700/50 text-blazecart-yellow-700 dark:text-blazecart-yellow-400 shadow-md border-l-4 border-blazecart-yellow-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                            "
                        >
                            <component
                                :is="menu.icon"
                                class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110"
                            />
                            {{ t(menu.key) }}
                        </router-link>
                    </div>
                </div>
            </nav>
            <!-- Sección de usuario -->
            <div
                class="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700"
            >
                <div class="flex items-center space-x-3">
                    <div
                        class="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-gradient-to-r from-blazecart-yellow-400 to-blazecart-yellow-500"
                    >
                        <UserIcon class="w-5 h-5 text-black" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {{ user.nombre }} {{ user.apellido }}
                        </p>
                        <p class="text-xs text-gray-500 truncate dark:text-gray-400">
                            {{ user.email }}
                        </p>
                    </div>
                    <button
                        @click="handleLogout"
                        class="p-1 text-gray-400 transition-colors duration-200 rounded-lg hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <LogOutIcon class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <!-- Área de contenido principal -->
        <div class="flex flex-col flex-1 overflow-hidden">
            <!-- Encabezado superior -->
            <header
                class="z-30 flex-shrink-0 border-b shadow-sm backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 dark:border-gray-700"
            >
                <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center space-x-4">
                        <!-- Botón de menú móvil -->
                        <button
                            @click="sidebarOpen = !sidebarOpen"
                            class="p-2 text-gray-600 transition-all duration-200 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-blazecart-yellow-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <MenuIcon class="w-6 h-6" />
                        </button>
                        <!-- Migas de pan (Breadcrumb) -->
                        <nav class="hidden sm:flex" aria-label="Breadcrumb">
                            <ol class="flex items-center space-x-2">
                                <li>
                                    <div class="flex items-center">
                                        <HomeIcon
                                            class="w-4 h-4 text-gray-400 dark:text-gray-500"
                                        />
                                        <span
                                            class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                                            >Admin</span
                                        >
                                    </div>
                                </li>
                                <li>
                                    <div class="flex items-center">
                                        <ChevronRightIcon
                                            class="w-4 h-4 text-gray-400 dark:text-gray-500"
                                        />
                                        <span
                                            class="ml-2 text-sm font-medium text-gray-900 capitalize dark:text-white"
                                        >
                                            {{ currentPageName }}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <!-- Acciones del encabezado -->
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <!-- Selector de idioma -->
                        <div class="relative" ref="languageDropdownRef">
                            <button
                                @click="languageDropdownOpen = !languageDropdownOpen"
                                class="flex items-center p-2 space-x-2 text-gray-600 transition-all duration-200 rounded-lg hover:scale-105 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                <GlobeIcon class="w-5 h-5" />
                                <span class="hidden text-sm font-medium sm:block">{{
                                    currentLanguage.toUpperCase()
                                }}</span>
                                <ChevronDownIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div
                                v-show="languageDropdownOpen"
                                class="absolute right-0 z-50 mt-2 bg-white border border-gray-200 shadow-lg w-36 rounded-xl animate-fade-in dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div class="py-2">
                                    <button
                                        @click="changeLanguage('es')"
                                        class="w-full px-4 py-2 text-sm text-left text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                        :class="{
                                            'bg-blazecart-yellow-50 dark:bg-gray-700 text-blazecart-yellow-700 dark:text-blazecart-yellow-400':
                                                currentLanguage === 'es',
                                        }"
                                    >
                                        🇪🇸 Español
                                    </button>
                                    <button
                                        @click="changeLanguage('en')"
                                        class="w-full px-4 py-2 text-sm text-left text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                        :class="{
                                            'bg-blazecart-yellow-50 dark:bg-gray-700 text-blazecart-yellow-700 dark:text-blazecart-yellow-400':
                                                currentLanguage === 'en',
                                        }"
                                    >
                                        🇺🇸 English
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Interruptor de modo oscuro -->
                        <button
                            @click="toggleDarkMode"
                            class="p-2 text-gray-600 transition-all duration-200 rounded-lg hover:scale-110 hover:text-blazecart-yellow-600 hover:bg-gray-100 dark:text-blazecart-yellow-400 dark:hover:text-blazecart-yellow-300 dark:hover:bg-gray-700"
                        >
                            <SunIcon v-if="isDarkMode" class="w-5 h-5" />
                            <MoonIcon v-else class="w-5 h-5" />
                        </button>
                        <!-- Búsqueda -->
                        <div class="hidden md:block">
                            <div class="relative">
                                <SearchIcon
                                    class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2 dark:text-gray-300"
                                />
                                <input
                                    type="text"
                                    :placeholder="t('search')"
                                    class="w-64 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 transition-all duration-200 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blazecart-yellow-400 focus:border-blazecart-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <!-- Menú desplegable de perfil -->
                        <div class="relative" ref="profileDropdownRef">
                            <button
                                @click="profileDropdownOpen = !profileDropdownOpen"
                                class="flex items-center p-2 space-x-2 transition-all duration-200 rounded-lg hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <div
                                    class="flex items-center justify-center w-8 h-8 rounded-full shadow-lg bg-gradient-to-r from-blazecart-yellow-400 to-blazecart-yellow-500"
                                >
                                    <UserIcon class="w-4 h-4 text-black" />
                                </div>
                                <ChevronDownIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div
                                v-show="profileDropdownOpen"
                                class="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-200 shadow-lg rounded-xl animate-fade-in dark:bg-gray-800 dark:border-gray-700"
                            >
                                <div class="py-2">
                                    <router-link to="/perfil">
                                        <a
                                            href="/perfil"
                                            class="flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            <UserIcon class="w-4 h-4 mr-2" />
                                            {{ t('myProfile') }}
                                        </a>
                                    </router-link>
                                    <a
                                        href="#"
                                        class="flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <SettingsIcon class="w-4 h-4 mr-2" />
                                        {{ t('settings') }}
                                    </a>
                                    <hr class="my-2 border-gray-200 dark:border-gray-700" />
                                    <a
                                        @click="handleLogout"
                                        href="#"
                                        class="flex items-center px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <LogOutIcon class="w-4 h-4 mr-2" />
                                        {{ t('logout') }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- Contenido de la página -->
            <main
                ref="mainContent"
                class="flex-1 p-4 overflow-auto transition-colors duration-300 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900"
            >
                <div class="mx-auto">
                    <!-- max-w-7xl -->
                    <router-view @scroll-to-top="scrollToTop" />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
// Importación de composables y servicios
import { useAlert } from '@/composables/useAlert';
import { initializeDarkMode, isDarkMode, toggleDarkMode } from '@/composables/useDarkMode';
import { logoutBE } from '@/services/AuthService';
// Importación de iconos necesarios para la interfaz
import {
    ActivityIcon,
    ArrowDownCircleIcon,
    BanknoteIcon,
    BarChart3Icon,
    BuildingIcon,
    CalculatorIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    ClockIcon, // Icono para pagos pendientes
    CreditCardIcon,
    DollarSignIcon,
    FileArchiveIcon, // Icono para estado de resultado
    FileBarChartIcon,
    FileTextIcon,
    GlobeIcon,
    HomeIcon,
    InfoIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    MoonIcon,
    PiggyBankIcon,
    SearchIcon,
    SettingsIcon,
    SunIcon,
    TagIcon,
    TrendingDownIcon,
    TrendingUpIcon,
    TruckIcon, // Icono para movimientos de caja
    UserIcon,
    UsersIcon,
    WrenchIcon,
} from 'lucide-vue-next';
// Importación de funciones de Vue
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// --- ESTADO ---
const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false); // Controla la visibilidad de la barra lateral en móviles
const profileDropdownOpen = ref(false); // Controla el menú desplegable del perfil
const languageDropdownOpen = ref(false); // Controla el menú desplegable de idiomas
const currentLanguage = ref('es'); // Idioma actual (español por defecto)
const openSubmenus = ref({}); // Controla qué submenús están abiertos
const user = ref({
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    role: '',
    image: '',
});
// Referencias para los menús desplegables para manejar clics fuera de ellos
const profileDropdownRef = ref(null);
const languageDropdownRef = ref(null);
const mainContent = ref(null); // Referencia al contenido principal
// --- MENÚ Y TRADUCCIONES ---
// Definición de los elementos del menú de navegación
const menuItems = [
    {
        key: 'dashboardFinanciero',
        icon: LayoutDashboardIcon,
        items: [
            {
                path: '/estados-resultados',
                label: 'estadosDeResultados',
                icon: FileBarChartIcon,
            },
            {
                path: '/egresos-por-categoria',
                label: 'egresosPorCategoria',
                icon: TrendingDownIcon,
            },
            {
                path: '/ingresos-por-negocio',
                label: 'ingresosPorNegocio',
                icon: TrendingUpIcon,
            },
            {
                path: '/negocio-con-mayor-egresos',
                label: 'negocioConMayorEgresos',
                icon: ArrowDownCircleIcon,
            },
            {
                path: '/vehiculos-del-negocio',
                label: 'vehiculosDelNegocio',
                icon: TruckIcon,
            },
            {
                path: '/todos-los-negocios-financieros',
                label: 'todosLosNegociosFinancieros',
                icon: BuildingIcon,
            },
            {
                path: '/rendicion-de-cajas-operativas',
                label: 'rendicionDeCajasOperativas',
                icon: ClipboardCheckIcon,
            },
            {
                path: '/datos-revelantes',
                label: 'datosRevelantes',
                icon: BarChart3Icon,
            },
        ],
    },
    /* { key: 'dashboard', path: '/dashboard', icon: HomeIcon }, */
    { key: 'users', path: '/usuarios', icon: UsersIcon },
    {
        key: 'conductores',
        icon: PiggyBankIcon,
        items: [
            { path: '/conductores', label: 'conductores', icon: UserIcon },
            {
                path: '/conductores/documentos',
                label: 'documentos',
                icon: FileTextIcon,
            },
        ],
    },
    {
        key: 'camiones',
        icon: TruckIcon,
        items: [
            { path: '/camiones', label: 'camiones', icon: TruckIcon },
            {
                path: '/camiones/documentos',
                label: 'documentos',
                icon: FileTextIcon,
            },
            {
                path: '/camiones/mantenimientos',
                label: 'mantenimientos',
                icon: WrenchIcon,
            },
        ],
    },
    {
        key: 'finanzas',
        icon: BanknoteIcon,
        items: [
            {
                path: '/form-financial-admin',
                label: 'transaccionesGlobales',
                icon: CalculatorIcon,
            },
            {
                path: '/transacciones-financieras',
                label: 'transaccionesFinancieras',
                icon: DollarSignIcon,
            },
            {
                path: '/caja-operativa',
                label: 'cajaOperativa',
                icon: BuildingIcon,
            },
            {
                path: '/movimientos-caja',
                label: 'movimientosCaja',
                icon: TrendingUpIcon,
            },
            {
                path: '/pagos-pendientes',
                label: 'pagosPendientes',
                icon: ClockIcon, // Icono cambiado a ClockIcon para pagos pendientes
            },
        ],
    },
    {
        key: 'settings',
        icon: SettingsIcon,
        items: [
            { path: '/categorias-admin', label: 'categorias', icon: TagIcon },
            { path: '/negocios-admin', label: 'negocios', icon: BuildingIcon },
            { path: '/metodos-pagos-admin', label: 'metodosPagos', icon: CreditCardIcon },
            {
                path: '/estados-transaccion',
                label: 'estadosTransaccion',
                icon: ActivityIcon,
            },
        ],
    },
    {
        key: 'sistemaInfo',
        icon: InfoIcon,
        items: [
            { path: '/info-users', label: 'usersInfo', icon: UsersIcon },
            { path: '/info-drivers', label: 'driversInfo', icon: UserIcon },
            { path: '/info-drivers-documents', label: 'driversDocuments', icon: FileTextIcon },
            { path: '/info-vehiculo', label: 'vehiculoInfo', icon: TruckIcon },
            { path: '/info-vehiculo-documents', label: 'vehiculoDocuments', icon: FileArchiveIcon },
            {
                path: '/info-vehiculo-mantenimiento',
                label: 'vehiculoMantenimiento',
                icon: WrenchIcon,
            },
            {
                path: '/info-form-transacciones',
                label: 'formTransacciones',
                icon: ClipboardListIcon,
            },
        ],
    },
];
// Traducciones para español e inglés
const translations = {
    es: {
        // Elementos principales del menú
        dashboard: 'Dashboard',
        users: 'Usuarios',
        conductores: 'Conductores',
        camiones: 'Camiones',
        finanzas: 'Finanzas',
        dashboardFinanciero: 'Dashboard Financiero',
        settings: 'Configuración',
        sistemaInfo: 'Info. Sistema',
        // Submenús
        documentos: 'Documentos',
        mantenimientos: 'Mantenimientos',
        transaccionesGlobales: 'Registro de transacciones',
        transaccionesFinancieras: 'Transacciones Financieras',
        cajaOperativa: 'Caja Operativa',
        movimientosCaja: 'Movimientos de Caja',
        pagosPendientes: 'Pagos Pendientes',
        // Submenús de Dashboard Financiero
        estadosDeResultados: 'Estados de Resultados',
        egresosPorCategoria: 'Egresos por Categoría',
        ingresosPorNegocio: 'Ingresos por Negocio',
        negocioConMayorEgresos: 'Negocio con Mayor Egreso',
        vehiculosDelNegocio: 'Vehículos del Negocio',
        todosLosNegociosFinancieros: 'Todos los Negocios Financieros',
        rendicionDeCajasOperativas: 'Rendición de Cajas Operativas',
        datosRevelantes: 'Datos Revelantes',
        // Submenús de Configuración
        categorias: 'Categorías',
        negocios: 'Negocios',
        metodosPagos: 'Métodos de Pago',
        estadosTransaccion: 'Estados de Transacción',
        // Submenús de Info. Sistema
        usersInfo: 'Info. Usuarios',
        driversInfo: 'Info. Conductores',
        driversDocuments: 'Doc. Conductores',
        vehiculoInfo: 'Info. Vehículos',
        vehiculoDocuments: 'Doc. Vehículos',
        vehiculoMantenimiento: 'Mant. Vehículos',
        formTransacciones: 'Form. Transacciones',
        // Otros textos
        search: 'Buscar...',
        myProfile: 'Mi Perfil',
        logout: 'Cerrar Sesión',
    },
    en: {
        // Elementos principales del menú
        dashboard: 'Dashboard',
        users: 'Users',
        conductores: 'Drivers',
        camiones: 'Trucks',
        finanzas: 'Finances',
        dashboardFinanciero: 'Financial Dashboard',
        settings: 'Settings',
        sistemaInfo: 'System Info',
        // Submenús
        documentos: 'Documents',
        mantenimientos: 'Maintenance',
        transaccionesGlobales: 'Transaction Log',
        transaccionesFinancieras: 'Financial Transactions',
        cajaOperativa: 'Operating Cash',
        movimientosCaja: 'Cash Movements',
        pagosPendientes: 'Pending Payments',
        // Submenús de Dashboard Financiero
        estadosDeResultados: 'Income Statements',
        egresosPorCategoria: 'Expenses by Category',
        ingresosPorNegocio: 'Income by bussiness',
        negocioConMayorEgresos: 'Business with Highest Expense',
        vehiculosDelNegocio: 'Business Vehicles',
        todosLosNegociosFinancieros: 'All Financial Businesses',
        rendicionDeCajasOperativas: 'Operating Cash Render',
        datosRevelantes: 'Revealing Data',
        // Submenús de Configuración
        categorias: 'Categories',
        negocios: 'Businesses',
        metodosPagos: 'Payment Methods',
        estadosTransaccion: 'Transaction Status',
        // Submenús de System Info
        usersInfo: 'Users Info',
        driversInfo: 'Drivers Info',
        driversDocuments: 'Drivers Documents',
        vehiculoInfo: 'Vehicles Info',
        vehiculoDocuments: 'Vehicles Documents',
        vehiculoMantenimiento: 'Vehicles Maintenance',
        formTransacciones: 'Transaction Form',
        // Otros textos
        search: 'Search...',
        myProfile: 'My Profile',
        logout: 'Logout',
    },
};
// Función para obtener la traducción de una clave
const t = key => translations[currentLanguage.value][key] || key;
// --- PROPIEDADES CALCULADAS ---
// Calcula el nombre de la página actual basado en la ruta
const currentPageName = computed(() => {
    const pathSegments = route.path.split('/').filter(Boolean);
    return pathSegments[pathSegments.length - 1] || 'dashboard';
});
// --- MÉTODOS ---
// Función para desplazar el contenido hacia arriba
const scrollToTop = () => {
    if (mainContent.value) {
        mainContent.value.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    } else {
        // Fallback al window si el elemento no está disponible
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
};
// Carga los datos del usuario desde localStorage
const loadUserData = () => {
    try {
        const userData = localStorage.getItem('user');
        if (userData) {
            user.value = JSON.parse(userData);
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        // Si hay un error, limpiar el localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    }
};
// Alterna la visibilidad de un submenú
const toggleSubmenu = menuKey => {
    openSubmenus.value[menuKey] = !openSubmenus.value[menuKey];
};
// Cambia el idioma de la aplicación
const changeLanguage = lang => {
    currentLanguage.value = lang;
    languageDropdownOpen.value = false;
    localStorage.setItem('language', lang);
};
// Verifica si una ruta está activa (para resaltar en el menú)
const isRouteActive = menu => {
    if (menu.items) {
        return menu.items.some(item => route.path.startsWith(item.path));
    }
    return false;
};
// Maneja los clics fuera de los menús desplegables para cerrarlos
const handleClickOutside = event => {
    if (profileDropdownRef.value && !profileDropdownRef.value.contains(event.target)) {
        profileDropdownOpen.value = false;
    }
    if (languageDropdownRef.value && !languageDropdownRef.value.contains(event.target)) {
        languageDropdownOpen.value = false;
    }
};
// Maneja el cambio de tamaño de ventana para cerrar la barra lateral en móviles
const handleResize = () => {
    if (window.innerWidth >= 1024) {
        sidebarOpen.value = false;
    }
};
// Maneja el cierre de sesión del usuario
const handleLogout = async () => {
    const { showConfirm } = useAlert();
    const result = await showConfirm(
        '¿Cerrar sesión?',
        '¿Estás seguro de que quieres cerrar tu sesión actual?'
    );

    // result ya es un booleano (true o false), no necesitas .isConfirmed
    if (result) {
        try {
            // Llamar al backend para cerrar sesión
            const { data } = await logoutBE();
            console.log(data);
            // Limpiar localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirigir al login
            router.push('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Si hay un error en el backend, igualmente cerramos sesión localmente
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
};
// --- OBSERVADORES Y CICLO DE VIDA ---
// Observa los cambios en la ruta para abrir/cerrar submenús según corresponda
watch(
    route,
    newRoute => {
        menuItems.forEach(menu => {
            if (menu.items) {
                openSubmenus.value[menu.key] = menu.items.some(item =>
                    newRoute.path.startsWith(item.path)
                );
            }
        });

        // Desplazar hacia arriba cuando cambie la ruta
        nextTick(() => {
            scrollToTop();
        });
    },
    { immediate: true }
);
// Se ejecuta cuando el componente se monta
onMounted(() => {
    initializeDarkMode();
    loadUserData(); // Cargar datos del usuario
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage.value = savedLanguage;
    }
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
});
// Se ejecuta cuando el componente se desmonta
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', handleResize);
});
</script>

<style>
/* Barra de desplazamiento personalizada para la barra lateral */
nav::-webkit-scrollbar {
    width: 6px;
}
nav::-webkit-scrollbar-track {
    background: transparent;
}
nav::-webkit-scrollbar-thumb {
    background: rgba(251, 191, 36, 0.3);
    border-radius: 3px;
}
nav::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 191, 36, 0.5);
}
.dark nav::-webkit-scrollbar-thumb {
    background: rgba(251, 191, 36, 0.4);
}
.dark nav::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 191, 36, 0.6);
}
/* Transiciones suaves para todos los elementos */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
        opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}
/* Animaciones personalizadas */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes bounceSubtle {
    0%,
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
}
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}
.animate-bounce-subtle {
    animation: bounceSubtle 2s infinite;
}
/* Estilos de enfoque para accesibilidad */
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 2px solid rgb(251 191 36);
    outline-offset: 2px;
}
/* Asegurar la estructura de diseño adecuada */
.h-screen {
    height: 100vh;
    height: 100dvh; /* Altura dinámica del viewport para móviles */
}
/* Estilos de impresión */
@media print {
    .sidebar,
    header {
        display: none !important;
    }
}
</style>
