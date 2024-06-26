import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
import { dashboardConfig } from "@/lib/dashboard.config";
import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader";
import { TextDataCard } from "@/app/ui/components/data/DataCard";
import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
import { Separator } from "@/components/ui/separator";
import React from "react";
export default function Layout({
  children,
  params,
}: {
  params: { page: string };
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col flex-grow justify-start items-center bg-background">
      <AppNavBar pageName={"data"} />
      <Separator />
      <DashboardPageHeader title={"GHG KPI"}>
        <TextDataCard label="上次更新時間" data={new Date().toLocaleString()} />
      </DashboardPageHeader>
      {/*<DashboardTabBar pageName={params.page}/>*/}
      <div className={"w-full h-full"}>
        <div className={"w-full h-full p-4 bg-secondary"}>{children}</div>
      </div>
    </div>
  );
}
