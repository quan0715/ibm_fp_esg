import { NextResponse } from "next/server";

export function GET(){
    const lastUpdated = new Date()
    return NextResponse.json({
        "time": lastUpdated
    })
}