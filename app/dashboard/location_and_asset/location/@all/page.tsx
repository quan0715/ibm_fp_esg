"use client";
import React, { useEffect } from "react";
import {
  AssetDataList,
  DashboardColumnMin,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataColumn";
import { AssetLocDataCard } from "../_blocks/DataCard";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetLocationDataForm } from "../_blocks/DataForm";
import {
  AssetType,
  getAssetChildrenTypeOptions,
  getAssetType,
} from "@/domain/entities/AssetType";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { useAssetLocationData } from "../_hooks/useAssetLocationData";
import { Skeleton } from "@/components/ui/skeleton";
import { LuCornerDownRight } from "react-icons/lu";
import { colorVariants, getAssetEntityInfo } from "../_utils/assetTypeUIConfig";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";

export function NavigateMenu({
  isBlocking = false,
  ancestors = [],
  siblings = [],
  path = [],
}: {
  isBlocking?: boolean;
  ancestors?: AssetLocationEntity[];
  siblings?: AssetLocationEntity[];
  path?: string[];
}) {
  const queryRoute = useAssetQueryRoute();

  useEffect(() => {
    console.log("ancestors", ancestors);
    console.log("siblings", siblings);
    console.log("path", path);
  }, [isBlocking]);
  function getAssetTypeFromParent() {
    const parent =
      ancestors.length > 0 ? ancestors[ancestors.length - 1] : undefined;

    return parent !== undefined ? parent.type : AssetType.None;
  }
  return isBlocking ? (
    <Skeleton className="flex bg-white w-full flex-col justify-center items-center space-y-2">
      <LoadingWidget />
    </Skeleton>
  ) : (
    <div className="md:flex w-full flex-col justify-start items-center space-y-2">
      {ancestors.map((ancestor) => (
        <DashboardColumnMin
          assetType={ancestor.type}
          assetData={ancestor}
          onClick={() => queryRoute.setAssetId(ancestor.id!)} // adjust this if ancestors should be selectable
          key={ancestor.name}
        />
      ))}
      <div className="w-full flex flex-row items-start justify-start space-x-1">
        {ancestors.length > 0 ? (
          <LuCornerDownRight
            size={18}
            className={
              colorVariants[getAssetEntityInfo(getAssetTypeFromParent()).color]
                .textColor
            }
          />
        ) : null}
        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
          {getAssetChildrenTypeOptions(getAssetTypeFromParent()).map((type) => (
            <AssetDataList
              key={type}
              assetType={type}
              assetSearchPath={path}
              assetDataList={siblings.filter((data) => data.type === type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  const queryRoute = useAssetQueryRoute();
  const assetDataSearch = useAssetLocationData();
  const mode = queryRoute.mode;
  const assetId = queryRoute.assetId;

  if (assetId === "" && mode === "display") {
    queryRoute.setAssetId("669764b4e1b6f7cb9d170a31");
  }

  useEffect(() => {
    // console.log("assetId", assetId, "mode", mode);
    assetDataSearch.setAssetId(assetId);
    assetDataSearch.setMode(mode);
  }, [assetId, mode]);

  const isBlocking =
    assetDataSearch.isFetchingData || assetDataSearch.assetData === undefined;

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="hidden md:block">
          <NavigateMenu
            isBlocking={isBlocking}
            ancestors={assetDataSearch.ancestors}
            siblings={assetDataSearch.sibling}
            path={assetDataSearch.assetData?.ancestors || []}
          />
        </div>
        <div className="col-span-4 md:col-span-3">
          {isBlocking || assetDataSearch.isFetchingChildren ? (
            <Skeleton className="bg-white w-full h-full flex flex-col justify-center items-center space-y-2">
              <LoadingWidget />
            </Skeleton>
          ) : assetDataSearch.sibling.length > 0 &&
            queryRoute.mode === "display" ? (
            <AssetLocDataCard
              data={assetDataSearch.assetData!}
              key={assetDataSearch.assetData!.name}
              assetChildren={assetDataSearch.children}
            />
          ) : (
            <AssetLocationDataForm
              data={
                queryRoute.mode === "create"
                  ? AssetData.createNew(
                      getAssetType(queryRoute.assetType),
                      queryRoute.ancestors || []
                    ).toEntity()
                  : assetDataSearch.assetData!
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
