// "use client";
import React from "react";
import { DataCard, DashboardColumn } from "../_blocks/DataCard";
import { CreateDataDialog } from "../_blocks/CreateDataDialog";
import { DataNotFound } from "../_blocks/DataNotFound";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";
import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetType } from "@/domain/entities/AssetType";
export default async function Page() {
  const repo = new MongoAssetLocRepository();
  const remoteData = await repo.retrieveAssetLocData();
  const orgData = remoteData.filter(
    (data) => data.type === AssetType.Organization
  );
  const siteData = remoteData.filter((data) => data.type === AssetType.Site);
  const phaseData = remoteData.filter((data) => data.type === AssetType.Phase);
  const deptData = remoteData.filter(
    (data) => data.type === AssetType.Department
  );

  return (
    <div
      className={
        "w-full h-fit flex flex-col justify-start items-start space-y-2"
      }
    >
      <div className={"w-full h-fit grid grid-cols-4 gap-4 "}>
        <DashboardColumn
          assetType={AssetType.Organization}
          assetDataList={orgData}
        />
        <DashboardColumn assetType={AssetType.Site} assetDataList={siteData} />
        <DashboardColumn
          assetType={AssetType.Phase}
          assetDataList={phaseData}
        />
        <DashboardColumn
          assetType={AssetType.Department}
          assetDataList={deptData}
        />
      </div>
    </div>
  );
}
