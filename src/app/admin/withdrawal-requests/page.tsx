
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';
import WithdrawalManagementClient from './withdrawal-management-client';

export default function WithdrawalRequestsPage() {
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
                            <ArrowUpCircle className="text-red-500"/>
                            Withdrawal Requests
                        </CardTitle>
                        <CardDescription>
                            Approve or reject user withdrawal requests.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <WithdrawalManagementClient />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
