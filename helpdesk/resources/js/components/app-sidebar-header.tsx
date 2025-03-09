import { Breadcrumbs } from '@/components/breadcrumbs'; 
import { type IBreadcrumbItem } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: IBreadcrumbItem[] }) {
    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
