import { NextRequest, NextResponse } from 'next/server'
import { projects, users } from '@/db/database'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId } = body;

        const userData = await users.find({ _id: new ObjectId(userId) })
            .project({ projectList: 1 })
            .toArray();
        const ids = userData[0].projectList;

        const objectIds = ids.map((a: string) => new ObjectId(a));

        const projectsData = await projects.find({ _id: { $in: objectIds } }).toArray();
        // console.log(projectsData)

        return NextResponse.json({ msg: 'successfully fetched data', projects: projectsData }, { status: 201 })
    } catch (error) {
        console.log('Backend Server Error', error);
        return NextResponse.json({ msg: 'backend server error', error: error }, { status: 500 })
    }
}