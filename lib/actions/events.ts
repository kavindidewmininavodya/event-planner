"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { randomBytes } from "crypto";

function generateToken(length: number = 8): string {
  return randomBytes(length).toString("hex").slice(0, length).toUpperCase();
}

function parseCreateEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const eventDate = formData.get("eventDate") as string;

  return {
    title: title || "Untitled Event",
    description: description || null,
    location: location ? location.slice(0, 200) : null,
    eventDate: eventDate || null,
  };
}

export async function createEventAction(formData: FormData) {
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const input = parseCreateEvent(formData);

  const created = await prisma.event.create({
    data: {
      ownerUserId: userId,
      title: input.title,
      description: input.description,
      location: input.location,
      eventDate: input.eventDate ? new Date(input.eventDate) : new Date(),
      invites: {
        create: {
          token: generateToken(),
        },
      },
    },
  });

  redirect(`/events/${created.id}`);
}

export async function updateEventAction(eventId: string, formData: FormData) {
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) throw new Error("Unauthorized");

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerUserId !== userId) throw new Error("Forbidden");

  const input = parseCreateEvent(formData);

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title: input.title,
      description: input.description,
      location: input.location,
      eventDate: input.eventDate ? new Date(input.eventDate) : event.eventDate,
    },
  });

  redirect(`/events/${eventId}`);
}

export async function deleteEventAction(eventId: string) {
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) throw new Error("Unauthorized");

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerUserId !== userId) throw new Error("Forbidden");

  await prisma.event.delete({
    where: { id: eventId },
  });

  redirect("/dashboard");
}