

'use client';

import { useState, type FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Match, MatchParticipant } from '@/lib/match-data';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle, MoreHorizontal, Edit, Trash2, CalendarIcon, Award, KeyRound } from 'lucide-react';

const matchFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters."),
    game: z.string().min(1, "Please select a game."),
    date: z.date({ required_error: "A date is required." }),
    time: z.string().min(1, "Time is required."),
    prize: z.string().min(1, "Prize pool is required."),
    perKillPrize: z.string().min(1, "Per kill prize is required."),
    entryFee: z.string().min(1, "Entry fee is required."),
    teamSize: z.string().min(1, "Team size is required."),
    totalTeams: z.coerce.number().min(2, "Must have at least 2 teams."),
    status: z.enum(['Upcoming', 'Ongoing', 'Completed']),
    image: z.string().url("Please enter a valid URL."),
    imageHint: z.string().min(2, "Hint must be at least 2 characters."),
    description: z.string().optional(),
    rules: z.string().optional(),
});
type MatchFormValues = z.infer<typeof matchFormSchema>;

const roomDetailsSchema = z.object({
    roomId: z.string().min(1, "Room ID is required."),
    roomPass: z.string().min(1, "Password is required."),
});
type RoomDetailsFormValues = z.infer<typeof roomDetailsSchema>;

const MatchManagementClient: FC = () => {
    const { toast } = useToast();
    const { matches, games, addMatch, updateMatch, deleteMatch } = useAuth();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);
    const [deletingMatch, setDeletingMatch] = useState<Match | null>(null);
    const [publishingResultMatch, setPublishingResultMatch] = useState<Match | null>(null);
    const [updatingRoomMatch, setUpdatingRoomMatch] = useState<Match | null>(null);
    const [participantRanks, setParticipantRanks] = useState<{ [gameUsername: string]: string }>({});

    const form = useForm<MatchFormValues>({
        resolver: zodResolver(matchFormSchema),
    });
    
    const roomDetailsForm = useForm<RoomDetailsFormValues>({
        resolver: zodResolver(roomDetailsSchema),
    });

    const visibleGamesForDropdown = useMemo(() => {
        const visible = games.filter(g => g.visible);
        if (editingMatch) {
            const currentGame = games.find(g => g.name === editingMatch.game);
            if (currentGame && !currentGame.visible) {
                // To prevent duplicates if the currentGame is already in visible list (which it won't be but good practice)
                if (!visible.some(g => g.slug === currentGame.slug)) {
                    return [...visible, currentGame].sort((a,b) => a.name.localeCompare(b.name));
                }
            }
        }
        return visible;
    }, [games, editingMatch]);


    useEffect(() => {
        if (editingMatch) {
            form.reset({
                ...editingMatch,
                date: new Date(editingMatch.date),
                rules: Array.isArray(editingMatch.rules) ? editingMatch.rules.join('\n') : '',
            });
        } else {
            form.reset({
                title: '',
                game: '',
                date: new Date(),
                time: '',
                prize: '',
                perKillPrize: '',
                entryFee: '',
                teamSize: '',
                totalTeams: 10,
                status: 'Upcoming',
                image: 'https://placehold.co/400x200.png',
                imageHint: '',
                description: '',
                rules: '',
            });
        }
    }, [editingMatch, form, isFormOpen]);

    const handleFormSubmit = (values: MatchFormValues) => {
        const matchData = { 
            ...values,
            date: format(values.date, 'yyyy-MM-dd'),
            description: values.description || '',
            rules: values.rules?.split('\n').filter(rule => rule.trim() !== '') || [],
        };

        if (editingMatch) {
            updateMatch({ ...editingMatch, ...matchData });
            toast({ title: "Match Updated!", description: `${values.title} has been updated.` });
        } else {
            addMatch(matchData);
            toast({ title: "Match Created!", description: `${values.title} has been added.` });
        }
        setIsFormOpen(false);
        setEditingMatch(null);
    };

    const handleDeleteMatch = () => {
        if (!deletingMatch) return;
        deleteMatch(deletingMatch.id);
        toast({ title: "Match Deleted", description: `${deletingMatch.title} has been removed.` });
        setDeletingMatch(null);
    };
    
    const handlePublishResults = () => {
        if (!publishingResultMatch) return;

        const updatedParticipants = publishingResultMatch.participants.map(p => {
            const rank = participantRanks[p.gameUsername];
            return {
                ...p,
                rank: rank && !isNaN(parseInt(rank, 10)) ? parseInt(rank, 10) : undefined,
            };
        }).sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity));
        
        const updatedMatch: Match = { 
            ...publishingResultMatch, 
            participants: updatedParticipants, 
            status: 'Completed' as const 
        };
        
        updateMatch(updatedMatch);

        toast({
            title: "Results Published!",
            description: `Results for ${publishingResultMatch.title} have been published. Prize money has been distributed to the rank 1 winner.`
        });
        setPublishingResultMatch(null);
    };

    const openFormDialog = (match: Match | null) => {
        setEditingMatch(match);
        setIsFormOpen(true);
    };
    
    const openPublishDialog = (match: Match) => {
        const initialRanks = match.participants.reduce((acc, p) => {
            acc[p.gameUsername] = p.rank?.toString() ?? '';
            return acc;
        }, {} as {[key: string]: string});
        setParticipantRanks(initialRanks);
        setPublishingResultMatch(match);
    };

    const handleRankChange = (participantGameUsername: string, rank: string) => {
        setParticipantRanks(prev => ({ ...prev, [participantGameUsername]: rank }));
    };

    const openUpdateRoomDialog = (match: Match) => {
        roomDetailsForm.reset({
            roomId: match.roomDetails?.id || '',
            roomPass: match.roomDetails?.pass || '',
        });
        setUpdatingRoomMatch(match);
    };

    const handleUpdateRoomDetails = (values: RoomDetailsFormValues) => {
        if (!updatingRoomMatch) return;
    
        updateMatch({ ...updatingRoomMatch, roomDetails: { id: values.roomId, pass: values.roomPass } });
        
        toast({
            title: "Room Details Updated!",
            description: `Notifications are being sent to ${updatingRoomMatch.joinedTeams} users.`,
        });
    
        // Simulate sending 4 notifications with a 5-second gap for demonstration
        const NOTIFICATION_COUNT = 4;
        const NOTIFICATION_INTERVAL = 5000; // 5 seconds, in a real app this would be ~60000 (1 minute)
    
        for (let i = 0; i < NOTIFICATION_COUNT; i++) {
            setTimeout(() => {
                toast({
                    title: `Match Alert! (${i + 1}/${NOTIFICATION_COUNT})`,
                    description: `Room ID: ${values.roomId} | Pass: ${values.roomPass}. The match "${updatingRoomMatch.title}" is starting soon!`,
                });
            }, (i + 1) * NOTIFICATION_INTERVAL);
        }
        
        setUpdatingRoomMatch(null);
        roomDetailsForm.reset();
    };

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button onClick={() => openFormDialog(null)} className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Match
                </Button>
            </div>

            <div className="rounded-md border border-secondary">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Match</TableHead>
                            <TableHead>Game</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Fee/Prize</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches.map((match) => (
                            <TableRow key={match.id}>
                                <TableCell className="font-medium text-primary-foreground">{match.title}</TableCell>
                                <TableCell>{match.game}</TableCell>
                                <TableCell>{format(new Date(match.date), 'dd MMM yyyy')} - {match.time}</TableCell>
                                <TableCell>₹{match.entryFee} / ₹{match.prize}</TableCell>
                                <TableCell><Badge variant={match.status === 'Upcoming' ? 'default' : match.status === 'Ongoing' ? 'destructive' : 'secondary'}>{match.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-card border-secondary">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => openFormDialog(match)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openUpdateRoomDialog(match)}>
                                                <KeyRound className="mr-2 h-4 w-4" />
                                                <span>Update Room Details</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openPublishDialog(match)}><Award className="mr-2 h-4 w-4" />Publish Result</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setDeletingMatch(match)} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {/* Edit/Create Dialog */}
            <Dialog open={isFormOpen} onOpenChange={(isOpen) => { if (!isOpen) setEditingMatch(null); setIsFormOpen(isOpen); }}>
                <DialogContent className="sm:max-w-2xl bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary font-headline">{editingMatch ? 'Edit Match' : 'Create New Match'}</DialogTitle>
                        <DialogDescription>{editingMatch ? 'Update the details of the match.' : 'Fill out the form to create a new match.'}</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Match Title</FormLabel><FormControl><Input placeholder="e.g., Evening Scrims" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="game" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Game</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a game" /></SelectTrigger></FormControl>
                                            <SelectContent><SelectContent>
                                                {visibleGamesForDropdown.map(game => <SelectItem key={game.slug} value={game.name}>{game.name}</SelectItem>)}
                                            </SelectContent></SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="status" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                                            <SelectContent><SelectContent>
                                                <SelectItem value="Upcoming">Upcoming</SelectItem>
                                                <SelectItem value="Ongoing">Ongoing</SelectItem>
                                                <SelectItem value="Completed">Completed</SelectItem>
                                            </SelectContent></SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="date" render={({ field }) => (
                                    <FormItem className="flex flex-col"><FormLabel>Date</FormLabel><Popover>
                                        <PopoverTrigger asChild><FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl></PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} required initialFocus /></PopoverContent>
                                    </Popover><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="time" render={({ field }) => (
                                    <FormItem><FormLabel>Time</FormLabel><FormControl><Input placeholder="e.g., 09:00 PM" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField control={form.control} name="prize" render={({ field }) => (
                                    <FormItem><FormLabel>Prize Pool (₹)</FormLabel><FormControl><Input placeholder="e.g., 10000" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="perKillPrize" render={({ field }) => (
                                    <FormItem><FormLabel>Per Kill Prize (₹)</FormLabel><FormControl><Input placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="entryFee" render={({ field }) => (
                                    <FormItem><FormLabel>Entry Fee (₹)</FormLabel><FormControl><Input placeholder="e.g., 50" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="teamSize" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Size</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select team size" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Solo">Solo</SelectItem>
                                                <SelectItem value="Duo">Duo</SelectItem>
                                                <SelectItem value="Squad">Squad</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="totalTeams" render={({ field }) => (
                                    <FormItem><FormLabel>Total Spots/Teams</FormLabel><FormControl><Input type="number" placeholder="e.g., 25" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="image" render={({ field }) => (
                                    <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://placehold.co/400x200.png" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="imageHint" render={({ field }) => (
                                    <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input placeholder="e.g., action combat" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Enter match description like prize distribution, etc." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="rules" render={({ field }) => (
                                <FormItem><FormLabel>Rules (one per line)</FormLabel><FormControl><Textarea placeholder="Enter one rule per line." className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Save Match</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Publish Result Dialog */}
            <Dialog open={!!publishingResultMatch} onOpenChange={(isOpen) => !isOpen && setPublishingResultMatch(null)}>
                <DialogContent className="sm:max-w-md bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary font-headline flex items-center gap-2"><Award /> Publish Results for {publishingResultMatch?.title}</DialogTitle>
                        <DialogDescription>
                            Enter the rank for each participant. The match status will be automatically set to 'Completed'.
                             <span className="font-semibold text-primary block mt-2">Note: The prize pool will be automatically distributed to the Rank 1 winner's Winnings Balance upon publishing.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 py-4">
                        {publishingResultMatch?.participants.length ? publishingResultMatch.participants.map((p, index) => (
                            <div key={index} className="flex items-center justify-between gap-4">
                                <Label htmlFor={`rank-${index}`} className="flex-1 truncate text-primary-foreground">{p.gameUsername}</Label>
                                <Input
                                    id={`rank-${index}`}
                                    type="number"
                                    placeholder="Rank"
                                    className="w-24"
                                    value={participantRanks[p.gameUsername] || ''}
                                    onChange={(e) => handleRankChange(p.gameUsername, e.target.value)}
                                />
                            </div>
                        )) : <p className="text-muted-foreground text-center">No participants have joined this match yet.</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setPublishingResultMatch(null)}>Cancel</Button>
                        <Button type="button" onClick={handlePublishResults} className="bg-primary hover:bg-primary/90">Publish Results</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Update Room Details Dialog */}
            <Dialog open={!!updatingRoomMatch} onOpenChange={(isOpen) => !isOpen && setUpdatingRoomMatch(null)}>
                <DialogContent className="sm:max-w-md bg-card border-secondary">
                    <DialogHeader>
                        <DialogTitle className="text-primary font-headline flex items-center gap-2"><KeyRound /> Update Room Details for {updatingRoomMatch?.title}</DialogTitle>
                        <DialogDescription>
                            Enter the Room ID and Password. This will update the match and send notifications to all joined players.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...roomDetailsForm}>
                        <form onSubmit={roomDetailsForm.handleSubmit(handleUpdateRoomDetails)} className="space-y-4">
                            <FormField
                                control={roomDetailsForm.control}
                                name="roomId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room ID</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Room ID" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={roomDetailsForm.control}
                                name="roomPass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Room Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Room Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="secondary" onClick={() => setUpdatingRoomMatch(null)}>Cancel</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Update & Notify</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Match Dialog */}
            <AlertDialog open={!!deletingMatch} onOpenChange={(isOpen) => !isOpen && setDeletingMatch(null)}>
                <AlertDialogContent className="bg-card border-secondary">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this match?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently remove the match <span className="font-bold text-primary-foreground">{deletingMatch?.title}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingMatch(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteMatch} className="bg-destructive hover:bg-destructive/90">
                            Yes, Delete Match
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default MatchManagementClient;
