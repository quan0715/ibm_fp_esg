"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingWidget } from "@/components/blocks/LoadingWidget";

export default function Page() {
  return (
    <div className="w-full h-fit flex flex-col justify-start items-start space-y-2">
      <div className="w-full min-h-screen grid grid-cols-4 gap-4">
        <div className="col-span-1 hidden md:block">
          <Skeleton className="h-full w-full flex bg-white flex-col justify-center items-center space-y-2">
            <LoadingWidget />
          </Skeleton>
        </div>
        <div className="col-span-4 md:col-span-3">
          <Skeleton className="bg-white h-full w-full flex flex-col justify-center items-center space-y-2">
            <LoadingWidget />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
