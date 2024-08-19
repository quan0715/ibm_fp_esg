"use client";
import { cn } from "@/lib/utils";

import React, { memo, useState } from "react";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeaderTest,
} from "@/app/dashboard/_components/DashboardCard";

import {
  getDocumentTypeColor,
  getDocumentEntityUIConfig,
} from "../_utils/locationTypeUIConfig";

import { Separator } from "@/components/ui/separator";
import {
  LuCheck,
  LuPlus,
  LuMinus,
  LuArrowLeft,
  LuArrowRight,
} from "react-icons/lu";
import Link from "next/link";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { CreateNewDataButton } from "./DataCRUDTrigger";
import { DashboardLabelChip } from "./DocumentLabelChip";
import { DocumentObject, DocumentObjectType } from "@/domain/entities/Document";
import { Button } from "@/components/ui/button";

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

export const DocumentDataAncestorView = memo(function DashboardColumnMin({
  data,
  onClick,
}: {
  onClick?: () => void;
  data: DocumentObject;
}) {
  const type = data.type;
  const typeUIConfig = getDocumentEntityUIConfig(type);
  const tailwindColorClass = getDocumentTypeColor(type);
  return (
    <div onClick={onClick} className="w-full">
      <DashboardCard
        className={cn(
          "flex flex-row items-center justify-between",
          "shadow-sm w-full rounded-md px-2 py-2",
          "hover:cursor-pointer hover:rounded-xl hover:animate-pulse"
        )}
      >
        <DashboardLabelChip
          title={typeUIConfig.label}
          color={typeUIConfig.color}
        />
        <h1
          className={cn("font-semibold text-sm", tailwindColorClass.textColor)}
        >
          {data.title}
        </h1>
      </DashboardCard>
    </div>
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
    <div className="w-full min-w-[250px] group">
      <DashboardCard
        className={cn(
          "flex flex-row items-center justify-start space-x-6",
          "w-full rounded-md px-2 py-1",
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
