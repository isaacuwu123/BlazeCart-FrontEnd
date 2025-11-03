<template>
    <div
        class="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
    >
        <!-- Contenedor principal con animación -->
        <div class="w-full max-w-lg space-y-8 text-center animate-fade-in">
            <!-- Ícono de candado animado -->
            <div class="relative">
                <div
                    class="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"
                ></div>
                <div class="relative p-8 bg-white border border-yellow-200 rounded-full shadow-2xl">
                    <svg
                        class="w-24 h-24 mx-auto text-yellow-500 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
            </div>

            <!-- Código de error y título -->
            <div class="space-y-4">
                <h1 class="font-black tracking-tight text-yellow-500 text-8xl">401</h1>
                <h2 class="text-3xl font-bold leading-tight text-gray-800">Acceso No Autorizado</h2>
                <p class="max-w-md mx-auto text-lg leading-relaxed text-gray-600">
                    No tienes permisos para acceder a esta página. Por favor, inicia sesión o
                    contacta al administrador.
                </p>
            </div>

            <!-- Tarjeta de información -->
            <div class="p-6 bg-white border border-yellow-100 shadow-xl rounded-2xl">
                <div class="flex items-center justify-center mb-4 space-x-3">
                    <div class="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <span class="text-sm font-medium text-gray-700">Estado de Sesión</span>
                </div>

                <div v-if="!isAuthenticated" class="space-y-3">
                    <div class="flex items-center justify-center space-x-2 text-red-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span class="text-sm font-medium">No has iniciado sesión</span>
                    </div>
                </div>

                <div v-else class="space-y-3">
                    <div class="flex items-center justify-center space-x-2 text-green-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        <span class="text-sm font-medium">Sesión activa</span>
                    </div>
                    <p class="text-xs text-gray-500">Permisos insuficientes para esta página</p>
                </div>
            </div>

            <!-- Botones de acción -->
            <div class="space-y-4">
                <!-- Botón principal -->
                <button
                    v-if="!isAuthenticated"
                    @click="goToLogin"
                    class="flex items-center justify-center w-full px-6 py-4 space-x-3 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-xl hover:shadow-xl hover:-translate-y-1"
                >
                    <svg
                        class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>Iniciar Sesión</span>
                </button>

                <button
                    v-else
                    @click="requestAccess"
                    class="flex items-center justify-center w-full px-6 py-4 space-x-3 font-semibold text-white transition-all duration-300 transform shadow-lg group bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-xl hover:shadow-xl hover:-translate-y-1"
                >
                    <svg
                        class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <span>Solicitar Acceso</span>
                </button>

                <!-- Botones secundarios -->
                <div class="grid grid-cols-2 gap-3">
                    <button
                        @click="goBack"
                        class="flex items-center justify-center px-4 py-3 space-x-2 font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm group hover:bg-gray-50 hover:border-yellow-300 hover:shadow-md"
                    >
                        <svg
                            class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span class="text-sm">Volver</span>
                    </button>

                    <button
                        @click="goHome"
                        class="flex items-center justify-center px-4 py-3 space-x-2 font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm group hover:bg-gray-50 hover:border-yellow-300 hover:shadow-md"
                    >
                        <svg
                            class="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span class="text-sm">Login</span>
                    </button>
                </div>
            </div>

            <!-- Información de contacto -->
            <div class="p-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                <div class="flex items-center justify-center mb-2 space-x-2">
                    <svg
                        class="w-4 h-4 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span class="text-sm font-medium text-yellow-800">¿Necesitas ayuda?</span>
                </div>
                <p class="text-xs leading-relaxed text-yellow-700">
                    Si crees que deberías tener acceso a esta página, contacta al administrador del
                    sistema o al soporte técnico.
                </p>
            </div>

            <!-- Footer con código de error -->
            <div class="space-y-1 text-xs text-gray-400">
                <p>Código de error: {{ errorCode }}</p>
                <p>Timestamp: {{ timestamp }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado reactivo
const isAuthenticated = ref(false);
const userRole = ref('');
const errorCode = ref('401');
const timestamp = ref('');

// Verificar autenticación al montar
onMounted(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    isAuthenticated.value = !!token;
    userRole.value = user.role || '';

    // Generar timestamp
    timestamp.value = new Date().toLocaleString();

    // Determinar código de error específico
    if (!token) {
        errorCode.value = '401'; // No autenticado
    } else {
        errorCode.value = '403'; // Autenticado pero sin permisos
    }
});

// Funciones de navegación
const goBack = () => {
    router.go(-1);
};

const goHome = () => {
    router.push('/driver/dashboard');
};

const goToLogin = () => {
    // Guardar la URL actual para redirección después del login
    const currentPath = router.currentRoute.value.fullPath;
    localStorage.setItem('redirectAfterLogin', currentPath);
    router.push('/login');
};

const requestAccess = () => {
    // Aquí podrías implementar lógica para solicitar acceso
    alert('Solicitud de acceso enviada. Te contactaremos pronto.');
};
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out;
}

/* Animación personalizada para el bounce del ícono */
@keyframes custom-bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
        transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
        transform: translate3d(0, -8px, 0);
    }
    70% {
        transform: translate3d(0, -4px, 0);
    }
    90% {
        transform: translate3d(0, -2px, 0);
    }
}

.animate-bounce {
    animation: custom-bounce 2s infinite;
}
</style>
