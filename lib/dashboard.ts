import { OverViewPanel } from "@/app/ui/dashboard/panels/OverViewPanel";
import { OperationPanel } from "@/app/ui/dashboard/panels/OperationPanel";
import { SettingPanel } from "@/app/ui/dashboard/panels/SettingPanel";


type SubPageType = {
    name: string,
    path: string,
    component: () => JSX.Element | Promise<JSX.Element>,
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
        name: '主頁',
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
        name: '資產管理',
        path: '/asset_management',
        default: '/workOrder',
        subPage:{
            'workOrder' : {
                name: '工單管理',
                path: '/workOrder',
                component: OverViewPanel
            }, 
            'asset' :{
                name: '資產',
                path: '/asset',
                component: OverViewPanel
            }
        }
    },
    "operation" : {
        name: '運營狀況',
        path: '/operation',
        default: '/performance',
        subPage:{
            'performance' : {
                name: '效能分析',
                path: '/performance',
                component: OperationPanel
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
