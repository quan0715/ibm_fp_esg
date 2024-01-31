import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "@/app/ui/globals.css";
import React from "react";

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
        <body className={`${notoSansTC.className} antialiased`}>{children}</body>
      </html>
  );
}