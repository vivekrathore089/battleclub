
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, UserCog } from 'lucide-react';
import Link from 'next/link';
import { ALL_PERMISSIONS } from '@/lib/staff-data';
import StaffManagementClient from './staff-management-client';

export default function StaffManagementPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-6xl pb-24 md:pb-8">
                <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Admin Panel
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl flex items-center gap-3">
                            <UserCog />
                            Staff Management
                        </CardTitle>
                        <CardDescription>
                            Create accounts for your staff and assign them specific permissions to manage the app.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <StaffManagementClient 
                            allPermissions={ALL_PERMISSIONS} 
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
