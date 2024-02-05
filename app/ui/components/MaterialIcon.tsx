import React from "react";

type MaterialIconProps = {
    icon: string,
    className?: string,
}

export function MaterialIcon({icon = "account_circle", className = ""}: MaterialIconProps) {
    return (
        <span className={"material-symbols-outlined " + className}>
            {icon}
        </span>
    );
}