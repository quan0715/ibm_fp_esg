
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { CardProps } from "@nextui-org/react";
import React from "react";

import {useState} from "react";

interface DashboardCardProps extends CardProps {
    title: string,
    children?: React.ReactNode,
}

export function DashboardCard({title, children, ...props}: DashboardCardProps) {
    const {className, ...rest} = props;

    return (
    <Card radius="sm" className={"bg-default " + className} {...rest} >
        <CardHeader className="font-light text-lg">{title}</CardHeader>
        <Divider/>
        <CardBody className="">
            {children}
        </CardBody>
    </Card>
    );
}