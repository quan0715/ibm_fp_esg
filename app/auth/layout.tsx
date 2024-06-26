import React from "react";
import Image from "next/image";
export default function AuthLayout({children}: {children: React.ReactNode}) {
    const bgImage = "/danist-soh-dqXiw7nCb9Q-unsplash.png";

    return (
        <main className="flex h-screen flex-col items-center justify-center p-4">
            <div className="absolute flex flex-col justify-center z-10">
                {children}
            </div>
            <div className="absolute w-full h-screen bg-green-100/50">
                <Image fill src={bgImage} alt="background image" quality={50}/>
            </div>
        </main>
    )
}
