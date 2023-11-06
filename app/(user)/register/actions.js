'use server'
import bcrypt from 'bcrypt'
import prisma from '@/lib/db/prisma'

export const formAction = async (formData) => {

    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const name = formData.get("name")?.toString()
    const image = formData.get("image")?.toString()
    const age = formData.get('age')?.toString()
    const bio = formData.get('bio')?.toString()

    console.log(name, password, email)
  
    if(!name || !password || !email ){
      throw Error('Fields missing')
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name, 
        age,
        image,
        bio
      }
    })
  }