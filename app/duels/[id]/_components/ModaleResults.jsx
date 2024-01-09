'use client'
import React, { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import useModaleResults from '@/hooks/useModaleResults'
import { setResults } from '@/app/duels/[id]/_actions/setResults'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ModaleResults({ pUser, pOponent, duelId }) {

  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const getButtonClass = (buttonName) => {
    return name === buttonName ? activButton : ''
  }

  const activButton = 'bg-slate-300 dark:bg-blue-300'

  const andTheWinnerIs = async () => {
    const userWonId = name === pUser.User.name ? pUser.User.id : pOponent.User.id
    const userLostId = name === pUser.User.name ? pOponent.User.id : pUser.User.id

    setIsLoading(true)
    await setResults(duelId, userWonId, userLostId)
    setIsLoading(false)
    router.push('/historique')

  }

  const modaleResults = useModaleResults()
  if (!modaleResults.isOpen) {
    return;
  }
  return (
    <div className='absolute flex justify-center items-center z-20'>
      <div className=' flex flex-col justify-center bg-secondary w-[35rem] p-6 rounded-2xl'>
        <div className='flex justify-between'>
          <h1 className='text-xl font-mono'>Qui est le vainqueur?</h1>
          <X onClick={() => modaleResults.setIsOpen()} className='cursor-pointer' />
        </div>
        <div className='flex justify-center items-center gap-8 mt-12 text-lg'>
          <Button onClick={() => setName(pUser.User.name)} variant='outline' className={`${getButtonClass(pUser.User.name)} text-lg `}>{pUser.User.name}</Button>
          <Button onClick={() => setName(pOponent.User.name)} variant='outline' className={`${getButtonClass(pOponent.User.name)} text-lg `}>{pOponent.User.name}</Button>
        </div>
        <Button onClick={() => andTheWinnerIs()} disabled={isLoading} className='w-1/2 mx-auto mt-20 text-md font-mono'>
          {
            isLoading && (
              <Loader2 className='animate-spin h-3 w-3' />
            )
          }
          Je valide
        </Button>


      </div>

    </div>
  )
}
