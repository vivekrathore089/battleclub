export type Game = {
    name: string;
    image: string;
    hint: string;
    slug: string;
    visible: boolean;
};

export const initialGames: Game[] = [
    { name: 'Free Fire MAX', image: 'https://placehold.co/150x200.png', hint: 'battle royale', slug: 'free-fire-max', visible: true },
    { name: 'Clash Squad', image: 'https://placehold.co/150x200.png', hint: 'team battle', slug: 'clash-squad', visible: true },
    { name: 'Lone Wolf', image: 'https://placehold.co/150x200.png', hint: 'arena shooter', slug: 'lone-wolf', visible: true },
    { name: 'Free Matches', image: 'https://placehold.co/150x200.png', hint: 'free entry', slug: 'free-matches', visible: true },
    { name: 'Survival Matches', image: 'https://placehold.co/150x200.png', hint: 'last man standing', slug: 'survival-matches', visible: true },
    { name: 'CS 1vs1', image: 'https://placehold.co/150x200.png', hint: 'one versus one', slug: 'cs-1vs1', visible: true },
    { name: 'CS 2vs2', image: 'https://placehold.co/150x200.png', hint: 'two versus two', slug: 'cs-2vs2', visible: true },
    { name: '1rs Match', image: 'https://placehold.co/150x200.png', hint: 'low entry', slug: '1rs-match', visible: true },
    { name: 'Only Headshot', image: 'https://placehold.co/150x200.png', hint: 'headshot mode', slug: 'only-headshot', visible: true },
];
