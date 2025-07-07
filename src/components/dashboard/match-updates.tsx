
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "./match-card";
import { useAuth } from "@/context/auth-context";

export default function MatchUpdates({ gameFilter }: { gameFilter?: string }) {
  const { matches } = useAuth();
  const filteredMatches = gameFilter ? matches.filter(m => m.game === gameFilter) : matches;
  
  const upcomingMatches = filteredMatches.filter(m => m.status === 'Upcoming');
  const ongoingMatches = filteredMatches.filter(m => m.status === 'Ongoing');
  const completedMatches = filteredMatches.filter(m => m.status === 'Completed');

  const noMatches = upcomingMatches.length === 0 && ongoingMatches.length === 0 && completedMatches.length === 0;

  return (
    <section>
      
      {noMatches && gameFilter ? (
        <div className="text-center py-8 text-muted-foreground bg-card rounded-lg">
          <p>No matches found for {gameFilter}.</p>
          <p>Check back later for new tournaments!</p>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="upcoming" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={upcomingMatches.length === 0}>Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={ongoingMatches.length === 0}>Ongoing</TabsTrigger>
            <TabsTrigger value="completed" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={completedMatches.length === 0}>Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                  {upcomingMatches.length > 0 ? (
                    upcomingMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground col-span-2"><p>No upcoming matches right now.</p></div>
                  )}
              </div>
          </TabsContent>
          <TabsContent value="ongoing" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                  {ongoingMatches.length > 0 ? (
                    ongoingMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground col-span-2"><p>No ongoing matches right now.</p></div>
                  )}
              </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
              <div className="grid md:grid-cols-2 gap-4">
                  {completedMatches.length > 0 ? (
                    completedMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground col-span-2"><p>No completed matches to show.</p></div>
                  )}
              </div>
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}
