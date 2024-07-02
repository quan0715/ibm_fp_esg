import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
import { Separator } from "@/components/ui/separator";
import { DashboardPageHeader } from "../_blocks/DashboardPageHeader";

export default function Layout({
  children,
  params,
}: {
  params: { page: string };
  children: React.ReactNode;
}) {
  // const pageConfig = dashboardConfig.pages[params.page];

  return (
    <div className="w-full h-full flex flex-col flex-grow justify-start items-center bg-background">
      <DashboardPageHeader title={"廢水資料管理"}></DashboardPageHeader>
      {/*<DashboardTabBar pageName={params.page}/>*/}
      <div className={"w-full h-full"}>
        <div className={"w-full h-full p-4 bg-secondary"}>{children}</div>
      </div>
    </div>
  );
}
