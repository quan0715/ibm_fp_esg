"use client"

import * as React from "react"

import DataForm from "@/app/dashboard/_components/DataForm"
import { Data } from "../_db/DataType"

export default function Component({ data, className }: { data: Data[], className?: string }) {
    const chartData = React.useMemo(
        () => ([{
            label: "總罰單數量", value: data.length,
        },
        {
            label: "總罰單金額（萬）", value: Math.round(data.reduce((acc, item) => acc + item["損失金額(千元)"], 0) / 1e4),
        }]),
        [data]
    )

    return (
        <DataForm data={chartData} title={"今年度違反法令事項統計"} className={className} />
    )
}
