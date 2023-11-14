'use server'

import prisma from "@/lib/db/prisma"

export async function handleChallenge( currentUserId, userReceiverId ) {

    console.log(currentUserId, userReceiverId)
    try {
        await prisma.$transaction(async (prisma) => {  
            const createdDuel = await prisma.duel.create({
                data: {}
            });

            await prisma.participation.create({
                data: {
                    userId: currentUserId,
                    statut: 'pending',
                    duelId: createdDuel.id, 
                }
            });
 
            await prisma.notification.create({
                data: {
                    userId: userReceiverId,
                    type: 'invitation',   
                }
            });
        });

       
        
    } catch (error) {
        console.error("Erreur lors du traitement du défi :", error);
        // Gérer l'erreur comme nécessaire
    }
}