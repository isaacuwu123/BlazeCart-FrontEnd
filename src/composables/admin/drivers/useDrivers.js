// src/composables/admin/drivers/useDrivers.js

import { useAlert } from '@/composables/useAlert';
import {
    ALLOWED_IMAGE_TYPES,
    MAX_FILE_SIZE,
    MESSAGES,
    PAGINATION_DEFAULTS,
    VALIDATION_RULES,
} from '@/constants/driverConstants';
import {
    DEFAULT_DRIVER_DOCUMENTS,
    DEFAULT_DRIVER_FORM_DATA,
    DEFAULT_DRIVER_PASSWORD_FORM,
    DEFAULT_FORM_ERRORS,
    DEFAULT_PASSWORD_FORM_ERRORS,
    DEFAULT_PHOTO_PREVIEW,
} from '@/constants/driverFormDefaults';
import {
    activateDriver,
    createDriver,
    deactivateDriver,
    deleteDriver,
    indexDrivers,
    showDriver,
    updateDriver,
} from '@/services/DriverService';
import { indexUsers, updatePassword } from '@/services/UserService';
import { ref } from 'vue';

/**
 * Composable para gestionar la lógica de CRUD de conductores
 * Separación de responsabilidades: lógica de negocio fuera del componente
 */
export function useDrivers() {
    const { showSuccess, showError, showConfirm, showLoading, closeLoading } = useAlert();

    // ==================== STATE ====================
    const drivers = ref([]);
    const users = ref([]);
    const pagination = ref({
        current_page: PAGINATION_DEFAULTS.CURRENT_PAGE,
        total_pages: 1,
        per_page: PAGINATION_DEFAULTS.PER_PAGE,
        total: 0,
    });

    // ✅ Usar structuredClone para inicializar formData
    const formData = ref(structuredClone(DEFAULT_DRIVER_FORM_DATA));
    const formErrors = ref(structuredClone(DEFAULT_FORM_ERRORS));
    const passwordFormData = ref(structuredClone(DEFAULT_DRIVER_PASSWORD_FORM));
    const passwordFormErrors = ref(structuredClone(DEFAULT_PASSWORD_FORM_ERRORS));
    const photoPreview = ref(DEFAULT_PHOTO_PREVIEW);
    const driverDocuments = ref([...DEFAULT_DRIVER_DOCUMENTS]);

    const isDriverModalOpen = ref(false);
    const isPasswordModalOpen = ref(false);
    const isLoading = ref(false);
    const posicion = ref(null);

    // ==================== MÉTODOS ====================

    /**
     * Lista los conductores con filtros opcionales
     * @param {number} page - Número de página
     * @param {object} filters - Filtros opcionales (search, estado, estado_licencia)
     */
    const listDrivers = async (page = 1, filters = {}) => {
        try {
            showLoading();

            const params = {
                page,
                ...filters, // Spread de los filtros recibidos
            };

            console.log('📤 Enviando petición con params:', params);
            const response = await indexDrivers(params);
            console.log('📥 Respuesta completa:', response);

            // ⚠️ IMPORTANTE: Tu API devuelve data.data.datos
            drivers.value = response.data.datos || [];

            // ⚠️ Tu API no devuelve paginación en el root, ajustar según respuesta real
            pagination.value = {
                current_page: response.data.current_page || page,
                total_pages: response.data.last_page || 1,
                per_page: response.data.per_page || PAGINATION_DEFAULTS.PER_PAGE,
                total: response.data.total || drivers.value.length,
            };

            console.log('✅ Drivers cargados:', drivers.value);
            console.log('✅ Total:', drivers.value.length);
        } catch (error) {
            console.error('❌ Error listing drivers:', error);
            showError('Error', MESSAGES.ERROR.LOAD_DRIVERS);
        } finally {
            closeLoading();
        }
    };

    /**
     * Lista los usuarios disponibles para asignar a conductores
     */
    const listUsers = async () => {
        try {
            const data = await indexUsers();
            users.value = data.data.data || [];
        } catch (error) {
            console.error('Error listing users:', error);
            showError('Error', MESSAGES.ERROR.LOAD_USERS);
        }
    };

    /**
     * Obtiene la información completa de un conductor
     * @param {number} driverId - ID del conductor
     */
    const showDriverById = async driverId => {
        try {
            showLoading();
            const response = await showDriver(driverId);
            const data = response.data.datos || response.data;

            // ✅ Usar structuredClone y luego asignar valores
            formData.value = structuredClone(DEFAULT_DRIVER_FORM_DATA);
            formData.value.user_id = data.user_id;
            formData.value.numero_licencia = data.numero_licencia || '';
            formData.value.vencimiento_licencia = data.vencimiento_licencia
                ? data.vencimiento_licencia.split('T')[0]
                : '';
            formData.value.estado_licencia = data.estado_licencia || '';
            formData.value.clase_cdl = data.clase_cdl || '';
            formData.value.tipo_licencia = data.tipo_licencia || '';
            formData.value.restricciones = data.restricciones || '';
            formData.value.categoria = data.categoria || '';
            formData.value.observaciones = data.observaciones || '';

            photoPreview.value = data.foto_url || DEFAULT_PHOTO_PREVIEW;
            driverDocuments.value = data.documents || [...DEFAULT_DRIVER_DOCUMENTS];
            posicion.value = driverId;
            isDriverModalOpen.value = true;
            formErrors.value = structuredClone(DEFAULT_FORM_ERRORS);
        } catch (error) {
            console.error('Error fetching driver:', error);
            showError('Error', MESSAGES.ERROR.LOAD_DRIVER);
        } finally {
            closeLoading();
        }
    };

    /**
     * Resetea el formulario a su estado inicial
     */
    const resetForm = () => {
        formData.value = structuredClone(DEFAULT_DRIVER_FORM_DATA);
        photoPreview.value = DEFAULT_PHOTO_PREVIEW;
        driverDocuments.value = [...DEFAULT_DRIVER_DOCUMENTS];
        formErrors.value = structuredClone(DEFAULT_FORM_ERRORS);
    };

    /**
     * Resetea el formulario de contraseña
     */
    const resetPasswordForm = () => {
        passwordFormData.value = structuredClone(DEFAULT_DRIVER_PASSWORD_FORM);
        passwordFormErrors.value = structuredClone(DEFAULT_PASSWORD_FORM_ERRORS);
    };

    /**
     * Abre el modal de crear/editar conductor
     * @param {object|null} driver - Conductor a editar (null para crear nuevo)
     */
    const openDriverModal = (driver = null) => {
        resetForm();
        if (driver) {
            showDriverById(driver.id);
        } else {
            posicion.value = null;
            isDriverModalOpen.value = true;
        }
    };

    /**
     * Abre el modal de cambiar contraseña
     * @param {object} driver - Conductor al que cambiar la contraseña
     */
    const openPasswordModal = driver => {
        resetPasswordForm();
        passwordFormData.value.user_id = driver.user_id;
        isPasswordModalOpen.value = true;
    };

    /**
     * Cierra el modal de conductor
     */
    const closeDriverModal = () => {
        isDriverModalOpen.value = false;
        resetForm();
    };

    /**
     * Cierra el modal de contraseña
     */
    const closePasswordModal = () => {
        isPasswordModalOpen.value = false;
        resetPasswordForm();
    };

    /**
     * Valida los datos del formulario
     * @returns {boolean} - True si el formulario es válido
     */
    const validateFormData = () => {
        formErrors.value = structuredClone(DEFAULT_FORM_ERRORS);
        let isValid = true;

        VALIDATION_RULES.REQUIRED_FIELDS.forEach(field => {
            if (!formData.value[field]) {
                formErrors.value[field] = `El campo ${field} es obligatorio.`;
                isValid = false;
            }
        });

        return isValid;
    };

    /**
     * Maneja la subida de foto
     * @param {Event} event - Evento del input file
     */
    const handlePhotoUpload = event => {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                formErrors.value.foto = MESSAGES.ERROR.FILE_SIZE;
                formData.value.foto = null;
                photoPreview.value = DEFAULT_PHOTO_PREVIEW;
                fileInput.value = '';
                return;
            }

            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                formErrors.value.foto = MESSAGES.ERROR.FILE_TYPE;
                formData.value.foto = null;
                photoPreview.value = DEFAULT_PHOTO_PREVIEW;
                fileInput.value = '';
                return;
            }

            formData.value.foto = file;
            photoPreview.value = URL.createObjectURL(file);
            formErrors.value.foto = '';
        } else {
            formData.value.foto = null;
            photoPreview.value = DEFAULT_PHOTO_PREVIEW;
            formErrors.value.foto = '';
            fileInput.value = '';
        }
    };

    /**
     * Guarda o actualiza un conductor
     */
    const handleSaveDriver = async () => {
        try {
            showLoading(formData.value.id ? 'Actualizando usuario...' : 'Guardando usuario...');

            isLoading.value = true;

            if (!validateFormData()) {
                closeLoading();
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
                return;
            }

            const data = new FormData();
            try {
                data.append('user_id', formData.value.user_id);
                data.append('numero_licencia', formData.value.numero_licencia);
                data.append('vencimiento_licencia', formData.value.vencimiento_licencia);
                data.append('estado_licencia', formData.value.estado_licencia);
                data.append('clase_cdl', formData.value.clase_cdl);
                data.append('tipo_licencia', formData.value.tipo_licencia);
                data.append('restricciones', formData.value.restricciones || '');
                data.append('categoria', formData.value.categoria);
                data.append('observaciones', formData.value.observaciones || '');

                if (formData.value.foto) {
                    data.append('foto', formData.value.foto);
                }

                if (posicion.value) {
                    data.append('_method', 'PUT');
                }
            } catch (error) {
                console.error('Error constructing FormData:', error);
                closeLoading();
                showError('Error', MESSAGES.ERROR.FORM_DATA);
                return;
            }

            if (posicion.value) {
                await updateDriver(posicion.value, data);
                // Mostrar éxito
                await showSuccess(
                    'Conductor actualizado!',
                    'Los datos del conductor han sido actualizados correctamente.'
                );
            } else {
                await createDriver(data);
                await showSuccess(
                    'Conductor creado!',
                    'El nuevo conductor ha sido creado correctamente.'
                );
            }

            await listDrivers();
            closeDriverModal();
        } catch (error) {
            console.error('Error saving driver:', error);
            if (error.response?.data?.errors) {
                formErrors.value = error.response.data.errors;
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
            } else {
                showError('Error', error.response?.data?.message || MESSAGES.ERROR.SAVE);
            }
        } finally {
            isLoading.value = false;
            closeLoading();
        }
    };

    /**
     * Actualiza la contraseña de un conductor
     */
    const handleUpdatePassword = async () => {
        try {
            showLoading('Actualizando contraseña...');
            isLoading.value = true;
            passwordFormErrors.value = structuredClone(DEFAULT_PASSWORD_FORM_ERRORS);

            // ✅ Validaciones con early return + cleanup
            if (!passwordFormData.value.password) {
                passwordFormErrors.value.password = 'La contraseña es obligatoria.';
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
                return;
            }

            if (!passwordFormData.value.password_confirmation) {
                passwordFormErrors.value.password_confirmation =
                    'La confirmación de la contraseña es obligatoria.';
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
                return;
            }

            if (passwordFormData.value.password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
                passwordFormErrors.value.password = `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres.`;
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
                return;
            }

            if (passwordFormData.value.password !== passwordFormData.value.password_confirmation) {
                passwordFormErrors.value.password_confirmation = 'Las contraseñas no coinciden.';
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
                return;
            }

            await updatePassword(passwordFormData.value.user_id, {
                password: passwordFormData.value.password,
                password_confirmation: passwordFormData.value.password_confirmation,
            });

            // Mostrar éxito
            await showSuccess(
                '¡Contraseña actualizada!',
                'La contraseña ha sido actualizada correctamente.'
            );
            closePasswordModal();
        } catch (error) {
            console.error('Error updating password:', error);
            if (error.response?.data?.errors) {
                passwordFormErrors.value = error.response.data.errors;
                showError('Error de Validación', MESSAGES.ERROR.VALIDATION);
            } else {
                showError('Error', error.response?.data?.message || MESSAGES.ERROR.PASSWORD_UPDATE);
            }
        } finally {
            isLoading.value = false;
            closeLoading();
        }
    };

    /**
     * Activa un conductor
     */
    const handleActivateDriver = async driver => {
        try {
            showLoading();
            await activateDriver(driver.id);
            showSuccess('Éxito', MESSAGES.SUCCESS.ACTIVATE);
            await listDrivers();
        } catch (error) {
            console.error('Error activating driver:', error);
            showError('Error', error.response?.data?.message || MESSAGES.ERROR.ACTIVATE);
        } finally {
            closeLoading();
        }
    };

    /**
     * Desactiva un conductor
     */
    const handleDeactivateDriver = async driver => {
        try {
            showLoading();
            await deactivateDriver(driver.id);
            showSuccess('Éxito', MESSAGES.SUCCESS.DEACTIVATE);
            await listDrivers();
        } catch (error) {
            console.error('Error deactivating driver:', error);
            showError('Error', error.response?.data?.message || MESSAGES.ERROR.DEACTIVATE);
        } finally {
            closeLoading();
        }
    };

    /**
     * Confirma y elimina un conductor
     */
    const confirmDelete = async driver => {
        try {
            const driverName = `${driver.user?.general_data?.nombre || 'NA'} ${
                driver.user?.general_data?.apellido || ''
            }`.trim();

            const result = await showConfirm(
                'Confirmar Eliminación',
                MESSAGES.CONFIRM.DELETE(driverName)
            );

            if (!result.isConfirmed) {
                return;
            }

            showLoading();
            await deleteDriver(driver.id);
            showSuccess('Éxito', MESSAGES.SUCCESS.DELETE);
            await listDrivers();
        } catch (error) {
            console.error('Error deleting driver:', error);
            showError('Error', error.response?.data?.message || MESSAGES.ERROR.DELETE);
        } finally {
            closeLoading();
        }
    };

    /**
     * Cambia de página en la paginación
     */
    const changePage = page => {
        listDrivers(page);
    };

    // ==================== RETURN ====================
    return {
        // State
        drivers,
        users,
        pagination,
        formData,
        formErrors,
        passwordFormData,
        passwordFormErrors,
        photoPreview,
        driverDocuments,
        isDriverModalOpen,
        isPasswordModalOpen,
        isLoading,
        posicion,

        // Methods
        listDrivers,
        listUsers,
        openDriverModal,
        closeDriverModal,
        openPasswordModal,
        closePasswordModal,
        handlePhotoUpload,
        handleSaveDriver,
        handleUpdatePassword,
        handleActivateDriver,
        handleDeactivateDriver,
        confirmDelete,
        changePage,
    };
}
