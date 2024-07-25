"use client";
import React, { useEffect } from "react";
import {
  AssetDataList,
  DashboardColumnMin,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataColumn";
import { AssetLocDataCard } from "../_blocks/DataCard";
import { useState } from "react";
import { getDashboardAssetData } from "@/app/dashboard/location_and_asset/location/_actions/PostDataAction";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { QueryPathService } from "@/domain/Services/QueryParamsService";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { set } from "date-fns";
export default function Page() {
  // url = http://localhost:3000/dashboard/location_and_asset/location?organization=669764b4e1b6f7cb9d170a31&site=66978d55e1b6f7cb9d170a34&phase=66a0cbf9af3f4bfd2d82272f&department=
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  const [assetDataWithSameAncestor, setAssetDataWithSameAncestor] = useState<
    AssetLocationEntity[]
  >([]);
  const [selectedAsset, setSelectedAsset] = useState<AssetLocationEntity>();
  const [assetChildren, setAssetChildren] = useState<AssetLocationEntity[]>([]);
  const queryPathService = new QueryPathService(searchParams);

  useEffect(() => {
    const selectedAssetId = queryPathService.getAssetId();

    async function fetchData() {
      const { ancestors, assetData, assetDataListWithSamePath, children } =
        await getDashboardAssetData(selectedAssetId);

      setAncestors(ancestors);
      setAssetDataWithSameAncestor(assetDataListWithSamePath);
      setSelectedAsset(assetData);
      setAssetChildren(children);
    }
    fetchData();
  }, [searchParams]);

  const resetQuery = (resetId: string) => {
    // const newSearchPathString = queryPathService.createQueryString(
    //   newPath,
    //   resetId
    // );
    const newSearchPathString = queryPathService.createQueryString(resetId);
    const path = queryPathService.getPath(pathName, newSearchPathString);
    router.replace(path);
  };

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="w-full flex flex-col justify-start items-center space-y-2">
          {ancestors.map((ancestor) => (
            <DashboardColumnMin
              assetType={ancestor.type}
              assetData={ancestor}
              onClick={() => resetQuery(ancestor.id!)} // adjust this if ancestors should be selectable
              key={ancestor.name}
            />
          ))}
          <AssetDataList
            assetType={selectedAsset?.type!}
            assetDataList={assetDataWithSameAncestor}
            selectedId={selectedAsset?.id}
          />
        </div>
        <div className="col-span-3">
          {assetDataWithSameAncestor.length > 0 && (
            <AssetLocDataCard
              data={selectedAsset!}
              key={selectedAsset!.name}
              assetChildren={assetChildren}
            />
          )}
        </div>
      </div>
    </div>
  );
}
