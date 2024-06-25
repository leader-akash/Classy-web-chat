import { useConversation } from '@/app/_hooks/useConversation'
import { FullMessageType } from '@/app/_types'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import MediaRoom from './MediaRoom'

interface BodyProps {
    initialMessages: FullMessageType[],
    isInCall: boolean
}

const Body = ({initialMessages, isInCall}: BodyProps) => {
    
    const bottomRef = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState(initialMessages)
    const {conversationId} = useConversation();


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'instant' })
    }, [isInCall])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    const conversationApi = async() => {
        try{
            const res = await axios.post(`/api/conversations/${conversationId}/seen`)
        }
        catch(error){
            console.log('error fetching conversation in body', error)
        }
    }

    useEffect(() => {
        conversationApi();
    }, [conversationId])


  return (
    <div className='flex-1 overflow-y-auto bg-pink-200 w-full'>

        {
            isInCall && (
                <MediaRoom 
                    chatId={conversationId}
                    video={true}
                    audio={true}
                />
            )
        }

        {
            !isInCall && (
                <div className='pt-24'>
                    {
                        messages.map((message, i ) => 
                       
                        <MessageBox 
                            isLast = {i=== messages?.length - 1}
                            key={message?.id}
                            data={message}
                        />
                        )
                    }
                    </div>
            )
        }
        <div ref={bottomRef} />
    </div>
  )
}

export default Body
