"use client"
import {IBMLogoImage} from "@/app/ui/components/IBMLogo";
import {AuthCard} from "@/app/auth/AuthCard";
import {Input, Button} from "@nextui-org/react";
import {MaterialIcon} from "@/app/ui/components/MaterialIcon";
import React from "react";
import {redirect} from "next/navigation";
const formTitle = "註冊 REGISTER";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {PasswordObscureSwitcher} from "@/app/auth/PasswordObscureSwitcher";

export default function Page() {
    return (
        <AuthLoginFormFrame title={formTitle}/>
    );
}

interface AuthRegisterFormFrameProps {
    title: string
}

function AuthLoginFormFrame({title = "REGISTER"}: AuthRegisterFormFrameProps) {

    const [username, setUsername] = useState("empty")
    const [password, setPassword] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    function goToLoginPage() {
        console.log("redirect to login page")
        router.push("/auth/")
    }
    async function  onRegister() {
        setIsLoading(prev => !prev)
        console.log("register")
        await new Promise((resolve) => setTimeout(resolve, 3000))

        setIsLoading(prev => !prev)
    }
    return (
        <AuthCard>
            <div className={"flex flex-col justify-center items-center"}>
                <IBMLogoImage/>
                <p className="text-xl font-semibold">{title}</p></div>
            <div className="flex flex-col self-stretch gap-5">
                <Input
                    label={"帳號名稱"}
                    variant={"underlined"}
                    size={"lg"}
                    placeholder={"請輸入你的帳號名稱"}
                    color={"primary"}
                    isInvalid={username.length < 6 && username !== "empty"}
                    errorMessage={(username.length < 6 && username !== "empty") ? "帳號名稱長度必須大於6個字元" : ""}
                    isRequired={true}
                    onChange={(e) => {  setUsername(e.target.value) }}
                />
                <Input
                    label={"密碼"}
                    variant={"underlined"}
                    placeholder={"請輸入你的密碼"}
                    size={"lg"}
                    color={"primary"}
                    isRequired={true}
                    type={"text"}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Input
                    label={"再次輸入密碼"}
                    variant={"underlined"}
                    placeholder={"請再次輸入你的密碼"}
                    size={"lg"}
                    color={"primary"}
                    isRequired={true}
                    isInvalid={passwordValidation !== password}
                    endContent={<PasswordObscureSwitcher isPasswordVisible={isPasswordVisible} onClick={()=>{setIsPasswordVisible(prev => !prev)}}/>}
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => { setPasswordValidation(e.target.value) }}
                />
            </div>
            <div className="flex flex-row justify-center items-center self-stretch gap-2.5 py-3 px-1">
                <Button
                    color="default"
                    variant="shadow"
                    fullWidth={true}
                    className={"justify-between"}
                    onClick={goToLoginPage}>
                    已有帳號？登入
                    <MaterialIcon icon={"login"} className={""}/>
                </Button>
                <Button color="primary"
                        variant="shadow"
                        fullWidth={true}
                        isLoading={isLoading}
                        spinnerPlacement={"end"}
                        className={"justify-between"}
                        onClick={onRegister}>
                    註冊帳號
                    <MaterialIcon icon={"app_registration"} className={isLoading ? "hidden" : ""}/>
                </Button>
            </div>
        </AuthCard>
    );
}
