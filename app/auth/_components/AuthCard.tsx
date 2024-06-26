import React from "react";
import { ThemeSwitcher } from "@/components/blocks/ThemeSwitcher";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBMLogoImage } from "@/components/blocks/IBMLogo";

type AuthCardProps = {
  children: React.ReactNode;
  title: string; // ui display
  description: string; // ui display
};

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <Card className="animate-fadeIn transition-all w-screen h-screen md:w-[540px] md:h-auto bg-background/80 shadow-2xl p-8 backdrop-blur-xl rounded-xl align-middle">
      <CardHeader className={""}>
        <IBMLogoImage width="sm" />
        <CardTitle className={"text-2xl font-bold"}>{title}</CardTitle>
        <CardDescription className={"text-sm "}>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className={"flex justify-center space-x-2"}>
        <span className="flex text-sm font-light">
          {" "}
          © 2024 IBM Corporation{" "}
        </span>
        <ThemeSwitcher />
      </CardFooter>
    </Card>
  );
}
