import React, {useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {registerAction} from "@/actions/registerAction";
import {PasswordObscureSwitcher} from "@/app/ui/auth/PasswordObscureSwitcher";
import {AuthCard} from "@/app/ui/auth/AuthCard";
import {IBMLogoImage} from "@/app/ui/assets/IBMLogo";
import {Button, Chip, Input} from "@nextui-org/react";
import {MaterialIcon} from "@/app/ui/assets/MaterialIcon";
import Link from "next/link";



interface RegisterFormProps{
    userName: string,
    password: string,
    passwordValidation: string
}

export function RegistrationForm() {

    // const [route, setRoute] = useState<string>("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [error, setError] = useState<string>("")
    const {
        reset,
        register,
        handleSubmit,
        getValues,
        formState: {
            errors,
            isSubmitting,
            isValid,
        }} = useForm<RegisterFormProps>(
        {
            defaultValues: {
                userName: "",
                password: "",
                passwordValidation: ""
            }
        });

    async function onRegister() {
        console.log("register")
        const res: {error:string} | undefined = await registerAction({
            userName: getValues("userName"),
            password: getValues("password")
        })
        if(res === undefined){
            return ;
        }
        if(res?.error){
            setError(res.error)
        }
        // if(res?.success){
        //     redirect("/auth/login")
        //     route.
        // }
    }
    const buttonUIProps={
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
        ...register("password", {
            required: true,
        }),
    }

    const passwordValidationFieldRegister = {
        label: "再次輸入密碼",
        placeholder: "請再次輸入你的密碼",
        errorMessage: errors.passwordValidation && "密碼不一致",
        endContent: PasswordObscureSwitcher({isPasswordVisible, onClick: () => setIsPasswordVisible(prev => !prev)}),
        type: isPasswordVisible ? "password" : "text",
        ...inputFieldUIProps,
        ...register("passwordValidation", {
            required: true,
            validate: (value) => {
                return value === getValues("password")
            }
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
        <form onSubmit={handleSubmit(onRegister)}>
            <AuthCard>
                <div className={"flex flex-col justify-center items-center"}>
                    <IBMLogoImage/>
                    <p className="text-xl font-semibold">{"註冊 REGISTER"}</p></div>
                <div className="flex flex-col self-stretch gap-5">
                    <Input{...usernameFieldRegister}/>
                    <Input{...passwordFieldRegister}/>
                    <Input {...passwordValidationFieldRegister}/>
                    <Chip color={"warning"} className={ error.length < 1 ? "hidden" : ""}>{error}</Chip>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center self-stretch gap-2.5 py-3 px-1">
                    <Button {...buttonUIProps} color="default">
                        <Link href={'/auth/login'} className={"flex flex-grow justify-between items-center"}>
                            已有帳號？登入
                            <MaterialIcon icon={"login"} className={""}/>
                        </Link>
                    </Button>
                    <Button {...buttonUIProps}
                            color="primary"
                            type={"submit"}
                            isDisabled={!isValid}
                            isLoading={isSubmitting}>
                        <p className="text-background">註冊帳號</p>
                        <MaterialIcon icon={"app_registration"} className={isSubmitting ? "text-background hidden" : "text-background"}/>
                    </Button>
                </div>
            </AuthCard>
        </form>
    );
}
