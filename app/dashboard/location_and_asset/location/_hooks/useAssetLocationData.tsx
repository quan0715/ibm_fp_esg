import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetType } from "@/domain/entities/AssetType";
import {
  getAssetDataWithId,
  getAssetAncestors,
  getAssetSibling,
  getAssetChildren,
} from "../_actions/PostDataAction";
import { MongoAssetLocRepository } from "@/data/repositories/mongo/MongoAssetLocRepository";
import { AssetDataUseCase } from "@/domain/Services/AssetDataService";
import { useState } from "react";
import { useEffect } from "react";
import { useTransition } from "react";
import { get } from "http";
import { set } from "date-fns";
class DataCache {
  cache: Map<string, AssetLocationEntity>;
  constructor() {
    this.cache = new Map();
  }

  get(key: string) {
    console.log("get", key);
    return this.cache.get(key);
  }

  set(key: string, value: AssetLocationEntity) {
    this.cache.set(key, value);
    console.log("set", key, value);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }
}

class SearchPathCache {
  cache: Map<string, Map<string, AssetLocationEntity>>;
  constructor() {
    this.cache = new Map();
  }

  getPath(path: string) {
    return this.cache.get(path);
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

  hasPath(path: string) {
    return this.cache.has(path);
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

  setPath(path: string, value: Map<string, AssetLocationEntity>) {
    this.cache.set(path, value);
    console.log("set", path, value);
  }

  setAsset(path: string, assetId: string, value: AssetLocationEntity) {
    let map = this.cache.get(path) || new Map();
    map.set(assetId, value);
    this.cache.set(path, map);
    console.log("set: ", "path:", path, "id: ", assetId, "data: ", value);
  }
}

const dataCache = new DataCache();
const searchPathCache = new SearchPathCache();

export function useAssetLocationData() {
  const [assetId, setAssetId] = useState("");
  const [assetData, setAssetData] = useState<AssetLocationEntity>();
  const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  const [sibling, setSibling] = useState<AssetLocationEntity[]>([]);
  const [children, setChildren] = useState<AssetLocationEntity[]>([]);

  const [isFetchingData, startGetData] = useTransition();
  const [isFetchingChildren, startFetchChildren] = useTransition();
  const [isDataUpdating, startUpdateData] = useTransition();
  const [isDataCreating, startCreateData] = useTransition();

  useEffect(() => {
    if (assetId && assetId !== "") {
      console.log("useEffect: fetch data ", assetId);
      fetchData();
      //   return;
    }
  }, [assetId]);

  useEffect(() => {
    if (assetId && assetId !== "") {
      console.log("useEffect: fetchChildren", assetId);
      fetchChildren();
      //   return;
    }
  }, [assetData]);

  async function fetchData() {
    startGetData(async () => {
      console.log("fetching data");
      let isCached = searchPathCache.hasAsset(assetId);
      let data: AssetLocationEntity;
      let ancestorData: AssetLocationEntity[] = [];
      let siblingData: AssetLocationEntity[] = [];

      if (isCached) {
        console.log("data is cached");
        data = searchPathCache.getAsset(assetId)!;
        ancestorData = data.ancestors.map(
          (ancestor) => searchPathCache.getAsset(ancestor)!
        );

        let path = (data.ancestors ?? []).join(",");
        siblingData = Array.from(searchPathCache.getPath(path)!).map(
          ([key, value]) => value
        );
      } else {
        data = await getAssetDataWithId(assetId);
        ancestorData = await getAssetAncestors(data.ancestors);
        siblingData = await getAssetSibling(data.ancestors);

        let path = (data.ancestors ?? []).join(",");

        searchPathCache.setAsset(path, assetId, data);
        ancestorData.map((ancestor) =>
          searchPathCache.setAsset(
            ancestor.ancestors.join(","),
            ancestor.id!,
            ancestor
          )
        );
        siblingData.map((sibling) =>
          searchPathCache.setAsset(path, sibling.id!, sibling)
        );
      }
      setAssetData(data);
      setSibling(siblingData);
      setAncestors(ancestorData);
    });
  }

  async function fetchChildren() {
    startFetchChildren(async () => {
      console.log("fetching children");
      let childrenData: AssetLocationEntity[] = [];
      let path = [...(assetData?.ancestors ?? []), assetData?.id].join(",");
      let isCached = searchPathCache.hasPath(path);

      if (isCached) {
        // console.log("data is cached");
        childrenData = Array.from(searchPathCache.getPath(path)!).map(
          ([key, value]) => value
        );
      } else {
        childrenData = await getAssetChildren(
          assetData?.ancestors || [],
          assetId
        );
        searchPathCache.setPath(
          path,
          new Map(childrenData.map((child) => [child.id!, child]))
        );
      }

      console.log("childrenData", childrenData);
      setChildren(childrenData);
    });
  }

  return {
    assetData,
    ancestors,
    sibling,
    setAssetId,
    children,
    isFetchingData,
    isFetchingChildren,
    isDataUpdating,
    isDataCreating,
  };
}
