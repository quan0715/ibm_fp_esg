import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DashboardPageHeader } from "../../_components/DashboardPageHeader";
import { headers } from "next/headers";

export default function Layout({
  children,
  all,
}: {
  children: React.ReactNode;
  all: React.ReactNode;
}) {
  const heads = headers();

  return (
    <div className="w-full h-fit flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader title={"位置階層基本資料"} />
      <Separator />
      <Tabs defaultValue="assets_dashboard" className="w-full h-full">
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          <TabsTrigger value="assets_dashboard">位置階層設定</TabsTrigger>
        </TabsList>
        <Separator />
        <div className="w-full h-full bg-secondary p-2">
          <TabsContent value="assets_dashboard">{all}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
