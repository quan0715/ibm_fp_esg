import {Button} from "@nextui-org/react";
import {MaterialIcon} from "@/app/ui/components/MaterialIcon";
import React from "react";

export function PasswordObscureSwitcher({isPasswordVisible, onClick}: Readonly<{ isPasswordVisible: boolean, onClick: () => void }>) {
    return (
        <Button
            color={"default"}
            variant={"faded"}
            onClick={onClick}
            isIconOnly={true}>
            <MaterialIcon icon={isPasswordVisible ? "visibility_off" : "visibility"} className={""}/>
        </Button>
    );
}