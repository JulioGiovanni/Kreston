
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

async function middleware  (req: NextRequest, ev:NextFetchEvent) {
  
    const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET});
    // console.log(session?.user.id); Obtener el id del usuario
    if (req.nextUrl.pathname.startsWith('/index')) {
    
        if (!session) {
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
        
    }

    return NextResponse.next();

}

export default middleware;