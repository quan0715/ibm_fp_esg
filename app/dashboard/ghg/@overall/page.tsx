'use client'
import { KPIDisplayBlock } from "./_blocks/KPIDisplayBlock";
import { OverviewLineChart } from "./_blocks/OverviewLineChart";
import { PassYearKPIBarChart } from "./_blocks/PassYearKPIBarChart";
import { ByLocKPIBarChart } from "./_blocks/ByLocKPIBarChart";

export default function OverAll() {
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