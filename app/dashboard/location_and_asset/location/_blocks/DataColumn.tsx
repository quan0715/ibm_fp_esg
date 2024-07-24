"use client";
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
import { AssetLocDataCard } from "@/app/dashboard/location_and_asset/location/_blocks/DataCard";
import { Separator } from "@/components/ui/separator";
import { LuBoxSelect, LuCheck, LuTextSelect } from "react-icons/lu";
import { Button } from "@/components/ui/button";

export function DashboardColumnLabel({
  title,
  color,
  length = undefined,
}: {
  title: string;
  color: AssetTypeColor;
  length?: number;
}) {
  return (
    <>
      <div
        className={cn(
          "w-fit flex flex-rol justify-center items-center space-x-2 px-2 py-0.5 rounded-lg",
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
      {length != undefined ? (
        <p className={cn("pl-4 text-md", colorVariants[color].textColor)}>
          {length}
        </p>
      ) : null}
    </>
  );
}

export function AssetDataList({
  assetType,
  assetDataList,
  selectedIndex = -1,
  onSelectedChange,
}: {
  onSelectedChange?: (index: number) => void;
  assetType: AssetType;
  assetDataList: AssetLocationEntity[];
  selectedIndex?: number;
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
          {assetDataList.map((data, index) => {
            // return <AssetLocationDataDialog data={data} key={data.name} />;
            return (
              <>
                <AssetLocDataListView
                  data={data}
                  selected={index === selectedIndex}
                  onClick={() => onSelectedChange?.(index)}
                  key={data.name}
                />
                {index < assetDataList.length - 1 ? <Separator /> : null}
              </>
            );
          })}
        </div>
        <CreateNewAssetLocationDataDialog defaultAssetType={assetType} />
      </DashboardCardContent>
    </DashboardCard>
  );
}

export function AssetLocDataListView({
  data,
  selected = false,
  onClick,
}: {
  data: AssetLocationEntity;
  selected?: boolean;
  onClick?: () => void;
}) {
  const colorVariant = colorVariants[getAssetEntityInfo(data.type).color];
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full flex flex-row justify-between items-center p-2 rounded-md",
        "hover:cursor-pointer hover:bg-gray-100"
      )}
    >
      <div
        className={cn(
          "flex-grow w-full h-fit grid grid-cols-1 gap-2 py-2 rounded-md"
        )}
      >
        <h1 className={cn("font-semibold text-md", colorVariant.textColor)}>
          {data.name}
        </h1>
        <p className={cn("text-sm")}>{data.description}</p>
      </div>
      {selected ? (
        <div
          className={cn(
            "flex flex-col justify-center items-center",
            "w-5 h-5 rounded-full",
            colorVariant.leadingColor
          )}
        >
          <LuCheck className={"text-white"} />
        </div>
      ) : null}
    </div>
  );
}

export function DashboardColumnMin({
  assetType,
  assetData,
  onClick,
}: {
  onClick?: () => void;
  assetType: AssetType;
  assetData: AssetLocationEntity;
}) {
  const tailwindColorClass = getAssetEntityInfo(assetType).color;
  return (
    <div
      onClick={() => {
        console.log("clicked");
        onClick?.();
      }}
      className="w-full"
    >
      <DashboardCard
        className={cn(
          "flex flex-row items-center justify-between",
          "shadow-sm w-full rounded-md px-2 py-2",
          "hover:cursor-pointer hover:rounded-xl hover:animate-pulse"
        )}
      >
        <DashboardColumnLabel
          title={getAssetEntityInfo(assetType).label}
          color={tailwindColorClass}
        />
        <h1
          className={cn(
            "font-semibold text-sm",
            colorVariants[tailwindColorClass].textColor
          )}
        >
          {assetData.name}
        </h1>
      </DashboardCard>
    </div>
  );
}
