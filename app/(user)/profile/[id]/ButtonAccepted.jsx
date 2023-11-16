'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { duelAccepted } from './handleDuel'

export default function ButtonAccepted({currentUserId, senderId, invitId}) {
  return (
    <div>
        <Button onClick={() => duelAccepted(currentUserId, senderId, invitId)}>J&apos;accepte le duel</Button>
    </div>
  )
}
