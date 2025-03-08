import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import FlashMessage from '@/components/flash-message';
import Loading from '@/components/ui/loading';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <Loading />
            <FlashMessage />
            {children}
        </AuthLayoutTemplate>
    );
}
