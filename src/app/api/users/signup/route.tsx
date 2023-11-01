import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/database";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest, response: NextResponse) {
    try {

        const body = await request.json();
        const { firstName, lastName, email, mobile, password } = body;

        const existUser = await users.findOne({ email: email });
        if (!existUser) {

            const registerUser = await users.insertOne(
                {
                    firstName: firstName,
                    lastName: lastName,
                    fullName: firstName + ' ' + lastName,
                    email: email,
                    mobile: mobile,
                    password: password,
                    image: '',
                    projectList: [],
                    paymenyHistory: []
                }
            )

            const tokenData = {
                id: registerUser.insertedId.toString(),
                name: firstName + ' ' + lastName,
                email: email
            }

            const token = await jwt.sign(tokenData, 'zxcvbnmlkjhgfdsaqwertyuiop123456', { expiresIn: '1d' });
            // console.log(token);

            const response = NextResponse.json({ msg: 'user successfully created', token: token }, { status: 201 })
            response.cookies.set('codemarket', token, { httpOnly: true });
            return response;
        } else {
            return NextResponse.json({ msg: 'user already exist' }, { status: 200 });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'successfully post request' }, { status: 500 });
    }
}

export async function GET(request: NextRequest, response: NextResponse) {
    try {

        return NextResponse.json({ msg: 'successfully get request' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'error', error }, { status: 500 });
    }
}