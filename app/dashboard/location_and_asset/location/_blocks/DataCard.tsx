"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LuExternalLink,
  LuFileEdit,
  LuLoader2,
  LuPlus,
  LuTrash,
} from "react-icons/lu";
import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Asset";
import {
  AssetType,
  getAssetChildrenTypeOptions,
  getAssetLayerRules,
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
import { Input } from "@/components/ui/input";
import {
  createNewData,
  deleteData,
  getDashboardAssetData,
} from "../_actions/PostDataAction";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import { AssetData } from "@/domain/entities/Asset";
import {
  searchPathCache,
  useAssetDataDelete,
  useAssetLocationData,
} from "../_hooks/useAssetLocationData";
import { motion } from "framer-motion";
function DeleteDialog({ deleteAssetIndex }: { deleteAssetIndex: string }) {
  const queryRoute = useAssetQueryRoute();
  const deleteAssetHook = useAssetDataDelete();
  async function onDelete(deleteAssetIndex: string) {
    console.log(
      "presentation: UI button clicked - delete data index",
      deleteAssetIndex
    );
    try {
      const returnIndex = await deleteAssetHook.onDelete(deleteAssetIndex);
      queryRoute.setAssetId(returnIndex);
    } catch (e) {
      console.error("presentation: deleteData error", e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant="outline"
          className="flex flex-row justify-center items-center space-x-2 text-destructive hover:bg-destructive hover:text-white"
        >
          <LuTrash />
        </Button>
      </DialogTrigger>
      <DialogContent className={"transition-all duration-500 ease-linear"}>
        <DialogHeader>
          <DialogTitle>刪除資產</DialogTitle>
          <DialogDescription>
            確定要刪除資產編號 {`${deleteAssetIndex} 嗎`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" className="text-gray-500">
              取消
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={async () => {
              await onDelete(deleteAssetIndex);
            }}
          >
            {deleteAssetHook.isDeleting ? (
              <>
                刪除中
                <LuLoader2 className="animate-spin" />
              </>
            ) : (
              "刪除"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AssetLocDataCard({
  data,
  assetChildren = [],
  variant = "default",
  ...props
}: {
  data: AssetLocationEntity;
  assetChildren: AssetLocationEntity[];
  variant?: "default" | "preview" | "expand";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const queryRoute = useAssetQueryRoute();

  const LocationDataFields = () => {
    return (
      <div className="w-full flex flex-col space-y-2 justify-start items-start">
        <div className="w-full flex flex-row justify-between h-16 space-x-4">
          <InfoBlock
            assetType={data.type}
            label={"經緯度"}
            value={`(${data.lat ?? 0}, ${data.lon ?? 0})`}
            className="w-full"
          />
          <Separator orientation="vertical" />

          <InfoBlock
            assetType={data.type}
            label="城市"
            value={data.city}
            className="w-full"
          >
            {/* <Input/> */}
          </InfoBlock>
          <Separator orientation="vertical" />
          <InfoBlock
            assetType={data.type}
            label="國家"
            value={data.country}
            className="w-full"
          />
          <Separator orientation="vertical" />
          <InfoBlock
            assetType={data.type}
            label="郵遞區號"
            value={data.zip}
            className="w-full"
          />
        </div>
        <Separator />
        <InfoBlock
          assetType={data.type}
          label="地址"
          value={data.addressLine1}
          className="w-full"
        />
        <Separator />

        <InfoBlock
          assetType={data.type}
          label="地址2"
          value={data.addressLine2}
          className="w-full"
        />
        <Separator />
      </div>
    );
  };

  const ChildrenList = () => {
    const isVisible = variant === "expand" || variant === "default";

    return isVisible ? (
      <InfoBlock
        assetType={data.type}
        label={"子項目"}
        className="w-full flex flex-col "
      >
        <div className="w-full grid grid-cols-3 gap-4">
          {assetChildren!.map((child) => (
            <div className="p-4 col-span-1 rounded-lg border" key={child.id}>
              <Link
                href={queryRoute.getNewDisplayURL(child.id ?? "")}
                className="flex flex-row justify-between items-center space-x-2"
              >
                <p>{child.name}</p>
                <LuExternalLink />
              </Link>
            </div>
          ))}
          {getAssetChildrenTypeOptions(data.type).map((type) => (
            <Button
              key={type}
              variant={"outline"}
              className="p-4 col-span-1 rounded-lg border h-full"
              onClick={async () => {
                queryRoute.createNewAsset(type, [...data.ancestors, data.id!]);
              }}
            >
              <div
                className={cn(
                  colorVariants[getAssetEntityInfo(type).color].textColor,
                  "flex flex-row justify-between items-center space-x-2"
                )}
              >
                <p>新增 {getAssetEntityInfo(type).label}</p>
                <LuPlus />
              </div>
            </Button>
          ))}
        </div>
      </InfoBlock>
    ) : null;
  };

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
        </div>
      </div>
    );
  };
  // create loading spinner

  return isLoading ? (
    <DashboardCard className="shadow-sm w-full  min-h-screen ">
      <div>isLoading</div>
    </DashboardCard>
  ) : (
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
          <LocationDataFields />
          <ChildrenList />
        </DashboardCardContent>
      </DashboardCard>
    </motion.div>
  );
}

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
