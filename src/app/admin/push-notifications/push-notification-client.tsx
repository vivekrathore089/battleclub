'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const notificationSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
    imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }).optional().or(z.literal('')),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export default function PushNotificationClient() {
    const { toast } = useToast();
    const [isSending, setIsSending] = useState(false);

    const form = useForm<NotificationFormValues>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            title: '',
            message: '',
            imageUrl: '',
        },
    });

    const imageUrlValue = form.watch('imageUrl');

    const onSubmit = (values: NotificationFormValues) => {
        setIsSending(true);
        console.log('Sending push notification:', values);
        // Here you would typically call a server action or API endpoint
        // that uses the Firebase Admin SDK to send the notification.
        
        // Simulate network delay
        setTimeout(() => {
            toast({
                title: 'Notification Sent!',
                description: 'Your push notification has been queued for delivery.',
            });
            form.reset();
            setIsSending(false);
        }, 1500);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notification Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., New Tournament Alert!" {...field} disabled={isSending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notification Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter the body of your notification..."
                                    className="min-h-[120px]"
                                    {...field}
                                    disabled={isSending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.png" {...field} disabled={isSending} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {imageUrlValue && (
                     <div className="space-y-2">
                        <FormLabel>Image Preview</FormLabel>
                        <div className="p-2 bg-secondary rounded-lg flex justify-center items-center">
                            <Image
                                key={imageUrlValue}
                                src={imageUrlValue}
                                alt="Notification Preview"
                                width={300}
                                height={150}
                                data-ai-hint="notification image"
                                className="rounded-md object-cover aspect-[2/1]"
                                unoptimized
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}

                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSending}>
                    {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSending ? 'Sending...' : 'Send to All Users'}
                </Button>
            </form>
        </Form>
    );
}
