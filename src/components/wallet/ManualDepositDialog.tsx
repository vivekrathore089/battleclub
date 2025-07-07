
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
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Copy, PlusCircle } from 'lucide-react';
import { useWalletSettings } from '@/context/wallet-settings-context';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';

type DepositFormValues = z.infer<ReturnType<typeof createFormSchema>>;

const createFormSchema = (minDeposit: number) => z.object({
  amount: z.coerce.number().min(minDeposit, { message: `Minimum deposit is ₹${minDeposit}.` }),
  transactionId: z.string().min(12, { message: 'Transaction ID/UTR must be at least 12 characters.' }),
});

export default function ManualDepositDialog({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { walletSettings } = useWalletSettings();
  const { addDepositRequest } = useRequests();
  const { user, users } = useAuth();
  const upiId = walletSettings.upiId;

  const formSchema = useMemo(() => createFormSchema(walletSettings.minDeposit), [walletSettings.minDeposit]);

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionId: '',
    },
  });
  
  const handleCopy = () => {
    navigator.clipboard.writeText(upiId).then(() => {
        toast({
            title: "Copied!",
            description: "UPI ID copied to clipboard.",
        });
    });
  };

  const onSubmit = (data: DepositFormValues) => {
    const currentUser = users.find(u => u.id === user?.id);
    if (!user || !currentUser) {
        toast({ title: "Error", description: "You must be logged in to make a request.", variant: "destructive" });
        return;
    }
    
    addDepositRequest(data.amount, data.transactionId, {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        avatarHint: currentUser.avatarHint,
    });
    setOpen(false); // Close the dialog on successful submission
    form.reset();
    toast({
      title: 'Request Submitted!',
      description: 'Your deposit request has been received and will be processed shortly.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-secondary flex flex-col max-h-[90dvh]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-primary font-headline flex items-center gap-2"><PlusCircle /> Add Funds (Manual)</DialogTitle>
          <DialogDescription>
            Scan the QR code or use the UPI ID to make a payment. Minimum deposit is ₹{walletSettings.minDeposit}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-2">
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
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Or pay to this UPI ID</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-primary-foreground">{upiId}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy} type="button">
                            <Copy className="h-4 w-4 text-primary" />
                        </Button>
                    </div>
                </div>
            </div>
            <Form {...form}>
              <form id="deposit-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Deposited (?)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder={`e.g., ${walletSettings.minDeposit}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction ID / UTR</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the 12-digit UTR here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t border-border">
          <Button type="submit" form="deposit-form" className="w-full bg-primary hover:bg-primary/90">
            Submit For Approval
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
