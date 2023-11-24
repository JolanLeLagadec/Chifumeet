import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/lib/db/prisma";

export async function PATCH(req){
    if(req.method !== 'PATCH'){
        return Response.error().json({message: 'Method not allowed'})
    }
    const body = await req.json()
    
    const { latitude, longitude, userId} = body
    try {
        await prisma.user.update({
        where: {
            id: userId,
        },
            data: {
                Location: {
                    update: {
                        latitude,
                        longitude
                    }                
                }
            }        
    })
    return Response.json({message: 'Update effectuée avec succès'})
}catch(e){
    return Response.json({message: e.message})
}   
}