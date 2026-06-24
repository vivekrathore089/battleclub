

'use client';

import AdminNotice from '@/components/dashboard/admin-notice';
import HomeBanner from '@/components/dashboard/home-banner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/header';
import Image from 'next/image';
import Link from 'next/link';
import MyMatches from '@/components/dashboard/my-matches';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const { games } = useAuth();
  const visibleGames = games.filter(game => game.visible);
  
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <div className="p-4 space-y-6 pb-24 md:pb-4">
        <AdminNotice />
        <HomeBanner />

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-headline text-primary">Popular Games</h2>
            <Button variant="link" className="text-accent pr-0">See All</Button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {visibleGames.map((game) => {
              return (
                <Link href={`/games/${game.slug}`} key={game.name}>
                  <Card className="bg-card border-none overflow-hidden text-center transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <CardContent className="p-0">
                      <Image src={game.image} alt={game.name} width={150} height={200} className="w-full h-auto rounded-lg" data-ai-hint={game.hint} />
                      <p className="mt-2 text-sm font-semibold truncate">{game.name}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        <MyMatches />
      </div>
    </div>
  );
}
