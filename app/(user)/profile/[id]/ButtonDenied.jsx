'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { duelDenied } from './handleDuel'

export default function ButtonDenied({invitId}) {
  return (
    <div>
        <Button variant='outline' onClick={() => duelDenied(invitId)}>Je refuse</Button>
    </div>
  )
}