// import { DashboardTabBar } from "@/app/ui/components/DashboardTabBar";
// import { dashboardConfig } from "@/lib/dashboard.config";
// import { DashboardPageHeader } from "@/app/ui/components/DashboardPageHeader";
// import { TextDataCard } from "@/app/ui/components/data/DataCard";
// import { AppNavBar } from "@/app/dashboard/_components/AppNavBar";
// import { Separator } from "@/components/ui/separator";

// export default function Page({
//   children,
//   params,
// }: {
//   params: { page: string };
//   children: React.ReactNode;
// }) {
//   const pageConfig = dashboardConfig.pages[params.page];

//   return (
//     <div className="text-xl flex flex-col flex-grow w-full h-full justify-center items-center">
//       <AppNavBar pageName={pageConfig.name} />
//       {/*<Separator />*/}
//       {/*<DashboardPageHeader title={pageConfig.name}>*/}
//       {/*    <TextDataCard label="上次更新時間" data={(new Date()).toLocaleString()}/>*/}
//       {/*</DashboardPageHeader>*/}
//       {/*<DashboardTabBar pageName={params.page}/>*/}
//       {children}
//     </div>
//   );
// }
