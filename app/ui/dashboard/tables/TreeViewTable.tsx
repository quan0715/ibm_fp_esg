"use client";
// import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableColumn,
} from "@nextui-org/table";
import { WindLevelIcon } from "@/app/ui/dashboard/components/WindLevelIcon";
import { useState, useContext } from "react";
import {
  AssetOperationDataSchema,
  AssetOperationDataSchemaModel,
} from "@/models/AssetOperationDataModel";
import { set } from "zod";

type TreeViewColumnProps = {
  name: string;
  uid: string;
  sortable: boolean;
  renderCell?: (item: TreeViewTableDataType, value: any) => JSX.Element;
};

type TreeViewTableDataType = AssetOperationDataSchemaModel & {
  isExpanded: boolean;
  isHidden: boolean;
};

function updateExpandStatus(
  item: TreeViewTableDataType,
  treeData: TreeViewTableDataType[],
  expandedStatus: boolean
): TreeViewTableDataType[] {
  const childrenIndexList = item.childrenIndex;

  var childData = treeData.filter((treeDataItem) =>
    childrenIndexList.includes(treeDataItem.index)
  );

  if (childrenIndexList.length === 0) {
    return [
      {
        ...item,
        isHidden: !expandedStatus,
      },
    ];
  } else {
    let res = [
      {
        ...item,
        isHidden: !expandedStatus,
      },
    ];
    let arr: TreeViewTableDataType[] = [];
    for (let i = 0; i < childrenIndexList.length; i++) {
      arr = arr.concat(
        updateExpandStatus(childData[i], treeData, expandedStatus)
      );
    }
    return res.concat(arr);
  }
}

export function OperationDataTreeViewTable({
  data,
}: {
  data: AssetOperationDataSchemaModel[];
}) {
  const [selectedKey, setSelectedKey] = useState([""]);
  const [selectedData, setSelectedData] =
    useState<AssetOperationDataSchemaModel | null>(null);
  // const [hiddenNodes, setHiddenNodes] = useState<number[]>([]);
  const [treeData, setTreeData] = useState<TreeViewTableDataType[]>(
    data.map((item) => {
      return {
        ...item,
        isHidden: false,
        isExpanded: true,
      } as TreeViewTableDataType;
    })
  );

  const columns: TreeViewColumnProps[] = [
    {
      name: "Asset Name",
      uid: "assetName",
      sortable: true,
      renderCell: (item, value) => {
        const isExpandable = item.expandable;
        const cssSpace = `w-${item.level * 4}`;
        return (
          <div className={"flex flex-row items-center"}>
            <div className={cssSpace}></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // console.log("click" , item.isExpanded)
                const itemIndex = treeData.findIndex(
                  (treeDataItem) => treeDataItem.index === item.index
                );
                const childrenIndex = item.childrenIndex;
                const expandedStatus = !item.isExpanded;
                const updatedTreeData = updateExpandStatus(
                  item,
                  treeData,
                  expandedStatus
                );
                const updatedIndexList = updatedTreeData.map(
                  (item) => item.index
                );

                console.log("updatedIndexList", updatedIndexList);
                console.log("updated", updatedTreeData);
                setTreeData(
                  treeData.map((treeDataItem) => {
                    if (treeDataItem.index === item.index) {
                      return {
                        ...treeDataItem,
                        isExpanded: expandedStatus,
                      };
                    } else if (updatedIndexList.includes(treeDataItem.index)) {
                      let updatedItem = updatedTreeData.find(
                        (item) => item.index === treeDataItem.index
                      );
                      if (updatedItem) {
                        return {
                          ...updatedItem,
                        };
                      }
                    }
                    return { ...treeDataItem };
                  })
                );
              }}
              className={isExpandable ? "" : "opacity-0"}
            >
              {/*{*/}
              {/*    item.isExpanded*/}
              {/*        ? <MaterialIcon icon={"expand_more"} className={``}></MaterialIcon>*/}
              {/*        : <MaterialIcon icon={"expand_less"} className={``}></MaterialIcon>*/}
              {/*}*/}
            </button>
            <p>{item.assetName as string}</p>
          </div>
        );
      },
    },
    {
      name: "發電量",
      uid: "powerGeneration",
      sortable: true,
      renderCell: (item, value) => {
        const powerGeneration = value as number;
        return powerGeneration !== -1 ? (
          <div>{`${value as number} MW`}</div>
        ) : (
          <div> </div>
        );
      },
    },
    {
      name: "風速",
      uid: "windSpeed",
      sortable: true,
      renderCell: (item, value) => {
        const windSpeed = value as number;
        return windSpeed !== -1 ? (
          <div className={"flex-row flex  items-center space-x-5"}>
            <div className="flex flex-col w-10">
              <p className="text-bold capitalize">{`${value as number}`}</p>
              <p className="text-bold text-tiny capitalize text-default-400">
                {" "}
                M/S{" "}
              </p>
            </div>
            <div className={"wind_icon flex flex-row space-x-1 items-end"}>
              <WindLevelIcon speed={value as number} />
            </div>
          </div>
        ) : (
          <div> </div>
        );
      },
    },
    {
      name: "溫度",
      uid: "temperature",
      sortable: true,
      renderCell: (item, value) => {
        const temperature = value as number;
        return temperature !== -1 ? <div>{`${value} ºC`}</div> : <div> </div>;
      },
    },
    {
      name: "發電狀態",
      uid: "powerGenerationStatus",
      sortable: true,
      renderCell: (item, value) => {
        const cellValue = value as unknown as string;
        const emptyCell = <div> </div>;
        switch (cellValue as unknown as string) {
          case "運轉中":
            return (
              <Chip color={"success"} variant={"bordered"}>
                {cellValue as unknown as string}
              </Chip>
            );
          case "異常":
            return (
              <Chip color={"danger"} variant={"bordered"}>
                {cellValue as unknown as string}
              </Chip>
            );
          case "警告":
            return (
              <Chip color={"warning"} variant={"bordered"}>
                {cellValue as unknown as string}
              </Chip>
            );
          default:
            return emptyCell;
        }
      },
    },
  ];

  const renderCell = ({
    item,
    columnKey,
  }: {
    item: TreeViewTableDataType;
    columnKey: React.Key;
  }) => {
    const itemData = item.data;
    const emptyCell = <div> </div>;
    const cellValue = itemData[columnKey as keyof typeof item.data];
    const column = columns.find((column) => column.uid === columnKey);
    if (column && column.renderCell) {
      return column.renderCell(item, cellValue);
    }
    return emptyCell;
  };

  return (
    // <DashboardCard title={"Asset Performance List"} className={"flex-grow"}>
    <Table
      radius={"none"}
      border={0}
      color={"primary"}
      shadow={"none"}
      removeWrapper={false}
      selectionMode={"single"}
      selectionBehavior={"replace"}
      classNames={{ th: "bg-background text-sm border-b-1 border-primary" }}
      aria-label={"Operation performance list"}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid}>{column.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"no items to display"} items={treeData}>
        {(data) => (
          <TableRow
            key={data.index}
            onClick={() => {
              // console.log("row click");
              setSelectedKey([data.index.toString()]);
              setSelectedData(data);
            }}
          >
            {(columnKey) => {
              const isHidden = data.isHidden ? "hidden" : "";
              return (
                <TableCell className={isHidden} key={columnKey}>
                  {renderCell({
                    item: data,
                    columnKey: columnKey,
                  })}
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
    // </DashboardCard>
  );
}
