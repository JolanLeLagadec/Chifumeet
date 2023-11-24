const duelsFinished = async (id) =>{
    const participations = await prisma.participation.findMany({
        where: {
            userId: id,
            statut: 'finished'
        },
        select: {
            duelId: true
        }
    })

    const duelsIds = participations.map(p => p.duelId)

   const getOpoIds =  await prisma.participation.findMany({
        where: {
            duelId: {in: duelsIds}
        },
        select: {
            userId: true
        }
    })
    const usersIds = getOpoIds.map( u => u.userId)

    const oponents = await prisma.user.findMany({
        where: {
            id: {in: usersIds}
        },
        select: {
            name: true,
            image: true
        }
    })

    return oponents

} 

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
export const getOpo = async ( id ) => {
    const opo = await prisma.user.findFirst({
        where: {
            id
        },
        select: {
            image: true,
            name: true
        }
    })
    return opo

}


