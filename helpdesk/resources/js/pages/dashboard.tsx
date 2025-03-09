
import AppLayout from '@/layouts/app-layout';
import { type IBreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: IBreadcrumbItem[] = [
    {
        title: 'Panel de control',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Panel de control" />
        </AppLayout>
    );
}