import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log(session?.user.id); Obtener el id del usuario

  const { pathname } = req.nextUrl;
  if (!session) {
    if (pathname.startsWith('/_next')) return NextResponse.next();
    console.log(req.nextUrl);
    if (!pathname.startsWith('/auth')) {
      const url = req.nextUrl;
      url.pathname = '/auth/login';
      // console.log(url);
      return NextResponse.redirect(new URL('/auth/login', req.url));
    } else {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export default middleware;
