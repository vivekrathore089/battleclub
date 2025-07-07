

'use client';

import { createContext, useContext, useState, type ReactNode, useCallback, useMemo } from 'react';
import type { DepositRequest } from '@/lib/deposit-data';
import { mockDepositRequests as initialDepositRequests } from '@/lib/deposit-data';
import type { WithdrawalRequest } from '@/lib/withdrawal-data';
import { mockWithdrawalRequests as initialWithdrawalRequests } from '@/lib/withdrawal-data';

export type Transaction = {
  id: string;
  type: 'Winnings' | 'Deposit (Manual)' | 'Deposit (Auto)' | 'Withdrawal' | 'Entry Fee' | 'Conversion In' | 'Conversion Out' | 'Bonus Used' | 'Bonus Earned';
  amount: number;
  date: string;
  description: string;
};

const initialTransactions: Transaction[] = [
    { id: 'tx_1', type: 'Winnings', amount: 150, date: '2023-10-26T14:30:00Z', description: 'From BGMI Squad Challenge' },
    { id: 'tx_2', type: 'Deposit (Manual)', amount: 500, date: '2023-10-25T10:00:00Z', description: 'Added via UPI' },
    { id: 'tx_3', type: 'Withdrawal', amount: -200, date: '2023-10-24T09:00:00Z', description: 'Withdrawn to GPay' },
    { id: 'tx_4', type: 'Entry Fee', amount: -50, date: '2023-10-23T12:00:00Z', description: 'For Morning Squad Challenge' },
];


type RequestsContextType = {
  depositRequests: DepositRequest[];
  withdrawalRequests: WithdrawalRequest[];
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  addDepositRequest: (amount: number, transactionId: string, user: { id: string, name: string, avatar: string, avatarHint: string }) => void;
  addWithdrawalRequest: (amount: number, upiId: string, user: { id: string, name: string, avatar: string, avatarHint: string }) => void;
  processDepositRequest: (requestId: string, approveCallback: (userId: string, amount: number) => void) => void;
  processWithdrawalRequest: (requestId: string, approveCallback: (userId: string, amount: number) => void) => void;
};

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>(initialDepositRequests);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(initialWithdrawalRequests);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  }, []);

  const addDepositRequest = useCallback((amount: number, transactionId: string, user: { id: string, name: string, avatar: string, avatarHint: string }) => {
    const newRequest: DepositRequest = {
        id: `dep_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userAvatarHint: user.avatarHint,
        amount,
        transactionId,
        requestDate: new Date().toISOString(),
        status: 'Pending',
    };
    setDepositRequests(prev => [newRequest, ...prev]);
  }, []);
  
  const addWithdrawalRequest = useCallback((amount: number, upiId: string, user: { id: string, name: string, avatar: string, avatarHint: string }) => {
    const newRequest: WithdrawalRequest = {
        id: `wd_${Date.now()}`,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        userAvatarHint: user.avatarHint,
        amount,
        upiId,
        requestDate: new Date().toISOString(),
        status: 'Pending',
    };
    setWithdrawalRequests(prev => [newRequest, ...prev]);
  }, []);
  
  const processDepositRequest = useCallback((requestId: string, approveCallback: (userId: string, amount: number) => void) => {
      setDepositRequests(prev => {
          const request = prev.find(r => r.id === requestId);
          if (request) {
            approveCallback(request.userId, request.amount);
          }
          return prev.filter(req => req.id !== requestId)
      });
  }, []);

  const processWithdrawalRequest = useCallback((requestId: string, approveCallback: (userId: string, amount: number) => void) => {
      setWithdrawalRequests(prev => {
          const request = prev.find(r => r.id === requestId);
          if (request) {
            approveCallback(request.userId, request.amount);
          }
          return prev.filter(req => req.id !== requestId);
      });
  }, []);

  const value = useMemo(() => ({
    depositRequests, 
    withdrawalRequests,
    transactions,
    addTransaction,
    addDepositRequest,
    addWithdrawalRequest,
    processDepositRequest,
    processWithdrawalRequest
  }), [
    depositRequests,
    withdrawalRequests,
    transactions,
    addTransaction,
    addDepositRequest,
    addWithdrawalRequest,
    processDepositRequest,
    processWithdrawalRequest
  ]);


  return (
    <RequestsContext.Provider value={value}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
}
