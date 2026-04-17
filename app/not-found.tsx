import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center space-y-8 p-4 text-center animate-zoom-in">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <div className="relative rounded-3xl border border-border/50 bg-surface/50 p-12 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Compass className="size-12 animate-spin-slow" />
          </div>
          <h1 className="text-8xl font-black tracking-tighter text-foreground sm:text-9xl">404</h1>
          <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">Lost in the Moment?</p>
          <p className="mt-2 text-muted-foreground">
            The page you're looking for was either deleted, moved, <br />
            or the host didn't invite us to it.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Link href="/">
                <Home className="mr-2 size-4" />
                Back Home
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="px-8 text-muted-foreground hover:text-foreground">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
