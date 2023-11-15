import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns';
import prisma from '@/lib/db/prisma';


export default async function Notif({ notification }) {

  const { Sender } = notification

  const createdAt = useMemo(() => {
    if (!notification?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(notification.createdAt));
  }, [notification.createdAt])

  return (

    <div className='flex flex-col items-center '>
      <div className='flex flex-row justify-center gap-4 '>
        {
          !notification.readed &&
          (
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 " />
          )
        }
        <div className="space-y-1 ">
          {
            notification.type === 'invitation' ? (
              <div className='flex justify-center items-center gap-4'>
                <p className="text-sm font-medium leading-none">
                  {Sender.name} vous a lancé un duel!
                </p>
                <Link href=''> <Button variant='outline' className='border-2'>Voir le profil</Button></Link>
              </div>

            ) : ''
          }
          {
            notification.type === 'accepted' ? (
              <div className='flex justify-center'>
                <p className="text-sm font-medium leading-none">

                </p>
                <Link href=''> <Button variant='outline' className='border-2'>Duel</Button></Link>
              </div>

            ) : ''
          }
          <p className="text-sm text-muted-foreground mb-4">
            Sended {createdAt} ago
          </p>
        </div>
      </div>
    </div>





  )
}