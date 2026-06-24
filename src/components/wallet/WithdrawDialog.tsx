
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
import { MinusCircle } from 'lucide-react';
import { useWalletSettings } from '@/context/wallet-settings-context';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';

type WithdrawDialogProps = {
  children: React.ReactNode;
  winningsBalance: number;
};

export default function WithdrawDialog({ children, winningsBalance }: WithdrawDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { walletSettings } = useWalletSettings();
  const { addWithdrawalRequest } = useRequests();
  const { user, users } = useAuth();

  const formSchema = z.object({
    amount: z.coerce.number()
      .min(walletSettings.minWithdrawal, { message: `Minimum withdrawal is ₹${walletSettings.minWithdrawal}.` })
      .max(winningsBalance, { message: `You can only withdraw up to your winnings balance of ₹${winningsBalance.toFixed(2)}.`}),
    upiId: z.string().min(5, { message: 'Please enter a valid UPI ID.' }).includes('@', { message: 'Please enter a valid UPI ID.'}),
  });
  
  type WithdrawFormValues = z.infer<typeof formSchema>;

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiId: '',
    },
  });

  const onSubmit = (data: WithdrawFormValues) => {
    const currentUser = users.find(u => u.id === user?.id);
    if (!user || !currentUser) {
        toast({ title: "Error", description: "You must be logged in to make a request.", variant: "destructive" });
        return;
    }
    
    addWithdrawalRequest(data.amount, data.upiId, {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        avatarHint: currentUser.avatarHint,
    });
    setOpen(false); // Close the dialog on successful submission
    form.reset();
    toast({
      title: 'Request Submitted!',
      description: `Your withdrawal request of ₹${data.amount} has been received.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-secondary">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline flex items-center gap-2"><MinusCircle /> Withdraw Funds</DialogTitle>
          <DialogDescription>
            You can only withdraw from your winnings of <span className="font-bold text-primary-foreground">₹{winningsBalance.toFixed(2)}</span>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={`e.g., ${walletSettings.minWithdrawal}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="upiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPI ID</FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
