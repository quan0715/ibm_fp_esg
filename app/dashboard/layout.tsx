import React from "react";
import {AppNavBar} from "@/app/ui/components/AppNavBar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
      <div className={"flex min-h-screen flex-col items-center justify-stretch self-stretch shadow-gray-50 bg-white/10"}>
            <AppNavBar/>
            {children} 
      </div>
  );
}
