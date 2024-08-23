"use client";
import { cn } from "@/lib/utils";

import React, { memo, useContext, useEffect, useState } from "react";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeaderTest,
} from "@/app/dashboard/_components/DashboardCard";

import {
  getDocumentTypeColor,
  getDocumentEntityUIConfig,
} from "../_utils/documentTypeUIConfig";

import { Separator } from "@/components/ui/separator";
import {
  LuCheck,
  LuPlus,
  LuMinus,
  LuArrowLeft,
  LuArrowRight,
  LuExpand,
  LuChevronDown,
  LuChevronRight,
  LuChevronUp,
} from "react-icons/lu";

import Link from "next/link";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { CreateNewDataButton } from "./DataCRUDTrigger";
import { DashboardLabelChip } from "./DocumentLabelChip";
import { DocumentObject, DocumentObjectType } from "@/domain/entities/Document";
import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  useDocumentData,
  useDocumentWithSearchPath,
} from "../_hooks/useDocument";
import { DocumentContext } from "./DocumentPage";
import { ChevronsUpDown } from "lucide-react";
import { getDocumentChildrenTypeOptions } from "@/domain/entities/DocumentConfig";
import { get } from "http";
import { useDocumentTree } from "../_hooks/useDocumentContext";

export function DocumentDataCardListView({
  className,
  type,
  searchPath,
  documents,
}: {
  className?: string;
  type: DocumentObjectType;
  searchPath: string;
  documents: DocumentObject[];
}) {
  const docUIConfig = getDocumentEntityUIConfig(type);
  const getDocumentColor = getDocumentTypeColor(type);
  const queryPathService = useDataQueryRoute();

  return (
    <DashboardCard className={cn(className)}>
      <DashboardCardHeaderTest
        title={docUIConfig.label}
        titleComponent={(title: string) => (
          <DashboardLabelChip
            title={title}
            color={docUIConfig.color}
            length={documents.length}
          />
        )}
      ></DashboardCardHeaderTest>
      <DashboardCardContent>
        <div className={"w-full h-fit grid grid-cols-1 gap-4"}>
          {documents.map((data, index) => {
            return (
              <div
                onClick={() => {
                  queryPathService.setAssetId(data.id ?? "");
                }}
                // href={queryPathService.getNewDisplayURL(data.id ?? "")}
                key={data.id}
              >
                <DocumentCardView
                  data={data}
                  selected={data.id === queryPathService.dataId}
                  key={data.id}
                />
                {index < documents.length - 1 ? <Separator /> : null}
              </div>
            );
          })}
        </div>
        {queryPathService.mode === "display" ? (
          <CreateNewDataButton
            className={cn(getDocumentColor.textColor)}
            onClick={async () => {
              queryPathService.createNewAsset(type, searchPath);
            }}
            label={`${docUIConfig.label}`}
          />
        ) : null}
      </DashboardCardContent>
    </DashboardCard>
  );
}

export const DocumentCardView = memo(function AssetLocDataListView({
  data,
  selected = false,
}: {
  data: DocumentObject;
  selected?: boolean;
}) {
  const colorVariant = getDocumentTypeColor(data.type);
  const typeUIConfig = getDocumentEntityUIConfig(data.type);
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-between items-center p-2 rounded-md",
        "hover:cursor-pointer hover:bg-secondary"
      )}
    >
      <div
        className={cn(
          "flex-grow w-full h-fit grid grid-cols-1 gap-2 py-2 rounded-md"
        )}
      >
        <h1 className={cn("font-semibold text-md", colorVariant.textColor)}>
          {data.title}
        </h1>
        <p className={cn("text-sm")}>{data.description}</p>
      </div>
      {selected ? (
        <div
          className={cn(
            "flex flex-col justify-center items-center",
            "rounded-full p-0.5",
            colorVariant.leadingColor
          )}
        >
          <LuCheck size={16} className={"text-white"} />
        </div>
      ) : null}
    </div>
  );
});

export const DocumentDataTreeEntryView = memo(function DashboardColumnMin({
  data,
  onClick,
  className,
  depth = 0,
}: {
  onClick?: () => void;
  className?: string;
  data: DocumentObject;
  depth?: number;
}) {
  const type = data.type;
  // const typeUIConfig = getDocumentEntityUIConfig(type);
  const tailwindColorClass = getDocumentTypeColor(type);
  const documentTree = useDocumentTree();
  const docType = documentTree.type;
  const queryPathService = useDataQueryRoute();
  // const document = useDocumentData(data.id ?? "", docType);
  const children = documentTree.getChildrenData(
    data.ancestors ?? "",
    data.id ?? ""
  );
  const targetDocument = documentTree.getDocumentData(queryPathService.dataId);
  const routePath = useDataQueryRoute();
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = queryPathService.dataId === data.id;

  useEffect(() => {
    setIsOpen(targetDocument?.ancestors.includes(data.id ?? "") ?? false);
    console.log(data);
    console.log(children);
  }, [data]);

  const haveChildren = getDocumentChildrenTypeOptions(type, docType).length;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full rounded-md bg-background", className)}
    >
      <div
        style={{ paddingLeft: `${depth * 1}rem` }}
        className={cn(tailwindColorClass.hoveringColor)}
      >
        <DashboardCard className="bg-transparent w-full flex flex-row items-center py-1 px-1 group">
          <CollapsibleTrigger className="bg-transparent" asChild>
            <div
              className={cn(
                haveChildren ? "visible" : "invisible",
                "p-2 rounded-md opacity-0 bg-transparent",
                isOpen ? "opacity-100" : "opacity-0",
                "group-hover:cursor-pointer group-hover:opacity-100"
              )}
            >
              {isOpen ? <LuChevronDown /> : <LuChevronRight />}
            </div>
          </CollapsibleTrigger>
          <div
            className={cn(
              "flex-1 flex flex-row justify-start items-center space-x-1"
            )}
          >
            <div
              className={cn(
                "w-[6px] h-[6px] rounded-full",
                tailwindColorClass.leadingColor
              )}
            />
            <h1
              className={cn(
                "w-full font-semibold text-sm",
                isSelected ? tailwindColorClass.textColor : ""
              )}
            >
              {data.title}
            </h1>
            <Button
              type="button"
              className={cn(
                "w-9 h-9 rounded-md",
                "invisible group-hover:visible",
                "hover:bg-background hover:cursor-pointer"
              )}
              onClick={onClick}
              size={"icon"}
              variant={"outline"}
            >
              <LuArrowRight className={tailwindColorClass.textColor} />
            </Button>
          </div>
        </DashboardCard>
      </div>
      <Separator className="w-full" />
      <CollapsibleContent className="w-full ">
        {children.map((child) => (
          <DocumentDataTreeEntryView
            data={child}
            onClick={() => routePath.setAssetId(child.id!)}
            key={child.id}
            depth={depth + 1}
          />
        ))}
        {getDocumentChildrenTypeOptions(type, docType).map((type) => (
          <div
            key={type}
            className={cn(
              getDocumentTypeColor(type).hoveringColor,
              getDocumentTypeColor(type).textHoveringColor
            )}
          >
            <div style={{ paddingLeft: `${depth * 1.5}rem` }}>
              <CreateNewDataButton
                className={cn("text-gray-500 hover:bg-transparent")}
                onClick={async () => {
                  queryPathService.createNewAsset(
                    type,
                    data.ancestors.length > 0
                      ? data.ancestors + "," + data.id
                      : data.id ?? ""
                  );
                }}
                label={`${getDocumentEntityUIConfig(type).label}`}
              />
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
});

export const DocumentReferencePropertyView = memo(function DashboardColumnMin({
  data,
  onClick,
  mode = "display",
}: {
  onClick?: () => void;
  data: DocumentObject;
  mode: "selected" | "candidate" | "display";
}) {
  const type = data.type;
  const typeUIConfig = getDocumentEntityUIConfig(type);
  const tailwindColorClass = getDocumentTypeColor(type);

  function getModeIcon() {
    switch (mode) {
      case "selected":
        return <LuMinus className={tailwindColorClass.textColor} />;
      case "candidate":
        return <LuPlus className={tailwindColorClass.textColor} />;
      case "display":
        return <LuArrowRight className={tailwindColorClass.textColor} />;
    }
  }
  return (
    <div
      className="w-full group"
      onClick={mode === "display" ? onClick : undefined}
    >
      <DashboardCard
        className={cn(
          "flex flex-row items-center justify-start space-x-6",
          "w-full rounded-md px-1 py-0.5",
          "group-hover:cursor-pointer group-hover:bg-secondary"
        )}
      >
        <div className="flex flex-1 flex-row justify-start items-center space-x-4">
          <DashboardLabelChip
            title={typeUIConfig.label}
            color={typeUIConfig.color}
          />
          <h1
            className={cn(
              "font-semibold text-sm",
              tailwindColorClass.textColor
            )}
          >
            {data.title}
          </h1>
        </div>
        <Button
          type="button"
          className={cn("invisible group-hover:visible", "hover:bg-background")}
          onClick={onClick}
          size={"icon"}
          variant={"outline"}
        >
          {getModeIcon()}
        </Button>
      </DashboardCard>
    </div>
  );
});
