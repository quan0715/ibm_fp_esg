import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useAssetQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isCreate = searchParams.get("mode") === "create";
  const mode = searchParams.get("mode") || "display";
  const assetId = searchParams.get("asset") || "";
  const parentId: string = searchParams.get("parent") || "";

  function createQueryString(
    selected?: string,
    mode?: string,
    parent?: string
  ): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("asset", selected);
    }
    if (mode) {
      params.set("mode", mode);
    }
    if (mode && mode === "create" && parent) {
      params.set("parent", parent);
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

  function getCreateURL(parent: string) {
    console.log("parent", parent);
    return getPath(createQueryString(undefined, "create", parent));
  }

  const editURL = getPath(createQueryString(assetId, "edit"));
  const createURL = getPath(createQueryString(assetId, "create"));

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
    setAssetId,
    editURL,
    createURL,
    getNewDisplayURL,
    getCreateURL,
    moveBack,
    revalidatePath,
  };
}
