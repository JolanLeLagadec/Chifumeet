import prisma from '@/lib/db/prisma'
import { pusherServer } from '@/lib/pusher/pusher'

export async function POST(req) { 
  const { content, chatId, currentUserId, opoId } = await req.json()

  pusherServer.trigger(chatId.toString(), 'incoming-message', content)

  await prisma.message.create({
    data: {
        userReceiverId: opoId,
        userSendingId: currentUserId,
        content,
        chatId
    },
  })
  return new Response(JSON.stringify({ success: true }))
}