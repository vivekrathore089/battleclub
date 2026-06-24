
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import Image from 'next/image';
import { PlusCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useWalletSettings } from '@/context/wallet-settings-context';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';

const amountFormSchema = z.object({
  amount: z.coerce.number()
    .min(20, { message: 'Minimum deposit amount is ?20.' })
    .max(500, { message: 'Maximum deposit amount is ?500.' }),
});

type AmountFormValues = z.infer<typeof amountFormSchema>;

export default function AutomaticDepositDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'amount' | 'qr'>('amount');
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const { walletSettings } = useWalletSettings();
  const { addTransaction } = useRequests();
  const { user, updateUserWallet } = useAuth();
  
  const form = useForm<AmountFormValues>({
    resolver: zodResolver(amountFormSchema),
  });

  const onAmountSubmit = (data: AmountFormValues) => {
    setAmount(data.amount);
    setStep('qr');
  };

  const handleSuccessfulPayment = () => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You are not logged in.'});
        return;
    }
    setIsProcessing(true);
    // Simulate API call and webhook response
    setTimeout(() => {
        updateUserWallet(user.id, amount, 'deposit', 'add');
        addTransaction({
            type: 'Deposit (Auto)',
            amount: amount,
            description: `Automatic deposit via Gateway`,
        });

        toast({
            title: 'Payment Successful!',
            description: `?${amount.toFixed(2)} has been added to your deposit balance.`,
        });

        setIsProcessing(false);
        setOpen(false);
        // Reset state for next time
        setTimeout(() => {
            setStep('amount');
            setAmount(0);
            form.reset();
        }, 500);

    }, 2000);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        // Reset state when dialog is closed
        setTimeout(() => {
            setStep('amount');
            setAmount(0);
            form.reset();
        }, 500);
    }
    setOpen(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-secondary">
        {step === 'amount' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-primary font-headline flex items-center gap-2"><PlusCircle /> Add Funds</DialogTitle>
              <DialogDescription>
                Enter the amount you wish to deposit. Min ?20, Max ?500.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAmountSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount to Deposit (?)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Proceed to Pay
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
        {step === 'qr' && (
           <>
            <DialogHeader>
              <DialogTitle className="text-primary font-headline flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setStep('amount')}><ArrowLeft className="h-4 w-4"/></Button>
                 Scan to Pay
              </DialogTitle>
              <DialogDescription>
                Scan the QR code with any UPI app to pay <span className="font-bold text-primary-foreground">?{amount.toFixed(2)}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
                <Image 
                    src={walletSettings.qrCodeUrl} 
                    alt="QR Code" 
                    width={200} 
                    height={200}
                    data-ai-hint="qr code"
                    className="rounded-lg border-4 border-primary"
                    unoptimized
                />
                <p className="text-sm text-muted-foreground">Waiting for payment confirmation...</p>
            </div>
             <DialogFooter className="flex-col gap-2">
                <p className="text-xs text-center text-muted-foreground">For demo purposes, click below to simulate a successful payment.</p>
                <Button onClick={handleSuccessfulPayment} className="w-full bg-green-600 hover:bg-green-700" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="animate-spin mr-2" />}
                    {isProcessing ? 'Processing...' : 'Simulate Successful Payment'}
                </Button>
            </DialogFooter>
           </>
        )}
      </DialogContent>
    </Dialog>
  );
}
