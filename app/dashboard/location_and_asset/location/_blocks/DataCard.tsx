"use client";
import React, { ReactNode, Suspense, use, useEffect, useState } from "react";
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
  DashboardCardActionList,
  DashboardCardHeaderDescription,
  DashboardCardHeaderTitle,
  DashboardCardHeader,
  DashboardCardHeaderContent,
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
  const textColor =
    colorVariants[getAssetEntityInfo(data?.type ?? AssetType.None).color]
      .textColor;

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
      <DashboardCard className="shadow-sm w-full min-h-screen ">
        <DashboardCardHeader>
          <DashboardCardHeaderContent>
            <DashboardCardHeaderTitle title={data.name} className={textColor} />
            <DashboardCardHeaderDescription description={data.description} />
          </DashboardCardHeaderContent>
          <DashboardCardActionList>
            <Button
              size={"icon"}
              variant="outline"
              className="flex flex-row justify-center items-center space-x-2"
              onClick={() => {
                queryRoute.setAssetId(data.id!, true);
              }}
            >
              <LuFileEdit />
            </Button>

            {assetChildren.length === 0 ? (
              <DeleteDialog deleteAssetIndex={data.id ?? ""} />
            ) : null}

            <div className="block md:hidden">
              <DisplayMenuDialog />
            </div>
          </DashboardCardActionList>
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

export function AssetDataCard({
  // data,
  // assetChildren = [],
  ...props
}: {
  // data: AssetLocationEntity;
  // assetChildren: AssetLocationEntity[];
}) {
  // const queryRoute = useAssetQueryRoute();
  const textColor =
    colorVariants[getAssetEntityInfo(AssetType.None).color].textColor;

  const layoutConfig = {
    sections: [
      {
        rows: [
          {
            blocks: [
              {
                assetType: AssetType.None,
                label: "狀態",
                value: "啟用中",
              },
            ],
          },
          {
            blocks: [
              {
                assetType: AssetType.None,
                label: "Product",
                value: "Product A",
              },
            ],
          },
          {
            blocks: [
              {
                assetType: AssetType.None,
                label: "有效開始日期",
                value: new Date().toLocaleDateString(),
              },
              {
                assetType: AssetType.None,
                label: "有效結束日期",
                value: new Date().toLocaleDateString(),
              },
              {
                assetType: AssetType.None,
                label: "啟用日期",
                value: new Date().toLocaleDateString(),
              },
              {
                assetType: AssetType.None,
                label: "停運日期",
                value: new Date().toLocaleDateString(),
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
                assetType: AssetType.None,
                label: "位置資料",
                children: (
                  <MultiChildrenLayout>
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"System 1"}
                    />
                  </MultiChildrenLayout>
                ),
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
                assetType: AssetType.None,
                label: "子資產",
                children: (
                  <MultiChildrenLayout>
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component1"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component2"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component3"}
                    />
                    <ChildAttributeButton
                      className="w-full md:max-w-[250px] h-fit"
                      label={"Component4"}
                    />
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
      <DashboardCard className="shadow-sm w-full min-h-screen ">
        <DashboardCardHeader>
          <DashboardCardHeaderContent>
            <DashboardCardHeaderTitle title={"tool A"} className={textColor} />
            <DashboardCardHeaderDescription description={"this is tool A"} />
          </DashboardCardHeaderContent>
          <DashboardCardActionList>
            <Button
              size={"icon"}
              variant="outline"
              className="flex flex-row justify-center items-center space-x-2"
              onClick={() => {
                // queryRoute.setAssetId(data.id!, true);
              }}
            >
              <LuFileEdit />
            </Button>
          </DashboardCardActionList>
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
