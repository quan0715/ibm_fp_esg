"use client";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { LuFactory } from "react-icons/lu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import Link from "next/link";
import React from "react";
import { BiTachometer } from "react-icons/bi";
import { GrSystem } from "react-icons/gr";
import { MdAir } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { TbDatabaseShare } from "react-icons/tb";

import { FaDatabase } from "react-icons/fa6";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { SiWebauthn } from "react-icons/si";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/auth/_actions/signOutAction";

type MenuContentEntryProps = {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

type Level1MenuContentEntryProps = {
  key: string;
  label: string;
  content: MenuContentEntryProps[];
};

function MenuContentEntry({
  label,
  description,
  href,
  icon,
}: {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          "w-full h-fit flex flex-row space-x-2 items-center justify-start"
        )}
      >
        {icon ? icon : null}
        <div className={"flex flex-col justify-center items-start"}>
          <p className={"text-sm"}>{label}</p>
          <p className={"text-[12px] text-gray-500"}>{description}</p>
        </div>
      </NavigationMenuLink>
    </Link>
  );
}

export const Level1Menu: Level1MenuContentEntryProps[] = [
  {
    key: "location_and_asset",
    label: "位置與資產",
    content: [
      {
        key: "location",
        label: "位置",
        description: "組織、廠區、Phase、課別",
        icon: <LuFactory size={24} />,
      },
      {
        key: "tool",
        label: "系統管理",
        description: "系統、Tool資料管理與課別對應",
        icon: <GrSystem size={24} />,
      },
      {
        key: "asset",
        label: "資產",
        description: "資產基本資料/分類/監控點管理",
        icon: <MdOutlinePrecisionManufacturing size={24} />,
      },
    ],
  },
  {
    key: "data",
    label: "數據追蹤",
    content: [
      {
        key: "emission",
        label: "排放",
        description: "排放基本資料/對應資產/tool/溫室氣體",
        icon: <MdAir size={24} />,
      },
      {
        key: "water",
        label: "廢水",
        description: "廢水基本資料/對應資產/tool",
        icon: <MdOutlineWaterDrop size={24} />,
      },
      {
        key: "waste",
        label: "廢棄物管理",
        description: "廢棄物基本資料/對應資產/tool",
        icon: <MdAir size={24} />,
      },
    ],
  },
  {
    key: "setting_and_authority",
    label: "設定與權限",
    content: [
      {
        key: "authority",
        label: "權限管理",
        description: "權限群組基本資料",
        icon: <MdOutlineSettingsApplications size={24} />,
      },
      {
        key: "integration",
        label: "資料整合",
        description: "權限群組的功能權限設定",
        icon: <TbDatabaseShare size={24} />,
      },
    ],
  },
];
export function AppNavBar() {
  return (
    <div
      className={"w-full flex flex-row justify-between items-center px-6 py-2"}
    >
      <div className={"flex flex-row items-center"}>
        <Button size={"icon"} type={"button"} variant={"ghost"}>
          <MenuIcon className="h-4 w-4" />
        </Button>
        <p className="text-lg px-4">IBM ESG PLATFORM</p>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {Level1Menu.map((menu, index) => {
            const RootPath = "/dashboard";
            let level1Path = `${RootPath}/${menu.key}`;
            const menuLabel = menu.label;
            const menuContent = menu.content;
            return (
              <NavigationMenuItem key={menuLabel + index}>
                <NavigationMenuTrigger>{menuLabel}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={
                      "p-2 w-96 h-fit rounded-xl flex flex-col space-y-2 shadow-md"
                    }
                  >
                    {menuContent.map((content) => {
                      let level2Path = `${level1Path}/${content.key}`;
                      return (
                        <MenuContentEntry
                          {...content}
                          href={level2Path}
                          key={content.label}
                        />
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
          <NavigationMenuItem>
            <ThemeSwitcher />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button
              type="button"
              variant={"destructive"}
              onClick={async () => {
                await signOutAction();
              }}
            >
              登出
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
