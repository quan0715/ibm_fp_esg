"use server";
import React from "react";
import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
import { Separator } from "@/components/ui/separator";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "flex h-screen w-screen flex-col flex-grow items-start justify-start self-stretch"
      }
    >
      <AppNavBar />
      <Separator />
      <div className="h-full w-full overflow-x-hidden flex flex-row">{children}</div>
    </div>
  );
}
