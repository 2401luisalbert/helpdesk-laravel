import { LucideIcon } from 'lucide-react';
import 'inertia';

declare module '@inertiajs/react' {
    export interface PageProps {
        flash: {
            success?: string;
            error?: string;
            info?: string;
            warning?: string;
        };
        session?: {
            success?: string; // Mensaje de éxito
        };
        errors?: {
            registration?: string; // Mensaje de error específico
            [key: string]: string | undefined; // Otros errores dinámicos
        };
        name: string;
        quote: { message: string; author: string };
        auth: Auth;
        [key: string]: unknown; // Propiedades adicionales dinámicas
    }
}
export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    last_name: string;
    last_name2: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
}

export interface RoleSelectProps {
    roles: Role[]; // Lista de roles disponibles
    value: number | null; // ID del rol seleccionado
    onChange: (roleId: number) => void; // Función para manejar el cambio
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    error?: string;
}

export type RegisterForm = {
    num_employee: number | null;
    name: string;
    last_name: string;
    last_name2: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: number;
};


declare module '@inertiajs/core' {
    interface PageProps {
        session?: {
            success?: string; // Mensaje de éxito
        };
        errors?: {
            registration?: string; // Mensaje de error específico
            [key: string]: string | undefined; // Otros errores dinámicos
        };
    }
}
