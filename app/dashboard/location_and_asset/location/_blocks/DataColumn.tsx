import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Asset";
import React from "react";
import { AssetType } from "@/domain/entities/AssetType";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";

import {
  AssetLocationDataDialog,
  CreateNewAssetLocationDataDialog,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataDialog";
import {
  getAssetEntityInfo,
  colorVariants,
  AssetTypeColor,
} from "@/app/dashboard/location_and_asset/location/_utils/assetTypeUIConfig";
import { DataCard } from "@/app/dashboard/location_and_asset/location/_blocks/DataCard";

export function DashboardColumnLabel({
  title,
  color,
  length,
}: {
  title: string;
  color: AssetTypeColor;
  length: number;
}) {
  return (
    <>
      <div
        className={cn(
          "flex flex-rol justify-center items-center space-x-2 px-2 py-0.5 rounded-lg",
          colorVariants[color].bgColor
        )}
      >
        <div
          className={cn(
            "w-[8px] h-[8px] rounded-full",
            colorVariants[color].leadingColor
          )}
        ></div>
        <p className={"text-sm font-semibold"}>{title}</p>
      </div>
      <p className={cn("pl-4 text-md", colorVariants[color].textColor)}>
        {length}
      </p>
    </>
  );
}

export function DashboardColumn({
  assetType,
  assetDataList,
}: {
  assetType: AssetType;
  assetDataList: AssetLocationEntity[];
}) {
  const tailwindColorClass = getAssetEntityInfo(assetType).color;

  return (
    <DashboardCard>
      <DashboardCardHeader
        title={getAssetEntityInfo(assetType).label}
        titleComponent={(title: string) => (
          <DashboardColumnLabel
            title={title}
            color={tailwindColorClass}
            length={assetDataList.length}
          />
        )}
      ></DashboardCardHeader>
      <DashboardCardContent>
        <div className={"w-full h-fit grid grid-cols-1 gap-4"}>
          {assetDataList.map((data) => {
            return <AssetLocationDataDialog data={data} key={data.name} />;
          })}
        </div>
        <CreateNewAssetLocationDataDialog defaultAssetType={assetType} />
      </DashboardCardContent>
    </DashboardCard>
  );
}
