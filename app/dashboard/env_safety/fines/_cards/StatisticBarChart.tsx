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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Data } from "../_db/DataType"
import { labelStyle } from "@/app/dashboard/_components/labelStyle"
import { useMemo } from "react"

const GroupBy = ({ values, value, onChange }: { values: string[], value: string, onChange: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <div className="flex flex-row justify-start items-center px-3" data-active>
            <ToggleGroup type="single" className="px-4 gap-2 flex justify-start flex-row flex-wrap grow" value={value} onValueChange={onChange}>
                {values.map((f) => (
                    <ToggleGroupItem variant={"outline"} className={labelStyle} key={f} value={f} aria-label={`Toggle ${f}`}>
                        <span className="text-xs text-nowrap">{f}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

const barChartConfig = {
    desktop: {
        label: "罰單金額",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "罰單數量",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig
const departments = ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"]


export default function Component({ data, className }: { data: Data[], className?: string }) {
    const [groupBy, setGroupBy] = React.useState("依場處")

    const BarChartData = useMemo(() => departments.map((department) => {
        const filter = data.filter((item) => item["廠處"] === department)
        return {
            month: department,
            desktop: Math.round(filter.reduce((acc, curr) => acc + curr["損失金額(千元)"], 0) / 1000),
            mobile: filter.length,
        }
    }), [data])
    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="flex w-full justify-between items-center">
                        <span className="max-sm:text-xl">今年度罰單資訊資料統計</span>
                        <GroupBy value={groupBy} onChange={setGroupBy} values={["依場處", "依汙染物"]} />
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
