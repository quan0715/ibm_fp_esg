import { documentSearchPathCache } from "../../../../../lib/documentDataCache";
import { useState, useEffect, useCallback, useTransition, use } from "react";
import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
} from "@/domain/entities/Document";
import {
  getAssetSibling,
  getDocumentDataWithId,
  getDocumentAncestors,
  getDocumentChildren,
  updateData,
  createNewData,
  deleteData,
  getDocuments,
} from "../_actions/DocumentAction";
import { set } from "date-fns";
import { createNewDocument as getNewDocTemplate } from "@/domain/entities/DocumentTemplate";
function messageLog(message?: any, ...optionalParams: any[]) {
  console.log("useDocumentData", message, ...optionalParams);
}

export function useDocumentData(group: DocumentGroupType) {
  messageLog(group);

  const [dataId, setDataId] = useState("");
  const [mode, setMode] = useState("display");
  const [assetData, setAssetData] = useState<DocumentObject>();
  const [ancestors, setAncestors] = useState<DocumentObject[]>([]);
  const [sibling, setSibling] = useState<DocumentObject[]>([]);
  const [children, setChildren] = useState<DocumentObject[]>([]);

  const [isFetchingData, startGetData] = useTransition();
  const [isFetchingChildren, startFetchChildren] = useTransition();
  const [isUpdatingData, setUpdatingDataState] = useState(false);
  const [isCreatingData, setCreatingDataState] = useState(false);
  const [isDeletingData, setDeletingDataState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (mode === "display") {
      if (dataId.length > 0) {
        setErrorMessage("");
        messageLog(`fetching data ${dataId ?? "None"}`);
        fetchData();
      }
    }
  }, [dataId, mode]);

  useEffect(() => {
    if (assetData && assetData.id !== "") {
      fetchChildren();
    }
  }, [assetData]);

  function getSearchPath(pathString: string) {
    if (pathString === "") {
      return [];
    } else {
      return pathString.split(",");
    }
  }

  async function fetchAndCache(assetId: string) {
    let data: DocumentObject | null = null;
    try {
      data = await getDocumentDataWithId(assetId, group);
    } catch (e) {
      messageLog("fetchAndCache error", e);
    }
    if (data === null) {
      messageLog("fetchAndCache : data is null");
      return Promise.reject("Data not found");
    } else {
      messageLog("fetchAndCache : data", data);
      let path = getSearchPath(data.ancestors);
      messageLog("fetchAndCache : path", path);
      let siblingData = await getAssetSibling(data.ancestors, group);
      messageLog("fetchAndCache : siblingData", siblingData);
      let ancestorData = await getDocumentAncestors(path, group);
      messageLog("fetchAndCache : ancestorData", ancestorData);

      siblingData.map((sibling) =>
        documentSearchPathCache.setAsset(data!.ancestors, sibling.id!, sibling)
      );

      for (let ancestor of ancestorData) {
        if (documentSearchPathCache.hasAsset(ancestor.id!)) {
          continue;
        } else {
          // let path = getSearchPath(ancestor.ancestors);
          let ancestorSiblingData = await getAssetSibling(
            ancestor.ancestors,
            group
          );
          if (ancestorSiblingData.length > 0) {
            ancestorSiblingData.map((sibling) =>
              documentSearchPathCache.setAsset(
                ancestor.ancestors,
                sibling.id!,
                sibling
              )
            );
          }
          fetchAndCache(ancestor.id!);
        }
      }
    }
  }

  const fetchData = useCallback(async () => {
    startGetData(async () => {
      //   console.log("fetching data");
      setErrorMessage("");
      messageLog("fetching data");
      let isCached = documentSearchPathCache.hasAsset(dataId);
      let data: DocumentObject;
      let ancestorData: DocumentObject[] = [];
      let siblingData: DocumentObject[] = [];
      try {
        if (!isCached) {
          console.log("data is not cached");
          await fetchAndCache(dataId);
        }
        console.log("data is cached");
        data = documentSearchPathCache.getAsset(dataId)!;
        messageLog("fetchData : data", data);
        let path = getSearchPath(data.ancestors);
        ancestorData = path.map(
          (ancestor) => documentSearchPathCache.getAsset(ancestor)!
        );

        siblingData = Array.from(
          documentSearchPathCache.getPath(data.ancestors) ?? []
        ).map(([key, value]) => value);
        setAssetData(data);
        setSibling(siblingData);
        setAncestors(ancestorData);
      } catch (e) {
        console.error("presentation: fetchData error", e);
        setErrorMessage("Data Fetching Error With Id: " + dataId);
      }
    });
  }, [dataId]);

  const fetchChildren = useCallback(async () => {
    startFetchChildren(async () => {
      //   console.log("fetching children");
      messageLog("fetching children");
      let childrenData: DocumentObject[] = [];
      let ancestor = assetData?.ancestors ?? "";
      let childrenPath =
        ancestor.length > 0
          ? [assetData?.ancestors, assetData?.id].join(",")
          : assetData?.id ?? "";
      let isCached = documentSearchPathCache.hasPath(childrenPath);

      if (isCached) {
        // console.log("data is cached");
        childrenData = Array.from(
          documentSearchPathCache.getPath(childrenPath)!
        ).map(([key, value]) => value);
      } else {
        childrenData = await getDocumentChildren(
          assetData?.ancestors ?? "",
          dataId,
          group
        );
        documentSearchPathCache.setPath(
          childrenPath,
          new Map(childrenData.map((child) => [child.id!, child]))
        );
      }

      messageLog("fetching children: data", childrenData);

      setChildren(childrenData);
    });
  }, [assetData]);

  async function updateDocument(data: DocumentObject) {
    setUpdatingDataState(true);
    try {
      await updateData(data, group);
      documentSearchPathCache.setAsset(data.ancestors, data.id!, data);
    } catch (e) {
      console.error("presentation: updateData error", e);
    }
    setUpdatingDataState(false);
  }

  async function createNewDocument(doc: DocumentObject) {
    setCreatingDataState(true);
    let dataId = "";
    messageLog("createNewDocument", doc);
    try {
      const newDataIndex = await createNewData(doc, group);
      const newDoc = {
        ...doc,
        id: newDataIndex,
      };
      dataId = newDataIndex;
      documentSearchPathCache.setAsset(doc.ancestors, newDataIndex, newDoc);
    } catch (e) {
      console.error("presentation: createNewDocument error", e);
    } finally {
      setCreatingDataState(false);
      return dataId;
    }
  }

  async function deleteDocument(dataId: string) {
    setDeletingDataState(true);
    let returnIndex = "";
    try {
      returnIndex = await deleteData(dataId, group);
      documentSearchPathCache.deleteAsset(dataId);
      console.log("return result", returnIndex);
    } catch (e) {
      console.error("presentation: deleteData error", e);
    }
    setDeletingDataState(false);
    return returnIndex;
  }

  async function getDefaultData() {
    const searchPath = "";
    let data = await getAssetSibling(searchPath, group);
    if (data.length > 0) {
      return data[0];
    }
    return null;
  }

  return {
    assetData,
    ancestors,
    sibling,
    dataId,
    mode,
    setDataId,
    setAssetData,
    setMode,
    children,
    isFetchingData,
    isFetchingChildren,
    isUpdatingData,
    isCreatingData,
    isDeletingData,
    updateDocument,
    createNewDocument,
    deleteDocument,
    getDefaultData,
    errorMessage,
  };
}

export function useDocument(documentId: string, group: DocumentGroupType) {
  const [isFetchingData, startGetData] = useTransition();
  const [data, setData] = useState<DocumentObject>();

  useEffect(() => {
    if (documentId !== "") {
      getDocument();
    }
  }, [documentId]);

  const getDocument = useCallback(async () => {
    startGetData(async () => {
      messageLog("fetching data");
      if (documentId === "") throw new Error("Document Id is empty");

      let isCached = documentSearchPathCache.hasAsset(documentId);
      let data: DocumentObject;
      try {
        if (!isCached) {
          console.log("data is not cached");
          data = await getDocumentDataWithId(documentId, group);
          documentSearchPathCache.setAsset(data.ancestors, data.id!, data);
        }
        data = documentSearchPathCache.getAsset(documentId)!;
        messageLog("fetchData : data", data);
        setData(data);
      } catch (e) {
        console.error("presentation: fetchData error", e);
      }
    });
  }, [documentId, group]);

  return {
    data,
    isFetchingData,
    getDocument,
  };
}

export function useDocumentReference(group: DocumentGroupType) {
  const [isFetchingData, startGetData] = useTransition();
  const [documentList, setDocumentList] = useState<DocumentObject[]>();

  useEffect(() => {
    getReferenceDocuments();
  }, [group]);

  const getReferenceDocuments = useCallback(async () => {
    startGetData(async () => {
      messageLog("fetching data");
      // delay for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        let data = await getDocuments(group);
        // sort data
        data = data.sort((a, b) => {
          if (a.ancestors < b.ancestors) {
            return -1;
          }
          if (a.ancestors > b.ancestors) {
            return 1;
          }
          return 0;
        });

        messageLog("fetchData : data", data);
        setDocumentList(data);
      } catch (e) {
        console.error("presentation: fetchData error", e);
      }
    });
  }, [group]);

  return {
    documentList,
    isFetchingData,
    getDocuments,
  };
}
