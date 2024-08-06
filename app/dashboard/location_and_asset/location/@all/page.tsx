"use client";
import React, { useEffect } from "react";
import {
  AssetDataList,
  DashboardColumnMin,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataColumn";
import { AssetLocDataCard } from "../_blocks/DataCard";
import { useState } from "react";
import {
  getDashboardAssetData,
  getDashboardAssetDataInCreateMode,
  // getDashboardAssetDataInCreateMode,
} from "@/app/dashboard/location_and_asset/location/_actions/PostDataAction";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { useSearchParams } from "next/navigation";
import { AssetLocationDataForm } from "../_blocks/DataForm";
import {
  AssetType,
  getAssetChildrenTypeOptions,
  getAssetType,
} from "@/domain/entities/AssetType";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { useAssetLocationData } from "../_hooks/useAssetLocationData";

type AssetDataDisplay = {
  data: AssetLocationEntity;
  ancestors: AssetLocationEntity[];
  sibling: AssetLocationEntity[];
  children: AssetLocationEntity[];
};

export default function Page() {
  const searchParams = useSearchParams();
  const queryRoute = useAssetQueryRoute();

  const assetDataSearch = useAssetLocationData();

  useEffect(() => {
    assetDataSearch.setAssetId(queryRoute.assetId);
  }, [searchParams]);

  function getAssetTypeFromParent() {
    const parent =
      assetDataSearch.ancestors.length > 0
        ? assetDataSearch.ancestors[assetDataSearch.ancestors.length - 1]
        : undefined;

    return parent !== undefined ? parent.type : AssetType.None;
  }

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      {assetDataSearch.isFetchingData ||
      assetDataSearch.assetData === undefined ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full min-h-screen grid grid-cols-4 gap-4">
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
                    assetSearchPath={assetDataSearch.assetData?.ancestors ?? []}
                    assetDataList={assetDataSearch.sibling.filter(
                      (data) => data.type === type
                    )}
                  />
                )
              )}
            </div>
          </div>
          <div className="col-span-3">
            {assetDataSearch.sibling.length > 0 &&
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
      )}
    </div>
  );
}
