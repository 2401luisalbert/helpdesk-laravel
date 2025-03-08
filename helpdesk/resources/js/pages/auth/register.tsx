import InputError from '@/components/input-error';
import RoleSelect from '@/components/role-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, RegisterForm, Role } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const initialData: RegisterForm = {
    num_employee: null, // Inicialmente vacío
    name: '',
    last_name: '',
    last_name2: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 1,
};

export default function Register({ roles }: { roles: Role[] }) {
    const { data, setData, post, processing, errors } = useForm<RegisterForm>({
        ...initialData,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Panel de control', href: '/dashboard' },
        { title: 'Register', href: '/register' },
    ];

    const resetForm = () => {
        setData(initialData);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Envía los datos al backend usando Inertia
        post(route('register'), {
            onSuccess: () => {
                resetForm();
            },
            onError: (errors) => {
                console.error('Errores durante el registro:', errors);
            },
        });
    };

    const validatePositiveNumber = (value: string, setValue: (value: number | null) => void) => {
        if (value === '') {
            setValue(null); 
        } else {
            const numericValue = Number(value);
            if (!isNaN(numericValue)) {  
                if (numericValue >= 0) {
                    setValue(numericValue);
                } else {
                    setValue(null); 
                }
            } else {
                setValue(null); 
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register" />
            <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
                <div className="w-full max-w-4xl rounded-xl border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
                    <h1 className="mb-6 text-center text-3xl font-bold">Crear una cuenta</h1>
                    <p className="text-muted-foreground mb-8 text-center">
                        Ingresa tus detalles a continuación para crear tu cuenta
                    </p>

                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Columna izquierda */}
                            <div className="space-y-6">
                                {/* Campo Número de empleado */}
                                <div>
                                    <Label htmlFor="num_employee">Número de empleado</Label>
                                    <Input
                                        id="num_employee"
                                        type="number"
                                        name="num_employee"
                                        value={data.num_employee ?? ''} // Muestra vacío si es null
                                        onChange={(e) =>
                                            validatePositiveNumber(e.target.value, (value: number | null) =>
                                                setData('num_employee', value)
                                            )
                                        }
                                        disabled={processing}
                                        required
                                    />
                                    {errors.num_employee && <InputError message={errors.num_employee} />}
                                </div>

                                {/* Campo Nombre */}
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.name && <InputError message={errors.name} />}
                                </div>

                                {/* Campo Apellido */}
                                <div>
                                    <Label htmlFor="last_name">Apellido</Label>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.last_name && <InputError message={errors.last_name} />}
                                </div>

                                {/* Campo Apellido 2 */}
                                <div>
                                    <Label htmlFor="last_name2">Apellido 2</Label>
                                    <Input
                                        id="last_name2"
                                        name="last_name2"
                                        value={data.last_name2}
                                        onChange={(e) => setData('last_name2', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.last_name2 && <InputError message={errors.last_name2} />}
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div className="space-y-6">
                                {/* Campo Correo electrónico */}
                                <div>
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                {/* Campo Contraseña */}
                                <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>

                                {/* Campo Confirmar contraseña */}
                                <div>
                                    <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        required
                                    />
                                    {errors.password_confirmation && (
                                        <InputError message={errors.password_confirmation} />
                                    )}
                                </div>

                                {/* Selector de rol */}
                                <RoleSelect
                                    roles={roles}
                                    value={data.role || null}
                                    onChange={(roleId) => setData('role', roleId)}
                                    disabled={processing}
                                    error={errors.role}
                                    placeholder="Seleccionar rol"
                                    label="Rol"
                                />
                            </div>
                        </div>

                        {/* Botón de envío */}
                        <Button type="submit" disabled={processing} className="w-100">
                            {processing ? (
                                <>
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                'Registrar'
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}