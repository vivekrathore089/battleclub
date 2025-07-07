export type DepositRequest = {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    userAvatarHint: string;
    amount: number;
    transactionId: string;
    requestDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
};

export const mockDepositRequests: DepositRequest[] = [
    {
        id: 'dep_1',
        userId: 'usr_1',
        userName: 'ShadowStriker',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 500,
        transactionId: '123456789012',
        requestDate: '2024-08-16T10:00:00Z',
        status: 'Pending',
    },
    {
        id: 'dep_2',
        userId: 'usr_2',
        userName: 'ViperX',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 250,
        transactionId: '234567890123',
        requestDate: '2024-08-16T11:30:00Z',
        status: 'Pending',
    },
    {
        id: 'dep_3',
        userId: 'usr_5',
        userName: 'SniperQueen',
        userAvatar: 'https://placehold.co/100x100.png',
        userAvatarHint: 'gamer avatar',
        amount: 1000,
        transactionId: '345678901234',
        requestDate: '2024-08-16T12:15:00Z',
        status: 'Pending',
    },
];
