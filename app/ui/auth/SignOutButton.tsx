import { signOutAction } from "@/actions/signOutAction";
import {Button} from "@/components/ui/button";
export function SignOutButton(){
    return (
        <form action={signOutAction}>
            <Button type="submit" variant={"destructive"}>登出</Button>
        </form>
    );
}