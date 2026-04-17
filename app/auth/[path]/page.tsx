import { AuthView } from '@neondatabase/auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const dynamicParams = false;

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
    const { path } = await params;
    const isSignIn = path === 'sign-in' || path === 'login';

    return (
        <main className="container mx-auto flex grow flex-col items-center justify-center p-4 py-12 lg:py-24 animate-fade-in relative">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
            
            <div className="w-full max-w-md space-y-6">
                <Link 
                    href="/" 
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary animate-in slide-in-from-left-4 duration-500"
                >
                    <ChevronLeft className="size-4" />
                    Back to Home
                </Link>

                <Card className="border-border/50 bg-surface/50 shadow-2xl backdrop-blur-xl animate-zoom-in">
                    <div className="h-1.5 bg-gradient-to-r from-primary to-accent-strong" />
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                            E
                        </div>
                        <CardTitle className="text-3xl font-black tracking-tight pt-2">
                            {isSignIn ? "Welcome Back" : "Create Account"}
                        </CardTitle>
                        <CardDescription className="text-base">
                            {isSignIn ? "Enter your credentials to manage your events." : "Sign up to start planning your next big moment."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-8">
                        {/* The Neon AuthView component */}
                        <div className="neon-auth-container">
                            <AuthView path={path} />
                        </div>
                    </CardContent>
                </Card>
                
                <p className="text-center text-xs text-muted-foreground animate-in fade-in duration-1000">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>

            {/* Custom CSS to polish the internal AuthView elements if needed */}
            <style dangerouslySetInnerHTML={{ __html: `
                .neon-auth-container [data-neonaut-card] {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                .neon-auth-container button {
                    border-radius: 0.75rem !important;
                    font-weight: 600 !important;
                }
                .neon-auth-container input {
                    border-radius: 0.75rem !important;
                    background: var(--background) !important;
                    border-color: var(--border) !important;
                }
            `}} />
        </main>
    );
}