"use client"

import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Root } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

export default function Component({ data, className }: { data: Root, className?: string }) {
    const chartData = React.useMemo(
        () => ([{
            label: "總罰單數量", value: data.data.reduce((acc, item) => acc + item["罰單"].length, 0),
        },
        {
            label: "總罰單金額（萬）", value: data.data.reduce((acc, item) => acc + item["罰單"].reduce((acc, item) => acc + item["損失金額(千元)"], 0), 0),
        }]),
        [data.data]
    )

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="text-xl">今年度罰單資訊資料統計</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grow p-3 flex">
                <div className="flex flex-col border grow shrink">
                    {chartData.map(({ label, value }, i) => {
                        return (
                            <div
                                key={i}
                                data-active={i == 0}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                            >
                                <span className="text-xs text-muted-foreground">
                                    {label}
                                </span>
                                <div className="grow flex w-full justify-center">
                                    <span className="text-lg font-bold leading-none sm:text-3xl self-center">
                                        {value.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
