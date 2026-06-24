
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "./match-card";
import { useAuth } from "@/context/auth-context";

export default function MyMatches() {
  const { user, matches } = useAuth();
  const myMatches = user ? matches.filter(m => m.participants.some(p => p.registrarUserId === user.id)) : [];

  const myUpcomingMatches = myMatches.filter(m => m.status === 'Upcoming');
  const myOngoingMatches = myMatches.filter(m => m.status === 'Ongoing');
  const myCompletedMatches = myMatches.filter(m => m.status === 'Completed');

  const noMatches = myMatches.length === 0;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-headline text-primary">My Matches</h2>
      </div>
      
      {noMatches ? (
        <div className="text-center py-8 text-muted-foreground bg-card rounded-lg">
          <p>You haven't joined any matches yet.</p>
          <p>Explore the matches page to join a tournament!</p>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="upcoming" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={myUpcomingMatches.length === 0}>Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={myOngoingMatches.length === 0}>Ongoing</TabsTrigger>
            <TabsTrigger value="completed" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={myCompletedMatches.length === 0}>Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4">
              <div className="space-y-4">
                  {myUpcomingMatches.length > 0 ? (
                    myUpcomingMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground"><p>No upcoming matches you've joined.</p></div>
                  )}
              </div>
          </TabsContent>
          <TabsContent value="ongoing" className="mt-4">
              <div className="space-y-4">
                  {myOngoingMatches.length > 0 ? (
                    myOngoingMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground"><p>No ongoing matches you've joined.</p></div>
                  )}
              </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
              <div className="space-y-4">
                  {myCompletedMatches.length > 0 ? (
                    myCompletedMatches.map((match) => <MatchCard key={match.id} match={match} />)
                  ) : (
                    <div className="text-center py-8 text-muted-foreground"><p>No completed matches you've joined.</p></div>
                  )}
              </div>
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
}
