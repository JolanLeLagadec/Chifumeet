import React from 'react'
import { Notifs } from './_components/Notifs'
import { useCurrentUser } from '@/hooks/useCurrentUser'


export default async function Notifications() {

  const currentUser = await useCurrentUser()
  if (!currentUser) {
    return <div>Accès interdit</div>
  }
  return (
    <div className='flex justify-center items-center py-8'>
      <Notifs currentUserId={currentUser?.id} />
    </div>
  )
}
