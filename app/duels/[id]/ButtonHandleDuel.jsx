'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { updateParticipation } from './actions'

export default function ButtonHandleDuel({ statut, duelId, currentUserId, oponentStatut  }) {

 const [isLoading, setIsLoading] = useState(false)

 const statutsOrder = {'accepted': 1, 'started': 2, 'finished': 3}
 const checkStatuts =  () => {
   return statutsOrder[statut] > statutsOrder[oponentStatut]
 }
 const isOponentWaiting = checkStatuts()

 const handleUpdate = async () => {
    setIsLoading(true)
    await updateParticipation(duelId, currentUserId)
    setIsLoading(false)
 }   
  return (
    <div>
       <Button
          onClick={handleUpdate}
          size='lg'
          disabled={isLoading && isOponentWaiting} 
          className='disabled:opacity-50 text-xl'>
    {
        isLoading && (
            <Loader2
             className="mr-2 h-5 w-5 animate-spin" />
        )
    }
          {statut === 'accepted' ? (
            'PRET'
          ) : (
            'VALIDER LES RESULTATS'
          )
          }</Button>
           {   
          isOponentWaiting === true && (
            <p className="text-lg">En attente de votre adversaire...</p>
          )
          }
    </div>
  )
}
