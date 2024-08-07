import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DashboardPageHeader } from "../../_components/DashboardPageHeader";

export default function Layout({
  children,
  assets,
  all,
}: {
  children: React.ReactNode;
  assets: React.ReactNode;
  all: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader title={"位置階層基本資料"} />
      <Separator />
      <Tabs defaultValue="assets_location_dashboard" className="w-full h-full">
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          <TabsTrigger value="assets_location_dashboard">
            位置階層設定
          </TabsTrigger>
          <TabsTrigger value="assets_dashboard">資產主檔設定</TabsTrigger>
        </TabsList>
        <Separator />
        <div className="w-full h-full bg-secondary p-2">
          <TabsContent value="assets_location_dashboard">{all}</TabsContent>
          <TabsContent value="assets_dashboard">{assets}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
