import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LuExternalLink } from "react-icons/lu";
import { cn } from "@/lib/utils";

import { AssetLocationEntity } from "@/domain/entities/Asset";
import React from "react";
import { AssetType } from "@/domain/entities/AssetType";
import Link from "next/link";
import {
  getAssetEntityInfo,
  colorVariants,
} from "@/app/dashboard/location_and_asset/location/_utils/assetTypeUIConfig";

export function DataCard({ data, ...props }: { data: AssetLocationEntity }) {
  const ChildrenList = () => {
    const isWithChildren =
      data.children != null &&
      data.childrenType != null &&
      data.childrenType != AssetType.None &&
      data.children.length > 0;
    return isWithChildren ? (
      <div className="flex flex-col space-y-2 justify-start items-start">
        <p className={"text-sm font-semibold"}>
          {getAssetEntityInfo(data.childrenType!).label}列表
        </p>
        <div className="flex flex-wrap">
          {data.children!.map((childName) => (
            <ListChipLink
              label={childName}
              assetType={data.childrenType!}
              key={childName}
            />
          ))}
        </div>
      </div>
    ) : null;
  };

  const ParentField = () => {
    // check if the data has children
    // const parent = data as unknown as WithParent;
    const isWithParent =
      data.parent != null &&
      data.parentType != null &&
      data.parentType != AssetType.None &&
      data.parent.length > 0;
    return isWithParent ? (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap space-x-2">
          <ListChipLink
            label={data.parent!}
            assetType={data.parentType!}
            ListType="parent"
          />
        </div>
      </div>
    ) : null;
  };

  const HeaderField = () => {
    return (
      <div className="flex flex-col space-y-0 justify-start items-start">
        <ParentField />
        <h1
          className={cn(
            "text-lg font-semibold",
            colorVariants[getAssetEntityInfo(data.type).color].textColor
          )}
        >
          {data.name}
        </h1>
        <p className={"text-sm text-gray-500 text-start"}>{data.description}</p>
      </div>
    );
  };

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
  className,
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-start items-start p-2 border-l-4 rounded-[4px] border-blue-500 bg-blue-500/5",
        className
      )}
    >
      <p className="text-md font-semibold">{label}</p>
      <p className="text-md">{value ?? "None"}</p>
    </div>
  );
}
