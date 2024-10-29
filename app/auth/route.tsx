import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    console.log("GET /logout");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
}