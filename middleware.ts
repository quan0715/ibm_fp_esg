import { auth } from "@/lib/auth";
import {NextResponse} from "next/server";

export const runtime = 'nodejs'

const privateRoute: Array<string> = [
    "/",
    "/dashboard",
]

const apiBaseRoute: string = "/api"

const authBaseRoute = "/auth"


export default auth( async (req)  =>{
    const session = await auth()
    // console.log('protected middleware')
    // console.log(req.nextUrl.pathname)
    // console.log('Session', session)

    if(session?.user){
        // console.log('User', session.user)
        if(req.nextUrl.pathname.startsWith(authBaseRoute)){
            return NextResponse.redirect(new URL('/dashboard/data', req.url))
        }if(req.nextUrl.pathname.startsWith(apiBaseRoute)){
            // console.log('API')
            return null;
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
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    // matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}

