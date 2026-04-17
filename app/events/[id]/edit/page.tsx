"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { updateEventAction } from "@/lib/actions/events";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

type EditEventFormValues = {
  title: string;
  description: string;
  location: string;
  eventDate: string;
};

export default function EditEventPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EditEventFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      eventDate: "",
    },
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        
        // Format date for datetime-local input
        const date = data.eventDate ? new Date(data.eventDate).toISOString().slice(0, 16) : "";
        
        form.reset({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          eventDate: date,
        });
        setLoading(false);
      } catch (err) {
        setError("Could not load event data.");
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id, form]);

  const onSubmit = async (data: EditEventFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    await updateEventAction(id, formData);
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">{error}</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
      <Button variant="ghost" asChild className="-ml-2 text-muted-foreground hover:text-foreground">
        <Link href={`/events/${id}`} className="flex items-center gap-2">
          <ChevronLeft className="size-4" />
          Back to Event
        </Link>
      </Button>

      <Card className="border-border/50 bg-surface/50 shadow-2xl backdrop-blur-xl">
        <div className="h-1.5 bg-primary" />
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Edit Event</CardTitle>
          <CardDescription>Update your event details. Guests will see the changes immediately.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={(fd) => updateEventAction(id, fd)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Team dinner..." {...field} required className="bg-background/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Optional details..." {...field} className="bg-background/50 h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Optional location" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date and Time</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button type="submit" className="px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={`/events/${id}`}>Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
