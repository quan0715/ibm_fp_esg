"use server"

// import { revalidate } from "@/app/dashboard/layout"
import { revalidatePath } from "next/cache"

export type Data = {
    time: Date,
    message: string
}

export async function dataUpdateTest(){
    console.log('Data Update Test')
    const data: Data = {
        time: new Date(),
        message: 'Data Update Test'
    }
    // revalidatePath('/dashboard')
    return data
}