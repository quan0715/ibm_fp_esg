'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
export function Provider({children}:{children: React.ReactNode}) {
    return (
        <NextUIProvider>
            <NextThemeProvider attribute="class" defaultTheme="light">
                {children}
            </NextThemeProvider>
        </NextUIProvider>
    )
}