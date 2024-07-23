import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LuExternalLink, LuFileEdit, LuTrash } from "react-icons/lu";
import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Asset";
import React from "react";
import { AssetType } from "@/domain/entities/AssetType";
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

export function AssetLocDataCard({
  data,
  variant = "default",
  ...props
}: {
  data: AssetLocationEntity;
  variant?: "default" | "preview" | "expand";
}) {
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
    // const isWithChildren =
    //   data.children != null &&
    //   data.childrenType != null &&
    //   data.childrenType != AssetType.None &&
    //   data.children.length > 0;

    const isVisible = variant === "expand" || variant === "default";

    return isVisible ? (
      <div className="flex flex-col space-y-2 justify-start items-start">
        {/* <p className={"text-sm font-semibold"}>
          {getAssetEntityInfo(data.childrenType!).label}列表
        </p>
        <div className="flex flex-wrap">
          {data.children!.map((childName) => (
            <ListChipLink
              label={childName}
              assetType={data.childrenType!}
              key={childName}
            />
            // <div className="w-full">
            //   <InfoBlock
            //     assetType={data.type}
            //     label={childName}
            //     value={childName}
            //     className="w-full"
            //   />
            //   <Separator />
            // </div>
          ))}
        </div> */}
        {/* <InfoBlock
          assetType={data.type!}
          label={`${getAssetEntityInfo(data.childrenType!).label}列表`}
          // value={data.children!.join(", ")}
          className="w-full"
        >
          <div className="flex flex-col space-y-2 w-full">
            {data.children!.map((childName) => (
              // <ListChipLink
              //   label={childName}
              //   assetType={data.childrenType!}
              //   key={childName}
              // />
              // <AssetLocDataCard
              //   data={{
              //     ...getNewAssetData(data.childrenType!),
              //     name: childName,
              //   }}
              //   variant={"preview"}
              //   key={data.name}
              // />
              <div className="flex flex-col justify-start items-start space-y-2">
                <p className="font-semibold text-md py-2">{childName}</p>
                <Separator />
              </div>
            ))}
          </div>
        </InfoBlock> */}
      </div>
    ) : null;
  };

  // const ParentField = () => {
  //   // check if the data has children
  //   // const parent = data as unknown as WithParent;
  //   const isWithParent =
  //     data.parent != null &&
  //     data.parentType != null &&
  //     data.parentType != AssetType.None &&
  //     data.parent.length > 0;

  //   const isVisible = variant === "expand" || variant === "default";
  //   return isWithParent && isVisible ? (
  //     <div className="flex flex-col space-y-2">
  //       <div className="flex flex-wrap space-x-2">
  //         <ListChipLink
  //           label={data.parent!}
  //           assetType={data.parentType!}
  //           ListType="parent"
  //         />
  //       </div>
  //     </div>
  //   ) : null;
  // };

  const HeaderField = () => {
    return (
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex-grow flex flex-col space-y-0 justify-start items-start">
          {/* {variant === "expand" || variant === "default" ? (
            <ParentField />
          ) : null} */}
          <h1
            className={cn(
              "text-lg font-semibold",
              colorVariants[getAssetEntityInfo(data.type).color].textColor
            )}
          >
            {data.name}
          </h1>
          <p className={"text-sm text-gray-500 text-start"}>
            {data.description}
          </p>
        </div>
        {variant === "expand" ? (
          <div className="flex-shrink flex flex-row space-x-2">
            <Button
              size={"icon"}
              variant="outline"
              className="flex flex-row justify-center items-center space-x-2"
            >
              <LuFileEdit />
            </Button>
            <Button
              size={"icon"}
              variant="outline"
              className="flex flex-row justify-center items-center space-x-2 text-destructive hover:bg-destructive hover:text-white"
            >
              <LuTrash />
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  switch (variant) {
    case "default":
      return (
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row justify-between items-start">
            <HeaderField />
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <ChildrenList />
          </CardContent>
        </Card>
      );
    case "preview":
      return (
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row justify-between items-start">
            <HeaderField />
          </CardHeader>
        </Card>
      );
    case "expand":
      return (
        <DashboardCard className="shadow-sm w-full  min-h-screen ">
          <DashboardCardHeader title="">
            <HeaderField />
          </DashboardCardHeader>
          <DashboardCardContent className="flex flex-col space-y-2">
            <LocationDataFields />
            <ChildrenList />
          </DashboardCardContent>
        </DashboardCard>
      );
  }
}

function ListChipLink({
  href = "/",
  label,
  assetType = AssetType.None,
  ListType = "children",
}: {
  href?: string;
  label: string;
  assetType: AssetType;
  ListType?: "children" | "parent";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row justify-center items-center m-1 ml-0 space-x-0 w-fit"
      )}
    >
      <p className={cn("text-sm font-semibold")}>
        {ListType === "children" ? "#" : "@"}
      </p>
      <p className={"text-sm p-1 hover:underline"}>{label}</p>
    </Link>
  );
}

function InfoBlock({
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
      <p className={cn(colorVariant.textColor, "text-md font-light")}>
        {label}
      </p>
      {children ?? <p className="text-md font-semibold">{value ?? "None"}</p>}
    </div>
  );
}
