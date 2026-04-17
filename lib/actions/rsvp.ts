"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RsvpStatus } from "@/app/generated/prisma/enums";

export async function submitRsvpAction(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const status = formData.get("status") as RsvpStatus;

  if (!token || !name || !email || !status) {
    throw new Error("All fields are required");
  }

  const invite = await prisma.eventInvite.findUnique({
    where: { token },
    include: { event: true },
  });

  if (!invite) {
    throw new Error("Invalid invite token");
  }

  const emailNormalized = email.toLowerCase().trim();

  await prisma.eventRsvp.upsert({
    where: {
      eventId_emailNormalized: {
        eventId: invite.eventId,
        emailNormalized,
      },
    },
    update: {
      name,
      status,
      respondedAt: new Date(),
    },
    create: {
      eventId: invite.eventId,
      inviteId: invite.id,
      name,
      emailNormalized,
      status,
    },
  });

  // Redirect to a success state or back to the invite page with a success flag
  redirect(`/invite/${token}?success=true`);
}
