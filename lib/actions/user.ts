"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  const session = await getSession();
  const userId = session.data?.user.id;
  const email = session.data?.user.email;

  if (!userId || !email) return null;

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Lazy create user if they don't exist in our DB yet
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: email,
      },
    });
  }

  return user;
}

export async function updateUserProfileAction(formData: FormData) {
  const session = await getSession();
  const userId = session.data?.user.id;

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || null,
        bio: bio || null,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
