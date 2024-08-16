"use client";
import { DocumentObjectType } from "@/domain/entities/Document";
import { getDocumentObjectType } from "@/domain/entities/DocumentConfig";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useDataQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "display";
  const dataId = searchParams.get("data") || "";
  const parentId: string = searchParams.get("parent") || "";
  const page = searchParams.get("page") || "";
  const ancestors = searchParams.get("ancestors") ?? "";
  const dataType = getDocumentObjectType(searchParams.get("type") ?? "");
  function createQueryString(
    selected?: string,
    mode?: string
    // ancestorPath?: string
  ): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("data", selected);
    }
    if (mode) {
      params.set("mode", mode);
    }
    if (searchParams.get("page")) {
      params.set("page", searchParams.get("page") || "");
    }

    return params.toString();
  }

  function getPath(queryPath: string) {
    return pathName + "?" + queryPath;
  }

  function refresh() {
    router.refresh();
  }
  function moveBack() {
    router.back();
  }

  function getNewDisplayURL(assetId: string) {
    return getPath(createQueryString(assetId, "display"));
  }

  const editURL = getPath(createQueryString(dataId, "edit"));
  const createURL = getPath(createQueryString(dataId, "create"));

  function createNewData(type: string, ancestors: string) {
    const params = new URLSearchParams();
    params.set("mode", "create");
    params.set("data", dataId);
    params.set("ancestors", ancestors);
    params.set("type", type);
    if (searchParams.get("page")) {
      params.set("page", searchParams.get("page") || "");
    }
    router.push(getPath(params.toString()));
  }
  function setDataId(selected: string, isEdit: boolean = false) {
    const newRoute = createQueryString(selected, isEdit ? "edit" : "display");
    router.push(getPath(newRoute));
  }

  return {
    pathName,
    searchParams,
    router,
    mode,
    page,
    dataId,
    parentId,
    ancestors,
    dataType,
    setAssetId: setDataId,
    editURL,
    createURL,
    createNewAsset: createNewData,
    getNewDisplayURL,
    moveBack,
    refresh,
  };
}
