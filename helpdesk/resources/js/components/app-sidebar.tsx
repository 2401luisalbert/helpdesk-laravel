import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type INavItem, type ISharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, UserPlus, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<ISharedData>().props;
    
    // Simple role checking
    const isAdmin = auth.user?.roles?.includes('admin') || false;
    const mainNavItems: INavItem[] = [
        {
            title: 'Panel de control',
            url: route('dashboard'),
            icon: LayoutGrid,
        },
        ...(isAdmin ? [
            {
                title: 'Registrar Colaborador',
                url: route('register'),
                icon: UserPlus,
            },
            {
                title: 'Usuarios',
                url: route('users.index'),
                icon: Users2,
            },
        ] : []),
    ];

    const footerNavItems: INavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}