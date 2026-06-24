'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AppInfo } from '@/lib/app-info-data';
import { appInfo as initialAppInfoData } from '@/lib/app-info-data';

type AppInfoContextType = {
  appInfo: AppInfo;
  setAppInfo: (appInfo: AppInfo) => void;
};

const AppInfoContext = createContext<AppInfoContextType | undefined>(undefined);

export function AppInfoProvider({ children }: { children: ReactNode }) {
  const [appInfo, setAppInfo] = useState<AppInfo>(initialAppInfoData);

  return (
    <AppInfoContext.Provider value={{ appInfo, setAppInfo }}>
      {children}
    </AppInfoContext.Provider>
  );
}

export function useAppInfo() {
  const context = useContext(AppInfoContext);
  if (context === undefined) {
    throw new Error('useAppInfo must be used within an AppInfoProvider');
  }
  return context;
}
