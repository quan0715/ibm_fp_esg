'use client'
import { Skeleton } from "@nextui-org/react";
import { DashboardCard, DashboardCardHeader } from "../../_blocks/DashboardCard";

export default function LocManagement() {
  return (
    <div className={"w-full h-[512px] grid grid-cols-2 gap-4"}>
        <div className="col-span-2 bg-background ">
          <DashboardCard>
            <DashboardCardHeader title={"篩選列表"} />
          </DashboardCard>
        </div>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
        <Skeleton className="col-span-1 bg-background"></Skeleton>
    </div>
  );
}
