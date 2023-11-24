'use server'

import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"


export async function challengeAlreadyExists(currentUserId, usersIds){ 
    // L'idée est de ne pas pouvoir envoyer des notifs en chaîne, car un user peut avoir qu'un seul défi à la fois avec un même oponent.
    // Ensuite vérifier si ils ont un duel en cours
    const verifiedIds = await prisma.notification.findMany({
        where: {
            userId: {in: usersIds},
            userSenderId: currentUserId,
            type: 'invitation'        
        },
        select: {
            userId: true
        }
    })
    return verifiedIds
}

     export async function duelAlreadyStarted(currentUserId, usersIds){
    
        const participations = await prisma.participation.findMany({
            where: {
                userId: currentUserId,
                statut: 'started'
            },
            select: {
                duelId: true,
                userId: true
            }
        })
        
        const duelIdsCurrent = participations.map(duel => duel.duelId)
        
        const otherParticipations = await prisma.participation.findMany({
            where: {
                userId: { in: usersIds},
                duelId: { in: duelIdsCurrent}
            },
            select: {
                duelId: true,
                userId: true
            }
        })  
            return otherParticipations
    }
 


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