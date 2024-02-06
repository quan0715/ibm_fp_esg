"use client";

import {useTheme} from "next-themes";
import React, { useEffect, useState } from "react";
import {Button} from "@nextui-org/react";
import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";


export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <Button
            color={"default"}
            variant={"faded"}
            size={"md"}
            isIconOnly={true}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <MaterialIcon icon={theme === 'light' ? "light_mode" : "dark_mode"} className={"text-xl"}/>
        </Button>
    )
};