import { usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';

export default function FlashMessage() {
    const { props } = usePage();
    const flash = props.flash as Record<string, string | undefined>;
    const errors = props.errors as Record<string, string>;

    useEffect(() => {
        // Manejar mensajes flash
        if (flash && typeof flash === 'object') {
            Object.entries(flash).forEach(([type, message]) => {
                if (message) {
                    switch (type) {
                        case 'success':
                            toast.success(message);
                            break;
                        case 'error':
                            toast.error(message);
                            break;
                        case 'info':
                            toast.info(message);
                            break;
                        case 'warning':
                            toast.warning(message);
                            break;
                        default:
                            toast(message);
                    }
                }
            });
        }

        // Manejar errores de Laravel
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach((error) => {
                if (error) {
                    toast.error(error);
                }
            });
        }
    }, [flash, errors]);

    return (
        <Toaster
            position="top-center"
            expand={true}
            richColors
            theme="system"
            closeButton
            toastOptions={{
                className: 'shadow-lg',
                style: {
                    padding: '16px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    width: '600px',
                },
            }}
        />
    );
}