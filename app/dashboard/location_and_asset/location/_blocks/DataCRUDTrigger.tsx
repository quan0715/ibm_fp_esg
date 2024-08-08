"use client";
import { Button } from "@/components/ui/button";
import { LuLoader2, LuMenu, LuPlus, LuTrash, LuX } from "react-icons/lu";
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

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { LocationType, getLocationType } from "@/domain/entities/LocationType";
import {
  getAssetEntityInfo,
  colorVariants,
} from "../_utils/locationTypeUIConfig";
import { AssetLocationDataForm } from "./DataForm";
import { AssetLocationEntity } from "@/domain/entities/Location";
import { deleteData } from "../_actions/PostDataAction";
import { useRouter } from "next/navigation";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import {
  useAssetDataDelete,
  useAssetLocationData,
} from "../_hooks/useAssetLocationData";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { NavigateMenu } from "./NavigateMenu";
import { LocationDataPageView } from "./LocationDataDisplayUI";

export function CreateNewAssetLocationDataDialog({
  defaultAssetType = LocationType.organization,
}: {
  defaultAssetType: LocationType;
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
          <LocationDataPageView
            data={data}
            key={data.name}
            assetChildren={[]}
          />
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

export function DisplayMenuDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const queryRoute = useAssetQueryRoute();
  const assetDataSearch = useAssetLocationData();
  const mode = queryRoute.mode;
  const assetId = queryRoute.assetId;

  if (assetId === "" && mode === "display") {
    queryRoute.setAssetId("669764b4e1b6f7cb9d170a31");
  }

  useEffect(() => {
    // console.log("assetId", assetId, "mode", mode);
    assetDataSearch.setAssetId(assetId);
    assetDataSearch.setMode(mode);
  }, [assetId, mode, assetDataSearch]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"ghost"}>
          <LuMenu />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className={cn(
          "p-4 w-full border-0 transition-all duration-500 ease-linear",
          className
        )}
      >
        <NavigateMenu
          isBlocking={assetDataSearch.isFetchingData}
          ancestors={assetDataSearch.ancestors ?? []}
          siblings={assetDataSearch.sibling ?? []}
          path={assetDataSearch.assetData?.ancestors ?? []}
        />
      </DrawerContent>
    </Drawer>
  );
}

export function DeleteDialog({
  isHidden = false,
  isDisabled = false,
  isDeleting = false,
  deleteAssetIndex,
  onDelete,
}: {
  isHidden?: boolean;
  isDisabled?: boolean;
  isDeleting?: boolean;
  deleteAssetIndex: string;
  onDelete: () => void;
}) {
  // const queryRoute = useAssetQueryRoute();
  // const deleteAssetHook = useAssetDataDelete();
  // async function onDelete(deleteAssetIndex: string) {
  //   console.log(
  //     "presentation: UI button clicked - delete data index",
  //     deleteAssetIndex
  //   );
  //   try {
  //     const returnIndex = await deleteAssetHook.onDelete(deleteAssetIndex);
  //     queryRoute.setAssetId(returnIndex);
  //   } catch (e) {
  //     console.error("presentation: deleteData error", e);
  //   }
  // }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          hidden={isHidden}
          disabled={isDisabled}
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
          <Button variant="destructive" onClick={onDelete}>
            {isDeleting ? (
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

export function CreateNewDataButton({
  className,
  onClick,
  label = "",
  isLoading = false,
}: {
  className?: string;
  onClick?: () => void;
  label: string;
  isLoading?: boolean;
}) {
  return (
    <Button variant={"ghost"} className={className} onClick={onClick}>
      <LuPlus />
      新增 {label}
      {isLoading ? <LuLoader2 className="animate-spin" /> : null}
    </Button>
  );
}
