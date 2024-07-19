"use server";

import { Button } from "@/components/ui/button";
import { LuRefreshCcw, LuSaveAll } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { CreateNewAssetLocationDataDialog } from "../_blocks/DataDialog";
import { DashboardColumn } from "../_blocks/DataColumn";

import { AssetType } from "@/domain/entities/AssetType";
import { DataNotFound } from "../_blocks/DataNotFound";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";
import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";

// function ToolBar({ children }: { children: React.ReactNode }) {
//   return (
//     <div
//       className={
//         "h-12 w-full flex flex-row items-center justify-start rounded-xl shadow-sm p-2 bg-background space-x-2"
//       }
//     >
//       {React.Children.map(children, (child, index) => {
//         return (
//           <>
//             {child}
//             {index !== React.Children.count(children) - 1 && (
//               <Separator orientation="vertical" />
//             )}
//           </>
//         );
//       })}
//     </div>
//   );
// }

export default async function Page() {
  const repo = new MongoAssetLocRepository();
  const remoteData = await repo.retrieveAssetLocData();
  const data = remoteData.filter((data) => data.type === AssetType.Department);
  return (
    <div
      className={
        "w-full h-fit flex flex-col justify-start items-start space-y-2"
      }
    >
      {/* <ToolBar>
        <CreateDataDialog />
        <Button size={"icon"} variant={"ghost"}>
          <LuRefreshCcw></LuRefreshCcw>
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <LuSaveAll></LuSaveAll>
        </Button>
      </ToolBar> */}
      <div className={"w-full h-fit grid grid-cols-1 gap-4 "}>
        <DashboardColumn
          assetType={AssetType.Department}
          assetDataList={data}
        />
      </div>
    </div>
  );
}
