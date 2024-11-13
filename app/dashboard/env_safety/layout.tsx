'use client';
import { usePathname } from 'next/navigation';
import AppLayout from '../_app_layout';
import NavBar from './_component/NavBar';
import { TabNames } from './_route';

const Content = ({ children }: { children: React.ReactNode }) => (
    <NavBar currentTab={usePathname().split('/')[-1] as TabNames}></NavBar>
)

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AppLayout>
        <Content>{children}</Content>
    </AppLayout>
}