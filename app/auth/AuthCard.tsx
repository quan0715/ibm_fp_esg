import {Button, Card, CardBody, CardFooter, Input} from "@nextui-org/react";
import React from "react";
import {MaterialIcon} from "@/app/ui/components/MaterialIcon";
import {ThemeSwitcher} from "@/app/ui/components/ThemeSwitcher";

export function AuthCard({children}: { children: React.ReactNode }) {
    return (
        <Card
            isBlurred={true}
            shadow={"lg"}
            radius={"sm"}
            className="animate-fadeIn transition-all w-screen md:w-[540px] h-screen md:h-auto bg-white/50 dark:bg-default-100/50 shadow-2xl">
                <CardBody className={"flex flex-col justify-center items-center gap-8 p-6 md:p-10 lg:p-12"}>
                    {children}
                </CardBody>
            <CardFooter className={"flex justify-center space-x-4"}>
                <p className="flex text-sm font-light ">© 2024 IBM Corporation</p>
                <ThemeSwitcher/>
            </CardFooter>
        </Card>
    );
}