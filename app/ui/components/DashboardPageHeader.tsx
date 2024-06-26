import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";


interface DashboardPageHeader{
    title?: string;
    children?: React.ReactNode;
}

export function DashboardPageHeader({title = "Dashboard", children}: DashboardPageHeader) {
    return (
        <div className="flex w-full py-4 px-8 items-center justify-between bg-default">
            <p className="text-3xl font-light">{title}</p>
            <div className="gap-10 hidden md:flex">
                {children}
            </div>
        </div>
    );
}
