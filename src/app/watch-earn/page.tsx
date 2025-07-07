
'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Video, Coins, History, PlayCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

const WatchAndEarnPage = () => {
    const { toast } = useToast();
    const [isWatching, setIsWatching] = useState(false);
    const [coins, setCoins] = useState(150);

    const earningsHistory = [
        { id: 1, coins: 10, date: '2023-10-26, 02:30 PM' },
        { id: 2, coins: 10, date: '2023-10-26, 11:15 AM' },
        { id: 3, coins: 10, date: '2023-10-25, 08:00 PM' },
    ];

    const handleWatchAd = () => {
        setIsWatching(true);
        // Simulate watching an ad
        setTimeout(() => {
            const earnedCoins = 10;
            setCoins(prevCoins => prevCoins + earnedCoins);
            setIsWatching(false);
            // Add new entry to history
            earningsHistory.unshift({ id: Date.now(), coins: 10, date: new Date().toLocaleString() });

            toast({
                title: 'Congratulations!',
                description: `You've earned ${earnedCoins} coins.`,
            });
        }, 3000); // 3 second "ad"
    };

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Card className="bg-card border-secondary">
                    <CardHeader className="flex-row items-center justify-between space-y-0">
                        <CardTitle className="font-headline text-primary">My Coins</CardTitle>
                        <div className="flex items-center gap-2 text-2xl font-bold text-amber-400">
                            <Coins className="h-6 w-6" />
                            <span>{coins.toLocaleString()}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            100 coins = ₹1. Redeem your coins from your wallet.
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-center p-6 md:p-8">
                     <div className="flex justify-center mb-4">
                        <PlayCircle className="h-16 w-16 text-white" />
                    </div>
                    <h2 className="text-3xl font-headline">Watch Ads, Earn Coins!</h2>
                    <p className="mt-2 mb-6 text-lg text-primary-foreground/80">
                        Watch a short video ad and instantly get <span className="font-bold text-white">10 coins</span>.
                    </p>
                    <Button 
                        size="lg" 
                        className="w-full max-w-sm mx-auto text-lg font-bold bg-white text-primary hover:bg-white/90"
                        onClick={handleWatchAd}
                        disabled={isWatching}
                    >
                        {isWatching ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Video className="mr-2 h-5 w-5" />
                        )}
                        {isWatching ? 'Loading Ad...' : 'Watch Now'}
                    </Button>
                </Card>

                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center gap-2">
                           <History className="h-5 w-5" /> Earnings History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {earningsHistory.length > 0 ? (
                                earningsHistory.map((entry) => (
                                    <div key={entry.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div>
                                            <p className="font-semibold text-primary-foreground">Watched a video</p>
                                            <p className="text-xs text-muted-foreground">{entry.date}</p>
                                        </div>
                                        <span className="font-bold text-amber-400 flex items-center gap-1">
                                            +{entry.coins} <Coins className="h-4 w-4" />
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Your earnings history is empty.</p>
                                    <p>Watch an ad to start earning!</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WatchAndEarnPage;
