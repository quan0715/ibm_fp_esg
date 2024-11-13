'use client';
import { usePathname } from 'next/navigation';
import AppLayout from '../_app_layout';
import NavBar from './_component/NavBar';
import { TabNames } from './_route';

const Content = ({ children }: { children: React.ReactNode }) => (
    <div className="h-full w-full flex flex-start flex-row">
        <NavBar className="h-[52px] w-full" currentRoute={usePathname().split('/')[-1] as TabNames}></NavBar>
        {children}
    </div>
)

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AppLayout>
        <Content>{children}</Content>
    </AppLayout>
}