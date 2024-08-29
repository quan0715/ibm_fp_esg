import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { useState } from "react";
import { DocumentDataTreeEntryView } from "./DocumentDataDisplayUI";
import {
  getDocumentTypeLayer,
  getGroupDefaultType,
} from "@/domain/entities/DocumentConfig";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { LuMenu, LuSearch, LuSearchCode, LuSearchX } from "react-icons/lu";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { cn } from "@/lib/utils";
import { getDocumentTypeColor } from "../_utils/documentTypeUIConfig";
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
            label={`${getDocumentTypeLayer(getGroupDefaultType(documentTree.type)).name}`}
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
    <div className="max-h-max h-full bg-background">
      <div className="flex flex-row items-center justify-center bg-background h-13">
        <div className="w-full flex flex-row items-center justify-center space-x-2 px-2">
          <Input
            className={cn("border-0", "w-full h-12 bg-background rounded-md")}
            placeholder="搜尋..."
          />
          <LuSearch className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <Separator />

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
          label={`${getDocumentTypeLayer(getGroupDefaultType(documentTree.type)).name}`}
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
      <Breadcrumb className="w-full pl-5">
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
