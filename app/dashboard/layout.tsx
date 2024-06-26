import React from "react";
import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader";
import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
// import { AppNavBar } from "@/app/ui/dashboard/AppNavBar";
import { TextDataCard } from "@/app/ui/components/data/DataCard";
import { Divider } from "@nextui-org/react";

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
      {children}
    </div>
  );
}
