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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const labelStyle = "p-1 h-5 border py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/80 rounded-[10px]"

const GroupBy = ({ values, value, onChange }: { values: string[], value: string, onChange: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <div className="flex flex-row justify-start items-center px-3" data-active>
            <ToggleGroup type="single" className="px-4 gap-2 flex justify-start flex-row flex-wrap grow" value={value} onValueChange={onChange}>
                {values.map((f) => (
                    <ToggleGroupItem variant={"outline"} className={labelStyle} key={f} value={f} aria-label={`Toggle ${f}`}>
                        <span className="text-xs">{f}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

const pieChartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const pieChartConfig = {
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


const BarChartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]
const barChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


export default function Component({ data, className }: { data: Root, className?: string }) {
    const [groupBy, setGroupBy] = React.useState("依場處")
    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="flex w-full justify-between items-center">
                        <span className="text-xl">今年度罰單資訊資料統計</span>
                        <GroupBy value={groupBy} onChange={setGroupBy} values={["依場處", "依汙染物種類"]} />
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="@container flex-1 flex-row justify-between items-end">
                <ChartContainer config={barChartConfig}
                    className="w-full flex">
                    <BarChart accessibilityLayer data={BarChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis orientation="right" width={30} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <ChartLegend
                            align="center"
                            verticalAlign="bottom"
                            content={<ChartLegendContent />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}