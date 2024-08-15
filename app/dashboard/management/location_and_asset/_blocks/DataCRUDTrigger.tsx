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

export function DeleteDialog({
  isHidden = false,
  isDisabled = false,
  isDeleting = false,
  onDelete,
}: {
  isHidden?: boolean;
  isDisabled?: boolean;
  isDeleting?: boolean;
  onDelete: () => void;
}) {
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
          <DialogTitle>刪除文件</DialogTitle>
          <DialogDescription>
            確定要刪除文件嗎？此操作無法復原。
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
    <Button
      type="button"
      variant={"ghost"}
      className={className}
      onClick={onClick}
    >
      <LuPlus />
      新增{label}
      {isLoading ? <LuLoader2 className="animate-spin" /> : null}
    </Button>
  );
}
