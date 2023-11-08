
import bcrypt from 'bcrypt'
import prisma from "@/lib/db/prisma";
import  { createEdgeRouter }  from 'next-connect';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';


 console.log('On arrive à route')
 export const config = { api: { bodyParser: false } };

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
  });
  
  const handler = createEdgeRouter();
  
  handler.use(upload.single('image'));
  
  handler.post(async (req, res) => {
    console.log(req.body)
  
    const { email, password, name, age, bio, latitude, longitude } = req.body;

    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.json({ message: 'Email already in use' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    let publicImageUrl;
    if (req.file) {
      const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
      const bucket = storage.bucket('bucketchifumeet');
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({ resumable: false });
  
      blobStream.on('error', err => {
        return Response.json({ error: err.message });
      });
  
      blobStream.end(req.file.buffer);
      await new Promise(resolve => {
        blobStream.on('finish', () => {
          publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve();
        });
      });
    } 

      try {
        const newUser = await prisma.user.create({
            data: {
              email,
              hashedPassword,
              name, 
              age,
              image: publicImageUrl,
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
    })


export async function POST(request, ctx) {
  return handler.run(request, ctx);
}

  