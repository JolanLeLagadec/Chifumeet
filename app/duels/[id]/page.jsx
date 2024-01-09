import avatar from "../../../public/avatar.jpg"
import React from 'react'
import { fetchParticipations } from '@/app/duels/[id]/_actions/fetchParticipations'
import Image from 'next/image'
import { useCurrentUser } from "@/hooks/useCurrentUser"
import ButtonHandleDuel from "./_components/ButtonHandleDuel"
import { redirect } from "next/dist/server/api-utils"
import ModaleBackground from "./_components/ModaleBackground"
import ModaleResults from "./_components/ModaleResults"
import Chat from "@/components/chat/Chat"
import IconChat from "@/components/chat/IconChat"
import ClientContext from "@/components/chat/ClientContext"

export default async function Duel({ params }) {
  const { id } = params

  const currentUser = await useCurrentUser()
  const participations = await fetchParticipations(id)

  const participationCurrentUser = participations.find(p => p.userId === currentUser?.id)
  const participationOponent = participations.find(p => p.userId !== currentUser?.id)

  let statut;
  if (!participationCurrentUser || !participationOponent) {
    redirect('/')
  } else {
    statut = participationCurrentUser.statut
  }

  if (!currentUser) {
    return <div>Accès non autorisé</div>
  }
  return (
    <main className=" relative z-0">
      <div className=' flex justify-evenly items-center '>
        <ClientContext>
          <Chat duelId={id} currentUserId={currentUser.id} opoId={participationOponent.User.id} />
        </ClientContext>

        <ModaleBackground />
        <ModaleResults pUser={participationCurrentUser} pOponent={participationOponent} duelId={id} />
        <div className='flex flex-col justify-center items-center gap-5'>
          <Image
            src={participationCurrentUser?.User?.image?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
            height={160}
            width={160}
            alt={participationCurrentUser.User.name}
            className="rounded-3xl"
          />
          <h1 className="text-2xl font-normal">{participationCurrentUser.User.name}</h1>
        </div>
        <h1 className="font-extrabold text-5xl font-sans">VS .</h1>

        <IconChat>
          <div className='flex flex-col justify-center items-center gap-5 relative group cursor-pointer'>
            <Image
              src={participationOponent?.User?.image?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
              height={160}
              width={160}
              alt={participationOponent.User.name}
              className="rounded-3xl cursor-pointer"
            />
            <h1 className="text-2xl font-normal">{participationOponent.User.name}</h1>
          </div>
        </IconChat>
      </div>

      <div className="flex  items-center justify-center py-6 gap-4 ">
        <ButtonHandleDuel duelId={id} currentUserId={currentUser.id} statut={statut} oponentStatut={participationOponent.statut} />
      </div>
    </main>
  )
}
