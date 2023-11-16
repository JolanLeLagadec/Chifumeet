'use server'

import prisma from "@/lib/db/prisma"

export async function handleChallenge( currentUserId, userReceiverId ) {

    try {  
            await prisma.notification.create({
                data: {
                    userSenderId: currentUserId,
                    userId: userReceiverId,
                    type: 'invitation', 
                    readed: false
                }
            });         
    } catch (error) {
        console.error("Erreur lors du traitement du défi :", error);
        // Gérer l'erreur comme nécessaire
    }
}