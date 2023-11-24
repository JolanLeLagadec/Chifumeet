'use client'

import useChat from "@/hooks/useChat"

export default function ClientContext({ children }) {

    const chat = useChat()

    if(!chat.isOpen){
        return
    }
  return (
    <div className="flex items-center">
        {children}
    </div>
  )
}
