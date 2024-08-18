import { DocumentObject } from "@/domain/entities/Document";

class SearchPathCache<T> {
  cache: Map<string, Map<string, T>>;
  constructor() {
    this.cache = new Map();
  }

  getPath(path: string, group: string) {
    return this.cache.get(path + group);
  }

  getAsset(assetId: string) {
    // console.log("get", path, assetId);
    for (let path of Array.from(this.cache.keys())) {
      let value = this.cache.get(path) ?? new Map();
      if (value.has(assetId)) {
        return value.get(assetId);
      }
    }
    return false;
  }

  hasPath(path: string, group: string) {
    return this.cache.has(path + group);
  }

  hasAsset(assetId: string) {
    for (let path of Array.from(this.cache.keys())) {
      let value = this.cache.get(path) ?? new Map();
      if (value.has(assetId)) {
        return true;
      }
    }
    return false;
  }

  setPath(path: string, group: string, value: Map<string, T>) {
    this.cache.set(path + group, value);
  }

  setAsset(path: string, group: string, assetId: string, value: T) {
    let map = this.cache.get(path + group) || new Map();
    map.set(assetId, value);
    this.cache.set(path + group, map);
  }

  deleteAsset(assetId: string) {
    for (let path of Array.from(this.cache.keys())) {
      let value = this.cache.get(path) ?? new Map();
      if (value.has(assetId)) {
        value.delete(assetId);
        this.cache.set(path, value);
      }
    }
  }

  clear() {
    this.cache.clear();
  }
}

export const documentSearchPathCache = new SearchPathCache<DocumentObject>();
export const documentMenuDataCache = new SearchPathCache<DocumentObject>();
