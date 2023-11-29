import prisma from "@/lib/db/prisma"

export const findUsersRanking = async () => {

    const users = await prisma.ranking.findMany({
        orderBy: {
            score: 'desc'
        },
        select: {
            score: true,
            userId: true,
            rank: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    age: true
                }
            }
        }
    })

    return users
    
}
