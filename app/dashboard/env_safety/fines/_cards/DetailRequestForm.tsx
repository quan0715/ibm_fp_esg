"use client"

import * as React from "react"
import { LuDownload, LuUpload } from "react-icons/lu";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { cn } from "@nextui-org/react"

import { Button } from "@/components/ui/button"
import DataTable, { DataTableRefType, Filter } from "@/app/dashboard/_components/DataTable";
import { Data, DataParser } from "../_db/DataType";
import { addData } from "../_db/Actions";

export default function Component({ data, className }: { data: Data[], className?: string }) {
    const factories = React.useMemo(() => ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"], [])
    const pollutions = React.useMemo(() => ["空汙", "溫室氣體", "水汙", "廢棄物", "毒化物", "海汙"], [])

    const [factoryFilterArr, setFactoryFilterArr] = React.useState<string[]>([])
    const [pollutionFilterArr, setPollutionFilterArr] = React.useState<string[]>([])

    const dataColumns = React.useMemo<(keyof Data)[]>(() => [
        "廠處",
        "發生部門",
        "汙染類別",
        "時間起迄",
        "發生時間",
        "損失金額(千元)",
        "訴願情形",
    ], [])
    const filteredData = React.useMemo(() => data.filter((d) => {
        if (factoryFilterArr.length > 0 && !factoryFilterArr.includes(d["廠處"])) return false;
        if (pollutionFilterArr.length == 0) return true;
        return pollutionFilterArr.includes(d["廠處"])
    }), [data, factoryFilterArr, pollutionFilterArr])

    const dataTableRef = React.useRef<DataTableRefType>(null);

    const uploadData = React.useCallback(async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const reader = new FileReader();
            const parser = new DataParser();
            reader.onload = async (e) => {
                try {
                    await addData(parser.fromCSV(e.target?.result as string));
                    window.location.reload();
                } catch (e) {
                    alert(e)
                }
            }
            reader.readAsText(file);
        }
        input.click();
    }, [])

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5 @container">
                    <CardTitle className="w-full flex justify-between items-center gap-3 flex-wrap @[390px]:flex-nowrap">
                        <span className="text-xl shrink-0">今年度違反法令事項統計</span>
                        <div className="flex flex-row gap-3 @[390px]:flex-wrap justify-end shrink self-end">
                            <Button className="w-[115px]" variant="secondary" color="primary" size={"sm"}
                                onClick={uploadData}><LuUpload />上傳資料</Button>
                            <Button className="w-[115px]" variant="secondary" color="primary" size={"sm"}
                                onClick={() => dataTableRef.current?.downloadCurrentDataCsv()}><LuDownload />Excel 下載</Button>
                        </div>
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
