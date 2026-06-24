
'use client';

import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

import type { User } from '@/lib/staff-data';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Coins, MoreHorizontal, PenSquare, Ban, Key } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const walletFormSchema = z.object({
    amount: z.coerce.number().positive({ message: "Amount must be positive." }),
    action: z.enum(['add', 'remove'], { required_error: 'You must select an action.' }),
    balanceType: z.enum(['deposit', 'winnings', 'bonus'], { required_error: 'You must select a balance type.'})
});
type WalletFormValues = z.infer<typeof walletFormSchema>;

const passwordFormSchema = z.object({
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
});
type PasswordFormValues = z.infer<typeof passwordFormSchema>;


const UserManagementClient: FC = () => {
    const { toast } = useToast();
    const { users, updateUserWallet, toggleUserStatus } = useAuth();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [banningUser, setBanningUser] = useState<User | null>(null);
    const [passwordUser, setPasswordUser] = useState<User | null>(null);

    const form = useForm<WalletFormValues>({
        resolver: zodResolver(walletFormSchema),
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        }
    });

    const handleWalletUpdate = (values: WalletFormValues) => {
        if (!editingUser) return;
        
        updateUserWallet(editingUser.id, values.amount, values.balanceType, values.action);

        toast({
            title: 'Wallet Updated',
            description: `Successfully updated ${editingUser.name}'s wallet.`,
        });
        setEditingUser(null);
        form.reset();
    };

    const handlePasswordUpdate = (values: PasswordFormValues) => {
        if (!passwordUser) return;
        
        console.log(`Updating password for ${passwordUser.name} to ${values.newPassword}`);

        toast({
            title: 'Password Updated',
            description: `Successfully updated password for ${passwordUser.name}.`,
        });
        setPasswordUser(null);
        passwordForm.reset();
    };

    const handleBanUser = () => {
        if (!banningUser) return;

        toggleUserStatus(banningUser.id);

        toast({
            title: `User ${banningUser.status === 'Active' ? 'Banned' : 'Unbanned'}`,
            description: `${banningUser.name} has been ${banningUser.status === 'Active' ? 'banned' : 'unbanned'}.`,
        });
        setBanningUser(null);
    };
    
    const totalBalance = (user: User) => user.depositBalance + user.winningsBalance + user.bonusBalance;

    return (
        <>
            <div className="rounded-md border border-secondary">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Wallet Balance</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.avatarHint} />
                                            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-primary-foreground">{user.name}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>₹{totalBalance(user).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={cn(user.status === 'Active' && 'bg-green-500/20 text-green-500 border-transparent')}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{format(new Date(user.joinDate), 'dd MMM, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-card border-secondary">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => setEditingUser(user)}>
                                                <PenSquare className="mr-2 h-4 w-4" />
                                                <span>Edit Wallet</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setPasswordUser(user)}>
                                                <Key className="mr-2 h-4 w-4" />
                                                <span>Update Password</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setBanningUser(user)} className={user.status === 'Banned' ? "text-green-500 focus:text-green-500" : "text-destructive focus:text-destructive"}>
                                                <Ban className="mr-2 h-4 w-4" />
                                                <span>{user.status === 'Banned' ? 'Unban' : 'Ban'} User</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Wallet Dialog */}
            <Dialog open={!!editingUser} onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}>
                <DialogContent className="sm:max-w-md bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary flex items-center gap-2"><Coins />Edit Wallet for {editingUser?.name}</DialogTitle>
                        <DialogDescription>
                            Current Balance: ₹{editingUser ? totalBalance(editingUser).toFixed(2) : '0.00'}. Add or remove funds below.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleWalletUpdate)} className="space-y-4">
                             <FormField
                                control={form.control}
                                name="balanceType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Balance Type</FormLabel>
                                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select balance to modify" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="deposit">Deposit (₹{editingUser?.depositBalance.toFixed(2)})</SelectItem>
                                                <SelectItem value="winnings">Winnings (₹{editingUser?.winningsBalance.toFixed(2)})</SelectItem>
                                                <SelectItem value="bonus">Bonus (₹{editingUser?.bonusBalance.toFixed(2)})</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g., 100" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="action"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Action</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="add" /></FormControl>
                                                    <Label className="font-normal">Add Funds</Label>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl><RadioGroupItem value="remove" /></FormControl>
                                                    <Label className="font-normal">Remove Funds</Label>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setEditingUser(null)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Update Wallet</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            
            {/* Update Password Dialog */}
            <Dialog open={!!passwordUser} onOpenChange={(isOpen) => !isOpen && setPasswordUser(null)}>
                <DialogContent className="sm:max-w-md bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary flex items-center gap-2"><Key className="h-5 w-5" />Update Password for {passwordUser?.name}</DialogTitle>
                        <DialogDescription>
                            Enter and confirm the new password for the user.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setPasswordUser(null)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Update Password</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Ban User Alert Dialog */}
            <AlertDialog open={!!banningUser} onOpenChange={(isOpen) => !isOpen && setBanningUser(null)}>
                <AlertDialogContent className="bg-card border-secondary">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will {banningUser?.status === 'Active' ? 'ban' : 'unban'} the user <span className="font-bold text-primary-foreground">{banningUser?.name}</span>. They will {banningUser?.status === 'Active' ? 'no longer be able to' : 'once again be able to'} access the app.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setBanningUser(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBanUser} className={banningUser?.status === 'Banned' ? 'bg-green-600 hover:bg-green-700' : 'bg-destructive hover:bg-destructive/90'}>
                            Yes, {banningUser?.status === 'Active' ? 'Ban' : 'Unban'} User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default UserManagementClient;
