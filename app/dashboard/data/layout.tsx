import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar"
import { dashboardConfig } from "@/lib/dashboard.config"
import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader"
import { TextDataCard } from "@/app/ui/components/data/DataCard"
import { AppNavBar } from "@/app/ui/components/AppNavBar"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children, params }: { params: { page: string }, children: React.ReactNode}) {

    // const pageConfig = dashboardConfig.pages[params.page];

    return (
        <div className="w-full h-full flex flex-col flex-grow justify-start items-center bg-background">
            <AppNavBar pageName={'data'}/>
            {/*<Separator />*/}
            <DashboardPageHeader title={'廢水資料管理'}>
                <TextDataCard label="上次更新時間" data={(new Date()).toLocaleString()}/>
            </DashboardPageHeader>
            {/*<DashboardTabBar pageName={params.page}/>*/}
            <div className={"w-full h-full"}>
                <div className={"w-full h-full p-4 bg-secondary"}>
                    {children}
                </div>
            </div>
        </div>
    );
}
