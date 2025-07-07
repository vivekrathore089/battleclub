
'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowDownCircle, ArrowUpCircle, PlusCircle, MinusCircle, Repeat } from 'lucide-react';
import ManualDepositDialog from '@/components/wallet/ManualDepositDialog';
import AutomaticDepositDialog from '@/components/wallet/AutomaticDepositDialog';
import WithdrawDialog from '@/components/wallet/WithdrawDialog';
import ConvertWinningsDialog from '@/components/wallet/ConvertWinningsDialog';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';
import { useWalletSettings } from '@/context/wallet-settings-context';
import { format } from 'date-fns';
import type { Transaction } from '@/context/requests-context';

const WalletPage = () => {
    const { user, users } = useAuth();
    const { transactions } = useRequests();
    const { walletSettings } = useWalletSettings();

    const currentUser = users.find(u => u.id === user?.id);

    const balances = {
        deposit: currentUser?.depositBalance ?? 0,
        winnings: currentUser?.winningsBalance ?? 0,
        bonus: currentUser?.bonusBalance ?? 0,
    };
    const totalBalance = balances.deposit + balances.winnings + balances.bonus;
    
    const TransactionIcon = ({ type }: { type: Transaction['type'] }) => {
        switch (type) {
            case 'Deposit (Manual)':
            case 'Deposit (Auto)':
            case 'Winnings':
            case 'Conversion In':
                return <ArrowUpCircle className="h-8 w-8 text-green-500" />;
            case 'Withdrawal':
            case 'Entry Fee':
            case 'Conversion Out':
                return <ArrowDownCircle className="h-8 w-8 text-red-500" />;
            default:
                return <ArrowDownCircle className="h-8 w-8 text-red-500" />;
        }
    };

    const TransactionAmount = ({ amount }: { amount: number }) => {
        const isCredit = amount > 0;
        const formattedAmount = Math.abs(amount).toFixed(2);
        return (
            <span className={`text-lg font-bold ${isCredit ? 'text-green-500' : 'text-red-500'}`}>
                {isCredit ? '+' : '-'}₹{formattedAmount}
            </span>
        );
    };

    const isDepositDisabled = !walletSettings.paymentGatewayEnabled && !walletSettings.manualDepositEnabled;
    const DepositButtonWrapper = walletSettings.paymentGatewayEnabled ? AutomaticDepositDialog : ManualDepositDialog;

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Card className="bg-card border-secondary text-center shadow-lg">
                    <CardHeader>
                        <CardDescription>Total Balance</CardDescription>
                        <CardTitle className="text-5xl font-headline text-primary">
                            ₹{totalBalance.toFixed(2)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <DepositButtonWrapper>
                            <Button size="lg" className="font-bold text-lg h-14 bg-primary hover:bg-primary/90" disabled={isDepositDisabled}>
                               <PlusCircle className="mr-2"/> Deposit
                            </Button>
                        </DepositButtonWrapper>
                        <WithdrawDialog winningsBalance={balances.winnings}>
                            <Button size="lg" variant="outline" className="font-bold text-lg h-14 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                               <MinusCircle className="mr-2"/> Withdraw
                            </Button>
                        </WithdrawDialog>
                    </CardContent>
                </Card>

                <Card className="bg-card border-secondary">
                    <CardContent className="p-4 grid grid-cols-3 divide-x divide-border">
                        <div className="px-2 text-center">
                            <p className="text-xs text-muted-foreground">Deposit Cash</p>
                            <p className="font-bold text-primary-foreground">₹{balances.deposit.toFixed(2)}</p>
                        </div>
                        <div className="px-2 text-center">
                            <p className="text-xs text-muted-foreground">Winnings</p>
                            <p className="font-bold text-primary-foreground">₹{balances.winnings.toFixed(2)}</p>
                        </div>
                        <div className="px-2 text-center">
                            <p className="text-xs text-muted-foreground">Bonus</p>
                            <p className="font-bold text-primary-foreground">₹{balances.bonus.toFixed(2)}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary flex items-center justify-between">
                           <span>Convert Winnings</span>
                           <Repeat className="h-6 w-6" />
                        </CardTitle>
                        <CardDescription>
                            Move funds from your winnings to your deposit balance to join more matches.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ConvertWinningsDialog winningsBalance={balances.winnings}>
                            <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30">
                                Convert to Deposit Cash
                            </Button>
                        </ConvertWinningsDialog>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-xl font-headline text-primary mb-4">Recent Transactions</h2>
                     <div className="space-y-4">
                        {transactions.length > 0 ? (
                            transactions.map((tx) => (
                                 <div key={tx.id} className="flex items-center p-3 bg-secondary rounded-lg gap-4">
                                    <TransactionIcon type={tx.type} />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-primary-foreground">{tx.type}</p>
                                        <p className="text-sm text-muted-foreground">{tx.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{format(new Date(tx.date), "dd MMM yyyy, hh:mm a")}</p>
                                    </div>
                                    <TransactionAmount amount={tx.amount} />
                                </div>
                            ))
                         ) : (
                            <div className="text-center py-8 text-muted-foreground bg-secondary rounded-lg">
                                <p>You have no recent transactions.</p>
                            </div>
                         )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WalletPage;
