import Image from 'next/image'
import React from 'react'
import avatar from "../../public/avatar.jpg"
import { fetchDuel } from './fetchDuelsOponents'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Oponent({ oponent, currentUserId }) {

  const imageUrl = oponent.image
  const duel = await fetchDuel(currentUserId, oponent.id)

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
        <h1 className='text-2xl font-bold'>{oponent.name}</h1>
        <Link href={`/duels/${duel.duelId}`}> <Button variant='secondary' size='lg' className=' ml-8'>GO</Button></Link>

      </div>
    </div>
  )
}