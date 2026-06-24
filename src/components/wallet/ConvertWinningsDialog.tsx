
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';

type ConvertWinningsDialogProps = {
  children: React.ReactNode;
  winningsBalance: number;
};

export default function ConvertWinningsDialog({ children, winningsBalance }: ConvertWinningsDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { addTransaction } = useRequests();
  const { user, updateUserWallet } = useAuth();

  const formSchema = z.object({
    amount: z.coerce.number()
      .positive({ message: "Amount must be positive."})
      .max(winningsBalance, { message: `You can only convert up to your winnings of ₹${winningsBalance.toFixed(2)}.`}),
  });
  
  type ConvertFormValues = z.infer<typeof formSchema>;

  const form = useForm<ConvertFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ConvertFormValues) => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.' });
        return;
    }
    
    // 1. Debit from winnings
    updateUserWallet(user.id, data.amount, 'winnings', 'remove');
    // 2. Credit to deposit
    updateUserWallet(user.id, data.amount, 'deposit', 'add');

    // 3. Add transactions
    addTransaction({
        type: 'Conversion Out',
        amount: -data.amount,
        description: 'Winnings to Deposit Balance'
    });
     addTransaction({
        type: 'Conversion In',
        amount: data.amount,
        description: 'Winnings to Deposit Balance'
    });

    setOpen(false);
    form.reset();
    toast({
      title: 'Conversion Successful!',
      description: `₹${data.amount.toFixed(2)} has been moved to your deposit balance.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-secondary">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline flex items-center gap-2"><Repeat /> Convert Winnings</DialogTitle>
          <DialogDescription>
            Your winnings balance is <span className="font-bold text-primary-foreground">₹{winningsBalance.toFixed(2)}</span>. Enter the amount you wish to convert to deposit cash.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Convert (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Confirm Conversion
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
