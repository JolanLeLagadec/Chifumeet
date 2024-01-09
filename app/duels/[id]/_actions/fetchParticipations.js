"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const fetchParticipations = async (id) => {
  const duelId = parseInt(id);
  return await prisma.participation.findMany({
    where: {
      duelId,
    },
    select: {
      statut: true,
      userId: true,
      User: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
};