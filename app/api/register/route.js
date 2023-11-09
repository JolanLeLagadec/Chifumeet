
import bcrypt from 'bcrypt'
import prisma from "@/lib/db/prisma";

export async function POST(req){
    
    const body = await req.json()
    console.log('Requête reçue:', body)

    const {email, password, name, age, image, bio, latitude, longitude} = body
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
       return Response.json({ message: 'Email already in use' });
      }
      const hashedPassword = await bcrypt.hash(password, 12)

      console.log('ici img register', image)

      const imageString = image ? JSON.stringify(image) : null

      try {
        const newUser = await prisma.user.create({
            data: {
              email,
              hashedPassword,
              name, 
              age,
              image: imageString,
              bio,
              Location: {
                create: {
                  longitude,
                  latitude
                }
              }
              
            }
            })
            console.log('Nouvel utilisateur créé:', newUser)
           return Response.json({ message: 'Registration successful' });

      }catch(error){
        return Response.json({ error: error.message });
      }
}