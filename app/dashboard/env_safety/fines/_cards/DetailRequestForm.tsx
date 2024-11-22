"use client"

// need rwd

import * as React from "react"

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

import { Root } from "../_fake_data_type"
import { cn } from "@nextui-org/react"

import { Bold, Italic, Underline } from "lucide-react"

const labelStyle = "p-1 h-5 border py-0.5 text-xs font-semibold transition-colors focus:outline-none border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/80 rounded-[10px]"

const Filter = ({ title, values, value, onChange }: { title: string, values: string[], value: string[], onChange: React.Dispatch<React.SetStateAction<string[]>> }) => {

    return (
        <div className="w-full flex flex-row justify-start items-center px-3" data-active>
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

export default function Component({ data, className }: { data: Root, className?: string }) {
    const factories = React.useMemo(() => ["烯烴部", "保養中心", "碼槽處", "公用部", "公務部", "煉油部"], [])
    const pollutions = React.useMemo(() => ["空汙", "溫室氣體", "水汙", "廢棄物", "毒化物", "海汙"], [])

    const [factoryFilterArr, setFactoryFilterArr] = React.useState<string[]>([])
    const [pollutionFilterArr, setPollutionFilterArr] = React.useState<string[]>([])

    return (
        <Card className={cn(["flex flex-col h-fit", className])}>
            <CardHeader className="space-y-0 border-b p-0">
                <div className="gap-1 px-6 py-5">
                    <CardTitle className="text-xl">今年度違反法令事項統計</CardTitle>
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
            <CardContent className="grow p-3 flex flex-col gap-2">
                <Filter title={"廠區篩選"} values={factories} value={factoryFilterArr} onChange={setFactoryFilterArr} />
                <Filter title={"污染篩選"} values={pollutions} value={pollutionFilterArr} onChange={setPollutionFilterArr} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>發生部門</TableHead>
                            <TableHead>汙染類別</TableHead>
                            <TableHead>時間起迄</TableHead>
                            <TableHead>發生時間</TableHead>
                            <TableHead>損失金額(千元)</TableHead>
                            <TableHead>訴願情形</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.data.flatMap((d) => {
                            if (factoryFilterArr.length > 0 && !factoryFilterArr.includes(d["廠處"])) return []
                            if (pollutionFilterArr.length == 0) return d["罰單"]
                            return d["罰單"].filter((d) => pollutionFilterArr.includes(d["汙染類別"]))
                        }).map((d, i) => (
                            <TableRow key={i}>
                                <TableCell>{d["發生部門"]}</TableCell>
                                <TableCell>{d["汙染類別"]}</TableCell>
                                <TableCell>{d["時間起迄"]}</TableCell>
                                <TableCell>{d["發生時間"]}</TableCell>
                                <TableCell>{d["損失金額(千元)"]}</TableCell>
                                <TableCell>{d["訴願情形"]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
