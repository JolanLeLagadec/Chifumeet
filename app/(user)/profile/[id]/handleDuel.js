'use server'
import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const duelAccepted = async (currentUserId, userSenderId, invitId) => {
    const duel = await prisma.duel.create({
        data: {
            Chat: {
                create: {}
            }
        },
    })
 

    if(duel){
        await prisma.participation.create({
            data: {
                duelId: duel.id,
                userId: currentUserId,
                statut: 'accepted'
            }
        })
        await prisma.participation.create({
            data: {
                duelId: duel.id,
                userId: userSenderId,
                statut: 'accepted'
            }
        })
        await prisma.notification.delete({
            where: {
                id: invitId
            }
        })
        revalidatePath('/notifications')
        redirect('/duels')
    }
    }

export const duelDenied = async (invitId) => {    
       const success = await prisma.notification.delete({
            where: {
                id: invitId
            }
        })
        revalidatePath('/notifications')
        return success;
       
}