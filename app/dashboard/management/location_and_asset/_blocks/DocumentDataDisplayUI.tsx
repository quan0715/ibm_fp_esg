"use client";
import { cn } from "@/lib/utils";

import { AssetData, AssetLocationEntity } from "@/domain/entities/Location";
import React, { memo, useState } from "react";
import {
  LocationType,
  getLocationChildrenTypeOptions,
} from "@/domain/entities/LocationType";
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
import { LuCheck } from "react-icons/lu";
import Link from "next/link";
import { useDataQueryRoute } from "../_hooks/useQueryRoute";
import { CreateNewDataButton } from "./DataCRUDTrigger";
import { DashboardLabelChip } from "./DocumentLabelChip";
import { DocumentObject, DocumentObjectType } from "@/domain/entities/Document";

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
              <Link
                href={queryPathService.getNewDisplayURL(data.id ?? "")}
                key={data.id}
              >
                <DocumentCardView
                  data={data}
                  selected={data.id === queryPathService.dataId}
                  key={data.id}
                />
                {index < documents.length - 1 ? <Separator /> : null}
              </Link>
            );
          })}
        </div>
        <CreateNewDataButton
          className={cn(getDocumentColor.textColor)}
          onClick={async () => {
            queryPathService.createNewAsset(type, searchPath);
          }}
          label={`${docUIConfig.label}`}
        />
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
