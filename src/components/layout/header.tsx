
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import GameControllerIcon from '../icons/game-controller-icon';
import NotificationsSheet from '../notifications/notifications-sheet';
import { useAuth } from '@/context/auth-context';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, users } = useAuth();
  const isAdminPage = pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // For regular users, find their full details from the users list
  const currentUserDetails = user && user.role === 'user' 
    ? users.find(u => u.id === user.id) 
    : null;
    
  const walletBalance = currentUserDetails ? currentUserDetails.depositBalance + currentUserDetails.winningsBalance + currentUserDetails.bonusBalance : 0;
  const userAvatar = currentUserDetails ? currentUserDetails.avatar : "https://placehold.co/100x100.png";
  const userAvatarHint = currentUserDetails ? currentUserDetails.avatarHint : "gamer avatar";

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
            <Link href={isAdminPage ? "/admin" : "/home"} className="flex gap-2 items-center font-headline text-2xl text-primary-foreground tracking-wider">
                <GameControllerIcon className="h-8 w-8 text-primary" />
                BATTLE CLUB
            </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user && (user.role === 'admin' || user.role === 'staff') ? (
              <Button variant="ghost" onClick={handleLogout} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="w-5 h-5 mr-2" />
                <span className="font-semibold">Logout</span>
              </Button>
            ) : (
              <>
                <NotificationsSheet />
                <Link href="/wallet">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Wallet className="w-4 h-4 mr-2"/>
                    ₹{walletBalance.toFixed(2)}
                  </Button>
                </Link>
                <Link href="/profile">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={userAvatar} alt="User avatar" data-ai-hint={userAvatarHint} />
                    <AvatarFallback>{user?.name.charAt(0) ?? 'U'}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
