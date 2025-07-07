'use client';
import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { adminNotice } from '@/lib/notice-data';

export default function AdminNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <Alert className="relative bg-secondary border-primary/50 text-foreground">
      <Megaphone className="h-4 w-4 text-primary" />
      <AlertTitle className="font-headline text-primary">Notice!</AlertTitle>
      <AlertDescription>
        {adminNotice.message}
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss notice</span>
      </Button>
    </Alert>
  );
}
