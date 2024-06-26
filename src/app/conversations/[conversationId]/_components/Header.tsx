import useActiveList from '@/app/_hooks/useActiveList'
import { useOtherUser } from '@/app/_hooks/useOtherUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'
import { Conversation, User } from '@prisma/client'
import axios from 'axios'
import React, { useMemo, useState } from 'react'
import CallButton from './CallButton'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    },
    currentUserPrisma: User,
    isInCall: boolean,
    setIsInCall: React.Dispatch<React.SetStateAction<boolean>>
}

const Header = ({conversation, currentUserPrisma, isInCall, setIsInCall}: HeaderProps) => {

    const router = useRouter();
    const [disableFollowButton, setDisableFollowButton] = useState(false);

    const otherUser = useOtherUser(conversation);
    const {user} = useClerk()

    const {members} = useActiveList();
    const isActive = members.indexOf(otherUser?.phoneNumber!) !== -1;

    const statusText = useMemo(() => {
        if(conversation?.isGroup) {
            return `${conversation.users.length} members`
        }
        return isActive ? 'Active' : 'Offline';

    }, [conversation, isActive])

    const handleFollowClick = ( follow: boolean) => {
        if(conversation.ownerId === currentUserPrisma?.id) return;
        setDisableFollowButton(true);
        try{
            const res: any = axios.post(`/api/conversations/channels/follow`,{
                conversationId: conversation.id,
                user: currentUserPrisma,
                follow: follow
            })
            
            const updatedConversation = res?.data;
            conversation.userIds = updatedConversation?.userIds;
            setDisableFollowButton(false)

        }
        catch(err){
            console.log('err in header follow click', err )
        }
    }

    const handleDeleteConversation = async() => {
        try{
            const res = axios.delete(`/api/conversatins/${conversation?.id}`)

            router.replace('/conversations')
        }
        catch(err){
            console.log('error while deleting conversatio', err)
        }
    }

  return (
    <div className='bg-whitew w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm '>
        <div className='flex gap-3 items-center w-full '>
            {
                conversation.isGroup ? (
                    // code for group case
                    <div className='flex '>
                        <Avatar>
                            <AvatarImage src="/images/GroupPurple.svg"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className='flex flex-col ml-2'>
                            <div>
                                {
                                    conversation?.name
                                }
                            </div>
                            <div className='text-sm font-light text-neutral-500 '>{statusText}</div>
                        </div>
                    </div>
                )
                :
                (conversation?.isChannel ?
                    // code for channel case
                (
                    <div className='w-full flex'>
                        <Avatar>
                            <AvatarImage src={conversation?.profileImageUrl || undefined}/>
                            <AvatarFallback>
                                {
                                conversation?.name ? conversation?.name.charAt(0).toUpperCase() : 'CN' }                           </AvatarFallback>
                        </Avatar>

                        <div className='flex flex-col ml-2'>
                            <div>{conversation?.name}</div>
                        </div>
                        {
                            conversation.ownerId !== currentUserPrisma?.id && (
                                <Button disabled={disableFollowButton}
                                    className={`ml-auto mr-4 ${conversation.userIds?.includes(currentUserPrisma?.id) ? 'bg-white text-primary hover:bg-white border-primary border-2' : 'bg-primary text-white'}`}
                                    onClick={() => handleFollowClick(
                                        conversation?.userIds?.includes(currentUserPrisma?.id) ? false : true
                                    )}
                                    // check for user is already following or not
                                >
                                    {
                                        conversation?.userIds?.includes(currentUserPrisma?.id) ?
                                        'Unfollow' : 'Follow'
                                    }
                                </Button>
                            )
                        }
                    </div>

                
                )
                : (
                    // code for direct message case

                    <div className='flex w-full items-center'>
                        <Avatar>
                            <AvatarImage src={user?.imageUrl}/>
                            <AvatarFallback>{
                             user?.username?.charAt(0).toUpperCase()
                            }
                        </AvatarFallback>
                        </Avatar>

                    <div className='flex flex-col ml-2'>
                        <div>
                            {conversation.name || otherUser?.username}
                        </div>

                        <div className='text-sm font-light text-neutral-500'>
                            {
                                statusText
                            }
                        </div>
                    </div>

                    <div className='ml-auto items-center flex'>
                           <CallButton 
                            isInCall={isInCall}
                            setIsInCall={setIsInCall}
                           />
                           
                    </div>

                    </div>
                )
                )
            }
        </div>
        <Trash className='cursor-pointer text-zinc-500 w-10 h-10 p-2 hover:bg-zinc-200 rounded-sm' onClick={handleDeleteConversation}/>
        
    </div>
  )
}

export default Header
