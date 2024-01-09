"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
export const updateParticipation = async (id, currentUserId) => {
    const duelId = parseInt(id);
    const participation = await prisma.participation.findFirst({
      where: {
        duelId,
        userId: currentUserId,
      },
      select: { id: true, statut: true },
    });
  
    let newStatut;
    if (participation.statut === "accepted") {
      newStatut = "started";
    } else {
      newStatut = "finished";
    }
  
    await prisma.participation.update({
      where: {
        id: participation.id,
      },
      data: { statut: newStatut },
    });
    revalidatePath("/duels");
  };
  