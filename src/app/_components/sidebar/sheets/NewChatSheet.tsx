"use client";
import { User } from "@prisma/client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import NewContactSheet from "./NewContactSheet";

interface NewChatSheetProps {
  currentUser: User & {
    following: User[];
  };
}

const NewChatSheet = ({ currentUser }: NewChatSheetProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState<User[]>([])

  useEffect(()=>{
    if(currentUser.following !== undefined){
      setContacts(currentUser?.following)
    }
  },[currentUser])

  const handleAddContact = (contacts: User[]) => {
    setContacts(contacts)
  }

  const handleRemoveContact = (newContacts: User[]) => {
    setContacts(contacts)
  }

  return (
    <div>
      {currentUser !== undefined && <div>Create a group</div>}

      <Sheet>
        <SheetTrigger>
            <Image
              className="hover:cursor-pointer "
              src={"/images/NewChat.svg"}
              alt="New chat"
              width={24}
              height={24}
            />
        </SheetTrigger>
        <SheetContent side="left" className="w-[340px] sm:w-540px] p-0">
          <SheetHeader className="bg-primary">
            <div className="flex mt-14 mb-3 items-center">
              <SheetClose asChild>
                <ArrowLeft className="mr-7 ml-5 cursor-pointer text-white" />
              </SheetClose>
              <SheetTitle className="text-white fle items-center justify-center">
                New Chat
              </SheetTitle>
            </div>
          </SheetHeader>

          <ScrollArea>
            <div className="space-y-2 flex">
              <div className="flex bg-gray-100 w-11/12 m-auto rounded-xl mt-2 ml-3">
                <button onClick={() => setSearchText("")}>
                  <ArrowLeft className="text-primary mr-7 ml-5" />
                </button>

                <Input
                  placeholder="Search name or number"
                  className="bg-transparent border-0"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>

            <button className="flex m-6 relative justify-center items-center">
              <Avatar  className="flex w-12 h-12"> 
                <AvatarImage src="/images/Group.svg" className="" />

                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="ml-4 text-left">
                <NewContactSheet 
                  handleAddContact={handleAddContact}
                />
              </div>
            </button>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NewChatSheet;
