"use server"
import bcrypt from "bcrypt"
import clientPromise from "@/lib/mongoClient";
import {redirect, permanentRedirect} from "next/navigation";

// import {NextRequest, NextResponse} from "next/server";
// register user
export async function registerAction(data: any){
    const client = await clientPromise;
    const db = client.db("auth");
    const users = db.collection("users");
    console.log("data", data)
    const exists = await users.findOne({
        userName: data.userName
    })
    if(exists){
        console.log("user exists")
        return {error: "帳號已存在請更換帳號名稱"}
    }else{
        console.log("crete new user")
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await users.insertOne({
            userName: data.userName,
            password: hashedPassword,
        })
        redirect("/auth/login")
        // return {success: "User created"}
    }

    // const targetUser = await req.body();
}