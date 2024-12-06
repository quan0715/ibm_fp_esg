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

const CountUpComponent = ({
  end,
  duration,
}: {
  end: number;
  duration: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = duration / end; // 計算每次增加的時間間隔（毫秒）
    const startTime = performance.now();

    const increment = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const currentCount = Math.min(end, Math.floor(elapsed / stepTime));
      setCount(currentCount);

      if (currentCount < end) {
        requestAnimationFrame(increment);
      }
    };

    requestAnimationFrame(increment);
  }, [end, duration]);

  return (
    <p className={"text-4xl font-semibold p-2 text-blue-500"}>
      {new Intl.NumberFormat("en-IN", {
        maximumSignificantDigits: 3,
      }).format(count)}
    </p>
  );
};
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
          <p className={"text-md font-normal text-primary/50"}>{kpi.unit}</p>
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
