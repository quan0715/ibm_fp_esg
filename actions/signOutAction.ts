"use server"
import { signOut, auth} from "@/lib/auth";
export async function signOutAction() {

    console.log('signOutAction')
    await signOut()
    // return await signOut();
}