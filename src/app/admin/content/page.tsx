import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const contentPages = [
    { title: 'Terms & Conditions', slug: 'terms' },
    { title: 'Privacy Policy', slug: 'privacy' },
    { title: 'About Us', slug: 'about' },
    { title: 'FAQ', slug: 'faq' },
];

export default function ContentManagementPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Header />
            <div className="p-4 space-y-6 container mx-auto max-w-4xl pb-24 md:pb-8">
                <Link href="/admin" className="flex items-center gap-2 text-primary hover:underline">
                    <ChevronLeft className="w-5 h-5" />
                    Back to Admin Panel
                </Link>
                <Card className="bg-card border-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline text-primary text-3xl">Manage Content Pages</CardTitle>
                        <CardDescription>
                            Update the content for your application's static pages.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {contentPages.map(page => (
                            <div key={page.slug} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-primary-foreground">{page.title}</span>
                                </div>
                                <Link href={`/admin/content/${page.slug}`}>
                                    <Button variant="outline">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}