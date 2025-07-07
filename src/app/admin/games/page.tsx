
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import GameManagementClient from './game-management-client';

export default function GameManagementPage() {
    
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-8">
                <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Admin Panel
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl flex items-center gap-3">
                            <Gamepad2 />
                            Game Management
                        </CardTitle>
                        <CardDescription>
                            Add or remove game categories available in the application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GameManagementClient />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
