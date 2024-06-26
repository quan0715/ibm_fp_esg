// 'use client'
import React from "react";
import Image from "next/image";
// import {useTheme} from "next-themes";

type IBMLogoImageProps = {
    // height?: "xl" | "lg" | "md" | "sm" | "xs";
    width?: "xl" | "lg" | "md" | "sm" | "xs";
};

function getLogoWidth(width: "xl" | "lg" | "md" | "sm" | "xs") {
    switch (width) {
        case "xl":
            return "w-48";
        case "lg":
            return "w-44";
        case "md":
            return "w-40";
        case "sm":
            return "w-32";
        case "xs":
            return "w-24";
    }
}




export function IBMLogoImage({width = "md"}: IBMLogoImageProps) {
    const logoWidth = getLogoWidth(width);
    // const { theme, setTheme } = useTheme()

    return (
        // <div className={`bg-cover bg-center bg-no-repeat ${logoWidth} h-16 bg-[url('/icon.png')]`}></div>
        <div className="overflow-hidden rounded-lg w-24 h-12">
            {/*<Image className={"relative top-0 -left-5"} src={'/IBM_logo_blue60.png'} width={200} height={80}*/}
            {/*       alt={"icon"}/>*/}
            <div className={`relative top-0 -left-[1.67rem] bg-cover bg-center bg-no-repeat w-32 h-16 bg-[url('/IBM_logo_blue60.png')]`}></div>
        </div>
    )
    // <Image src={'/IBM_logo_blue50.png'} width={100} height={"70"} alt={"icon"}/>
    //
    // <div className={`bg-cover bg-center bg-no-repeat ${logoWidth} h-16 bg-[url('/icon.png')] dark:bg-[url('/IBM_logo_blue50.png')]`}></div>
}