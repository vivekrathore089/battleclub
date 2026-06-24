
'use client';

import { createContext, useContext, useState, type ReactNode, useCallback, useMemo } from 'react';
import type { PermissionKey, Staff, User } from '@/lib/staff-data';
import { initialStaff, ALL_PERMISSIONS, initialUsers } from '@/lib/staff-data';
import type { Game } from '@/lib/game-data';
import { initialGames } from '@/lib/game-data';
import type { Match, MatchParticipant } from '@/lib/match-data';
import { matches as initialMatches } from '@/lib/match-data';
import { useRequests } from './requests-context';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
  permissions: PermissionKey[];
  isSuperAdmin: boolean;
};

export type LoginResult = {
  success: boolean;
  role: 'admin' | 'staff' | 'user' | null;
  message: string;
};

export type SignupResult = {
    success: boolean;
    message: string;
}

export type UpdatePasswordResult = {
    success: boolean;
    message: string;
}

export type JoinMatchResult = {
    success: boolean;
    message: string;
}

type AuthContextType = {
  user: AuthenticatedUser | null;
  version: number;
  login: (email: string, pass: string) => LoginResult;
  logout: () => void;
  signup: (details: Omit<User, 'id' | 'joinDate' | 'status' | 'depositBalance' | 'winningsBalance' | 'bonusBalance'>) => SignupResult;
  updateAdminPassword: (currentPass: string, newPass: string) => UpdatePasswordResult;
  
  // Staff management
  staffList: Staff[];
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (staffId: string) => void;

  // User management
  users: User[];
  updateUserWallet: (userId: string, amount: number, type: 'deposit' | 'winnings' | 'bonus', action: 'add' | 'remove') => void;
  toggleUserStatus: (userId: string) => void;
  updateUserProfile: (userId: string, data: Partial<Pick<User, 'name' | 'gameUsername' | 'gameUid'>>) => void;

  // Game Management
  games: Game[];
  updateGame: (gameSlug: string, newDetails: Partial<Omit<Game, 'slug'>>) => void;

  // Match Management
  matches: Match[];
  addMatch: (match: Omit<Match, 'id' | 'joinedTeams' | 'participants'>) => void;
  updateMatch: (match: Match) => void;
  deleteMatch: (matchId: string) => void;
  joinMatch: (matchId: string, participants: { registrarUserId: string, gameUsername: string }[], settings: { bonusUsagePercentage: number, paidMatchJoinBonus: number }) => JoinMatchResult;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [games, setGames] = useState<Game[]>(initialGames);
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [adminCredentials, setAdminCredentials] = useState({ email: 'admin@gmail.com', password: '12345678' });
  const [version, setVersion] = useState(0);
  const requests = useRequests();

  // Staff management functions
  const addStaff = useCallback((staff: Omit<Staff, 'id'>) => {
    const newStaff = { ...staff, id: `staff-${Date.now()}` };
    setStaffList(prev => [newStaff, ...prev]);
  }, []);
  
  const updateStaff = useCallback((updatedStaff: Staff) => {
    setStaffList(prev => prev.map(s => s.id === updatedStaff.id ? updatedStaff : s));
  }, []);
  
  const deleteStaff = useCallback((staffId: string) => {
    setStaffList(prev => prev.filter(s => s.id !== staffId));
  }, []);

  // User management functions
  const updateUserWallet = useCallback((userId: string, amount: number, type: 'deposit' | 'winnings' | 'bonus', action: 'add' | 'remove') => {
    setUsers(prevUsers => 
      prevUsers.map(u => {
        if (u.id === userId) {
          const newBalances = { ...u };
          const multiplier = action === 'add' ? 1 : -1;

          if (type === 'deposit') {
            newBalances.depositBalance += amount * multiplier;
          } else if (type === 'winnings') {
            newBalances.winningsBalance += amount * multiplier;
          } else if (type === 'bonus') {
            newBalances.bonusBalance += amount * multiplier;
          }

          // Ensure balances don't go below zero
          newBalances.depositBalance = Math.max(0, newBalances.depositBalance);
          newBalances.winningsBalance = Math.max(0, newBalances.winningsBalance);
          newBalances.bonusBalance = Math.max(0, newBalances.bonusBalance);
          
          return newBalances;
        }
        return u;
      })
    );
  }, []);

  const toggleUserStatus = useCallback((userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId ? { ...u, status: u.status === 'Active' ? 'Banned' : 'Active' } : u
      )
    );
  }, []);

  const updateUserProfile = useCallback((userId: string, data: Partial<Pick<User, 'name' | 'gameUsername' | 'gameUid'>>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...data } : u));
    setUser(prev => {
        if (prev && prev.id === userId) {
            return { ...prev, ...data };
        }
        return prev;
    });
  }, []);


  // Game management functions
  const updateGame = useCallback((gameSlug: string, newDetails: Partial<Omit<Game, 'slug'>>) => {
    setGames(prevGames => {
        const oldGameName = prevGames.find(g => g.slug === gameSlug)?.name;

        if (oldGameName && newDetails.name && oldGameName !== newDetails.name) {
            const newName = newDetails.name;
            setMatches(prevMatches =>
                prevMatches.map(m => m.game === oldGameName ? { ...m, game: newName } : m)
            );
        }

        return prevGames.map(g => {
            if (g.slug === gameSlug) {
                const newSlug = newDetails.name ? slugify(newDetails.name) : g.slug;
                return { ...g, ...newDetails, slug: newSlug };
            }
            return g;
        });
    });

    setVersion(v => v + 1);
  }, []);

  // Match management functions
  const addMatch = useCallback((match: Omit<Match, 'id' | 'joinedTeams' | 'participants'>) => {
    const newMatch: Match = {
        ...match,
        id: `${slugify(match.title)}-${Date.now()}`,
        joinedTeams: 0,
        participants: [],
    };
    setMatches(prev => [newMatch, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setVersion(v => v + 1);
  }, []);

  const updateMatch = useCallback((updatedMatch: Match) => {
    setMatches(prevMatches => {
        const originalMatch = prevMatches.find(m => m.id === updatedMatch.id);
        
        if (updatedMatch.status === 'Completed' && originalMatch?.status !== 'Completed') {
            const winners = updatedMatch.participants.filter(p => p.rank === 1);
            const prizeAmount = parseInt(updatedMatch.prize.replace(/,/g, ''), 10);

            if (winners.length > 0 && !isNaN(prizeAmount)) {
                const winningRegistrars = [...new Set(winners.map(w => w.registrarUserId))];
                const prizePerRegistrar = prizeAmount / winningRegistrars.length;

                winningRegistrars.forEach(registrarId => {
                    updateUserWallet(registrarId, prizePerRegistrar, 'winnings', 'add');
                    requests.addTransaction({
                        type: 'Winnings',
                        amount: prizePerRegistrar,
                        description: `From "${updatedMatch.title}"`
                    });
                });

                updatedMatch.participants = updatedMatch.participants.map(p => {
                    if (p.rank === 1) {
                        return { ...p, winnings: prizePerRegistrar };
                    }
                    return p;
                });
            }
        }
        return prevMatches.map(m => m.id === updatedMatch.id ? updatedMatch : m);
    });
    setVersion(v => v + 1);
  }, [requests, updateUserWallet]);

  const deleteMatch = useCallback((matchId: string) => {
    setMatches(prev => prev.filter(m => m.id !== matchId));
    setVersion(v => v + 1);
  }, []);

  const joinMatch = useCallback((matchId: string, participants: { registrarUserId: string, gameUsername: string }[], settings: { bonusUsagePercentage: number, paidMatchJoinBonus: number }): JoinMatchResult => {
      const match = matches.find(m => m.id === matchId);
      if (!match) return { success: false, message: 'Match not found.' };

      const registrar = users.find(u => u.id === participants[0].registrarUserId);
      if (!registrar) return { success: false, message: 'User not found.' };

      const totalFee = parseFloat(match.entryFee) * participants.length;

      if (totalFee > 0) {
          // Paid match logic
          const maxBonusAllowed = totalFee * (settings.bonusUsagePercentage / 100);
          const actualBonusToUse = Math.min(registrar.bonusBalance, maxBonusAllowed);
          const depositToDebit = totalFee - actualBonusToUse;

          if (registrar.depositBalance < depositToDebit) {
              return { success: false, message: `Insufficient balance. You need ₹${depositToDebit.toFixed(2)} from Deposit and have ₹${registrar.depositBalance.toFixed(2)}.` };
          }

          if (depositToDebit > 0) {
              updateUserWallet(registrar.id, depositToDebit, 'deposit', 'remove');
              requests.addTransaction({
                  type: 'Entry Fee',
                  amount: -depositToDebit,
                  description: `For "${match.title}" (from Deposit)`,
              });
          }
          if (actualBonusToUse > 0) {
              updateUserWallet(registrar.id, actualBonusToUse, 'bonus', 'remove');
              requests.addTransaction({
                  type: 'Bonus Used',
                  amount: -actualBonusToUse,
                  description: `Entry fee for "${match.title}"`,
              });
          }
          
          if (settings.paidMatchJoinBonus > 0) {
              updateUserWallet(registrar.id, settings.paidMatchJoinBonus, 'bonus', 'add');
              requests.addTransaction({
                  type: 'Bonus Earned',
                  amount: settings.paidMatchJoinBonus,
                  description: `For joining "${match.title}"`,
              });
          }
      }
      
      const newParticipants: MatchParticipant[] = participants.map(p => ({ ...p, }));

      setMatches(prevMatches => prevMatches.map(m => {
          if (m.id === matchId) {
              return {
                  ...m,
                  participants: [...m.participants, ...newParticipants],
                  joinedTeams: m.joinedTeams + 1,
              };
          }
          return m;
      }));

      return { success: true, message: `Successfully joined match for ₹${totalFee.toFixed(2)}.`};
  }, [matches, users, requests, updateUserWallet]);


  // Auth functions
  const login = useCallback((identifier: string, pass: string): LoginResult => {
    if (identifier === adminCredentials.email && pass === adminCredentials.password) {
      const adminUser: AuthenticatedUser = { id: 'admin-01', name: 'Admin', email: identifier, isSuperAdmin: true, permissions: ALL_PERMISSIONS.map(p => p.id), role: 'admin' };
      setUser(adminUser);
      return { success: true, role: 'admin', message: 'Admin login successful.'};
    }

    const staffUser = staffList.find(s => s.email === identifier && s.password === pass);
    if (staffUser) {
      const authenticatedStaff: AuthenticatedUser = { id: staffUser.id, name: staffUser.name, email: staffUser.email, isSuperAdmin: false, permissions: staffUser.permissions.map(p => p.id), role: 'staff' };
      setUser(authenticatedStaff);
      return { success: true, role: 'staff', message: 'Staff login successful.' };
    }

    const regularUser = users.find(u => (u.email === identifier || u.name === identifier) && u.password === pass);
    if (regularUser) {
        if (regularUser.status === 'Banned') {
            return { success: false, role: null, message: 'This account has been banned.' };
        }
        const authenticatedUser: AuthenticatedUser = { id: regularUser.id, name: regularUser.name, email: regularUser.email, role: 'user', isSuperAdmin: false, permissions: [] };
        setUser(authenticatedUser);
        return { success: true, role: 'user', message: 'Login successful.' };
    }

    setUser(null);
    return { success: false, role: null, message: 'Invalid credentials. Please try again.' };
  }, [adminCredentials, staffList, users]);

  const signup = useCallback((details: Omit<User, 'id' | 'joinDate' | 'status' | 'depositBalance' | 'winningsBalance' | 'bonusBalance'>): SignupResult => {
    if (users.some(u => u.email === details.email)) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser: User = { ...details, id: `usr_${Date.now()}`, joinDate: new Date().toISOString(), status: 'Active', depositBalance: 0, winningsBalance: 0, bonusBalance: 10 };
    setUsers(prev => [newUser, ...prev]);

    const authenticatedUser: AuthenticatedUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: 'user', isSuperAdmin: false, permissions: [] };
    setUser(authenticatedUser);
    return { success: true, message: 'Account created successfully.' };
  }, [users]);
  
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateAdminPassword = useCallback((currentPass: string, newPass: string): UpdatePasswordResult => {
    if (currentPass !== adminCredentials.password) {
        return { success: false, message: 'The current password you entered is incorrect.' };
    }
    if (newPass.length < 8) {
        return { success: false, message: 'New password must be at least 8 characters.' };
    }
    setAdminCredentials(prev => ({ ...prev, password: newPass }));
    return { success: true, message: 'Password updated successfully.' };
  }, [adminCredentials.password]);

  const value = useMemo(() => ({
    user,
    version,
    login,
    logout,
    signup,
    updateAdminPassword,
    staffList, 
    addStaff, 
    updateStaff, 
    deleteStaff,
    users,
    updateUserWallet,
    toggleUserStatus,
    updateUserProfile,
    games,
    updateGame,
    matches,
    addMatch,
    updateMatch,
    deleteMatch,
    joinMatch
  }), [
      user, version, login, logout, signup, updateAdminPassword,
      staffList, addStaff, updateStaff, deleteStaff,
      users, updateUserWallet, toggleUserStatus, updateUserProfile,
      games, updateGame,
      matches, addMatch, updateMatch, deleteMatch, joinMatch
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
