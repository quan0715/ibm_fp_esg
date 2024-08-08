"use client";
import React, { Suspense, useEffect } from "react";
import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetLocationDataForm } from "../_blocks/DataForm";
import { getAssetType } from "@/domain/entities/AssetType";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { useAssetLocationData } from "../_hooks/useAssetLocationData";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { NavigateMenu } from "../_blocks/NavigateMenu";
import { LocationDataPageView } from "../_blocks/DataColumn";

export default function Page() {
  return (
    <Suspense>
      <AssetLocationDashboard />
    </Suspense>
  );
}

function AssetLocationDashboard() {
  const queryRoute = useAssetQueryRoute();
  const assetDataSearch = useAssetLocationData();
  const mode = queryRoute.mode;
  const assetId = queryRoute.assetId;

  if (assetId === "" && mode === "display") {
    queryRoute.setAssetId("669764b4e1b6f7cb9d170a31");
  }

  useEffect(() => {
    assetDataSearch.setAssetId(assetId);
    assetDataSearch.setMode(mode);
  }, [assetId, mode]);

  const isBlocking =
    assetDataSearch.isFetchingData || assetDataSearch.assetData === undefined;

  const suspenseWidget = (
    <Skeleton className="bg-white w-full h-full flex flex-col justify-center items-center space-y-2">
      <LoadingWidget />
    </Skeleton>
  );

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="hidden md:block w-full h-full">
          <NavigateMenu
            isBlocking={isBlocking}
            ancestors={assetDataSearch.ancestors}
            siblings={assetDataSearch.sibling}
            path={assetDataSearch.assetData?.ancestors || []}
          />
        </div>
        <div className="col-span-4 md:col-span-3">
          {isBlocking || assetDataSearch.isFetchingChildren ? (
            suspenseWidget
          ) : assetDataSearch.sibling.length > 0 &&
            queryRoute.mode === "display" ? (
            <LocationDataPageView
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
