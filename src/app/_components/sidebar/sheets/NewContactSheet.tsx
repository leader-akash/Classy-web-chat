'use client'

import { phoneNumbers } from "@clerk/nextjs/api";
import { User } from "@prisma/client"
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"



interface NewContactSheetProps {
    handleAddContact: (contacts: User[]) => void;
}

const NewContactSheet = ({ handleAddContact }: NewContactSheetProps) => {
    const [number, setNumber] = useState<String>("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            phoneNumber: '',
            action: 'add'
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = () => {
        const postData = {
            phoneNumber: number,
            action: 'add'
        };
        axios.post(`/api/contacts`, postData)
            .then((response) => {
                const contact = response.data;

                handleAddContact(contact);

                toast.success("Contact added sucessfully!");
                setNumber('')
            })
    }

    return (
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    );

}

export default NewContactSheet