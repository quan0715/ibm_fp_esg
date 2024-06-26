
import {Separator} from "@/components/ui/separator";
import React from "react";
import {cn} from "@/lib/utils";
export function DashboardCard({children , className} : {children: React.ReactNode, className?: string}) {
    return (
        <div className={cn(
            "w-full bg-background rounded-md flex flex-col", className
        )}>
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
        <div className="flex-1 w-full p-2">
            {children}
        </div>
    )
}

