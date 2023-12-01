import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const useCurrentUser = async () => {
    const session = await getServerSession(authOptions)
    const userEmail = session?.user?.email

    if(userEmail){
        const currentUser = await prisma.user.findUnique({
            where: {
             email: userEmail
            },
            select: {
                id: true,
                hashedPassword: false,
                image: true,
                name: true,
                email: true,
                bio: true,
                age: true,
                Location: true
            }
        })
        revalidatePath('/')
        return currentUser
        
    }return null;
}