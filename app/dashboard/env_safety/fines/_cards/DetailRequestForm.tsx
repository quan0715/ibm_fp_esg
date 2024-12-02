"use client"

import * as React from "react"
import { LuDownload } from "react-icons/lu";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { GeneratedType, Root } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

import { Button } from "@/components/ui/button"
import DataTable, { DataTableRefType, Filter } from "@/app/dashboard/_components/DataTable";

export default function Component({ data, className }: { data: Root, className?: string }) {
    const factories = React.useMemo(() => ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"], [])
    const pollutions = React.useMemo(() => ["空汙", "溫室氣體", "水汙", "廢棄物", "毒化物", "海汙"], [])

    const [factoryFilterArr, setFactoryFilterArr] = React.useState<string[]>([])
    const [pollutionFilterArr, setPollutionFilterArr] = React.useState<string[]>([])

    const dataColumns = React.useMemo<(keyof GeneratedType)[]>(() => ["發生部門", "汙染類別", "時間起迄", "發生時間", "損失金額(千元)", "訴願情形"], [])
    const filteredData = React.useMemo(() => data.data.flatMap((d) => {
        if (factoryFilterArr.length > 0 && !factoryFilterArr.includes(d["廠處"])) return []
        if (pollutionFilterArr.length == 0) return d["罰單"]
        return d["罰單"].filter((d) => pollutionFilterArr.filter((p) => d["汙染類別"].includes(p)).length > 0)
    }), [data, factoryFilterArr, pollutionFilterArr])

    const dataTableRef = React.useRef<DataTableRefType>(null);

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="w-full flex justify-between items-center">
                        <span className="text-xl">今年度違反法令事項統計</span>
                        <Button variant="secondary" color="primary" size={"sm"}
                            onClick={() => dataTableRef.current?.downloadCurrentDataCsv()}><LuDownload />Excel 下載</Button>
                    </CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grow p-3 flex flex-col gap-2">
                <Filter title={"廠區篩選"} values={factories} value={factoryFilterArr} onChange={setFactoryFilterArr} />
                <Filter title={"污染篩選"} values={pollutions} value={pollutionFilterArr} onChange={setPollutionFilterArr} />
                <DataTable ref={dataTableRef} dataColumns={dataColumns} data={filteredData} />
            </CardContent>
        </Card>
    )
}
