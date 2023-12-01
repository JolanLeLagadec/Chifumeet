
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'
import Content from './Content'


export default async function Profile() {
  // Fetch données coté serveur
  // Accessible directement côté client au moment du rendu après passage en props, données pré-chargées

  const user = await useCurrentUser()

  return (

    <div className='min-h-screen py-4 dark:bg-gradient-to-b from-slate-950 to-gray-700'>
      <Content {...user} />
    </div>
  )
}
