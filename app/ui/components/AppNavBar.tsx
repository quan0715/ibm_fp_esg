"use client"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { MdOutlineWaterDrop } from "react-icons/md";
import Link from "next/link";
import React from "react"
import { dashboardConfig } from "@/lib/dashboard.config"
import { BiTachometer } from "react-icons/bi";
import { SignOutButton } from "../auth/SignOutButton";
import { MdAir } from "react-icons/md";
import { ThemeSwitcher } from "@/components/blocks/customButtons/ThemeSwitcher"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { TbDatabaseShare } from "react-icons/tb";
type AppNavBarProps = {
    children?: React.ReactNode,
    pageName: string,
};
import { FaDatabase } from "react-icons/fa6";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { SiWebauthn } from "react-icons/si";
import {cn} from "@/lib/utils";


function MenuContentEntry({name, description=undefined, href, icon=undefined}: {name: string, description?: string, href: string, icon?: React.ReactNode}){
    return (
       <Link href={href} legacyBehavior passHref>
           <NavigationMenuLink className={cn(
               navigationMenuTriggerStyle(),
               "w-full h-fit flex flex-row space-x-2 items-center justify-start"
           )}>
               {icon ? icon : null}
               <div className={"flex flex-col justify-center items-start"}>
                   <p className={"text-sm"}>{name}</p>
                   <p className={"text-[12px] text-gray-500"}>{description}</p>
               </div>
           </NavigationMenuLink>
       </Link>
   )
}

export const menuList = [
        {
        key: '主頁',
        content: [
            {
                name: '主儀表板',
                label: '主儀表板',
                description: '總數據監測儀表板',
                href: '/',
                icon: <BiTachometer size={24}/>
            },
        ]
        },
    {
        key: 'GHG KPI',
        content: [
            {
                name: 'GHG KPI',
                label: '減量大盤（年度）',
                description: '年度結果檢測',
                href: '/dashboard/ghg',
                icon: <BiTachometer size={24}/>
            },
            {
                name: 'GHG KPI',
                label: '減量廠管理',
                description: '廠區結果管理',
                href: '/dashboard/ghg',
                icon: <BiTachometer size={24}/>
            },
            {
                name: 'GHG KPI',
                label: '各廠區 Raw Data',
                description: '原數據',
                href: '/dashboard/ghg',
                icon: <BiTachometer size={24}/>
            }
        ]
    },
    {
        key: '數據',
        content : [
            {
                name: '資料管理',
                label: '資料匯入與匯出',
                description: '原始資料匯入',
                href: '/',
                icon: <TbDatabaseShare size={24}/>
            },
            {
                name: '廢水',
                label: '廢水資料管理',
                description: '廢水排放數據',
                href: '/',
                icon: <MdOutlineWaterDrop size={24}/>
            },{
                name: '廢氣',
                label: '資料庫管理',
                description: '數據庫管理',
                href: '/',
                icon: <MdAir size={24}/>
            }
        ]
    },
    {
        key: '設定',
        content: [
            {
                name: '權限資料',
                label: '資料設定',
                description: '權限資料設定',
                href: '/dashboard/data',
                icon: <SiWebauthn size={24}/>
            },
            {
                name: '報表',
                label: '報表資料設定',
                description: '報表資料設定',
                href: '/dashboard/data',
                icon: <FaDatabase size={24}/>
            },
            {
                name: '主檔設定',
                label: '主檔資料設定',
                description: '主檔資料設定',
                href: '/dashboard/data',
                icon: <MdOutlineSettingsApplications size={24}/>
            }]
    }

]
export function AppNavBar({children, pageName}: AppNavBarProps) {

    return (
        <div className={"w-full flex flex-row justify-between items-center px-8 py-4"}>
            <div className={"flex flex-row items-center"}>
                <Button size={"icon"} type={"button"} variant={"ghost"}>
                    <MenuIcon className="h-4 w-4"/>
                </Button>
                <p className="text-lg px-4">{dashboardConfig.name}</p>
            </div>
            <NavigationMenu>
                <NavigationMenuList>
                    {
                        menuList.map((menu) => {
                            const menuName = menu.key
                            const menuContent = menu.content;
                            return (
                                <NavigationMenuItem key={menuName}>
                                    <NavigationMenuTrigger>
                                        {menuName}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className={"p-2 w-[320px] h-fit rounded-xl grid grid-cols-2 gap-2"}>
                                            {
                                                menuContent.map((content) => {
                                                    return (
                                                        <MenuContentEntry key={content.label} {...content}/>
                                                    )
                                                })
                                            }
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        }
                        )
                    }

                    {/*{*/}
                    {/*    Object.keys(dashboardConfig.pages).map((page) => {*/}
                    {/*        const pageConfig = dashboardConfig.pages[page];*/}
                    {/*        const pagePath = `${dashboardConfig.path}${pageConfig.path}`;*/}
                    {/*        const subPagePath = `${pagePath}${pageConfig.default}`;*/}
                    {/*        const pageHref = `${pagePath}${pageConfig.default}`;*/}
                    {/*        const isActive = pageName === pageConfig.name;*/}
                    {/*        return (*/}
                    {/*            <NavigationMenuItem key={pagePath}>*/}
                    {/*                <NavigationMenuTrigger>*/}
                    {/*                    {pageConfig.name}*/}
                    {/*                </NavigationMenuTrigger>*/}
                    {/*                <NavigationMenuContent key={subPagePath}>*/}
                    {/*                    <div className={"p-4 w-[300px] h-fit rounded-xl flex flex-col space-y-4"}>*/}
                    {/*                        {*/}
                    {/*                            Object.keys(pageConfig.subPage).map((subPage) => {*/}
                    {/*                                const subPageConfig = pageConfig.subPage[subPage];*/}
                    {/*                                const subPagePath = `${pagePath}${subPageConfig.path}`;*/}
                    {/*                                const subPageHref = `${pagePath}${subPageConfig.path}`;*/}
                    {/*                                return (*/}
                    {/*                                    <Link key={subPageHref} href={subPageHref} legacyBehavior passHref>*/}
                    {/*                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>*/}
                    {/*                                            {subPageConfig.name}*/}
                    {/*                                        </NavigationMenuLink>*/}
                    {/*                                    </Link>*/}
                    {/*                                );*/}
                    {/*                            })*/}
                    {/*                        }*/}
                    {/*                    </div>*/}

                    {/*                </NavigationMenuContent>*/}
                    {/*            </NavigationMenuItem>*/}
                    {/*        );*/}
                    {/*    })*/}
                    {/*}*/}
                 <NavigationMenuItem>
                        <ThemeSwitcher/>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <SignOutButton/>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
  );
}

