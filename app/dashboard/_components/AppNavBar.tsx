"use client";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

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
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
} from "lucide-react";
import { signOutAction } from "@/app/auth/_actions/signOutAction";
import { DesktopOnly, MobileOnly } from "@/components/layouts/layoutWidget";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import routes from "../_route";
import { Route } from "../_route_type";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const RecursiveMenu = ({ routes, setOpen }: { routes: Route[], setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  return <div className="flex gap-0 mb-2 flex-col h-fit w-full ml-1 my-1 max-sm:gap-1 pl-2 border-l-[2px]">{routes.map(({ name, route, subroute }) =>
    <>{subroute.length == 0 ?
      <Link className="pb-3 last:pb-0" href={route} key={route} onClick={() => setOpen(false)}>
        {name}
      </Link> :
      <>
        <div className="w-full pb-3 last:pb-0 flex flex-row justify-between items-center">
          <Link href={route} key={route} onClick={() => setOpen(false)}>
            {name}
          </Link>
          {collapsed ? <FaChevronRight className="h-[60%] aspect-square" onClick={() => setCollapsed(false)} /> : <FaChevronDown className="h-[60%] aspect-square" onClick={() => setCollapsed(true)} />}
        </div>
        <Collapsible open={!collapsed} onOpenChange={(open) => setCollapsed(!open)} className="group/collapsible">
          <CollapsibleContent>
            <RecursiveMenu routes={subroute} setOpen={setOpen} />
          </CollapsibleContent>
        </Collapsible>
      </>

    }</>)}
  </div>;
}

function SideBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={open => setOpen(open)}>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          type={"button"}
          variant={"ghost"}
          className="px-0"
          onClick={() => { setOpen(!open); }}
        >
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="max-h-full flex flex-col justify-start gap-0">
        <SheetHeader>
          <SheetTitle>IBM ESG PLATFORM</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-full shrink overflow-y-auto flex flex-row justify-between max-sm:[&_a]:text-[10px] max-sm:[&_a]:leading-[10px]">
          <div className="flex flex-col w-[50%] gap-0 p-2 max-sm:p-1">
            <Link className="" href={routes[0].route} onClick={() => setOpen(false)}>
              {routes[0].name}
            </Link>
            <RecursiveMenu routes={routes[0].subroute} setOpen={setOpen} />
          </div>
          <div className="flex flex-col w-[50%] gap-0 p-2 max-sm:p-1">
            <Link href={routes[1].route} onClick={() => setOpen(false)}>
              {routes[1].name}
            </Link>
            <RecursiveMenu routes={routes[1].subroute} setOpen={setOpen} />
          </div>
        </div>
      </SheetContent>
    </Sheet >
  );
}

const SubMenu = function SubMenu({ routes, current_route }: { routes: Route[], current_route: string }) {
  return (
    <div className="w-full flex flex-row gap-2 px-2 py-1 justify-center flex-wrap">
      {routes.map(({ name, route }) => (
        <Badge
          variant={current_route == route ? "default" : "secondary"}
          className="rounded-[5px] px-[0.4rem]"
          key={route}
        >
          <Link href={route} prefetch className="text-nowrap">{name}</Link>
        </Badge>
      ))}
    </div>
  );
};

const PathBar = forwardRef<{ currentRoutes: Route[] }, { routeArray: string[], setSubMenuRoute?: (e: Route[]) => void }>(function PathBar({ routeArray, setSubMenuRoute }, ref) {
  const barData = useMemo(() => {
    let cur = routes;
    const data: Route[] = [];
    routeArray.forEach((route) => {
      const next = cur.find((r) => r.route == route);
      if (!next) return;
      data.push({
        ...next,
        subroute: next.subroute.length ? next.subroute : cur
      });
      cur = next.subroute;
    })
    return data;
  }, [routeArray]);

  useImperativeHandle(ref, () => ({
    currentRoutes: barData[barData.length - 1].subroute ?? []
  }));

  useEffect(() => {
    setSubMenuRoute?.(barData[barData.length - 1].subroute);
  }, [barData, setSubMenuRoute]);
  return (
    <Breadcrumb>
      <BreadcrumbList className="px-4 max-md:px-2">
        <BreadcrumbItem className="max-md:hidden" onMouseEnter={() => { console.log('test'); setSubMenuRoute?.(routes) }}>
          <BreadcrumbLink asChild>
            <Link href="/">
              <p className="text-lg">IBM ESG PLATFORM</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="max-md:hidden">/</BreadcrumbSeparator>
        {barData.map(({ route, name, subroute }, i) => (
          <React.Fragment key={route}>
            <BreadcrumbItem key={route} onMouseEnter={() => setSubMenuRoute?.(subroute)}>
              <BreadcrumbLink asChild>
                <Link href={route}>
                  <p className="text-m">{name}</p>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i != barData.length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb >
  );
})

export function AppNavBar() {
  const path = usePathname();
  const pathBarRef = useRef<{
    currentRoutes: Route[];
  }>({ currentRoutes: [] });
  const routeArray = useMemo(() => {
    const pathArray = path.slice(1).split("/");
    return pathArray.map((_, i) => "/" + pathArray.slice(0, i + 1).join("/")).slice(1);
  }, [path])

  const [subMenuRoute, setSubMenuRoute] = React.useState<Route[]>([]);
  return (
    <div className="w-full"
      onMouseLeave={() => setSubMenuRoute(pathBarRef?.current?.currentRoutes ?? [])}
    >
      <div
        className={
          "w-full flex flex-row justify-between items-center px-6 py-2 h-14 max-md:px-3"
        }>
        <div className={"flex flex-row items-center h-14"}>
          <MobileOnly>
            <SideBar />
          </MobileOnly>
          <PathBar routeArray={routeArray} setSubMenuRoute={setSubMenuRoute} ref={pathBarRef} />
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <ThemeSwitcher />
            </NavigationMenuItem>
            <NavigationMenuItem className="max-md:hidden" asChild>
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
            <MobileOnly>
              <NavigationMenuItem asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="px-2"
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
          routes={subMenuRoute}
          current_route={path}
        />
      </DesktopOnly>
    </div>
  );
}
