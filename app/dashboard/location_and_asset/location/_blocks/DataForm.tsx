"use client";
import { Button } from "@/components/ui/button";
import { LuLoader2, LuPlus, LuX } from "react-icons/lu";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { AssetType, getAssetType } from "@/domain/entities/AssetType";
import { getAssetEntityInfo, colorVariants } from "../_utils/assetTypeUIConfig";
import { useForm } from "react-hook-form";
import { AssetLocationEntity, AssetData } from "@/domain/entities/Asset";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createNewData, updateData } from "../_actions/PostDataAction";

import { DashboardLabelChip } from "./DataColumn";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeaderTest,
} from "@/app/dashboard/_components/DashboardCard";
import { InfoBlock } from "./DataCard";
import { Separator } from "@/components/ui/separator";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
import {
  searchPathCache,
  useDataCreate,
  useDataUpdate,
} from "../_hooks/useAssetLocationData";
export function AssetLocationDataForm({
  data,
}: {
  data?: AssetLocationEntity;
}) {
  // if data is provided, use it as default data
  // display existing data in the form
  // otherwise, create a new data
  const assetData = data!;
  const queryRoute = useAssetQueryRoute();
  const { isUpdating, onUpdate } = useDataUpdate();
  const { isCreating, onCreate } = useDataCreate();
  const form = useForm<AssetLocationEntity>({
    defaultValues: assetData,
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        ...data,
      });
    }
  }, [form.formState, data, form]);

  async function onSubmit(values: AssetLocationEntity) {
    const res = {
      ...values,
      type: assetData.type,
      ancestors: assetData.ancestors,
    } as AssetLocationEntity;
    if (queryRoute.mode === "create") {
      const newIndex = await onCreate(res);
      queryRoute.setAssetId(newIndex);
    } else if (queryRoute.mode === "edit") {
      await onUpdate(res);
      queryRoute.setAssetId(res.id!);
    }
  }

  function onCancel() {
    queryRoute.moveBack();
  }

  const colorVariant = colorVariants[getAssetEntityInfo(assetData.type).color];

  function AssetHeaderField() {
    return (
      <div className="w-full grid gap-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={cn("w-full")}>
              {/* <FormLabel>資產名稱</FormLabel> */}
              <DashboardLabelChip
                title={getAssetEntityInfo(assetData.type).label}
                color={getAssetEntityInfo(assetData.type).color}
              />
              <FormControl>
                <Input
                  className={cn(
                    "text-lg font-semibold",
                    colorVariant.textColor,
                    "p-0 m-0 border-0 ring-0"
                  )}
                  title={`${getAssetEntityInfo(assetData.type).label}`}
                  placeholder={`輸入 ${getAssetEntityInfo(assetData.type).label} 名稱`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className={cn("text-md font-semibold", "border-0", "p-0")}
                  title={"資產簡介"}
                  placeholder="輸入資產簡介"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  function AssetLocationFields() {
    return (
      <div className="w-full flex flex-row justify-between items-center space-x-2">
        <FormField
          control={form.control}
          name="lat"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"經緯度-緯度"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"輸入資產位置緯度"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator orientation="vertical" className="h-16" />
        <FormField
          control={form.control}
          name="lon"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"經緯度-經度"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"輸入資產位置經度"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  function AssetLocationCityFields() {
    return (
      <div className="w-full flex flex-row justify-between items-center space-x-2">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"所在國家"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"所在國家"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator orientation="vertical" className="h-16" />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"所在城市"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"所在城市"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator orientation="vertical" className="h-16" />

        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"郵遞區域號"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"郵遞區域號"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
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
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"位置1"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"addressLine1"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem className="w-full">
              <InfoBlock
                labelColor={colorVariant.textColor}
                label={"位置2"}
                className="w-full"
              >
                <FormControl>
                  <Input
                    className={cn(
                      "text-md font-semibold",
                      "p-0 m-0 border-0 ring-0"
                    )}
                    placeholder={"addressLine2"}
                    {...field}
                  />
                </FormControl>
              </InfoBlock>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DashboardCard className="shadow-sm w-full  min-h-screen ">
          <DashboardCardHeaderTest title=""></DashboardCardHeaderTest>
          <DashboardCardContent className="flex flex-col space-y-2">
            {AssetHeaderField()}
            <Separator />
            {AssetLocationFields()}

            {AssetLocationCityFields()}
            <Separator />

            {AssetLocationAddressFields()}
            <Separator />
            <div className={"flex flex-row justify-end items-center space-x-2"}>
              <Button
                type="button"
                size="lg"
                variant={"outline"}
                onClick={onCancel}
              >
                {"取消"}
              </Button>
              <Button
                type="submit"
                variant={"outline"}
                className={cn(colorVariant.bgColor, colorVariant.textColor)}
                size="lg"
              >
                <>
                  {queryRoute.mode === "edit" ? "更新" : "新增"}
                  {isCreating || isUpdating ? (
                    <LuLoader2 className="animate-spin" />
                  ) : null}
                </>
              </Button>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </form>
    </Form>
  );
}
