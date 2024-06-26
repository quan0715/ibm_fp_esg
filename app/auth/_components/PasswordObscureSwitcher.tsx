import {Button} from "@/components/ui/button";
import {Eye, EyeOff} from "lucide-react";


export function PasswordObscureSwitcher({isPasswordVisible, onClick}: {isPasswordVisible: boolean, onClick: () => void}) {
    return (
        <Button type={"button"} variant={"outline"} size={"icon"} onClick={onClick}>
            {
                isPasswordVisible
                    ? <Eye size={14}/>
                    : <EyeOff size={14}/>
            }
        </Button>
    )
}
