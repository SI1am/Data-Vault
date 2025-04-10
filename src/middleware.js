import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/'];

  // If the path is public, allow access
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If there's no token and the path is not public, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure which paths to run middleware on
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/profile',
    '/my-files',
    '/projects',
  ],
}; 