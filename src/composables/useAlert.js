import Swal from 'sweetalert2';
import { isDarkMode } from './useDarkMode'; // Ajusta la ruta según tu estructura

export const useAlert = () => {
    // Función helper para obtener los estilos según el modo actual
    const getThemeStyles = () => {
        const dark = isDarkMode.value;
        return {
            background: dark ? '#1f2937' : '#fff',
            color: dark ? '#f9fafb' : '#1f2937',
            confirmButtonColor: '#f59e0b', // BlazeCart yellow (se mantiene igual)
            cancelButtonColor: dark ? '#4b5563' : '#6b7280',
            popup: dark
                ? 'rounded-lg shadow-xl bg-gray-800 text-gray-100'
                : 'rounded-lg shadow-xl bg-white text-gray-900',
            title: dark
                ? 'text-lg font-semibold text-gray-100'
                : 'text-lg font-semibold text-gray-900',
            content: dark ? 'text-sm text-gray-300' : 'text-sm text-gray-700',
            // Estilos mejorados para botones
            confirmButton: dark
                ? 'px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors duration-200 shadow-md'
                : 'px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md transition-colors duration-200 shadow-md',
            cancelButton: dark
                ? 'px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors duration-200 shadow-md'
                : 'px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md transition-colors duration-200 shadow-md',
            // Estilos para botón de error
            errorButton: dark
                ? 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 shadow-md'
                : 'px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 shadow-md',
        };
    };

    // In @/composables/useAlert.js
    const showSuccess = (title, text = '', options = {}) => {
        const theme = getThemeStyles();
        return Swal.fire({
            icon: 'success',
            title,
            text,
            confirmButtonColor: theme.confirmButtonColor,
            background: theme.background,
            color: theme.color,
            iconColor: '#10b981', // Verde success
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                popup: theme.popup,
                title: theme.title,
                content: theme.content,
                confirmButton: theme.confirmButton,
            },
            ...options, // Merge custom options
        });
    };

    const showError = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'error',
            title,
            text,
            confirmButtonColor: '#dc2626',
            background: theme.background,
            color: theme.color,
            iconColor: '#dc2626', // Rojo error
            showConfirmButton: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-lg font-semibold text-red-400'
                    : 'text-lg font-semibold text-red-600',
                content: theme.content,
                confirmButton: theme.errorButton, // Usar estilo específico para error
            },
        });
    };

    const showWarning = (title, text = '') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            icon: 'warning',
            title,
            text,
            confirmButtonColor: theme.confirmButtonColor,
            background: theme.background,
            color: theme.color,
            iconColor: '#f59e0b', // Amarillo warning
            showConfirmButton: true,
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-lg font-semibold text-yellow-400'
                    : 'text-lg font-semibold text-yellow-600',
                content: theme.content,
                confirmButton: theme.confirmButton,
            },
        });
    };

    const showConfirm = (title, text = '') => {
        const theme = getThemeStyles();
        return Swal.fire({
            icon: 'question',
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: theme.confirmButtonColor,
            cancelButtonColor: theme.cancelButtonColor,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar',
            background: theme.background,
            color: theme.color,
            customClass: {
                popup: theme.popup,
                title: theme.title,
                content: theme.content,
                confirmButton: theme.confirmButton,
                cancelButton: theme.cancelButton,
            },
        }).then(result => {
            // Retornar true solo si el usuario presionó el botón de confirmación
            return result.isConfirmed;
        });
    };

    const showValidationErrors = errors => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        let errorHtml = `<div class="text-left ${dark ? 'text-gray-300' : 'text-gray-700'}">`;
        Object.keys(errors).forEach(field => {
            const fieldName = field.replace('general_data.', '').replace('_', ' ');
            const capitalizedField = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
            const errorClass = dark ? 'text-red-400' : 'text-red-600';
            if (Array.isArray(errors[field])) {
                errors[field].forEach(error => {
                    errorHtml += `<p class="mb-2 ${errorClass}"><strong>${capitalizedField}:</strong> ${error}</p>`;
                });
            } else {
                errorHtml += `<p class="mb-2 ${errorClass}"><strong>${capitalizedField}:</strong> ${errors[field]}</p>`;
            }
        });
        errorHtml += '</div>';
        return Swal.fire({
            icon: 'error',
            title: 'Errores de Validación',
            html: errorHtml,
            confirmButtonColor: '#dc2626',
            background: theme.background,
            color: theme.color,
            width: '500px',
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-lg font-semibold text-red-400'
                    : 'text-lg font-semibold text-red-600',
                htmlContainer: theme.content,
                confirmButton: theme.errorButton, // Usar estilo específico para error
            },
        });
    };

    const showLoading = (title = 'Procesando...') => {
        const theme = getThemeStyles();
        const dark = isDarkMode.value;
        return Swal.fire({
            title,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            background: theme.background,
            color: theme.color,
            didOpen: () => {
                Swal.showLoading();
                // Aplicar estilos al spinner de carga en modo oscuro
                if (dark) {
                    const loader = document.querySelector('.swal2-loader');
                    if (loader) {
                        loader.style.borderColor = '#4b5563 transparent #4b5563 transparent';
                    }
                }
            },
            customClass: {
                popup: theme.popup,
                title: dark
                    ? 'text-lg font-semibold text-yellow-400'
                    : 'text-lg font-semibold text-yellow-600',
            },
        });
    };

    const closeLoading = () => {
        Swal.close();
    };

    return {
        showSuccess,
        showError,
        showWarning,
        showConfirm,
        showValidationErrors,
        showLoading,
        closeLoading,
    };
};

export default useAlert;
