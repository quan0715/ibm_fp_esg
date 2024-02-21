'use client'
import { usePathname} from "next/navigation";
import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { dashboardConfig } from "@/lib/dashboard";
function Placeholder({label} : {label: string}) {
    return (
        <div className="flex flex-col flex-grow bg-background w-full p-6">
            <DashboardCard title={"Card"} className="">
                {label}
            </DashboardCard>
        </div>
    );
}

export default function Page({ params }: { params: { subPage: string } }) {

    const pathName = usePathname();
    const pageName = pathName.split("/")[2];
    console.log("Current Path", pageName);
    const pageConfig = dashboardConfig.pages[pageName];
    const subPage = pageConfig?.subPage[params.subPage];
    
    return (
        <div className={"text-xl flex flex-col flex-grow w-full h-full justify-center items-center"}>
            <div className="flex flex-col flex-grow bg-background w-full p-4">
                {subPage.component ? <subPage.component/> : <Placeholder label={params.subPage}/> }
            </div>
        </div>
    );
}
