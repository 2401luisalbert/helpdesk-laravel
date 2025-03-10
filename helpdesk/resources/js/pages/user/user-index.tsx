import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type IBreadcrumbItem, type IUser, type IRole } from '@/types';
import GenericTable from '@/components/generic-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { Alert } from '@/components/ui/alert-confirm';

const breadcrumbs: IBreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/user',
    },
];

export default function UserIndex({ users }: { users: IUser[] }) {
    const { delete: destroy } = useForm();

    const handleEdit = (user: IUser) => {
        console.log('Editar usuario:', user);
    };

    const handleDelete = (id: number) => {
        // Usar el componente Alert para confirmar la eliminación
        Alert({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            onConfirm: () => {
                destroy(route('users.destroy', { id }));
            },
        });
    };

    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: 'num_employee',
            header: 'Número de Empleado',
            cell: ({ row }) => row.original.num_employee || 'N/A',
        },
        {
            accessorFn: (row) => `${row.name} ${row.last_name} ${row.last_name2}`,
            header: 'Nombre Completo',
        },
        {
            accessorKey: 'email',
            header: 'Correo Electrónico',
        },
        {
            accessorKey: 'roles',
            header: 'Roles',
            cell: ({ row }) => {
                const roles = row.original.roles;
                if (!roles || roles.length === 0) {
                    return <span className="text-gray-400 dark:text-gray-500">Sin roles asignados</span>;
                }
                return (
                    <div className="flex flex-wrap gap-1">
                        {roles.map((role: IRole) => (
                            <span
                                key={`${row.id}-${role.id}`}
                                className="capitalize text-gray-700 dark:text-gray-300"
                            >
                                {role.name}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(row.original.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="p-6 m-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
                <GenericTable
                    data={users}
                    columns={columns}
                    globalFilterPlaceholder="Buscar usuarios..."
                />
            </div>
        </AppLayout>
    );
}