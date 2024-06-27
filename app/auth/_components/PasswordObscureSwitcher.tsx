import {Button} from "@/components/ui/button";
import { LuEye, LuEyeOff } from "react-icons/lu";


export function PasswordObscureSwitcher({isPasswordVisible, onClick}: {isPasswordVisible: boolean, onClick: () => void}) {
    return (
        <Button type={"button"} variant={"outline"} size={"icon"} onClick={onClick}>
            {
                isPasswordVisible
                    ? <LuEye size={14}/>
                    : <LuEyeOff size={14}/>
            }
        </Button>
    )
}
