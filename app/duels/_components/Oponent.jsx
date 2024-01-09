import Image from 'next/image'
import React from 'react'
import avatar from "../../../public/avatar.jpg"
import { fetchDuel } from '../_actions/fetchDuelsOponents'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Scissors } from 'lucide-react'

export default async function Oponent({ oponent, currentUserId }) {

  const imageUrl = oponent.image
  const duel = oponent ? await fetchDuel(currentUserId, oponent.id) : null

  if (!duel) {
    return <p className='text-2xl font-mono text-center p-8'>Pas de duel en cours !</p>;
  }
  return (

    <div className='w-full '>
      <div className='flex justify-center items-center gap-6 p-4 border-b-2 border-blue-500 border-opacity-40 py-12' >
        <Image
          src={imageUrl?.replace(/^"(.+(?="$))"$/, '$1') || avatar}
          height={100}
          width={100}
          alt={oponent.name}
          className='rounded-full object-cover '
        />
        <h1 className='text-xl font-bold'>{oponent.name}</h1>
        {
          duel.statut !== 'finished' && (
            <Link href={`/duels/${duel.duelId}`}> <Button variant='secondary' size='lg' className=' ml-8'><Scissors /> GO</Button></Link>
          )
        }
        <span>
          {
            duel.statut === 'started' ?
              'En cours' : ''
          }
        </span>

      </div>
    </div>
  )
}
