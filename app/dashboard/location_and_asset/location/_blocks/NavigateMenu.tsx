"use client";
import { AssetLocationEntity } from "@/domain/entities/Location";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import {
  AssetDataList,
  LocationDataAncestorView,
} from "./LocationDataDisplayUI";
import { LuCornerDownRight } from "react-icons/lu";
import {
  LocationType,
  getLocationChildrenTypeOptions,
} from "@/domain/entities/LocationType";
import {
  colorVariants,
  getAssetEntityInfo,
} from "../_utils/locationTypeUIConfig";

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
  }, [isBlocking, ancestors, siblings, path]);
  function getAssetTypeFromParent() {
    const parent =
      ancestors.length > 0 ? ancestors[ancestors.length - 1] : undefined;

    return parent !== undefined ? parent.type : LocationType.none;
  }
  return isBlocking ? (
    <Skeleton className="flex bg-background w-full h-full flex-col justify-center items-center space-y-2">
      <LoadingWidget />
    </Skeleton>
  ) : (
    <div className="md:flex w-full flex-col justify-start items-center space-y-2">
      {ancestors.map((ancestor) => (
        <LocationDataAncestorView
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
          {getLocationChildrenTypeOptions(getAssetTypeFromParent()).map(
            (type) => (
              <AssetDataList
                key={type}
                assetType={type}
                assetSearchPath={path}
                assetDataList={siblings.filter((data) => data.type === type)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
