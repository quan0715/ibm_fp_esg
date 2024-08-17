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
  function createQueryString({
    selected,
    mode,
    page,
  }: {
    selected?: string;
    mode?: string;
    page?: string;
  }): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("data", selected);
    }
    params.set("mode", mode ?? "display");
    params.set("page", page ?? (searchParams.get("page") || "location"));

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
    return getPath(
      createQueryString({
        selected: assetId,
        mode: "display",
      })
    );
  }

  const editURL = getPath(
    createQueryString({
      selected: dataId,
      mode: "edit",
    })
  );
  const createURL = getPath(
    createQueryString({
      selected: dataId,
      mode: "create",
    })
  );

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
  function setDataId(selected: string, page?: string) {
    const newRoute = createQueryString({
      selected: selected,
      mode: "display",
      page: page,
    });
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
