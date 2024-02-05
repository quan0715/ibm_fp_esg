
import type { NextAuthConfig } from "next-auth"
// import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
export const runtime = 'nodejs'
export const authConfig = {
    providers: [
        Credentials({
            name: "password login",
            credentials: {
                userName: { label: "userName", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                const credentialsUserName: string = credentials.userName as string
                const password: string  = credentials.password as string
                const user = { 
                    name: credentialsUserName,
                    password: password,  
                }
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null
                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user, account, profile, }) {
            // Initial sign in
            // console.log("jwt", token, user, account, profile)
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
