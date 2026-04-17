import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Rocket, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-12 py-12 px-4 sm:py-24 animate-fade-in">
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="px-4 py-1 font-bold tracking-widest uppercase">Our Mission</Badge>
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-foreground">
          Simpler Planning for <br />
          <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
            Unforgettable Moments
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground sm:text-xl">
          Event Planner was built with one goal: to remove the friction from hosting. 
          We believe focus should be on the guests, not the spreadsheets.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl">
          <CardHeader>
            <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit mb-2">
              <Sparkles className="size-6" />
            </div>
            <CardTitle>Elegant Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We prioritize aesthetics as much as functionality. Every link you share with a guest 
              reflects the premium quality of your event.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl">
          <CardHeader>
            <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit mb-2">
              <Shield className="size-6" />
            </div>
            <CardTitle>Privacy First</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your guest data is encrypted and never shared. We don't sell data or track guests 
              across the web. Your private moments stay private.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl">
          <CardHeader>
            <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit mb-2">
              <Rocket className="size-6" />
            </div>
            <CardTitle>Built for Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Powered by Next.js and Neon, our platform is lightning-fast globally. 
              No more waiting for slow dashboard reloads.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl">
          <CardHeader>
            <div className="rounded-xl bg-primary/10 p-3 text-primary w-fit mb-2">
              <Heart className="size-6" />
            </div>
            <CardTitle>Community Driven</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We listen to our users. Most of our features start as suggestions from 
              people like you who just want to host better events.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-16">
        <h2 className="text-2xl font-bold mb-4">Ready to start hosting?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Join thousands of event planners who trust us with their most important dates.
        </p>
        <a 
          href="/dashboard" 
          className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          Create Your First Event
        </a>
      </div>
    </div>
  );
}
