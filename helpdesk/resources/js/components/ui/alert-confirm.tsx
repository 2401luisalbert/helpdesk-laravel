import Swal from 'sweetalert2';
import { IAlertProps } from '@/types';

/**
 * Muestra una alerta modal utilizando SweetAlert2 con estilos personalizados.
 * 
 * @param {IAlertProps} props - Propiedades de la alerta.
 */
export const Alert = ({
    title,
    text,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel,
}: IAlertProps): void => {
    Swal.fire({
        theme: 'dark',
        title,
        text,
        showCancelButton: Boolean(cancelButtonText),
        confirmButtonText,
        cancelButtonText,
        buttonsStyling: false, // Deshabilita los estilos por defecto de SweetAlert2
        backdrop: 'rgba(0, 0, 0, 0.6)', // Fondo semi-transparente más oscuro

        // Clases personalizadas para los estilos
        customClass: {
            container:'bg-neutral-900 dark:bg-gray-900 rounded-lg shadow-2xl p-8',
            popup: 'bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-8', // Fondo neutral y padding amplio
            title: 'text-gray-900 dark:text-gray-100 text-2xl font-bold mb-4', // Título más formal y legible
            htmlContainer: 'text-gray-700 dark:text-gray-300 text-base leading-relaxed', // Texto con espacio entre líneas
            confirmButton: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500', // Botón de confirmación con bordes suaves y efecto de enfoque
            cancelButton: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium py-3 px-8 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-4', // Botón de cancelar más formal
            actions: 'flex justify-end gap-4 mt-6', // Espaciado y alineación entre botones
        },

        // Animaciones de entrada y salida
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
        } else if (result.isDismissed && onCancel) {
            onCancel();
        }
    });
};