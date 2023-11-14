'use server'

export async function fetchUserNotifs(currentUserId){
    const notifs = prisma.notification.findMany({
        where: {
            userId: currentUserId
        }
    })
    return notifs
}

export async function duelAccepted(){

}

export async function duelDenied(){

}