'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, Gift, Trophy } from 'lucide-react';

const notifications = [
    {
        id: 1,
        icon: <Trophy className="h-6 w-6 text-amber-400" />,
        title: 'You won the Morning Squad Challenge!',
        description: 'Your winnings of ₹500 have been added to your wallet.',
        time: '1h ago',
    },
    {
        id: 2,
        icon: <Gift className="h-6 w-6 text-accent" />,
        title: 'Referral Bonus!',
        description: 'Your friend GamerPro123 joined using your code. You earned ₹10.',
        time: '3h ago',
    },
    {
        id: 3,
        icon: <Bell className="h-6 w-6 text-primary" />,
        title: 'Match Starting Soon',
        description: 'Solo King Arena starts in 15 minutes. Get ready!',
        time: '1d ago',
    },
];

export default function NotificationsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-secondary text-foreground">
        <SheetHeader>
          <SheetTitle className="font-headline text-primary">Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 p-3 bg-secondary rounded-lg">
              <div className="flex-shrink-0 mt-1">{notification.icon}</div>
              <div className="flex-grow">
                <p className="font-semibold text-primary-foreground">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
           {notifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
                <Bell className="mx-auto h-12 w-12" />
                <p className="mt-4">You have no new notifications.</p>
            </div>
           )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
