'use client'
import {Tabs, Tab} from "@nextui-org/tabs";
import { usePathname } from "next/navigation";
type TabConfig = {
    title: string;
    href: string;
    icon?: React.ReactNode;
}

interface DashboardTabBarProps{
  tabConfig: Array<TabConfig>;  
  children?: React.ReactNode;
}

export function DashboardTabBar({tabConfig, children, ...props}: DashboardTabBarProps) {

  const path = usePathname();  
  // console.log("Current Path", path);
  return (
    <div className="flex flex-col w-full px-8 items-start justify-between bg-default overflow-scroll">
        <Tabs 
            {...props}
            aria-label="Options" 
            color="primary" 
            variant="underlined"
            selectedKey={path}
            classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-primary",
                tab: "max-w-fit px-8 h-12",
                tabContent: "group-data-[selected=true]:text-primary text-[16px]",
            }}>
            {tabConfig.map((tab, index) => (
                <Tab key={tab.href} title={tab.title} href={tab.href}>
                </Tab>
            ))}
        </Tabs>
    </div>
  );
}