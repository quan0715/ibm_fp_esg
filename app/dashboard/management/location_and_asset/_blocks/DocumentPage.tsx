"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentGroupType } from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { createContext } from "react";
import { useDocumentData } from "../_hooks/useDocument";
import { DocumentNavigateMenu } from "../_blocks/DocumentNavigationMenu";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";
import { useDocumentTree } from "../_hooks/useDocumentContext";

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

export const DocumentContext = createContext({
  type: DocumentGroupType.Asset,
});

export function DatabasePage({
  // dbType,
  selectedDocumentId = "",
}: {
  dbType: DocumentGroupType;
  selectedDocumentId?: string;
}) {
  const queryRoute = useDataQueryRoute();
  const dataId = queryRoute.dataId;
  const isDisplayMode = queryRoute.mode === "display";
  const isCreateMode = queryRoute.mode === "create";
  const documentTree = useDocumentTree();
  const document = documentTree.getDocumentData(selectedDocumentId);
  // let dateQueryService = useDocumentData(dataId, documentTree.documents);

  // const isError = dateQueryService.errorMessage !== "";

  const data = isCreateMode
    ? createNewDocument(queryRoute.dataType, queryRoute.ancestors ?? "")
    : document;

  console.log("data", data);

  // const isBlocking =
  //   dateQueryService.isFetchingData ||
  //   (isDisplayMode && dateQueryService.document === undefined);

  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        {/* <div className="col-span-1 hidden md:block">
            {isError ? (
              <ErrorWidget message={dateQueryService.errorMessage} />
            ) : isBlocking ? (
              <SuspenseWidget />
            ) : (
              <DocumentNavigateMenu data={data!} />
            )}
          </div> */}
        <div className="col-span-4 md:col-span-4">
          {!data ? (
            <SuspenseWidget />
          ) : (
            <DocumentDataCardForm
              key={isDisplayMode ? "display data" : "create new data"}
              // groupType={dbType}
              data={data!}
            />
          )}
        </div>
      </div>
    </div>
  );
}
