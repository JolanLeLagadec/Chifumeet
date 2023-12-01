'use server'
import prisma from "@/lib/db/prisma"
import { revalidatePath } from "next/cache"

export const updateInformations = async (formData, id) => {

    console.log(formData)
    const { name, bio } = formData
    const imageUrl = formData.image || ''

    const dataToUpdate = {
        name,
        bio
    }
    if(imageUrl){
        dataToUpdate.image = imageUrl
    }
    
    const infos = await prisma.user.update({
        where: {
            id
        },
        data: dataToUpdate
    })
    revalidatePath('/profile')
    return infos;
}