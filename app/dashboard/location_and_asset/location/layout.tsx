import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DashboardPageHeader } from "../../_components/DashboardPageHeader";
export default function Layout({
  children,
  organizationL1,
  factoryL2,
  phaseL2_5,
  departmentL3,
}: {
  children: React.ReactNode;
  organizationL1: React.ReactNode;
  factoryL2: React.ReactNode;
  phaseL2_5: React.ReactNode;
  departmentL3: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader title={"位置與資產基本資料"} />
      <Separator />
      <Tabs defaultValue="assets_org" className="w-full h-full">
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          <TabsTrigger value="assets_org">Organization Level1</TabsTrigger>
          <TabsTrigger value="assets_fac">Factory Level2</TabsTrigger>
          <TabsTrigger value="assets_phase">Phase Level2.5</TabsTrigger>
          <TabsTrigger value="assets_dept">Department Level3</TabsTrigger>
        </TabsList>
        <Separator />
        <div className="w-full h-full bg-secondary p-2">
          <TabsContent value="assets_org">{organizationL1}</TabsContent>
          <TabsContent value="assets_fac">{factoryL2}</TabsContent>
          <TabsContent value="assets_phase">{phaseL2_5}</TabsContent>
          <TabsContent value="assets_dept">{departmentL3}</TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
