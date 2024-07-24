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
  // const orgId = "669764b4e1b6f7cb9d170a31";
  // url = http://localhost:3000/dashboard/location_and_asset/location?organization=669764b4e1b6f7cb9d170a31&site=66978d55e1b6f7cb9d170a34&phase=&department=
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  const [children, setChildren] = useState<AssetLocationEntity[]>([]);
  const queryPathService = new QueryPathService(searchParams);
  useEffect(() => {
    async function fetchData() {
      console.log("fetching data");
      // console.log("search path", getSearchPath());
      const data = await getDashboardAssetData(
        queryPathService.getSearchPath()
      );
      setAncestors(data.ancestors);
      setChildren(data.children);
    }

    fetchData();
  }, [searchParams]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const resetQuery = (resetId: string) => {
    const newPath = queryPathService.popBackSearchPath(resetId);
    const newSearchPathString = queryPathService.createQueryString(newPath);
    router.push(pathName + "?" + newSearchPathString);
  };

  const targetData = children[selectedIndex];
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
            assetType={targetData?.type}
            assetDataList={children}
            selectedIndex={selectedIndex}
            onSelectedChange={handleSelect}
          />
        </div>

        <div className="col-span-3">
          {targetData && (
            <AssetLocDataCard
              data={targetData}
              variant={"expand"}
              key={targetData.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
