'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
// import {auth} from "@/app/api/auth/[...nextauth]/auth";

interface ProviderProps {
    children: React.ReactNode
}
export async function Provider({children }:ProviderProps) {
    // const session = await auth();
    return (
       // <SessionProvider session={session}>
           <NextUIProvider>
               <NextThemeProvider attribute="class" defaultTheme="dark">
                   {children}
               </NextThemeProvider>
           </NextUIProvider>
       // </SessionProvider>
    )
}