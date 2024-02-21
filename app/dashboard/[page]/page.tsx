import {redirect} from "next/navigation";
import {dashboardConfig} from "@/lib/dashboard";

export default function Dashboard({ params }: { params: { page: string } }) {
    const pageConfig = dashboardConfig.pages[params.page];
    const defaultPath = `${dashboardConfig.path}${pageConfig.path}${pageConfig.default}`
    return redirect(defaultPath);
}
