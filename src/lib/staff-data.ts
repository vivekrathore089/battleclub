

export type PermissionKey =
  | 'userManagement'
  | 'gameManagement'
  | 'matchManagement'
  | 'depositRequests'
  | 'withdrawalRequests'
  | 'walletSettings'
  | 'pushNotifications'
  | 'updateBanners'
  | 'adminNotice'
  | 'contentPages'
  | 'appInformation'
  | 'staffManagement';

export type Permission = {
  id: PermissionKey;
  label: string;
};

export type Staff = {
  id: string;
  name: string;
  email: string;
  password?: string;
  permissions: Permission[];
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    avatarHint: string;
    gameUsername: string;
    gameUid: string;
    depositBalance: number;
    winningsBalance: number;
    bonusBalance: number;
    status: 'Active' | 'Banned';
    joinDate: string;
};

export const ALL_PERMISSIONS: Permission[] = [
  { id: 'userManagement', label: 'User Management' },
  { id: 'gameManagement', label: 'Game Management' },
  { id: 'matchManagement', label: 'Match Management' },
  { id: 'depositRequests', label: 'Deposit Requests' },
  { id: 'withdrawalRequests', label: 'Withdrawal Requests' },
  { id: 'walletSettings', label: 'Wallet Settings' },
  { id: 'pushNotifications', label: 'Push Notifications' },
  { id: 'updateBanners', label: 'Update Banners' },
  { id: 'adminNotice', label: 'Admin Notice' },
  { id: 'contentPages', label: 'Content Pages' },
  { id: 'appInformation', label: 'App Information' },
  { id: 'staffManagement', label: 'Staff Management' },
];

export const initialStaff: Staff[] = [
  {
    id: 'staff-1',
    name: 'John Matchmaker',
    email: 'john.m@example.com',
    password: 'password123',
    permissions: [
      { id: 'matchManagement', label: 'Match Management' },
      { id: 'gameManagement', label: 'Game Management' },
    ],
  },
  {
    id: 'staff-2',
    name: 'Jane Teller',
    email: 'jane.t@example.com',
    password: 'password123',
    permissions: [
      { id: 'depositRequests', label: 'Deposit Requests' },
      { id: 'withdrawalRequests', label: 'Withdrawal Requests' },
      { id: 'userManagement', label: 'User Management' },
    ],
  },
];

export const initialUsers: User[] = [
    { id: 'usr_1', name: 'ShadowStriker', email: 'shadow@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'Shad0w', gameUid: '5123456789', depositBalance: 608.20, winningsBalance: 912.30, bonusBalance: 100, status: 'Active', joinDate: '2023-01-15' },
    { id: 'usr_2', name: 'ViperX', email: 'viper@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'ViperXtreme', gameUid: '5234567890', depositBalance: 340.00, winningsBalance: 510.00, bonusBalance: 50, status: 'Active', joinDate: '2023-02-20' },
    { id: 'usr_3', name: 'PhoenixFury', email: 'fury@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'Phoenix', gameUid: '5345678901', depositBalance: 1280.30, winningsBalance: 1920.45, bonusBalance: 200, status: 'Banned', joinDate: '2023-03-10' },
    { id: 'usr_4', name: 'ProGamer_47', email: 'user@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'ProGamer47', gameUid: '5456789012', depositBalance: 500.00, winningsBalance: 750.00, bonusBalance: 75, status: 'Active', joinDate: '2023-04-05' },
    { id: 'usr_5', name: 'SniperQueen', email: 'queen@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'Sn1perQueen', gameUid: '5567890123', depositBalance: 20.10, winningsBalance: 30.15, bonusBalance: 10, status: 'Active', joinDate: '2023-05-12' },
    { id: 'usr_6', name: 'RogueAssassin', email: 'rogue@example.com', password: 'password123', avatar: 'https://placehold.co/100x100.png', avatarHint: 'gamer avatar', gameUsername: 'Rogue', gameUid: '5678901234', depositBalance: 0, winningsBalance: 0, bonusBalance: 0, status: 'Active', joinDate: '2023-06-18' },
];
