import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DashboardPageHeader } from "@/app/dashboard/_components/DashboardPageHeader";
export default function Layout({
  children,
  locManagement,
  data,
  overall,
}: {
  children: React.ReactNode;
  locManagement: React.ReactNode;
  data: React.ReactNode;
  overall: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader title={"GHG KPI"} />
      <Separator />
      <Tabs defaultValue="ghg_year" className="w-full h-full">
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          <TabsTrigger value="ghg_year">GHG減量大盤</TabsTrigger>
          <TabsTrigger value="ghg_loc"> GHG減量廠管理</TabsTrigger>
          <TabsTrigger value="ghg_data">GHG各廠區 RAW DATA</TabsTrigger>
        </TabsList>
        <Separator />
        <div className="w-full h-full bg-secondary p-4">
          <TabsContent value="ghg_year">{overall}</TabsContent>
          <TabsContent value="ghg_loc">{locManagement}</TabsContent>
          <TabsContent value="ghg_data">{data}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
