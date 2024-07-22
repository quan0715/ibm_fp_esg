"use client";
import { Button } from "@/components/ui/button";
import { LuPlus, LuX } from "react-icons/lu";

import React, { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AssetType, getAssetType } from "@/domain/entities/AssetType";
import { getAssetEntityInfo, colorVariants } from "../_utils/assetTypeUIConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { AssetLocationEntity, getNewAssetData } from "@/domain/entities/Asset";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PipeLineCard, PipeLineStepContent } from "./PipeLineCard";

import { useRouter } from "next/navigation";
import { postData, updateData } from "../_actions/PostDataAction";

export function AssetLocationDataForm({
  defaultAssetType = AssetType.Organization,
  data,
  setDialogOpen,
}: {
  defaultAssetType: AssetType;
  setDialogOpen?: Dispatch<SetStateAction<boolean>>;
  data?: AssetLocationEntity;
}) {
  // if data is provided, use it as default data
  // display existing data in the form
  // otherwise, create a new data
  const isCreateMode = data == null;

  const [assetData, setAssetData] = useState<AssetLocationEntity>(
    data ?? getNewAssetData(defaultAssetType)
  );

  const [tempChildrenName, setTempChildrenName] = useState("");
  const [childArray, setChildArray] = useState<string[]>(
    assetData.children ?? []
  );

  const form = useForm<AssetLocationEntity>({
    defaultValues: data,
  });

  const router = useRouter();

  function setAssetType(type: AssetType) {
    setAssetData(getNewAssetData(type));
    form.reset(getNewAssetData(type));
  }

  async function onSubmit(values: AssetLocationEntity) {
    const res = {
      ...values,
      children: childArray,
    } as AssetLocationEntity;
    console.log("UI postData", res);

    isCreateMode ? await postData(res) : await updateData(res);

    router.refresh();
    // close dialog
    if (setDialogOpen != null) {
      setDialogOpen(false);
    }
  }

  function AssetTypeOptionChip({ assetType }: { assetType: AssetType }) {
    const assetInfo = getAssetEntityInfo(assetType);
    return (
      <div className={"flex flex-row justify-between items-center space-x-2"}>
        <div
          className={cn(
            "w-2.5 h-2.5 rounded-full pr-2",
            colorVariants[assetInfo.color].leadingColor
          )}
        ></div>
        <p>{assetInfo.label}</p>
      </div>
    );
  }

  function AssetFormFields() {
    return (
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>資產類型</FormLabel>
            <FormControl>
              <Select
                defaultValue={field.value}
                onValueChange={(value) => {
                  setAssetType(value as AssetType);
                  //   field.onChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AssetType)
                    .filter((type) => {
                      return type != AssetType.None;
                    })
                    .map((type, index) => {
                      return (
                        <SelectItem value={type} key={type + index}>
                          <AssetTypeOptionChip assetType={type} />
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>請選擇資產類型</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function AssetParentField() {
    return assetData.parentType !== AssetType.None ? (
      <FormField
        control={form.control}
        name="parent"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="flex flex-row justify-between">
              設定上層資產
              <AssetTypeOptionChip assetType={assetData.parentType} />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="parent"
                name="parent"
                type="text"
                title={"設定上層資產名稱"}
                onChange={(e) => {
                  console.log("parent", e.target.value);
                  field.onChange(e);
                }}
              />
            </FormControl>
            <FormDescription>設定上層資產名稱</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    ) : null;
  }

  function AssetNameField() {
    return (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>資產名稱</FormLabel>
            <FormControl>
              <Input title={"資產名稱"} {...field} />
            </FormControl>
            <FormDescription>請輸入資產名稱</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function AssetDescriptionField() {
    return (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>資產簡介</FormLabel>
            <FormControl>
              <Input title={"資產簡介"} {...field} />
            </FormControl>
            <FormDescription>簡單介紹資產相關訊息</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function AssetLocationFields() {
    return (
      <div className="w-full grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>位置-精度</FormLabel>
              <FormControl>
                <Input placeholder={"latitude"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lon"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>位置-緯度</FormLabel>
              <FormControl>
                <Input placeholder={"longitude"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  function AssetLocationCityFields() {
    return (
      <div className="w-full grid grid-cols-3 gap-2">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>所在國家</FormLabel>
              <FormControl>
                <Input placeholder={"country"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>城市</FormLabel>
              <FormControl>
                <Input placeholder={"資產所在城市"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>zip code</FormLabel>
              <FormControl>
                <Input placeholder={"zip code"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  function AssetLocationAddressFields() {
    return (
      <div className="w-full grid grid-rows-2-2 gap-2">
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>addressLine1</FormLabel>
              <FormControl>
                <Input placeholder={"addressLine1"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>addressLine2</FormLabel>
              <FormControl>
                <Input placeholder={"addressLine2"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  function AssetChildrenFields() {
    return (
      <FormField
        disabled={assetData.childrenType === AssetType.None}
        control={form.control}
        name="children"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="flex flex-row justify-between">
              設定子資產列表
              {assetData.childrenType !== AssetType.None ? (
                <AssetTypeOptionChip assetType={assetData.childrenType} />
              ) : null}
            </FormLabel>
            {childArray!.map((childName, index) => {
              return (
                <div
                  key={index}
                  className={
                    "w-full flex flex-row justify-between items-center border rounded-md px-2 py-1"
                  }
                >
                  {childName}
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() =>
                      setChildArray(childArray.filter((_, i) => i !== index))
                    }
                  >
                    <LuX />
                  </Button>
                </div>
              );
            })}
            <div className="w-full flex flex-row space-x-1">
              <Input
                disabled={assetData.childrenType === AssetType.None}
                className="w-full"
                placeholder={"新增子資產列表"}
                value={tempChildrenName}
                onChange={(e) => setTempChildrenName(e.target.value)}
              />
              <Button
                disabled={tempChildrenName.length == 0}
                type="button"
                variant={"outline"}
                onClick={() => {
                  setChildArray([...childArray, tempChildrenName]);
                  setTempChildrenName("");
                }}
              >
                <LuPlus /> ADD
              </Button>
            </div>
            <FormDescription>
              {assetData.childrenType === AssetType.None
                ? "此資產無法新增子資產"
                : "請輸入子資產名稱並按下ADD按鈕以添加子資產"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PipeLineCard initStep={0}>
          <PipeLineStepContent title={`資產基本資料`} description={""}>
            {AssetFormFields()}
            {AssetParentField()}
            {AssetNameField()}
            {AssetDescriptionField()}
          </PipeLineStepContent>
          <PipeLineStepContent title={"組織位置資料"} description={""}>
            {AssetLocationFields()}
            {AssetLocationCityFields()}
            {AssetLocationAddressFields()}
          </PipeLineStepContent>
          <PipeLineStepContent title={"添加子資產"} description={""}>
            {AssetChildrenFields()}
          </PipeLineStepContent>
        </PipeLineCard>
      </form>
    </Form>
  );
}
