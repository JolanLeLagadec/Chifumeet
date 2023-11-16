'use server'
import prisma from "@/lib/db/prisma"
import { redirect } from "next/navigation"


export const duelAccepted = async (currentUserId, userSenderId, invitId) => {
    const duel = await prisma.duel.create({
        data: {},
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
        redirect('/duel')
    }
    }

export const duelDenied = async (invitId) => { 
    console.log(invitId)
    await prisma.notification.delete({
        where: {
            id: invitId
        }
    })
    redirect('/notifications')
}