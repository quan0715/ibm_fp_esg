import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";


interface DashboardPageHeader{
    title?: string;
    children?: React.ReactNode;
}

export function DashboardPageHeader({title = "Dashboard", children}: DashboardPageHeader) {
    return (
        <div className="flex w-full py-8 px-8 items-center justify-between bg-foreground/10">
            <p className="text-4xl font-light">{title}</p>
            <div className="gap-10 hidden md:flex">
                {children}
            </div>
        </div>
    );
}
