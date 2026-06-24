export type Banner = {
    id: string;
    src: string;
    alt: string;
    hint: string;
    link?: string;
    clickable: boolean;
};

export const initialBanners: Banner[] = [
  { id: 'banner-1', src: "https://placehold.co/600x300.png", alt: "Tournament Banner", hint: 'esports tournament', link: '/matches/morning-squad-challenge', clickable: true },
  { id: 'banner-2', src: "https://placehold.co/600x300.png", alt: "New Game Banner", hint: 'gaming promo', clickable: false },
  { id: 'banner-3', src: "https://placehold.co/600x300.png", alt: "Special Offer Banner", hint: 'special offer', link: '/wallet', clickable: true },
];
