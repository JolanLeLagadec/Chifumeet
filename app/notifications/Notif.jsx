import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns';
import { notifReaded } from './fetchUserNotifs';


export default function Notif({ notification }) {

  

  const { Sender } = notification

  const createdAt = useMemo(() => {
    if (!notification?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(notification.createdAt));
  }, [notification.createdAt])

  return (
      <div className='relative flex flex-row items-center justify-center   mt-4'>
        {
          !notification.readed &&
          (
            <span className="absolute -left-2 top-4 h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          )
        }
        <div>
          {
            notification.type === 'invitation' ? (
              <div className='flex justify-center items-center gap-3 '>
                <p className="text-sm font-medium leading-none">
                  {Sender?.name} vous a lancé un duel!
                </p>
                <Link href={`/profile-duel/${Sender?.id}`}> <Button variant='outline' className='border-2 mt-2'>Profil</Button></Link>
              </div>

            ) : ''
          }
          {
            notification.type === 'accepted' ? (
              <div className='flex items-center  w-full '>
                <div className='w-44'>
                <p className="text-sm font-medium leading-none ">
                {Sender?.name} a accepté le duel
                </p>
                </div>
                <Link href={`/duels`}> <Button onClick={() => notifReaded(notification.id) } variant='outline' className='border-2 mt-2'>Duel</Button></Link>
              </div>

            ) : ''
          }
          <p className="text-sm text-muted-foreground -mt-2">
            Sended {createdAt} ago
          </p>
        </div>
      </div>
  





  )
}
