import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  if (!session) {
    if (pathname.startsWith('/_next')) return NextResponse.next();
    if (pathname.startsWith('/api')) return NextResponse.next();
    if (pathname.startsWith('/images')) return NextResponse.next();
    if (!pathname.startsWith('/auth')) {
      const url = req.nextUrl;
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith('/auth')) {
      const url = req.nextUrl;
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }
}

export default middleware;
