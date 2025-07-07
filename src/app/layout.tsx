
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from '@/components/layout/bottom-nav';
import { AppInfoProvider } from '@/context/app-info-context';
import { WalletSettingsProvider } from '@/context/wallet-settings-context';
import UpdateGate from '@/components/layout/update-gate';
import { AuthProvider } from '@/context/auth-context';
import { RequestsProvider } from '@/context/requests-context';

export const metadata: Metadata = {
  title: 'BATTLE CLUB',
  description: 'BATTLE CLUB - The Ultimate Gaming Platform',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppInfoProvider>
          <WalletSettingsProvider>
            <RequestsProvider>
              <AuthProvider>
                <UpdateGate>
                  <div className="relative flex flex-col min-h-screen">
                    <main className="flex-grow pb-20 md:pb-0">
                      {children}
                    </main>
                    <BottomNav />
                    <Toaster />
                  </div>
                </UpdateGate>
              </AuthProvider>
            </RequestsProvider>
          </WalletSettingsProvider>
        </AppInfoProvider>
      </body>
    </html>
  );
}
