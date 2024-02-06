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
    subPage: {
        [key: string]: SubPageType
    }
}

type AppConfigType = {
    // version: string,
    name: string,
    description?: string,
    pages: {
        [key: string]: PageType
    },
}

const dashboardConfig: AppConfigType = {
  name: 'IBM 智慧永續ESG平台',
  pages: {
    "HOME" : {
        name: 'HOME',
        path: '/home',
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
    "Asset Management" : {
        name: 'Asset Management',
        path: '/asset',
        subPage:{
            'overview' : {
                name: '總覽',
                path: '/overview',
                component: OverViewPanel
            }, 
        }
    },
  }
}  

export { dashboardConfig}
// export
// function 