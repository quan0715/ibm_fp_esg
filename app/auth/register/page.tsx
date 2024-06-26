"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {PasswordObscureSwitcher} from "@/components/blocks/customButtons/PasswordObscureSwitcher";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Loader2, Key, } from "lucide-react";
import Link from "next/link";
import {AuthCard} from "@/app/ui/auth/AuthCard";
import {useUserRegistrationForm} from "@/components/hooks/form_hooks";

export default function Page() {

    const {
        onRegistration,
        register,
        errors,
        getValues,
        isValid,
        isSubmitting,
        isValidationPasswordVisible,
        toggleValidationPasswordVisibility,
        registrationErrorMessage,
    } = useUserRegistrationForm()

    return (
        <AuthCard
            title={"IBM 綠色製造平台 - 註冊"}
            description={"歡迎使用IBM 綠色製造平台，請註冊帳號，登入後啟用完整功能"}>
            <form onSubmit={onRegistration}>
                <div className="flex flex-col self-stretch space-y-2">
                    <div className={"space-y-2"}>
                        <Label>使用者名稱</Label>
                        <Input
                            {
                                ...register('username', {
                                    required: true,
                                })
                            }
                            name={'username'}
                            inputMode={"text"}
                            type={"text"}
                            placeholder={"請輸入你的帳號"}
                        />
                        { errors.username && <Badge variant={"destructive"}> {errors.username.message} </Badge>}
                    </div>
                    <div className={"space-y-2"}>
                        <Label>使用者密碼</Label>
                        <Input
                            {
                                ...register('password', {
                                    required: true,
                                })
                            }
                            inputMode={"text"}
                            type={"text"}
                            placeholder={"請輸入你的密碼"}
                        />
                        { errors.password && <Badge variant={"destructive"}> {errors.password.message} </Badge>}
                    </div>
                    <div className={"space-y-2"}>
                        <Label>再次驗證密碼</Label>
                        <div className={"flex flex-row space-x-1"}>
                            <Input
                                {
                                    ...register('passwordValidation', {
                                        required: true,
                                        validate: (value) => value === getValues().password || "兩次密碼不同"
                                    })
                                }
                                inputMode={"text"}
                                type={isValidationPasswordVisible ? "text" : "password"}
                                placeholder={"請再次輸入你的密碼"}
                            />
                            <PasswordObscureSwitcher
                                isPasswordVisible={isValidationPasswordVisible}
                                onClick={toggleValidationPasswordVisibility}
                            />
                        </div>
                    </div>
                    {registrationErrorMessage && <Badge variant={"destructive"}> {registrationErrorMessage} </Badge>}
                    <Button
                        variant={"default"}
                        disabled={!isValid}
                        className={"flex w-full justify-between text-sm"}
                        type={"submit"}>
                        註冊帳號
                        {
                            isSubmitting
                                ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                : <Key className="ml-2 h-4 w-4"/>
                        }
                    </Button>
                    <Link href={'/auth/login'}
                          className={"text-sm hover:underline hover:underline-offset-4 hover:text-primary"}>
                        已有帳號？登入
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}
