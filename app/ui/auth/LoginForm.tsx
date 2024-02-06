import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {PasswordObscureSwitcher} from "@/app/ui/auth/PasswordObscureSwitcher";
import {AuthCard} from "@/app/ui/auth/AuthCard";
import {IBMLogoImage} from "@/app/ui/assets/IBMLogo";
import {Button, Input, Chip} from "@nextui-org/react";
import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";
import {loginAction} from "@/actions/loginActions";
import Link from "next/link";

type UserLogin = {
    userName: string,
    password: string
}
export function LoginForm() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }} = useForm<UserLogin>({
        defaultValues: {
            userName: "",
            password: ""
        }
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    

    function togglePasswordVisibility() {
        setIsPasswordVisible(prev => !prev)
    }

    async function onLogin(){
        console.log("login")
        const res = await loginAction({userName: getValues("userName"), password:getValues("password")})
        console.log(res)
        if(res.error){
            setError(res.error)
        }
    }

    const buttonUIProps = {
        variant: "shadow" as const,
        fullWidth: true,
        spinnerPlacement: "end" as const,
        className: "justify-between",
    }

    const inputFieldUIProps = {
        variant: "underlined" as const,
        size: "lg" as const,
        color: "primary" as const,
        isRequired: true,
    }

    const passwordFieldRegister = {
        label: "密碼",
        placeholder: "請輸入你的密碼",
        errorMessage: errors.password && "密碼不得為空",
        ...inputFieldUIProps,
        endContent: PasswordObscureSwitcher({isPasswordVisible, onClick: togglePasswordVisibility}),
        type: isPasswordVisible ? "text" : "password",
        ...register("password", {
            required: true,
        }),
    }

    const usernameFieldRegister = {
        label: "帳號",
        placeholder: "請輸入你的帳號",
        errorMessage: errors.userName && "帳號不得為空",
        ...inputFieldUIProps,
        ...register("userName", {
            required: true,
        }),
    }

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <AuthCard>
                <div className={"flex flex-col justify-center items-center"}>
                    <IBMLogoImage width="xl"/>
                    <p className="text-xl font-semibold">{"登入"}</p></div>
                <div className="flex flex-col self-stretch gap-5">
                    <Input {...usernameFieldRegister}/>
                    <Input {...passwordFieldRegister}/>
                    { error && <Chip color="warning" endContent={<MaterialIcon icon="error"  />}> {error} </Chip>}
                </div>
                <div className="flex flex-col md:flex-row  justify-center items-center self-stretch gap-2.5 py-3 px-1">
                    <Button {...buttonUIProps}>
                        <Link href={'/auth/register'} className={"flex flex-grow justify-between items-center"}>
                            註冊帳號
                            <MaterialIcon icon={"app_registration"} className={""}/>
                        </Link>
                    </Button>
                    <Button {...buttonUIProps}
                            color="primary"
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            type={"submit"}>
                        <p className="text-background">登入</p>
                        <MaterialIcon icon={"login"} className={isSubmitting ? "text-background hidden" : "text-background"}/>
                    </Button>
                </div>
            </AuthCard>
        </form>
    );
}
