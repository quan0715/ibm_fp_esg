"use client";
import React, { useEffect } from "react";
import {
  AssetDataList,
  DashboardColumnMin,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataColumn";
import { AssetLocDataCard } from "../_blocks/DataCard";
import { useState } from "react";
import { getDashboardAssetData } from "@/app/dashboard/location_and_asset/location/_actions/PostDataAction";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { useSearchParams } from "next/navigation";
import { AssetLocationDataForm } from "../_blocks/DataForm";
import { AssetType } from "@/domain/entities/AssetType";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";

export default function Page() {
  const searchParams = useSearchParams();

  const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  const [siblings, setAssetDataWithSameAncestor] = useState<
    AssetLocationEntity[]
  >([]);
  const [selectedAsset, setSelectedAsset] = useState<AssetLocationEntity>();
  const [assetChildren, setAssetChildren] = useState<AssetLocationEntity[]>([]);

  const queryRoute = useAssetQueryRoute();
  // const queryPathService = new QueryPathService(searchParams);
  // const selectedAssetId = queryPathService.getAssetId();
  // const selectedMode = queryPathService.getMode();

  useEffect(() => {
    async function fetchData() {
      const { data, ancestors, sibling, children } =
        await getDashboardAssetData(queryRoute.assetId);
      if (queryRoute.assetId.length === 0) {
        queryRoute.setAssetId(data.id!);
      }
      setAncestors(ancestors);
      setAssetDataWithSameAncestor(sibling);
      setSelectedAsset(data);
      setAssetChildren(children);
    }
    fetchData();
  }, [searchParams]);

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="w-full flex flex-col justify-start items-center space-y-2">
          {ancestors.map((ancestor) => (
            <DashboardColumnMin
              assetType={ancestor.type}
              assetData={ancestor}
              onClick={() => queryRoute.setAssetId(ancestor.id!)} // adjust this if ancestors should be selectable
              key={ancestor.name}
            />
          ))}
          <AssetDataList
            assetType={selectedAsset?.type!}
            assetDataList={siblings}
            selectedId={
              queryRoute.mode === "display" ? selectedAsset?.id : undefined
            }
          />
        </div>
        <div className="col-span-3">
          {siblings.length > 0 && queryRoute.mode === "display" ? (
            <AssetLocDataCard
              data={selectedAsset!}
              key={selectedAsset!.name}
              assetChildren={assetChildren}
            />
          ) : queryRoute.mode === "edit" ? (
            <AssetLocationDataForm
              defaultAssetType={selectedAsset?.type ?? AssetType.None}
              data={selectedAsset!}
            />
          ) : (
            <AssetLocationDataForm
              defaultAssetType={selectedAsset?.type ?? AssetType.None}
              data={AssetData.createNew(
                selectedAsset?.type ?? AssetType.Organization,
                selectedAsset?.ancestors ?? []
              ).toEntity()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
