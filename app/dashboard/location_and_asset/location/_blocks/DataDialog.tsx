"use client";
import { Button } from "@/components/ui/button";
import { LuPlus, LuX } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AssetLocDataCard } from "./DataCard";
import { AssetType, getAssetType } from "@/domain/entities/AssetType";
import { getAssetEntityInfo, colorVariants } from "../_utils/assetTypeUIConfig";
import { AssetLocationDataForm } from "./DataForm";
import { AssetLocationEntity } from "@/domain/entities/Asset";
import { deleteData } from "../_actions/PostDataAction";
import { useRouter } from "next/navigation";
export function CreateNewAssetLocationDataDialog({
  defaultAssetType = AssetType.Organization,
}: {
  defaultAssetType: AssetType;
}) {
  const [open, setOpen] = useState(false);
  const assetInfo = getAssetEntityInfo(defaultAssetType);
  const colorVariant = colorVariants[assetInfo.color];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className={cn(colorVariant.textColor)}>
          <LuPlus />
          新增 {assetInfo.label}
        </Button>
      </DialogTrigger>
      <DialogContent className={"transition-all duration-500 ease-linear"}>
        <DialogHeader>
          <DialogTitle>
            建立新
            <span className={colorVariant.textColor}>{assetInfo.label}</span>
            資產
          </DialogTitle>
          <DialogDescription>請依順序完成添加新的資產資料</DialogDescription>
        </DialogHeader>
        <AssetLocationDataForm />
      </DialogContent>
    </Dialog>
  );
}

export function AssetLocationDataDialog({
  data,
  // size,
}: {
  data: AssetLocationEntity;
  // variant: "small" | "medium" | "large";
}) {
  const [open, setOpen] = useState(false);
  const [assetData, setAssetData] = useState(data);
  const assetTypeInfo = getAssetEntityInfo(assetData.type);
  const colorVariant = colorVariants[assetTypeInfo.color];
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button asChild>
          <AssetLocDataCard data={data} key={data.name} assetChildren={[]} />
        </Button>
      </DialogTrigger>
      <DialogContent className={"transition-all duration-500 ease-linear"}>
        <DialogHeader>
          <DialogTitle>
            <span className={colorVariant.textColor}>{data.name}</span>
          </DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>
        <AssetLocationDataForm data={assetData} />
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await deleteData(data.id!);
              setOpen(false);
              router.refresh();
            }}
          >
            <LuX size={24} className="pr-1" />
            刪除 {data.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
