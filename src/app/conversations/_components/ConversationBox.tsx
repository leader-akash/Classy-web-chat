"use client"

import { useOtherUser } from "@/app/_hooks/useOtherUser";
import { FullConversationType } from "@/app/_types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerk } from "@clerk/nextjs";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface ConversationBoxProps{
    data: FullConversationType,
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data, selected
}) => {

    const otherUser = useOtherUser(data);
    const clerkUser = useClerk().user;
    const router = useRouter();

    const handleClick = () => {

    }

  return (
    <div>
        <div onClick={handleClick} className={clsx(`relative flex items-center space-x-3 p-3 hover:bg-neutral-100 transition:cursor-pointer`,
          selected ? 'bg-neutral-100' : 'bg-white'
        )}>

        {
          data?.isGroup ? (

            <Avatar>
              <AvatarImage src="/images/GroupPeople.svg"/>
              <AvatarFallback>
                CN
              </AvatarFallback>
            </Avatar>
          )
          :
          <Avatar>
          <AvatarImage src={clerkUser?.imageUrl || undefined}/>
          <AvatarFallback>
            CN
          </AvatarFallback>
        </Avatar>
        }

        </div>
    </div>
  )
}

export default ConversationBox
