import { auth } from "@/lib/auth";
import {NextResponse} from "next/server";

export const runtime = 'nodejs'

const privateRoute: Array<string> = [
    "/",
]

const apiBaseRoute: string = "/api"

const authBaseRoute = "/auth"


export default auth( async (req)  =>{
    const session = await auth()
    console.log('protected middleware')
    console.log(req.nextUrl.pathname)
    // const session = await auth()
    if(session?.user){
        // console.log('User', session.user)
        if(req.nextUrl.pathname.startsWith(authBaseRoute)){
            return NextResponse.redirect(new URL('/', req.url))
        }
        return null;
    }
    else if(req.nextUrl.pathname.startsWith(authBaseRoute)){
        return null;
    } else {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

