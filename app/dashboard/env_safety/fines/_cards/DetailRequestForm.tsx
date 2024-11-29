"use client"

import * as React from "react"
import { LuDownload } from "react-icons/lu";
import { IoIosInformation } from "react-icons/io";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

import { GeneratedType, Root } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const labelStyle = "p-1 h-5 border py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/80 rounded-[10px]"

const Filter = ({ title, values, value, onChange }: { title: string, values: string[], value: string[], onChange: React.Dispatch<React.SetStateAction<string[]>> }) => {

    return (
        <div className="w-full flex flex-row justify-start items-center px-3 py-2 border rounded-md" data-active>
            <span className="text-s text-nowrap">{title}</span>
            <ToggleGroup type="multiple" className="px-4 gap-2 flex justify-start flex-row flex-wrap grow" value={value} onValueChange={onChange}>
                {values.map((f) => (
                    <ToggleGroupItem variant={"outline"} className={labelStyle} key={f} value={f} aria-label={`Toggle ${f}`}>
                        <span className="text-xs">{f}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

function InfoSheet({ data }: { data: { [s: string]: any; } }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="secondary"
                    color="primary"
                    size="icon"
                    className="rounded-full h-5 w-5 p-0">
                    <IoIosInformation />
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>詳細資料</SheetTitle>
                </SheetHeader>
                <div className="h-full flex flex-col gap-4 pt-4">
                    {Object.entries(data).map(([key, value], i) => (
                        <div key={i} className="flex flex-row justify-between items-start border-b gap-3 p-2">
                            <span className="text-start text-xs text-nowrap font-semibold">{key}</span>
                            <span className="text-xs">{value}</span>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}

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

    const downloadCurrentDataCsv = React.useCallback(() => {
        const csv = dataColumns.join(",") + "\n" + filteredData.map((d) => {
            return dataColumns.map((col) => d[col]).join(",")
        }).join("\n")

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    }, [filteredData, dataColumns])

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="w-full flex justify-between items-center">
                        <span className="text-xl">今年度違反法令事項統計</span>
                        <Button variant="secondary" color="primary" size={"sm"}
                            onClick={() => downloadCurrentDataCsv()}><LuDownload />Excel 下載</Button>
                    </CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grow p-3 flex flex-col gap-2">
                <Filter title={"廠區篩選"} values={factories} value={factoryFilterArr} onChange={setFactoryFilterArr} />
                <Filter title={"污染篩選"} values={pollutions} value={pollutionFilterArr} onChange={setPollutionFilterArr} />
                <Table className="overflow-auto">
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            {dataColumns.map((col) => <TableHead className="text-nowrap" key={col}>{col}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((d, i) => (
                            <TableRow key={i}>
                                <TableCell className="text-nowrap flex justify-center items-center pr-0">
                                    <InfoSheet data={d} />
                                </TableCell>
                                {dataColumns.map((col) => <TableCell className="text-nowrap" key={col}>{d[col]}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
