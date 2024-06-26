"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { CardProps } from "@nextui-org/react";
import { DashboardCard } from "@/app/ui/components/DashboardCard";
import React, { useState } from "react";
// import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";

interface FilterFrameProps extends CardProps {
  title?: string;
  children?: React.ReactNode;
}
export default function FilterFrame({
  title,
  children,
  ...props
}: FilterFrameProps) {
  const { className, ...rest } = props;
  var [isExpanded, setIsExpanded] = useState(true);

  function onClick() {
    setIsExpanded(!isExpanded);
  }

  var wClassName = isExpanded ? "w-64" : "w-16";
  var bgClassName = "bg-default";
  return (
    <Card
      className={`${wClassName} ${bgClassName} ${className} transition ease-in-out delay-150`}
    >
      <CardHeader className={"font-light text-lg flex justify-between"}>
        <div className={isExpanded ? "" : "hidden"}>{"篩選列表"}</div>
        <button onClick={onClick}>
          {/*<MaterialIcon icon={isExpanded ? "menu" : "filter_alt" }/>*/}
        </button>
      </CardHeader>
      <Divider />
      <CardBody>{children}</CardBody>
    </Card>
  );
}
