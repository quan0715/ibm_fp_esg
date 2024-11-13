import Link from "next/link";
import routes, { TabNames } from "../_route";
import Tag from "./Tag";

const rnm = {} as Record<string, TabNames>;
const nrm = {} as Record<TabNames, string>;
routes.forEach(({ name, route }) => {
    rnm[route] = name;
    nrm[name] = route;
});

export default function NavBar({ currentRoute }: { currentRoute: string }) {
    const routeName = rnm[currentRoute] ?? "環保KPI";
    const basePath = '/dashboard/env_safety';
    return (
        <div className="flex w-full justify-start items-center gap-[15px] self-stretch px-[15px] py-0">
            <span className="text-4xl shrink-0 not-italic font-bold leading-[normal]">{routeName}</span>
            <div className="flex flex-0 w-full h-12 justify-start items-center gap-[5px] overflow-auto">
                {routes.map(({ name, route }, index) => (
                    <Link key={name} href={basePath + route} prefetch>
                        <Tag name={name} className="w-[109px] min-w-[109px]" active={name == routeName} />
                    </Link>
                ))}
            </div>
        </div>
    )
}