import Image from "next/image";
import NavBar from "@/app/ui/components/nav_bar";
import React from "react";
import {TextButton} from "@/app/ui/components/TextButton";
import {PrimaryButton, SecondaryButton} from "@/app/ui/components/PrimaryButton";

export default function Auth() {
    return (
        <main className={"flex min-h-screen flex-col items-center justify-stretch self-stretch"}>
            <AuthBackgroundSurface>
                <AuthFormFrame title={"智慧永續 ESG 平台"}/>
            </AuthBackgroundSurface>
        </main>
    );
}

function IBMLogoImage({}) {
    return (
        <div className="bg-auto bg-center bg-no-repeat w-44 h-16 bg-[url('/IBM_logo_w.png')]"></div>
    );
}

interface AuthFormFrameProps {
    title: string
}

function AuthFormFrame({title = "LOGIN"}: AuthFormFrameProps) {
    // const formTitle = "智慧永續 ESG 平台";
    return (
        <div className="animate-fadeIn transition-all">
            <div
                className="flex flex-col justify-between sm:justify-around items-center gap-5 p-12 lg:w-[540px] md:w-[480px] sm:w-screen aspect-square h-auto rounded-2xl bg-[rgba(39,42,45,20%)] backdrop-blur-lg ">
                <div className="flex flex-col items-center self-stretch">
                    <IBMLogoImage/>
                    <p className="text-xl font-light">{title}</p>
                </div>
                <div className="flex flex-col self-stretch gap-5">
                    <InputField label="帳號" icon={"account_circle"}/>
                    <InputField label="密碼" icon={"password"} type={'password'}/>
                </div>
                <div className="flex flex-rol justify-center items-center self-stretch gap-2.5 py-3 px-1">
                    <SecondaryButton label={"註冊 SIGN UP"} icon={"app_registration"}/>
                    <PrimaryButton label={"登入 LOGIN"} icon={"login"}/>

                </div>
            </div>
        </div>
    );
}

function AuthBackgroundSurface({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            className= "relative flex min-h-screen flex-col justify-center items-center self-stretch bg-[url('/background.png')] bg-repeat bg-contain bg-center">
            <div className="absolute inset-0 bg-black opacity-60"></div>
            {children}
        </div>
    );
}

function InputField({
                        label = 'label',
                        icon = 'account_circle',
                        type = 'text'
                    }) {
    return (
        <div className="flex items-center self-stretch gap-3 px-1 py-3 border-b-2 hover:border-primary">
            <div className="flex flex-col basis-full gap-1.5 ">
                <label className="text-sm font-bold text-blue-200">{label}</label>
                <input type={type}
                       placeholder={"請輸入你的" + label}
                       className="appearance-none bg-transparent font-light text-xm focus:outline-none"/>
            </div>
            <span className="material-symbols-outlined">
                {icon}
            </span>
        </div>
    )
}

