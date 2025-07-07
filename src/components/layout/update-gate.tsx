'use client';

import { useAppInfo } from '@/context/app-info-context';
import { usePathname } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function UpdateGate({ children }: { children: React.ReactNode }) {
    const { appInfo } = useAppInfo();
    const pathname = usePathname();

    const isGated = appInfo.forceUpdate;
    const isExcludedPage = pathname === '/login' || pathname === '/signup' || pathname.startsWith('/admin');

    if (isGated && !isExcludedPage) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md bg-card border-primary/50 text-center shadow-lg shadow-primary/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl">Update Required</CardTitle>
                        <CardDescription>
                            A new version of BATTLE CLUB is available. Please update the app to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href={appInfo.latestAppLink || '#'} target="_blank" rel="noopener noreferrer">
                             <Button size="lg" className="w-full font-bold text-lg h-14 bg-primary hover:bg-primary/90">
                                <Download className="mr-2 h-5 w-5" />
                                Update Now
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}
