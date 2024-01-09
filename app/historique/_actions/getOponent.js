"use server";
import prisma from "@/lib/db/prisma";

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
