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

export default function Page() {
  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="col-span-1 hidden md:block">
          <Skeleton className="h-full w-full flex bg-white flex-col justify-center items-center space-y-2">
            <LoadingWidget />
          </Skeleton>
        </div>
        <div className="col-span-4 md:col-span-3">
          <Skeleton className="bg-white h-full w-full flex flex-col justify-center items-center space-y-2">
            <LoadingWidget />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
