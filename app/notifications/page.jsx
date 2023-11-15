
import React from 'react'
import { Notifs } from './Notifs'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { redirect } from 'next/navigation'

export default async function Notifications() {

  const currentUser = await useCurrentUser()
  if(!currentUser){
    redirect('/')
  }
  return (
    <div className='flex justify-center items-center py-8'>
        <Notifs currentUserId ={currentUser?.id} />
    </div>
  )
}
