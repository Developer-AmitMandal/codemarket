import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/database";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await request.json();
        const { email, password } = body;
        const existUser = await users.findOne({ email: email, password: password });
        if (existUser) {
            return NextResponse.json({ msg: 'Successfully logged in' }, { status: 201 });
        }else{
            return NextResponse.json({ msg: 'Invalid user id and password' }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'error', error }, { status: 500 });
    }
}