"use client";
import React, { ReactNode, Suspense, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuFileEdit, LuLink } from "react-icons/lu";
import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Location";
import {
  LocationType,
  getLocationChildrenTypeOptions,
} from "@/domain/entities/LocationType";
import Link from "next/link";
import {
  getAssetEntityInfo,
  colorVariants,
} from "@/app/dashboard/location_and_asset/location/_utils/locationTypeUIConfig";
import { Separator } from "@/components/ui/separator";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardActionList,
  DashboardCardHeaderDescription,
  DashboardCardHeaderTitle,
  DashboardCardHeader,
  DashboardCardHeaderContent,
} from "@/app/dashboard/_components/DashboardCard";

import { useAssetQueryRoute } from "../_hooks/useQueryRoute";

import { motion } from "framer-motion";

import { DeleteDialog, DisplayMenuDialog } from "./DataCRUDTrigger";
import { EditButton } from "./buttons";
import { MobileOnly } from "@/components/layouts/layoutWidget";

export type layoutsConfigType = {
  sections: {
    rows: {
      blocks: InfoBlockProps[];
    }[];
  }[];
};

type DatCardType = {
  colorTheme: ColorThemeType; // css color value
  title: string;
  description: string;
  layoutConfig: layoutsConfigType;
  withDelete?: boolean;
  withEdit?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  isDeleting?: boolean;
  isEditing?: boolean;
};

type ColorThemeType = {
  bgColor: string;
  leadingColor: string;
  textColor: string;
  borderColor: string;
};

export function DataCard({
  colorTheme = {
    bgColor: "bg-white",
    leadingColor: "bg-blue-500",
    textColor: "text-black",
    borderColor: "border-gray-200",
  },
  title = "Title",
  description = "Description",
  layoutConfig,
  withDelete = true,
  withEdit = true,
  onDelete = () => {},
  onEdit = () => {},
  isDeleting = false,
  isEditing = false,
}: DatCardType) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <DashboardCard className="shadow-sm w-full min-h-screen ">
        <DashboardCardHeader>
          <DashboardCardHeaderContent>
            <DashboardCardHeaderTitle
              title={title}
              className={colorTheme.textColor}
            />
            <DashboardCardHeaderDescription description={description} />
          </DashboardCardHeaderContent>
          <DashboardCardActionList>
            <EditButton isHidden={!withEdit} onClick={onEdit} />
            <DeleteDialog
              onDelete={onDelete}
              isDisabled={!withDelete}
              isDeleting={isDeleting}
              deleteAssetIndex={""}
            />
            <MobileOnly>
              <DisplayMenuDialog />
            </MobileOnly>
          </DashboardCardActionList>
        </DashboardCardHeader>
        <DashboardCardContent className="flex flex-col space-y-2">
          <DataCardContentDisplay
            colorTheme={colorTheme}
            layoutConfig={layoutConfig}
          />
        </DashboardCardContent>
      </DashboardCard>
    </motion.div>
  );
}

export function MultiChildrenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {children}
    </div>
  );
}

function DataCardContentDisplay({
  layoutConfig,
  colorTheme,
}: {
  colorTheme?: ColorThemeType;
  layoutConfig: layoutsConfigType;
}) {
  return (
    <>
      {layoutConfig.sections.map((section, index) => {
        return (
          <DataSection key={index}>
            {section.rows.map((row, index) => {
              return (
                <DataCardRow
                  key={index}
                  blocks={row.blocks}
                  colorTheme={colorTheme}
                />
              );
            })}
          </DataSection>
        );
      })}
    </>
  );
}

export function DataSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-start items-start space-y-2">
      {children}
    </div>
  );
}

export function DataCardRow({
  blocks,
  colorTheme,
}: {
  colorTheme?: ColorThemeType;
  blocks: InfoBlockProps[];
}) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between h-fit md:space-x-4">
        {blocks.map((block, index) => {
          return (
            <>
              <InfoBlock
                labelColor={colorTheme?.textColor}
                label={block.label}
                value={block.value}
                className="w-full"
              >
                {block.children}
              </InfoBlock>
              {index < blocks.length - 1 ? (
                <Separator
                  orientation="vertical"
                  className="h-16 hidden md:block"
                />
              ) : null}
            </>
          );
        })}
      </div>
      <Separator />
    </>
  );
}
type InfoBlockProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
  className?: string;
};

export function InfoBlock({
  label,
  value,
  // LocationType = LocationType.None,
  labelColor = "text-black",
  className,
  children,
}: {
  label: string;
  value?: string;
  labelColor?: string;
  // LocationType?: LocationType;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex flex-col justify-start items-start py-1", className)}
    >
      <p className={cn(labelColor, "text-md font-normal")}>{label}</p>
      {children ?? <p className="text-md font-semibold">{value ?? "None"}</p>}
    </div>
  );
}

export function ChildAttributeButton({
  className = "",
  onClick,
  label,
}: {
  className?: string;
  // href: string;
  onClick?: () => void;
  label: string;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(
        "w-full h-full flex flex-row justify-between items-center",
        className
      )}
    >
      <p>{label}</p>
      <LuLink />
    </Button>
  );
}
