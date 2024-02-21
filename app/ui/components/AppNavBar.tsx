import {  
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { dashboardConfig } from "@/lib/dashboard"

import { SignOutButton } from "../auth/SignOutButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@nextui-org/button";

type AppNavBarProps = {
    children?: React.ReactNode,
    pageName: string,
};

const cssItem = [
    "flex",
    "relative",
    "h-full",
    "items-center",
    "data-[active=true]:after:content-['']",
    "data-[active=true]:after:absolute",
    "data-[active=true]:after:bottom-0",
    "data-[active=true]:after:left-0",
    "data-[active=true]:after:right-0",
    "data-[active=true]:after:h-[2px]",
    "data-[active=true]:after:rounded-[2px]",
    "data-[active=true]:after:bg-primary",
  ];

export function AppNavBar({children, pageName}: AppNavBarProps) {
    return (
    <Navbar  maxWidth="full" className="bg-default" position="sticky" classNames={{item: cssItem}}>
        <NavbarBrand>
            <NavbarMenuToggle className=""/>
            <p className="text-lg px-4">{dashboardConfig.name}</p>
        </NavbarBrand>
        <NavbarContent className="gap-4" justify="center">
            {
                Object.keys(dashboardConfig.pages).map((page) => {
                    const pageConfig = dashboardConfig.pages[page];
                    const pagePath = `${dashboardConfig.path}${pageConfig.path}`;
                    const pageHref = `${pagePath}${pageConfig.default}`;
                    const isActive = pageName === pageConfig.name;
                    return (
                        <NavbarItem className="hidden md:flex" key={pageConfig.name}>
                            <Button 
                                color="primary" 
                                href={pageHref} 
                                variant={isActive ? "bordered" : "light"}>
                                <Link href={pageHref}>{pageConfig.name}</Link>
                            </Button>
                        </NavbarItem>
                    );
                })
            }
            <ThemeSwitcher/>
            <SignOutButton/>
        </NavbarContent>
        <NavbarMenu className="bg-inherited gap-4">
                {
                    Object.keys(dashboardConfig.pages).map((page) => {
                        const pageConfig = dashboardConfig.pages[page];
                        const pagePath = `${dashboardConfig.path}${pageConfig.path}`;
                        const pageHref = `${pagePath}${pageConfig.default}`;
                        const isActive = pageName === pageConfig.name;
                        return (
                            <NavbarMenuItem key={page} isActive={isActive}>
                                <Link href={pageHref} className="text-xl">
                                    {pageConfig.name}
                                </Link>  
                            </NavbarMenuItem>
                        );
                    })
                }
                <SignOutButton/>
        </NavbarMenu>
    </Navbar>
  );
}

