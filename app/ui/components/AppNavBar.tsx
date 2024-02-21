'use client'
import {  
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { dashboardConfig } from "@/lib/dashboard"

// import { IBMLogoImage } from "../assets/IBMLogo";
import { SignOutButton } from "../auth/SignOutButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";

type AppNavBarProps = {
    children?: React.ReactNode;
};

// type PageConfig = {
//     title: string;
//     href: string;
// } 

// interface DashboardPageProps{
//     pageConfig: Array<PageConfig>;
//     children?: React.ReactNode;
// }

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

export function AppNavBar({children}: AppNavBarProps) {
    
    const path = usePathname();  
    console.log("Current Path", path);
    
    return (
    <Navbar  maxWidth="full" className="bg-default" position="sticky" classNames={{item: cssItem}}>
        <NavbarBrand>
            <NavbarMenuToggle className=""/>
            <p className="text-lg px-4">{dashboardConfig.name}</p>
        </NavbarBrand>
        <NavbarContent className=" gap-4" justify="center">
            {
                Object.keys(dashboardConfig.pages).map((page) => {
                    const pageConfig = dashboardConfig.pages[page];
                    const pagePath = `${dashboardConfig.path}${pageConfig.path}`;
                    const pageHref = `${pagePath}${pageConfig.default}`;
                    return (
                        <NavbarItem className="hidden md:flex" key={pageConfig.name}>
                            <Button as={Link} color="primary" href={pageHref} variant={path.startsWith(pagePath) ? "bordered" : "light"} >
                                {pageConfig.name}
                            </Button>
                        </NavbarItem>
                    );
                })
            }
            <ThemeSwitcher/>
            <SignOutButton/>
        </NavbarContent>
        <NavbarMenu className="bg-inherited">
                {
                    Object.keys(dashboardConfig.pages).map((page) => {
                        const pageConfig = dashboardConfig.pages[page];
                        const pagePath = `${dashboardConfig.path}${pageConfig.path}`;
                        const pageHref = `${pagePath}${pageConfig.default}`;
                        return (
                            <NavbarMenuItem key={page}>
                                <Link href={pageHref} size="lg" color={path.startsWith(pagePath) ? "primary" : "foreground"}>{pageConfig.name}</Link>
                                {/* <Button as={Link} color="primary" href={pageHref} variant={path.startsWith(pagePath) ? "bordered" : "light"} > */}
                                {/* {pageConfig.name} */}
                            {/* </Button> */}
                            </NavbarMenuItem>
                        );
                    })
                }
                <SignOutButton/>
        </NavbarMenu>
    </Navbar>
  );
}

