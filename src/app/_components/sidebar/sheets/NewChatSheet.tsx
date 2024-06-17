"use client";
import { User } from "@prisma/client";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface NewChatSheetProps {
  currentUser: User & {
    following: User[];
  };
}

const NewChatSheet = ({ currentUser }: NewChatSheetProps) => {

    const [searchText, setSearchText] = useState<string>('');
    const [isModelOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      {currentUser !== undefined && <div>Create a group</div>}

      <Sheet>
        <SheetTrigger>
          <button>
            <Image
              className="hover:cursor-pointer "
              src={"/images/NewChat.svg"}
              alt="New chat"
              width={24}
              height={24}
            />
          </button>
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

            <ScrollArea >
                <div className="space-y-2 flex">
                <div className="flex bg-gray-100 w-11/12 m-auto rounded-xl mt-2 ml-3">
                    <button onClick={()=> setSearchText("")}>
                        <ArrowLeft className="text-primary mr-7 ml-5"/>
                    </button>
                    
                    <Input placeholder="Search name or number"
                        className="bg-transparent border-0"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                </div>
            </ScrollArea>

        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NewChatSheet;
