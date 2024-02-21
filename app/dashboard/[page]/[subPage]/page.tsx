'use client'
import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
import { usePathname} from "next/navigation";
import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { dashboardConfig } from "@/lib/dashboard";
import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader";
import { TextDataCard } from "@/app/ui/components/data/DataCard";
import { time } from "console";

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

    // const currentPage = dashboardConfig.pages[pageName];
    const pageConfig = dashboardConfig.pages[pageName];
    const subPage = pageConfig?.subPage[params.subPage];
    console.log(params.subPage);
    return (
        <div className={"text-xl flex flex-col flex-grow w-full h-full justify-center items-center"}>
            <DashboardPageHeader title={pageConfig.name}>
                <TextDataCard label="上次更新時間" data={(new Date()).toLocaleString()}/>
            </DashboardPageHeader>
            <DashboardTabBar tabConfig={
                Object.values(pageConfig.subPage).map((subPage) => {
                    return {
                        title: subPage.name,
                        href: `${dashboardConfig.path}${pageConfig.path}${subPage.path}`
                    };
                })
            }/>
            <div className="flex flex-col flex-grow bg-background w-full p-4">
                {subPage.component ? <subPage.component/> : <Placeholder label={params.subPage}/> }
            </div>
        </div>
    );
}
