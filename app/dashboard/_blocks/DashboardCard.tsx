
import {Separator} from "@/components/ui/separator";
import React from "react";
export function DashboardCard({children} : {children: React.ReactNode}) {
    return (
        <div className={"w-full bg-background rounded-md"}>
            {children}
        </div>
    );
}

export function DashboardCardHeader({title} : {title: string}){
    return (
        <div className="flex flex-col space-y-1.5">
            <h3 className="text-lg font-light leading-none tracking-tight px-3 py-2">{title}</h3>
            <Separator/>
        </div>
    )
}

export function DashboardCardContent({children} : {children?: React.ReactNode}){
    return (
        <div className="w-full px-4 py-2">
            {children}
        </div>
    )
}