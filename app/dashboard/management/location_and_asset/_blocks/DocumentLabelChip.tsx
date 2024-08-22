"use client";
import { cn } from "@/lib/utils";
import React from "react";

import {
  colorVariants,
  DocumentTypeColor,
} from "../_utils/documentTypeUIConfig";

export function DashboardLabelChip({
  title,
  color,
  length = undefined,
}: {
  title: string;
  color: DocumentTypeColor;
  length?: number;
}) {
  return (
    <>
      <div
        className={cn(
          "w-fit flex flex-rol justify-center items-center space-x-2 px-2 py-0.5 rounded-lg",
          colorVariants[color].bgColor
        )}
      >
        <div
          className={cn(
            "w-[7px] h-[7px] rounded-full",
            colorVariants[color].leadingColor
          )}
        ></div>
        <p className={"text-sm font-semibold"}>{title}</p>
      </div>
      {length != undefined ? (
        <p className={cn("pl-4 text-md", colorVariants[color].textColor)}>
          {length}
        </p>
      ) : null}
    </>
  );
}
