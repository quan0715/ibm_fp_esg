import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { forwardRef, memo, useImperativeHandle } from "react";
import { IoIosInformation } from "react-icons/io";
import { labelStyle } from "./labelStyle";

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


export const Filter = ({ title, values, value, onChange }: { title: string, values: string[], value: string[], onChange: React.Dispatch<React.SetStateAction<string[]>> }) => {

    return (
        <div className="w-full flex flex-row justify-between items-center border rounded-md @container p-1" data-active>
            <span className="max-sm:text-sm text-nowrap @xl:px-4 px-2">{title}</span>
            <ToggleGroup type="multiple" className="gap-2 flex justify-start flex-row flex-wrap grow @xl:py-3 py-2" value={value} onValueChange={onChange}>
                {values.map((f) => (
                    <ToggleGroupItem variant={"outline"} className={labelStyle} key={f} value={f} aria-label={`Toggle ${f}`}>
                        <span className="text-xs">{f}</span>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

export type DataTableRefType = {
    downloadCurrentDataCsv: () => void
}

const DataTable = memo(forwardRef<DataTableRefType, { dataColumns: string[], data: Record<string, any>[] }>(({ dataColumns, data }, ref) => {
    useImperativeHandle(ref, () => ({
        downloadCurrentDataCsv: () => {
            const csv = dataColumns.join(",") + "\n" + data.map((d) => {
                return dataColumns.map((col) => d[col]).join(",")
            }).join("\n")

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }), [dataColumns, data])
    return (<Table className="overflow-auto">
        <TableHeader>
            <TableRow>
                <TableHead></TableHead>
                {dataColumns.map((col) => <TableHead className="text-nowrap" key={col}>{col}</TableHead>)}
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((d, i) => (
                <TableRow key={i}>
                    <TableCell className="text-nowrap flex justify-center items-center pr-0">
                        <InfoSheet data={d} />
                    </TableCell>
                    {dataColumns.map((col) => <TableCell className="text-nowrap" key={col}>{d[col]}</TableCell>)}
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}))

export default DataTable;