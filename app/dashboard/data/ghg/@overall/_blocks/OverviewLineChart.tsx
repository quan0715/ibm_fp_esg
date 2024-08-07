import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

const data = [
  {
    year: "2010",
    real: 59,
  },
  {
    year: "2011",
    real: 71,
  },
  {
    year: "2012",
    real: 79,
  },
  {
    year: "2013",
    real: 87,
  },
  {
    year: "2014",
    real: 102,
  },
  {
    year: "2015",
    real: 116,
  },
  {
    year: "2016",
    real: 114,
    expected: 95,
  },
  {
    year: "2017",
    real: 124,
    expected: 114,
  },
  {
    year: "2018",
    real: 123,
    expected: 124,
  },
  {
    year: "2019",
    real: 136,
    expected: 137,
  },
  {
    year: "2020",
    real: 160,
    expected: 179,
    target: 161,
  },
  {
    year: "2021",
    real: 178,
    expected: 204,
    target: 180,
  },
  {
    year: "2022",
    real: 204,
    expected: 241,
    target: 210,
  },
  {
    year: "2023",
    real: 231,
    expected: 269,
    target: 230,
  },
  {
    year: "2024",
    expected: 327,
    target: 279,
  },
  {
    year: "2025",
    expected: 356,
    target: 299,
  },
  {
    year: "2026",
    expected: 415,
    target: 346,
  },
  {
    year: "2027",
    expected: 467,
    target: 385,
  },
  {
    year: "2028",
    expected: 514,
    target: 419,
  },
  {
    year: "2029",
    expected: 577,
    target: 468,
  },
  {
    year: "2030",
    expected: 607,
    target: 486,
  },
];

const chartConfig = {
  real: {
    label: "實際GHG排放量",
    color: "#4361EE",
  },
  target: {
    label: "目標GHG排放濃量",
    color: "#D00000",
  },
  expected: {
    label: "預期GHG排放量",
    color: "#4CC9F0",
  },
} satisfies ChartConfig;

export function OverviewLineChart() {
  return (
    <DashboardCard className={"h-full"}>
      <DashboardCardHeaderTest
        title={"2030碳排放減量計劃7年7%（scope1+scope2)"}
      />
      <DashboardCardContent>
        <ChartContainer config={chartConfig} className="max-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="year" axisLine={false} />
            <YAxis hide />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="real"
              type="monotone"
              stroke="var(--color-real)"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="target"
              type="monotone"
              stroke="var(--color-target)"
              strokeWidth={2}
              strokeDasharray={"5 5"}
              dot={true}
            />
            <Line
              dataKey="expected"
              type="monotone"
              stroke="var(--color-expected)"
              strokeDasharray={"5 5"}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </DashboardCardContent>
    </DashboardCard>
  );
}
