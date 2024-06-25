import { db } from '@/lib/db'
import React from 'react'

const getMessages = async(conversationId: string) => {
    try{
        const messages = await db.message.findMany({
            where: {
                conversationId: conversationId
            },
            include:{
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return messages
    }
    catch(error){
        console.log('error in get mesages', error)
        return []
    }
}

export default getMessages
