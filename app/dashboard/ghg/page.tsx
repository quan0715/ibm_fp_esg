"use client";

import { KPIDisplayBlock } from "@/app/dashboard/ghg/_blocks/KPIDisplayBlock";
import { OverviewLineChart } from "@/app/dashboard/ghg/_blocks/OverviewLineChart";
import { PassYearKPIBarChart } from "@/app/dashboard/ghg/_blocks/PassYearKPIBarChart";
import { ByLocKPIBarChart } from "@/app/dashboard/ghg/_blocks/ByLocKPIBarChart";
import { TabsContent } from "@/components/ui/tabs";


function Page1(){
  return (
    <div className={"w-full h-fit grid grid-cols-4 grid-rows-2 gap-4 "}>
        <div className={"col-span-1"}>
          <KPIDisplayBlock />
        </div>
        <div className={"col-span-3"}>
          <OverviewLineChart />
        </div>
        <div className={"col-span-1"}>
          <PassYearKPIBarChart />
        </div>
        <div className={"col-span-3"}>
          <ByLocKPIBarChart />
        </div>
      </div>
  )
}

function TempPage({title}: {title: string}){
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1>{`${title} 施工中`}</h1>
    </div>
  )
}

export default function Page() {
  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start items-start space-y-2"
      }
    >
      <TabsContent className="w-full" value="ghg_year">
        <Page1/>
      </TabsContent>
      <TabsContent className="w-full" value="ghg_loc">
        <TempPage title="ghg_loc"/>
      </TabsContent>
      <TabsContent className="w-full" value="ghg_data">
        <TempPage title="ghg_data"/>
      </TabsContent>
    </div>
  );
}
