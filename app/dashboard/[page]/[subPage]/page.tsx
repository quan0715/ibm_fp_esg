import { DashboardCard } from "@/app/ui/components/DashboardCard";
import { dashboardConfig } from "@/lib/dashboard.config";
function Placeholder({label} : {label: string}) {
    return (
        <div className="flex flex-col flex-grow bg-background w-full p-6">
            <DashboardCard title={"Card"} className="">
                {label}
            </DashboardCard>
        </div>
    );
}

export default function Page({ params }: { params: { subPage: string , page: string} }) {

    // console.log("Current Path", params);
    const pageConfig = dashboardConfig.pages[params.page];
    const subPage = pageConfig?.subPage[params.subPage];
    
    return (
        <div className={"text-xl flex flex-col flex-grow w-full overflow-scroll"}>
            <div className="flex flex-col flex-grow justify-start bg-background w-full p-4 ">
                {subPage.component ? <subPage.component/> : <Placeholder label={params.subPage}/> }
            </div>
        </div>
    );
}
