import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  console.log(params.page);
  return (
    <div className="w-full h-full flex flex-col flex-grow justify-start items-center bg-background">
      <AppNavBar pageName={"data"} />
      <Separator />
      <DashboardPageHeader title={"GHG KPI"}>
        <TextDataCard label="上次更新時間" data={new Date().toLocaleString()} />
      </DashboardPageHeader>
      <Separator />
      <Tabs defaultValue="ghg_year" className="w-full h-full">
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          <TabsTrigger value="ghg_year">GHG減量大盤</TabsTrigger>
          <TabsTrigger value="ghg_loc"> GHG減量廠管理</TabsTrigger>
          <TabsTrigger value="ghg_data">GHG各廠區 RAW DATA</TabsTrigger>
        </TabsList>
        <Separator />
        <div className={"w-full h-full p-4 bg-secondary"}>{children}</div>
      </Tabs>
    </div>
  );
}
