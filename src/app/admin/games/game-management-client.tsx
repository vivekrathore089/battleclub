

'use client';

import { useState, type FC, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Game } from '@/lib/game-data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Edit, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const gameFormSchema = z.object({
    name: z.string().min(3, { message: 'Game name must be at least 3 characters.' }),
    image: z.string().url({ message: 'Please enter a valid image URL.' }),
    hint: z.string().min(2, { message: 'Hint must be at least 2 characters.' }),
});
type GameFormValues = z.infer<typeof gameFormSchema>;

const GameManagementClient: FC = () => {
    const { toast } = useToast();
    const { games, updateGame } = useAuth();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingGame, setEditingGame] = useState<Game | null>(null);

    const form = useForm<GameFormValues>({
        resolver: zodResolver(gameFormSchema),
    });

    useEffect(() => {
        if (editingGame) {
            form.reset({
                name: editingGame.name,
                image: editingGame.image,
                hint: editingGame.hint,
            });
        }
    }, [editingGame, form]);

    const handleEditGame = (values: GameFormValues) => {
        if (!editingGame) return;

        updateGame(editingGame.slug, values);
        
        toast({
            title: 'Game Updated!',
            description: `${values.name} has been updated.`,
        });
        setIsEditDialogOpen(false);
        setEditingGame(null);
    };

    const openEditDialog = (game: Game) => {
        setEditingGame(game);
        setIsEditDialogOpen(true);
    };

    const handleToggleVisibility = (game: Game) => {
        updateGame(game.slug, { visible: !game.visible });
        toast({
            title: `Game ${!game.visible ? 'Shown' : 'Hidden'}`,
            description: `${game.name} is now ${!game.visible ? 'visible' : 'hidden'} to users.`,
        });
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {games.map(game => (
                    <div key={game.slug} className={cn("relative group text-center", !game.visible && "opacity-60")}>
                         <div className="bg-card border-none overflow-hidden rounded-lg">
                            <Image src={game.image} alt={game.name} width={150} height={200} className="w-full h-auto rounded-lg" data-ai-hint={game.hint} />
                            <p className="mt-2 text-sm font-semibold truncate text-primary-foreground">{game.name}</p>
                        </div>
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                            <Button variant="outline" size="icon" onClick={() => openEditDialog(game)}>
                                <Edit className="w-5 h-5" />
                                <span className="sr-only">Edit {game.name}</span>
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleToggleVisibility(game)}>
                                {game.visible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                <span className="sr-only">{game.visible ? 'Hide' : 'Show'} {game.name}</span>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

             <Dialog open={isEditDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) setEditingGame(null); setIsEditDialogOpen(isOpen); }}>
                <DialogContent className="sm:max-w-md bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary">Edit Game</DialogTitle>
                        <DialogDescription>
                            Update the details for {editingGame?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEditGame)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Game Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Apex Legends" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://placehold.co/150x200.png" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="hint"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image Hint</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., sci-fi battle" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GameManagementClient;
