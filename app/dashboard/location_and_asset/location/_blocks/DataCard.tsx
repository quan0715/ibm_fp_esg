"use client";
import React, { Suspense, use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuFileEdit, LuLink } from "react-icons/lu";
import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetType,
  getAssetChildrenTypeOptions,
} from "@/domain/entities/AssetType";
import Link from "next/link";
import {
  getAssetEntityInfo,
  colorVariants,
} from "@/app/dashboard/location_and_asset/location/_utils/assetTypeUIConfig";
import { Separator } from "@/components/ui/separator";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";

import { useAssetQueryRoute } from "../_hooks/useQueryRoute";

import { motion } from "framer-motion";

import {
  CreateNewDataButton,
  DeleteDialog,
  DisplayMenuDialog,
} from "./DataCRUDTrigger";

export function AssetLocDataCard({
  data,
  assetChildren = [],
  ...props
}: {
  data: AssetLocationEntity;
  assetChildren: AssetLocationEntity[];
}) {
  const queryRoute = useAssetQueryRoute();
  const HeaderField = () => {
    return (
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex-grow flex flex-col space-y-0 justify-start items-start">
          <h1
            className={cn(
              "text-lg font-semibold",
              colorVariants[
                getAssetEntityInfo(data?.type ?? AssetType.None).color
              ].textColor
            )}
          >
            {data?.name ?? ""}
          </h1>
          <p className={"text-sm text-gray-500 text-start"}>
            {data?.description ?? ""}
          </p>
        </div>
        <div className="flex-shrink flex flex-row space-x-2">
          <Button
            size={"icon"}
            variant="outline"
            className="flex flex-row justify-center items-center space-x-2"
            asChild
          >
            <Link href={queryRoute.editURL}>
              <LuFileEdit />
            </Link>
          </Button>

          {assetChildren.length === 0 ? (
            <DeleteDialog deleteAssetIndex={data.id ?? ""} />
          ) : null}
          <div className="block md:hidden">
            <Suspense>
              <DisplayMenuDialog />
            </Suspense>
          </div>
        </div>
      </div>
    );
  };

  const layoutConfig = {
    sections: [
      {
        rows: [
          {
            blocks: [
              {
                assetType: data.type,
                label: "經緯度",
                value: `(${data.lat ?? "0"}, ${data.lon ?? "0"})`,
              },
              {
                assetType: data.type,
                label: "城市",
                value: data.city ?? "None",
              },
              {
                assetType: data.type,
                label: "國家",
                value: data.country ?? "None",
              },
              {
                assetType: data.type,
                label: "郵遞區號",
                value: data.zip ?? "None",
              },
            ],
          },
          {
            blocks: [
              {
                assetType: data.type,
                label: "地址1",
                value: data.addressLine1 ?? "None",
              },
              {
                assetType: data.type,
                label: "地址2",
                value: data.addressLine2 ?? "None",
              },
            ],
          },
        ],
      },
      {
        rows: [
          {
            blocks: [
              {
                assetType: data.type,
                label: "子項目",
                children: (
                  <MultiChildrenLayout>
                    {assetChildren!.map((child) => (
                      <ChildAttributeButton
                        key={child.id}
                        className="w-full md:max-w-[250px] h-fit"
                        onClick={() => queryRoute.setAssetId(child.id ?? "")}
                        label={child.name}
                      />
                    ))}
                    {getAssetChildrenTypeOptions(data.type).map((type) => (
                      <CreateNewDataButton
                        key={type}
                        className={cn(
                          "rounded-md border h-full",
                          colorVariants[getAssetEntityInfo(type).color]
                            .textColor
                        )}
                        onClick={async () => {
                          let newAncestors = [...data.ancestors, data.id!];
                          queryRoute.createNewAsset(type, newAncestors);
                        }}
                        label={getAssetEntityInfo(type).label}
                      />
                    ))}
                  </MultiChildrenLayout>
                ),
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <DashboardCard className="shadow-sm w-full  min-h-screen ">
        <DashboardCardHeader title="">
          <HeaderField />
        </DashboardCardHeader>
        <DashboardCardContent className="flex flex-col space-y-2">
          {layoutConfig.sections.map((section, index) => {
            return (
              <DataSection key={index}>
                {section.rows.map((row, index) => {
                  return <DataCardRow key={index} blocks={row.blocks} />;
                })}
              </DataSection>
            );
          })}
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
export function DataSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-col justify-start items-start space-y-2">
      {children}
    </div>
  );
}

export function DataCardRow({ blocks }: { blocks: InfoBlockProps[] }) {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between h-fit md:space-x-4">
        {blocks.map((block, index) => {
          return (
            <>
              <InfoBlock
                assetType={block.assetType}
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
  assetType: AssetType;
  children?: React.ReactNode;
  className?: string;
};

export function InfoBlock({
  label,
  value,
  assetType = AssetType.None,
  className,
  children,
}: {
  label: string;
  value?: string;
  assetType?: AssetType;
  className?: string;
  children?: React.ReactNode;
}) {
  const colorVariant = colorVariants[getAssetEntityInfo(assetType).color];
  return (
    <div
      className={cn("flex flex-col justify-start items-start py-1", className)}
    >
      <p className={cn(colorVariant.textColor, "text-md font-normal")}>
        {label}
      </p>
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
