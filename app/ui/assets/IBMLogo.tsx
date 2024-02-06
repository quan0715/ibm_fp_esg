import React from "react";

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
    return (
        <div className={`bg-cover bg-center bg-no-repeat ${logoWidth} h-16 bg-[url('/IBM_logo_blue60.png')] dark:bg-[url('/IBM_logo_blue50.png')]`}></div>
    );
}