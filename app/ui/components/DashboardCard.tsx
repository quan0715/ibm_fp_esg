
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { CardProps } from "@nextui-org/react";

interface DashboardCardProps extends CardProps {
    title: string;
    children?: React.ReactNode;
    // justify: "justify-start" | "justify-end" | "justify-center" | "justify-between" | "justify-around" | "justify-evenly" | "justify-items-start" | "justify-items-end" | "justify-items-center" | "justify-items-between" | "justify-items-around" | "justify-items-evenly" | "justify-self-auto" | "justify-self-start" | "justify-self-end" | "justify-self-center" | "justify-self-between" | "justify-self-around" | "justify-self-evenly" | "justify-content-start" | "justify-content-end" | "justify-content-center" | "justify-content-between" | "justify-content-around" | "justify-content-evenly" | "justify-content-stretch"

}

export function DashboardCard({title, children, ...props}: DashboardCardProps) {
    const {className, ...rest} = props;
  return (
    <Card radius="sm" className={"bg-foreground/10 " + className} {...rest} >
        <CardHeader className="font-light">{title}</CardHeader>
        <Divider/>
        <CardBody className="">
            {children}
        </CardBody>            
    </Card>
  );
}