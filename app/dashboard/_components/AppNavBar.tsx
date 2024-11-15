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

import env_routes, { route_name_map as env_rnm } from "../env_safety/_route";
import management_routes, {
  route_name_map as management_rnm,
} from "../management/_route";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { IoIosLogOut } from "react-icons/io";
import React, { memo } from "react";
import { BiTachometer } from "react-icons/bi";
import { GrSystem } from "react-icons/gr";
import { MdAir } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  Car,
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
  SeparatorVertical,
  Sidebar,
} from "lucide-react";
import { TbDatabaseShare } from "react-icons/tb";

import { FaDatabase } from "react-icons/fa6";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { SiWebauthn } from "react-icons/si";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/auth/_actions/signOutAction";
import { Separator } from "@radix-ui/react-separator";
import { DesktopOnly, MobileOnly } from "@/components/layouts/layoutWidget";
import { auth } from "@/lib/auth";
import { User } from "next-auth";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

function SideBar() {
  const [showSideBar, setShowSideBar] = React.useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          type={"button"}
          variant={"ghost"}
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col w-full gap-4 p-4 border-l-[3px]">
            {env_routes.map(({ name, route }) => (
              <Link href={`/env_safety${route}`} key={route}>
                {name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col w-full gap-4 p-4 border-l-[3px]">
            {management_routes.map(({ name, route }) => (
              <Link href={`/env_safety${route}`} key={route}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const SubMenu = memo(function SubMenu({
  base_route,
  current_route,
}: {
  base_route: "env_safety" | "management";
  current_route: string;
}) {
  base_route = base_route == "env_safety" ? "env_safety" : "management";
  const routes = base_route == "env_safety" ? env_routes : management_routes;
  return (
    <div className="w-full flex flex-row gap-2 px-2 py-1 justify-center">
      {routes.map(({ name, route }) => (
        <Badge
          variant={current_route == route ? "default" : "secondary"}
          className="rounded-[5px]"
          key={route}
        >
          <Link href={`/${base_route}${route}`}>{name}</Link>
        </Badge>
      ))}
    </div>
  );
});

const PathBar = memo(function PathBar({ pathArray }: { pathArray: string[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="px-4">
        <DesktopOnly>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <p className="text-lg">IBM ESG PLATFORM</p>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </DesktopOnly>
        <DesktopOnly>
          <BreadcrumbSeparator>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <ChevronRightIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {((name, link) => (
                  <DropdownMenuItem>
                    <Link href={link}>{name}</Link>
                  </DropdownMenuItem>
                ))(
                  pathArray[1] != "env_safety"
                    ? "環境安全 ESG 儀表板"
                    : "工作安全 ESG 儀表板",
                  pathArray[1] != "env_safety" ? "/env_safety" : "/management"
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbSeparator>
        </DesktopOnly>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            {((name, link) => (
              <Link href={link}>
                <p className="text-m">{name}</p>
              </Link>
            ))(
              pathArray[1] == "env_safety" ? "環境安全" : "工作安全",
              pathArray[1] == "env_safety"
                ? "/dashboard/env_safety"
                : "/dashboard/management"
            )}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <MobileOnly>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
        </MobileOnly>
        <BreadcrumbItem>
          <BreadcrumbPage>
            {pathArray[1] == "env_safety"
              ? env_rnm.get("/" + pathArray[2] ?? env_rnm.get("/"))
              : management_rnm.get(
                  "/" + pathArray[2] ?? management_rnm.get("/")
                )}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
});

export function AppNavBar() {
  const path = usePathname().slice(1);
  const pathArray = path.split("/");
  console.log(pathArray);
  return (
    <>
      <div
        className={
          "w-full flex flex-row justify-between items-center px-6 py-2 h-14"
        }
      >
        <div className={"flex flex-row items-center h-14"}>
          <MobileOnly>
            <SideBar />
          </MobileOnly>
          <PathBar pathArray={pathArray} />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <ThemeSwitcher />
            </NavigationMenuItem>
            <DesktopOnly>
              <NavigationMenuItem asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={async () => {
                    const res = await signOutAction();
                    if (res?.success) {
                      location.reload();
                    }
                  }}
                >
                  登出
                </Button>
              </NavigationMenuItem>
            </DesktopOnly>
            <MobileOnly>
              <NavigationMenuItem asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={async () => {
                    const res = await signOutAction();
                    if (res?.success) {
                      location.reload();
                    }
                  }}
                >
                  <IoIosLogOut />
                </Button>
              </NavigationMenuItem>
            </MobileOnly>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <DesktopOnly className="w-full">
        <SubMenu
          base_route={pathArray[1] as "env_safety" | "management"}
          current_route={pathArray[2]}
        />
      </DesktopOnly>
    </>
  );
}
