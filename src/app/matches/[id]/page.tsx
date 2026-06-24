

'use client';

import { notFound, useParams } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, ChevronLeft, Clock, Info, Shield, Trophy, Users, Ticket, Award, Swords, Ban, Crosshair, FileText } from 'lucide-react';
import Link from 'next/link';
import RoomDetailsCard from '@/components/match/room-details-card';
import { format } from 'date-fns';
import JoinMatchDialog from '@/components/dashboard/join-match-dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import type { Match } from '@/lib/match-data';

function getMatch(matches: Match[], id: string): Match | undefined {
    return matches.find(m => m.id === id);
}

export default function MatchDetailsPage() {
    const params = useParams();
    const { user, matches } = useAuth();
    const match = getMatch(matches, params.id as string);

    if (!match) {
        notFound();
    }

    const progress = (match.joinedTeams / match.totalTeams) * 100;
    const isJoined = user ? match.participants.some(p => p.registrarUserId === user.id) : false;

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-4">
                <Link href="/matches" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Matches
                </Link>

                <Card className="bg-card border-secondary overflow-hidden">
                    <div className="relative h-48 bg-secondary">
                        <Image src={match.image} alt={match.game} layout="fill" objectFit="cover" data-ai-hint={match.imageHint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <h1 className="text-3xl font-headline text-primary-foreground">{match.title}</h1>
                            <p className="text-muted-foreground">{match.game}</p>
                        </div>
                         <Badge variant={match.status === 'Ongoing' ? 'destructive' : 'secondary'} className="absolute top-4 right-4 text-base data-[state=ongoing]:animate-pulse">
                            {match.status}
                        </Badge>
                    </div>
                     <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-6">
                            <div className="flex flex-col items-center gap-2">
                                <Trophy className="w-8 h-8 text-amber-400" />
                                <span className="font-bold text-lg text-primary-foreground">₹{match.prize}</span>
                                <span className="text-xs text-muted-foreground">Prize Pool</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Crosshair className="w-8 h-8 text-red-500" />
                                <span className="font-bold text-lg text-primary-foreground">₹{match.perKillPrize}</span>
                                <span className="text-xs text-muted-foreground">Per Kill</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Ticket className="w-8 h-8 text-accent" />
                                <span className="font-bold text-lg text-primary-foreground">₹{match.entryFee}</span>
                                <span className="text-xs text-muted-foreground">Entry Fee</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Calendar className="w-8 h-8 text-primary" />
                                <span className="font-bold text-lg text-primary-foreground">{format(new Date(match.date), "dd MMM yyyy")}</span>
                                <span className="text-xs text-muted-foreground">Date</span>
                            </div>
                             <div className="flex flex-col items-center gap-2">
                                <Clock className="w-8 h-8 text-primary" />
                                <span className="font-bold text-lg text-primary-foreground">{match.time}</span>
                                <span className="text-xs text-muted-foreground">Time</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Progress value={progress} className="h-2 [&>*]:bg-primary" />
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4"/>
                                    <span>{match.teamSize}</span>
                                </div>
                                <span>{match.joinedTeams} / {match.totalTeams} spots filled</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {isJoined ? (
                    <RoomDetailsCard match={match} />
                ) : (
                    <>
                        {match.status === 'Upcoming' ? (
                            <Card className="bg-card border-secondary">
                                <CardHeader>
                                    <CardTitle className="font-headline text-primary">Ready to Play?</CardTitle>
                                    <CardDescription>Join the tournament to compete for the prize pool.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <JoinMatchDialog match={match}>
                                        <Button className="w-full font-bold bg-primary hover:bg-primary/90 text-lg h-12">
                                            Join Match
                                            <Swords className="ml-2 w-5 h-5" />
                                        </Button>
                                    </JoinMatchDialog>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-card border-secondary">
                                <CardHeader className="items-center text-center">
                                     <Ban className="w-12 h-12 text-muted-foreground"/>
                                     <CardTitle className="font-headline text-muted-foreground">Registrations Closed</CardTitle>
                                     <CardDescription>This match is already {match.status.toLowerCase()}.</CardDescription>
                                </CardHeader>
                            </Card>
                        )}
                    </>
                )}

                {match.description && (
                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary flex items-center gap-2"><FileText/> Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground whitespace-pre-wrap">{match.description}</p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary flex items-center gap-2"><Info/> Rules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                {match.rules.map((rule, index) => <li key={index}>{rule}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-card border-secondary">
                        <CardHeader>
                            <CardTitle className="font-headline text-primary flex items-center gap-2">
                                {match.status === 'Completed' ? <Trophy /> : <Users />}
                                {match.status === 'Completed' ? 'Results' : `Participants (${match.participants.length})`}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pr-0">
                           <div className="max-h-60 overflow-y-auto pr-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>{match.status === 'Completed' ? 'Rank' : 'Spot'}</TableHead>
                                            <TableHead>Game Username</TableHead>
                                            {match.status === 'Completed' && <TableHead className="text-right">Winnings</TableHead>}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {match.participants.length > 0 ? (
                                            match.participants.map((p, index) => (
                                                <TableRow key={index} className={p.rank === 1 ? 'bg-amber-500/10' : ''}>
                                                    <TableCell className="font-medium">{p.rank ? `#${p.rank}` : index + 1}</TableCell>
                                                    <TableCell>{p.gameUsername}</TableCell>
                                                    {match.status === 'Completed' && (
                                                        <TableCell className="text-right font-bold text-amber-400">
                                                            {(p.winnings && p.winnings > 0) ? `₹${p.winnings.toFixed(0)}` : '-'}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={match.status === 'Completed' ? 3 : 2} className="h-24 text-center text-muted-foreground">
                                                    No participants yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                           </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
