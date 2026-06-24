
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Trophy, UserCircle, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/refer', label: 'Refer', icon: Users },
  { href: '/top-players', label: 'Top Players', icon: Trophy },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup' || pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-primary/20 md:hidden z-50">
      <nav className="grid grid-cols-5 justify-items-center items-center h-16">
        {navItems.map((item) => {
          const isActive = item.href === '/home' ? (pathname === item.href || pathname === '/') : pathname.startsWith(item.href);
          return (
            <Link href={item.href} key={item.label} legacyBehavior>
              <a className={cn(
                "flex flex-col items-center justify-center text-xs gap-1 transition-colors w-full h-full",
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}>
                <item.icon className={cn("w-6 h-6 transition-transform", isActive ? 'scale-110' : '')} />
                <span className={cn("font-semibold text-center", isActive ? 'font-bold' : '')}>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
