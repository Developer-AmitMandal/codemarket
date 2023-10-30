import { NextRequest, NextResponse } from 'next/server'
import { projects } from '@/db/database'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id } = body;

        const data = await projects
            .findOne({ _id: new ObjectId(id) });
        // console.log(data);

        return NextResponse.json({ msg: 'successfully fetched data', projects: data }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}