"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const duelAccepted = async (currentUserId, userSenderId, invitId) => {
    const duel = await prisma.duel.create({
      data: {
        Chat: {
          create: {},
        },
      },
    });
  
  
    if (duel) {
      await prisma.participation.create({
        data: {
          duelId: duel.id,
          userId: currentUserId,
          statut: "accepted",
        },
      });
      await prisma.participation.create({
        data: {
          duelId: duel.id,
          userId: userSenderId,
          statut: "accepted",
        },
      });
  
      await prisma.ranking.upsert({
        where: { userId: currentUserId },
        update: {},
        create: {
          userId: currentUserId,
          rank: "Débutant",
          score: 0,
        },
      });
  
      await prisma.ranking.upsert({
        where: { userId: userSenderId },
        update: {},
        create: {
          userId: userSenderId,
          rank: "Débutant",
          score: 0,
        },
      });
  
      await prisma.notification.delete({
        where: {
          id: invitId,
        },
      });
      await prisma.notification.create({
        data: {
          userId: userSenderId,
          type: "accepted",
          userSenderId: currentUserId,
          readed: false,
        },
      });
    }
    revalidatePath("/notifications");
   return duel
  };