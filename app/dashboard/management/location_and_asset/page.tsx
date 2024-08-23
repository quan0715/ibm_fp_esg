"use client";

import { Suspense, use, useEffect } from "react";
import {
  DocumentGroupType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { DatabasePage, DocumentContext } from "./_blocks/DocumentPage";
import { useDataQueryRoute } from "./_hooks/useQueryRoute";
import { getAssetSibling } from "./_actions/DocumentAction";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";
import { DocumentTreeMenu } from "./_blocks/DocumentNavigationMenu";
import { Separator } from "@radix-ui/react-separator";
import { DocumentTreeProvider } from "./_hooks/useDocumentContext";

export default function Page() {
  const queryRoute = useDataQueryRoute();
  const dbType = getDocumentGroupTypeFromString(queryRoute.page);

  useEffect(() => {
    console.log("page useEffect", queryRoute.dataId, queryRoute.mode);
    async function handleEmptyData() {
      let data = await getAssetSibling("", dbType);
      if (data.length > 0) {
        console.log("data", data);
        queryRoute.setAssetId(data[0].id!, queryRoute.page);
      } else {
        const rootType = getGroupDefaultType(dbType);
        queryRoute.createNewAsset(rootType, "");
      }
    }
    if (queryRoute.dataId === "" && queryRoute.mode === "display") {
      handleEmptyData();
    }
  }, [queryRoute.dataId, queryRoute.mode, queryRoute.page]);
  const isBlocking = queryRoute.mode === "display" && queryRoute.dataId === "";

  return isBlocking ? null : (
    <DocumentTreeProvider type={dbType}>
      <div className="w-full max-h-max grid grid-cols-12 gap-2 p-1">
        <div className="col-span-3">
          <DocumentTreeMenu path={""} />
        </div>
        <div className="col-span-9">
          <DatabasePage
            key={dbType + queryRoute.dataId}
            dbType={dbType}
            selectedDocumentId={queryRoute.dataId}
          />
        </div>
      </div>
    </DocumentTreeProvider>
  );
}
