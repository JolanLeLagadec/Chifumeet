"use server";
import prisma from "@/lib/db/prisma";
export const getDuels = async ( userId ) => {

    const duels = await prisma.duel.findMany({
        where: {
          OR: [
            {userWonId: userId},
            {userLostId: userId}
          ]
        },
        orderBy: {
            updatedAt: 'desc' 
        }
        
    })
    return duels
}