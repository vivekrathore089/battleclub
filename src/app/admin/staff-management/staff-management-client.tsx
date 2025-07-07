
'use client';

import { useState, type FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth-context';

import type { Staff, Permission } from '@/lib/staff-data';
import { useToast } from '@/hooks/use-toast';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';

const staffFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.'),
    email: z.string().email('Please enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters.').optional().or(z.literal('')),
    permissions: z.array(z.string()).min(1, 'Staff must have at least one permission.'),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

interface StaffManagementClientProps {
  allPermissions: Permission[];
}

const StaffManagementClient: FC<StaffManagementClientProps> = ({ allPermissions }) => {
    const { toast } = useToast();
    const { staffList, addStaff, updateStaff, deleteStaff } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [deletingStaff, setDeletingStaff] = useState<Staff | null>(null);

    const form = useForm<StaffFormValues>({
        resolver: zodResolver(staffFormSchema),
    });

    useEffect(() => {
        if (editingStaff) {
            form.reset({
                name: editingStaff.name,
                email: editingStaff.email,
                password: '', // Password is not edited, only set on creation
                permissions: editingStaff.permissions.map(p => p.id),
            });
        } else {
            form.reset({
                name: '',
                email: '',
                password: '',
                permissions: [],
            });
        }
    }, [editingStaff, form, isFormOpen]);
    
    const handleFormSubmit = (values: StaffFormValues) => {
        const permissions = values.permissions.map(pId => allPermissions.find(p => p.id === pId)!);

        if (editingStaff) {
            // Update existing staff
            const updatedStaff: Staff = { 
                ...editingStaff, 
                name: values.name,
                email: values.email,
                permissions: permissions
            };
            updateStaff(updatedStaff);
            toast({ title: "Staff Updated!", description: "The staff member's details have been updated." });
        } else {
            // Create new staff
            if (!values.password) {
                form.setError('password', { type: 'manual', message: 'Password is required for new staff members.' });
                return;
            }
            const newStaff: Omit<Staff, 'id'> = {
                name: values.name,
                email: values.email,
                password: values.password,
                permissions: permissions
            };
            addStaff(newStaff);
            toast({ title: "Staff Added!", description: "The new staff member has been created." });
        }
        setIsFormOpen(false);
        setEditingStaff(null);
    };

    const handleDeleteStaff = () => {
        if (!deletingStaff) return;
        deleteStaff(deletingStaff.id);
        toast({ title: "Staff Deleted", description: "The staff member has been removed." });
        setDeletingStaff(null);
    };

    const openFormDialog = (staff: Staff | null) => {
        setEditingStaff(staff);
        setIsFormOpen(true);
    };
    
    return (
        <>
            <div className="flex justify-end mb-4">
                <Button onClick={() => openFormDialog(null)} className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Staff Member
                </Button>
            </div>

            <div className="rounded-md border border-secondary">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {staffList.map((staff) => (
                            <TableRow key={staff.id}>
                                <TableCell className="font-medium text-primary-foreground">{staff.name}</TableCell>
                                <TableCell className="text-muted-foreground">{staff.email}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {staff.permissions.map(p => <Badge key={p.id} variant="secondary">{p.label}</Badge>)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-card border-secondary">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => openFormDialog(staff)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setDeletingStaff(staff)} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={(isOpen) => { if (!isOpen) setEditingStaff(null); setIsFormOpen(isOpen); }}>
                <DialogContent className="sm:max-w-xl bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary font-headline">{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</DialogTitle>
                        <DialogDescription>{editingStaff ? "Update the staff member's details and permissions." : "Fill out the form to create a new staff account."}</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="staff@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            {!editingStaff && (
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormDescription>The staff member will use this to log in.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            )}
                            <FormField
                                control={form.control}
                                name="permissions"
                                render={() => (
                                    <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base text-primary-foreground">Permissions</FormLabel>
                                        <FormDescription>
                                        Select the sections of the admin panel this staff member can access.
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {allPermissions.map((permission) => (
                                        <FormField
                                            key={permission.id}
                                            control={form.control}
                                            name="permissions"
                                            render={({ field }) => {
                                            return (
                                                <FormItem key={permission.id} className="flex flex-row items-center space-x-3 space-y-0 bg-secondary p-3 rounded-md">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(permission.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                ? field.onChange([...(field.value || []), permission.id])
                                                                : field.onChange((field.value || []).filter((value) => value !== permission.id));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-primary-foreground">
                                                        {permission.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                            }}
                                        />
                                        ))}
                                    </div>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

             {/* Delete Dialog */}
            <AlertDialog open={!!deletingStaff} onOpenChange={(isOpen) => !isOpen && setDeletingStaff(null)}>
                <AlertDialogContent className="bg-card border-secondary">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the staff account for <span className="font-bold text-primary-foreground">{deletingStaff?.name}</span>. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingStaff(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteStaff} className="bg-destructive hover:bg-destructive/90">
                            Yes, Delete Staff Member
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default StaffManagementClient;
