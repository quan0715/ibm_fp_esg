"use client"

import * as React from "react"

import { Label, Pie, PieChart, YAxis } from "recharts"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@nextui-org/react"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Data } from "../_db/DataType"
import { useMemo } from "react"

const pieChartConfig = {
    number: {
        label: "number",
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


const barChartConfig = {
    desktop: {
        label: "罰單金額(千元)",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "罰單數量",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const departments = ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"]
export default function Component({ data, className }: { data: Data[], className?: string }) {
    const pieChartData = useMemo(() => departments.map((department) => ({
        department,
        number: data.filter((item) => item["廠處"] === department).length,
        fill: `var(--color-${department})`
    })), [data])

    const BarChartData = useMemo(() => departments.map((department) => {
        const filter = data.filter((item) => item["廠處"] === department)
        return {
            month: department,
            desktop: Math.round(filter.reduce((acc, curr) => acc + curr["損失金額(千元)"], 0) / 1000),
            mobile: filter.length,
        }
    }), [data])
    const totalTickets = React.useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.number, 0)
    }, [pieChartData])

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="text-xl">今年度罰單資訊資料統計</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-row gap-2 p-2 items-end">
                <div className="@container flex-1 pb-0">
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
                                dataKey="number"
                                nameKey="department"
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
                                                        {totalTickets.toLocaleString()}張
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
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={pieChartData}
                                dataKey="number"
                                nameKey="department"
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
                                                        {totalTickets.toLocaleString()}張
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
                                content={<ChartLegendContent nameKey="department" />}
                                className="flex flex-col -translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-start items-stretch"
                            />
                        </PieChart>
                    </ChartContainer>
                </div>
                <div className="@container flex-1 flex-row justify-between self-stretch w-full items-stretch pb-0">
                    <ChartContainer config={barChartConfig}
                        className="h-full w-full py-[5%]">
                        <BarChart accessibilityLayer data={BarChartData}
                            className="@container">
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                className="text-[8px] @[300px]:text-xs"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                interval={0}
                            />
                            <YAxis orientation="right" width={30} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            <ChartLegend
                                align="center"
                                verticalAlign="bottom"
                                content={<ChartLegendContent />}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}
