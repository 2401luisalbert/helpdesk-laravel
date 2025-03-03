import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { props } = usePage();
    const flash = props.flash as Record<string, string | undefined>;

    const [messages, setMessages] = useState<Record<string, string | undefined>>({});
    const [visibleMessages, setVisibleMessages] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (flash && typeof flash === 'object') {
            setMessages((prev) => ({ ...prev, ...flash }));
            setVisibleMessages((prev) => {
                const newVisible = { ...prev };
                Object.keys(flash).forEach((key) => {
                    if (flash[key]) newVisible[key] = true;
                });
                return newVisible;
            });
        }
    }, [flash]);

    useEffect(() => {
        Object.keys(messages).forEach((key) => {
            if (messages[key] && visibleMessages[key]) {
                setTimeout(() => {
                    setVisibleMessages((prev) => ({ ...prev, [key]: false }));
                }, 5000);
            }
        });
    }, [messages, visibleMessages]);

    if (!Object.values(visibleMessages).some(Boolean)) return null;

    const messageStyles: Record<string, { bg: string; text: string; border: string }> = {
        success: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-500',
        },
        error: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            border: 'border-red-500',
        },
        info: {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            border: 'border-blue-500',
        },
        warning: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-500',
        },
    };

    return (
        <div className="fixed top-4 right-4 z-50 w-96 space-y-3">
            {Object.entries(messages).map(([type, message]) =>
                visibleMessages[type] && message ? (
                    <div
                        key={type}
                        className={`flex items-center justify-between rounded-lg border-l-4 p-4 shadow-lg transition-all duration-300 ${
                            messageStyles[type]?.bg || 'bg-gray-100'
                        } ${messageStyles[type]?.border || 'border-gray-500'}`}
                    >
                        <div className="flex items-center">
                            <span className={`ml-3 text-sm font-medium ${messageStyles[type]?.text || 'text-gray-700'}`}>{message}</span>
                        </div>
                        <button
                            onClick={() => setVisibleMessages((prev) => ({ ...prev, [type]: false }))}
                            className="text-gray-500 transition-colors hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>
                ) : null,
            )}
        </div>
    );
}
