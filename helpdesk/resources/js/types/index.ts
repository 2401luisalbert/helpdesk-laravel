import { LucideIcon } from 'lucide-react';
import 'inertia';
import { ColumnDef } from '@tanstack/react-table';

declare module '@inertiajs/react' {
    export interface IPageProps {
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
        auth: IAuth;
        [key: string]: unknown; // Propiedades adicionales dinámicas
    }
}
export interface IAuth {
    user: IUser;
}

export interface IBreadcrumbItem {
    title: string;
    href: string;
}

export interface INavGroup {
    title: string;
    items: INavItem[];
}

export interface INavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface ISharedData {
    name: string;
    quote: { message: string; author: string };
    auth: IAuth;
    [key: string]: unknown;
}

export interface IUser {
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
    roles: IRole[];
}

export interface IRole {
    id: number;
    name: string;
}

export interface IRoleSelectProps {
    roles: IRole[]; // Lista de roles disponibles
    value: number | null; // ID del rol seleccionado
    onChange: (roleId: number) => void; // Función para manejar el cambio
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    error?: string;
}

export type IRegisterForm = {
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
    interface IPageProps {
        session?: {
            success?: string; // Mensaje de éxito
        };
        errors?: {
            registration?: string; // Mensaje de error específico
            [key: string]: string | undefined; // Otros errores dinámicos
        };
    }
}

export interface IDataTableProps<TData> {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
}

export interface IAlertProps {
    title: string;
    text: string;
    confirmButtonText: string;
    cancelButtonText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

