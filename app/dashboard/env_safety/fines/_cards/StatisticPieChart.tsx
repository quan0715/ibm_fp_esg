"use client"

import * as React from "react"

import { Label, Pie, PieChart } from "recharts"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Root } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const pieChartData = [
    { browser: "烯烴部", visitors: 275, fill: "var(--color-烯烴部)" },
    { browser: "保養中心", visitors: 200, fill: "var(--color-保養中心)" },
    { browser: "碼槽處", visitors: 287, fill: "var(--color-碼槽處)" },
    { browser: "公用部", visitors: 173, fill: "var(--color-公用部)" },
    { browser: "公務部", visitors: 190, fill: "var(--color-公務部)" },
    { browser: "煉油部", visitors: 190, fill: "var(--color-煉油部)" },
]

const pieChartConfig = {
    visitors: {
        label: "Visitors",
    },
    "烯烴部": {
        label: "烯烴部",
        color: "hsl(var(--chart-1))",
    },
    "保養中心": {
        label: "保養中心",
        color: "hsl(var(--chart-2))",
    },
    "碼槽處": {
        label: "碼槽處",
        color: "hsl(var(--chart-3))",
    },
    "公用部": {
        label: "公用部",
        color: "hsl(var(--chart-4))",
    },
    "公務部": {
        label: "公務部",
        color: "hsl(var(--chart-5))",
    },
    "煉油部": {
        label: "煉油部",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig


export default function Component({ data, className }: { data: Root, className?: string }) {
    const totalVisitors = React.useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="text-xl">今年度罰單資訊資料統計</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="@container flex-1 pb-0">
                <ChartContainer
                    config={pieChartConfig}
                    className="mx-auto aspect-square max-h-[250px] @sm:hidden"
                >
                    <PieChart className="flex flex-row">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={pieChartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 10}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}張
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 20}
                                                    className="fill-muted-foreground"
                                                >
                                                    總罰單數量
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <ChartContainer
                    config={pieChartConfig}
                    className="mx-auto aspect-square max-h-[350px] hidden @sm:flex"
                >
                    <PieChart className="flex flex-row">
                        <Pie
                            data={pieChartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={70}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 10}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}張
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 20}
                                                    className="fill-muted-foreground"
                                                >
                                                    總罰單數量
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            content={<ChartLegendContent nameKey="browser" />}
                            className="flex flex-col -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-start items-stretch"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
