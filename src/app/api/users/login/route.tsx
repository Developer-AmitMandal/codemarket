import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/database";
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const body = await request.json();
        const { email, password } = body;
        const existUser = await users.findOne({ email: email, password: password });
        if (existUser) {
            const tokenData = {
                id: existUser._id,
                name: existUser.fullName,
                email: existUser.email
            }

            const token = await jwt.sign(tokenData, 'zxcvbnmlkjhgfdsaqwertyuiop123456', { expiresIn: '1d' });
            // console.log(token);

            const response = NextResponse.json({ msg: 'Successfully logged in', token: token }, { status: 201 })
            response.cookies.set('codemarket', token, { httpOnly: true });
            return response;

        } else {
            return NextResponse.json({ msg: 'Invalid user id and password' }, { status: 200 });
        }

    } catch (error) {
        console.log('backend error:', error);
        return NextResponse.json({ msg: 'error', error }, { status: 500 });
    }
}