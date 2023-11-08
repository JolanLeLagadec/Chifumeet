import React from 'react'
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className='min-h-screen'>
        <div className='flex justify-center items-center '>
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />        
        </div>

    </div>
  )
}
