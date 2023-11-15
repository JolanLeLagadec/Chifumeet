'use server'

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
                    select:{
                        id: true,
                        name: true   
                    }                 
                }
            }
          }) 
    return notifs
}
export async function updateNotifs(idsNotifs){
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
}

export async function duelAccepted(){


}

export async function duelDenied(){

}