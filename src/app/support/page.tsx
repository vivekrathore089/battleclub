import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Link href="/profile" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Profile
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl">Customer Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This page is under construction. Contact information and support options will be available here soon.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
