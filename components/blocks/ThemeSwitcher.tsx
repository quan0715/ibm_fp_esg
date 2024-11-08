"use client";

import { useTheme } from "next-themes";
// import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";
// import { Sun, Moon } from "lucide-react";
import { LuSun, LuMoon } from "react-icons/lu";
import { useEffect, useState } from "react";
function LightThemeIcon() {
  return (
    <LuSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  );
}

function DarkThemeIcon() {
  return (
    <LuMoon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  );
}
export function ThemeSwitcher() {
  //   const [isDark, setIsDark] = useState(false);

  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <Button
      id={"theme-toggle"}
      variant="outline"
      size="icon"
      onClick={toggleTheme}
    >
      {isClient ? (
        theme === "dark" ? (
          <DarkThemeIcon />
        ) : (
          <LightThemeIcon />
        )
      ) : null}
    </Button>
  );
}
