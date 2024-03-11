
'use client'
import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { Chip } from "@nextui-org/chip";
import { Table, TableHeader, TableRow, TableCell, TableBody, TableColumn} from "@nextui-org/table";
import { WindLevelIcon } from "@/app/ui/dashboard/components/WindLevelIcon";
import { useState, useContext } from "react";
import { MaterialIcon } from "@/app/ui/assets/MaterialIcon";
import { AssetOperationDataModel } from "@/models/AssetOperationDataModel";

const columns = [
    {name: "Asset Name", uid:"assetsName", sortable: true},
    {name: "發電量", uid:"powerGeneration", sortable: true},
    {name: "風速", uid:"windSpeed", sortable: true},
    {name: "溫度", uid:"temperature", sortable: true},
    {name: "發電狀態", uid:"powerGenerationStatus", sortable: true},
]


const renderCell = ({item, columnKey} : {item: AssetOperationDataModel, columnKey: React.Key }) => {
    const itemData = item.data
    const cellValue = itemData[columnKey as keyof typeof item.data];
    switch (columnKey){
        case "assetsName":
            const isExpandable = true
            return (
                <div className={"flex flex-row items-center"}>
                    <button onClick={
                        (e) => {
                            e.stopPropagation()
                            console.log("click")
                        }
                    } className={isExpandable ? "" : "opacity-0"}>
                        <MaterialIcon icon={"expand_more"} className={``}></MaterialIcon>
                    </button>
                    <p>{cellValue as number}</p>
                </div>
            )
        case "powerGeneration":
            return (<div>{`${cellValue as number} MW`}</div>)
        case "windSpeed":
            return (
              <div className={"flex-row flex  items-center space-x-5"}>
                  <div className="flex flex-col w-10">
                      <p className="text-bold capitalize">{`${cellValue as number}`}</p>
                      <p className="text-bold text-tiny capitalize text-default-400"> M/S </p>
                  </div>
                  <div className={"wind_icon flex flex-row space-x-1 items-end"}>
                      <WindLevelIcon speed={cellValue as number}/>
                  </div>
              </div>
          )
        case "temperature":
          return(<div>{`${cellValue} ºC`}</div>)
    case "powerGenerationStatus":
        switch (cellValue as unknown as string){
            case "運轉中":
                return(<Chip color={"success"} variant={"bordered"}>{cellValue as unknown as string}</Chip>)
            case "異常":
                return(<Chip color={"danger"} variant={"bordered"}>{cellValue as unknown as string}</Chip>)
            case "警告":
                return(<Chip color={"warning"} variant={"bordered"}>{cellValue as unknown as string}</Chip>)
            default:
                return(<div>{cellValue as unknown as string}</div>)
        }
      default:
          return(<div>{cellValue as unknown as string}</div>)
  }
}

export function OperationDataTreeViewTable({data} : {data: AssetOperationDataModel[]}) {

    const [selectedKey, setSelectedKey] = useState([""]);
    const [selectedData, setSelectedData] = useState<AssetOperationDataModel | null>(null);


    return (
        <DashboardCard title={"Asset Performance List"} className={"flex-grow"}>
            <Table
                radius={"none"}
                border={0}
                color={"primary"}
                shadow={"none"}
                removeWrapper={false}
                classNames={{
                    'th': 'bg-background text-sm border-b-1 border-primary',
                }}
                selectionMode={"single"}
                selectionBehavior={"replace"}
                aria-label={"Operation performance list"}>
                <TableHeader>
                    {
                        columns.map(
                            (column) => (
                                <TableColumn key={column.uid}>{column.name}</TableColumn>
                            )
                        )
                    }
                </TableHeader>
                <TableBody emptyContent={"no items to display"} items={data}>{
                        (data) => (
                            <TableRow key={data.index} onClick={
                                () => {
                                    console.log("row click");
                                    setSelectedKey([data.index.toString()]);
                                    setSelectedData(data);
                                }}>{
                                    (columnKey) => {
                                        return (
                                            <TableCell key={columnKey}>{
                                                renderCell({
                                                    item: data,
                                                    columnKey: columnKey})}
                                            </TableCell>
                                        )
                                    }
                                }
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </DashboardCard>
    )
}
