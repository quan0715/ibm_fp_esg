import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";
import React from "react";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PassYearKPIBarChart() {
  const data = [
    {
      year: "109 年",
      target: 439979,
      real: 1323456,
    },
    {
      year: "110 年",
      target: 329979,
      real: 1223456,
    },
    {
      year: "111 年",
      target: 359979,
      real: 1223456,
    },
    {
      year: "112 年",
      target: 219979,
      real: 1023456,
    },
    {
      year: "113 年",
      target: 319979,
      real: 1223456,
    },
  ];

  const chartConfig = {
    target: {
      label: "目標GHG排放濃度",
      color: "hsl(var(--chart-1))",
    },
    real: {
      label: "核可GHG排放濃度",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <DashboardCard className="h-full">
      <DashboardCardHeader title="近5年排放量指標" />
      <DashboardCardContent className="">
        <ChartContainer
          config={chartConfig}
          className="h-full max-h-[360px] w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis axisLine={false} fontSize={12} />
            <XAxis axisLine={false} dataKey={"year"} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="target" fill="var(--color-target)" radius={4} />
            <Bar dataKey="real" fill="var(--color-real)" radius={4} />
          </BarChart>
        </ChartContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
}
