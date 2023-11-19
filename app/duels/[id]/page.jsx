import avatar from "../../../public/avatar.jpg"
import React from 'react'
import { fetchParticipations } from './actions'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import ButtonHandleDuel from "./ButtonHandleDuel"
import { redirect } from "next/dist/server/api-utils"


export default async function Duel({ params }) {
  const { id } = params

  const currentUser = await useCurrentUser()
  const participations = await fetchParticipations(id)

  const participationCurrentUser = participations.find(p => p.userId === currentUser.id)
  const participationOponent = participations.find(p => p.userId !== currentUser.id)

  let statut;
  if(!participationCurrentUser || !participationOponent){
    redirect('/')
  }else {
    statut = participationCurrentUser.statut
  }
    
  // Problème : même si l'utilisateur qui a pas la bonne mise à jour du statut et qui est attendu par l'autre utilisateur a le message
  // Il faudrait un ordre dans les statuts? par exemple statut 1 = accepted statut 2 = started statut 3 finished ?
  // et celui qui est à l'étape inférieure doit mettre à jour 
  
  // On a besoin de comparer le statut de participation du current et celui de l'adversaire
  // Si les statuts sont différents on désactive le bouton, et on affiche un message d'attente

  if(!currentUser){
    return <div>Accès non autorisé</div>
    
  }
  return (

    <main>
      <div className='flex justify-evenly items-center '>
        <div className='flex flex-col justify-center items-center gap-5'>
          <Image
            src={participations[0].User.image.replace(/^"(.+(?="$))"$/, '$1') || avatar}
            height={160}
            width={160}
            alt={participations[0].User.name}
            className="rounded-3xl"
          />
          <h1 className="text-2xl font-normal">{participations[0].User.name}</h1>
        </div>
        <h1 className="font-extrabold text-5xl font-sans">VS .</h1>
        <div className='flex flex-col justify-center items-center gap-5'>
          <Image
            src={participations[1].User.image.replace(/^"(.+(?="$))"$/, '$1') || avatar}
            height={160}
            width={160}
            alt={participations[1].User.name}
            className="rounded-3xl"
          />
          <h1 className="text-2xl font-normal">{participations[1].User.name}</h1>
        </div>

      </div>
      <div className="flex flex-col items-center justify-center py-6 gap-4">
        <ButtonHandleDuel duelId={id} currentUserId={currentUser.id} statut={statut} oponentStatut={participationOponent.statut}  />       
      </div>

    </main>
  )
}
