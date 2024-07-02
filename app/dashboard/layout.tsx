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
        "flex h-screen flex-col flex-grow items-start justify-start self-stretch bg-background"
      }
    >
      <AppNavBar />
      <Separator />
      {children}
    </div>
  );
}
