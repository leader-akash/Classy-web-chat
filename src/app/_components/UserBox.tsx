import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User } from '@prisma/client'
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'

interface UserBoxProps {
    data: User;
    handleRemoveContact: (newContact: User[]) => void
}

const UserBox: React.FC<UserBoxProps> = ({data,handleRemoveContact}) => {

    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const handleContactClick = useCallback(async() => {
        setIsLoading(true)
        try{
            const res = await axios.post(`/api/conversations`, {userId: data?.id})
            
            router.push(`/conversations/${res?.data?.id}`)
        }
        catch(error){
            console.log('error in user box', error)
        }
        finally{
            setIsLoading(false)
        }
    },[data, router])

    const handleRemoveClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsLoading(true)
        console.log('removing contact')
        try{
            const res = await axios.post(`/api/contacts`, {phoneNumber: data?.phoneNumber, action: 'remove'})

            console.log('remove response', res)

            const newContacts = res.data;
            handleRemoveContact(newContacts)

        }
        catch(error){
            console.log('error while removing contact', error)
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <div>
        <Separator />

        <div 
        onClick={handleContactClick} 
        className=' w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer'>

            <div className='flex w-full items-center'>

                <Avatar className='w-12 h-12'>
                    <AvatarImage   src={data?.profileImageUrl || undefined}/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            <div className='space-y-1 ml-4 text-left relative'>
                <h4 className='text-[1rem] absolute bottom-0'>
                    {data?.username}
                </h4>
                <h4 className='text-[0.75rem] absolute top-0 '>
                    {data?.about}
                </h4>
            </div>

            <div className='group w-full flex justify-end'>

                <Button className='bg-inherit hover:bg-inherit p-0'
                    onClick={handleRemoveClick}
                >
                    <Trash2 className='invisible group-hover:visible text-red-500 w-5 h-5' />
                </Button>

            </div>
            </div>
        </div>
    </div>
  )
}

export default UserBox