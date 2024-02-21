import { OverViewPanel } from "@/app/ui/dashboard/OverViewPanel";
import { SettingPanel } from "@/app/ui/dashboard/SettingPanel";

type SubPageType = {
    name: string,
    path: string,
    component: () => JSX.Element,
}
type PageType = {
    name: string,
    path: string,
    default: string,
    subPage: {
        [key: string]: SubPageType
    }
}

type AppConfigType = {
    // version: string,
    name: string,
    path: string,
    description?: string,
    default: string,
    pages: {
        [key: string]: PageType
    },
}

const dashboardConfig: AppConfigType = {
  name: 'IBM 智慧永續ESG平台',
  path: '/dashboard',
  default: '/home',
  pages: {
    "home" : {
        name: 'HOME',
        path: '/home',
        default: '/overView',
        subPage:{
            'overView' : {
                name: '資料總覽',
                path: '/overView',
                component: OverViewPanel
            }, 
            'setting' : {
                name: '設定頁面',
                path: '/setting',
                component: SettingPanel
            }, 
        }
    },
    "asset_management" : {
        name: 'Asset Management',
        path: '/asset_management',
        default: '/workOrder',
        subPage:{
            'workOrder' : {
                name: '工單',
                path: '/workOrder',
                component: OverViewPanel
            }, 
            'Asset' :{
                name: '資產管理',
                path: '/asset',
                component: OverViewPanel
            }
        }
    },
    "operation" : {
        name: 'Operation',
        path: '/operation',
        default: '/performance',
        subPage:{
            'performance' : {
                name: '效能分析',
                path: '/performance',
                component: OverViewPanel
            }, 
            'alarms':{
                name: '警報',
                path: '/alarms',
                component: OverViewPanel
            }
        }
    },
  }
}  

export { dashboardConfig }
