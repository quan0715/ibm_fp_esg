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

import { AuthorityAuditReport, PlantAuthorityReport } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

import { Button } from "@/components/ui/button"
import DataTable, { DataTableRefType, Filter } from "@/app/dashboard/_components/DataTable";

export default function Component({ data, className }: { data: PlantAuthorityReport[], className?: string }) {
    const factories = React.useMemo(() => ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"], [])

    const [factoryFilterArr, setFactoryFilterArr] = React.useState<string[]>([])

    const dataColumns = React.useMemo<(keyof AuthorityAuditReport)[]>(() => (Object.keys(data[0]["通報單"][0]) as (keyof AuthorityAuditReport)[]), [])
    const filteredData = React.useMemo(() => data.flatMap((d) => {
        if (factoryFilterArr.length > 0 && !factoryFilterArr.includes(d["廠處"])) return []
        return d["通報單"]
    }), [data, factoryFilterArr])

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
                <DataTable ref={dataTableRef} dataColumns={dataColumns} data={filteredData} />
            </CardContent>
        </Card>
    )
}
