import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/database";

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
                    email: email,
                    mobile: mobile,
                    password: password,
                    image: '',
                    subscription: {
                        payment_id: "",
                        order_id: "",
                        currency: "INR",
                        amount: 0,
                        subscriberID: "",
                        subscriptionType: "",
                        subscriptionDate: "",
                        startDate: "",
                        endDate: "",
                        status: "active",
                        subscriptionPlan: "free",
                        billingCycle: "",
                        autoRenewal: false,
                        cancellationDate: null,
                        paymentInformation: {}
                    }
                }
            )
            // console.log(registerUser);

            return NextResponse.json({ msg: 'user successfully created' }, { status: 201 });
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