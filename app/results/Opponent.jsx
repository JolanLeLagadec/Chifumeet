'use client'

import Image from "next/image"
import avatar from "../../public/avatar.jpg"
import { Button } from "@/components/ui/button"
import { handleChallenge } from "./handleChallenge";


export default function Opponent({ user, currentUserId }) {

  console.log('ici les id', user.id, currentUserId)
  const imageUrl = user.image
  
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex flex-col mt-14 ">
            <Image
            className="rounded-3xl shadow-xl object-fit"
            src={imageUrl?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
            width={300}
            height={200}
            alt={user.name}
             />

             <div className="flex justify-between items-center mt-8">
                <h1 className="font-sans text-2xl">{user.name}</h1>
                <span className="text-2xl">{user.age} ans</span>
             </div>
             <div className="w-[20rem] dark:text-neutral-300  mt-4">
              {user.bio}
             </div>
             <div className="flex justify-center mt-6 ">
              <Button
              onClick={() => handleChallenge(currentUserId, user.id)}
              className="shadow-lg border-2 border-blue-500"
              variant='outline' 
              size='lg'>DEFIER</Button>
             </div>
        
      </div>     
    </div>
  )
}
