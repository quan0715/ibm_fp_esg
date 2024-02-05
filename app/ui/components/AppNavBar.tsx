import {  
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
import { IBMLogoImage } from "./IBMLogo";
import { SignOutButton } from "../auth/SignOutButton";
import { ThemeSwitcher } from "./ThemeSwitcher";

type AppNavBarProps = {
    children?: React.ReactNode;
};

const navBarAction : Array<{name: string, href:string}> = [
    {
        name: "運營狀況",
        href: "/operations",
    },
    {
        name: "設備管理",
        href: "/assetManagement",
    },
    {
        name: "QHSE",
        href: "/qhse",
    },
    {
        name: "監測報告",
        href: "/reports",
    },
    // {
    //     name: "管理",
    //     href: "/admin",
    // },
]

export function AppNavBar({children}: AppNavBarProps) {
  return (
    <Navbar  maxWidth="full" className="bg-transparent" position="sticky" classNames={{
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
            <NavbarMenuToggle className="md:hidden" />
            <IBMLogoImage width="xs"/>
            IBM IOT DASHBOARD
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
                {
                    navBarAction.map((action) => {
                        return (
                            <NavbarItem key={action.name} >
                                {action.name}
                            </NavbarItem>
                        );
                    })
                }
                <ThemeSwitcher/>
                <SignOutButton/>
        </NavbarContent>
        <NavbarMenu className="bg-inherited">
                {
                    navBarAction.map((action) => {
                        return (
                            <NavbarMenuItem key={action.name} >
                                {action.name}
                            </NavbarMenuItem>
                        );
                    })
                }
                <SignOutButton/>
        </NavbarMenu>
    </Navbar>
  );
}