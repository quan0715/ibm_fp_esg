import { ReadonlyURLSearchParams } from "next/navigation";

export class QueryPathService {
  searchParams: ReadonlyURLSearchParams;

  layers: string[] = ["organization", "site", "phase", "department"];

  constructor(searchParams: ReadonlyURLSearchParams) {
    this.searchParams = searchParams;
  }

  getSearchPath(): string[] {
    return this.layers
      .map((layer) => this.searchParams.get(layer) || "")
      .filter((id) => id !== "");
  }

  popBackSearchPath(id: string): string[] {
    let newPath: string[] = [];
    for (let i = 0; i < this.layers.length; i++) {
      let index = this.searchParams.get(this.layers[i]) || "";
      if (index === id) {
        break;
      } else {
        newPath.push(index);
      }
    }
    return newPath;
  }

  createQueryString(searchPath: string[]): string {
    const params = new URLSearchParams();
    for (let i = 0; i < searchPath.length; i++) {
      params.set(this.layers[i], searchPath[i]);
    }
    return params.toString();
  }
}
