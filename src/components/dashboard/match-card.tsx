
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Swords, Trophy, Users, Ticket, CheckCircle, Crosshair } from 'lucide-react';
import JoinMatchDialog from './join-match-dialog';
import type { Match } from '@/lib/match-data';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

type MatchCardProps = {
  match: Match;
};

export default function MatchCard({ match }: MatchCardProps) {
  const { user } = useAuth();
  const progress = (match.joinedTeams / match.totalTeams) * 100;
  const isOngoingOrCompleted = match.status === 'Ongoing' || match.status === 'Completed';

  // Check if the current user has joined this match
  const isJoined = user ? match.participants.some(p => p.registrarUserId === user.id) : false;

  return (
    <div className="relative group">
      <Card className="bg-card border-secondary overflow-hidden shadow-lg group-hover:border-primary transition-all duration-300">
        <div className="relative h-24 bg-secondary">
          <Image src={match.image} alt={match.game} layout="fill" objectFit="cover" data-ai-hint={match.imageHint}/>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 rounded-md text-xs font-bold">
            {match.time}
          </div>
        </div>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-headline text-lg truncate text-primary-foreground">{match.title}</h3>
          
          <div className="grid grid-cols-3 gap-2 text-left">
              <div className="flex items-center gap-1">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                      <p className="text-xs text-muted-foreground">Prize</p>
                      <p className="font-bold text-sm text-foreground">₹{match.prize}</p>
                  </div>
              </div>
              <div className="flex items-center gap-1">
                  <Crosshair className="w-5 h-5 text-red-500" />
                  <div>
                      <p className="text-xs text-muted-foreground">Per Kill</p>
                      <p className="font-bold text-sm text-foreground">₹{match.perKillPrize}</p>
                  </div>
              </div>
              <div className="flex items-center gap-1">
                  <Ticket className="w-5 h-5 text-accent" />
                  <div>
                      <p className="text-xs text-muted-foreground">Entry</p>
                      <p className="font-bold text-sm text-foreground">₹{match.entryFee}</p>
                  </div>
              </div>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2 [&>*]:bg-primary" />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3"/>
                <span>{match.teamSize}</span>
              </div>
              <span>{match.joinedTeams} / {match.totalTeams} spots filled</span>
            </div>
          </div>

          <div className="relative z-20">
            {isOngoingOrCompleted ? (
              <Button disabled className="w-full font-bold bg-secondary text-lg h-12">
                {match.status === 'Completed' ? 'View Results' : match.status}
              </Button>
            ) : isJoined ? (
              <Button disabled className="w-full font-bold bg-secondary text-lg h-12">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Joined
              </Button>
            ) : (
              <JoinMatchDialog match={match}>
                <Button className="w-full font-bold bg-primary hover:bg-primary/90 text-lg h-12">
                  Join
                  <Swords className="ml-2 w-5 h-5 transform group-hover:rotate-12 transition-transform" />
                </Button>
              </JoinMatchDialog>
            )}
          </div>
        </CardContent>
      </Card>
      <Link href={`/matches/${match.id}`} className="absolute inset-0 z-10 rounded-lg">
        <span className="sr-only">View details for {match.title}</span>
      </Link>
    </div>
  );
}
