import {  
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";

import { dashboardConfig } from "@/lib/dashboard"

// import { IBMLogoImage } from "../assets/IBMLogo";
import { SignOutButton } from "../auth/SignOutButton";
import { ThemeSwitcher } from "./ThemeSwitcher";

type AppNavBarProps = {
    children?: React.ReactNode;
};

export function AppNavBar({children}: AppNavBarProps) {
  return (
    <Navbar  maxWidth="full" className="bg-default" position="sticky" classNames={{
        item: [
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
        ],
      }}>
        <NavbarBrand>
            <NavbarMenuToggle className=""/>
            <p className="text-lg px-4">IBM 智慧永續ESG平台</p>
            {/* <IBMLogoImage width="xs"/> */}
        </NavbarBrand>
        <NavbarContent className=" gap-4" justify="center">
                {
                    Object.keys(dashboardConfig.pages).map((page) => {
                        return (
                            <NavbarItem className="hidden md:flex" key={page} >
                                {page}
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
                        return (
                            <NavbarMenuItem key={page}>
                                {page}
                            </NavbarMenuItem>
                        );
                    })
                }
                <SignOutButton/>
        </NavbarMenu>
    </Navbar>
  );
}

