'use client'
import useChat from '@/hooks/useChat'
import { pusherClient } from '@/lib/pusher/pusher'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import './styles.css'
const Messages = ({ initialMessages, chatId, currentUser, oponent }) => {

  const [incomingMessages, setIncomingMessages] = useState([])

  const id = chatId.toString()
  const chat = useChat()

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth"
    });
  }
  useEffect(() => {
    scrollToBottom();
  }, [initialMessages, incomingMessages]); 


  useEffect(() => {
    pusherClient.subscribe(id)
    pusherClient.bind('incoming-message', (content
    ) => {
      const msg = { content, userSendingId: currentUser.id, userReceiverId: oponent.id }
      
      setIncomingMessages((prev) => [...prev, msg])
    })
    return () => {
      pusherClient.unbind('incoming-message');
      pusherClient.unsubscribe(id)
    }
  }, [id])

  // On souhaite différencier le message de l'utilisateur courant et celui de son opposant.


  return (
    <div className=''>
      <X color="#FFFF" onClick={() => chat.setIsOpen()} className='cursor-pointer flex items-end w-46  ' />
      <div ref={messagesContainerRef} className='z-50 hide-scrollbar gap-3 overflow-y-auto max-h-[500px] min-h-[500px]'>
      {initialMessages.map((message, i) => (
             <div  className='gap-3 ' key={i}> {/* si index en key premiers messages en double */}
             {
               message.userSendingId === currentUser.id ? (
                   <div className='p-4 flex justify-end '>
                     <p className='bg-slate-200 p-4 rounded-lg h-fit max-w-[20rem] break-words text-slate-900'>{message.content}</p>
                   </div>
               ) : (
                 <div className='flex justify-start items-center gap-3 p-4'>
                     <Image
                     src={oponent.image.replace(/^"(.+(?="$))"$/, '$1') || avatar}
                     width={30}
                     height={30}
                     alt={oponent.name}
                     className='rounded-full object-cover w-9 h-9'
                      />
                      <p className='p-4 bg-slate-800 text-gray-200 rounded-lg h-fit max-w-[20rem] break-words'>{message.content}</p>
                   </div>
               )
             }
   
           </div>
      ))}
      {incomingMessages.map((message, i) => (
        <div  className=' gap-3 overflow-y-auto max-h-[500px]' key={i}>
          {
            message.userSendingId === currentUser.id ? (
                <div className='p-4 flex justify-end'>
                  <p className='bg-slate-200 p-4 rounded-lg h-fit max-w-[20rem] break-words text-slate-900' >{message.content}</p>
                </div>
            ) : (
              <div className='flex justify-center items-start gap-2'>
                  <p className='p-4 bg-slate-800 text-gray-200 rounded-lg h-fit max-w-[20rem] break-words'>{message.content}</p>
                  <Image
                  src={oponent.image.replace(/^"(.+(?="$))"$/, '$1') || avatar}
                  width={30}
                  height={30}
                  alt={oponent.name}
                  className='rounded-full object-cover'
                   />


                </div>

            )
          }

        </div>
        
       
      ))}
      </div>
    </div>
  )
}

export default Messages