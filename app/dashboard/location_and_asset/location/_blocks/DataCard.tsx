"use client";
import React, { useEffect, useState } from "react";
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
import { QueryPathService } from "@/domain/Services/QueryParamsService";
import { getDashboardAssetData } from "../_actions/PostDataAction";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { set } from "date-fns";
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
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [ancestors, setAncestors] = useState<AssetLocationEntity[]>([]);
  // const [children, setChildren] = useState<AssetLocationEntity[]>([]);
  const queryPathService = new QueryPathService(searchParams);
  const [isLoading, setIsLoading] = useState(false);

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
            <div className="p-4 col-span-1 rounded-lg border">
              <Link
                href={queryPathService.getPath(
                  pathName,
                  queryPathService.createQueryString(child.id!)
                )}
                className="flex flex-row justify-between items-center space-x-2"
                // asChild
              >
                <p>{child.name}</p>
                <LuExternalLink />
              </Link>
            </div>
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
      </div>
    );
  };
  // create loading spinner

  return isLoading ? (
    <DashboardCard className="shadow-sm w-full  min-h-screen ">
      <div>isLoading</div>
    </DashboardCard>
  ) : (
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
