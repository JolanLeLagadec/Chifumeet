"use server";
import prisma from "@/lib/db/prisma";

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
    const newScoreUserLost = userLostRanked?.score !== 0 ?  userLostRanked?.score - 4 : 0;
  
  
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