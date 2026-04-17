"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createEventAction } from "@/lib/actions/events";

type NewEventFormValues = {
  title: string;
  description: string;
  location: string;
  eventDate: string;
};

export default function NewEventPage() {
  const form = useForm<NewEventFormValues>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      eventDate: "",
    },
  });

  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      <Card className="border-border/50 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={createEventAction} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Team dinner..." {...field} required className="text-white placeholder:text-white/30" />
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
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Optional details about the event" {...field} className="text-white placeholder:text-white/30" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional location" {...field} className="text-white placeholder:text-white/30" />
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
                    <FormLabel className="text-white">Date and time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} className="text-white [color-scheme:dark]" />
                    </FormControl>
                    <FormMessage className="text-xs text-white/50">Optional, you can set this later.</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-3 pt-4">
                <Button type="submit" className="px-8 transition-all hover:scale-[1.02]">
                  Create event
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}