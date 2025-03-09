// components/GenericTable.tsx
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
    RowSelectionState,
    Table as TableType,
    Row,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Papa from 'papaparse';

interface GenericTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    globalFilterPlaceholder?: string;
}

// Función para aplanar objetos y arrays
const flattenObject = <T,>(obj: T): string => {
    if (typeof obj !== 'object' || obj === null) {
        return String(obj); // Si no es un objeto, devolver el valor directamente como string
    }

    if (Array.isArray(obj)) {
        // Si es un array, extraer solo el campo `name` de cada objeto
        return obj
            .map((item) => {
                if (typeof item === 'object' && item !== null && 'name' in item) {
                    return String(item.name); // Extraer solo el campo `name`
                }
                return String(item); // Si no tiene `name`, devolver el valor directamente
            })
            .join(', '); // Separar los nombres con ", "
    }

    // Si es un objeto, convertir cada propiedad en una cadena
    return Object.keys(obj)
        .map((key) => `${key}: ${flattenObject(obj[key as keyof T])}`)
        .join('; ');
};

export default function GenericTable<TData>({
    data,
    columns,
    globalFilterPlaceholder = 'Buscar...',
}: GenericTableProps<TData>) {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const table = useReactTable<TData>({
        data,
        columns: [
            // Columna de selección
            {
                id: 'select',
                header: ({ table }: { table: TableType<TData> }) => {
                    // Obtener todas las filas filtradas
                    const filteredRows = table.getFilteredRowModel().rows;

                    // Verificar si todas las filas filtradas están seleccionadas
                    const isAllFilteredRowsSelected = filteredRows.every((row) => row.getIsSelected());

                    return (
                        <Checkbox
                            checked={isAllFilteredRowsSelected}
                            onCheckedChange={(value: boolean) => {
                                // Seleccionar/deseleccionar todas las filas filtradas
                                filteredRows.forEach((row) => row.toggleSelected(!!value));
                            }}
                            aria-label="Seleccionar todos"
                        />
                    );
                },
                cell: ({ row }: { row: Row<TData> }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
                        aria-label="Seleccionar fila"
                    />
                ),
            },
            ...columns, // Resto de las columnas
        ],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter,
            sorting,
            pagination,
            rowSelection,
        },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true, // Habilitar selección de filas
        globalFilterFn: (row: Row<TData>, columnId: string, filterValue: string): boolean => {
            const searchValue = filterValue.toLowerCase();

            // Obtener las columnas visibles
            const visibleColumns = table.getAllColumns().filter((column) => column.getIsVisible());

            // Función para buscar en un valor específico
            const searchInValue = (value: unknown): boolean => {
                if (value === null || value === undefined) return false;

                // Si es un string, número o booleano, buscamos directamente
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(searchValue);
                }

                if (typeof value === 'number' || typeof value === 'boolean') {
                    return value.toString().toLowerCase().includes(searchValue);
                }

                // Si es un array, buscamos en cada elemento
                if (Array.isArray(value)) {
                    return value.some((item: unknown) => {
                        // Si el elemento es un objeto con un campo `name`, buscamos en ese campo
                        if (typeof item === 'object' && item !== null && 'name' in item) {
                            return searchInValue(item.name);
                        }
                        // Si no, buscamos en el elemento directamente
                        return searchInValue(item);
                    });
                }

                // Si es un objeto, buscamos en sus valores
                if (typeof value === 'object') {
                    // Si el objeto tiene un campo `name`, buscamos en ese campo
                    if ('name' in value) {
                        return searchInValue(value.name);
                    }
                    // Si no, buscamos en todos los valores del objeto
                    return Object.values(value).some((val: unknown) => searchInValue(val));
                }

                return false;
            };

            // Buscar en los valores de las columnas visibles
            return visibleColumns.some((column) => {
                const cellValue = row.getValue(column.id);
                return searchInValue(cellValue);
            });
        },
    });

    // Función para exportar registros seleccionados a CSV
    const exportSelectedToCSV = (): void => {
        const selectedRows = table.getFilteredSelectedRowModel().rows; // Usar getFilteredSelectedRowModel
        if (selectedRows.length === 0) {
            alert('Por favor, selecciona al menos un registro para exportar.');
            return;
        }

        // Aplanar los datos seleccionados
        const selectedData = selectedRows.map((row: Row<TData>) => {
            const flattenedRow: Record<string, string> = {};
            for (const key in row.original) {
                if (Object.prototype.hasOwnProperty.call(row.original, key)) {
                    flattenedRow[key] = flattenObject(row.original[key as keyof TData]);
                }
            }
            return flattenedRow;
        });

        // Convertir a CSV
        const csv = Papa.unparse(selectedData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'datos_seleccionados.csv';
        link.click();
    };

    return (
        <div className="space-y-6">
            {/* Barra de búsqueda y botones de acción */}
            <div className="flex items-center justify-between">
                <Input
                    placeholder={globalFilterPlaceholder}
                    value={globalFilter}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
                    className="max-w-sm bg-white dark:bg-neutral-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                />
                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            // Seleccionar todas las filas filtradas
                            table.getFilteredRowModel().rows.forEach((row) => row.toggleSelected(true));
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Seleccionar todos filtrados
                    </Button>
                    <Button
                        onClick={exportSelectedToCSV}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        Exportar seleccionados a CSV
                    </Button>
                </div>
            </div>

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
                            table.getRowModel().rows.map((row: Row<TData>) => (
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
                                    colSpan={columns.length + 1} // +1 por la columna de selección
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
    );
}