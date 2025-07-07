'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useEffect } from 'react';

const formSchema = z.object({
    name: z.string().min(3, { message: 'Username must be at least 3 characters long.' }),
    gameUsername: z.string().min(3, { message: 'Game Username must be at least 3 characters long.' }),
    gameUid: z.string().min(5, { message: 'Game UID must be at least 5 characters long.' }),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters long.' }).optional().or(z.literal('')),
    confirmPassword: z.string().optional(),
}).refine((data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
    }
    return true;
}, {
    message: "New passwords don't match.",
    path: ['confirmPassword'],
}).refine((data) => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: 'Current password is required to change your password.',
    path: ['currentPassword'],
});

type ProfileFormValues = z.infer<typeof formSchema>;

export default function EditProfilePage() {
    const { toast } = useToast();
    const { user, users, updateUserProfile } = useAuth();
    const currentUser = users.find(u => u.id === user?.id);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            gameUsername: '',
            gameUid: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (currentUser) {
            form.reset({
                name: currentUser.name,
                gameUsername: currentUser.gameUsername,
                gameUid: currentUser.gameUid,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    }, [currentUser, form]);

    function onSubmit(data: ProfileFormValues) {
        if (!currentUser) return;
        
        updateUserProfile(currentUser.id, {
            name: data.name,
            gameUsername: data.gameUsername,
            gameUid: data.gameUid
        });

        // Handle password change if provided
        if (data.newPassword && data.currentPassword) {
            // In a real app, you'd have a dedicated API for this.
            // Here we just check the mock password.
            if (data.currentPassword === currentUser.password) {
                 toast({
                    title: 'Password Updated',
                    description: 'Your password has been changed.',
                });
            } else {
                 toast({
                    title: 'Password Error',
                    description: 'Your current password was incorrect.',
                    variant: 'destructive',
                });
            }
        }
        
        toast({
            title: 'Profile Updated',
            description: 'Your changes have been saved successfully.',
        });

        form.reset({
            ...data,
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    }

    if (!currentUser) {
        return <div>Loading...</div>; // Or some other loading state
    }

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-4">
                <Link href="/profile" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Profile
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl">Edit Profile</CardTitle>
                        <CardDescription>Manage your account settings and set a new password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium text-primary-foreground">Profile Details</h3>
                                    <p className="text-sm text-muted-foreground">Update your public profile and in-game information.</p>
                                </div>
                                <div className="space-y-4">
                                     <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gameUsername"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Game Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your in-game name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="gameUid"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Game UID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your game user ID" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={currentUser.email} disabled />
                                        <p className="text-[0.8rem] text-muted-foreground">
                                            Email address cannot be changed.
                                        </p>
                                    </div>
                                </div>
                                
                                <Separator />

                                <div>
                                    <h3 className="text-lg font-medium text-primary-foreground">Change Password</h3>
                                    <p className="text-sm text-muted-foreground">Leave fields blank to keep your current password.</p>
                                </div>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
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
                                        control={form.control}
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
                                </div>
                                
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save Changes</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
