import MessageField from '@/components/Chat/MessageField'
import Messages from '@/components/chat/Messages'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import prisma from '@/lib/db/prisma'

const Chat = async ({ duelId, currentUserId, opoId }) => {
    const id = parseInt(duelId)

    const currentUser = await useCurrentUser()
    
    const chat = await prisma.chat.findFirst({
        where: {
            duelId: id
        }
    })
    const existingMessages = await prisma.message.findMany({
        where: {
            chatId: chat.id,
        },
        select: {
            userSendingId: true,
            userReceiverId: true,
            content: true
        }
    })

    const oponent = await prisma.user.findFirst({
        where: {
            id: opoId
        }
    })

    const serializedMessages = existingMessages.map((message) => ({
        content: message.content,
        userSendingId: message.userSendingId,
        userReceiverId: message.userReceiverId,
        id: message.id,
    }))


    return (
        <div className='absolute flex justify-center bg-slate-950 w-[95%] rounded-lg -top-[5rem] z-50 p-4'>
            <div className='flex flex-col w-full gap-3'>              
                <Messages chatId={chat.id} currentUser={currentUser} initialMessages={serializedMessages}  oponent={oponent}/>
                <MessageField chatId={chat.id} currentUserId={currentUserId} opoId={opoId} />
            </div>
        </div>
    )
}

export default Chat