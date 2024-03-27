// 'use client'
import {redirect} from "next/navigation";
import {dashboardConfig} from "@/lib/dashboard.config";

export default function Dashboard() {
    const defaultPath = `${dashboardConfig.path}${dashboardConfig.default}`
    return redirect(defaultPath);
}
