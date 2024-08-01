import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useAssetQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isCreate = searchParams.get("mode") === "create";
  const mode = searchParams.get("mode") || "display";
  const assetId = searchParams.get("asset") || "";
  const parentId: string = searchParams.get("parent") || "";
  const ancestors = searchParams.get("ancestors")?.split(",");
  const assetType = searchParams.get("type") || "";

  function createQueryString(
    selected?: string,
    mode?: string
    // ancestorPath?: string
  ): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("asset", selected);
    }
    if (mode) {
      params.set("mode", mode);
    }
    return params.toString();
  }

  function getPath(queryPath: string) {
    return pathName + "?" + queryPath;
  }

  function moveBack() {
    router.back();
  }

  function revalidatePath() {
    router.push(pathName + "?" + searchParams.toString());
  }

  function getNewDisplayURL(assetId: string) {
    return getPath(createQueryString(assetId, "display"));
  }

  const editURL = getPath(createQueryString(assetId, "edit"));
  const createURL = getPath(createQueryString(assetId, "create"));

  function createNewAsset(assetType: string, ancestors: string[]) {
    const params = new URLSearchParams();
    params.set("mode", "create");
    params.set("ancestors", ancestors.join(","));
    params.set("type", assetType);
    router.push(getPath(params.toString()));
  }
  function setAssetId(selected: string, isEdit: boolean = false) {
    const newRoute = createQueryString(selected, isEdit ? "edit" : "display");
    router.push(getPath(newRoute));
  }

  return {
    pathName,
    searchParams,
    router,
    mode,
    assetId,
    parentId,
    ancestors,
    assetType,
    setAssetId,
    editURL,
    createURL,
    createNewAsset,
    getNewDisplayURL,
    moveBack,
    revalidatePath,
  };
}
