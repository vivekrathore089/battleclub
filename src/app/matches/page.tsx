import Header from '@/components/layout/header';
import MatchUpdates from '@/components/dashboard/match-updates';
import { Swords } from 'lucide-react';

export default function MatchesPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-4">
        <h1 className="text-3xl font-headline text-primary flex items-center gap-3">
          <Swords className="h-8 w-8" />
          All Matches
        </h1>
        <MatchUpdates />
      </div>
    </div>
  );
}
