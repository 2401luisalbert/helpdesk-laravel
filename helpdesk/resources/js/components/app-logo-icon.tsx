import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg 
            {...props} 
            fillRule="evenodd" 
            clipRule="evenodd" 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-white dark:stroke-black"
        >
            {/* Rectángulo principal */}
            <rect x="40" y="40" width="120" height="80" strokeWidth="8" fill="none" rx="5" />
            
            {/* Base de la computadora */}
            <rect x="70" y="130" width="60" height="10" strokeWidth="8" fill="none" />
            <rect x="50" y="140" width="100" height="10" strokeWidth="8" fill="none" />
            
            {/* Teclado */}
            <rect x="55" y="55" width="90" height="10" strokeWidth="4" fill="none" />
            <rect x="55" y="70" width="90" height="10" strokeWidth="4" fill="none" />
            <rect x="55" y="85" width="50" height="10" strokeWidth="4" fill="none" />
        </svg>
    );
}