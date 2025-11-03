<template>
    <div
        class="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
    >
        <!-- Enhanced Background with much better visibility -->
        <div class="absolute inset-0 z-0">
            <div
                v-for="(image, index) in backgroundImages"
                :key="index"
                :class="[
                    'absolute inset-0 bg-cover bg-center transition-all duration-4000 ease-in-out',
                    currentImageIndex === index ? 'opacity-75 scale-100' : 'opacity-0 scale-105',
                ]"
                :style="{ backgroundImage: `url(${image})` }"
            ></div>
            <!-- <CHANGE> Enhanced overlays for better text contrast using BlazeCart colors -->
            <div
                class="absolute inset-0 bg-gradient-to-br from-blazecart-yellow-900/40 via-orange-900/30 to-amber-900/35"
            ></div>
            <!-- Strong overlay for maximum text readability -->
            <div
                class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"
            ></div>
            <!-- Subtle animated pattern overlay -->
            <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0 bg-repeat animate-pulse-slow pattern-bg"></div>
            </div>
        </div>
        <!-- Enhanced Image Indicators with BlazeCart branding -->
        <div class="absolute z-30 top-2 right-2 sm:top-4 sm:right-4">
            <div
                class="flex items-center px-3 py-2 space-x-2 border shadow-xl bg-black/90 backdrop-blur-xl rounded-xl border-blazecart-yellow-400/40"
            >
                <div class="flex space-x-1.5">
                    <div
                        v-for="(image, index) in backgroundImages"
                        :key="index"
                        @click="setCurrentImage(index)"
                        :class="[
                            'w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 relative border',
                            currentImageIndex === index
                                ? 'bg-blazecart-yellow-400 border-blazecart-yellow-300 scale-125 shadow-lg'
                                : 'bg-white/90 border-white/70 hover:bg-blazecart-yellow-200 hover:border-blazecart-yellow-300 hover:scale-110',
                        ]"
                    >
                        <!-- Ripple effect on active -->
                        <div
                            v-if="currentImageIndex === index"
                            class="absolute inset-0 rounded-full opacity-50 bg-blazecart-yellow-400 animate-ping"
                        ></div>
                    </div>
                </div>
                <div class="w-px h-3 bg-blazecart-yellow-400/60"></div>
                <span class="text-xs font-bold tracking-wide text-white drop-shadow-lg">
                    {{ currentImageIndex + 1 }}/{{ backgroundImages.length }}
                </span>
            </div>
        </div>
        <!-- Enhanced animated truck icon with BlazeCart styling -->
        <div class="absolute z-20 hidden transform -translate-y-1/2 top-1/3 left-4 lg:block">
            <div class="relative">
                <!-- Truck container with enhanced animation -->
                <div class="truck-container">
                    <svg
                        class="w-14 h-14 text-blazecart-yellow-400 drop-shadow-2xl animate-truck-move filter brightness-125"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                        />
                    </svg>
                    <!-- Enhanced animated exhaust smoke -->
                    <div class="absolute -right-1 top-1">
                        <div class="smoke-puff animate-smoke-1 bg-blazecart-yellow-200/80"></div>
                        <div class="smoke-puff animate-smoke-2 bg-blazecart-yellow-300/70"></div>
                        <div class="smoke-puff animate-smoke-3 bg-blazecart-yellow-400/60"></div>
                    </div>
                </div>
                <!-- Enhanced road line animation -->
                <div
                    class="absolute w-28 h-1.5 transform -translate-x-1/2 rounded-full -bottom-6 left-1/2 bg-gradient-to-r from-transparent via-blazecart-yellow-400/90 to-transparent animate-road-line shadow-lg"
                ></div>
            </div>
        </div>
        <!-- Main Content Container - Enhanced for better visibility -->
        <div class="relative z-10 flex items-center justify-center h-screen p-3 sm:p-4">
            <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <!-- Enhanced Corporate Header with stronger contrast -->
                <div class="mb-4 text-center sm:mb-6">
                    <div
                        class="inline-block p-4 mb-4 transition-all duration-500 border shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl border-blazecart-yellow-400/30 hover:shadow-3xl group"
                    >
                        <div
                            class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-blazecart-yellow-50 via-blazecart-yellow-100/50 to-blazecart-yellow-50 rounded-2xl group-hover:opacity-100"
                        ></div>
                        <img
                            src="/images/logo/logo.png"
                            alt="BlazeCart Logistics"
                            class="relative z-10 w-auto h-8 mx-auto transition-transform duration-300 sm:h-10 filter drop-shadow-lg group-hover:scale-105"
                        />
                    </div>
                    <!-- <CHANGE> Enhanced header with stronger background and better text visibility -->
                    <div
                        class="p-4 border shadow-2xl bg-black/80 backdrop-blur-lg rounded-xl border-blazecart-yellow-400/40"
                    >
                        <h1
                            class="mb-2 text-xl font-black tracking-wide text-white sm:text-2xl lg:text-3xl drop-shadow-2xl text-shadow-ultra-strong"
                        >
                            Sistema BlazeCart
                        </h1>
                        <p
                            class="text-sm font-black text-blazecart-yellow-200 sm:text-base lg:text-lg drop-shadow-xl text-shadow-ultra-strong"
                        >
                            Plataforma de Gestión Logística
                        </p>
                        <div
                            class="w-24 h-1 mx-auto mt-3 rounded-full shadow-lg bg-gradient-to-r from-transparent via-blazecart-yellow-400 to-transparent"
                        ></div>
                    </div>
                </div>
                <!-- Enhanced Login Form with better contrast -->
                <div
                    class="relative overflow-hidden border shadow-2xl bg-white/98 backdrop-blur-lg rounded-2xl border-blazecart-yellow-400/40"
                >
                    <!-- <CHANGE> Enhanced animated top accent bar with BlazeCart colors -->
                    <div
                        class="h-1.5 bg-gradient-to-r from-blazecart-yellow-400 via-blazecart-yellow-500 to-blazecart-yellow-600 animate-gradient-x shadow-md"
                    ></div>
                    <div class="p-5 sm:p-7">
                        <form @submit.prevent="handleLogin" class="space-y-5">
                            <!-- Form Header with enhanced styling -->
                            <div class="pb-3 text-center">
                                <h2
                                    class="mb-2 text-xl font-black text-white sm:text-2xl lg:text-3xl"
                                >
                                    🔐 Iniciar Sesión
                                </h2>
                                <p class="text-sm font-bold text-white sm:text-base">
                                    Ingrese sus credenciales corporativas para acceder
                                </p>
                            </div>
                            <!-- Enhanced Error Message with BlazeCart styling -->
                            <transition name="error-fade">
                                <div
                                    v-if="errorMessage"
                                    class="relative p-4 border-l-4 border-red-500 rounded-r-lg shadow-lg bg-red-50"
                                >
                                    <div class="flex items-start">
                                        <div class="flex-shrink-0">
                                            <div
                                                class="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full shadow-md"
                                            >
                                                <span class="text-xs font-black text-white">⚠</span>
                                            </div>
                                        </div>
                                        <div class="ml-3">
                                            <h4 class="text-sm font-black text-red-800">
                                                Error de Autenticación
                                            </h4>
                                            <p class="mt-1 text-xs font-bold text-red-700">
                                                {{ errorMessage }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <!-- Enhanced Email Field -->
                            <div class="space-y-2">
                                <label
                                    for="email"
                                    class="block text-sm font-black tracking-wide text-white sm:text-base"
                                >
                                    📧 Correo Electrónico Corporativo
                                </label>
                                <div class="relative">
                                    <input
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        required
                                        class="w-full px-4 py-4 text-sm font-bold text-gray-900 placeholder-gray-600 transition-all duration-300 border-2 border-gray-400 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-3 focus:ring-blazecart-yellow-400/50 focus:border-blazecart-yellow-500 hover:shadow-lg hover:border-gray-500 hover:bg-white"
                                        placeholder="usuario@blazecart.com"
                                    />
                                    <!-- Enhanced email validation indicator -->
                                    <div
                                        v-if="form.email && isValidEmail(form.email)"
                                        class="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        <div
                                            class="w-4 h-4 bg-green-500 border border-green-400 rounded-full shadow-md animate-pulse"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <!-- Enhanced Password Field -->
                            <div class="space-y-2">
                                <label
                                    for="password"
                                    class="block text-sm font-black tracking-wide text-white sm:text-base"
                                >
                                    🔒 Contraseña Segura
                                </label>
                                <div class="relative">
                                    <input
                                        id="password"
                                        v-model="form.password"
                                        :type="showPassword ? 'text' : 'password'"
                                        required
                                        class="w-full px-4 py-4 pr-24 text-sm font-bold text-gray-900 placeholder-gray-600 transition-all duration-300 border-2 border-gray-400 rounded-lg shadow-sm bg-gray-50 focus:outline-none focus:ring-3 focus:ring-blazecart-yellow-400/50 focus:border-blazecart-yellow-500 hover:shadow-lg hover:border-gray-500 hover:bg-white"
                                        placeholder="Ingrese su contraseña"
                                    />
                                    <button
                                        type="button"
                                        @click="togglePasswordVisibility"
                                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 transition-colors duration-200 hover:text-blazecart-yellow-600 focus:outline-none"
                                    >
                                        <span
                                            class="px-3 py-1.5 text-xs font-black text-white bg-blazecart-yellow-500 rounded-md hover:bg-blazecart-yellow-600 shadow-md transition-colors duration-200"
                                        >
                                            {{ showPassword ? '👁️ Ocultar' : '👁️ Mostrar' }}
                                        </span>
                                    </button>
                                </div>
                                <!-- Enhanced password strength indicator -->
                                <div v-if="form.password" class="mt-3">
                                    <div class="flex space-x-1">
                                        <div
                                            v-for="i in 4"
                                            :key="i"
                                            :class="[
                                                'h-2 flex-1 rounded-full transition-all duration-300 shadow-sm',
                                                getPasswordStrength() >= i
                                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                                    : 'bg-gray-300',
                                            ]"
                                        ></div>
                                    </div>
                                    <p class="mt-2 text-xs font-bold text-white">
                                        🛡️ Nivel de Seguridad:
                                        <span class="font-black text-blazecart-yellow-600">{{
                                            getPasswordStrengthText()
                                        }}</span>
                                    </p>
                                </div>
                            </div>
                            <!-- Enhanced Login Button with BlazeCart branding -->
                            <button
                                type="submit"
                                :disabled="isLoading || !isFormValid"
                                class="w-full px-6 py-4 text-white font-black bg-gradient-to-r from-blazecart-yellow-500 to-blazecart-yellow-600 rounded-lg shadow-xl hover:from-blazecart-yellow-600 hover:to-blazecart-yellow-700 focus:outline-none focus:ring-4 focus:ring-blazecart-yellow-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-base sm:text-lg hover:shadow-2xl border-2 border-blazecart-yellow-400"
                            >
                                <span
                                    v-if="!isLoading"
                                    class="flex items-center justify-center space-x-2"
                                >
                                    <span>🚀</span>
                                    <span>Acceder al Sistema</span>
                                </span>
                                <span v-else class="flex items-center justify-center space-x-3">
                                    <div
                                        class="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"
                                    ></div>
                                    <span>⏳ Autenticando...</span>
                                </span>
                            </button>
                            <!-- Enhanced Security Notice -->
                            <div class="pt-4 text-center border-t-2 border-blazecart-yellow-200">
                                <div
                                    class="flex items-center justify-center space-x-2 text-xs text-white"
                                >
                                    <div
                                        class="w-3 h-3 bg-green-500 border border-green-400 rounded-full shadow-sm animate-pulse"
                                    ></div>
                                    <span class="font-black"
                                        >🔐 Conexión Segura SSL/TLS 256-bit</span
                                    >
                                </div>
                                <p class="mt-2 text-xs font-bold text-white">
                                    Protegido por sistemas de seguridad BlazeCart
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- Enhanced Footer with BlazeCart branding -->
                <div class="mt-5 text-center">
                    <div
                        class="p-4 border shadow-2xl bg-black/85 backdrop-blur-lg rounded-xl border-blazecart-yellow-400/40"
                    >
                        <p
                            class="text-sm font-black text-white drop-shadow-2xl text-shadow-ultra-strong"
                        >
                            🆘 ¿Necesita asistencia técnica?
                            <a
                                href="#"
                                class="ml-2 font-black underline transition-colors duration-200 text-blazecart-yellow-400 hover:text-blazecart-yellow-300 decoration-2 underline-offset-2 hover:decoration-blazecart-yellow-300"
                            >
                                📞 Contactar Soporte 24/7
                            </a>
                        </p>
                        <div
                            class="flex items-center justify-center mt-3 space-x-2 text-xs font-bold text-blazecart-yellow-200 drop-shadow-xl text-shadow-ultra-strong"
                        >
                            <span>© 2025 BlazeCart Logistics</span>
                            <span>•</span>
                            <span>Todos los derechos reservados</span>
                            <span>•</span>
                            <span>v2.1.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAlert } from '@/composables/useAlert';
import { loginBE } from '@/services/AuthService';
import { Buffer } from 'buffer';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({ email: '', password: '' });
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');
const currentImageIndex = ref(0);
const router = useRouter();

// <CHANGE> Enhanced background images with logistics theme
const backgroundImages = ref([
    '/images/fondos/camion.jpg',
    /*     '/images/fondos/camionero.avif',
    '/images/fondos/OIP.webp', */
    '/images/fondos/camion2.jpg',
]);

let imageSliderInterval = null;

// Composable para alertas
const { showSuccess, showError, showLoading, closeLoading } = useAlert();

// Computed properties
const isFormValid = computed(() => {
    return form.value.email && form.value.password && isValidEmail(form.value.email);
});

// Methods
const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getPasswordStrength = () => {
    const password = form.value.password;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
};

const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    const texts = ['Muy Débil', 'Débil', 'Buena', 'Excelente'];
    return texts[strength - 1] || 'Muy Débil';
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const setCurrentImage = index => {
    currentImageIndex.value = index;
    clearInterval(imageSliderInterval);
    startImageSlider();
};

const handleLogin = async () => {
    if (!isFormValid.value) return;

    isLoading.value = true;
    errorMessage.value = '';

    try {
        // Mostrar loading
        showLoading('Autenticando...');

        const { data } = await loginBE(form.value);

        // Guardar token en localStorage (codificado en base64)
        const tokenEncrypt = Buffer.from(data.token).toString('base64');
        localStorage.setItem('token', tokenEncrypt);

        // Extraer datos del usuario según la nueva estructura
        const userData = {
            id: data.user.id,
            nombre: data.user.general_data.nombre,
            apellido: data.user.general_data.apellido,
            email: data.user.email,
            image: '',
            role: data.user.roles.length > 0 ? data.user.roles[0].name : 'admin',
        };

        // Guardar datos del usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Cerrar loading
        closeLoading();

        // Mostrar mensaje de éxito
        showSuccess(
            '¡Bienvenido al Sistema BlazeCart!',
            `Hola ${userData.nombre}, has iniciado sesión correctamente.`
        );

        // Mostrar animación de éxito antes de redirigir
        setTimeout(() => {
            // Redirección según el rol del usuario
            if (userData.role === 'admin') {
                router.push({ path: '/datos-revelantes' });
            } else if (userData.role === 'carrier') {
                router.push({ path: '/driver/dashboard' });
            } else {
                // Para otros roles (usuario, shipper, dispatch, inversionista)
                router.push({ path: '/dashboard' });
            }
        }, 1500);
    } catch (error) {
        console.error('Error en login:', error);

        // Cerrar loading
        closeLoading();

        // Mostrar mensaje de error
        const errorMsg =
            error.response?.data?.message || 'Credenciales incorrectas. Verifique sus datos.';
        errorMessage.value = errorMsg;
        showError('Error de autenticación', errorMsg);
    } finally {
        isLoading.value = false;
    }
};

const startImageSlider = () => {
    imageSliderInterval = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.value.length;
    }, 7000);
};

onMounted(() => startImageSlider());
onUnmounted(() => clearInterval(imageSliderInterval));
</script>

<style scoped>
/* Enhanced pattern background */
.pattern-bg {
    background-image: url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23fbbf24" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E');
}
/* Ultra strong text shadows for maximum visibility */
.text-shadow-ultra-strong {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.95), 0 0 10px rgba(0, 0, 0, 0.8),
        0 0 15px rgba(0, 0, 0, 0.6), -1px -1px 0 rgba(0, 0, 0, 0.9), 1px -1px 0 rgba(0, 0, 0, 0.9),
        -1px 1px 0 rgba(0, 0, 0, 0.9), 1px 1px 0 rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.4);
}
/* Enhanced custom animations */
@keyframes gradient-x {
    0%,
    100% {
        background-size: 200% 200%;
        background-position: left center;
    }
    50% {
        background-size: 200% 200%;
        background-position: right center;
    }
}
@keyframes truck-move {
    0%,
    100% {
        transform: translateX(0px) translateY(0px) rotate(0deg);
    }
    25% {
        transform: translateX(3px) translateY(-2px) rotate(1deg);
    }
    50% {
        transform: translateX(0px) translateY(2px) rotate(0deg);
    }
    75% {
        transform: translateX(-3px) translateY(0px) rotate(-1deg);
    }
}
@keyframes smoke-1 {
    0% {
        opacity: 0;
        transform: translateX(0) translateY(0) scale(0.4);
    }
    50% {
        opacity: 0.9;
        transform: translateX(-10px) translateY(-6px) scale(1.2);
    }
    100% {
        opacity: 0;
        transform: translateX(-20px) translateY(-12px) scale(1.8);
    }
}
@keyframes smoke-2 {
    0% {
        opacity: 0;
        transform: translateX(0) translateY(0) scale(0.3);
    }
    50% {
        opacity: 0.7;
        transform: translateX(-8px) translateY(-8px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateX(-16px) translateY(-16px) scale(1.5);
    }
}
@keyframes smoke-3 {
    0% {
        opacity: 0;
        transform: translateX(0) translateY(0) scale(0.5);
    }
    50% {
        opacity: 0.8;
        transform: translateX(-12px) translateY(-4px) scale(1.3);
    }
    100% {
        opacity: 0;
        transform: translateX(-24px) translateY(-8px) scale(2);
    }
}
@keyframes road-line {
    0% {
        transform: translateX(-50%) scaleX(0);
        opacity: 0;
    }
    50% {
        transform: translateX(-50%) scaleX(1);
        opacity: 1;
    }
    100% {
        transform: translateX(-50%) scaleX(0);
        opacity: 0;
    }
}
@keyframes pulse-slow {
    0%,
    100% {
        opacity: 0.05;
    }
    50% {
        opacity: 0.1;
    }
}
/* Animation classes */
.animate-gradient-x {
    animation: gradient-x 4s ease infinite;
}
.animate-truck-move {
    animation: truck-move 5s ease-in-out infinite;
}
.animate-smoke-1 {
    animation: smoke-1 2.5s ease-out infinite;
}
.animate-smoke-2 {
    animation: smoke-2 3s ease-out infinite 0.4s;
}
.animate-smoke-3 {
    animation: smoke-3 2.8s ease-out infinite 0.8s;
}
.animate-road-line {
    animation: road-line 2.5s ease-in-out infinite;
}
.animate-pulse-slow {
    animation: pulse-slow 5s ease-in-out infinite;
}
/* Enhanced smoke puffs with BlazeCart colors */
.smoke-puff {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(251, 191, 36, 0.6);
}
/* Enhanced transition animations */
.error-fade-enter-active,
.error-fade-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.error-fade-enter-from,
.error-fade-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
}
/* Enhanced focus and hover states */
input:focus {
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
    transform: translateY(-2px);
}
input:hover:not(:focus) {
    border-color: #6b7280;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(251, 191, 36, 0.3);
}
button:active:not(:disabled) {
    transform: translateY(0);
}
/* Ensure no scroll on any screen size */
html,
body {
    overflow: hidden;
}
/* Enhanced responsive design */
@media (max-height: 700px) {
    .space-y-5 > * + * {
        margin-top: 1rem;
    }
    .space-y-2 > * + * {
        margin-top: 0.5rem;
    }
}
@media (max-height: 600px) {
    .space-y-5 > * + * {
        margin-top: 0.75rem;
    }
    .p-5 {
        padding: 1rem;
    }
    .p-7 {
        padding: 1.25rem;
    }
}
@media (max-width: 640px) {
    .h-screen {
        height: 100vh;
        height: 100dvh;
    }
}
@media (max-width: 480px) {
    .space-y-5 > * + * {
        margin-top: 1rem;
    }
}
/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
/* Enhanced focus visible for better accessibility */
button:focus-visible,
input:focus-visible,
a:focus-visible {
    outline: 3px solid #fbbf24;
    outline-offset: 2px;
}
/* Custom scrollbar for better UX */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
    background: #fbbf24;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #f59e0b;
}
</style>
