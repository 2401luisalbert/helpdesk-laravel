import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type IBreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import Loading from '@/components/ui/loading';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: IBreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <>
    <Loading />
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppLayoutTemplate>
    </>
);