"use server";

import clientPromise from "@/lib/mongoClient";
// import {auth} from "@/auth";
import bcrypt from "bcrypt";
import {signIn} from "@/lib/auth";

export const loginAction = async (data: any) => {
    console.log("login")
    console.log("data", data)
    const userName = data.userName
    const password = data.password
    const client = await clientPromise;
    const db = client.db('auth');
    const users = db.collection('users');
    const user = await users.findOne({userName: userName});
    if(!user){
        console.log("User not found")
        return {error: "User not found"}
    }
    console.log("User", user)
    const result = await bcrypt.compare(password, user.password);
    if(!result){
        console.log("Password incorrect")
        return {error: "Password incorrect"}
    }
    console.log("Login successful")
    
    await signIn("credentials", {
        userName: data.userName,
        password: data.password
    })
    return {success: "Login successful"}
}