"use client"
import React from "react";
import {MaterialIcon} from "@/app/ui/components/MaterialIcon";
import {Input, Button, Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";
import {IBMLogoImage} from "@/app/ui/components/IBMLogo";
import {AuthCard} from "@/app/auth/AuthCard";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {PasswordObscureSwitcher} from "@/app/auth/PasswordObscureSwitcher";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const formTitle = "登入 LOGIN";

export default function Auth() {
    return (
        <AuthLoginFormFrame title={formTitle}/>
    );
}

interface AuthLoginFormFrameProps {
    title: string
}


function AuthLoginFormFrame({title = "LOGIN"}: AuthLoginFormFrameProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    async function onLogin() {
        setIsLoading(prev => !prev)
        console.log("login")
        console.log(username)
        console.log(password)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsLoading(prev => !prev)
    }

    function togglePasswordVisibility() {
        console.log("toggle password visibility")
        setIsPasswordVisible(prev => !prev)
    }

    function onRegister() {
        console.log("redirect to register page")
        router.push("/auth/register")
    }

    return (
        <AuthCard>
            <div className={"flex flex-col justify-center items-center"}>
                <IBMLogoImage/>
                <p className="text-xl font-semibold">{title}</p></div>
            <div className="flex flex-col self-stretch gap-5">
                <Input
                    label={"帳號"}
                    variant={"underlined"}
                    size={"lg"}
                    placeholder={"請輸入你的帳號"}
                    color={"primary"}
                    isRequired={true}
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <Input
                    label={"密碼"}
                    variant={"underlined"}
                    placeholder={"請輸入你的密碼"}
                    size={"lg"}
                    isRequired={true}
                    endContent={PasswordObscureSwitcher({isPasswordVisible, onClick: togglePasswordVisibility})}
                    type={isPasswordVisible  ? "password" : "text" }
                    onChange={(e) => { setPassword(e.target.value) }}
                />

            </div>
            <div className="flex flex-row justify-center items-center self-stretch gap-2.5 py-3 px-1">
                <Button color="default"
                        variant="shadow"
                        fullWidth={true}
                        className={"justify-between"}
                        onClick={onRegister} >
                    還沒有帳號？
                    <MaterialIcon icon={"app_registration"} className={""}/>
                </Button>
                <Button color="primary"
                        variant="shadow"
                        fullWidth={true}
                        isLoading={isLoading}
                        spinnerPlacement={"end"}
                        className={"justify-between"} onClick={onLogin}>
                    登入
                    <MaterialIcon icon={"login"} className={isLoading ? "hidden" : ""}/>
                </Button>
            </div>
        </AuthCard>
    );
}
