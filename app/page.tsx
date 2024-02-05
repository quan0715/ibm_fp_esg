"use client"
import React, { useEffect } from "react";
import { auth, signOut} from "@/lib/auth";
import { signOutAction } from "@/actions/signOutAction";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function Auth() {
    return (
        <div className={"text-3xl font-mono w-screen h-screen flex flex-col place-content-center justify-center items-center shadow-gray-50 bg-white/10"}>
            Welcome to IBM - ESG Platform
            {/* <p className="text-sm m-2 p-2">
                {JSON.stringify(session)}
            </p> */}
            <form action={signOutAction}>
                <Button type="submit" color="primary">Sign Out</Button>
            </form>
        </div>
    );
}