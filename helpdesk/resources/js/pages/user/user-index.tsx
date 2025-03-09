import { type IBreadcrumbItem, type IUser, type IRole } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Importa el componente Button
import { Pencil, Trash } from 'lucide-react'; // Importa iconos para los botones

const breadcrumbs: IBreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: '/user',
    },
];

export default function UserIndex({ users }: { users: IUser[] }) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    // Función para manejar la edición de un usuario
    const handleEdit = (user: IUser) => {
        console.log('Editar usuario:', user);
        // Aquí puedes redirigir a una página de edición o abrir un modal
    };

    // Función para manejar la eliminación de un usuario
    const handleDelete = (user: IUser) => {
        console.log('Eliminar usuario:', user);
        // Aquí puedes mostrar un modal de confirmación o hacer una solicitud para eliminar
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
            id: 'actions', // Identificador único para la columna de acciones
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="h-4 w-4" /> {/* Icono de editar */}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(row.original)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash className="h-4 w-4" /> {/* Icono de eliminar */}
                    </Button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            sorting,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        globalFilterFn: (row, columnId, filterValue) => {
            const searchValue = filterValue.toLowerCase();

            // Buscar en campos básicos
            const basicMatch = String(row.getValue(columnId))
                .toLowerCase()
                .includes(searchValue);

            if (basicMatch) return true;

            // Buscar en roles
            if (row.original.roles) {
                const rolesMatch = row.original.roles.some(
                    (role: IRole) => role.name.toLowerCase().includes(searchValue)
                );
                if (rolesMatch) return true;
            }

            return false;
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <div className="space-y-6 p-6 m-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
                {/* Barra de búsqueda */}
                <Input
                    placeholder="Buscar usuarios..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm bg-white dark:bg-neutral-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                />

                {/* Tabla */}
                <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Table className="min-w-full">
                        <TableHeader className="bg-gray-50 dark:bg-neutral-800">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="bg-white dark:bg-neutral-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} className="hover:bg-white dark:hover:bg-neutral-800">
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No se encontraron resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginación */}
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Siguiente
                        </button>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Página{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} de{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>
                    <select
                        value={pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800"
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <option key={size} value={size}>
                                Mostrar {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </AppLayout>
    );
}