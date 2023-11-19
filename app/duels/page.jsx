
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'
import { fetchOponents } from './fetchDuelsOponents'
import Duel from './Oponent'


export default async function Duels() {

  const currentUser = await useCurrentUser()
  const oponents = await fetchOponents(currentUser?.id)

  if(!currentUser){
    return <div>Accès non autorisé</div>
  }
  return (
    <main className='p-6'>
      <div className='flex flex-col gap-5'>
      <h1 className='font-sans text-5xl tracking-tighter flex justify-center dark:text-slate-300'>MES DUELS.</h1>
        {
          oponents.map((oponent) => (
            <>     
            <Duel
                currentUserId={currentUser.id}
                key={oponent.id}
                oponent={oponent}
              />          
            </>
          ))
        }
      </div>
    </main>
  )
}
