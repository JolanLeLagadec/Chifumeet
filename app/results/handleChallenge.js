'use server'

import prisma from "@/lib/db/prisma"

export async function handleChallenge( currentUserId, userReceiverId ) {

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
                    userSenderId: currentUserId,
                    userId: userReceiverId,
                    type: 'invitation', 
                    readed: false
                }
            });
        });
            await prisma.user.update({
                where: {
                    id: userReceiverId
                },
                data: {
                    hasNotification: true 
                }
            });     
    } catch (error) {
        console.error("Erreur lors du traitement du défi :", error);
        // Gérer l'erreur comme nécessaire
    }
}