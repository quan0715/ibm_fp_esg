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
import {
  DashboardCard,
  DashboardCardContent,
  DashboardCardHeader,
} from "@/app/dashboard/_components/DashboardCard";
import Link from "next/link";
import { DataNotFound } from "@/app/dashboard/location_and_asset/location/_blocks/DataNotFound";
import { CreateDataDialog } from "@/app/dashboard/location_and_asset/location/_blocks/CreateDataDialog";

type AssetTypeColor = "blue" | "green" | "yellow" | "purple" | "gray";

type AssetEntityInfo = {
  color: AssetTypeColor; //hex color code
  label: string; //the label to be displayed
};
function getAssetEntityInfo(type: AssetType): AssetEntityInfo {
  switch (type) {
    case AssetType.Organization:
      return { color: "green", label: "組織" };
    case AssetType.Site:
      return { color: "blue", label: "廠區" };
    case AssetType.Phase:
      return { color: "yellow", label: "Phase" };
    case AssetType.Department:
      return { color: "purple", label: "部門" };
    default:
      return { color: "gray", label: "Unknown" };
  }
}
const colorVariants = {
  blue: {
    bgColor: "bg-blue-50",
    leadingColor: "bg-blue-500",
    textColor: "text-blue-500",
  },
  green: {
    bgColor: "bg-green-50",
    leadingColor: "bg-green-500",
    textColor: "text-green-500",
  },
  yellow: {
    bgColor: "bg-yellow-50",
    leadingColor: "bg-yellow-500",
    textColor: "text-yellow-500",
  },
  purple: {
    bgColor: "bg-purple-50",
    leadingColor: "bg-purple-500",
    textColor: "text-purple-500",
  },
  gray: {
    bgColor: "bg-gray-50",
    leadingColor: "bg-gray-500",
    textColor: "text-gray-500",
  },
};
function DashboardColumnLabel({
  title,
  color,
  length,
}: {
  title: string;
  color: AssetTypeColor;
  length: number;
}) {
  return (
    <>
      <div
        className={cn(
          "flex flex-rol justify-center items-center space-x-2 px-2 py-0.5 rounded-lg",
          colorVariants[color].bgColor
        )}
      >
        <div
          className={cn(
            "w-[8px] h-[8px] rounded-full",
            colorVariants[color].leadingColor
          )}
        ></div>
        <p className={"text-md font-semibold"}>{title}</p>
      </div>
      <p className={cn("pl-4 text-md", colorVariants[color].textColor)}>
        {length}
      </p>
    </>
  );
}

export function DashboardColumn({
  assetType,
  assetDataList,
}: {
  assetType: AssetType;
  assetDataList: AssetLocationEntity[];
}) {
  const tailwindColorClass = getAssetEntityInfo(assetType).color;

  return (
    <DashboardCard>
      <DashboardCardHeader
        title={getAssetEntityInfo(assetType).label}
        titleComponent={(title: string) => (
          <DashboardColumnLabel
            title={title}
            color={tailwindColorClass}
            length={assetDataList.length}
          />
        )}
      ></DashboardCardHeader>
      <DashboardCardContent>
        {/* <CreateDataDialog /> */}
        <div className={"w-full h-fit grid grid-cols-1 gap-4"}>
          {assetDataList.map((data) => {
            return <DataCard data={data} key={data.name} />;
          })}
        </div>
      </DashboardCardContent>
    </DashboardCard>
  );
}

export function DataCard({ data, ...props }: { data: AssetLocationEntity }) {
  const ChildrenList = () => {
    // check if the data has children
    // const children = data.children;
    if (
      data.children != null &&
      data.childrenType != null &&
      data.childrenType != AssetType.None &&
      data.children.length > 0
    ) {
      return (
        <div className="flex flex-col space-y-2">
          <p className={"text-sm font-semibold"}>
            {getAssetEntityInfo(data.childrenType).label}列表
          </p>
          <div className="flex flex-wrap">
            {data.children.map((childName) => (
              <ListChipLink
                label={childName}
                assetType={data.childrenType!}
                key={childName}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const ParentField = () => {
    // check if the data has children
    // const parent = data as unknown as WithParent;
    if (
      data.parent != null &&
      data.parentType != null &&
      data.parentType != AssetType.None &&
      data.parent.length > 0
    ) {
      return (
        <div className="flex flex-col space-y-2">
          {/* <p className={"text-sm font-semibold"}>
            上層{getAssetEntityInfo(data.parentType).label}
          </p> */}
          <div className="flex flex-wrap space-x-2">
            <ListChipLink
              label={data.parent}
              assetType={data.parentType!}
              ListType="parent"
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const LocDataFields = () => {
    return (
      <>
        <p className={"text-md font-semibold"}>Organization Location</p>
        <div className="grid grid-cols-3 gap-2">
          <InfoBlock label="latitude" value={data.lat?.toString()} />
          <InfoBlock label="longitude" value={data.lon?.toString()} />
          <InfoBlock label="city" value={data.city ?? undefined} />
          <InfoBlock label="country" value={data.country ?? undefined} />
          <InfoBlock label="zip" value={data.zip ?? undefined} />
          <InfoBlock
            className="col-span-3"
            label="address line1"
            value={data.addressLine1 ?? undefined}
          />
          <InfoBlock
            label="address line2"
            className="col-span-3"
            value={data.addressLine2 ?? undefined}
          />
        </div>
      </>
    );
  };

  const HeaderField = () => {
    return (
      <>
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
          <p className={"text-sm text-gray-500"}>{data.description}</p>
        </div>
        <div></div>
      </>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row justify-between items-start">
        <HeaderField />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {/* <ParentField /> */}
        {/* <LocDataFields /> */}
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
      href={"/"}
      className={cn(
        "flex flex-row justify-center items-center m-1 ml-0 space-x-0 w-fit"
        // "rounded-md px-1 py-0.5"
        // colorVariants[getAssetEntityInfo(assetType).color].bgColor
      )}
    >
      <p
        className={cn(
          "text-sm font-semibold"
          // colorVariants[getAssetEntityInfo(assetType).color].textColor
        )}
      >
        {ListType === "children" ? "#" : "@"}
      </p>
      <p className={"text-sm p-1 hover:underline"}>{label}</p>
      {/* <LuExternalLink
      // className={colorVariants[getAssetEntityInfo(assetType).color].textColor}
      /> */}
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
