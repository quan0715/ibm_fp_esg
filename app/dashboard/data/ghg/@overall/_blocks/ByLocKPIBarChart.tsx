import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeaderTest,
} from "@/app/dashboard/_components/DashboardCard";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ByLocKPIBarChart() {
  const data = [
    {
      loc: "F1",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "F2",
      target: 129979,
      real: 1023456,
    },
    {
      loc: "FAC",
      target: 419979,
      real: 923456,
    },
    {
      loc: "TWC",
      target: 519979,
      real: 1123456,
    },
    {
      loc: "HXD",
      target: 319979,
      real: 843456,
    },
    {
      loc: "P1",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "P3",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "PWQ",
      target: 129979,
      real: 1023456,
    },
    {
      loc: "W4",
      target: 319979,
      real: 843456,
    },
    {
      loc: "W3",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "Q3",
      target: 119979,
      real: 1113456,
    },
    {
      loc: "UIO",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "UIT",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "F1",
      target: 119979,
      real: 1113456,
    },
    {
      loc: "F2",
      target: 319979,
      real: 843456,
    },
    {
      loc: "Q3",
      target: 119979,
      real: 1113456,
    },
    {
      loc: "UIO",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "UIT",
      target: 419979,
      real: 1323456,
    },
    {
      loc: "F3",
      target: 619979,
      real: 923456,
    },
  ];

  const chartConfig = {
    target: {
      label: "目標GHG排放濃度",
      color: "hsl(var(--chart-3))",
    },
    real: {
      label: "核可GHG排放濃度",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <DashboardCard className="h-full">
      <DashboardCardHeaderTest title="近5年排放量指標" />
      <DashboardCardContent className="">
        <ChartContainer config={chartConfig} className="max-h-[360px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis axisLine={false} fontSize={12} />
            <XAxis axisLine={false} dataKey={"loc"} fontSize={12} />
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
