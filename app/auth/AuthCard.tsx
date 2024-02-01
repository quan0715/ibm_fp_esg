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
            className="animate-fadeIn transition-all lg:w-[600px] md:w-[560px] sm:w-[540px] aspect-square bg-white/50 dark:bg-default-100/50 shadow-2xl dark:shadow-0 ">
                <CardBody className={"flex flex-col justify-between sm:justify-around items-center p-12 sm:p-8"}>
                    {children}
                </CardBody>
            <CardFooter className={"flex justify-center gap-5"}>
                <p className="flex text-sm font-light">© 2024 IBM Corporation</p>
                <ThemeSwitcher/>
            </CardFooter>
        </Card>
    );
}