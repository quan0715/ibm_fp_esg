"use client";

// import * as React from "react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KPI } from "../_fake_data_type";
import { cn } from "@nextui-org/react";
import CountUpComponent from "@/app/dashboard/_components/CountUpAnimationComponent";
import { Label } from "@/components/ui/label";

export default function Component({
  kpi,
  className,
}: {
  kpi: KPI;
  className?: string;
}) {
  return (
    <Card className={cn(["flex flex-col h-fit", className])}>
      <CardHeader className="space-y-0 border-b p-0">
        <div className="gap-1 px-6 py-5 self-start">
          <CardTitle className="text-lg">{`今年度${kpi.location}${kpi.equipmentType}`}</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grow p-3 flex">
        <div className="flex flex-row justify-center items-center grow shrink space-x-4">
          <div className={"bg-blue-50 p-4 rounded-xl"}>
            <Label className={"text-blue-500"}>完善率%</Label>
            <CountUpComponent
              end={
                (kpi.numberOfCheckedEquipment / kpi.numberOfTotalEquipment) *
                100
              }
              duration={800}
              suffix={"%"}
            />
          </div>
          <div className={"p-4 rounded-xl"}>
            <Label className={"text-blue-500"}>清點數量</Label>
            <CountUpComponent
              end={kpi.numberOfCheckedEquipment}
              duration={800}
            />
          </div>
          <div className={"bg-blue-50 p-4 rounded-xl"}>
            <Label className={"text-blue-500"}>應變器材數量</Label>
            <CountUpComponent end={kpi.numberOfTotalEquipment} duration={800} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
