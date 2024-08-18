import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useEffect } from "react";
import {
  DocumentDataAncestorView,
  DocumentDataCardListView,
} from "./DocumentDataDisplayUI";
import {
  getDocumentChildrenTypeOptions,
  getDocumentLayerRules,
} from "@/domain/entities/DocumentConfig";
import { useDocumentWithSearchPath } from "../_hooks/useDocument";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MobileOnly } from "@/components/layouts/layoutWidget";
import { LuMenu } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";

export function DocumentNavigateMenu({ data }: { data: DocumentObject }) {
  const queryRoute = useDataQueryRoute();
  const isCreateMode = queryRoute.mode === "create";
  const { isFetchingData, ancestors, sibling } = useDocumentWithSearchPath(
    isCreateMode ? queryRoute.ancestors : data.ancestors ?? "",
    getDocumentGroupTypeFromString(queryRoute.page)
  );
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
              searchPath={data.ancestors ?? ""}
              documents={sibling.filter((data) => data.type === type)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocumentNavigateMenuDialog({ data }: { data: DocumentObject }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"}>
          <LuMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-2 max-h-[600px] overflow-scroll">
        <DocumentNavigateMenu data={data} />
      </DrawerContent>
    </Drawer>
  );
}
