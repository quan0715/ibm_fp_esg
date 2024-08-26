import {
  DocumentGroupType,
  DocumentObject,
  DocumentObjectType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useContext, useEffect, useState } from "react";
import {
  DocumentDataTreeEntryView,
  DocumentDataCardListView,
} from "./DocumentDataDisplayUI";
import {
  getDocumentChildrenTypeOptions,
  getDocumentLayerRules,
  getGroupDefaultType,
} from "@/domain/entities/DocumentConfig";
import {
  useDocumentData,
  useDocumentWithSearchPath,
} from "../_hooks/useDocument";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MobileOnly } from "@/components/layouts/layoutWidget";
import { LuMenu } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { DocumentContext } from "./DocumentPage";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import { DashboardLabelChip } from "./DocumentLabelChip";
import {
  getDocumentEntityUIConfig,
  getDocumentTypeColor,
} from "../_utils/documentTypeUIConfig";
import { ChevronsUpDown } from "lucide-react";
import { CreateNewDataButton } from "./DataCRUDTrigger";
import { useDocumentTree } from "../_hooks/useDocumentContext";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { DialogClose } from "@radix-ui/react-dialog";

// export function DocumentNavigateMenu({ data }: { data: DocumentObject }) {
//   const queryRoute = useDataQueryRoute();
//   const isCreateMode = queryRoute.mode === "create";
//   const dbConfig = useContext(DocumentContext);
//   const { isFetchingData, ancestors, sibling } = useDocumentWithSearchPath(
//     isCreateMode ? queryRoute.ancestors : data.ancestors ?? "",
//     getDocumentGroupTypeFromString(dbConfig.type)
//   );
//   const layerRule = getDocumentLayerRules(data.type);
//   const siblingTypeOptions = getDocumentChildrenTypeOptions(
//     layerRule.parentType,
//     layerRule.group
//   );

//   return isFetchingData ? (
//     <Skeleton className="bg-background w-full h-full flex flex-col justify-center items-center space-y-2">
//       <LoadingWidget />
//     </Skeleton>
//   ) : (
//     <div className="md:flex w-full flex-col justify-start items-center space-y-2 overflow-auto">
//       {ancestors.length > 0 ? (
//         <DocumentDataTreeEntryView
//           data={ancestors[0]}
//           onClick={() => queryRoute.setAssetId(ancestors[0].id!)} // adjust this if ancestors should be selectable
//           key={ancestors[0].id}
//         />
//       ) : null}
//       <div className="w-full flex flex-row items-start justify-start space-x-1">
//         <div className="flex-1 flex flex-col items-center justify-center space-y-2">
//           {siblingTypeOptions.map((type) => (
//             <DocumentDataCardListView
//               key={type}
//               type={type}
//               searchPath={data.ancestors ?? ""}
//               documents={sibling.filter((data) => data.type === type)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export function DocumentNavigateMenuDialog() {
  // const [open, setOpen] = useState<boolean | undefined>(undefined);
  const documentTree = useDocumentTree();
  const rootDataList = documentTree.getPathData("");
  const queryRoute = useDataQueryRoute();
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  return (
    <Drawer
      shouldScaleBackground={false}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <LuMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-2">
        <div className="w-full max-h-[500px]  h-[500px] md:max-h-max md:h-full">
          {rootDataList.map((doc) => (
            <DocumentDataTreeEntryView
              data={doc}
              onClick={() => {
                queryRoute.setAssetId(doc.id!);
              }}
              onClose={() => setOpen(false)}
              key={doc.id}
            />
          ))}
          <CreateNewDataButton
            // className={cn(getDocumentTypeColor(type).textColor)}
            onClick={() => {
              queryRoute.createNewAsset(
                getGroupDefaultType(documentTree.type),
                ""
              );
              setOpen(false);
            }}
            label={`${getDocumentEntityUIConfig(getGroupDefaultType(documentTree.type)).label}`}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DocumentTreeMenu({ path }: { path: string }) {
  const documentTree = useDocumentTree();

  const queryRoute = useDataQueryRoute();

  const rootDataList = documentTree.getPathData(path);
  const defaultType = getGroupDefaultType(documentTree.type);
  const color = getDocumentTypeColor(defaultType);

  return documentTree.isInit ? (
    <Skeleton className="w-full flex flex-col items-center justify-center h-screen bg-background">
      <LoadingWidget />
    </Skeleton>
  ) : (
    <div>
      {rootDataList.map((doc) => (
        <DocumentDataTreeEntryView
          data={doc}
          onClick={() => {
            queryRoute.setAssetId(doc.id!);
          }}
          key={doc.id}
        />
      ))}
      <Separator />
      <div
        className={cn(color.hoveringColor, "w-full bg-background rounded-md")}
      >
        <CreateNewDataButton
          className={cn("h-fit", "text-gray-500", "hover:bg-transparent")}
          onClick={async () => {
            queryRoute.createNewAsset(
              getGroupDefaultType(documentTree.type),
              ""
            );
          }}
          label={`${getDocumentEntityUIConfig(getGroupDefaultType(documentTree.type)).label}`}
        />
      </div>
    </div>
  );
}

export function DocumentMenuListMobile() {
  const docTree = useDocumentTree();
  const queryRoute = useDataQueryRoute();
  return (
    <div className="flex flex-row items-center justify-center bg-background h-13">
      <Breadcrumb className="w-full p-2">
        <BreadcrumbList>
          <BreadcrumbItem key={docTree.type}>
            <BreadcrumbLink href="#">{docTree.type}</BreadcrumbLink>
          </BreadcrumbItem>
          {docTree
            .getAncestorData(
              docTree.getDocumentData(queryRoute.dataId)?.ancestors ?? ""
            )
            .map((ancestor, index) => (
              <div
                className="flex flex-row justify-center items-center"
                key={ancestor?.id ?? ""}
              >
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={() => queryRoute.setAssetId(ancestor?.id ?? "")}
                  >
                    {ancestor?.title ?? ""}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator orientation="vertical" className="h-12" />
      <DocumentNavigateMenuDialog />
    </div>
  );
}
