"use client";

import { Suspense, use, useEffect } from "react";
import {
  DocumentGroupType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { DatabasePage, DocumentContext } from "./_blocks/DocumentPage";
import { useDataQueryRoute } from "./_hooks/useQueryRoute";
import { getAssetSibling } from "./_actions/DocumentAction";
import { getGroupDefaultType } from "@/domain/entities/DocumentConfig";
import {
  DocumentMenuListMobile,
  DocumentNavigateMenuDialog,
  DocumentTreeMenu,
} from "./_blocks/DocumentNavigationMenu";
import {
  DocumentTreeProvider,
  useDocumentTree,
} from "./_hooks/useDocumentContext";
import { DesktopOnly, MobileOnly } from "@/components/layouts/layoutWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { DashboardPageHeader } from "@/app/dashboard/_components/DashboardPageHeader";
import { useSearchParams, useRouter } from "next/navigation";
import { useRootData } from "./_hooks/useDocument";

type TabsString = "Location" | "Asset" | "Meter" | "GHG" | "MeterReading";

interface TabConfig {
  index: string;
  title: string;
  // content: ReactNode;
}

const tabConfig: Record<TabsString, TabConfig> = {
  Location: {
    index: "Location",
    title: "位置主檔",
    // content: location,
  },
  Asset: {
    index: "Asset",
    title: "資產主檔",
    // content: asset,
  },
  Meter: {
    index: "Meter",
    title: "Meter 主檔",
  },
  GHG: {
    index: "GHG",
    title: "GHG 主檔",
  },
  MeterReading: {
    index: "MeterReading",
    title: "Meter Reading 主檔",
  },
};

function TabListWidget({
  tabConfig,
  children,
}: {
  children?: React.ReactNode;
  tabConfig: Record<TabsString, TabConfig>;
}) {
  const defaultPage = tabConfig["Location"];
  const searchParams = useSearchParams();
  const queryPath = useDataQueryRoute();
  const subPage = searchParams.get("page") || defaultPage.index;
  const router = useRouter();
  const rootData = useRootData(getDocumentGroupTypeFromString(queryPath.page));

  const handleTabChange = (value: string) => {
    if (value === subPage) return;
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("page", value);
    newSearchParams.set("data", "");
    newSearchParams.set("mode", "display");
    console.log("change page", value);
    // router.prefetch("?" + newSearchParams.toString());
    router.push("?" + newSearchParams.toString());
  };

  return (
    <Tabs
      value={subPage}
      defaultValue={subPage}
      // className="w-full h-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="flex w-full p-2 justify-start items-center bg-background h-fit overflow-x-auto">
        {Object.keys(tabConfig).map((key) => {
          const tab = tabConfig[key as TabsString];
          return (
            <TabsTrigger key={tab.index + "trigger"} value={tab.index}>
              {tab.title}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <Separator />
    </Tabs>
  );
}

export default function Page() {
  const queryRoute = useDataQueryRoute();
  const dbType = getDocumentGroupTypeFromString(queryRoute.page);

  useEffect(() => {
    if (queryRoute.page.length === 0) {
      queryRoute.setAssetId("", "Location");
      return;
    }
  }, [queryRoute.page]);

  useEffect(() => {
    async function handleEmptyData() {
      let data = await getAssetSibling("", dbType);
      if (data.length > 0) {
        queryRoute.setAssetId(data[0].id!, queryRoute.page);
      } else {
        const rootType = getGroupDefaultType(dbType);
        queryRoute.createNewAsset(rootType, "");
      }
    }
    console.log("page", queryRoute.dataId, queryRoute.mode);
    if (queryRoute.dataId === "" && queryRoute.mode === "display") {
      handleEmptyData();
    }
  }, [queryRoute.dataId, queryRoute.mode]);

  return (
    <>
      <TabListWidget tabConfig={tabConfig} />
      <DocumentTreePage />
    </>
  );
}

function DocumentTreePage() {
  const queryRoute = useDataQueryRoute();
  const dbType = getDocumentGroupTypeFromString(queryRoute.page);
  const isBlocking = queryRoute.mode === "display" && queryRoute.dataId === "";

  return (
    <DocumentTreeProvider type={dbType}>
      <DesktopOnly>
        <div className="hidden md:grid w-full max-h-max grid-cols-12 gap-2 p-1">
          <div className="col-span-3">
            <DocumentTreeMenu path={""} />
          </div>
          <div className="col-span-9">
            <DatabasePage
              key={dbType + queryRoute.dataId}
              selectedDocumentId={queryRoute.dataId}
            />
          </div>
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className="w-full flex flex-col space-y-1 ">
          <DocumentMenuListMobile />
          <Separator />
          <div className="col-span-9">
            <DatabasePage
              key={dbType + queryRoute.dataId}
              selectedDocumentId={queryRoute.dataId}
            />
          </div>
        </div>
      </MobileOnly>
    </DocumentTreeProvider>
  );
}
