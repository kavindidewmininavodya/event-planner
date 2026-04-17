import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, ChevronRight, Plus, Users, Activity } from "lucide-react";

export default async function DashboardContent({ userId }: { userId: string }) {
  const events = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { rsvps: true },
      },
    },
  });

  const totalEvents = events.length;
  const totalRsvps = events.reduce((acc, event) => acc + event._count.rsvps, 0);

  return (
    <div className="flex flex-1 flex-col gap-6 animate-fade-in">
      {/* minimalist Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-sm text-white/50">Manage your guest lists and tracking.</p>
        </div>
        <Button asChild size="sm" className="font-bold">
          <Link href="/events/new" className="flex items-center gap-2">
            <Plus className="size-4" />
            New Event
          </Link>
        </Button>
      </div>

      {/* Simple Stats Bar */}
      <div className="flex flex-wrap gap-8 text-sm">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-primary" />
          <span className="font-bold text-white">{totalEvents}</span>
          <span className="text-white/50">Active Events</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-4 text-primary" />
          <span className="font-bold text-white">{totalRsvps}</span>
          <span className="text-white/50">Total RSVPs</span>
        </div>
      </div>

      {/* Simplified Events List/Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 ? (
          <div className="col-span-full border border-dashed p-8 text-center text-sm">
            <p className="text-muted-foreground mb-4">You have no events.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/events/new">Create One</Link>
            </Button>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="group border border-white/10 bg-card/50 backdrop-blur-sm p-4 transition-all hover:border-primary">
              <div className="mb-3 flex items-start justify-between">
                <Badge variant="outline" className="text-[10px] font-bold uppercase py-0 border-white/20 text-white/70">Upcoming</Badge>
              </div>
              <h3 className="line-clamp-1 text-lg font-bold text-white">
                {event.title}
              </h3>
              
              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5" />
                  <span>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : "No date"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5" />
                  <span className="line-clamp-1">{event.location || "TBD"}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold text-white/50">{event._count.rsvps} Responses</span>
                <Link 
                  href={`/events/${event.id}`} 
                  className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  Manage
                  <ChevronRight className="size-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}