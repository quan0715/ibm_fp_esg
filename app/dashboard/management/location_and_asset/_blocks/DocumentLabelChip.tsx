"use client";
import { cn } from "@/lib/utils";
import React from "react";

import {
  colorVariants,
  DocumentTypeColor,
  getDocumentTypeColor,
} from "../_utils/documentTypeUIConfig";
import { DocumentObjectType } from "@/domain/entities/Document";
import { getDocumentTypeLayer } from "@/domain/entities/DocumentConfig";

export function DashboardLabelChip({
  type,
  length = undefined,
}: {
  type: DocumentObjectType;
  length?: number;
}) {
  const docUIConfig = {
    ...getDocumentTypeLayer(type),
    color: getDocumentTypeColor(type),
  };
  return (
    <>
      <div
        className={cn(
          "w-fit flex flex-rol justify-center items-center space-x-1 px-2 py-0.5 rounded-lg",
          docUIConfig.color.bgColor
        )}
      >
        <div
          className={cn(
            "w-[6px] h-[6px] rounded-full",
            docUIConfig.color.leadingColor
          )}
        ></div>
        <p className={"text-sm font-semibold"}>{docUIConfig.name}</p>
      </div>
      {length != undefined ? (
        <p className={cn("pl-4 text-md", docUIConfig.color.textColor)}>
          {length}
        </p>
      ) : null}
    </>
  );
}
