'use client'
import { DashboardCard, DashboardCardHeader } from "../../_blocks/DashboardCard";

export default function Data() {
  return (
    <div className={"w-full h-[812px] grid grid-cols-6 grid-rows-1 gap-4"}>
        <div className="col-span-1 row-span-1 bg-background">
          <DashboardCard>
            <DashboardCardHeader title={"篩選列表"} />
          </DashboardCard>
        </div>
        <div className="col-span-5 row-span-1 bg-background">
          <DashboardCard>
            <DashboardCardHeader title={"GHG各廠區 原始數據"} />
          </DashboardCard>
        </div>
    </div>
  );
}
