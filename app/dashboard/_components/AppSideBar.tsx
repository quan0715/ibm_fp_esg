"use client";
import { SeparatorVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

const sideBarData = [
    {
        title: "環保KPI",
        link: "",
        children: [
            {
                text: "主管機關罰單",
                link: ""
            },
            {
                text: "異常管理",
                link: ""
            },
            {
                text: "空汙",
                link: ""
            },
            {
                text: "溫室氣體",
                link: ""
            },
            {
                text: "水汙",
                link: ""
            },
            {
                text: "廢棄物",
                link: ""
            },
            {
                text: "毒化物",
                link: ""
            },
            {
                text: "土壤及地下水",
                link: ""
            },
            {
                text: "海汙",
                link: ""
            },
            {
                text: "證照管理",
                link: ""
            },
            {
                text: "節能節水",
                link: ""
            },
        ],
    },
    {
        title: "工安KPI",
        link: "",
        children: [
            {
                text: "主管機關罰單",
                link: ""
            },
            {
                text: "事故",
                link: ""
            },
            {
                text: "工傷",
                link: ""
            },
            {
                text: "施工",
                link: ""
            },
            {
                text: "稽核",
                link: ""
            },
            {
                text: "設備",
                link: ""
            },
            {
                text: "其他",
                link: ""
            },
        ],
    },
]

const SideBar = ({ className }: { className?: string }) => {

    const menuData = sideBarData.map((item) => {
        const [isOpen, setIsOpen] = useState(false);
        return {
            ...item,
            isOpen,
            setIsOpen
        }
    })

    return (<div className={className}>
        <div className="flex w-full flex-col items-start gap-6 pt-[20px] pl-[90px]">
            {menuData.map(({ title, setIsOpen, isOpen, link, children }) => (
                <div className="unselectable flex gap-0 flex-col">
                    <div className="flex flex-row w-full h-[30px] gap-1">
                        <div className="hover:opacity-90 h-full w-5 flex justify-center items-center">
                            {isOpen ?
                                <FaAngleDown onClick={() => setIsOpen(!isOpen)} size={20} /> :
                                <FaAngleRight onClick={() => setIsOpen(!isOpen)} size={20} />
                            }</div>
                        <Link href={link} className="cursor-default">
                            <span className="text-[20px] hover:font-bold leading-[normal]">{title}</span>
                        </Link>
                    </div>
                    {isOpen && <div className="flex flex-col border-l-2 ml-[10px] items-start gap-[14px] pt-[10px] pl-[20px] py-0">
                        {children.map(({ text, link }) => (<Link href={link}>
                            <span className="text-[15px] hover:font-bold leading-[normal]">{text}</span>
                        </Link>))}
                    </div>}
                </div>
            ))}
        </div>
    </div>
    )
}

export default SideBar;