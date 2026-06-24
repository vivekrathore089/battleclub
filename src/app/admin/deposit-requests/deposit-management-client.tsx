
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { DepositRequest } from '@/lib/deposit-data';
import { useRequests } from '@/context/requests-context';
import { useAuth } from '@/context/auth-context';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle } from 'lucide-react';

const DepositManagementClient = () => {
    const { toast } = useToast();
    const { depositRequests, processDepositRequest, addTransaction } = useRequests();
    const { updateUserWallet } = useAuth();
    const [action, setAction] = useState<{ type: 'approve' | 'reject'; request: DepositRequest | null }>({ type: 'approve', request: null });

    const handleAction = () => {
        if (!action.request) return;

        if (action.type === 'approve') {
             processDepositRequest(action.request.id, (userId, amount) => {
                updateUserWallet(userId, amount, 'deposit', 'add');
                addTransaction({
                    type: 'Deposit (Manual)',
                    amount: amount,
                    description: `Ref: ${action.request?.transactionId}`,
                });
            });
        } else {
            // If rejecting, we don't need a callback that modifies wallet.
            processDepositRequest(action.request.id, () => {});
        }
       
        toast({
            title: `Request ${action.type === 'approve' ? 'Approved' : 'Rejected'}`,
            description: `The deposit request for ${action.request.userName} has been processed.`,
        });
        setAction({ type: 'approve', request: null });
    };

    return (
        <>
            <div className="rounded-md border border-secondary">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Requested</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {depositRequests.length > 0 ? depositRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={request.userAvatar} alt={request.userName} data-ai-hint={request.userAvatarHint} />
                                            <AvatarFallback>{request.userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-semibold text-primary-foreground">{request.userName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-primary-foreground">₹{request.amount.toFixed(2)}</TableCell>
                                <TableCell className="text-muted-foreground">{request.transactionId}</TableCell>
                                <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(request.requestDate), { addSuffix: true })}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                            onClick={() => setAction({ type: 'approve', request })}
                                        >
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Approve
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                                            onClick={() => setAction({ type: 'reject', request })}
                                        >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No pending deposit requests.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!action.request} onOpenChange={(isOpen) => !isOpen && setAction({ type: 'approve', request: null })}>
                <AlertDialogContent className="bg-card border-secondary">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to {action.type} a deposit request of <span className="font-bold text-primary-foreground">₹{action.request?.amount.toFixed(2)}</span> for <span className="font-bold text-primary-foreground">{action.request?.userName}</span>. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAction({ type: 'approve', request: null })}>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleAction} 
                            className={action.type === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-destructive hover:bg-destructive/90'}
                        >
                            Yes, {action.type === 'approve' ? 'Approve' : 'Reject'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DepositManagementClient;
