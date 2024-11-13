"use client";
import React from "react";
import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
import { Separator } from "@/components/ui/separator";
import SideBar from "./_components/AppSideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div
      className={
        "flex h-screen flex-col flex-grow items-start justify-start self-stretch"
      }
    >
      <AppNavBar onSidebarHandleClick={() => setShowSidebar(!showSidebar)} />
      <Separator />
      <div className="h-full w-full flex flex-row">
        <SideBar className={`h-full w-[465px]${!showSidebar ? ' hidden' : ''}`} />
        {children}
      </div>
    </div>
  );
}
