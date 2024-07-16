"use client";

import { Button } from "@/components/ui/button";
import { LuRefreshCcw, LuSaveAll } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { DataCard } from "../_blocks/DataCard";
import { CreateDataDialog } from "../_blocks/CreateDataDialog";
import { OrganizationAssetLocData } from "@/domain/entities/Asset";
import { AssetType } from "@/domain/entities/AssetType";
import { DataNotFound } from "../_blocks/DataNotFound";

function ToolBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "h-12 w-full flex flex-row items-center justify-start rounded-xl shadow-sm p-2 bg-background space-x-2"
      }
    >
      {React.Children.map(children, (child, index) => {
        return (
          <>
            {child}
            {index !== React.Children.count(children) - 1 && (
              <Separator orientation="vertical" />
            )}
          </>
        );
      })}
    </div>
  );
}

export const fakeOrgData: OrganizationAssetLocData[] = [
  {
    id: "TSMC",
    name: "TSMC",
    description: "Taiwan Semiconductor Manufacturing Company",
    type: AssetType.Organization,
    parentType: AssetType.None,
    childrenType: AssetType.Site,
    lat: 24.769,
    lon: 121.023,
    addressLine1: null,
    addressLine2: null,
    city: "Hsinchu",
    country: "Taiwan",
    zip: "224",
    children: ["F12", "F14", "F15"],
  },
];

export default function Page() {
  return (
    <div
      className={
        "w-full h-fit flex flex-col justify-start items-start space-y-2"
      }
    >
      <ToolBar>
        <CreateDataDialog />
        <Button size={"icon"} variant={"ghost"}>
          <LuRefreshCcw></LuRefreshCcw>
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <LuSaveAll></LuSaveAll>
        </Button>
      </ToolBar>
      {fakeOrgData.length > 0 ? (
        <div className={"w-full h-fit grid grid-cols-2 gap-4 "}>
          {fakeOrgData.map((data) => {
            return (
              <DataCard<OrganizationAssetLocData> data={data} key={data.name} />
            );
            // return <OrgDataCard orgData={data} key={data.name}></OrgDataCard>;
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
    </div>
  );
}
