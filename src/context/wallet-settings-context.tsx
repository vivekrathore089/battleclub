
'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { WalletSettings } from '@/lib/wallet-settings-data';
import { walletSettingsData as initialWalletSettings } from '@/lib/wallet-settings-data';

type WalletSettingsContextType = {
  walletSettings: WalletSettings;
  setWalletSettings: (settings: WalletSettings) => void;
};

const WalletSettingsContext = createContext<WalletSettingsContextType | undefined>(undefined);

export function WalletSettingsProvider({ children }: { children: ReactNode }) {
  const [walletSettings, setWalletSettings] = useState<WalletSettings>(initialWalletSettings);

  return (
    <WalletSettingsContext.Provider value={{ walletSettings, setWalletSettings }}>
      {children}
    </WalletSettingsContext.Provider>
  );
}

export function useWalletSettings() {
  const context = useContext(WalletSettingsContext);
  if (context === undefined) {
    throw new Error('useWalletSettings must be used within a WalletSettingsProvider');
  }
  return context;
}
