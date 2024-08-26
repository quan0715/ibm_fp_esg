"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentGroupType, DocumentObject } from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { createContext, useEffect, useState } from "react";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";
import { useDocumentTree } from "../_hooks/useDocumentContext";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";

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
  selectedDocumentId = "",
}: {
  selectedDocumentId?: string;
}) {
  const queryRoute = useDataQueryRoute();
  const isDisplayMode = queryRoute.mode === "display";
  const isCreateMode = queryRoute.mode === "create";
  const documentTree = useDocumentTree();
  const document = documentTree.getDocumentData(selectedDocumentId);

  // useEffect(() => {
  //   console.log("DatabasePage init", selectedDocumentId, isCreateMode);
  //   if (documentTree.isInit) {
  //     return;
  //   }
  //   if (selectedDocumentId === "" && !isCreateMode) {
  //     let rootData = documentTree.getPathData("");
  //     if (rootData.length > 0) {
  //       queryRoute.setAssetId(rootData[0].id!, queryRoute.page);
  //     } else {
  //       queryRoute.createNewAsset(getGroupDefaultType(documentTree.type), "");
  //     }
  //     return;
  //   }
  //   setData(
  //     isCreateMode
  //       ? createNewDocument(queryRoute.dataType, queryRoute.ancestors ?? "")
  //       : document
  //   );
  // }, [selectedDocumentId, isCreateMode, documentTree.isInit]);
  const data = isCreateMode
    ? createNewDocument(queryRoute.dataType, queryRoute.ancestors ?? "")
    : document;
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-start items-start space-y-2">
      {documentTree.isInit ? (
        <SuspenseWidget />
      ) : !data ? (
        <ErrorWidget message="找不到資料" />
      ) : (
        <DocumentDataCardForm
          key={isDisplayMode ? "display data" : "create new data" + data.id}
          data={data!}
        />
      )}
    </div>
  );
}
