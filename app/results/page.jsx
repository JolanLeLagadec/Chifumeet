import ButtonSearchOpponents from '@/components/ButtonSearchOpponents'
import Header from '@/components/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUsersTwoKms } from '@/lib/geoloc/findUsers'
import React from 'react'
import Carousel from './Carousel'
import { redirect } from 'next/navigation'

export default async function Result() {

  const currentUser = await useCurrentUser()
  if(!currentUser){
    redirect('/')
  }
  console.log('ici currentuser', currentUser)
  const { latitude, longitude } = currentUser.Location
  const usersFound = await findUsersTwoKms(latitude, longitude, currentUser.id)
  console.log('ici userTrouvés', usersFound)
  
  return (
    <div>
      <Header label='ADVERSAIRES.' />
      <Carousel currentUserId={currentUser.id} data={usersFound} />
             
    </div>
  )
}
