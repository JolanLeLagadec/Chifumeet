
import Header from '@/components/Header'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUsersTwoKms } from '@/lib/geoloc/findUsers'
import React from 'react'
import Carousel from './Carousel'


export default async function Result() {

  const currentUser = await useCurrentUser()
  if(!currentUser){
  return null;
  }

  const { latitude, longitude } = currentUser.Location
  const usersFound = await findUsersTwoKms(latitude, longitude, currentUser.id)
  
  return (
    <div>
      <Header label='ADVERSAIRES.' />
      <Carousel currentUserId={currentUser.id} users={usersFound} />          
    </div>
  )
}
