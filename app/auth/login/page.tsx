"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LogInIcon, Loader2 } from "lucide-react";
import { AuthCard } from "@/app/auth/_components/AuthCard";
import { useUserLoginForm } from "@/app/auth/_hooks/form_hooks";
import { PasswordObscureSwitcher } from "@/app/auth/_components/PasswordObscureSwitcher";
import Image from "next/image";
import React from "react";

export default function Page() {
  const {
    register,
    onLogin,
    isValid,
    isSubmitting,
    isPasswordVisible,
    togglePasswordVisibility,
    loginErrorMessage,
  } = useUserLoginForm();

  return (
    <AuthCard
      title={"智慧永續ESG平台 - 登入"}
      description={
        "歡迎使用智慧永續ESG平台，輸入帳號密碼以登入平台進行後續操作"
      }
    >
      <form onSubmit={onLogin}>
        <div className="flex flex-col self-stretch gap-3">
          <div>
            <Label>帳號</Label>
            <Input
              {...register("username", {
                required: true,
              })}
              name={"username"}
              inputMode={"text"}
              type={"text"}
              placeholder={"請輸入你的帳號"}
            />
          </div>
          <div>
            <Label>密碼</Label>
            <div className={"flex flex-row space-x-1"}>
              <Input
                {...register("password", {
                  required: true,
                })}
                inputMode={"text"}
                type={isPasswordVisible ? "text" : "password"}
                placeholder={"請輸入你的密碼"}
              />
              <PasswordObscureSwitcher
                isPasswordVisible={isPasswordVisible}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          {loginErrorMessage && (
            <Badge variant={"destructive"}> {loginErrorMessage} </Badge>
          )}
          <Button
            variant={"default"}
            disabled={!isValid}
            className={"flex w-full justify-between text-sm"}
            type={"submit"}
          >
            登入
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogInIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
          <Link
            href={"/auth/register"}
            className={
              "text-sm hover:underline hover:underline-offset-4 hover:text-primary"
            }
          >
            還沒有帳號嗎？點擊註冊
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
