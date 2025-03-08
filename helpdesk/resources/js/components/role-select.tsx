import { RoleSelectProps } from '@/types';

export default function RoleSelect({
    roles,
    value,
    onChange,
    placeholder,
    label,
    disabled,
    error,
}: RoleSelectProps) {
    return (
        <div className="flex flex-col">
            {label && <label className="font-bold">{label}</label>}
            <select
                value={value || ''} // Si value es null, usa una cadena vacía
                onChange={(e) => onChange(Number(e.target.value))} // Convierte el valor a número
                 className="border border-neutral-300 dark:border-neutral-700 rounded-md p-2 w-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200"
                disabled={disabled}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
