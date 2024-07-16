import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LuExternalLink } from "react-icons/lu";
import { cn } from "@/lib/utils";

import {
  OrganizationAssetLocData,
  AssetLocationData,
  WithChildren,
  WithParent,
} from "@/domain/entities/Asset";
import React from "react";
import { getAssetEntityInfo } from "@/domain/entities/AssetType";
export function DataCard<AssetType extends AssetLocationData>({
  data,
  ...props
}: {
  data: AssetType;
}) {
  const ChildrenList = () => {
    // check if the data has children
    const children = data as unknown as WithChildren;
    if (children.children.length > 0) {
      return (
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>
            {getAssetEntityInfo(children.childrenType).label}列表
          </p>
          <div className="flex flex-wrap space-x-2">
            {children.children.map((site) => (
              <Button variant={"outline"} key={site}>
                <p className={"text-md p-1"}>{site}</p>
                <LuExternalLink />
              </Button>
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
    const parent = data as unknown as WithParent;
    if (parent.parent) {
      return (
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>
            {getAssetEntityInfo(parent.parentType).label} 列表
          </p>
          <div className="flex flex-wrap space-x-2">
            <Button variant={"outline"}>
              <p className={"text-md p-1"}>
                {(data as unknown as WithParent).parent}
              </p>
              <LuExternalLink />
            </Button>
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
          <h1 className={"text-lg font-semibold"}>{data.name}</h1>
          <p className={"text-md text-gray-500"}>{data.description}</p>
        </div>
        <div>
          <div className="label flex flex-rol justify-center items-center space-x-2 bg-blue-500 px-2 py-0.5 rounded-lg">
            <p className={"text-md font-semibold text-white"}>組織</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <HeaderField />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <ParentField />
        <LocDataFields />
        <ChildrenList />
      </CardContent>
    </Card>
  );
}

export function OrgDataCard({
  orgData,
}: {
  orgData: OrganizationAssetLocData;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex flex-col space-y-0 justify-start items-start">
          <h1 className={"text-lg font-semibold"}>{orgData.name}</h1>
          <p className={"text-md text-gray-500"}>{orgData.description}</p>
        </div>
        <div>
          <div className="label flex flex-rol justify-center items-center space-x-2 bg-blue-500 px-2 py-0.5 rounded-lg">
            <p className={"text-md font-semibold text-white"}>組織</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>Organization Location</p>
          <div className="grid grid-cols-3 gap-2">
            <InfoBlock label="latitude" value={orgData.lat?.toString()} />
            <InfoBlock label="longitude" value={orgData.lon?.toString()} />
            <InfoBlock label="city" value={orgData.city ?? undefined} />
            <InfoBlock label="country" value={orgData.country ?? undefined} />
            <InfoBlock label="zip" value={orgData.zip ?? undefined} />
            <InfoBlock
              className="col-span-3"
              label="address line1"
              value={orgData.addressLine1 ?? undefined}
            />
            <InfoBlock
              label="address line2"
              className="col-span-3"
              value={orgData.addressLine2 ?? undefined}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p className={"text-md font-semibold"}>廠區列表</p>
          <div className="flex flex-wrap space-x-2">
            {orgData.children.map((site) => (
              <Button variant={"outline"} key={site}>
                <p className={"text-md p-1"}>{site}</p>
                <LuExternalLink />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
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
