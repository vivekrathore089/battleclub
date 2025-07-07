
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Users, Gamepad2, Swords, ArrowDownCircle, ArrowUpCircle, Wallet, Send, Image as ImageIcon, Megaphone, FileText, Info, UserCog, LockKeyhole } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { PermissionKey } from '@/lib/staff-data';

const managementFeatures = [
    { title: 'User Management', description: 'View users, update wallets, and manage accounts.', icon: <Users className="w-8 h-8 text-primary" />, href: '/admin/users', permission: 'userManagement' },
    { title: 'Game Management', description: 'Add or remove game categories from the app.', icon: <Gamepad2 className="w-8 h-8 text-primary" />, href: '/admin/games', permission: 'gameManagement' },
    { title: 'Match Management', description: 'Create, edit, and update match statuses and results.', icon: <Swords className="w-8 h-8 text-primary" />, href: '/admin/matches', permission: 'matchManagement' },
];

const financialFeatures = [
    { title: 'Deposit Requests', description: 'Approve or reject user deposit requests.', icon: <ArrowDownCircle className="w-8 h-8 text-green-500" />, href: '/admin/deposit-requests', permission: 'depositRequests' },
    { title: 'Withdrawal Requests', description: 'Process user withdrawal requests.', icon: <ArrowUpCircle className="w-8 h-8 text-red-500" />, href: '/admin/withdrawal-requests', permission: 'withdrawalRequests' },
    { title: 'Wallet Settings', description: 'Control limits, bonuses, QR code, and UPI ID.', icon: <Wallet className="w-8 h-8 text-primary" />, href: '/admin/wallet-settings', permission: 'walletSettings' },
];

const contentFeatures = [
    { title: 'Push Notifications', description: 'Send notifications directly to all users.', icon: <Send className="w-8 h-8 text-primary" />, href: '/admin/push-notifications', permission: 'pushNotifications' },
    { title: 'Update Banners', description: 'Manage home page banners and links.', icon: <ImageIcon className="w-8 h-8 text-primary" />, href: '/admin/banners', permission: 'updateBanners' },
    { title: 'Admin Notice', description: 'Change the notice displayed on the home page.', icon: <Megaphone className="w-8 h-8 text-primary" />, href: '/admin/notice', permission: 'adminNotice' },
    { title: 'Content Pages', description: 'Edit Terms, Privacy, About, and FAQ pages.', icon: <FileText className="w-8 h-8 text-primary" />, href: '/admin/content', permission: 'contentPages' },
];

const systemFeatures = [
    { title: 'App Information', description: 'Manage global app settings and maintenance mode.', icon: <Info className="w-8 h-8 text-primary" />, href: '/admin/app-information', permission: 'appInformation' },
    { title: 'Staff Management', description: 'Create staff accounts and manage permissions.', icon: <UserCog className="w-8 h-8 text-primary" />, href: '/admin/staff-management', permission: 'staffManagement' },
    { title: 'Change Password', description: 'Update the password for the control panel admin.', icon: <LockKeyhole className="w-8 h-8 text-primary" />, href: '/admin/security', permission: 'staffManagement' },
];

const FeatureCard = ({ feature }: { feature: { title: string, description: string, icon: JSX.Element, href: string } }) => {
    const isUnderConstruction = feature.href === '#';
    const cardContent = (
        <Card className={`bg-card border-secondary h-full ${isUnderConstruction ? '' : 'hover:border-primary transition-colors'}`}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                {feature.icon}
                <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-primary-foreground">{feature.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
                {isUnderConstruction && <p className="text-xs text-accent mt-2">Under Construction</p>}
            </CardContent>
        </Card>
    );

    return isUnderConstruction ? cardContent : <Link href={feature.href} prefetch={false} className="block h-full">{cardContent}</Link>;
};

export default function AdminPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // Or a loading spinner
    }

    const hasPermission = (permission: PermissionKey) => {
        if (user.isSuperAdmin) return true;
        return user.permissions.includes(permission);
    };

    const visibleFeatures = (features: (typeof managementFeatures[0])[]) => {
        return features.filter(feature => hasPermission(feature.permission as PermissionKey));
    }

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-8 container mx-auto max-w-6xl pb-24 md:pb-8">
                <Card className="bg-card border-secondary">
                    <CardHeader className="items-center text-center">
                        <Shield className="w-16 h-16 text-primary" />
                        <CardTitle className="font-headline text-primary text-4xl">Admin Control Panel</CardTitle>
                        <CardDescription className="text-lg">
                            Welcome, {user.name}! Manage your application from here.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className="space-y-6">
                    {visibleFeatures(managementFeatures).length > 0 && <div>
                        <h2 className="text-2xl font-headline text-primary mb-4">Core Management</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleFeatures(managementFeatures).map(feature => <FeatureCard key={feature.title} feature={feature} />)}
                        </div>
                    </div>}

                     {visibleFeatures(financialFeatures).length > 0 && <div>
                        <h2 className="text-2xl font-headline text-primary mb-4">Financial</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleFeatures(financialFeatures).map(feature => <FeatureCard key={feature.title} feature={feature} />)}
                        </div>
                    </div>}

                    {visibleFeatures(contentFeatures).length > 0 && <div>
                        <h2 className="text-2xl font-headline text-primary mb-4">Content &amp; Engagement</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {visibleFeatures(contentFeatures).map(feature => <FeatureCard key={feature.title} feature={feature} />)}
                        </div>
                    </div>}
                    
                    {user.isSuperAdmin && visibleFeatures(systemFeatures).length > 0 && <div>
                        <h2 className="text-2xl font-headline text-primary mb-4">System &amp; Settings</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {visibleFeatures(systemFeatures).map(feature => <FeatureCard key={feature.title} feature={feature} />)}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}
