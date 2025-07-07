
'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, UserPlus, Gift, Users } from 'lucide-react';
import { useAppInfo } from '@/context/app-info-context';
import { useWalletSettings } from '@/context/wallet-settings-context';

const ReferralsPage = () => {
    const { toast } = useToast();
    const { appInfo } = useAppInfo();
    const { walletSettings } = useWalletSettings();
    const referralCode = "BATTLE123XYZ";

    const referredUsers = [
        { name: 'GamerPro123', date: '2023-10-26', status: 'Bonus Recieved' },
        { name: 'SniperQueen', date: '2023-10-25', status: 'Joined' },
        { name: 'ChickenDinner', date: '2023-10-22', status: 'Bonus Recieved' },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            toast({
                title: "Copied!",
                description: "Referral code copied to clipboard.",
            });
        });
    };
    
    const handleShare = async () => {
        const shareData = {
            title: 'Join BATTLE CLUB!',
            text: `Join me on BATTLE CLUB and get a bonus! Download the app from ${appInfo.appLink} and use my referral code: ${referralCode}`,
            url: appInfo.appLink,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.text);
                toast({
                    title: "Referral Info Copied!",
                    description: "Your referral info has been copied to your clipboard.",
                });
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Error sharing:', error);
                toast({
                    variant: "destructive",
                    title: "Oops!",
                    description: "Could not share the referral link.",
                });
            }
        }
    };

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Card className="bg-card border-primary/50 shadow-lg shadow-primary/20 text-center">
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-primary/20 rounded-full">
                                <Users className="h-12 w-12 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-headline text-primary">Refer &amp; Earn</CardTitle>
                        <CardDescription className="text-muted-foreground text-base">
                            Invite friends and earn <span className="text-accent font-bold">₹{walletSettings.referralBonus}</span> for every successful referral!
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Your Referral Code</p>
                            <div className="flex items-center justify-center gap-2">
                                <div className="border-2 border-dashed border-primary/50 rounded-lg px-6 py-3 font-mono text-xl tracking-widest text-primary-foreground bg-secondary">
                                    {referralCode}
                                </div>
                                <Button variant="ghost" size="icon" onClick={handleCopy}>
                                    <Copy className="h-5 w-5 text-primary" />
                                    <span className="sr-only">Copy code</span>
                                </Button>
                            </div>
                        </div>
                        <Button size="lg" className="w-full max-w-sm mx-auto text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleShare}>
                            <Share2 className="mr-2 h-5 w-5" />
                            Share with Friends
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 bg-secondary p-3 rounded-full">
                                <Share2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-foreground">1. Share Your Code</h4>
                                <p className="text-muted-foreground text-sm">Share your unique referral code with your friends.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 bg-secondary p-3 rounded-full">
                                <UserPlus className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-foreground">2. Friend Signs Up</h4>
                                <p className="text-muted-foreground text-sm">Your friend uses your code during sign-up.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 bg-secondary p-3 rounded-full">
                                <Gift className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary-foreground">3. Earn Rewards</h4>
                                <p className="text-muted-foreground text-sm">You both receive a bonus in your wallet!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">My Referrals</CardTitle>
                        <CardDescription>
                            You have referred <span className="text-accent font-bold">{referredUsers.length} friends</span> and earned <span className="text-accent font-bold">₹{referredUsers.filter(u => u.status === 'Bonus Recieved').length * walletSettings.referralBonus}</span>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {referredUsers.length > 0 ? (
                                referredUsers.map((user, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div>
                                            <p className="font-semibold text-primary-foreground">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">Joined on {user.date}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.status === 'Bonus Recieved' ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-500'}`}>
                                            {user.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>You haven't referred anyone yet.</p>
                                    <p>Start sharing to earn rewards!</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReferralsPage;
