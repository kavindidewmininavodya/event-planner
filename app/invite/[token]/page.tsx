import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, CheckCircle2, PartyPopper } from "lucide-react";
import { submitRsvpAction } from "@/lib/actions/rsvp";

export default async function InvitePage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ token: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const { token } = await params;
  const { success } = await searchParams;

  const invite = await prisma.eventInvite.findUnique({
    where: { token },
    include: {
      event: {
        select: {
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!invite) {
    notFound();
  }

  const { event } = invite;

  if (success === "true") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4">
        <Card className="w-full max-w-md border-none bg-surface/50 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-500">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <CheckCircle2 className="size-10" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight text-foreground">You're In!</CardTitle>
            <CardDescription className="text-lg">Your RSVP has been successfully sent to the host.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6 pb-8">
            <p className="text-muted-foreground">
              We've saved your response for <span className="font-bold text-foreground">{event.title}</span>. 
              See you there!
            </p>
            <div className="flex justify-center gap-2">
               <PartyPopper className="size-5 text-primary animate-bounce" />
               <PartyPopper className="size-5 text-primary animate-bounce delay-100" />
               <PartyPopper className="size-5 text-primary animate-bounce delay-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 py-12 lg:py-24">
      <div className="w-full max-w-2xl space-y-8">
        {/* Event Banner Info */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-black tracking-tighter sm:text-6xl text-foreground">
            You're Invited to <br />
            <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
              {event.title}
            </span>
          </h1>
          {event.description && (
            <p className="mx-auto max-w-md text-lg text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-5">
           {/* Info Sidebar */}
           <div className="md:col-span-2 space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
              <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-surface/30 p-6 backdrop-blur-sm transition-all hover:border-primary/30">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Calendar className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">When</p>
                  <p className="font-semibold text-foreground leading-tight">
                    {new Date(event.eventDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'})}
                    <br />
                    <span className="text-sm font-normal text-muted-foreground">{new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-surface/30 p-6 backdrop-blur-sm transition-all hover:border-primary/30">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <MapPin className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Where</p>
                  <p className="font-semibold text-foreground">
                    {event.location || "Location TBD"}
                  </p>
                </div>
              </div>
           </div>

           {/* RSVP Form Card */}
           <Card className="md:col-span-3 overflow-hidden border-border/50 bg-surface/50 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
             <div className="h-1.5 bg-gradient-to-r from-primary to-accent-strong" />
             <CardHeader>
               <CardTitle>Can you make it?</CardTitle>
               <CardDescription>Please RSVP to let the host know your plans.</CardDescription>
             </CardHeader>
             <CardContent>
               <form action={submitRsvpAction} className="space-y-6">
                 <input type="hidden" name="token" value={token} />
                 
                 <div className="space-y-2">
                   <Label htmlFor="name">Your Full Name</Label>
                   <Input id="name" name="name" placeholder="Alex Johnson" required className="bg-background/50" />
                 </div>

                 <div className="space-y-2">
                   <Label htmlFor="email">Email Address</Label>
                   <Input id="email" name="email" type="email" placeholder="alex@example.com" required className="bg-background/50" />
                 </div>

                 <div className="space-y-3">
                   <Label>Will you attend?</Label>
                   <div className="grid grid-cols-3 gap-2">
                      <label className="cursor-pointer">
                        <input type="radio" name="status" value="going" required className="peer sr-only" defaultChecked />
                        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background/50 py-3 text-sm font-medium transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary hover:bg-muted">
                           Yes
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input type="radio" name="status" value="maybe" className="peer sr-only" />
                        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background/50 py-3 text-sm font-medium transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary hover:bg-muted">
                           Maybe
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input type="radio" name="status" value="not_going" className="peer sr-only" />
                        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background/50 py-3 text-sm font-medium transition-all peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary hover:bg-muted">
                           No
                        </div>
                      </label>
                   </div>
                 </div>

                 <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                   Confirm RSVP
                 </Button>
               </form>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
