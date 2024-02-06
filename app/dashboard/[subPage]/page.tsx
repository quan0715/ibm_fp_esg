
'use client'
import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
import { usePathname} from "next/navigation";
import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { dashboardConfig } from "@/lib/dashboard";

const currentPage = "HOME";


function Placeholder({label} : {label: string}) {
    return (
        <div className="flex flex-col flex-grow bg-background w-full p-6">
            <DashboardCard title={"Card"} className="">
                {label}
            </DashboardCard>
        </div>
    );
}

export default function Dashboard({ params }: { params: { subPage: string } }) {

    const currentPage = dashboardConfig.pages['HOME'];
    const subPage = currentPage?.subPage[params.subPage];
    console.log(params.subPage);
    return (
        <div className={"text-xl flex flex-col flex-grow w-full h-full justify-center items-center"}>
            <DashboardTabBar tabConfig={
                Object.values(currentPage.subPage).map((subPage) => {
                    return {
                        title: subPage.name,
                        href: `/dashboard${subPage.path}`
                    };
                })
            }/>
            <div className="flex flex-col flex-grow bg-background w-full p-4">
                {subPage.component ? <subPage.component/> : <Placeholder label={params.subPage}/> }
            </div>
        </div>
    );
}
