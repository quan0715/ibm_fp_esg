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
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("px-3 py-2 flex flex-row items-center w-full", className)}
    >
      {children}
    </div>
  );
}
export function DashboardCardHeaderContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex-grow flex flex-col space-y-0 justify-start items-start",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DashboardCardHeaderTitle({
  title = "",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return <h1 className={cn("text-lg font-semibold", className)}>{title}</h1>;
}

export function DashboardCardHeaderDescription({
  description = "",
  className,
}: {
  description?: string;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-gray-500 text-start", className)}>
      {description}
    </p>
  );
}

export function DashboardCardActionList({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-shrink flex flex-row space-x-2", className)}>
      {children}
    </div>
  );
}

export function DashboardCardHeaderTest({
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
