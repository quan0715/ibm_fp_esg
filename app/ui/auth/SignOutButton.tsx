import { signOutAction } from "@/actions/signOutAction";
import { Button } from "@nextui-org/react";
export function SignOutButton(){
    return (
        <form action={signOutAction}>
            <Button size="sm" type="submit" color="primary" className="text-background">登出</Button>
        </form>
    );
}