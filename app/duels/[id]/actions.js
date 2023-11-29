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

export const setResults = async (id, userWonId, userLostId) => {
  const duelId = parseInt(id);

  const duel = await prisma.duel.update({
    where: {
      id: duelId,
    },
    data: {
      userWonId,
      userLostId,
      participation: {
        updateMany: {
          where: {
            duelId: duelId,
            userId: { in: [userWonId, userLostId] },
          },
          data: {
            statut: "finished",
          },
        },
      },
    },
  });

  const [userWonRanked, userLostRanked] = await Promise.all([ // execute les requetes en parallèle, plutot que de manière séquentielle, performances améliorées.
    prisma.ranking.findFirst({
      where: {
        userId: userWonId,
      },
      select: {
        score: true,
        rank: true,
      },
    }),
    prisma.ranking.findFirst({
      where: {
        userId: userLostId,
      },
      select: {
        score: true,
        rank: true,
      },
    }),
  ]);
  const newScore = userWonRanked?.score + 10;
  const newScoreUserLost = userLostRanked?.score !== 0 ?  userLostRanked?.score - 5 : 0;

  console.log(newScoreUserLost)

  
  console.log(userLostRanked)

  const rankUserLost =
    newScoreUserLost <= 200
      ? "Débutant"
      : newScoreUserLost < 1000 && newScoreUserLost > 200
      ? "Confirmé"
      : "Expert";
  const rankUserWon =
    newScore <= 200
      ? "Débutant"
      : newScore < 1000 && newScore > 200
      ? "Confirmé"
      : "Expert";

  
      await Promise.all([
        prisma.ranking.update({
          where: {
            userId: userWonId,
          },
          data: {
            score: newScore,
            rank: rankUserWon
          },
        }),
        prisma.ranking.update({
          where: {
            userId: userLostId,
          },
          data: {
            score: newScoreUserLost,
            rank: rankUserLost
          }
        }),
      ]);
  }

  

