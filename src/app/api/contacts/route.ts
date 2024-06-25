import getCurrentUser from "@/app/_actions/getCurrentUser"
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async(request: Request) => {
    try{
        const {currentUserPrisma} = await getCurrentUser();
        const body = await request.json();

        const {phoneNumber, action} = body;

        if(!currentUserPrisma?.id){
            return new NextResponse('Unauthorized', {
                status: 401
            })
        }

        if(action === 'add'){
            const user = await db?.user?.update({
                where:{
                    id: currentUserPrisma.id
                },
                data: {
                    following: {
                        connect: {
                            phoneNumber: phoneNumber
                        }
                    }
                },
                include: {
                    following: true
                }
            })

            console.log('Added new following!')

            return NextResponse.json(user.following)
        }

        else if (action === 'remove'){ // removing user/contact
            const user = await db.user.update({
                where: {
                    id: currentUserPrisma.id
                },
                data:{
                    following: {
                        disconnect: {
                            phoneNumber: phoneNumber
                        }
                    }
                },
                include: {
                    following: true
                }
            })
            console.log('Removed the following')
            return NextResponse.json(user.following)
        }
        
    }
    catch (error) {
        console.log('error in contact api', error)
        return new NextResponse("Internal server error", {status: 500})
    }
}