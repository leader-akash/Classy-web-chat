import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
    const {currentUserPrisma} = await getCurrentUser();

    if(!currentUserPrisma.id)
    return []

    try{
        const conversations = await db.conversation.findMany({
            orderBy: {
                lastMessageAt : "desc" // descending

            },
            where: {
                userIds: {
                    has: currentUserPrisma.id
                }
            },
            include: {
                users: true,
                messages:{
                    include:{
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return conversations;
    }
    catch(error:any){
        console.log('error in get conversations', error);
        return []
    }
    }

    export default getConversations
