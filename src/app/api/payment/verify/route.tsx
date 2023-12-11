import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { users } from '@/db/database';

export async function POST(request: NextRequest) {
    try {
        const { response, email, projectId } = await request.json();

        let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', 'AdcGsIXD3X04CQA5VpmyVifh')
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === response.razorpay_signature) {
            await users.updateOne({ email: email }, {
                $push: {
                    projectList: projectId
                }
            })
            return NextResponse.json({ msg: 'Sign Valid' }, { status: 201 })
        } else {
            return NextResponse.json({ msg: 'Sign Invalid' }, { status: 401 })
        }

    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}
