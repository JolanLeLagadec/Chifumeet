'use client'

import Image from "next/image"
import avatar from "../../public/avatar.jpg"

export default function Opponent({ user }) {

  console.log(user.image)
  const imageUrl = user.image
  return (
    <div className="flex  justify-center min-h-screen">
      <div className="flex flex-col mt-14 ">    
            <Image
            className="rounded-3xl shadow-xl"
            src={imageUrl?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
            width={300}
            height={300}
            alt={user.name}
             />
        
      </div>     
    </div>
  )
}
