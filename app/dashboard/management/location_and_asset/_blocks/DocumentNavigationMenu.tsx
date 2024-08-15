import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
  getDocumentChildrenTypeOptions,
  getDocumentLayerRules,
} from "@/domain/entities/Document";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useEffect } from "react";
import {
  DocumentDataAncestorView,
  DocumentDataCardListView,
} from "./DocumentDataDisplayUI";

export function DocumentNavigateMenu({
  data,
  ancestors = [],
  siblings = [],
  searchPath = "",
}: {
  data: DocumentObject;
  group: DocumentGroupType;
  ancestors?: DocumentObject[];
  siblings?: DocumentObject[];
  searchPath?: string;
}) {
  const queryRoute = useDataQueryRoute();

  useEffect(() => {
    console.log("ancestors", ancestors);
    console.log("siblings", siblings);
    console.log("searchPath", searchPath);
  }, [ancestors, siblings, searchPath]);
  const layerRule = getDocumentLayerRules(data.type);
  const siblingTypeOptions = getDocumentChildrenTypeOptions(
    layerRule.parentType,
    layerRule.group
  );
  return (
    <div className="md:flex w-full flex-col justify-start items-center space-y-2">
      {ancestors.map((ancestor) => (
        <DocumentDataAncestorView
          data={ancestor}
          onClick={() => queryRoute.setAssetId(ancestor.id!)} // adjust this if ancestors should be selectable
          key={ancestor.id}
        />
      ))}
      <div className="w-full flex flex-row items-start justify-start space-x-1">
        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
          {siblingTypeOptions.map((type) => (
            <DocumentDataCardListView
              key={type}
              type={type}
              searchPath={searchPath}
              documents={siblings.filter((data) => data.type === type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
