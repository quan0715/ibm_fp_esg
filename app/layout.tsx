import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "@/app/globals.css";
import React from "react";
import {Providers} from "@/app/provider";
import {AppNavBar} from "@/app/ui/components/AppNavBar";

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IBM IOT DASHBOARD",
  description: "The Next gen IOT Dashboard power by IBM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${notoSansTC.className} antialiased`}>
            <Providers>
              {children}
            </Providers>
        </body>
      </html>
  );
}
