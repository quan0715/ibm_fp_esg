import Image from "next/image";
import NavBar from "@/app/ui/components/nav_bar";
import React from "react";
import {TextButton} from "@/app/ui/components/TextButton";
import {PrimaryButton} from "@/app/ui/components/PrimaryButton";

export default function Home() {

    // bg-[url('/background.png')]
    return (
        <main className={"flex min-h-screen flex-col items-center justify-stretch self-stretch"}>
            {/*<NavBar />*/}
            <div className="relative flex min-h-screen flex-col justify-center items-center self-stretch bg-[url('/background.png')] bg-repeat bg-contain bg-center">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="flex flex-col justify-center items-center gap-5 py-6 px-12 max-w-[480px] w-1/4 aspect-square h-auto rounded-2xl bg-[rgba(39,42,45,20%)] backdrop-blur-lg animate-fadeIn">
                    <div className="flex flex-col justify-center items-center self-stretch gap-8">
                        {/*header section*/}
                        <div className="flex self-stretch flex-col justify-center items-center">
                            <div className="bg-auto bg-center bg-no-repeat w-44 h-14 bg-[url('/IBM_logo_w.png')]"></div>
                            <p className="text-xm font-semibold">智慧永續 ESG 平台</p>
                        </div>
                        <div className="flex flex-col self-stretch gap-5">
                            <InputField label="帳號" icon={"account_circle"}/>
                            <InputField label="密碼" icon={"password"} type={'password'}/>
                        </div>
                        <div className="flex flex-col self-stretch grow gap-2">
                            <TextButton label={"沒有帳號? 點擊註冊"}/>
                            <PrimaryButton label={"登入 PORTAL"} icon={"login"}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function InputField({
    label = 'label',
    icon = 'account_circle',
    type = 'text'
}){
    return (
        <div className="flex items-center grow gap-3 ">
            <span className="material-symbols-outlined">
                {icon}
            </span>
            <div className="flex flex-col grow gap-1.5">
                <label className="text-xs font-bold text-blue-200">{label}</label>
                <input type={type}
                       className="grow bg-transparent font-light text-xl border-b-2 border-gray-500 focus:outline-none focus:border-b-blue-500 "/>
            </div>
        </div>
    )
}

