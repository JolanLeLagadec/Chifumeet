import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID || 'defaultAppId',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || 'defaultKey',
  secret: process.env.PUSHER_APP_SECRET || 'defaultSecret',
  cluster: 'us2',
  useTLS: true,
})


export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: 'us2',
  authEndpoint: '/api/pusher-auth',
  authTransport: 'ajax',
  auth: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
})