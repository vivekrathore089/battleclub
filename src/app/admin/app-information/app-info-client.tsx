'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useAppInfo } from '@/context/app-info-context';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const appInfoSchema = z.object({
    oneAccountPerDevice: z.boolean().default(false),
    supportNumber: z.string().min(10, { message: 'Support number must be at least 10 digits.' }),
    appLink: z.string().url({ message: 'Please enter a valid app link.' }),
    maintenanceMode: z.boolean().default(false),
    forceUpdate: z.boolean().default(false),
    latestAppLink: z.string().url({ message: 'Please enter a valid latest app link.' }),
});

type AppInfoFormValues = z.infer<typeof appInfoSchema>;

export default function AppInfoClient() {
    const { toast } = useToast();
    const { appInfo, setAppInfo } = useAppInfo();

    const form = useForm<AppInfoFormValues>({
        resolver: zodResolver(appInfoSchema),
    });
    
    useEffect(() => {
        form.reset(appInfo);
    }, [appInfo, form]);


    const forceUpdateValue = form.watch('forceUpdate');

    const onSubmit = (values: AppInfoFormValues) => {
        console.log('Saving new app info:', values);
        setAppInfo(values);
        toast({
            title: 'Settings Updated!',
            description: 'The application settings have been successfully updated.',
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="supportNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Support Number (WhatsApp)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 91xxxxxxxxxx" {...field} />
                                </FormControl>
                                <FormDescription>This number will be used for the customer support link.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>App Link</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://play.google.com/..." {...field} />
                                </FormControl>
                                <FormDescription>This link is used in the "Refer & Earn" feature.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="oneAccountPerDevice"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                <div className="space-y-0.5">
                                    <FormLabel>One Account Per Device</FormLabel>
                                    <FormDescription>Prevent users from creating multiple accounts on a single device.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maintenanceMode"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                <div className="space-y-0.5">
                                    <FormLabel>App Maintenance</FormLabel>
                                    <FormDescription>When enabled, users will not be able to access the app.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="forceUpdate"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                <div className="space-y-0.5">
                                    <FormLabel>Force App Update</FormLabel>
                                    <FormDescription>Force users to update to the latest version of the app.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                    {forceUpdateValue && (
                        <FormField
                            control={form.control}
                            name="latestAppLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latest App Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://play.google.com/..." {...field} />
                                    </FormControl>
                                    <FormDescription>The link to the newest version of your application.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save All Settings
                </Button>
            </form>
        </Form>
    );
}
