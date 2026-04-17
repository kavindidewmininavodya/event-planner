import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, Users, Zap, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12 py-8 animate-fade-in">
      {/* minimalist Hero Section */}
      <section className="space-y-6 text-center lg:text-left lg:flex lg:items-center lg:gap-12 pb-8 border-b border-border">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Plan Events Efficiently
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            A simple, professional platform for creating and managing your events. 
            Track RSVPs, share invites, and organize your guests with ease.
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Button asChild size="sm" className="px-6 font-bold">
              <Link href="/dashboard">
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="px-6">
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features List (Not Cards) */}
      <section className="grid gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Zap className="size-4 text-primary" />
            Fast Setup
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create an event in seconds. No complex configurations needed.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Users className="size-4 text-primary" />
            Guest Tracking
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Real-time RSVP updates. Know exactly who is attending.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Check className="size-4 text-primary" />
            Secure Invites
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unique tokens for every event to keep your details private.
          </p>
        </div>
      </section>

      {/* Simplified CTA */}
      <footer className="pt-12 text-center border-t border-border">
        <h2 className="text-xl font-bold mb-4">Ready to start?</h2>
        <Button asChild variant="default" className="font-bold">
          <Link href="/dashboard">Create Your Event</Link>
        </Button>
      </footer>
    </div>
  );
}
