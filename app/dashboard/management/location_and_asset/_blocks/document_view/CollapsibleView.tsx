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

const LayerContext = createContext<number>(0);

type CollapsibleDataTableTreeViewProps = {
  document: DocumentObject;
  expanded?: boolean;
  className?: string;
};

export function CollapsibleDataTableTreeEntryView({
  document,
  className,
  expanded = true,
}: CollapsibleDataTableTreeViewProps) {
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
  const handleToggle = () => {
    setIsOpen(!isOpen);
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
    return [
      ...children.map((doc) => {
        return (
          <LayerContext.Provider value={depth + 1} key={doc.id}>
            <CollapsibleDataTableTreeEntryView
              document={doc}
              expanded={true}
              key={doc.id}
            />
          </LayerContext.Provider>
        );
      }),

      ...childrenTypeOptions.map((type, index) => (
        <div
          key={type}
          className={cn(
            getDocumentTypeColor(type).hoveringColor,
            getDocumentTypeColor(type).textHoveringColor
          )}
        >
          <div style={{ paddingLeft: `${depth + 2.5}rem` }}>
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
        </div>
      )),
    ];
  };
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "rounded-md bg-background max-h-[500px] md:max-h-max",
        className
      )}
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
            <CollapsibleTrigger className="bg-transparent" asChild>
              <div
                className={cn(
                  //   haveChildren ? "visible" : "invisible",
                  "p-2 rounded-md opacity-100 bg-transparent",
                  // isOpen ? "opacity-100" : "opacity-100 md:opacity-0",
                  "group-hover:cursor-pointer group-hover:opacity-100"
                )}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LuChevronRight />
                </motion.div>
              </div>
            </CollapsibleTrigger>
            <DocumentTreeNode
              data={document}
              isSelected={true}
              onClick={() => {
                queryPathService.setAssetId(document.id!);
                //   setIsOpen(!isOpen);
                //   onClose?.();
              }}
              // style={headerWidth}
            />
          </div>
          {/* <DocumentFormTableColumn data={document} /> */}
        </DashboardCard>
        <DocumentFormTableColumn data={document} />
      </div>
      <Separator className="w-full" />
      <CollapsibleContent className="w-full">
        {getCollapseChildren().map((child, index) => (
          <motion.div
            key={child.key}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={index}
            variants={{
              initial: { opacity: 0, y: -20 },
              animate: (index) => ({
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, delay: index * 0.03 },
              }),
              exit: { opacity: 0, y: 20 },
            }}
          >
            {child}
          </motion.div>
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

  if (isLoadingTemplate || !template) {
    return <LoadingWidget />;
  }

  const properties = [
    // {
    //   name: "名稱",
    //   value: "",
    // } as Property,
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

  return (
    <TableContext.Provider value={tableColConfig}>
      <div className="max-w-max p-2 bg-background">
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
                    ?.width ?? "w-48"
                )}
              >
                <p>{prop.name}</p>
              </div>
            );
          })}
        </div>
        <Separator />
        {root.map((doc) => {
          return (
            <LayerContext.Provider value={0} key={doc.id}>
              <CollapsibleDataTableTreeEntryView
                document={doc}
                expanded={true}
                key={doc.id}
              />
            </LayerContext.Provider>
          );
        })}
      </div>
    </TableContext.Provider>
  );
}
