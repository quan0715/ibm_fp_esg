"use client";
import { cn } from "@/lib/utils";

import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import React, { memo, useState } from "react";
import { AssetType } from "@/domain/entities/AssetType";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";

import {
  getAssetEntityInfo,
  colorVariants,
  AssetTypeColor,
} from "@/app/dashboard/location_and_asset/location/_utils/assetTypeUIConfig";
import { AssetLocDataCard } from "@/app/dashboard/location_and_asset/location/_blocks/DataCard";
import { Separator } from "@/components/ui/separator";
import {
  LuBoxSelect,
  LuCheck,
  LuLoader2,
  LuPlus,
  LuSpline,
  LuTextSelect,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { date } from "zod";
import { createNewData } from "../_actions/PostDataAction";
import { Skeleton, Spinner } from "@nextui-org/react";

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
  className,
  assetType,
  assetSearchPath,
  assetDataList,
}: {
  className?: string;
  assetType: AssetType;
  assetSearchPath: string[];
  assetDataList: AssetLocationEntity[];
}) {
  const assetInfo = getAssetEntityInfo(assetType);
  const tailwindColorClass = assetInfo.color;

  const colorVariant = colorVariants[tailwindColorClass];
  const queryPathService = useAssetQueryRoute();
  const assetId = queryPathService.assetId;
  const data = assetDataList.find((data) => data.id === assetId);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <DashboardCard className={cn(className)}>
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
            return (
              <Link
                href={queryPathService.getNewDisplayURL(data.id ?? "")}
                key={data.id}
              >
                <AssetLocDataListView
                  data={data}
                  selected={data.id === assetId}
                  key={data.name}
                />
                {index < assetDataList.length - 1 ? <Separator /> : null}
              </Link>
            );
          })}
        </div>
        {isLoading ? (
          // create loading spinner
          <div className="w-full flex items-center justify-center">
            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : null}
        <Button
          variant={"ghost"}
          className={cn(colorVariant.textColor)}
          onClick={async () => {
            console.log("presentation: UI button clicked - create new data");
            // setIsLoading(true);
            // // set 3 seconds delay to simulate server response
            // // await new Promise((resolve) => setTimeout(resolve, 3000));
            // const newAssetIndex = await createNewData(
            //   AssetData.createNew(
            //     assetType,
            //     assetSearchPath // add current asset id to ancestors
            //   ).toEntity()
            // );
            // setIsLoading(false);
            // queryPathService.setAssetId(newAssetIndex);
            queryPathService.createNewAsset(assetType, assetSearchPath);
          }}
        >
          <LuPlus />
          新增 {assetInfo.label}
        </Button>
      </DashboardCardContent>
    </DashboardCard>
  );
}

export const AssetLocDataListView = memo(function AssetLocDataListView({
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
      // onClick={onClick}
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
});

export const DashboardColumnMin = memo(function DashboardColumnMin({
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
});
