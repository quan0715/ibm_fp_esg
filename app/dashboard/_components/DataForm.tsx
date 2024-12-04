"use client"

import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@nextui-org/react"
import { memo } from "react"

export default memo<{ data: { label: string, value: any }[], title: string, className?: string }>(function Component({ data, className, title }) {

    return (
        <Card className={cn(["flex flex-col h-fit @container", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="text-wrap text-left max-sm:text-xl">{title}</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grow p-3 flex">
                <div className="flex flex-col grow shrink @sm:flex-row">
                    {data.map(({ label, value }, i) => {
                        return (
                            <div
                                key={i}
                                data-active={i % 2 == 0}
                                className="relative border z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left data-[active=true]:bg-muted/50 @sm:px-2 @sm:py-2 rounded-md"
                            >
                                <span className="text-xs text-muted-foreground">
                                    {label}
                                </span>
                                <div className="grow flex w-full justify-center @sm:py-4">
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
})
