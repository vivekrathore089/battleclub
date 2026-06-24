'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronRight, LogOut, User, BarChart2, MessageSquare, Swords, Trophy, Percent, FileText, ShieldCheck, Info, HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppInfo } from '@/context/app-info-context';
import { useMemo } from 'react';

type MenuItem = {
    label: string;
    icon: React.ElementType;
    href: string;
    isExternal?: boolean;
};

const ProfilePage = () => {
    const router = useRouter();
    const { appInfo } = useAppInfo();

    // Mock user data
    const user = {
        name: 'ProGamer_47',
        avatar: 'https://placehold.co/100x100.png',
        avatarHint: 'gamer avatar',
        email: 'pro.gamer@example.com',
    };
    
    const stats = {
        matchesPlayed: 128,
        wins: 76,
        winRate: 59.3,
    };

    const menuItems: MenuItem[] = useMemo(() => [
        { label: 'Edit Profile', icon: User, href: '/profile/edit' },
        { label: 'My Statistics', icon: BarChart2, href: '/profile/statistics' },
        { label: 'Customer Support', icon: MessageSquare, href: `https://wa.me/${appInfo.supportNumber}`, isExternal: true },
    ], [appInfo.supportNumber]);

    const moreItems: MenuItem[] = [
        { label: 'Terms & Conditions', icon: FileText, href: '/terms' },
        { label: 'Privacy Policy', icon: ShieldCheck, href: '/privacy' },
        { label: 'About Us', icon: Info, href: '/about' },
        { label: 'FAQ', icon: HelpCircle, href: '/faq' },
    ];

    const handleLogout = () => {
        router.push('/login');
    };

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <div className="flex flex-col items-center space-y-4 pt-4">
                    <Avatar className="h-28 w-28 border-4 border-primary shadow-lg shadow-primary/20">
                        <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint}/>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h1 className="text-2xl font-headline text-primary-foreground">{user.name}</h1>
                        <p className="text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Gaming Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                            <Swords className="h-8 w-8 text-primary" />
                            <p className="text-2xl font-bold">{stats.matchesPlayed}</p>
                            <p className="text-xs text-muted-foreground">Played</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                            <Trophy className="h-8 w-8 text-amber-400" />
                            <p className="text-2xl font-bold">{stats.wins}</p>
                            <p className="text-xs text-muted-foreground">Wins</p>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                            <Percent className="h-8 w-8 text-accent" />
                            <p className="text-2xl font-bold">{stats.winRate}%</p>
                            <p className="text-xs text-muted-foreground">Win Rate</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-secondary">
                    <CardContent className="p-2">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} legacyBehavior>
                                        <a 
                                            className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors"
                                            target={item.isExternal ? '_blank' : '_self'}
                                            rel={item.isExternal ? 'noopener noreferrer' : ''}
                                        >
                                            <item.icon className="h-5 w-5 mr-4 text-primary" />
                                            <span className="flex-grow text-primary-foreground font-medium">{item.label}</span>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </a>
                                    </Link>
                                </li>
                            ))}
                            <Separator className="my-1 bg-border"/>
                            {moreItems.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} legacyBehavior>
                                        <a className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                                            <item.icon className="h-5 w-5 mr-4 text-primary" />
                                            <span className="flex-grow text-primary-foreground font-medium">{item.label}</span>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </a>
                                    </Link>
                                </li>
                            ))}
                            <Separator className="my-1 bg-border"/>
                            <li>
                                <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-destructive/10 transition-colors w-full text-left">
                                    <LogOut className="h-5 w-5 mr-4 text-destructive" />
                                    <span className="flex-grow text-destructive font-medium">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
