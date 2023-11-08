'use client'
import React from 'react'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { findUsersTwoKms } from '@/lib/geoloc/findUsers'
import { Loader2 } from 'lucide-react'
import {useState} from 'react'
import { useEffect } from 'react'

export default function ButtonSearchOpponents({ user }) {
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const { id: userId } = user

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      setLatitude(latitude)
      setLongitude(longitude)
      try {
        setIsLoading(true)
        const res = await fetch('/api/position', {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            latitude,
            longitude,
            userId
          })
        })
        if (!res.ok) {
          throw Error('Echec de la mise à jour de la position')
        }
        if(res.ok){
          console.log('Posititon mise à !jour')
        }
       
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la position', error)
        setIsLoading(false)
      }
    }, (error) => {
      console.error('Erreur lors de l\'obtention de la position', error)
      setIsLoading(false)
    })
  }, [userId])
  return (
    <>
    <Button
      onClick={() => startTransition(async () => {
        const users = await findUsersTwoKms(latitude, longitude, userId)
        console.log(users)
      })}
      size='xl'
      disabled={isPending}
      className='bg-gradient-to-r from-primary to-blue-800 dark:to-slate-300 text-transparent bg-clip-text p-6 text-3xl border-2 border-blue-400 rounded-2xl shadow-2xl dark:shadow-neutral-900 font-semibold  transition tracking-widest '>
      {
        isPending && (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        )
      }
      TROUVER UN ADVERSAIRE
    </Button>
    </>
  )
}
