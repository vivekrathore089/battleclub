

export type MatchParticipant = {
  // This is the user ID of the person who paid for the slot(s).
  // It's used to identify who is "in" the match.
  registrarUserId: string; 
  // This is the in-game name of the player in this slot.
  gameUsername: string; 
  // Rank of the player/team after the match is completed.
  rank?: number;
  // Prize money won by the player/team.
  winnings?: number;
};

export type Match = {
  id: string;
  game: string;
  title: string;
  prize: string;
  perKillPrize: string;
  entryFee: string;
  teamSize: string;
  totalTeams: number;
  joinedTeams: number;
  time: string;
  date: string;
  image: string;
  imageHint: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  description: string;
  rules: string[];
  participants: MatchParticipant[];
  roomDetails?: {
      id: string;
      pass: string;
  };
  isJoined?: boolean; // This should be determined by checking participants list
};

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

const mockParticipants = (count: number, userId: string): MatchParticipant[] => {
    const result: MatchParticipant[] = [];
    for (let i = 0; i < count; i++) {
        result.push({
            registrarUserId: userId,
            gameUsername: `Player ${i + 1}`,
        });
    }
    return result;
};

export const matches: Match[] = [
    {
        id: slugify('Morning Squad Challenge'),
        game: 'BGMI',
        title: 'Morning Squad Challenge',
        prize: '10,000',
        perKillPrize: '5',
        entryFee: '50',
        teamSize: 'Squad',
        totalTeams: 25,
        joinedTeams: 10,
        time: '11:00 AM',
        date: '2024-08-15',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'battlefield action',
        status: 'Upcoming',
        description: 'The ultimate squad challenge. Prize pool distributed among the top 3 teams. 1st: ?5000, 2nd: ?3000, 3rd: ?2000.',
        rules: [
            'Only mobile devices are allowed.',
            'Emulators are strictly prohibited.',
            'Teams must register at least 30 minutes before the match.',
            'All players must adhere to fair play policies.',
        ],
        participants: mockParticipants(10, 'usr_4'), // User 'ProGamer_47' has joined
    },
    {
        id: slugify('Solo King Arena'),
        game: 'Free Fire MAX',
        title: 'Solo King Arena',
        prize: '5,000',
        perKillPrize: '2',
        entryFee: '20',
        teamSize: 'Solo',
        totalTeams: 50,
        joinedTeams: 45,
        time: '01:00 PM',
        date: '2024-08-15',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'lone warrior',
        status: 'Upcoming',
        description: 'Prove you are the king of the arena. Exciting prizes for top players.',
        rules: ['All weapons and characters are allowed.', 'Play zone will shrink faster than usual.', 'Top 10 players receive bonus points.'],
        participants: mockParticipants(45, 'usr_1'),
    },
    {
        id: slugify('Rush Hour TDM'),
        game: 'COD M',
        title: 'Rush Hour TDM',
        prize: '7,500',
        perKillPrize: '3',
        entryFee: '30',
        teamSize: 'Duo',
        totalTeams: 16,
        joinedTeams: 16,
        time: 'Ongoing',
        date: '2024-08-14',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'urban combat',
        status: 'Ongoing',
        description: 'Fast-paced Team Deathmatch action. First to 50 kills wins the grand prize.',
        rules: ['First to 50 kills wins.', 'Scorestreaks are allowed.', 'No operator skills.'],
        participants: mockParticipants(16, 'usr_4'),
    },
    {
        id: slugify('Futuristic Warfare'),
        game: 'PUBG NEW STATE',
        title: 'Futuristic Warfare',
        prize: '12,000',
        perKillPrize: '10',
        entryFee: '60',
        teamSize: 'Squad',
        totalTeams: 20,
        joinedTeams: 20,
        time: 'Completed',
        date: '2024-08-13',
        image: 'https://placehold.co/400x200.png',
        imageHint: 'sci-fi battle',
        status: 'Completed',
        description: 'Battle it out in the world of tomorrow. High stakes, high rewards.',
        rules: ['Only futuristic weapons and vehicles.', 'Last squad standing wins.'],
        participants: mockParticipants(20, 'usr_4').map((p, i) => {
            const rank = i + 1;
            return { ...p, rank, winnings: rank === 1 ? 12000 : undefined };
        }),
    },
];
