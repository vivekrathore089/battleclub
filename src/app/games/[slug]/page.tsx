
import Header from '@/components/layout/header';
import MatchUpdates from '@/components/dashboard/match-updates';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

function deslugify(slug: string): string {
    const gameMap: { [key: string]: string } = {
        'free-fire-max': 'Free Fire MAX',
        'clash-squad': 'Clash Squad',
        'lone-wolf': 'Lone Wolf',
        'free-matches': 'Free Matches',
        'survival-matches': 'Survival Matches',
        'cs-1vs1': 'CS 1vs1',
        'cs-2vs2': 'CS 2vs2',
        '1rs-match': '1rs Match',
        'only-headshot': 'Only Headshot'
    };
    return gameMap[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function GamePage({ params }: { params: { slug:string } }) {
    const gameName = deslugify(params.slug);
    
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-4">
                <Link href="/home" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Home
                </Link>
                
                <h1 className="font-headline text-primary text-3xl">{gameName}</h1>

                <MatchUpdates gameFilter={gameName} />
            </div>
        </div>
    );
}
