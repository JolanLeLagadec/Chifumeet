'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const MessageField = ({ chatId, currentUserId, opoId }) => {
  
  const [ inputValue, setInputValue] = useState()
  
  const sendMessage = async (content) => {
    try {
       const res = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, chatId, currentUserId, opoId })
        })
        setInputValue('')

    } catch(error){
        console.log(error)
    }
  }

  return (
    <div className='flex gap-2'>
      Type a new message:
      <Input
        value={inputValue}
        onChange={({ target }) => (setInputValue(target.value))}
        type='text'
      />
      <Button disabled={!inputValue} variant='outline' onClick={() => sendMessage(inputValue || '')}>Send</Button>
    </div>
  )
}

export default MessageField