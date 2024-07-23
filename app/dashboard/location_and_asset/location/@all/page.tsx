// "use client";
import React from "react";
import {
  DashboardColumn,
  DashboardColumnMin,
} from "@/app/dashboard/location_and_asset/location/_blocks/DataColumn";
import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetType } from "@/domain/entities/AssetType";
import { AssetLocDataCard } from "../_blocks/DataCard";
export default async function Page() {
  const repo = new MongoAssetLocRepository();
  const remoteData = await repo.retrieveAssetLocData();
  // const orgData = remoteData.filter(
  //   (data) => data.type === AssetType.Organization
  // );
  // const siteData = remoteData.filter((data) => data.type === AssetType.Site);
  // const phaseData = remoteData.filter((data) => data.type === AssetType.Phase);
  // const deptData = remoteData.filter(
  //   (data) => data.type === AssetType.Department
  // );

  function compareWithSearchPath(
    ancestors: string[],
    searchAncestorPath: string[]
  ) {
    if (ancestors.length !== searchAncestorPath.length) {
      return false;
    }

    for (let i = 0; i < ancestors.length; i++) {
      if (ancestors[i] !== searchAncestorPath[i]) {
        return false;
      }
    }

    return true;
  }
  const orgId = "669764b4e1b6f7cb9d170a31";
  const searchAncestorPath: string[] = [orgId];

  console.log("remoteData", remoteData);
  const dataList = remoteData.filter((data) =>
    compareWithSearchPath(data.ancestors ?? ["undefined"], searchAncestorPath)
  );
  const targetData = dataList[0];

  return (
    <div
      className={
        "w-full h-fit flex flex-col justify-start items-start space-y-2"
      }
    >
      <div className={"w-full min-h-screen grid grid-cols-4 gap-4 "}>
        <div className="w-full flex flex-col justify-start items-center space-y-2">
          <DashboardColumnMin
            assetType={AssetType.Organization}
            assetData={
              remoteData.find(
                (data) =>
                  data.type === AssetType.Organization && data.id === orgId
              )!
            }
          />
          {/* <DashboardColumnMin
            assetType={AssetType.Site}
            assetData={siteData[0]}
          /> */}
          {/* <DashboardColumnMin
            assetType={AssetType.Phase}
            assetData={phaseData[0]}
          /> */}
          {/* <DashboardColumn
            assetType={AssetType.Phase}
            assetDataList={phaseData}
            dataCardVariant="preview"
          /> */}
          <DashboardColumn
            assetType={AssetType.Site}
            assetDataList={dataList}
            dataCardVariant="preview"
          />
        </div>

        <div className="col-span-3">
          <AssetLocDataCard
            data={targetData}
            variant={"expand"}
            key={targetData.name}
          />
        </div>
      </div>
    </div>
  );
}
