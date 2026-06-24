
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Wallet, Copy, Globe } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useWalletSettings } from '@/context/wallet-settings-context';
import { Alert, AlertTitle } from '@/components/ui/alert';

const walletSettingsSchema = z.object({
  upiId: z.string().min(5, 'UPI ID is too short').includes('@', { message: 'Please enter a valid UPI ID.' }),
  qrCodeUrl: z.string().url('Please enter a valid URL for the QR code image.'),
  minDeposit: z.coerce.number().min(0, "Minimum deposit can't be negative."),
  minWithdrawal: z.coerce.number().min(1, "Minimum withdrawal must be at least 1."),
  referralBonus: z.coerce.number().min(0, "Referral bonus can't be negative."),
  paymentGatewayEnabled: z.boolean().default(false),
  manualDepositEnabled: z.boolean().default(false),
  paymentGatewayApiKey: z.string().optional(),
  bonusUsagePercentage: z.coerce.number().min(0, "Percentage must be 0 or more.").max(100, "Percentage cannot exceed 100."),
  paidMatchJoinBonus: z.coerce.number().min(0, "Bonus must be 0 or more."),
}).refine(data => data.paymentGatewayEnabled || data.manualDepositEnabled, {
    message: "At least one deposit method (Payment Gateway or Manual) must be enabled.",
    path: ["manualDepositEnabled"],
});

type WalletSettingsFormValues = z.infer<typeof walletSettingsSchema>;

const WEBHOOK_URL = 'https://yourapp.com/api/webhooks/payment';

export default function WalletSettingsPage() {
  const { toast } = useToast();
  const { walletSettings, setWalletSettings } = useWalletSettings();

  const form = useForm<WalletSettingsFormValues>({
    resolver: zodResolver(walletSettingsSchema),
    defaultValues: walletSettings,
  });

  useEffect(() => {
    form.reset(walletSettings);
  }, [walletSettings, form]);

  const qrCodePreview = form.watch('qrCodeUrl');
  const isGatewayEnabled = form.watch('paymentGatewayEnabled');

  const handleSave = (values: WalletSettingsFormValues) => {
    setWalletSettings(values);
    console.log('Saving new wallet settings:', values);
    toast({
      title: 'Settings Saved!',
      description: 'The wallet settings have been updated.',
    });
  };

  const handleCopyWebhook = () => {
      navigator.clipboard.writeText(WEBHOOK_URL).then(() => {
          toast({ title: "Copied!", description: "Webhook URL copied to clipboard." });
      });
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <div className="p-4 space-y-6 container mx-auto max-w-2xl pb-24 md:pb-8">
        <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline">
          <ChevronLeft className="w-5 h-5" />
          Back to Admin Panel
        </Link>
        <Card className="bg-card border-secondary">
          <CardHeader>
            <CardTitle className="font-headline text-primary text-3xl flex items-center gap-3">
              <Wallet />
              Wallet Settings
            </CardTitle>
            <CardDescription>
              Update the UPI ID, QR code, and other financial settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                
                <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">Deposit Methods</h3>
                    <p className="text-sm text-muted-foreground mb-4">Configure how users can add money to their wallets.</p>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="paymentGatewayEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                    <div className="space-y-0.5">
                                        <FormLabel>Enable Payment Gateway (Automatic)</FormLabel>
                                        <FormDescription>Allow users to deposit money automatically via a third-party gateway.</FormDescription>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                        {isGatewayEnabled && (
                            <div className="space-y-4 p-4 border rounded-lg bg-secondary/50">
                                <FormField
                                    control={form.control}
                                    name="paymentGatewayApiKey"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Payment Gateway API Key</FormLabel>
                                            <FormControl><Input type="password" placeholder="••••••••••••••••••••" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Alert>
                                    <Globe className="h-4 w-4" />
                                    <AlertTitle className="font-semibold">Webhook URL</AlertTitle>
                                    <FormDescription className="flex items-center justify-between">
                                        <span>Use this URL in your payment gateway's dashboard.</span>
                                        <Button type="button" variant="ghost" size="sm" onClick={handleCopyWebhook} className="gap-2">
                                            <Copy className="h-3 w-3"/> Copy
                                        </Button>
                                    </FormDescription>
                                    <code className="text-xs font-mono bg-background p-2 rounded-md block mt-2">{WEBHOOK_URL}</code>
                                </Alert>
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="manualDepositEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                    <div className="space-y-0.5">
                                        <FormLabel>Enable Manual Deposit</FormLabel>
                                        <FormDescription>Allow users to deposit by sending you money and a transaction ID.</FormDescription>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                         <FormMessage />
                    </div>
                </div>

                <Separator className="my-8" />
                
                <div>
                  <h3 className="text-lg font-medium text-primary-foreground mb-1">Manual Payment Details</h3>
                  <p className="text-sm text-muted-foreground mb-4">Update the UPI ID and QR code used for user deposits if manual mode is on.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="upiId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UPI ID</FormLabel>
                            <FormControl>
                              <Input placeholder="your-upi@bank" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qrCodeUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>QR Code Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/qr.png" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>QR Code Preview</FormLabel>
                      <div className="p-4 bg-secondary rounded-lg flex justify-center">
                          {qrCodePreview && (
                              <Image
                                  src={qrCodePreview}
                                  alt="QR Code Preview"
                                  width={150}
                                  height={150}
                                  data-ai-hint="qr code"
                                  className="rounded-md border-2 border-primary"
                                  unoptimized
                                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150.png'; }}
                              />
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />
                
                <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">Transaction & Bonus Settings</h3>
                    <p className="text-sm text-muted-foreground mb-4">Control minimum transaction amounts and referral rewards.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="minDeposit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min. Deposit (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 10" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="minWithdrawal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Min. Withdrawal (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referralBonus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Referral Bonus (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 10" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator className="my-8" />

                <div>
                    <h3 className="text-lg font-medium text-primary-foreground mb-1">Bonus Configuration</h3>
                    <p className="text-sm text-muted-foreground mb-4">Control how bonus cash is used and earned.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="bonusUsagePercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bonus Usage (%)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 30" {...field} />
                                    </FormControl>
                                    <FormDescription>The percentage of an entry fee that can be paid with bonus cash.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paidMatchJoinBonus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Paid Match Join Bonus (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g., 5" {...field} />
                                    </FormControl>
                                    <FormDescription>Bonus awarded to a user for joining any paid match.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit" className="bg-primary hover:bg-primary/90 mt-8 !w-full md:!w-auto">
                  Save All Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
