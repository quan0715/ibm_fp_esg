'use client'
import { dashboardConfig } from "@/lib/dashboard";
import {Tabs, Tab} from "@nextui-org/tabs";
import { usePathname } from "next/navigation";

interface DashboardTabBarProps{
  pageName: string;  
  children?: React.ReactNode;
}

export function DashboardTabBar({pageName, children, ...props}: DashboardTabBarProps) {
  const path = usePathname();
  const pageConfig = dashboardConfig.pages[pageName];
  console.log("pageConfig", pageConfig);
  return (
    <div className="flex flex-col w-full px-8 items-start justify-between bg-default">
        <Tabs 
            {...props}
            aria-label="Options" 
            color="primary" 
            variant="underlined"
            selectedKey={path}
            classNames={{
                tabList: "gap-6 w-full rounded-none border-divider",
                tab: "max-w-fit",
                tabContent: "group-data-[selected=true]:text-primary text-lg",
            }}>
            {
                Object.keys(pageConfig.subPage).map((subPageName) => {
                    const subPageConfig = pageConfig.subPage[subPageName];
                    // console.log("subPageConfig", subPageConfig);
                    const tabHref = [dashboardConfig.path, pageConfig.path, subPageConfig.path].join('');
                    return (
                        <Tab key={tabHref} href={tabHref} title={subPageConfig.name}>
                        </Tab>
                    );
                })
            }
        </Tabs>
    </div>
  );
}