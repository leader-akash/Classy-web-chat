import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@prisma/client";
import { ArrowLeft, Lock } from "lucide-react";
import Image from "next/image";
import React from "react";
import StatusSidebarButton from "./StatusSidebarButton";

interface StatusSheetProps {
  user: User;
}

const StatusSheet = ({ user }: StatusSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/images/Status.svg"
          className="hover:cursor-pointer"
          alt="status"
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
              Status
            </SheetTitle>
          </div>
        </SheetHeader>

        <StatusSidebarButton 
            user={user}
        />

        <SheetFooter>
          <div className="flex m-auto mt-6 items-center">
            <Lock className="m-auto w-4"/>
            <p className="text-[12px] ml-1"> Your data is securely secured and private.</p>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StatusSheet;
