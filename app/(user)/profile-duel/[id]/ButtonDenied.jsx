'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { duelDenied } from './handleDuel'
import { useRouter } from 'next/navigation'

export default function ButtonDenied({ invitId }) {

  const router = useRouter()
  return (
    <div>
        <Button
         variant='outline' 
         className="dark:border-2 dark:border-blue-500" 
         onClick={ () => {
          duelDenied(invitId)
          if(duelDenied){
            router.push('/notifications')
          }
         }         
          }>Je refuse</Button>
    </div>
  )
}