export type WithdrawalRequest = {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    userAvatarHint: string;
    amount: number;
    upiId: string;
    requestDate: string;
    status: 'Pending' | 'Processed' | 'Rejected';
};

export const mockWithdrawalRequests: WithdrawalRequest[] = [
    {
        id: 'wd_1',
        userId: 'usr_4',
        userName: 'ProGamer_47',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 250,
        upiId: 'progamer@upi',
        requestDate: '2024-08-16T09:00:00Z',
        status: 'Pending',
    },
    {
        id: 'wd_2',
        userId: 'usr_1',
        userName: 'ShadowStriker',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 1000,
        upiId: 'shadow@ybl',
        requestDate: '2024-08-16T14:00:00Z',
        status: 'Pending',
    },
    {
        id: 'wd_3',
        userId: 'usr_2',
        userName: 'ViperX',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 150.50,
        upiId: 'viperx@okicici',
        requestDate: '2024-08-15T18:45:00Z',
        status: 'Pending',
    },
];
