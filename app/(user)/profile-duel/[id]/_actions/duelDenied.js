"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const duelDenied = async (invitId) => {
    const success = await prisma.notification.delete({
      where: {
        id: invitId,
      },
    });
    revalidatePath("/notifications");
    return success;
  };
  