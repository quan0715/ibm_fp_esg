import { Separator } from "@/components/ui/separator";
import React from "react";
import { cn } from "@/lib/utils";
export function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full bg-background rounded-md flex flex-col", className)}
    >
      {children}
    </div>
  );
}

export function DashboardCardHeader({
  title = "",
  titleComponent,
  children,
}: {
  title?: string;
  titleComponent?: (title: string) => React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-1.5 justify-start items-start">
      <div className="w-full px-3 py-2 flex flex-row items-center">
        {titleComponent ? (
          titleComponent(title)
        ) : (
          <h3 className="text-lg font-light leading-none tracking-tight">
            {title}
          </h3>
        )}
        {children}
      </div>
      <Separator />
    </div>
  );
}

export function DashboardCardContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 w-full p-4 space-y-2", className)}>
      {children}
    </div>
  );
}
