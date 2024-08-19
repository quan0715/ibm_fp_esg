"use client";

import { Suspense, use, useEffect } from "react";
import {
  DocumentGroupType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { DatabasePage } from "./_blocks/DocumentPage";
import { useDataQueryRoute } from "./_hooks/useQueryRoute";
import { getAssetSibling } from "./_actions/DocumentAction";

export default function Page() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
}

function MainPage() {
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
        queryRoute.createNewAsset(dbType, queryRoute.page);
      }
    }
    if (queryRoute.dataId === "" && queryRoute.mode === "display") {
      handleEmptyData();
    }
  }, [queryRoute.dataId, queryRoute.mode, queryRoute.page]);
  const isBlocking = queryRoute.mode === "display" && queryRoute.dataId === "";
  return isBlocking ? null : (
    <DatabasePage
      key={dbType + queryRoute.dataId}
      dbType={dbType}
      selectedDocumentId={queryRoute.dataId}
    />
  );
}
