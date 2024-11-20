"use client"

import * as React from "react"

import { Label, Pie, PieChart } from "recharts"
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
const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export default function Component({ data, className }: { data: Root, className?: string }) {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className={cn(["flex flex-col h-fit @container", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle>今年度罰單資訊資料統計</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0 shrink">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] @sm:hidden"
                >
                    <PieChart className="flex flex-row">
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Pie
                            data={chartData}
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
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px] hidden @sm:flex"
                >
                    <PieChart className="flex flex-row">
                        <Pie
                            data={chartData}
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
