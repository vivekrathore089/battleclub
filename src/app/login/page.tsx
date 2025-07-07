
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import GameControllerIcon from '@/components/icons/game-controller-icon';
import { useToast } from '@/hooks/use-toast';
import { useAppInfo } from '@/context/app-info-context';
import { useAuth } from '@/context/auth-context';

const formSchema = z.object({
  identifier: z.string().min(1, { message: 'Please enter your email or mobile number.' }),
  password: z.string().min(1, { message: 'Please enter your password.' }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { appInfo } = useAppInfo();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const loginResult = login(values.identifier, values.password);

    if (!loginResult.success) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: loginResult.message,
      });
      return;
    }

    if (loginResult.role === 'admin' || loginResult.role === 'staff') {
       toast({
          title: loginResult.role === 'admin' ? 'Admin Login Successful' : 'Staff Login Successful',
          description: 'Welcome to the Control Panel!',
        });
        router.push('/admin');
    } else if (loginResult.role === 'user') {
       if (appInfo.maintenanceMode) {
          toast({
            variant: 'destructive',
            title: 'App Under Maintenance',
            description: 'The app is currently down for maintenance. Please try again later.',
          });
          return;
        }
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        router.push('/home');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <GameControllerIcon className="h-12 w-12 text-primary" />
        </div>
        <Card className="bg-card border-secondary">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline text-primary">Welcome Back!</CardTitle>
            <CardDescription>Sign in to continue to BATTLE CLUB</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
