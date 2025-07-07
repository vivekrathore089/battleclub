
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award } from 'lucide-react';

const topPlayers = [
    { rank: 1, name: 'ShadowStriker', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 152 },
    { rank: 2, name: 'ViperX', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 148 },
    { rank: 3, name: 'PhoenixFury', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 145 },
    { rank: 4, name: 'ProGamer_47', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 128 },
    { rank: 5, name: 'SniperQueen', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 110 },
    { rank: 6, name: 'RogueAssassin', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 105 },
    { rank: 7, name: 'CyberNinja', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 98 },
    { rank: 8, name: 'Ghost_Ops', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 95 },
    { rank: 9, name: 'BlazeRunner', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 92 },
    { rank: 10, name: 'Omega', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', wins: 88 },
];

const RankIcon = ({ rank }: { rank: number }) => {
    if (rank === 1) return <Trophy className="h-8 w-8 text-amber-400" />;
    if (rank === 2) return <Medal className="h-8 w-8 text-slate-400" />;
    if (rank === 3) return <Award className="h-8 w-8 text-yellow-600" />;
    return <span className="text-xl font-bold w-8 text-center text-muted-foreground">{rank}</span>;
}

export default function TopPlayersPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Card className="bg-card border-secondary">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-2">
                             <Trophy className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-3xl font-headline text-primary">Top Players</CardTitle>
                        <CardDescription>
                            Check out the leaderboard and see who is dominating the game.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topPlayers.map((player) => (
                             <div key={player.rank} className="flex items-center p-3 bg-secondary rounded-lg gap-4 shadow-sm">
                                <div className="w-8 flex justify-center items-center">
                                    <RankIcon rank={player.rank} />
                                </div>
                                <Avatar className="h-12 w-12 border-2 border-primary/50">
                                    <AvatarImage src={player.avatar} alt={player.name} data-ai-hint={player.avatarHint} />
                                    <AvatarFallback>{player.name.slice(0,2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-bold text-lg text-primary-foreground">{player.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-amber-400">{player.wins}</p>
                                    <p className="text-xs text-muted-foreground">Wins</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
