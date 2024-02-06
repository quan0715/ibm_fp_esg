import {Button, Card, CardBody, CardFooter, Input} from "@nextui-org/react";
import React from "react";
import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";
import {ThemeSwitcher} from "@/app/ui/components/ThemeSwitcher";

export function AuthCard({children}: { children: React.ReactNode }) {
    return (
        <Card
            isBlurred={true}
            shadow={"lg"}
            radius={"sm"}
            className="animate-fadeIn transition-all w-screen md:w-[540px] h-screen md:h-auto bg-background/50 shadow-2xl">
                <CardBody className={"flex flex-col justify-center items-center gap-12 p-10 md:p-12 lg:p-14"}>
                    {children}
                </CardBody>
            <CardFooter className={"flex justify-center space-x-4"}>
                <span className="flex text-sm font-light">© 2024 IBM Corporation</span>
                <ThemeSwitcher/>
            </CardFooter>
        </Card>
    );
}