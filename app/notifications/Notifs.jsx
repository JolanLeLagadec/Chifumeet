'use client'

import { useState } from 'react'
import { fetchUserNotifs, updateNotifs } from "./fetchUserNotifs"
import { BellRing, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import Notif from './Notif';


export function Notifs({ className, ...props }) {

  const [notifications, setNotifications] = useState([])
  const { currentUserId } = props

  const idsNotifs = notifications.map( notif => notif.id)

  useEffect(() => {
    const fetchNotifications = async () => {
      const notifs = await fetchUserNotifs(currentUserId)
      setNotifications(notifs)
    }
    fetchNotifications()
  }, [currentUserId])

  const readedCount = notifications.filter(notif => notif.readed === false)
 
  const notifsCount = readedCount.length 


  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have {notifsCount} unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification) => (
            <div key={notification.id}>
               <Notif notification={notification} />
            </div>
          
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick = {() => updateNotifs(idsNotifs) } className="w-full">
          <Check className="mr-2 h-4 w-4" /> Marquer toutes les notifications comme lues
        </Button>
      </CardFooter>
    </Card>
  )
}
