'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const noticeSchema = z.object({
    message: z.string().min(10, { message: 'Notice must be at least 10 characters.' }).max(200, { message: 'Notice cannot be longer than 200 characters.' }),
});

type NoticeFormValues = z.infer<typeof noticeSchema>;

export default function AdminNoticeClient({ initialNotice }: { initialNotice: string }) {
    const { toast } = useToast();

    const form = useForm<NoticeFormValues>({
        resolver: zodResolver(noticeSchema),
        defaultValues: {
            message: initialNotice,
        },
    });

    const onSubmit = (values: NoticeFormValues) => {
        // In a real app, you would save this to your database.
        // For this demo, we'll just log it and show a toast.
        console.log('Saving new admin notice:', values.message);
        toast({
            title: 'Notice Updated!',
            description: 'The admin notice has been successfully updated.',
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notice Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter your announcement here..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save Notice
                </Button>
            </form>
        </Form>
    );
}
