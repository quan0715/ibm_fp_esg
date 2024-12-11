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
        <div className="gap-1 px-6 py-5 self-center">
          <CardTitle className="text-lg">{kpi.title}</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grow p-3 flex">
        <div className="flex flex-col justify-center items-center grow shrink">
          <CountUpComponent end={kpi.value} duration={800} />
          <p className={"text-md fon  t-normal text-primary/50"}>{kpi.unit}</p>
          {/*{chartData.map(({ label, value }, i) => {*/}
          {/*    return (*/}
          {/*        <div*/}
          {/*            key={i}*/}
          {/*            data-active={i == 0}*/}
          {/*            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"*/}
          {/*        >*/}
          {/*            <span className="text-xs text-muted-foreground">*/}
          {/*                {label}*/}
          {/*            </span>*/}
          {/*            <div className="grow flex w-full justify-center">*/}
          {/*                <span className="text-lg font-bold leading-none sm:text-3xl self-center">*/}
          {/*                    {value.toLocaleString()}*/}
          {/*                </span>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*    )*/}
          {/*})}*/}
        </div>
      </CardContent>
    </Card>
  );
}
