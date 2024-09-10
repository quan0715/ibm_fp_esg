import {
  DocumentGroupType,
  DocumentObjectTemplate,
} from "@/domain/entities/Document";
import { useEffect, useState, useTransition } from "react";
import { getDocumentTemplate } from "../_actions/DocumentAction";

export function useDocumentTemplate(group: DocumentGroupType) {
  const [isLoadingTemplate, startLoadingTemplate] = useTransition();
  const [documentTemplate, setDocumentTemplate] =
    useState<DocumentObjectTemplate>();

  useEffect(() => {
    startLoadingTemplate(async () => {
      const documentTemplate = await getDocumentTemplate(group);
      console.log("documentTemplate", documentTemplate);
      setDocumentTemplate(documentTemplate);
    });
  }, [group]);
  return {
    group,
    isLoadingTemplate,
    template: documentTemplate,
  };
}
