"use client";
import React, { use, useEffect } from "react";
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

function LoadingWidget() {
  return (
    <div className="flex w-fit p-4 flex-row justify-center items-center space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500 delay-0 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-blue-500 delay-75 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-purple-500 delay-150 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-green-500 delay-225 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500 delay-300 animate-bounce"></div>
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
    console.log("assetId", assetId, "mode", mode);
    assetDataSearch.setAssetId(assetId);
    assetDataSearch.setMode(mode);
  }, [assetId, mode]);

  function getAssetTypeFromParent() {
    const parent =
      assetDataSearch.ancestors.length > 0
        ? assetDataSearch.ancestors[assetDataSearch.ancestors.length - 1]
        : undefined;

    return parent !== undefined ? parent.type : AssetType.None;
  }
  const isLoading =
    assetDataSearch.isFetchingData || assetDataSearch.assetData === undefined;
  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        {isLoading ? (
          <Skeleton className="bg-white w-full flex flex-col justify-center items-center space-y-2">
            <LoadingWidget />
          </Skeleton>
        ) : (
          <div className="w-full flex flex-col justify-start items-center space-y-2">
            {assetDataSearch.ancestors.map((ancestor) => (
              <DashboardColumnMin
                assetType={ancestor.type}
                assetData={ancestor}
                onClick={() => queryRoute.setAssetId(ancestor.id!)} // adjust this if ancestors should be selectable
                key={ancestor.name}
              />
            ))}
            <div className="pl-4 w-full flex flex-col items-center justify-center space-y-2">
              {getAssetChildrenTypeOptions(getAssetTypeFromParent()).map(
                (type) => (
                  <AssetDataList
                    key={type}
                    assetType={type}
                    assetSearchPath={assetDataSearch.assetData!.ancestors}
                    assetDataList={assetDataSearch.sibling.filter(
                      (data) => data.type === type
                    )}
                  />
                )
              )}
            </div>
          </div>
        )}
        <div className="col-span-3">
          {isLoading || assetDataSearch.isFetchingChildren ? (
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
