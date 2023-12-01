'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { duelAccepted } from './handleDuel'
import { useRouter } from 'next/navigation'

export default function ButtonAccepted({ currentUserId, senderId, invitId }) {

  const router = useRouter()

  const handleDuel = async () => { // On préfère rediriger côté client, ux améliorée -> renvoi à une page de loading, sinon avec redirect dans la requete: temps d'attente sans infos
    try {
      const duel = await duelAccepted(currentUserId, senderId, invitId)
      router.push(`/duels/${duel.id}`)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Button onClick={() => handleDuel()}>J&apos;accepte le duel</Button>
    </div>
  )
}
