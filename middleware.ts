import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log(session?.user.id); Obtener el id del usuario

  const { pathname } = req.nextUrl;
  if (!session) {
    if (pathname.startsWith('/_next')) return NextResponse.next();
    if (pathname.startsWith('/api')) return NextResponse.next();
    if (pathname.startsWith('/images')) return NextResponse.next();
    if (!pathname.startsWith('/auth')) {
      const url = req.nextUrl;
      url.pathname = '/auth/login';
      console.log('redirect');
      return NextResponse.redirect(url);
    }
  } else {
    if (pathname.startsWith('/auth')) {
      const url = req.nextUrl;
      url.pathname = '/index/dashboard';
      return NextResponse.redirect(url);
    }
  }
}

export default middleware;
