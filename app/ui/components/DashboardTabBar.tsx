'use client'
import { dashboardConfig } from "@/lib/dashboard.config";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react";
interface DashboardTabBarProps{
  pageName: string;  
  children?: React.ReactNode;
}

export function DashboardTabBar({pageName, children, ...props}: DashboardTabBarProps) {
  const path = usePathname();
  const pageConfig = dashboardConfig.pages[pageName];
  const defaultTab = [dashboardConfig.path, pageConfig.path, pageConfig.default].join('');
  return (
    <div className="flex flex-col w-full px-8 items-start justify-between bg-default">
        <Tabs defaultValue={defaultTab}>
            <TabsList>
                {
                    Object.keys(pageConfig.subPage).map((subPageName) => {
                        const subPageConfig = pageConfig.subPage[subPageName];
                        const tabHref = [dashboardConfig.path, pageConfig.path, subPageConfig.path].join('');
                        return (
                            <TabsTrigger  key={tabHref} value={tabHref}>
                                {subPageConfig.name}
                            </TabsTrigger>
                        );
                    })
                }
            </TabsList>
            {/*{*/}
            {/*    Object.keys(pageConfig.subPage).map((subPageName) => {*/}
            {/*        const subPageConfig = pageConfig.subPage[subPageName];*/}
            {/*        const tabHref = [dashboardConfig.path, pageConfig.path, subPageConfig.path].join('');*/}
            {/*        return (*/}
            {/*            <TabsContent key={tabHref} value={tabHref}>*/}
            {/*                {subPageConfig.name}*/}
            {/*            </TabsContent>*/}
            {/*        );*/}
            {/*    })*/}
            {/*}*/}
        </Tabs>

        {/*<Tabs */}
        {/*    {...props}*/}
        {/*    aria-label="Options" */}
        {/*    color="primary" */}
        {/*    selectedKey={path}*/}
        {/*    defaultValue="account" className="w-[400px]"*/}
        {/*    classNames={{*/}
        {/*        tabList: "gap-8 w-full rounded-none border-divider",*/}
        {/*        tab: "max-w-fit",*/}
        {/*        tabContent: "group-data-[selected=true]:text-primary text-lg p-4",*/}
        {/*    }}>*/}
        {/*    <TabsList>*/}
        {/*    {*/}
        {/*        Object.keys(pageConfig.subPage).map((subPageName) => {*/}
        {/*            const subPageConfig = pageConfig.subPage[subPageName];*/}
        {/*            // console.log("subPageConfig", subPageConfig);*/}
        {/*            const tabHref = [dashboardConfig.path, pageConfig.path, subPageConfig.path].join('');*/}
        {/*            return (*/}
        {/*               */}
        {/*               */}
        {/*                    <TabsTrigger value={tabHref}>{subPageConfig.name}</TabsTrigger>*/}
        {/*               */}
        {/*            );*/}
        {/*        })*/}
        {/*        </TabsList>*/}
        {/*    }*/}
        {/*</Tabs>*/}
    </div>
  );
}