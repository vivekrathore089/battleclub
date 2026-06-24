'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const pageDetails: { [key: string]: { title: string, placeholder: string } } = {
    terms: { title: 'Terms & Conditions', placeholder: 'Enter your terms and conditions here...' },
    privacy: { title: 'Privacy Policy', placeholder: 'Enter your privacy policy here...' },
    about: { title: 'About Us', placeholder: 'Enter information about your company here...' },
    faq: { title: 'Frequently Asked Questions', placeholder: 'Enter FAQs here, perhaps in a Q&A format.' },
};

export default function EditContentPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { toast } = useToast();
    const [content, setContent] = useState('');
    
    const details = pageDetails[slug] || { title: 'Edit Page', placeholder: 'Enter content...' };

    const handleSave = () => {
        console.log(`Saving content for ${slug}:`, content);
        toast({
            title: 'Content Saved!',
            description: `Your changes to the ${details.title} page have been saved.`,
        });
    };

    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-8">
                <Link href="/admin/content" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Content Management
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl">Edit {details.title}</CardTitle>
                        <CardDescription>
                            Make your changes below. The content supports basic markdown. Click save when you're done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder={details.placeholder}
                            className="min-h-[400px] text-base"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}