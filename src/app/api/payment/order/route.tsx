import { users } from '@/db/database';
import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
    try {
        const { amount, projectId, email, fullName,mobile } = await request.json();
        // var instance = new Razorpay({ key_id: 'rzp_test_zPDhEMoZ6ivNaQ', key_secret: 'AdcGsIXD3X04CQA5VpmyVifh' }) //test
        var instance = new Razorpay({ key_id: 'rzp_live_ZBISemUZOvkeJA', key_secret: 'mpDz9Nus4qdWX1NbvTVV3EBW' }) //live
        const d = await instance.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: projectId,
            notes: {
                platform: "code market",
                fullName: fullName,
                subscriberId: email,
                mobile: mobile,
                projectId: projectId,
            }
        });
        await users.updateOne({ email: email }, {
            $push: {
                paymenyHistory: d
            }
        })
        // console.log(d, 'order')

        return NextResponse.json({ msg: 'Data successfully Added.', data: d }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}
