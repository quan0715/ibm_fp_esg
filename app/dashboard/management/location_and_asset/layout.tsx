"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import React, { ReactNode, Suspense, use, useEffect } from "react";
import { DashboardPageHeader } from "@/app/dashboard/_components/DashboardPageHeader";
import {
  useSearchParams,
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
type tabsString = "Location" | "Asset";

export default function Layout({
  children,
  asset,
  location,
}: {
  children: React.ReactNode;
  asset: React.ReactNode;
  location: React.ReactNode;
}) {
  const tabConfig = {
    Location: {
      index: "Location",
      title: "位置主檔",
      content: location,
    },
    Asset: {
      index: "Asset",
      title: "資產主檔",
      content: asset,
    },
  } as Record<tabsString, { index: string; title: string; content: ReactNode }>;

  return (
    <Suspense>
      <TabListWidget tabConfig={tabConfig}>{children}</TabListWidget>
    </Suspense>
  );
}

export function TabListWidget({
  tabConfig,
  children,
}: {
  children?: React.ReactNode;
  tabConfig: Record<
    tabsString,
    { index: string; title: string; content: ReactNode }
  >;
}) {
  const defaultPage = tabConfig["Location"];

  const searchParams = useSearchParams();
  const subPage = searchParams.get("page");
  const router = useRouter();

  if (!subPage) {
    let newSearchParams = new URLSearchParams();
    newSearchParams.set("page", defaultPage.index);
    newSearchParams.set("data", "");
    newSearchParams.set("mode", "display");
    router.push("?" + newSearchParams.toString());
  }

  return (
    <div className="w-full h-fit flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader
        title={"位置階層基本資料"}
        subTitle={tabConfig[(subPage || defaultPage.index) as tabsString].title}
      />
      <Separator />
      <Tabs
        value={subPage || defaultPage.index}
        defaultValue={subPage || defaultPage.index}
        className="w-full h-full"
        onValueChange={(value) => {
          let newSearchParams = new URLSearchParams();
          if (value === subPage) return;
          newSearchParams.set("page", value);
          newSearchParams.set("data", "");
          newSearchParams.set("mode", "display");
          console.log("change page", value);
          router.prefetch("?" + newSearchParams.toString());
          router.push("?" + newSearchParams.toString());
        }}
      >
        <TabsList className="flex w-full py-4 px-6 justify-start items-center bg-background">
          {Object.keys(tabConfig).map((key) => {
            const tab = tabConfig[key as tabsString];
            return (
              <TabsTrigger key={tab.index + "trigger"} value={tab.index}>
                {tab.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <Separator />
        <div className="w-full h-full bg-secondary p-4">
          {/* {Object.keys(tabConfig).map((key) => {
            const tab = tabConfig[key as tabsString];
            return (
              <TabsContent key={tab.index + "content"} value={tab.index}>
                {tab.content}
              </TabsContent>
            );
          })} */}
          {children}
        </div>
      </Tabs>
    </div>
  );
}
