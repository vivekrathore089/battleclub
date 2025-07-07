
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, ArrowDownCircle } from 'lucide-react';
import Link from 'next/link';
import DepositManagementClient from './deposit-management-client';

export default function DepositRequestsPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-5xl pb-24 md:pb-8">
                <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Admin Panel
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl flex items-center gap-3">
                            <ArrowDownCircle className="text-green-500"/>
                            Deposit Requests
                        </CardTitle>
                        <CardDescription>
                            Approve or reject user deposit requests. Approved requests will credit the user's wallet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DepositManagementClient />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
