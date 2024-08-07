import { AssetData, AssetLocationEntity } from "@/domain/entities/Asset";
import { AssetType } from "@/domain/entities/AssetType";
import {
  getAssetDataWithId,
  getAssetAncestors,
  getAssetSibling,
  getAssetChildren,
  deleteData,
} from "../_actions/PostDataAction";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useTransition } from "react";

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
    // console.log("set", path, value);
  }

  setAsset(path: string, assetId: string, value: AssetLocationEntity) {
    let map = this.cache.get(path) || new Map();
    map.set(assetId, value);
    this.cache.set(path, map);
    // console.log("set: ", "path:", path, "id: ", assetId, "data: ", value);
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

export const searchPathCache = new SearchPathCache();

export function useAssetLocationData() {
  const [assetId, setAssetId] = useState("");
  const [mode, setMode] = useState("display");

  const [assetData, setAssetData] = useState<AssetLocationEntity>();
  const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  const [sibling, setSibling] = useState<AssetLocationEntity[]>([]);
  const [children, setChildren] = useState<AssetLocationEntity[]>([]);
  const [previousAssetId, setPreviousAssetId] = useState("");

  const [isFetchingData, startGetData] = useTransition();
  const [isFetchingChildren, startFetchChildren] = useTransition();
  const [isDataUpdating, startUpdateData] = useTransition();
  const [isDataCreating, startCreateData] = useTransition();

  useEffect(() => {
    if (assetId !== undefined) {
      //   console.log("useEffect: fetch data ", assetId);
      console.log("fetching data", assetId);
      if (assetId && assetId !== "") {
        fetchData();
      }
      //   if (assetId == "none" && mode == "display") {
      //     emptyIndex();
      //   }
    }
  }, [assetId, mode]);

  useEffect(() => {
    if (assetId && assetId !== "") {
      fetchChildren();
    }
  }, [assetData]);

  async function emptyIndex() {
    startGetData(async () => {
      console.log("empty index");
      const data = await getAssetDataWithId(assetId);
      searchPathCache.setAsset("", data.id!, data);
      setAssetId(data.id!);
    });

    // const queryRoute = useAssetQueryRoute();
  }

  async function fetchAndCache(assetId: string) {
    let data = await getAssetDataWithId(assetId);
    let siblingData = await getAssetSibling(data.ancestors);
    let ancestorData = await getAssetAncestors(data.ancestors);
    let path = (data.ancestors ?? []).join(",");

    siblingData.map((sibling) =>
      searchPathCache.setAsset(path, sibling.id!, sibling)
    );

    // console.log("siblingData", siblingData);
    // console.log("ancestorData", ancestorData);

    for (let ancestor of ancestorData) {
      if (searchPathCache.hasAsset(ancestor.id!)) {
        continue;
      } else {
        let ancestorSiblingData = await getAssetSibling(ancestor.ancestors);
        // console.log("ancestorSiblingData", ancestorSiblingData);
        if (ancestorSiblingData.length > 0) {
          ancestorSiblingData.map((sibling) =>
            searchPathCache.setAsset(
              ancestor.ancestors.join(","),
              sibling.id!,
              sibling
            )
          );
        }
        fetchAndCache(ancestor.id!);
      }
    }
  }

  const fetchData = useCallback(async () => {
    startGetData(async () => {
      //   console.log("fetching data");
      let isCached = searchPathCache.hasAsset(assetId);
      let data: AssetLocationEntity;
      let ancestorData: AssetLocationEntity[] = [];
      let siblingData: AssetLocationEntity[] = [];

      if (!isCached) {
        console.log("data is not cached");
        await fetchAndCache(assetId);

        // console.log("siblingData", siblingData);
      }
      console.log("data is cached");
      data = searchPathCache.getAsset(assetId)!;
      ancestorData = data.ancestors.map(
        (ancestor) => searchPathCache.getAsset(ancestor)!
      );

      let path = (data.ancestors ?? []).join(",");
      siblingData = Array.from(searchPathCache.getPath(path) ?? []).map(
        ([key, value]) => value
      );
      setAssetData(data);
      setSibling(siblingData);
      setAncestors(ancestorData);
    });
  }, [assetId]);

  const fetchChildren = useCallback(async () => {
    startFetchChildren(async () => {
      console.log("fetching children");
      let childrenData: AssetLocationEntity[] = [];
      let path = [...(assetData?.ancestors ?? []), assetData?.id].join(",");
      let isCached = searchPathCache.hasPath(path);

      if (isCached) {
        // console.log("data is cached");
        console.log("data is cached", searchPathCache);
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

      setChildren(childrenData);
    });
  }, [assetData]);

  return {
    assetData,
    ancestors,
    sibling,
    assetId,
    mode,
    setAssetId,
    setMode,
    children,
    deleteData,
    isFetchingData,
    isFetchingChildren,
    isDataUpdating,
    isDataCreating,
  };
}

export function useAssetDataDelete() {
  const [isDeleting, setDeleting] = useState(false);

  async function onDelete(deleteAssetIndex: string) {
    setDeleting(true);
    let returnIndex = "";
    try {
      returnIndex = await deleteData(deleteAssetIndex);
      searchPathCache.deleteAsset(deleteAssetIndex);
      console.log("return result", returnIndex);
    } catch (e) {
      console.error("presentation: deleteData error", e);
    }
    setDeleting(false);
    return returnIndex;
  }

  return {
    isDeleting,
    onDelete,
  };
}
