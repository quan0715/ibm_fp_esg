"use client"

import * as React from "react"

import { Root } from "../_fake_data_type"
import DataForm from "@/app/dashboard/_components/DataForm"

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
        <DataForm data={chartData} title={"今年度違反法令事項統計"} className={className} />
    )
}
