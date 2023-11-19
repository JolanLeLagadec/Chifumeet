import prisma from "@/lib/db/prisma";

export async function fetchOponents( currentUserId ){

    const participations = await prisma.participation.findMany({ // On récupère toutes les participations de l'utilisateur connecté
        where: {
            userId: currentUserId           
        },
        select: {
            duelId: true
        }
    })
    const duelsIds = participations.map(p => p.duelId) // On récupère tous les ids de ses duels
    if(!duelsIds.length){
        return []
    }
        const userOponentIds = await prisma.participation.findMany({ // On récupère les idUsers qui ont le même id de duel, on exclut le current
            where: {
                userId: {not: currentUserId},
                duelId: {in: duelsIds}    
            },
            select: {
                userId: true,
            }
        })
    
    const userIds = userOponentIds.map(u => u.userId) // On les rentre dans un nouveau tableau
    console.log(userIds)

    if(!userIds.length){
        return []
    }
   
        const oponents = await prisma.user.findMany({ // Et enfin, on va chercher les adversaires du user connecté, grâce aux ids précédemment récupérer
            where: {
                AND: [
                    { id: { in: userIds } },
                    { id: { not: currentUserId } }
                ]
            },
            select: {
                id: true,
                image: true,
                name: true
            }
        })
        return oponents
    }  


export const fetchDuel = async (currentUserId, oponentId) => {
    const duels = await prisma.participation.findMany({
        where: {
            userId: currentUserId
        },
        select: {
            duelId: true
        }
    })

    const duelsIds = duels.map( d => d.duelId)

    const duelWithOponent = await prisma.participation.findFirst({
        where: {
            AND: [
                {duelId: {in: duelsIds}},
                {userId: oponentId}
            ]      
        }, 
        select: {
            duelId: true,
            statut: true
        }
    })

    return duelWithOponent
}

