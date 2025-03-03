import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import FlashMessage from '@/components/flash-message';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
             <FlashMessage />
            {children}
        </AuthLayoutTemplate>
    );
}
