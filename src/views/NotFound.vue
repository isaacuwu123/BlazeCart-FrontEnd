<template>
    <div
        class="relative flex items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-nexgen-dark-950 dark:via-nexgen-dark-900 dark:to-nexgen-dark-800 sm:px-6 lg:px-8"
    >
        <!-- Patrón de fondo decorativo -->
        <div class="absolute inset-0 opacity-5 dark:opacity-10">
            <div
                class="absolute top-0 left-0 rounded-full w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 filter blur-3xl animate-blob"
            ></div>
            <div
                class="absolute top-0 right-0 rounded-full w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-600 filter blur-3xl animate-blob animation-delay-2000"
            ></div>
            <div
                class="absolute bottom-0 rounded-full left-1/2 w-96 h-96 bg-gradient-to-br from-blue-600 to-cyan-400 filter blur-3xl animate-blob animation-delay-4000"
            ></div>
        </div>

        <div class="relative z-10 w-full max-w-4xl">
            <div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <!-- Columna izquierda: Ilustración -->
                <div class="flex items-center justify-center lg:order-1">
                    <div class="relative w-full max-w-md">
                        <!-- Ilustración de camión perdido -->
                        <div class="relative">
                            <!-- Camión animado -->
                            <div
                                class="relative p-8 border border-gray-200 shadow-2xl bg-white/80 dark:bg-nexgen-dark-800/80 backdrop-blur-xl rounded-3xl dark:border-nexgen-dark-700"
                            >
                                <div class="relative">
                                    <!-- Número 404 grande -->
                                    <div
                                        class="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10"
                                    >
                                        <span
                                            class="font-black text-gray-900 dark:text-white text-9xl"
                                            >404</span
                                        >
                                    </div>

                                    <!-- Camión SVG -->
                                    <svg
                                        class="relative z-10 w-full h-auto animate-float"
                                        viewBox="0 0 200 120"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <!-- Carretera -->
                                        <path
                                            d="M0 95 Q 50 90, 100 95 T 200 95"
                                            stroke="#94a3b8"
                                            stroke-width="2"
                                            stroke-dasharray="10 5"
                                            class="animate-dash"
                                        />

                                        <!-- Camión -->
                                        <g transform="translate(50, 40)">
                                            <!-- Cabina -->
                                            <rect
                                                x="0"
                                                y="20"
                                                width="30"
                                                height="25"
                                                rx="2"
                                                class="fill-blue-500 dark:fill-blue-400"
                                            />
                                            <rect
                                                x="2"
                                                y="22"
                                                width="10"
                                                height="10"
                                                rx="1"
                                                class="fill-cyan-300 dark:fill-cyan-200"
                                            />

                                            <!-- Contenedor -->
                                            <rect
                                                x="28"
                                                y="15"
                                                width="50"
                                                height="30"
                                                rx="2"
                                                class="fill-blue-600 dark:fill-blue-500"
                                            />

                                            <!-- Signo de interrogación -->
                                            <text
                                                x="50"
                                                y="35"
                                                font-size="16"
                                                font-weight="bold"
                                                class="fill-white"
                                            >
                                                ?
                                            </text>

                                            <!-- Ruedas -->
                                            <circle
                                                cx="15"
                                                cy="48"
                                                r="6"
                                                class="fill-gray-700 dark:fill-gray-600"
                                            />
                                            <circle cx="15" cy="48" r="3" class="fill-gray-400" />
                                            <circle
                                                cx="65"
                                                cy="48"
                                                r="6"
                                                class="fill-gray-700 dark:fill-gray-600"
                                            />
                                            <circle cx="65" cy="48" r="3" class="fill-gray-400" />
                                        </g>

                                        <!-- Nubes -->
                                        <circle
                                            cx="30"
                                            cy="15"
                                            r="8"
                                            class="fill-gray-200 dark:fill-gray-700 animate-float-slow"
                                        />
                                        <circle
                                            cx="38"
                                            cy="15"
                                            r="10"
                                            class="fill-gray-200 dark:fill-gray-700 animate-float-slow"
                                        />
                                        <circle
                                            cx="170"
                                            cy="20"
                                            r="6"
                                            class="fill-gray-200 dark:fill-gray-700 animate-float-slower"
                                        />
                                        <circle
                                            cx="176"
                                            cy="20"
                                            r="8"
                                            class="fill-gray-200 dark:fill-gray-700 animate-float-slower"
                                        />
                                    </svg>
                                </div>

                                <!-- Señales de tráfico decorativas -->
                                <div class="flex justify-around mt-6">
                                    <div class="flex flex-col items-center">
                                        <div
                                            class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-900/30"
                                        >
                                            <AlertCircle
                                                :size="24"
                                                class="text-red-600 dark:text-red-400"
                                            />
                                        </div>
                                        <span
                                            class="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400"
                                            >Sin ruta</span
                                        >
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div
                                            class="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full dark:bg-yellow-900/30"
                                        >
                                            <MapPin
                                                :size="24"
                                                class="text-yellow-600 dark:text-yellow-400"
                                            />
                                        </div>
                                        <span
                                            class="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400"
                                            >Ubicación perdida</span
                                        >
                                    </div>
                                    <div class="flex flex-col items-center">
                                        <div
                                            class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/30"
                                        >
                                            <Navigation
                                                :size="24"
                                                class="text-blue-600 dark:text-blue-400"
                                            />
                                        </div>
                                        <span
                                            class="mt-2 text-xs font-semibold text-gray-600 dark:text-gray-400"
                                            >Ruta no encontrada</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <!-- Elementos flotantes -->
                            <div
                                class="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-blue-500/20 dark:bg-blue-400/20 filter blur-xl animate-pulse"
                            ></div>
                            <div
                                class="absolute w-24 h-24 rounded-full -bottom-4 -left-4 bg-cyan-500/20 dark:bg-cyan-400/20 filter blur-xl animate-pulse animation-delay-1000"
                            ></div>
                        </div>
                    </div>
                </div>

                <!-- Columna derecha: Contenido -->
                <div
                    class="flex flex-col justify-center space-y-6 text-center lg:text-left lg:order-2"
                >
                    <!-- Número 404 para móvil -->
                    <div class="lg:hidden">
                        <h1
                            class="mb-4 font-black text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-8xl sm:text-9xl drop-shadow-lg animate-gradient"
                        >
                            404
                        </h1>
                    </div>

                    <!-- Número 404 para desktop -->
                    <div class="hidden lg:block">
                        <h1
                            class="mb-4 font-black leading-none text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-9xl xl:text-[12rem] drop-shadow-lg animate-gradient"
                        >
                            404
                        </h1>
                    </div>

                    <!-- Título y descripción -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-center gap-3 lg:justify-start">
                            <div
                                class="w-1 h-12 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500"
                            ></div>
                            <h2
                                class="text-3xl font-black text-gray-900 dark:text-white sm:text-4xl"
                            >
                                Ruta no encontrada
                            </h2>
                        </div>

                        <p
                            class="max-w-lg mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-400 lg:mx-0"
                        >
                            Lo sentimos, parece que esta ruta no existe en nuestro sistema de
                            navegación. El destino que buscas puede haber sido movido o eliminado.
                        </p>

                        <!-- Estadísticas de error -->
                        <div class="grid grid-cols-3 gap-4 mt-6">
                            <div
                                class="p-4 border border-gray-200 bg-white/60 dark:bg-nexgen-dark-800/60 backdrop-blur-sm rounded-xl dark:border-nexgen-dark-700"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-red-100 rounded-lg dark:bg-red-900/30"
                                >
                                    <XCircle :size="20" class="text-red-600 dark:text-red-400" />
                                </div>
                                <p class="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Código
                                </p>
                                <p class="text-lg font-black text-gray-900 dark:text-white">404</p>
                            </div>
                            <div
                                class="p-4 border border-gray-200 bg-white/60 dark:bg-nexgen-dark-800/60 backdrop-blur-sm rounded-xl dark:border-nexgen-dark-700"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-yellow-100 rounded-lg dark:bg-yellow-900/30"
                                >
                                    <AlertTriangle
                                        :size="20"
                                        class="text-yellow-600 dark:text-yellow-400"
                                    />
                                </div>
                                <p class="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Estado
                                </p>
                                <p class="text-lg font-black text-gray-900 dark:text-white">
                                    Error
                                </p>
                            </div>
                            <div
                                class="p-4 border border-gray-200 bg-white/60 dark:bg-nexgen-dark-800/60 backdrop-blur-sm rounded-xl dark:border-nexgen-dark-700"
                            >
                                <div
                                    class="flex items-center justify-center w-10 h-10 mx-auto mb-2 bg-blue-100 rounded-lg dark:bg-blue-900/30"
                                >
                                    <Clock :size="20" class="text-blue-600 dark:text-blue-400" />
                                </div>
                                <p class="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                    Tiempo
                                </p>
                                <p class="text-lg font-black text-gray-900 dark:text-white">
                                    {{ currentTime }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Botones de navegación -->
                    <div class="pt-4 space-y-3">
                        <button
                            @click="goBack"
                            class="flex items-center justify-center w-full gap-3 px-6 py-4 text-base font-bold text-white transition-all duration-300 transform shadow-xl group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-2xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-500/50 active:scale-95"
                        >
                            <ArrowLeft
                                :size="20"
                                class="transition-transform group-hover:-translate-x-2"
                                :stroke-width="2.5"
                            />
                            <span>Regresar a la página anterior</span>
                        </button>

                        <div class="grid gap-3 sm:grid-cols-2">
                            <button
                                @click="goHome"
                                class="flex items-center justify-center gap-3 px-6 py-4 text-base font-bold text-blue-700 transition-all duration-300 transform bg-white border-2 border-blue-200 shadow-lg group dark:bg-nexgen-dark-800 dark:text-blue-400 dark:border-nexgen-dark-600 rounded-2xl hover:bg-blue-50 dark:hover:bg-nexgen-dark-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-500/50 active:scale-95"
                            >
                                <Home
                                    :size="20"
                                    class="transition-transform group-hover:scale-110"
                                    :stroke-width="2.5"
                                />
                                <span>Inicio</span>
                            </button>

                            <button
                                v-if="isAuthenticated"
                                @click="goToDashboard"
                                class="flex items-center justify-center gap-3 px-6 py-4 text-base font-bold transition-all duration-300 transform bg-white border-2 shadow-lg group text-cyan-700 border-cyan-200 dark:bg-nexgen-dark-800 dark:text-cyan-400 dark:border-nexgen-dark-600 rounded-2xl hover:bg-cyan-50 dark:hover:bg-nexgen-dark-700 hover:border-cyan-300 dark:hover:border-cyan-500 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 dark:focus:ring-cyan-500/50 active:scale-95"
                            >
                                <LayoutDashboard
                                    :size="20"
                                    class="transition-transform group-hover:rotate-12"
                                    :stroke-width="2.5"
                                />
                                <span>Panel de Control</span>
                            </button>
                        </div>
                    </div>

                    <!-- Información de contacto -->
                    <div
                        class="p-6 mt-6 space-y-4 border border-gray-200 bg-white/60 dark:bg-nexgen-dark-800/60 backdrop-blur-xl rounded-2xl dark:border-nexgen-dark-700"
                    >
                        <div class="flex items-start gap-4">
                            <div
                                class="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl"
                            >
                                <HelpCircle :size="20" class="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div class="flex-1 text-left">
                                <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                                    ¿Necesitas ayuda?
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Si el problema persiste o necesitas asistencia, contacta a
                                    nuestro equipo de soporte técnico.
                                </p>
                                <div class="flex flex-wrap gap-3 mt-4">
                                    <a
                                        href="mailto:support@logistics.com"
                                        class="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                    >
                                        <Mail :size="16" />
                                        <span>support@logistics.com</span>
                                    </a>
                                    <a
                                        href="tel:+59160767398"
                                        class="inline-flex items-center gap-2 text-sm font-semibold transition-colors text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
                                    >
                                        <Phone :size="16" />
                                        <span>+591 60767398</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    Clock,
    HelpCircle,
    Home,
    LayoutDashboard,
    Mail,
    MapPin,
    Navigation,
    Phone,
    XCircle,
} from 'lucide-vue-next';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado de autenticación
const isAuthenticated = ref(false);
const userRole = ref('');
const currentTime = ref('');

// Actualizar hora actual
const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

// Verificar autenticación al montar el componente
onMounted(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    isAuthenticated.value = !!token;
    userRole.value = user.role || '';

    updateTime();
    const interval = setInterval(updateTime, 1000);

    onUnmounted(() => clearInterval(interval));
});

// Funciones de navegación
const goBack = () => {
    router.go(-1);
};

const goHome = () => {
    router.push('/login');
};

const goToDashboard = () => {
    switch (userRole.value) {
        case 'admin':
            router.push('/dashboard');
            break;
        case 'carrier':
            router.push('/driver/dashboard');
            break;
        default:
            router.push('/dashboard');
            break;
    }
};
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

@keyframes float-slow {
    0%,
    100% {
        transform: translateX(0px);
    }
    50% {
        transform: translateX(10px);
    }
}

@keyframes float-slower {
    0%,
    100% {
        transform: translateX(0px);
    }
    50% {
        transform: translateX(-10px);
    }
}

@keyframes dash {
    to {
        stroke-dashoffset: -100;
    }
}

@keyframes blob {
    0%,
    100% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
}

@keyframes gradient {
    0%,
    100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
}

.animate-float-slower {
    animation: float-slower 5s ease-in-out infinite;
}

.animate-dash {
    animation: dash 2s linear infinite;
}

.animate-blob {
    animation: blob 7s infinite;
}

.animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
</style>
