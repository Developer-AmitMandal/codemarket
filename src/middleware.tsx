import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/' || path === '/auth/login' || path === '/auth/signup';
    // const isPublicPath = path === '/' || path === '/auth/login' || path === '/auth/signup' || path === '/admin' ;

    const token = request.cookies.get('codemarket');

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/auth/login',
        '/auth/signup',
        '/profile',
    ]
}