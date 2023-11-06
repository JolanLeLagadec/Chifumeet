import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db/prisma"
import { getServerSession } from "next-auth"

export const useCurrentUser = async () => {
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email

    if(userEmail){
        const currentUser = await prisma.user.findUnique({
            where: {
             email: userEmail
            },
            select: {
                hashedPassword: false,
                image: true,
                name: true,
                email: true,
                bio: true,
                age: true

            }
        })
        return currentUser
    }return null;
   
    
}