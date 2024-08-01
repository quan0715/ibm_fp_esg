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
} from "@/app/dashboard/location_and_asset/location/_actions/PostDataAction";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { useSearchParams } from "next/navigation";
import { AssetLocationDataForm } from "../_blocks/DataForm";
import { AssetType } from "@/domain/entities/AssetType";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
type AssetDataDisplay = {
  data: AssetLocationEntity;
  ancestors: AssetLocationEntity[];
  sibling: AssetLocationEntity[];
  children: AssetLocationEntity[];
};

export default function Page() {
  const searchParams = useSearchParams();
  const queryRoute = useAssetQueryRoute();
  const [selectedData, setSelectedData] =
    useState<AssetLocationEntity | null>();

  const [dashboardAssetData, setDashboardAssetData] =
    useState<AssetDataDisplay>({
      data: AssetData.createNew(AssetType.Organization, []).toEntity(),
      ancestors: [],
      sibling: [],
      children: [],
    });

  useEffect(() => {
    async function fetchData() {
      if (queryRoute.mode === "create") {
        console.log("create mode");
        queryRoute.revalidatePath();
        let res = await getDashboardAssetDataInCreateMode(queryRoute.parentId);
        setDashboardAssetData({
          data: res.newData,
          ancestors: res.ancestors,
          sibling: res.sibling,
          children: res.children,
        });
      } else {
        console.log("display mode");
        const res = await getDashboardAssetData(queryRoute.assetId);

        if (queryRoute.assetId.length === 0) {
          queryRoute.setAssetId(res.data.id!);
        }

        setDashboardAssetData({
          data: res.data,
          ancestors: res.ancestors,
          sibling: res.sibling,
          children: res.children,
        });
      }
    }

    fetchData();
  }, [searchParams]);

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="w-full flex flex-col justify-start items-center space-y-2">
          {dashboardAssetData.ancestors.map((ancestor) => (
            <DashboardColumnMin
              assetType={ancestor.type}
              assetData={ancestor}
              onClick={() => queryRoute.setAssetId(ancestor.id!)} // adjust this if ancestors should be selectable
              key={ancestor.name}
            />
          ))}
          <AssetDataList
            assetType={dashboardAssetData.data?.type!}
            assetDataList={dashboardAssetData.sibling}
            selectedId={
              queryRoute.mode === "display"
                ? dashboardAssetData.data?.id
                : undefined
            }
          />
        </div>
        <div className="col-span-3">
          {dashboardAssetData.sibling.length > 0 &&
          queryRoute.mode === "display" ? (
            <AssetLocDataCard
              data={dashboardAssetData.data!}
              key={dashboardAssetData.data!.name}
              assetChildren={dashboardAssetData.children}
            />
          ) : (
            <AssetLocationDataForm data={dashboardAssetData.data!} />
          )}
        </div>
      </div>
    </div>
  );
}
