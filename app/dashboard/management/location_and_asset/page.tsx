"use client";

import { Suspense, use, useEffect } from "react";
import {
  DocumentGroupType,
  getDocumentGroupTypeFromString,
} from "@/domain/entities/Document";
import { DatabasePage } from "./_blocks/DocumentPage";
import { useDataQueryRoute } from "./_hooks/useQueryRoute";
import { getAssetSibling } from "./_actions/DocumentAction";
import {
  DocumentLayer,
  getGroupDefaultType,
} from "@/domain/entities/DocumentConfig";
import {
  DocumentMenuListMobile,
  DocumentTreeMenu,
} from "./_blocks/DocumentNavigationMenu";
import { DocumentTreeProvider } from "./_hooks/useDocumentContext";
import { DesktopOnly, MobileOnly } from "@/components/layouts/layoutWidget";
import { Separator } from "@/components/ui/separator";
import { documentConfig } from "@/domain/entities/DocumentConfig";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function TabListWidget() {
  const defaultViews = documentConfig[0].views[0].group;
  const queryPath = useDataQueryRoute();
  const subPage = queryPath.page || defaultViews;
  const handleTabChange = (value: string) => {
    if (value === subPage) return;
    console.log("change page", value);
    queryPath.setAssetId("", value);
  };

  function isSelectedDirectory(config: DocumentLayer) {
    return config.views.some((view) => view.group === subPage);
  }
  function getTriggerLabel(config: DocumentLayer) {
    let isSelectedDir = config.views.some((view) => view.group === subPage);
    if (!isSelectedDir) {
      return config.dirName;
    }
    return config.views.find((view) => view.group === subPage)?.viewName;
  }

  return (
    <div className="bg-background h-fit overflow-x-auto px-4">
      <div className="flex flex-row justify-start items-center">
        {documentConfig.map((config) => {
          return (
            <DropdownMenu key={config.dirName}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    !isSelectedDirectory(config) ? "text-gray-500" : "",
                    "flex flex-row justify-center items-center space-x-1"
                  )}
                >
                  {getTriggerLabel(config)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{config.dirName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={subPage}
                  onValueChange={handleTabChange}
                >
                  {config.views.map((view) => {
                    return (
                      <DropdownMenuRadioItem
                        value={view.group}
                        key={view.group}
                      >
                        {view.viewName}
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </div>
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
      <TabListWidget />
      <Separator />
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
        <div className="w-full max-h-max flex flex-row grid-cols-12">
          <div className="flex-initial w-96">
            <DocumentTreeMenu path={""} />
          </div>
          <Separator className="max-h-max h-full" orientation="vertical" />
          <div className="w-full shadow-lg p-2">
            <DatabasePage
              key={dbType + queryRoute.dataId}
              selectedDocumentId={queryRoute.dataId}
            />
          </div>
        </div>
      </DesktopOnly>
      <MobileOnly>
        <div className="w-full flex flex-col">
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
