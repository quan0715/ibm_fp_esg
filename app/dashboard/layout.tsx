import React from "react";
import {AppNavBar} from "@/app/ui/components/AppNavBar";
import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader";
import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
// import { AppNavBar } from "@/app/ui/dashboard/AppNavBar";
import { TextDataCard } from "@/app/ui/components/data/DataCard";

// export const revalidate = 1000;

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const urlPath = process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${urlPath}/api/data`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: {
            'revalidate': 10
        }
    })

    const json = await data.json();
    console.log(json);
    const time = new Date(json.time);

  return (
      <div className={"flex h-screen flex-col flex-grow items-center justify-stretch self-stretch bg-background"}>
            <div className={"text-xl flex flex-col flex-grow w-full justify-center items-center"}>
            <AppNavBar/>
            <DashboardPageHeader title="Home">
                <TextDataCard label="上次更新時間" data={time.toLocaleString()}/>
            </DashboardPageHeader>
            {children} 
        </div>
      </div>
  );
}
