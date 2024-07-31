"use client";
import { Button } from "@/components/ui/button";
import { LuPlus, LuX } from "react-icons/lu";

import React, { Dispatch, SetStateAction, useState } from "react";
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
import { postData, updateData } from "../_actions/PostDataAction";

import { DashboardColumnLabel } from "./DataColumn";
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";
import { InfoBlock } from "./DataCard";
import { Separator } from "@/components/ui/separator";
import { useAssetQueryRoute } from "../_hooks/useQueryRoute";
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

  const [assetData, setAssetData] = useState<AssetData>(
    data ? AssetData.fromEntity(data) : AssetData.createNew(defaultAssetType)
  );

  const queryRoute = useAssetQueryRoute();

  const form = useForm<AssetLocationEntity>({
    defaultValues: data,
  });

  async function onSubmit(values: AssetLocationEntity) {
    const res = {
      ...values,
    } as AssetLocationEntity;
    console.log("UI postData", values);
    if (queryRoute.mode === "create") {
      const newAssetDataId = await postData(res);
      queryRoute.setAssetId(newAssetDataId);
    } else if (queryRoute.mode === "edit") {
      await updateData(res);
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
              <DashboardColumnLabel
                title={getAssetEntityInfo(data?.type!).label}
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
              {/* <FormDescription>請輸入資產名稱</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              {/* <FormLabel>資產簡介</FormLabel> */}
              <FormControl>
                <Input
                  className={cn("text-md font-semibold", "border-0", "p-0")}
                  title={"資產簡介"}
                  placeholder="輸入資產簡介"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>簡單介紹資產相關訊息</FormDescription> */}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
                assetType={defaultAssetType}
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
          <DashboardCardHeader title="">
            {AssetHeaderField()}
          </DashboardCardHeader>
          <DashboardCardContent className="flex flex-col space-y-2">
            {AssetLocationFields()}
            <Separator />

            {AssetLocationCityFields()}
            <Separator />

            {AssetLocationAddressFields()}
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
                className={cn(
                  colorVariant.bgColor,
                  colorVariant.textColor
                  // "hover:bg-background/50"
                )}
                size="lg"
              >
                {queryRoute.mode === "edit" ? "更新" : "新增"}
              </Button>
            </div>
          </DashboardCardContent>
        </DashboardCard>
      </form>
    </Form>
  );
}

// <PipeLineCard initStep={0}>
//   <PipeLineStepContent
//     title={`資產基本資料`}
//     description={""}
//   ></PipeLineStepContent>
//   <PipeLineStepContent
//     title={"組織位置資料"}
//     description={""}
//   ></PipeLineStepContent>
//   <PipeLineStepContent title={"添加子資產"} description={""}>
//     {/* {AssetChildrenFields()} */}
//   </PipeLineStepContent>
// </PipeLineCard>;

// function AssetFormFields() {
//   return (
//     <FormField
//       control={form.control}
//       name="type"
//       render={({ field }) => (
//         <FormItem className="w-full">
//           <FormLabel>資產類型</FormLabel>
//           <FormControl>
//             <Select
//               defaultValue={field.value}
//               onValueChange={(value) => {
//                 setAssetType(value as AssetType);
//                 //   field.onChange(value);
//               }}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {Object.values(AssetType)
//                   .filter((type) => {
//                     return type != AssetType.None;
//                   })
//                   .map((type, index) => {
//                     return (
//                       <SelectItem value={type} key={type + index}>
//                         <AssetTypeOptionChip assetType={type} />
//                       </SelectItem>
//                     );
//                   })}
//               </SelectContent>
//             </Select>
//           </FormControl>
//           <FormDescription>請選擇資產類型</FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }
