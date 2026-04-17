import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/server";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, MapPin, Link as LinkIcon, Users, ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { headers } from "next/headers";
import { Edit } from "lucide-react";
import { DeleteEventButton } from "@/components/delete-event-button";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    redirect("/auth/sign-in");
  }

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      invites: true,
    },
  });

  if (!event || event.ownerUserId !== userId) {
    notFound();
  }

  const rsvps = await prisma.eventRsvp.findMany({
    where: { eventId: id },
    orderBy: { respondedAt: "desc" },
  });

  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const inviteLink = `${protocol}://${host}/invite/${event.invites?.token}`;

  const stats = {
    total: rsvps.length,
    going: rsvps.filter((r) => r.status === "going").length,
    maybe: rsvps.filter((r) => r.status === "maybe").length,
    notGoing: rsvps.filter((r) => r.status === "not_going").length,
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" asChild className="-ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ChevronLeft className="size-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="hover:bg-primary/5 hover:text-primary transition-colors">
            <Link href={`/events/${id}/edit`}>
              <Edit className="mr-2 size-4" />
              Edit Details
            </Link>
          </Button>
          <DeleteEventButton eventId={id} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Event Details & Invite Link */}
        <div className="space-y-8 lg:col-span-2">
          <Card className="overflow-hidden border-border/50 bg-surface/50 backdrop-blur-sm shadow-xl">
            <div className="h-2 bg-primary" />
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-primary/50 text-primary">Owner View</Badge>
                <span className="text-xs text-muted-foreground">Created {new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight">{event.title}</CardTitle>
              {event.description && <CardDescription className="text-base">{event.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{new Date(event.eventDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-4">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location || "TBD / Online"}</p>
                  </div>
                </div>
              </div>

              {/* Invite Link Section */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-sm transition-all hover:bg-primary/[0.08]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <LinkIcon className="size-5" />
                    Guest Invite Link
                  </div>
                  <Share2 className="size-4 text-primary/50" />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex-1 truncate rounded-lg bg-background/50 px-4 py-2 font-mono text-sm border border-border/50">
                    {inviteLink}
                  </div>
                  <CopyButton text={inviteLink} className="sm:w-32" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-center sm:text-left">
                  Share this link with your guests. They can RSVP without needing an account.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guest List Card */}
          <Card className="border-border/50 bg-surface/50 backdrop-blur-sm shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-primary" />
                <CardTitle>RSVP History</CardTitle>
              </div>
              <Badge variant="secondary">{stats.total} total</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent px-4">
                    <TableHead className="pl-6">Guest</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                        No responses yet. Send out some invites!
                      </TableCell>
                    </TableRow>
                  ) : (
                    rsvps.map((rsvp) => (
                      <TableRow key={rsvp.id} className="group transition-colors hover:bg-muted/50 px-4">
                        <TableCell className="pl-6 font-medium">
                          <div>
                            <p>{rsvp.name}</p>
                            <p className="text-xs font-normal text-muted-foreground">{rsvp.emailNormalized}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              rsvp.status === "going" ? "default" : 
                              rsvp.status === "maybe" ? "secondary" : "destructive"
                            }
                            className="capitalize"
                          >
                            {rsvp.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6 text-sm text-muted-foreground">
                          {new Date(rsvp.respondedAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Statistics & Quick Tips */}
        <div className="space-y-8">
          <Card className="border-border/50 bg-surface/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Response Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Going</span>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${(stats.going / (stats.total || 1)) * 100}%` }} />
                   </div>
                   <span className="w-8 text-right font-bold">{stats.going}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Maybe</span>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${(stats.maybe / (stats.total || 1)) * 100}%` }} />
                   </div>
                   <span className="w-8 text-right font-bold">{stats.maybe}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Not Attending</span>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: `${(stats.notGoing / (stats.total || 1)) * 100}%` }} />
                   </div>
                   <span className="w-8 text-right font-bold">{stats.notGoing}</span>
                </div>
              </div>
              <div className="border-t border-border/10 pt-4 mt-4">
                <p className="text-center text-2xl font-black tracking-tighter text-primary">
                  {stats.total > 0 ? Math.round((stats.going / stats.total) * 100) : 0}%
                  <span className="ml-1 text-sm font-bold text-muted-foreground">Attendance Rate</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 p-1">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pro Tip</CardTitle>
             </CardHeader>
             <CardContent>
                <p className="text-xs text-muted-foreground">
                   Share the invite link directly via WhatsApp or Email. Guests can RSVP in one click without logging in.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
