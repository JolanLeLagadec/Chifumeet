'use client'

import useChat from '@/hooks/useChat'
import { Mail } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

export default function IconChat({ children }) {

    const chat = useChat()
  return (
    <div onClick={() => {
      chat.setIsOpen()
    } }>
      <Button size='sm' className="absolute z-10 flex" variant='outline'>
      <Mail className='cursor-pointer  z-40  w-6 h-6 ' />   
      </Button>  
      {children}
      </div>
  )
}
