import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "@/lib/db/prisma";

export async function POST(req){
    
    const body = await req.json()
    console.log(body)

    const {email, password, name, age, image, bio} = body

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
          return NextResponse.status(400).json({ error: 'Email already in use' });
      }
      const hashedPassword = await bcrypt.hash(password, 12)

      const imageString = JSON.stringify(image)
      
      try {
        const newUser = await prisma.user.create({
            data: {
              email,
              hashedPassword,
              name, 
              age,
              image: imageString,
              bio
            }
          })
          console.log(newUser)
          return NextResponse.json({
              message: 'Inscription réussie'
          })

      }catch(error){
        return NextResponse.json({
            error: error.message
        })
      }
}