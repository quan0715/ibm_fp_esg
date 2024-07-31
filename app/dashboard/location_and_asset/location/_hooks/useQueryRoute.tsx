import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useAssetQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isCreate = searchParams.get("mode") === "create";
  const mode = searchParams.get("mode") || "display";
  const assetId =
    // isCreate
    // ? searchParams.get("ancestors") || ""
    // :
    searchParams.get("asset") || "";

  const ancestors = searchParams.get("ancestors");

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
    if (parent) {
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

  function getNewDisplayURL(assetId: string) {
    return getPath(createQueryString(assetId, "display"));
  }

  function getCreateURL(ancestors: string[]) {
    const ancestorsString =
      ancestors.length > 0 ? ancestors[ancestors.length - 1] : "";
    console.log(ancestorsString);
    return getPath(createQueryString("", "create", ancestorsString));
  }

  const editURL = getPath(createQueryString(assetId, "edit"));
  const createURL = getPath(createQueryString(assetId, "create"));

  function setAssetId(selected: string) {
    const newRoute = createQueryString(selected);
    router.push(getPath(newRoute));
  }

  return {
    pathName,
    searchParams,
    router,
    mode,
    assetId,
    setAssetId,
    editURL,
    createURL,
    getNewDisplayURL,
    getCreateURL,
    moveBack,
  };
}
