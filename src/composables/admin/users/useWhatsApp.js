import { useAlert } from '@/composables/useAlert';

export function useWhatsApp() {
    const { showError } = useAlert();

    const sendByWhatsApp = async (user, lastCreatedUser = null) => {
        try {
            const phoneNumber = user.general_data.celular.replace(/[^0-9]/g, '');
            let userPassword = '';

            if (lastCreatedUser && lastCreatedUser.id === user.id) {
                userPassword = lastCreatedUser.password;
            }

            let message = `Hola ${user.general_data.nombre}, te contactamos desde Logística.\n\n`;
            message += `Tus datos registrados:\n`;
            message += `Nombre completo: ${user.general_data.nombre} ${user.general_data.apellido}\n`;
            message += `Documento de identidad: ${user.general_data.documento_identidad}\n`;
            message += `Celular: ${user.general_data.celular}\n`;
            message += `Ciudad: ${user.general_data.ciudad}\n`;
            message += `Departamento: ${user.general_data.departamento}\n`;
            message += `Dirección: ${user.general_data.direccion}\n`;
            message += `\nTus credenciales de acceso:\n`;
            message += `Email: ${user.email}\n`;

            if (userPassword) {
                message += `Contraseña: ${userPassword}\n`;
            } else {
                message += `Contraseña: [La contraseña no se puede mostrar por seguridad]\n`;
            }

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        } catch (error) {
            console.error('Error al enviar mensaje por WhatsApp:', error);
            showError('Error', 'No se pudo enviar el mensaje por WhatsApp.');
        }
    };

    return {
        sendByWhatsApp,
    };
}
