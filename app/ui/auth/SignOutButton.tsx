import { signOutAction } from "@/actions/signOutAction";
import { Button } from "@nextui-org/react";
export function SignOutButton(){
    return (
        <form action={signOutAction}>
            <Button type="submit" color="primary">登出</Button>
        </form>
    );
}