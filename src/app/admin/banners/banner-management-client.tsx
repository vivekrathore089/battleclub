'use client';

import { useState, type FC, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Banner } from '@/lib/banner-data';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2, Edit, Link2, Link2Off } from 'lucide-react';

const bannerFormSchema = z.object({
    src: z.string().url({ message: 'Please enter a valid image URL.' }),
    hint: z.string().min(2, { message: 'Hint must be at least 2 characters.' }),
    link: z.string().optional(),
    clickable: z.boolean().default(false),
});
type BannerFormValues = z.infer<typeof bannerFormSchema>;

const BannerManagementClient: FC<{ initialBanners: Banner[] }> = ({ initialBanners }) => {
    const { toast } = useToast();
    const [banners, setBanners] = useState<Banner[]>(initialBanners.slice(0, 5));
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [deletingBanner, setDeletingBanner] = useState<Banner | null>(null);

    const form = useForm<BannerFormValues>({
        resolver: zodResolver(bannerFormSchema),
    });

    const isBannerLimitReached = banners.length >= 5;

    useEffect(() => {
        if (editingBanner) {
            form.reset({
                src: editingBanner.src,
                hint: editingBanner.hint,
                link: editingBanner.link || '',
                clickable: editingBanner.clickable,
            });
        } else {
            form.reset({
                src: 'https://placehold.co/600x300.png',
                hint: '',
                link: '',
                clickable: false,
            });
        }
    }, [editingBanner, form, isFormOpen]);

    const handleFormSubmit = (values: BannerFormValues) => {
        if (editingBanner) {
            // Update existing banner
            const updatedBanner: Banner = { 
                ...editingBanner, 
                ...values,
                alt: values.hint, // Use hint as alt text
                link: values.clickable ? values.link : undefined,
            };
            setBanners(banners.map(b => b.id === editingBanner.id ? updatedBanner : b));
            toast({ title: "Banner Updated!", description: "The banner has been successfully updated." });
        } else {
            if (isBannerLimitReached) {
                toast({
                    title: "Banner Limit Reached",
                    description: "You can only add up to 5 banners. Please remove one to add another.",
                    variant: "destructive",
                });
                setIsFormOpen(false);
                return;
            }
            // Create new banner
            const newBanner: Banner = {
                id: `banner-${Date.now()}`,
                ...values,
                alt: values.hint, // Use hint as alt text
                link: values.clickable ? values.link : undefined,
            };
            setBanners(prev => [newBanner, ...prev]);
            toast({ title: "Banner Added!", description: "The new banner has been added." });
        }
        setIsFormOpen(false);
        setEditingBanner(null);
    };

    const handleDeleteBanner = () => {
        if (!deletingBanner) return;
        setBanners(banners.filter(b => b.id !== deletingBanner.id));
        toast({ title: "Banner Deleted", description: "The banner has been removed." });
        setDeletingBanner(null);
    };

    const openFormDialog = (banner: Banner | null) => {
        if (!banner && isBannerLimitReached) {
             toast({
                title: "Banner Limit Reached",
                description: "You can only add up to 5 banners.",
                variant: "destructive",
            });
            return;
        }
        setEditingBanner(banner);
        setIsFormOpen(true);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">
                    You have {banners.length} of 5 banners.
                </p>
                <Button onClick={() => openFormDialog(null)} className="bg-primary hover:bg-primary/90" disabled={isBannerLimitReached}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Banner
                </Button>
            </div>

            <div className="space-y-4">
                {banners.map(banner => (
                    <div key={banner.id} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-secondary rounded-lg">
                        <Image src={banner.src} alt={banner.alt} width={200} height={100} className="rounded-md object-cover aspect-[2/1]" data-ai-hint={banner.hint} />
                        <div className="flex-grow space-y-2">
                           <p className="font-semibold text-primary-foreground">{banner.alt}</p>
                           <div className="flex items-center gap-2 text-xs text-muted-foreground">
                               {banner.clickable && banner.link ? <Link2 className="w-4 h-4 text-primary" /> : <Link2Off className="w-4 h-4" />}
                               <span>{banner.clickable && banner.link ? banner.link : 'Not clickable'}</span>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <Button variant="outline" size="icon" onClick={() => openFormDialog(banner)}><Edit className="w-4 h-4"/></Button>
                           <Button variant="destructive" size="icon" onClick={() => setDeletingBanner(banner)}><Trash2 className="w-4 h-4"/></Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isFormOpen} onOpenChange={(isOpen) => { if (!isOpen) setEditingBanner(null); setIsFormOpen(isOpen); }}>
                <DialogContent className="sm:max-w-lg bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary font-headline">{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
                        <DialogDescription>{editingBanner ? 'Update the details for this banner.' : 'Fill out the form to add a new banner.'}</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                            <FormField control={form.control} name="src" render={({ field }) => (
                                <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://placehold.co/600x300.png" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="hint" render={({ field }) => (
                                <FormItem><FormLabel>Image Hint / Alt Text</FormLabel><FormControl><Input placeholder="e.g., esports tournament" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="clickable" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-secondary">
                                    <div className="space-y-0.5">
                                        <FormLabel>Make banner clickable?</FormLabel>
                                        <p className="text-xs text-muted-foreground">If enabled, users can click the banner to navigate to a link.</p>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}/>
                            {form.watch('clickable') && (
                                <FormField control={form.control} name="link" render={({ field }) => (
                                    <FormItem><FormLabel>Link URL (e.g., /matches/some-match)</FormLabel><FormControl><Input placeholder="/matches/..." {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            )}
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save Banner</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog open={!!deletingBanner} onOpenChange={(isOpen) => !isOpen && setDeletingBanner(null)}>
                <AlertDialogContent className="bg-card border-secondary">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the banner.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingBanner(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBanner} className="bg-destructive hover:bg-destructive/90">
                            Yes, Delete Banner
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default BannerManagementClient;
