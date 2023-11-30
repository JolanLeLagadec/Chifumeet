'use server'
import { revalidatePath } from "next/cache"

export async function notifReaded(id){
    await prisma.notification.update({
      where: {
        id
      },
      data: {
        readed: true
      }
    })
    revalidatePath('/notifications')
  }

export async function fetchUserNotifs(currentUserId){
    const notifs = await prisma.notification.findMany({
        where: {
            userId: currentUserId
        },
        orderBy: {
            createdAt: 'desc'
          },
            include: {
                Sender: {
                    select: {
                        id: true,
                        name: true   
                    }                 
                }
            }
          }) 
    return notifs
}
export async function updateNotifs(idsNotifs){
    if(idsNotifs.length > 0){
        await prisma.notification.updateMany({
            where: {
                id: {
                    in: idsNotifs
                }
            },
            data: {
                readed: true
            }
        })
        revalidatePath('/notifications')
    }  
}

