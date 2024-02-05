// 'use client'
import {auth, signIn} from "@/lib/auth";
import {Button} from "@nextui-org/react";

export default async function TestPage(){
    const session = await auth()
    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <Button onClick={
                async () => {
                    "use server"
                    console.log("sign in")
                    await signIn("credentials",{
                        username: "test",
                        password: "test"
                    })
                }
            }>
                {session ? "Logout" : "Login"}
            </Button>
        </div>
    )
}