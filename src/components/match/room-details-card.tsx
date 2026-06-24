
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Copy, Lock, ShieldCheck } from 'lucide-react';
import type { Match } from '@/lib/match-data';

type RoomDetailsCardProps = {
    match: Match;
};

export default function RoomDetailsCard({ match }: RoomDetailsCardProps) {
    const { toast } = useToast();

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: "Copied!",
                description: `${type} copied to clipboard.`,
            });
        });
    };

    const showDetails = match.status === 'Ongoing' || match.status === 'Completed';

    return (
        <Card className="bg-card border-secondary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                    <ShieldCheck /> Room Details
                </CardTitle>
                {!showDetails && (
                     <CardDescription>
                        Room ID & Password will be available 15 minutes before the match starts.
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                {showDetails && match.roomDetails ? (
                    <>
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div>
                                <p className="text-xs text-muted-foreground">ROOM ID</p>
                                <p className="font-mono text-lg font-bold text-primary-foreground">{match.roomDetails.id}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleCopy(match.roomDetails!.id, 'Room ID')}>
                                <Copy className="h-5 w-5 text-primary" />
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div>
                                <p className="text-xs text-muted-foreground">PASSWORD</p>
                                <p className="font-mono text-lg font-bold text-primary-foreground">{match.roomDetails.pass}</p>
                            </div>
                             <Button variant="ghost" size="icon" onClick={() => handleCopy(match.roomDetails!.pass, 'Password')}>
                                <Copy className="h-5 w-5 text-primary" />
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-6 bg-secondary rounded-lg">
                        <Lock className="h-10 w-10 mb-2" />
                        <p className="font-semibold">Coming Soon</p>
                        <p className="text-xs">Details are revealed before match time.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
