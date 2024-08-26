import {
  documentMenuDataCache,
  documentSearchPathCache,
} from "../../../../../lib/documentDataCache";
import {
  useState,
  useEffect,
  useCallback,
  useTransition,
  use,
  useMemo,
} from "react";
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
import { create } from "domain";
import { createNewDocument } from "@/domain/entities/DocumentTemplate";
function messageLog(message?: any, ...optionalParams: any[]) {
  console.log("useDocumentData", message, ...optionalParams);
}

export function useRootData(group: DocumentGroupType) {
  const getDefaultData = useCallback(async () => {
    const searchPath = "";
    let data = await getAssetSibling(searchPath, group);
    if (data.length > 0) {
      return data[0];
    }
    return null;
  }, [group]);

  return useMemo(
    () => ({
      getDefaultData,
    }),
    [getDefaultData]
  );
}

export function useDocumentData(documentId: string, group: DocumentGroupType) {
  // const [documentId, setDocumentId] = useState(dataId);
  const [document, setDocument] = useState<DocumentObject>();
  const [children, setChildren] = useState<DocumentObject[]>([]);

  const [isFetchingData, startGetData] = useTransition();
  const [isFetchingChildren, startFetchChildren] = useTransition();
  const [isUpdatingData, setUpdatingDataState] = useState(false);
  const [isCreatingData, setCreatingDataState] = useState(false);
  const [isDeletingData, setDeletingDataState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function updateDocument(data: DocumentObject) {
    setUpdatingDataState(true);
    try {
      await updateData(data, group);
      documentSearchPathCache.setAsset(data.ancestors, group, data.id!, data);
      documentMenuDataCache.setAsset(data.ancestors, group, data.id!, data);
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
      documentSearchPathCache.setAsset(
        doc.ancestors,
        group,
        newDataIndex,
        newDoc
      );
      documentMenuDataCache.setAsset(
        doc.ancestors,
        group,
        newDataIndex,
        newDoc
      );
    } catch (e) {
      console.error("presentation: createNewDocument error", e);
    } finally {
      setCreatingDataState(false);
      return dataId;
    }
  }

  async function deleteDocument(documentId: string) {
    setDeletingDataState(true);
    let returnIndex = "";
    try {
      await deleteData(documentId, group);
      console.log("return result", returnIndex);
    } catch (e) {
      console.error("presentation: deleteData error", e);
    }
    setDeletingDataState(false);
  }

  const getDefaultData = useCallback(async () => {
    const searchPath = "";
    let data = await getAssetSibling(searchPath, group);
    if (data.length > 0) {
      return data[0];
    }
    return null;
  }, [group]);

  return useMemo(
    () => ({
      document,
      documentId,
      setDocument,
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
    }),
    [
      document,
      documentId,
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
    ]
  );
}

export function useDocumentReference(group: DocumentGroupType) {
  const [isFetchingData, startGetData] = useTransition();
  const [documentList, setDocumentList] = useState<DocumentObject[]>();

  useEffect(() => {
    getReferenceDocuments();
  }, [group]);

  const getReferenceDocuments = useCallback(async () => {
    startGetData(async () => {
      // messageLog("fetching data");
      // delay for 1 second
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

        // messageLog("fetchData : data", data);
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

export function useDocumentWithSearchPath(
  searchPath: string,
  group: DocumentGroupType
) {
  const [isFetchingData, startGetData] = useTransition();
  const [ancestors, setAncestors] = useState<DocumentObject[]>([]);
  const [sibling, setSibling] = useState<DocumentObject[]>([]);

  useEffect(() => {
    console.log("useDocumentWithSearchPath", searchPath, group);
    getDocumentSearchPath();
  }, [searchPath, group]);

  async function fetchAndCache(path: string) {
    try {
      console.log("fetchAndCache", path);
      let ancestorIndexList = path === "" ? [] : searchPath.split(",");
      let ancestors = await getDocumentAncestors(ancestorIndexList, group);
      let siblingData = await getAssetSibling(path, group);

      siblingData.map((sibling) =>
        documentMenuDataCache.setAsset(path, group, sibling.id!, sibling)
      );
      console.log("cache stack", documentMenuDataCache.cache);

      for (let ancestor of ancestors) {
        if (documentMenuDataCache.hasAsset(ancestor.id!)) {
          continue;
        } else {
          let ancestorSiblingData = await getAssetSibling(
            ancestor.ancestors,
            group
          );
          if (ancestorSiblingData.length > 0) {
            ancestorSiblingData.map((sibling) =>
              documentMenuDataCache.setAsset(
                ancestor.ancestors,
                group,
                sibling.id!,
                sibling
              )
            );
          }
          console.log("cache stack", documentMenuDataCache.cache);
          await fetchAndCache(ancestor.ancestors);
        }
      }
    } catch (e) {
      console.error("presentation: fetchData error", e);
    }
  }

  const getDocumentSearchPath = useCallback(async () => {
    startGetData(async () => {
      try {
        const isCached = documentMenuDataCache.hasPath(searchPath, group);

        if (!isCached) {
          console.log("getDocumentSearchPath: data is not cached");
          await fetchAndCache(searchPath);
        }
        // console.log("data is cached");

        let ancestorIndexList = searchPath === "" ? [] : searchPath.split(",");

        let ancestors = ancestorIndexList.map(
          (ancestor) => documentMenuDataCache.getAsset(ancestor)!
        );

        let siblingData = Array.from(
          documentMenuDataCache.getPath(searchPath, group) ?? []
        ).map(([key, value]) => value);
        // let ancestors = await getDocumentAncestors(ancestorIndexList, group);
        // let siblingData = await getAssetSibling(searchPath, group);
        // console.log("siblingData", siblingData);
        setAncestors(ancestors);
        setSibling(siblingData);
      } catch (e) {
        console.error("presentation: fetchData error", e);
      }
    });
  }, [searchPath, group]);

  return {
    ancestors,
    sibling,
    isFetchingData,
  };
}
