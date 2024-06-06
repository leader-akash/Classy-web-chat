import Image from "next/image"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Apple } from "lucide-react"

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export const Logo = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="flex flex-row items-center gap-y-4">
                <div className="bg-white rounded-full p-1">
                    <Apple className="rounded-xl w-16 h-16 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3" />
                </div>
                <div className={cn("flex flex-col items-center ", font.className)}>
                    <p className="text-[30px] font-semibold text-green-700"> Classy Web chat</p>
                </div>
            </div>

        <div className="w-full h-full">
            <Image 
                src="/bestImg.png"
                alt='hero'
                width={350}
                height={400}
            />
        </div>

        </div>
    )
}

