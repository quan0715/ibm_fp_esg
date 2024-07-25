import { ReadonlyURLSearchParams } from "next/navigation";

export class QueryPathService {
  searchParams: ReadonlyURLSearchParams;
  defaultAssetId: string = "669764b4e1b6f7cb9d170a31";

  layers: string[] = ["organization", "site", "phase", "department"];

  constructor(searchParams: ReadonlyURLSearchParams) {
    this.searchParams = searchParams;
  }

  getAssetId(): string {
    return this.searchParams.get("asset") || "defaultAssetId";
  }

  createQueryString(selected?: string): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("asset", selected);
    }
    return params.toString();
  }

  getPath(pathName: string, queryPath: string) {
    return pathName + "?" + queryPath;
  }
}
