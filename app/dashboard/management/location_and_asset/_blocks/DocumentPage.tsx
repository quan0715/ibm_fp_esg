"use client";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectTemplate,
} from "@/domain/entities/Document";
import { DocumentDataCardForm } from "../_blocks/DocumentDataCard";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { createContext, use, useEffect, useState, useTransition } from "react";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";
import { useDocumentTree } from "../_hooks/useDocumentContext";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";
import { getDocumentTemplate } from "../_actions/DocumentAction";

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

export function DatabasePage({
  selectedDocumentId = "",
}: {
  selectedDocumentId?: string;
}) {
  const queryRoute = useDataQueryRoute();
  const isDisplayMode = queryRoute.mode === "display";
  const isCreateMode = queryRoute.mode === "create";
  const documentTree = useDocumentTree();
  const [isLoadingTemplate, startLoadingTemplate] = useTransition();
  const document = documentTree.getDocumentData(selectedDocumentId);
  const [documentTemplate, setDocumentTemplate] =
    useState<DocumentObjectTemplate>();

  useEffect(() => {
    startLoadingTemplate(async () => {
      const documentTemplate = await getDocumentTemplate(documentTree.type);
      console.log("documentTemplate", documentTemplate);
      setDocumentTemplate(documentTemplate);
    });
  }, [documentTree.type]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-start items-start space-y-2">
      {documentTree.isInit || (isCreateMode && isLoadingTemplate) ? (
        <SuspenseWidget />
      ) : (isDisplayMode && !document) ||
        (isCreateMode && !documentTemplate) ? (
        <ErrorWidget message="DataNotFound" />
      ) : (
        <DocumentDataCardForm
          key={
            queryRoute.mode +
            queryRoute.dataId +
            queryRoute.dataType +
            queryRoute.ancestors
          }
          data={
            isCreateMode
              ? createNewDocument(
                  documentTemplate!,
                  queryRoute.dataType,
                  queryRoute.ancestors
                )
              : (document as DocumentObject)
          }
        />
      )}
    </div>
  );
}
