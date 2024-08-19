"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { getDocumentGroupTypeFromString } from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useEffect } from "react";
import { useDocumentData } from "../_hooks/useDocument";
import { DocumentNavigateMenu } from "../_blocks/DocumentNavigationMenu";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";

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
export function DocumentPage() {
  const queryRoute = useDataQueryRoute();
  const mode = queryRoute.mode;
  const dataId = queryRoute.dataId;
  const isDisplayMode = queryRoute.mode === "display";
  const isCreateMode = queryRoute.mode === "create";
  const page = queryRoute.page;
  const groupType = getDocumentGroupTypeFromString(page);

  const dateQueryService = useDocumentData(dataId, groupType);

  const isFetching =
    dateQueryService.isFetchingData || dateQueryService.isFetchingChildren;

  const isError = dateQueryService.errorMessage !== "";

  useEffect(() => {
    console.log("DocumentPage useEffect", dataId, mode, page);
    async function handleEmptyData() {
      const defaultData = await dateQueryService.getDefaultData();
      console.log("default data", defaultData);
      if (defaultData === null) {
        queryRoute.createNewAsset(getGroupDefaultType(groupType), "");
      } else {
        console.log("set asset id", defaultData.id);
        queryRoute.setAssetId(defaultData.id!);
        return defaultData.id;
        // dateQueryService.setDocumentId(defaultData.id!);
      }
    }
    if (dataId === "" && isDisplayMode) {
      handleEmptyData();
    } else {
      dateQueryService.setDocumentId(dataId);
    }
  }, [dataId, mode, page]);

  const isBlocking =
    isFetching || (isDisplayMode && dateQueryService.document === undefined);

  const data = isCreateMode
    ? createNewDocument(queryRoute.dataType, queryRoute.ancestors ?? "")
    : dateQueryService.document;

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="col-span-1 hidden md:block">
          {isError ? (
            <ErrorWidget message={dateQueryService.errorMessage} />
          ) : isBlocking ? (
            <SuspenseWidget />
          ) : (
            <DocumentNavigateMenu data={data!} />
          )}
        </div>
        <div className="col-span-4 md:col-span-3">
          {isError ? (
            <ErrorWidget message={dateQueryService.errorMessage} />
          ) : isBlocking ? (
            <SuspenseWidget />
          ) : (
            <DocumentDataCardForm
              key={isDisplayMode ? "display data" : "create new data"}
              groupType={groupType}
              data={data!}
            />
          )}
        </div>
      </div>
    </div>
  );
}
