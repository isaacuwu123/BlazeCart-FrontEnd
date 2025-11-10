// src/composables/useUsers.js

/**
 * Composable para gestionar el CRUD de usuarios del sistema
 *
 * Responsabilidades:
 * - Listar usuarios con paginación y filtros
 * - Crear y actualizar usuarios
 * - Cambiar contraseña de usuario
 * - Ver información completa del usuario
 * - Gestionar el estado de modales (crear/editar, contraseña, info completa)
 * - Manejar el estado de carga y validaciones
 *
 * @returns {Object} Estado reactivo y funciones para gestionar usuarios
 */

import { useAlert } from '@/composables/useAlert';
import { DEFAULT_FORM_DATA, DEFAULT_PASSWORD_FORM } from '@/constants/userFormDefaults';
import { indexRoles } from '@/services/RolesAndPermissionsService';
import {
    createUser,
    indexUsers,
    infoUserComplete,
    showUsers,
    updatePassword,
    updateUser,
} from '@/services/UserService';
import { ref } from 'vue';

export function useUsers() {
    // ==================== COMPOSABLES ====================
    const { showSuccess, showError, showValidationErrors, showConfirm, showLoading, closeLoading } =
        useAlert();

    // ==================== ESTADO REACTIVO ====================

    /**
     * Lista de usuarios cargados desde la API
     * @type {Ref<Array>}
     */
    const users = ref([]);

    /**
     * Lista de roles disponibles en el sistema
     * @type {Ref<Array>}
     */
    const roles = ref([]);

    /**
     * Controla la visibilidad del modal de crear/editar usuario
     * @type {Ref<Boolean>}
     */
    const isUserModalOpen = ref(false);

    /**
     * Controla la visibilidad del modal de cambiar contraseña
     * @type {Ref<Boolean>}
     */
    const isPasswordModalOpen = ref(false);

    /**
     * Controla la visibilidad del modal de información completa
     * @type {Ref<Boolean>}
     */
    const isCompleteInfoModalOpen = ref(false);

    /**
     * Indica si hay una operación en curso (guardar, actualizar, etc.)
     * @type {Ref<Boolean>}
     */
    const isLoading = ref(false);

    /**
     * ID del usuario que se está editando
     * null = modo creación, número = modo edición
     * @type {Ref<Number|null>}
     */
    const posicion = ref(null);

    /**
     * Almacena temporalmente el último usuario creado (útil para WhatsApp)
     * @type {Ref<Object|null>}
     */
    const lastCreatedUser = ref(null);

    /**
     * Datos completos del usuario para el modal de información
     * @type {Ref<Object|null>}
     */
    const completeUserData = ref(null);

    /**
     * Datos de paginación de la lista de usuarios
     * @type {Ref<Object>}
     */
    const pagination = ref({
        total: 0, // Total de registros
        count: 0, // Registros en la página actual
        per_page: 10, // Registros por página
        current_page: 1, // Página actual
        total_pages: 1, // Total de páginas
        has_more_pages: false, // Si hay más páginas disponibles
        next_page_url: null, // URL de la siguiente página
        prev_page_url: null, // URL de la página anterior
        from: 0, // Primer registro de la página actual
        to: 0, // Último registro de la página actual
    });

    /**
     * Datos del formulario de crear/editar usuario
     * ⚠️ IMPORTANTE: Se inicializa con spread para crear copia, no referencia directa
     * @type {Ref<Object>}
     */
    const formData = ref({ ...DEFAULT_FORM_DATA });

    /**
     * Datos del formulario de cambio de contraseña
     * @type {Ref<Object>}
     */
    const passwordFormData = ref({ ...DEFAULT_PASSWORD_FORM });

    // ==================== MÉTODOS CRUD ====================

    /**
     * Obtiene la lista de usuarios con paginación y filtros
     *
     * @param {Number} page - Número de página
     * @param {Object} filters - Filtros de búsqueda { search, estado, rol }
     * @returns {Promise<void>}
     */
    const listUsers = async (page = 1, filters = {}) => {
        try {
            // ✅ Construir parámetros
            const params = {
                page,
                per_page: pagination.value.per_page,
                ...filters, // ← Spread de filtros
            };
            // Llamar API
            const { data } = await indexUsers(params);

            users.value = data.data;

            pagination.value = {
                ...data.pagination,
                from: (data.pagination.current_page - 1) * data.pagination.per_page + 1,
                to: Math.min(
                    data.pagination.current_page * data.pagination.per_page,
                    data.pagination.total
                ),
            };
        } catch (error) {
            console.error('Error listando usuarios:', error);
            showError('Error', 'No se pudieron cargar los usuarios.');
        }
    };

    /**
     * Obtiene la lista de roles disponibles en el sistema
     * Se ejecuta típicamente al montar el componente
     *
     * @returns {Promise<void>}
     */
    const listRoles = async () => {
        try {
            const { data } = await indexRoles();
            roles.value = data.data;
        } catch (error) {
            console.error('Error listando roles:', error);
            // No mostramos error al usuario porque no es crítico
        }
    };

    // ==================== GESTIÓN DE FORMULARIOS ====================

    /**
     * Resetea el formulario de usuario a su estado inicial
     * ✅ SOLUCIÓN AL BUG: Usa structuredClone o JSON para copia profunda
     *
     * ANTES (con bug):
     *   formData.value = { ...DEFAULT_FORM_DATA }
     *   ❌ Problema: Spread solo copia el primer nivel, general_data y roles
     *      mantienen referencias al objeto original
     *
     * DESPUÉS (sin bug):
     *   formData.value = structuredClone(DEFAULT_FORM_DATA)
     *   ✅ Solución: structuredClone crea copia profunda sin referencias
     *
     * @returns {void}
     */
    const resetForm = () => {
        // ✅ OPCIÓN 1: structuredClone (moderno, recomendado, Node 17+)
        formData.value = structuredClone(DEFAULT_FORM_DATA);

        // ✅ OPCIÓN 2: JSON parse/stringify (compatible, pero no soporta Date, undefined)
        // formData.value = JSON.parse(JSON.stringify(DEFAULT_FORM_DATA));

        // ✅ OPCIÓN 3: Lodash cloneDeep (si ya usas lodash)
        // formData.value = cloneDeep(DEFAULT_FORM_DATA);

        // Resetear también el indicador de edición
        posicion.value = null;
    };

    /**
     * Resetea el formulario de cambio de contraseña a su estado inicial
     *
     * @returns {void}
     */
    const resetPasswordForm = () => {
        // También usar copia profunda para consistencia
        passwordFormData.value = structuredClone(DEFAULT_PASSWORD_FORM);
    };

    // ==================== GESTIÓN DE MODALES ====================

    /**
     * Abre el modal de usuario en modo creación o edición
     * ✅ SOLUCIÓN AL BUG: SIEMPRE resetea antes de abrir
     *
     * Flujo:
     * 1. Resetea formData (limpia datos residuales)
     * 2. Si se pasa un usuario, carga sus datos (modo edición)
     * 3. Si no se pasa usuario, abre modal vacío (modo creación)
     *
     * @param {Object|null} user - Usuario a editar (null para crear nuevo)
     * @returns {void}
     *
     * @example
     * // Crear nuevo usuario
     * openUserModal()
     *
     * // Editar usuario existente
     * openUserModal({ id: 5, email: 'user@example.com', ... })
     */
    const openUserModal = (user = null) => {
        // ✅ SIEMPRE resetear primero, incluso si es edición
        // (se sobreescribirá después con los datos del usuario)
        resetForm();

        if (user) {
            // Modo edición: cargar datos del usuario
            showUser(user.id);
        } else {
            // Modo creación: formData ya está limpio gracias a resetForm()
            posicion.value = null; // Asegurar que no esté en modo edición
            isUserModalOpen.value = true; // Abrir modal
        }
    };

    /**
     * Cierra el modal de usuario y limpia el formulario
     * ✅ SOLUCIÓN AL BUG: Limpia al cerrar para prevenir residuos
     *
     * @returns {void}
     */
    const closeUserModal = () => {
        isUserModalOpen.value = false;
        resetForm(); // ✅ Limpiar después de cerrar
    };

    const showUser = async userId => {
        try {
            const { data } = await showUsers(userId);

            const roleNames = data.data.roles.map(role => role.name);

            // ✅ Convertir fecha ISO a formato YYYY-MM-DD para input type="date"
            const nacimientoDate = data.data.general_data.nacimiento
                ? data.data.general_data.nacimiento.split('T')[0]
                : '';

            formData.value = {
                id: data.data.id,
                email: data.data.email,
                password: '',
                password_confirmation: '',
                estado: data.data.estado,
                roles: [...roleNames],
                general_data: {
                    nombre: data.data.general_data.nombre || '',
                    apellido: data.data.general_data.apellido || '',
                    documento_identidad: data.data.general_data.documento_identidad || '',
                    celular: data.data.general_data.celular || '',
                    nacimiento: nacimientoDate, // ✅ NUEVO
                    genero: data.data.general_data.genero || '', // ✅ NUEVO
                    direccion: data.data.general_data.direccion || '',
                    ciudad: data.data.general_data.ciudad || '',
                    departamento: data.data.general_data.departamento || '',
                    codigo_postal: data.data.general_data.codigo_postal || '', // ✅ NUEVO
                    contacto_emergencia_nombre:
                        data.data.general_data.contacto_emergencia_nombre || '', // ✅ NUEVO
                    contacto_emergencia_telefono:
                        data.data.general_data.contacto_emergencia_telefono || '', // ✅ NUEVO
                    notas: data.data.general_data.notas || '', // ✅ NUEVO
                },
            };

            posicion.value = userId;
            isUserModalOpen.value = true;
        } catch (error) {
            console.error('Error cargando usuario:', error);
            showError('Error', 'No se pudo cargar el usuario.');
        }
    };

    /**
     * Abre el modal de cambio de contraseña para un usuario específico
     *
     * @param {Number} userId - ID del usuario cuya contraseña se cambiará
     * @returns {void}
     *
     * @example
     * openPasswordModal(5)
     */
    const openPasswordModal = userId => {
        resetPasswordForm(); // Limpiar formulario previo
        passwordFormData.value.userId = userId; // Asignar ID del usuario
        isPasswordModalOpen.value = true; // Abrir modal
    };

    /**
     * Cierra el modal de cambio de contraseña y limpia el formulario
     *
     * @returns {void}
     */
    const closePasswordModal = () => {
        isPasswordModalOpen.value = false;
        resetPasswordForm(); // Limpiar después de cerrar
    };

    /**
     * Abre el modal de información completa de un usuario
     * Carga datos adicionales que no se muestran en la tabla/card
     *
     * @param {Number} userId - ID del usuario a consultar
     * @returns {Promise<void>}
     *
     * @example
     * await openCompleteInfoModal(5)
     */
    const openCompleteInfoModal = async userId => {
        try {
            // Llamar endpoint específico de información completa
            const { data } = await infoUserComplete(userId);
            completeUserData.value = data.data;
            isCompleteInfoModalOpen.value = true;
        } catch (error) {
            console.error('Error cargando info completa:', error);
            showError('Error', 'No se pudieron cargar los datos completos.');
        }
    };

    /**
     * Cierra el modal de información completa y limpia los datos
     *
     * @returns {void}
     */
    const closeCompleteInfoModal = () => {
        isCompleteInfoModalOpen.value = false;
        completeUserData.value = null; // Limpiar datos
    };

    // ==================== OPERACIONES DE GUARDADO ====================

    /**
     * Guarda o actualiza un usuario según el modo (creación/edición)
     *
     * Flujo:
     * 1. Muestra loading
     * 2. Si posicion.value existe → Actualizar (PUT)
     * 3. Si posicion.value es null → Crear (POST)
     * 4. Recarga la lista de usuarios
     * 5. Cierra el modal
     * 6. Muestra mensaje de éxito/error
     *
     * @returns {Promise<void>}
     *
     * Validaciones en el backend (status 422):
     * - Email único y válido
     * - Contraseña (mínimo 8 caracteres en creación)
     * - Al menos un rol asignado
     * - Todos los campos requeridos
     */
    const handleSaveUser = async () => {
        try {
            isLoading.value = true; // Deshabilitar botón de guardar

            // Mostrar loading con texto según el modo
            showLoading(formData.value.id ? 'Actualizando usuario...' : 'Guardando usuario...');

            if (posicion.value != null) {
                // ========== MODO EDICIÓN ==========

                // Excluir password del payload de actualización
                // (la contraseña se cambia por endpoint separado)
                const { password, password_confirmation, ...updateData } = formData.value;

                // Llamar API de actualización
                await updateUser(posicion.value, updateData);

                closeLoading(); // Cerrar loading antes del alert

                // Mostrar éxito
                await showSuccess(
                    '¡Usuario actualizado!',
                    'Los datos del usuario han sido actualizados correctamente.'
                );
            } else {
                // ========== MODO CREACIÓN ==========

                // Llamar API de creación (incluye password)
                const { data } = await createUser(formData.value);

                // Guardar temporalmente para WhatsApp (con contraseña)
                lastCreatedUser.value = { ...formData.value, id: data.data.id };

                closeLoading(); // Cerrar loading antes del alert

                // Mostrar éxito
                await showSuccess(
                    '¡Usuario creado!',
                    'El nuevo usuario ha sido creado correctamente.'
                );
            }

            // Recargar lista en la página actual (mantiene filtros)
            await listUsers(pagination.value.current_page);

            // Cerrar modal (esto también resetea el formulario)
            closeUserModal();
        } catch (error) {
            closeLoading(); // Cerrar loading en caso de error

            if (error.response?.status === 422) {
                // ========== ERRORES DE VALIDACIÓN ==========
                // El backend devuelve un objeto con los campos inválidos
                // Ejemplo: { email: ['El email ya existe'], password: [...] }
                await showValidationErrors(error.response.data.errors);
            } else {
                // ========== OTROS ERRORES (500, red, etc.) ==========
                await showError('Error', 'Ha ocurrido un error al guardar el usuario.');
            }
        } finally {
            // Siempre ejecutar al finalizar (éxito o error)
            isLoading.value = false; // Habilitar botón de guardar
        }
    };

    /**
     * Actualiza la contraseña de un usuario
     *
     * Validaciones en el backend:
     * - Contraseña mínimo 8 caracteres
     * - Confirmación debe coincidir
     *
     * @returns {Promise<void>}
     */
    const handleUpdatePassword = async () => {
        try {
            isLoading.value = true;
            showLoading('Actualizando contraseña...');

            // Llamar API de actualización de contraseña
            await updatePassword(passwordFormData.value.userId, passwordFormData.value);

            closeLoading();

            // Mostrar éxito
            await showSuccess(
                '¡Contraseña actualizada!',
                'La contraseña ha sido actualizada correctamente.'
            );

            // Cerrar modal
            closePasswordModal();
        } catch (error) {
            closeLoading();

            if (error.response?.status === 422) {
                // Errores de validación (ej. contraseñas no coinciden)
                await showValidationErrors(error.response.data.errors);
            } else {
                await showError('Error', 'Ha ocurrido un error al actualizar la contraseña.');
            }
        } finally {
            isLoading.value = false;
        }
    };

    // ==================== OPERACIONES DE ELIMINACIÓN ====================

    /**
     * Confirma y elimina un usuario del sistema
     *
     * Muestra diálogo de confirmación antes de proceder
     * Si el usuario confirma, elimina y recarga la lista
     *
     * @param {Object} user - Usuario a eliminar
     * @returns {Promise<void>}
     *
     * @example
     * await confirmDelete({ id: 5, email: 'user@example.com', ... })
     *
     * TODO: Implementar deleteUser service y lógica de eliminación
     */
    const confirmDelete = async user => {
        // Mostrar diálogo de confirmación (devuelve Promise<Object>)
        const result = await showConfirm(
            '¿Eliminar usuario?',
            'Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este usuario?'
        );

        // SweetAlert2 devuelve { isConfirmed: true/false }
        if (result.isConfirmed) {
            try {
                // ========== TODO: IMPLEMENTAR ==========
                // import { deleteUser } from '@/services/UserService';
                // await deleteUser(user.id);

                // Mostrar éxito
                // await showSuccess('Usuario eliminado', 'El usuario ha sido eliminado correctamente.');

                // Recargar lista
                // await listUsers(pagination.value.current_page);

                console.warn('Delete user no implementado aún para:', user.id);
            } catch (error) {
                console.error('Error eliminando usuario:', error);
                await showError('Error', 'No se pudo eliminar el usuario.');
            }
        }
    };

    // ==================== NAVEGACIÓN DE PAGINACIÓN ====================

    /**
     * Cambia a una página específica de la lista de usuarios
     *
     * Valida que la página esté en el rango permitido
     * antes de ejecutar la petición
     *
     * @param {Number} page - Número de página a cargar
     * @returns {Promise<void>}
     *
     * @example
     * await changePage(2) // Va a la página 2
     * await changePage(pagination.value.current_page + 1) // Siguiente página
     */
    const changePage = async page => {
        // Validar que la página esté en el rango [1, total_pages]
        if (page >= 1 && page <= pagination.value.total_pages) {
            await listUsers(page);
        } else {
            console.warn(`Página ${page} fuera de rango [1, ${pagination.value.total_pages}]`);
        }
    };

    // ==================== RETORNO DEL COMPOSABLE ====================

    /**
     * Exporta todo el estado reactivo y funciones
     * para ser usado en los componentes
     *
     * Estado: users, roles, pagination, formData, etc.
     * Acciones: listUsers, openUserModal, handleSaveUser, etc.
     * Indicadores: isLoading, isUserModalOpen, etc.
     */
    return {
        // Estado de datos
        users,
        roles,
        pagination,
        formData,
        passwordFormData,
        completeUserData,

        // Estado de UI
        isUserModalOpen,
        isPasswordModalOpen,
        isCompleteInfoModalOpen,
        isLoading,
        posicion,

        // Datos auxiliares
        lastCreatedUser,

        // Métodos CRUD
        listUsers,
        listRoles,

        // Gestión de modales
        openUserModal,
        closeUserModal,
        openPasswordModal,
        closePasswordModal,
        openCompleteInfoModal,
        closeCompleteInfoModal,

        // Operaciones
        handleSaveUser,
        handleUpdatePassword,
        confirmDelete,
        changePage,
    };
}
