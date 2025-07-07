'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Swords, Trophy, Percent, Target } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';


// Mock Data
const userStats = {
    totalMatches: 128,
    totalWins: 76,
    winRate: 59.3,
    totalKills: 543,
    kdRatio: 1.8,
};

const performanceByGame = [
    { game: 'BGMI', matches: 50, wins: 30 },
    { game: 'Free Fire', matches: 30, wins: 15 },
    { game: 'COD M', matches: 25, wins: 20 },
    { game: 'Valorant', matches: 23, wins: 11 },
    { game: 'Apex', matches: 10, wins: 2 },
];

const chartConfig: ChartConfig = {
    wins: {
        label: "Wins",
        color: "hsl(var(--chart-1))",
    },
    matches: {
        label: "Matches",
        color: "hsl(var(--chart-2))",
    },
};

const recentMatches = [
    { id: '1', game: 'BGMI', result: 'Win', rank: '#1', kills: 10, date: '2024-08-15' },
    { id: '2', game: 'COD M', result: 'Loss', rank: '#5', kills: 15, date: '2024-08-14' },
    { id: '3', game: 'Free Fire', result: 'Win', rank: '#1', kills: 8, date: '2024-08-14' },
    { id: '4', game: 'Valorant', result: 'Win', rank: '#3', kills: 12, date: '2024-08-13' },
    { id: '5', game: 'BGMI', result: 'Loss', rank: '#12', kills: 2, date: '2024-08-12' },
];

export default function StatisticsPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-4">
                <Link href="/profile" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Profile
                </Link>
                
                <div className="space-y-6">
                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary text-3xl">My Statistics</CardTitle>
                            <CardDescription>Your gaming performance at a glance.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="bg-secondary/50 p-4">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Total Matches</h3>
                                    <Swords className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-2xl font-bold">{userStats.totalMatches}</div>
                            </Card>
                             <Card className="bg-secondary/50 p-4">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Total Wins</h3>
                                    <Trophy className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-2xl font-bold">{userStats.totalWins}</div>
                            </Card>
                             <Card className="bg-secondary/50 p-4">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Win Rate</h3>
                                    <Percent className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-2xl font-bold">{userStats.winRate}%</div>
                            </Card>
                             <Card className="bg-secondary/50 p-4">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">K/D Ratio</h3>
                                    <Target className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="text-2xl font-bold">{userStats.kdRatio}</div>
                            </Card>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary">Performance by Game</CardTitle>
                             <CardDescription>Matches played vs. wins for your top games.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                                <BarChart accessibilityLayer data={performanceByGame} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="game"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                                    <YAxis />
                                    <Tooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dot" />}
                                    />
                                    <Legend />
                                    <Bar dataKey="matches" fill="var(--color-matches)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="wins" fill="var(--color-wins)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary">Recent Match History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Game</TableHead>
                                        <TableHead>Result</TableHead>
                                        <TableHead className="text-center">Kills</TableHead>
                                        <TableHead className="text-right">Rank</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentMatches.map((match) => (
                                        <TableRow key={match.id}>
                                            <TableCell className="font-medium">{match.game}</TableCell>
                                            <TableCell>
                                                <Badge variant={match.result === 'Win' ? 'default' : 'destructive'}>{match.result}</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">{match.kills}</TableCell>
                                            <TableCell className="text-right font-semibold">{match.rank}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
