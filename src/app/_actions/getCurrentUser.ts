import { db } from "@/lib/db";
import { currentUser } from '@clerk/nextjs';
import { User as ClerkUser } from "@clerk/nextjs/server";
import { User as PrismaUser } from "@prisma/client"
import { NextResponse } from "next/server";

interface CurrentUser {
    currentUserPrisma: PrismaUser & {
        following: PrismaUser[]
    };
    currentUserClerk: ClerkUser
}

const getCurrentUser = async (): Promise<CurrentUser> => {
    
    const currentUserClerk = await currentUser();

    if (currentUserClerk === null) {
        throw new Error('Unauthorized');
    }

    try {
        const currentUserPrisma = await db.user.findUnique({
            where: {
                externalUserId: currentUserClerk.id
            },
            include: {
                following: true,
                followedBy: true
            }
        })

        if (currentUserPrisma === null) {
            throw new Error('User not found!')
        }

        return { currentUserPrisma, currentUserClerk }
    }
    catch(error){
        console.log('error', error);
        throw new Error("User not found, Database not connected")
    }
}

export default getCurrentUser
