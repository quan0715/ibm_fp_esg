"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentGroupType } from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { Suspense, useEffect, useState } from "react";
import { useDocumentData } from "../_hooks/useDocument";
import { DocumentNavigateMenu } from "../_blocks/DocumentNavigationMenu";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";

type DocumentPageProps = {
  pageIndex: string;
  docGroupType: DocumentGroupType;
};
function SuspenseWidget() {
  return (
    <Skeleton className="bg-background w-full h-full flex flex-col justify-center items-center space-y-2">
      <LoadingWidget />
    </Skeleton>
  );
}

function ErrorWidget({ message }: { message: string }) {
  return (
    <DashboardCard className="w-full h-full flex flex-col justify-center items-center space-y-2">
      <p className="text-destructive">{message}</p>
    </DashboardCard>
  );
}
export function DocumentPage({ pageIndex, docGroupType }: DocumentPageProps) {
  const queryRoute = useDataQueryRoute();
  const dateQueryService = useDocumentData(docGroupType);
  const mode = queryRoute.mode;
  const dataId = queryRoute.dataId;
  const isDisplayMode = queryRoute.mode === "display";
  const isCreateMode = queryRoute.mode === "create";
  const isFetching =
    dateQueryService.isFetchingData || dateQueryService.isFetchingChildren;
  const isError = dateQueryService.errorMessage !== "";

  useEffect(() => {
    async function handleEmptyData() {
      const defaultData = await dateQueryService.getDefaultData();
      if (defaultData === null) {
        queryRoute.createNewAsset(getGroupDefaultType(docGroupType), "");
      } else {
        queryRoute.setAssetId(defaultData.id!);
        dateQueryService.setMode(mode);
      }
    }
    if (dataId === "" && isDisplayMode) {
      handleEmptyData();
    } else {
      dateQueryService.setDataId(dataId);
      dateQueryService.setMode(mode);
    }
  }, [dataId, mode]);

  const isBlocking =
    isFetching || (isDisplayMode && dateQueryService.assetData === undefined);

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="col-span-1 hidden md:block">
          {isError ? (
            <ErrorWidget message={dateQueryService.errorMessage} />
          ) : isBlocking ? (
            <SuspenseWidget />
          ) : dateQueryService.assetData ? (
            <DocumentNavigateMenu
              key={"navigate menu: display"}
              group={docGroupType}
              data={dateQueryService.assetData!}
              ancestors={dateQueryService.ancestors}
              siblings={dateQueryService.sibling}
              searchPath={dateQueryService.assetData?.ancestors ?? ""}
            />
          ) : null}
        </div>
        <div className="col-span-4 md:col-span-3">
          {isError ? (
            <ErrorWidget message={dateQueryService.errorMessage} />
          ) : !isBlocking ? (
            isDisplayMode ? (
              <DocumentDataCardForm
                key={"display data"}
                groupType={docGroupType}
                data={dateQueryService.assetData!}
                childData={dateQueryService.children}
              />
            ) : (
              <DocumentDataCardForm
                key={"create new data"}
                groupType={docGroupType}
                // data={dateQueryService.assetData!}
                data={createNewDocument(
                  queryRoute.dataType,
                  queryRoute.ancestors ?? "",
                  docGroupType
                )}
              />
            )
          ) : (
            <SuspenseWidget />
          )}
        </div>
      </div>
    </div>
  );
}
