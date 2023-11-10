'use client'
import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import {useState} from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useLocation from '@/hooks/useLocation'

export default function ButtonSearchOpponents({ user }) {
  
  const [isLoading, setIsLoading] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const loc = useLocation()
  const router = useRouter()

  const userId = user ? user.id : null

  console.log('ici userid', userId)

  useEffect(() => {
    if(userId){
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)
        loc.setLocation(latitude, longitude)
      }, (error) => {
        console.error('Erreur lors de l\'obtention de la position', error)
        setIsLoading(false)
      }, { enableHighAccuracy: true })
    }
   
  }, [userId, loc])
  return (
    <>
    <Button
      onClick={ async () => {
        if(!userId){
          router.push('/login')
          return;
        }
        try {
          setIsLoading(true)
          console.log(JSON.stringify({ latitude, longitude, userId }))
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
          const response = await res.json()
          console.log(response)
          setIsLoading(false)
          if (!res.ok) {
            throw Error('Echec de la mise à jour de la position')         
          }
          if(res.ok){
            console.log('Position mise à jour')    
          }  
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la position', error)
          setIsLoading(false)
        }
        router.push('/results')
      }}  
      size='xl'
      disabled={isLoading}
      className='bg-gradient-to-r disabled:opacity-20 from-primary to-blue-800 dark:to-slate-300 text-transparent bg-clip-text p-6 text-3xl border-2 border-blue-400 rounded-2xl shadow-2xl dark:shadow-neutral-900 font-semibold  transition tracking-widest '>
      {
        isLoading && (
          <Loader2 className="mr-2 h-6 w-6 animate-spin " />
        )
      }
      TROUVER UN ADVERSAIRE
    </Button> 
    </>
  )
}
