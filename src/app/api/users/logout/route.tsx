import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ msg: 'logged out successfull' }, { status: 201 });
        response.cookies.delete('codemarket');
        return response;
    } catch (error) {
        console.log('backend error:', error);
        return NextResponse.json({ msg: 'error', error }, { status: 500 });
    }
}