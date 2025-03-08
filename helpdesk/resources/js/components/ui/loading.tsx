import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { type Visit } from '@inertiajs/core';

export default function Loading() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function shouldShowLoading(visit: Visit) {
            const method = visit.method.toUpperCase();
            return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
        }

        const unsubscribeStart = router.on('start', ({ detail: { visit } }) => {
            if (shouldShowLoading(visit)) {
                setLoading(true);
            }
        });

        const unsubscribeFinish = router.on('finish', () => {
            setLoading(false);
        });

        return () => {
            unsubscribeStart();
            unsubscribeFinish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <style>{`
                .loader {
                    width: 150px;
                    aspect-ratio: 1;
                    display: grid;
                    border: 4px solid transparent;
                    border-radius: 50%;
                    border-right-color: #25b09b;
                    animation: spin 1s infinite linear;
                }
                .loader::before,
                .loader::after {    
                    content: "";
                    grid-area: 1/1;
                    margin: 2px;
                    border: inherit;
                    border-radius: 50%;
                    animation: spin 2s infinite;
                }
                .loader::after {
                    margin: 8px;
                    animation-duration: 5s;
                }
                @keyframes spin { 
                    100% { transform: rotate(1turn) }
                }
            `}</style>
            <div className="flex flex-col items-center space-y-4">
                <div className="loader"></div>
                <div className="text-white text-lg font-medium mt-4">Procesando...</div>
            </div>
        </div>
    );
}