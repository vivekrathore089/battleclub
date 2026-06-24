
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
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import type { Match } from '@/lib/match-data';
import { useAuth } from '@/context/auth-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useWalletSettings } from '@/context/wallet-settings-context';

const teammateSchema = z.object({
  gameUsername: z.string().min(3, 'Username must be at least 3 characters.'),
});

const formSchema = z.object({
  joinType: z.enum(['solo', 'team']),
  players: z.array(teammateSchema),
});

type JoinMatchFormValues = z.infer<typeof formSchema>;

type JoinMatchDialogProps = {
  match: Match;
  children: React.ReactNode;
};

export default function JoinMatchDialog({ match, children }: JoinMatchDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { user, users, joinMatch } = useAuth();
  const { walletSettings } = useWalletSettings();
  const currentUser = users.find(u => u.id === user?.id);
  const [paymentBreakdown, setPaymentBreakdown] = useState({ fee: 0, bonus: 0, deposit: 0 });

  const teamSizeMap = {
    'Solo': 1,
    'Duo': 2,
    'Squad': 4,
  };
  const playersPerTeam = teamSizeMap[match.teamSize as keyof typeof teamSizeMap] || 1;

  const form = useForm<JoinMatchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      joinType: 'solo',
      players: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "players"
  });

  const joinType = form.watch('joinType');
  const playersToRegister = form.watch('players').length;

  useEffect(() => {
    const currentFields = form.getValues('players');
    const targetCount = joinType === 'team' ? playersPerTeam : 1;
    const diff = targetCount - currentFields.length;
    
    if (diff > 0) {
      const newFields = [];
      for (let i = 0; i < diff; i++) {
        const username = currentFields.length + i === 0 ? (currentUser?.gameUsername || '') : '';
        newFields.push({ gameUsername: username });
      }
      append(newFields, { shouldFocus: false });
    } else if (diff < 0) {
      for(let i=0; i < Math.abs(diff); i++){
          remove(targetCount + i);
      }
    }
  }, [joinType, playersPerTeam, append, remove, currentUser?.gameUsername, form]);


  useEffect(() => {
    if (!currentUser || !open) return;

    const entryFee = parseFloat(match.entryFee) || 0;
    const totalFee = entryFee * playersToRegister;

    if (totalFee > 0) {
        const maxBonusAllowed = totalFee * (walletSettings.bonusUsagePercentage / 100);
        const actualBonusToUse = Math.min(currentUser.bonusBalance, maxBonusAllowed);
        const depositNeeded = totalFee - actualBonusToUse;
        
        setPaymentBreakdown({
            fee: totalFee,
            bonus: actualBonusToUse,
            deposit: depositNeeded
        });
    } else {
        setPaymentBreakdown({ fee: 0, bonus: 0, deposit: 0 });
    }

  }, [playersToRegister, match.entryFee, currentUser, walletSettings, open]);


  const onSubmit = (data: JoinMatchFormValues) => {
    if (!user || !currentUser) {
        toast({ title: 'Error', description: 'You must be logged in to join a match.', variant: 'destructive' });
        return;
    }
    
    const participantsToRegister = data.players.map(p => ({
        gameUsername: p.gameUsername,
        registrarUserId: currentUser.id,
    }));
    
    const result = joinMatch(match.id, participantsToRegister, {
        bonusUsagePercentage: walletSettings.bonusUsagePercentage,
        paidMatchJoinBonus: walletSettings.paidMatchJoinBonus,
    });

    if (result.success) {
        setOpen(false);
        form.reset();
        toast({
            title: 'Successfully Joined!',
            description: result.message,
        });
    } else {
         toast({
            variant: 'destructive',
            title: 'Failed to Join',
            description: result.message,
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-secondary">
        <DialogHeader>
          <DialogTitle className="text-primary font-headline">Join "{match.title}"</DialogTitle>
          <DialogDescription>
            {`Entry fee: ₹${match.entryFee} per player.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {playersPerTeam > 1 && (
                <Controller
                    control={form.control}
                    name="joinType"
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                            <div>
                                <RadioGroupItem value="solo" id="solo" className="peer sr-only" />
                                <Label htmlFor="solo" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Join Alone
                                </Label>
                            </div>
                             <div>
                                <RadioGroupItem value="team" id="team" className="peer sr-only" />
                                <Label htmlFor="team" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    Join with Team
                                </Label>
                            </div>
                        </RadioGroup>
                    )}
                />
            )}
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <FormField
                            control={form.control}
                            name={`players.${index}.gameUsername`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {`Player ${index + 1} Username`}
                                        {index === 0 && <span className="text-muted-foreground"> (You)</span>}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="In-game name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
            </div>

            <DialogFooter className="flex-col gap-2 pt-4 border-t">
                 <div className="text-sm font-semibold text-primary-foreground p-2 bg-secondary rounded-md w-full">
                    <div className="flex justify-between">
                        <span>Total Entry Fee:</span>
                        <span className="text-primary">₹{paymentBreakdown.fee.toFixed(2)}</span>
                    </div>
                    {paymentBreakdown.bonus > 0 && (
                        <div className="flex justify-between text-xs font-normal text-muted-foreground">
                            <span>From Bonus:</span>
                            <span>- ₹{paymentBreakdown.bonus.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between mt-1 pt-1 border-t border-border/50">
                        <span>Payable from Deposit:</span>
                        <span className="text-primary">₹{paymentBreakdown.deposit.toFixed(2)}</span>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Confirm & Pay
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
