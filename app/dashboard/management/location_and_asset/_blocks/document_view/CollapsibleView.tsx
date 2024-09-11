"use client";
import { cn } from "@/lib/utils";

import React, {
  memo,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { DashboardCard } from "@/app/dashboard/_components/DashboardCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { DocumentObject, Property } from "@/domain/entities/Document";
import { useDocumentTree } from "@/app/dashboard/management/location_and_asset/_hooks/useDocumentContext";
import { useDataQueryRoute } from "@/app/dashboard/management/location_and_asset/_hooks/useQueryRoute";
import {
  getDocumentChildrenTypeOptions,
  getDocumentTypeLayer,
  getGroupDefaultType,
} from "@/domain/entities/DocumentConfig";
import { getDocumentTypeColor } from "../../_utils/documentTypeUIConfig";
import { DocumentTreeNode } from "../DocumentDataDisplayUI";
import { DocumentFormTableColumn } from "./TableView";
import { useDocumentTemplate } from "../../_hooks/useDocumentTemplate";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";
import { PropertyType } from "@/domain/entities/DocumentProperty";
import { CreateNewDataButton } from "../DataCRUDTrigger";
import { AnimationListContent } from "@/components/motion/AnimationListContent";
import { AnimationChevron } from "@/components/motion/AnimationChevron";
import { CollapsibleProps } from "@radix-ui/react-collapsible";
import { Skeleton } from "@nextui-org/react";

const LayerContext = createContext<number>(0);

type CollapsibleDataTableTreeViewProps = {
  document: DocumentObject;
  expanded?: boolean;
  className?: string;
};

export function CollapsibleDataTableTreeEntryView({
  document,
  className,
  expanded,
}: CollapsibleDataTableTreeViewProps) {
  console.log("document", document.id, "reload");
  const [isOpen, setIsOpen] = useState(expanded);
  const documentTree = useDocumentTree();
  const documentGroupType = documentTree.type;
  const queryPathService = useDataQueryRoute();
  const uiConfig = {
    ...getDocumentTypeLayer(document.type),
    color: getDocumentTypeColor(document.type),
  };
  const children = documentTree.getChildrenData(
    document.ancestors ?? "",
    document.id ?? ""
  );

  const handleToggle = (open: boolean) => {
    setIsOpen(open);
  };

  const depth = useContext(LayerContext) ?? 0;
  const tableColConfig = useContext(TableContext);
  const paddingStyle = {
    paddingLeft: `${depth * 1}rem`,
    width: tableColConfig[0].width,
  };
  const childrenTypeOptions = getDocumentChildrenTypeOptions(
    document.type,
    documentGroupType
  );

  const getCollapseChildren = () => {
    const array = childrenTypeOptions.map((type, index) => {
      return [
        ...children
          .filter((document) => document.type == type)
          .map((doc) => {
            return (
              <LayerContext.Provider value={depth + 1} key={doc.id}>
                <CollapsibleDataTableTreeEntryView
                  document={doc}
                  // expanded={false}
                  key={doc.id}
                />
              </LayerContext.Provider>
            );
          }),
        <div
          key={type}
          className={cn(
            getDocumentTypeColor(type).hoveringColor,
            getDocumentTypeColor(type).textHoveringColor
          )}
        >
          <div style={{ paddingLeft: `${depth + 1.5}rem` }}>
            <CreateNewDataButton
              className={cn("text-gray-500 hover:bg-transparent")}
              onClick={async () => {
                queryPathService.createNewAsset(
                  type,
                  document.ancestors.length > 0
                    ? document.ancestors + "," + document.id
                    : document.id ?? ""
                );
              }}
              label={`${getDocumentTypeLayer(type).name}`}
            />
          </div>
          <Separator className="w-full" />
        </div>,
      ];
    });
    return array.flat();
  };

  // useEffect(() => {
  //   let targetDocument = documentTree.getDocumentData(queryPathService.dataId);
  //   if (queryPathService.dataId !== "") {
  //     setIsOpen(queryPathService.dataId === document.id);
  //     // setIsOpen(targetDocument?.ancestors.includes(document.id ?? "") ?? false);
  //   }
  // }, [document.id, queryPathService.dataId]);

  function onDocumentSelect(docId: string) {
    queryPathService.setAssetId(docId);
    // setIsOpen(true);
  }

  const ref = React.createRef<HTMLObjectElement>();
  console.log(ref.current);
  return (
    <Collapsible
      // open={isOpen}
      onOpenChange={handleToggle}
      className={cn(
        "rounded-md bg-background max-h-[500px] md:max-h-max",
        className
      )}
      ref={ref}
    >
      <div className="w-full flex flex-row">
        <DashboardCard
          style={{ width: tableColConfig[0].width }}
          className="h-fit bg-transparent flex flex-row items-center group"
        >
          <div
            style={paddingStyle}
            className={cn(
              uiConfig.color.hoveringColor,
              "h-fit flex flex-row items-center py-1 group"
            )}
          >
            <CollapsibleTrigger className="bg-transparent">
              <AnimationChevron
                className={cn(
                  // haveChildren ? "visible" : "invisible",
                  "p-2 rounded-md opacity-0 bg-transparent",
                  isOpen ? "opacity-100" : "opacity-100 md:opacity-0",
                  "group-hover:cursor-pointer group-hover:opacity-100"
                )}
                isExpanded={isOpen ? true : false}
              />
            </CollapsibleTrigger>
            <CollapsibleTrigger className="bg-transparent" asChild>
              <DocumentTreeNode
                data={document}
                isSelected={true}
                onClick={() => onDocumentSelect(document.id!)}
              />
            </CollapsibleTrigger>
          </div>
        </DashboardCard>
        <DocumentFormTableColumn data={document} />
      </div>
      <Separator className="w-full" />
      <CollapsibleContent className="w-full">
        {getCollapseChildren().map((child, index) => (
          <AnimationListContent key={child.key} index={index}>
            {child}
          </AnimationListContent>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
type TableConfig = {
  name: string;
  width: string;
};
export const TableContext = createContext<TableConfig[]>([]);

export function CollapsibleDataTableTreeView() {
  // make sure uit wrapped in document Tree Provider
  const documentTree = useDocumentTree();
  const root = documentTree.getPathData("");
  console.log("root", root);
  const defaultType = getGroupDefaultType(documentTree.type);

  const { group, isLoadingTemplate, template } = useDocumentTemplate(
    documentTree.type
  );

  const properties = [
    {
      name: "敘述",
      value: "",
    } as Property,
    ...(template?.properties ?? ([] as Property[])),
  ];

  const tableColConfig = [
    {
      name: "主檔名稱",
      width: "250px",
    },
    ...properties.map((prop) => {
      if ((prop.type as PropertyType) === PropertyType.reference) {
        return {
          name: prop.name,
          width: "w-56",
        };
      }
      return {
        name: prop.name,
        width: "w-48",
      };
    }),
  ];

  return isLoadingTemplate || !template ? (
    <div className="w-[100px] max-w-max flex flex-col justify-start items-center space-y-">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <Skeleton
            key={index}
            className="w-full h-16 rounded-md bg-background"
          />
        );
      })}
    </div>
  ) : (
    <TableContext.Provider value={tableColConfig}>
      <div className="max-w-max p-2 bg-background">
        <div className="w-full bg-gray-50">
          <div className="w-full flex flex-row justify-start items-center p-2">
            <div
              style={{ width: tableColConfig[0].width }}
              className="text-sm font-semibold text-gray-500"
            >
              <p>主檔名稱</p>
            </div>
            {properties.map((prop) => {
              return (
                <div
                  key={prop.name}
                  className={cn(
                    tableColConfig.find((config) => config.name === prop.name)
                      ?.width ?? "w-48",
                    "text-sm font-semibold text-gray-500"
                  )}
                >
                  <div className="w-full flex flex-row">{prop.name}</div>
                  {/* <p className="w-full">{prop.name}</p> */}
                </div>
              );
            })}
          </div>
        </div>
        <Separator />
        {root.map((doc) => {
          return (
            <LayerContext.Provider value={0} key={doc.id}>
              <CollapsibleDataTableTreeEntryView
                document={doc}
                // expanded={true}
                key={doc.id}
              />
            </LayerContext.Provider>
          );
        })}
      </div>
    </TableContext.Provider>
  );
}
