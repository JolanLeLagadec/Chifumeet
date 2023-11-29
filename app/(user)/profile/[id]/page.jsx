import prisma from '@/lib/db/prisma'
import Image from 'next/image';
import React from 'react'
import avatar from "../../../../public/avatar.jpg"
import { useCurrentUser } from '@/hooks/useCurrentUser';
import ButtonAccepted from './ButtonAccepted';
import ButtonDenied from './ButtonDenied';

const getUser =  async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return user;
}


const checkDuelInvitation =  async (currentId, userSenderId) => { // on restreint l'accès au profil/invitation uniquement à l'utilisateur qui a reçu l'invitation
  const checked = await prisma.notification.findFirst({
    where: {
      AND: [
        {userId: currentId},
        {userSenderId}
      ]      
    }
  })
  return checked
}

export default async function ProfileDuel({ params }) {

  const { id } = params
  const userId = parseInt(id)
  const user = await getUser(userId)
  const imageUrl = user.image
  const currentUser = await useCurrentUser()
  const isAuthorized = await checkDuelInvitation(currentUser.id, userId)
  

if(!isAuthorized){
  return <div>Accès non autorisé</div>
}
  return (

    <div className='flex justify-center items-center p-6'>
      <div className='flex flex-col'>
      <div className='rounded-xl flex  gap-10 '>
        <Image
        className='rounded-2xl object-cover'
        src={imageUrl?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
        width={200}
        height={200}
        alt={user.name}
         />
         <div className='flex flex-col gap-8'>
          <div className='flex justify-between'>
            <span className='text-2xl font-semibold' >{user.name}</span>
            <span className='text-2xl font-semibold'>{user.age} ans</span>
          </div>
          <p className='text-slate-500 dark:text-slate-300 flex-none'>
            {user.bio}
          </p>
         </div>
      </div>
      <div className='flex items-center justify-center gap-8 mt-12'>
       <ButtonAccepted invitId={isAuthorized.id} currentUserId={currentUser.id} senderId={userId} />
       <ButtonDenied invitId={isAuthorized.id}  />
      </div>
    </div>
    </div>
  )
}
