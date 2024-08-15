"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createNewDocument,
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
} from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { Suspense, useEffect, useState } from "react";
import { useDocumentData } from "../_hooks/useDocument";
import { DocumentNavigateMenu } from "../_blocks/DocumentNavigationMenu";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { group } from "console";

type DocumentPageProps = {
  pageIndex: string;
  docGroupType: DocumentGroupType;
};

export function DocumentPage({ pageIndex, docGroupType }: DocumentPageProps) {
  const queryRoute = useDataQueryRoute();
  const dateQueryService = useDocumentData(docGroupType);
  const mode = queryRoute.mode;
  const dataId = queryRoute.dataId;

  useEffect(() => {
    if (queryRoute.page === pageIndex) {
      if (dataId === "" && mode === "display") {
        dateQueryService.getDefaultData().then((data) => {
          if (data === null) {
            // dateQueryService.setAssetData(
            //   createNewDocument(queryRoute.dataType, queryRoute.ancestors ?? "", docGroupType)
            // );
            queryRoute.createNewAsset(DocumentObjectType.organization, "");
          } else {
            queryRoute.setAssetId(data.id!);
          }
        });
      } else {
        dateQueryService.setDataId(dataId);
        dateQueryService.setMode(mode);
      }
    }
  }, [dataId, mode]);

  const isBlocking =
    dateQueryService.isFetchingData ||
    (queryRoute.mode === "display" && dateQueryService.assetData === undefined);

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="col-span-1 hidden md:block">
          {dateQueryService.errorMessage !== "" ? (
            <DashboardCard className="w-full h-full flex flex-col justify-center items-center space-y-2">
              <p className="text-destructive">
                {dateQueryService.errorMessage}
              </p>
            </DashboardCard>
          ) : isBlocking ? (
            <Skeleton className="h-full w-full flex bg-background flex-col justify-center items-center space-y-2">
              <LoadingWidget />
            </Skeleton>
          ) : queryRoute.mode === "display" && dateQueryService.assetData ? (
            <DocumentNavigateMenu
              key={"navigate menu: display"}
              group={docGroupType}
              data={dateQueryService.assetData!}
              ancestors={dateQueryService.ancestors}
              siblings={dateQueryService.sibling}
              searchPath={dateQueryService.assetData?.ancestors ?? ""}
            />
          ) : (
            <DocumentNavigateMenu
              key={"navigate menu: create"}
              group={docGroupType}
              data={createNewDocument(
                queryRoute.dataType,
                queryRoute.ancestors ?? "",
                docGroupType
              )}
              ancestors={[]}
              siblings={[]}
              searchPath={""}
            />
          )}
        </div>
        <div className="col-span-4 md:col-span-3">
          {dateQueryService.errorMessage !== "" ? (
            <DashboardCard className="w-full h-full flex flex-col justify-center items-center space-y-2">
              <p className="text-destructive">
                {dateQueryService.errorMessage}
              </p>
            </DashboardCard>
          ) : !isBlocking && !dateQueryService.isFetchingChildren ? (
            queryRoute.mode === "display" ? (
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
                data={createNewDocument(
                  queryRoute.dataType,
                  queryRoute.ancestors ?? "",
                  docGroupType
                )}
              />
            )
          ) : (
            <Skeleton className="bg-white h-full w-full flex flex-col justify-center items-center space-y-2">
              <LoadingWidget />
            </Skeleton>
          )}
        </div>
      </div>
    </div>
  );
}
