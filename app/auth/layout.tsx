import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "@/app/ui/globals.css";
import React from "react";
import {NextUIProvider} from "@nextui-org/react";
import {Provider} from "@/app/provider";

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IBM IOT DASHBOARD",
  description: "The Next gen IOT Dashboard power by IBM",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
      <div className={"flex min-h-screen flex-col items-center justify-stretch self-stretch"}>
          <AuthBackgroundSurface>
          {children}
          </AuthBackgroundSurface>
      </div>
  );
}


function AuthBackgroundSurface({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className= "relative flex min-h-screen justify-center items-center self-stretch bg-[url('/background.png')]  bg-repeat bg-contain bg-center">
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50"></div>
            {children}
        </div>
    );
}
