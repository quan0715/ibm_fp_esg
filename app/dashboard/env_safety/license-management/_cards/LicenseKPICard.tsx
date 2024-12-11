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
import { LicenseKPI } from "../_fake_data_type";
import { cn } from "@nextui-org/react";
import CountUpComponent from "@/app/dashboard/_components/CountUpAnimationComponent";
import { Label } from "@/components/ui/label";

export default function Component({
  kpi,
  className,
}: {
  kpi: LicenseKPI;
  className?: string;
}) {
  return (
    <Card className={cn(["flex flex-col h-fit", className])}>
      <CardHeader className="space-y-0 border-b p-0">
        <div className="gap-1 px-6 py-5 self-center">
          <CardTitle className="text-lg">{`全公司${kpi.pollutionType}許可證`}</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grow p-3 flex">
        <div className="flex flex-rol justify-center items-center grow shrink">
          <div className={"p-4 rounded-xl bg-blue-50 flex-1 h-full"}>
            <Label className={"text-blue-500"}>清點數量</Label>
            <CountUpComponent end={kpi.numberOfLicense} duration={800} />
          </div>
          <div className={"p-4 rounded-xl flex-1 h-full"}>
            <Label className={"text-blue-500"}>最近到期日</Label>
            <p
              className={
                "flex flex-col justify-center items-center text-lg font-semibold p-4"
              }
            >
              {kpi.latestExpirationDate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
